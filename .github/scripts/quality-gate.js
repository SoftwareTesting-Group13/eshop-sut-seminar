#!/usr/bin/env node
/**
 * ============================================================================
 * EShop CI — QUALITY GATE
 * ----------------------------------------------------------------------------
 * Thành viên phụ trách: Dương Nhật Cường (23120223) — Seminar T07 CI/CD
 *
 * Script này là "trọng tâm" của bước Quality Gate trong `.github/workflows/
 * eshop-ci.yml`. Nó là nguồn sự thật duy nhất (single source of truth) cho
 * ngưỡng chất lượng, kiểm tra 3 tiêu chí bắt buộc:
 *
 *   1. TEST GATE   — 100% test suites phải PASS (0 suite fail, 0 test fail).
 *   2. COVERAGE GATE — line coverage phải lớn hơn 70%.
 *                     Các metric khác vẫn có trong báo cáo để theo dõi.
 *   3. LCOV GATE   — Báo cáo LCOV phải được sinh ra (coverage/lcov.info).
 *
 * Nếu BẤT KỲ tiêu chí nào vi phạm => script thoát với exit code 1 => job
 * "Quality Gate" báo đỏ => Branch Protection Rules chặn merge PR ngay lập tức
 * (cơ chế Fail-Fast).
 *
 * CÁCH CHẠY
 *   - Trong CI (tự động, bước "Run Quality Gate" của workflow).
 *   - Local (kiểm chứng thủ công trước khi push):
 *       cd backend && npm run test:ci && cd ..
 *       node .github/scripts/quality-gate.js
 *
 * BIẾN MÔI TRƯỜNG (có thể ghi đè bằng Repository/Organization Variables):
 *   COVERAGE_THRESHOLD           — ngưỡng line coverage (mặc định 70; CI cố định 70)
 *   COVERAGE_DIR                 — thư mục chứa coverage (mặc định backend/coverage)
 *
 * EXIT CODE: 0 = PASS, 1 = FAIL (quality gate chặn merge).
 * ============================================================================
 */

"use strict";

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// 1. CẤU HÌNH
// ---------------------------------------------------------------------------
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const COVERAGE_DIR = path.resolve(
  process.env.COVERAGE_DIR || path.join(REPO_ROOT, "backend", "coverage"),
);
const SUMMARY_FILE = path.join(COVERAGE_DIR, "coverage-summary.json");
const JEST_RESULTS_FILE = path.join(COVERAGE_DIR, "jest-results.json");
const LCOV_FILE = path.join(COVERAGE_DIR, "lcov.info");
const REPORT_FILE = path.join(COVERAGE_DIR, "quality-gate-report.md");

const DEFAULT_THRESHOLD = 70;
const COVERAGE_THRESHOLD = toNumber(process.env.COVERAGE_THRESHOLD, DEFAULT_THRESHOLD);

const METRICS = [
  { key: "statements", label: "Statements" },
  { key: "branches", label: "Branches" },
  { key: "functions", label: "Functions" },
  { key: "lines", label: "Lines", threshold: COVERAGE_THRESHOLD },
];

// ---------------------------------------------------------------------------
// 2. TIỆN ÍCH
// ---------------------------------------------------------------------------
function toNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function readJson(file) {
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    return null;
  }
}

function pct(metric) {
  if (!metric) return 0;
  if (metric.total > 0) return (metric.covered / metric.total) * 100;
  if (typeof metric.pct === "number") return metric.pct;
  return 0;
}

function fmtPct(value) {
  // Jest truncates displayed percentages to two decimals; keep reports aligned.
  return `${(Math.floor(value * 100) / 100).toFixed(2)}%`;
}

function relPath(file) {
  return path.relative(REPO_ROOT, file) || file;
}

const lines = [];
function out(text = "") {
  lines.push(text);
  console.log(text);
}

function pad(text, width) {
  const s = String(text);
  return s.length >= width ? s : s + " ".repeat(width - s.length);
}

