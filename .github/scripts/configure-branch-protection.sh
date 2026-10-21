#!/usr/bin/env bash
# =============================================================================
# EShop CI — CÀI ĐẶT BRANCH PROTECTION RULES (Required Status Checks)
# -----------------------------------------------------------------------------
# Thành viên phụ trách: Dương Nhật Cường (23120223) — Seminar T07 CI/CD
#
# Mục đích: bảo vệ nhánh `main` của repo nhóm, bắt buộc mọi Pull Request phải
# qua job "Quality Gate (100% Tests & Coverage >= 80%)" trước khi merge.
# Vi phạm => nút Merge bị khoá cứng ngay lập tức (cơ chế Fail-Fast).
#
# CÁCH DÙNG
#   # 1) Xem payload sẽ gửi (không thay đổi gì):
#   bash .github/scripts/configure-branch-protection.sh --dry-run
#
#   # 2) Áp dụng thật:
#   export GITHUB_TOKEN=<Personal Access Token có quyền repo admin>
#   bash .github/scripts/configure-branch-protection.sh
#
#   # 3) Xem lại cấu hình hiện tại:
#   bash .github/scripts/configure-branch-protection.sh --show
#
# BIẾN MÔI TRƯỜNG
#   GITHUB_TOKEN / GH_TOKEN — token GitHub (bắt buộc khi áp dụng thật).
#   REPO                   — mặc định SoftwareTesting-Group13/eshop-sut-seminar
#   BRANCH                 — mặc định main
#   REQUIRED_CONTEXT       — tên status check bắt buộc (phải KHỚP CHÍNH XÁC
#                            với tên job trong .github/workflows/eshop-ci.yml)
#   REQUIRED_APPROVALS     — số reviewer bắt buộc (mặc định 1, đặt 0 để bỏ)
#   REQUIRE_BRANCH_UP_TO_DATE — strict=true (mặc định true)
#
# Script dùng `curl` + GitHub REST API, idempotent (chạy lại nhiều lần vẫn cho
# cùng kết quả) và KHÔNG tự đụng vào quyền push của thành viên nào.
# =============================================================================

set -euo pipefail

REPO="${REPO:-SoftwareTesting-Group13/eshop-sut-seminar}"
BRANCH="${BRANCH:-main}"
REQUIRED_CONTEXT="${REQUIRED_CONTEXT:-Quality Gate (100% Tests & Coverage >= 80%)}"
REQUIRED_APPROVALS="${REQUIRED_APPROVALS:-1}"
REQUIRE_BRANCH_UP_TO_DATE="${REQUIRE_BRANCH_UP_TO_DATE:-true}"
API="https://api.github.com"

MODE="apply"
case "${1:-}" in
  --dry-run) MODE="dry-run" ;;
  --show)    MODE="show" ;;
  --help|-h) sed -n '2,40p' "$0"; exit 0 ;;
esac

# --- Lấy token ---------------------------------------------------------------
TOKEN="${GITHUB_TOKEN:-${GH_TOKEN:-}}"
if [ -z "$TOKEN" ]; then
  # Tự động lấy credential đã lưu trong git credential helper (macOS Keychain).
  if command -v git >/dev/null 2>&1; then
    TOKEN="$(printf 'protocol=https\nhost=github.com\n\n' \
      | git credential fill 2>/dev/null \
      | sed -n 's/^password=//p')" || true
  fi
fi

api_curl() {
  curl -sS -H "Authorization: Bearer $TOKEN" \
       -H "Accept: application/vnd.github+json" \
       -H "X-GitHub-Api-Version: 2022-11-28" \
       "$@"
}

if [ "$MODE" = "show" ]; then
  if [ -z "$TOKEN" ]; then
    echo "❌ Thiếu GITHUB_TOKEN (hoặc chưa có git credential cho github.com)." >&2
    exit 2
  fi
  echo "== Branch protection hiện tại của $REPO :: $BRANCH =="
  api_curl "$API/repos/$REPO/branches/$BRANCH/protection" | \
    python3 -m json.tool 2>/dev/null || \
    api_curl "$API/repos/$REPO/branches/$BRANCH/protection"
  exit 0
fi

# --- Dựng payload -----------------------------------------------------------
PAYLOAD_FILE="$(mktemp)"
trap 'rm -f "$PAYLOAD_FILE"' EXIT

if [ "$REQUIRED_APPROVALS" -gt 0 ]; then
  REVIEW_BLOCK="\"required_pull_request_reviews\": {
    \"dismissal_restrictions\": {},
    \"require_code_owner_reviews\": false,
    \"required_approving_review_count\": $REQUIRED_APPROVALS
  },"
else
  REVIEW_BLOCK="\"required_pull_request_reviews\": null,"
fi

cat > "$PAYLOAD_FILE" <<EOF
{
  "required_status_checks": {
    "strict": $REQUIRE_BRANCH_UP_TO_DATE,
    "contexts": ["$REQUIRED_CONTEXT"]
  },
  "enforce_admins": true,
  $REVIEW_BLOCK
  "restrictions": null,
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": true
}
EOF

echo "== Payload Branch Protection Rules =="
cat "$PAYLOAD_FILE"

if [ "$MODE" = "dry-run" ]; then
  echo ""
  echo "🔎 DRY-RUN: chưa gửi lên GitHub. Bỏ --dry-run để áp dụng thật."
  exit 0
fi

if [ -z "$TOKEN" ]; then
  echo "❌ Thiếu GITHUB_TOKEN. Đặt token có quyền admin trước khi áp dụng." >&2
  exit 2
fi

echo ""
echo "→ Đang áp dụng branch protection cho $REPO :: $BRANCH ..."
HTTP_CODE="$(api_curl -o /tmp/eshop_bp_response.json -w '%{http_code}' \
  -X PUT "$API/repos/$REPO/branches/$BRANCH/protection" \
  -H 'Content-Type: application/json' \
  --data @"$PAYLOAD_FILE")"

case "$HTTP_CODE" in
  200|201)
    echo "✅ Đã bật Branch Protection Rules (HTTP $HTTP_CODE)."
    echo "   Required status check : $REQUIRED_CONTEXT"
    echo "   Required approvals    : $REQUIRED_APPROVALS"
    echo "   Enforce for admins    : true"
    echo "   Force push / delete   : blocked"
    ;;
  401)
    echo "❌ HTTP 401 — token không hợp lệ hoặc đã hết hạn." >&2
    exit 1
    ;;
  403)
    echo "❌ HTTP 403 — token thiếu quyền admin trên repo (cần scope 'repo' + admin)." >&2
    exit 1
    ;;
  404)
    echo "❌ HTTP 404 — không tìm thấy repo '$REPO' hoặc nhánh '$BRANCH'." >&2
    exit 1
    ;;
  *)
    echo "❌ HTTP $HTTP_CODE — cấu hình branch protection thất bại:" >&2
    cat /tmp/eshop_bp_response.json >&2
    exit 1
    ;;
esac
