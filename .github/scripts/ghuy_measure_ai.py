"""One measured call through existing ai_triage.analyze; no retries or fake responses."""
import importlib.util
import io
import json
import os
from pathlib import Path
import re
import time
import urllib.error

out = Path('ci-artifacts/ai-metrics')
out.mkdir(parents=True, exist_ok=True)
key = os.getenv('GEMINI_API_KEY', '').strip()
model = os.getenv('GEMINI_MODEL', 'gemini-3.5-flash-lite')
metrics = {'api_status': 'not_called_missing_key', 'called': False, 'model': model,
           'http_status': None, 'request_body_latency_ms': None, 'response_json_valid': None,
           'analysis_generated': False, 'quality_assessed': False,
           'run_id': os.getenv('GITHUB_RUN_ID'), 'sha': os.getenv('GITHUB_SHA')}
def scrub(text):
    if key:
        text = text.replace(key, '[REDACTED_API_KEY]')
    return re.sub(r'\b(?:AIza[A-Za-z0-9_-]{30,}|gh[pousr]_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,})', '[REDACTED_TOKEN]', text)
if key:
    spec = importlib.util.spec_from_file_location('existing_triage', '.github/scripts/ai_triage.py')
    triage = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(triage)
    log_path = Path('ci-artifacts/metrics/pair-01-before-raw.txt')
    pair_path = Path('ci-artifacts/metrics/pair-results.json')
    valid_failure = False
    if pair_path.exists():
        try:
            rows = json.loads(pair_path.read_text(encoding='utf-8'))['results']
            valid_failure = any(r['variant'] == 'before' and r['valid'] and r['classification'] == 'test_fail' for r in rows)
        except (ValueError, KeyError, TypeError):
            pass
    if not log_path.exists() or not valid_failure:
        metrics['api_status'] = 'not_called_no_valid_failure_log'
    else:
        log = triage.read_log(str(log_path), 160, key)
        original_open = triage.urllib.request.urlopen
        def measured_open(*args, **kwargs):
            begin = time.perf_counter()
            metrics['called'] = True
            try:
                with original_open(*args, **kwargs) as response:
                    metrics['http_status'] = response.status
                    body = response.read()
                metrics['request_body_latency_ms'] = (time.perf_counter() - begin) * 1000
                try:
                    parsed = json.loads(body)
                    metrics['response_json_valid'] = True
                    (out / 'gemini-response.json').write_text(scrub(json.dumps(parsed, ensure_ascii=False, indent=2)) + '\n', encoding='utf-8')
                except (ValueError, UnicodeError):
                    metrics['response_json_valid'] = False
                return io.BytesIO(body)
            except urllib.error.HTTPError as exc:
                metrics['http_status'] = exc.code
                metrics['request_body_latency_ms'] = (time.perf_counter() - begin) * 1000
                raise
            except Exception:
                metrics['request_body_latency_ms'] = (time.perf_counter() - begin) * 1000
                raise
        triage.urllib.request.urlopen = measured_open
        try:
            report = triage.analyze(log, key, model, 45)
            (out / 'triage-analysis.md').write_text(scrub(report) + '\n', encoding='utf-8')
            metrics['api_status'] = 'success'
            metrics['analysis_generated'] = True
        except Exception as exc:
            metrics['api_status'] = 'api_or_analysis_error'
            metrics['safe_error'] = scrub(str(exc))
        finally:
            triage.urllib.request.urlopen = original_open
(out / 'ai-metrics.json').write_text(json.dumps(metrics, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(metrics, ensure_ascii=True))