function padLeft(text, width) {
  const s = String(text);
  return s.length >= width ? s : " ".repeat(width - s.length) + s;
}

function annotate(title, message) {
  // GitHub Actions annotation -> hiện trực tiếp trong tab Checks của PR.
  if (process.env.GITHUB_ACTIONS) {
    console.log(`::error title=${title}::${message}`);
  }
}

// ---------------------------------------------------------------------------
// 3. ĐỌC KẾT QUẢ TEST (jest --json --outputFile)
// ---------------------------------------------------------------------------
function checkTestGate() {
  const results = readJson(JEST_RESULTS_FILE);
  if (!results) {
    return {
      ok: false,
      available: false,
      reason: `Không đọc được file kết quả test: ${relPath(JEST_RESULTS_FILE)}`,
      totalSuites: 0,
      passedSuites: 0,
      failedSuites: 0,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      failedSuiteNames: [],
    };
  }

  const totalSuites = results.numTotalTestSuites ?? 0;
  const passedSuites = results.numPassedTestSuites ?? 0;
  const failedSuites = results.numFailedTestSuites ?? 0;
  const totalTests = results.numTotalTests ?? 0;
  const passedTests = results.numPassedTests ?? 0;
  const failedTests = results.numFailedTests ?? 0;

  const failedSuiteNames = (results.testResults || [])
    .filter((suite) => suite.status !== "passed")
    .map((suite) => path.relative(path.join(REPO_ROOT, "backend"), suite.name));

  const reasons = [];
  if (totalSuites === 0) reasons.push("Không có test suite nào được chạy.");
  if (failedSuites > 0) {
    reasons.push(`${failedSuites}/${totalSuites} test suite FAIL (${failedSuiteNames.join(", ")}).`);
  }
  if (failedTests > 0) reasons.push(`${failedTests} test case FAIL.`);

  return {
    ok: reasons.length === 0,
    available: true,
    reason: reasons.join(" "),
    totalSuites,
    passedSuites,
    failedSuites,
    totalTests,
    passedTests,
    failedTests,
    failedSuiteNames,
  };
}

// ---------------------------------------------------------------------------
// 4. ĐỌC KẾT QUẢ COVERAGE (jest --coverageReporter=json-summary)
// ---------------------------------------------------------------------------
function checkCoverageGate() {
  const summary = readJson(SUMMARY_FILE);
  if (!summary || !summary.total) {
    return {
      ok: false,
      available: false,
      reason: `Không đọc được file coverage summary: ${relPath(SUMMARY_FILE)}`,
      metrics: [],
      perFile: [],
    };
  }

  const metrics = METRICS.map((m) => {
    const actual = pct(summary.total[m.key]);
    return {
      ...m,
      actual,
      ok: m.threshold === undefined || actual > m.threshold,
    };
  });

  const perFile = Object.keys(summary)
    .filter((key) => key !== "total")
    .map((key) => {
      const fileMetrics = METRICS.map((m) => ({
        key: m.key,
        actual: pct(summary[key][m.key]),
        threshold: m.threshold,
      }));
      return {
        file: path.relative(REPO_ROOT, key),
        metrics: fileMetrics,
        belowThreshold: fileMetrics.some((m) => m.threshold !== undefined && m.actual <= m.threshold),
      };
    })
    .sort((a, b) => a.file.localeCompare(b.file));

  const failed = metrics.filter((m) => !m.ok);
  return {
    ok: failed.length === 0,
    available: true,
    reason: failed
      .map((m) => `${m.label} ${fmtPct(m.actual)} <= ngưỡng ${m.threshold}%`)
      .join("; "),
    metrics,
    perFile,
  };
}

