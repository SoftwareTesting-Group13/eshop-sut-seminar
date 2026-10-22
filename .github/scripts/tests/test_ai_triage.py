"""Offline checks for log transport, output, and API failure handling."""

import contextlib
import importlib.util
import io
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import urllib.error


spec = importlib.util.spec_from_file_location("ai_triage", Path(__file__).parents[1] / "ai_triage.py")
triage = importlib.util.module_from_spec(spec)
spec.loader.exec_module(triage)


def response(*texts, finish_reason="STOP"):
    return io.BytesIO(json.dumps({
        "candidates": [{
            "finishReason": finish_reason,
            "content": {"role": "model", "parts": [
                {"text": "PRIVATE_THOUGHT", "thought": True},
                *[{"text": text} for text in texts],
            ]},
        }],
    }).encode())


class TriageTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.folder = Path(self.temp.name)
        self.log = self.folder / "jest.log"
        self.log.write_text("FAIL coupon.test.js\nExpected: >= 0\nReceived: -9000000", encoding="utf-8")
        self.source = self.folder / "coupon-discount.js"
        self.source.write_text(
            "function calculateDiscount(total, coupon) {\n"
            "  if (coupon.type === 'percent') {\n"
            "    return Math.floor(total * (1 - coupon.discount_value));\n"
            "  }\n}\n", encoding="utf-8",
        )
        self.env = patch.dict(os.environ, {
            "GEMINI_API_KEY": "test-key", "GEMINI_MODEL": triage.DEFAULT_MODEL,
            "OPENAI_API_KEY": "old-openai-key", "LLM_API_KEY": "old-llm-key",
            "GITHUB_STEP_SUMMARY": "",
        })
        self.env.start()
        self.addCleanup(self.env.stop)

    def run_cli(self, *args):
        out, err = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            code = triage.main(list(args))
        return code, out.getvalue(), err.getvalue()

    @patch.object(triage.urllib.request, "urlopen")
    def test_file_to_api_to_markdown_and_summary(self, call):
        call.return_value = response("### Tóm tắt", "### Vị trí và cơ chế\nLỗi coupon tại dòng 3")
        report = self.folder / "nested" / "report.md"
        summary = self.folder / "summary.md"
        summary.write_text("Existing summary\n", encoding="utf-8")
        with patch.dict(os.environ, {"GITHUB_STEP_SUMMARY": str(summary)}):
            code, out, err = self.run_cli(
                "--log-file", str(self.log), "--source-file", str(self.source),
                "--output", str(report),
                "--model", "models/" + triage.DEFAULT_MODEL,
            )
        self.assertEqual((code, err), (0, ""))
        self.assertEqual(report.read_text(encoding="utf-8"), out)
        self.assertEqual(summary.read_text(encoding="utf-8"), "Existing summary\n\n" + out)
        request = call.call_args.args[0]
        payload = json.loads(request.data)
        self.assertEqual(request.full_url, f"{triage.API_URL}/{triage.DEFAULT_MODEL}:generateContent")
        self.assertEqual(request.get_header("X-goog-api-key"), "test-key")
        self.assertIsNone(request.get_header("Authorization"))
        self.assertNotIn("test-key", request.full_url)
        self.assertIn("Received: -9000000", payload["contents"][0]["parts"][0]["text"])
        self.assertIn("3:     return Math.floor(total * (1 - coupon.discount_value));", payload["contents"][0]["parts"][0]["text"])
        self.assertIn(f"File: {self.source}", payload["contents"][0]["parts"][0]["text"])
        self.assertEqual(payload["systemInstruction"]["parts"][0]["text"], triage.INSTRUCTIONS)
        self.assertIn("# AI Log Triage — Bug Diagnosis", out)
        self.assertIn("source `", out)
        self.assertNotIn("PRIVATE_THOUGHT", out)
        self.assertIn("Lỗi coupon tại dòng 3", out)

    @patch.object(triage.urllib.request, "urlopen")
    def test_stdin_dry_run_trims_log_and_does_not_call_api(self, call):
        stdin = io.TextIOWrapper(io.BytesIO(b"first\nsecond\nthird\n"), encoding="utf-8")
        with patch.object(triage.sys, "stdin", stdin), patch.dict(os.environ, {"GEMINI_API_KEY": ""}):
            code, out, _ = self.run_cli("--dry-run", "--max-lines", "2")
        self.assertEqual(code, 0)
        self.assertTrue(out.endswith("second\nthird\n"))
        self.assertNotIn("first", out)
        call.assert_not_called()

    @patch.object(triage.urllib.request, "urlopen")
    def test_dry_run_shows_numbered_source_without_api_call(self, call):
        with patch.dict(os.environ, {
            "GITHUB_REPOSITORY": "example/eshop", "GITHUB_SHA": "abc123",
            "GITHUB_SERVER_URL": "https://github.com",
        }):
            # Absolute paths have no repository permalink; line numbers still work.
            code, out, err = self.run_cli(
                "--dry-run", "--log-file", str(self.log), "--source-file", str(self.source),
            )
        self.assertEqual((code, err), (0, ""))
        self.assertIn("## Source sẽ gửi", out)
        self.assertIn("3:     return Math.floor(total * (1 - coupon.discount_value));", out)
        self.assertNotIn("GitHub permalink (thêm", out.split("## Source sẽ gửi", 1)[1])
        call.assert_not_called()

    def test_relative_source_has_permalink_to_tested_commit(self):
        with patch.dict(os.environ, {
            "GITHUB_REPOSITORY": "example/eshop", "GITHUB_SHA": "abc123",
            "GITHUB_SERVER_URL": "https://github.com",
        }):
            with patch.object(triage.Path, "read_text", return_value=self.source.read_text(encoding="utf-8")):
                context = triage.read_source("backend/coupon-discount.js", "test-key")
        self.assertIn(
            "https://github.com/example/eshop/blob/abc123/backend/coupon-discount.js",
            context,
        )

    def test_windows_encoding_ansi_and_key_redaction(self):
        self.log.write_bytes("\x1b[31mLỗi test-key\x1b[0m".encode("utf-16"))
        self.assertEqual(triage.read_log(str(self.log), 100, "test-key"), "Lỗi [REDACTED_API_KEY]")

    @patch.object(triage.urllib.request, "urlopen")
    def test_empty_input_or_missing_key_does_not_call_api(self, call):
        with patch.dict(os.environ, {"GEMINI_API_KEY": ""}):
            code, _, err = self.run_cli("--log-file", str(self.log))
        self.assertEqual(code, 1)
        self.assertIn("GEMINI_API_KEY", err)
        self.log.write_text(" \n", encoding="utf-8")
        code, _, err = self.run_cli("--log-file", str(self.log))
        self.assertEqual(code, 1)
        self.assertIn("empty", err)
        call.assert_not_called()

    @patch.object(triage.urllib.request, "urlopen")
    def test_api_errors_leave_existing_report_untouched(self, call):
        report = self.folder / "report.md"
        report.write_text("Previous report", encoding="utf-8")
        failures = [
            (urllib.error.HTTPError(triage.API_URL, 429, "quota", {}, None), "Gemini quota or rate limit"),
            (urllib.error.URLError("offline"), "Cannot reach Gemini"),
            (TimeoutError(), "timed out"),
        ]
        for http_code, status, reason, expected in [
            (400, "INVALID_ARGUMENT", "API_KEY_INVALID", "Gemini API key is invalid"),
            (403, "PERMISSION_DENIED", "SERVICE_DISABLED", "project/model access"),
            (404, "NOT_FOUND", None, "Gemini model name"),
            (429, "RESOURCE_EXHAUSTED", None, "status=RESOURCE_EXHAUSTED"),
            (429, "RESOURCE_EXHAUSTED", "RATE_LIMIT_EXCEEDED", "Retry-After: 12 seconds"),
            (429, "test-key", "test-key", "Gemini quota or rate limit"),
            (503, "UNAVAILABLE", None, "Try again later"),
        ]:
            body = json.dumps({"error": {
                "code": http_code, "status": status, "message": "SECRET_MESSAGE test-key",
                "details": [{"@type": "type.googleapis.com/google.rpc.ErrorInfo", "reason": reason}],
            }}).encode()
            failure = urllib.error.HTTPError(triage.API_URL, http_code, "limited", {"Retry-After": "12"}, io.BytesIO(body))
            failures.append((failure, expected))
        for body in (b"invalid JSON SECRET_MESSAGE test-key", b"[]", b'{"error": null}'):
            failures.append((
                urllib.error.HTTPError(triage.API_URL, 429, "limited", {}, io.BytesIO(body)),
                "Gemini quota or rate limit",
            ))
        for failure, expected in failures:
            with self.subTest(error=type(failure).__name__, hint=expected):
                call.side_effect = failure
                code, out, err = self.run_cli("--log-file", str(self.log), "--output", str(report))
                self.assertEqual(code, 1)
                self.assertEqual(out, "")
                self.assertIn("ai_triage:", err)
                self.assertIn(expected, err)
                self.assertNotIn("test-key", err)
                self.assertNotIn("SECRET_MESSAGE", err)
                self.assertEqual(report.read_text(encoding="utf-8"), "Previous report")

    @patch.object(triage.urllib.request, "urlopen")
    def test_invalid_incomplete_and_empty_responses_are_not_success(self, call):
        invalid_results = [
            io.BytesIO(b"invalid"), io.BytesIO(b"[]"),
            io.BytesIO(b'{"promptFeedback":{"blockReason":"SAFETY"}}'),
            io.BytesIO(b'{"candidates":[]}'), io.BytesIO(b'{"candidates":[null]}'),
            response("Partial", finish_reason="MAX_TOKENS"),
            response("Blocked", finish_reason="SAFETY"), response(),
        ]
        for result in invalid_results:
            with self.subTest(result=result):
                call.return_value = result
                code, out, err = self.run_cli("--log-file", str(self.log))
                self.assertEqual(code, 1)
                self.assertEqual(out, "")
                self.assertIn("ai_triage:", err)


if __name__ == "__main__":
    unittest.main()
