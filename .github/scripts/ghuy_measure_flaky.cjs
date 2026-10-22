// Measure the existing two Jest tests separately; no business/test source changes.
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const pair = Number(process.env.GHUY_PAIR_INDEX);
if (!Number.isInteger(pair) || pair < 1 || pair > 10) throw Error('Pair index must be 1..10');
const profile = pair % 2 ? 'slow' : 'fast';
const out = path.resolve(process.env.GHUY_METRICS_OUT || path.join(root, 'ci-artifacts/metrics'));
fs.mkdirSync(out, { recursive: true });
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex');
const tests = {
  before: 'sleep-based wait can inspect work before completion',
  after: 'await completion waits for the work instead of guessing a delay',
};
const order = pair % 2 ? ['before', 'after'] : ['after', 'before'];
const results = [];
for (const variant of order) {
  const stem = `pair-${String(pair).padStart(2, '0')}-${variant}`;
  const jsonFile = path.join(out, stem + '-jest.json');
  const rawFile = path.join(out, stem + '-raw.txt');
  const startedAt = new Date().toISOString();
  const start = process.hrtime.bigint();
  const result = cp.spawnSync(process.execPath, [
    process.env.GHUY_JEST_PATH || path.join(root, 'backend/node_modules/jest/bin/jest.js'),
    '--config', 'demos/jest.flaky.config.cjs', '--runInBand', '--ci', '--no-cache',
    '--json', `--outputFile=${jsonFile}`, '--testNamePattern', tests[variant],
  ], { cwd: path.join(root, 'backend'), env: { ...process.env, FLAKY_PROFILE: profile, FORCE_COLOR: '0' },
       encoding: 'utf8', timeout: 30000 });
  const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
  const raw = '# Captured stdout then stderr; stream ordering is not reconstructed.\n'
    + '# STDOUT\n' + (result.stdout || '') + '\n# STDERR\n' + (result.stderr || '');
  fs.writeFileSync(rawFile, raw);
  let report; let parseError = null;
  try { report = JSON.parse(fs.readFileSync(jsonFile, 'utf8')); } catch (_) { parseError = 'missing_or_invalid_jest_json'; }
  const selected = (report?.testResults || []).flatMap(s => s.assertionResults || []).filter(a => a.title === tests[variant]);
  const assertion = selected[0];
  const observed = raw.includes(`[FM3][${variant === 'before' ? 'sleep' : 'await'}] profile=${profile}`);
  const valid = !result.error && selected.length === 1 && observed
    && ['passed', 'failed'].includes(assertion?.status)
    && ((assertion.status === 'passed' && result.status === 0) || (assertion.status === 'failed' && result.status === 1));
  const entry = {
    experiment: process.env.GHUY_EXPERIMENT || 'local-validation', pair_index: pair, variant,
    invocation_order: order.indexOf(variant) + 1, profile, work_delay_ms: profile === 'slow' ? 200 : 20, wait_ms: 100,
    run_id: process.env.GITHUB_RUN_ID || null, run_attempt: process.env.GITHUB_RUN_ATTEMPT || null,
    run_url: process.env.GITHUB_RUN_ID ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}` : null,
    sha: process.env.GITHUB_SHA || null, started_at_utc: startedAt, completed_at_utc: new Date().toISOString(),
    invocation_duration_ms: durationMs, selected_assertion_duration_ms: assertion?.duration ?? null,
    exit_code: result.status, signal: result.signal, valid, classification: valid ? (assertion.status === 'passed' ? 'test_pass' : 'test_fail') : 'infrastructure_or_harness_error',
    invalid_reason: valid ? null : (result.error?.code || parseError || 'unexpected_assertion_or_exit'),
    selected_test_name: tests[variant], raw_log: path.basename(rawFile), jest_json: fs.existsSync(jsonFile) ? path.basename(jsonFile) : null,
    raw_sha256: crypto.createHash('sha256').update(fs.readFileSync(rawFile)).digest('hex'),
    node: process.version, platform: process.platform, runner_os: process.env.RUNNER_OS || null,
    runner_image: process.env.ImageOS || null, runner_image_version: process.env.ImageVersion || null,
    package_lock_sha256: hash('backend/package-lock.json'), demo_sha256: hash('backend/demos/flaky-delay.demo.js'),
    jest_config_sha256: hash('backend/demos/jest.flaky.config.cjs'),
  };
  results.push(entry);
  console.log(`${stem} ${entry.classification} profile=${profile} durationMs=${durationMs.toFixed(3)}`);
}
fs.writeFileSync(path.join(out, 'pair-results.json'), JSON.stringify({ unit: 'one selected Jest test invocation; two invocations per workflow run', results }, null, 2) + '\n');