// ---------------------------------------------------------------------------
// 5. KIỂM TRA BÁO CÁO LCOV
// ---------------------------------------------------------------------------
function checkLcovGate() {
  if (!fs.existsSync(LCOV_FILE)) {
    return {
      ok: false,
      available: false,
      reason: `Không tìm thấy báo cáo LCOV: ${relPath(LCOV_FILE)}`,
      sizeKb: 0,
      records: 0,
    };
  }
  const content = fs.readFileSync(LCOV_FILE, "utf8");
  const records = (content.match(/^SF:/gm) || []).length;
  const sizeKb = Buffer.byteLength(content, "utf8") / 1024;
  const ok = records > 0 && sizeKb > 0;
  return {
    ok,
    available: true,
    reason: ok
      ? ""
      : `Báo cáo LCOV rỗng (${records} record, ${sizeKb.toFixed(1)} KB).`,
    sizeKb,
    records,
  };
}

// ---------------------------------------------------------------------------
// 6. BÁO CÁO + KẾT LUẬN
// ---------------------------------------------------------------------------
function buildMarkdown({ testGate, coverageGate, lcovGate, verdict }) {
  const md = [];
  md.push("### 🛡️ EShop CI — QUALITY GATE REPORT");
  md.push("");
  md.push(
    verdict.ok
      ? "> ✅ **VERDICT: PASS** — đã qua Quality Gate; PR còn cần Gitleaks và Build."
      : "> ❌ **VERDICT: FAIL (Fail-Fast)** — vi phạm Quality Gate, PR bị Branch Protection chặn merge.",
  );
  md.push("");
  md.push("#### 1️⃣ Test Gate — 100% test suites phải PASS");
  md.push("");
  if (testGate.available) {
    md.push(
      `- Test suites: **${testGate.passedSuites}/${testGate.totalSuites} PASS** (${testGate.failedSuites} FAIL)`,
    );
    md.push(
      `- Test cases: **${testGate.passedTests}/${testGate.totalTests} PASS** (${testGate.failedTests} FAIL)`,
    );
  } else {
    md.push(`- ❌ Không đọc được kết quả test: ${testGate.reason}`);
  }
  md.push("");
  md.push("#### 2️⃣ Coverage Gate — ngưỡng bao phủ mã nguồn");
  md.push("");
  if (coverageGate.available) {
    if (coverageGate.perFile.length) {
      md.push(`- Phạm vi đo: ${coverageGate.perFile.map((f) => `\`${f.file}\``).join(", ")}.`);
      md.push("");
    }
    md.push("| Metric | Actual | Threshold | Status |");
    md.push("| :--- | ---: | ---: | :--- |");
    for (const m of coverageGate.metrics) {
      md.push(
        `| ${m.label} | ${fmtPct(m.actual)} | ${m.threshold === undefined ? "Theo dõi" : `> ${m.threshold}%`} | ${m.threshold === undefined ? "ℹ️ Theo dõi" : m.ok ? "✅ PASS" : "❌ FAIL"} |`,
      );
    }
    md.push("");
    md.push("<details><summary>Coverage chi tiết theo từng file</summary>");
    md.push("");
    md.push("| File | Statements | Branches | Functions | Lines |");
    md.push("| :--- | ---: | ---: | ---: | ---: |");
    for (const f of coverageGate.perFile) {
      const cell = (key) => {
        const m = f.metrics.find((x) => x.key === key);
        return `${fmtPct(m.actual)}${m.threshold !== undefined && m.actual <= m.threshold ? " ⚠️" : ""}`;
      };
      md.push(
        `| \`${f.file}\` | ${cell("statements")} | ${cell("branches")} | ${cell("functions")} | ${cell("lines")} |`,
      );
    }
    md.push("");
    md.push("</details>");
  } else {
    md.push(`- ❌ ${coverageGate.reason}`);
  }
  md.push("");
  md.push("#### 3️⃣ LCOV Report");
  md.push("");
  if (lcovGate.available) {
    md.push(
      `- ✅ Đã sinh báo cáo LCOV: \`${relPath(LCOV_FILE)}\` (${lcovGate.records} file, ${lcovGate.sizeKb.toFixed(1)} KB)`,
    );
  } else {
    md.push(`- ❌ ${lcovGate.reason}`);
  }
  md.push("");
  md.push("---");
  md.push("");
  md.push(
    "_Quality Gate do `.github/scripts/quality-gate.js` thực thi; CI yêu cầu line coverage > 70%._",
  );
  md.push("");
  return md.join("\n");
}

function main() {
  out("=".repeat(78));
  out(`  EShop CI — QUALITY GATE  |  Tests 100% + Lines > ${COVERAGE_THRESHOLD}% + LCOV`);
  out("=".repeat(78));

  const testGate = checkTestGate();
  const coverageGate = checkCoverageGate();
  const lcovGate = checkLcovGate();

  // --- 1. Test gate -------------------------------------------------------
  out("");
  out("[1/3] TEST GATE — 100% test suites phải PASS");
  if (testGate.available) {
    out(`      Suites : ${testGate.passedSuites}/${testGate.totalSuites} pass, ${testGate.failedSuites} fail`);
    out(`      Tests  : ${testGate.passedTests}/${testGate.totalTests} pass, ${testGate.failedTests} fail`);
    if (testGate.failedSuiteNames.length) {
      out(`      Failed : ${testGate.failedSuiteNames.join(", ")}`);
    }
  } else {
    out(`      ${testGate.reason}`);
  }
  out(`      -> ${testGate.ok ? "PASS" : "FAIL"}`);

  // --- 2. Coverage gate ---------------------------------------------------
  out("");
  out(`[2/3] COVERAGE GATE — line coverage > ${COVERAGE_THRESHOLD}%`);
  if (coverageGate.available) {
    for (const m of coverageGate.metrics) {
      out(
        `      ${pad(m.label, 12)} ${padLeft(fmtPct(m.actual), 8)}  ${m.threshold === undefined ? "(theo dõi)" : `(phải > ${m.threshold}%)  ${m.ok ? "PASS" : "FAIL"}`}`,
      );
    }
  } else {
    out(`      ${coverageGate.reason}`);
  }
  out(`      -> ${coverageGate.ok ? "PASS" : "FAIL"}`);

  // --- 3. LCOV gate -------------------------------------------------------
  out("");
  out("[3/3] LCOV REPORT");
  if (lcovGate.available) {
    out(`      ${relPath(LCOV_FILE)} — ${lcovGate.records} file, ${lcovGate.sizeKb.toFixed(1)} KB`);
  } else {
    out(`      ${lcovGate.reason}`);
  }
  out(`      -> ${lcovGate.ok ? "PASS" : "FAIL"}`);

  const verdict = {
    ok: testGate.ok && coverageGate.ok && lcovGate.ok,
  };

  out("");
  out("=".repeat(78));
  out(
    verdict.ok
      ? "  VERDICT: ✅ QUALITY GATE PASSED — kiểm tra thêm Gitleaks và Build."
      : "  VERDICT: ❌ QUALITY GATE FAILED — PR bị chặn merge (Fail-Fast).",
  );
  out("=".repeat(78));

  // --- Ghi báo cáo --------------------------------------------------------
  const report = buildMarkdown({ testGate, coverageGate, lcovGate, verdict });
  try {
    fs.mkdirSync(COVERAGE_DIR, { recursive: true });
    fs.writeFileSync(REPORT_FILE, report, "utf8");
  } catch (err) {
    console.error(`Không ghi được báo cáo Quality Gate: ${err.message}`);
  }

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${report}\n`, "utf8");
  }

  if (!verdict.ok) {
    const problems = [];
    if (!testGate.ok) problems.push(`Test Gate: ${testGate.reason}`);
    if (!coverageGate.ok) problems.push(`Coverage Gate: ${coverageGate.reason}`);
    if (!lcovGate.ok) problems.push(`LCOV Gate: ${lcovGate.reason}`);
    annotate("Quality Gate FAILED", problems.join(" | "));
  }

  process.exit(verdict.ok ? 0 : 1);
}

main();
