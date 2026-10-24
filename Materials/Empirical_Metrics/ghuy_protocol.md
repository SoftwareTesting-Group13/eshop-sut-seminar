# W6-20 — Protocol registered before CI sampling

Author: Nguyễn Gia Huy. Branch: `test/giahuy-week6-metrics`.
Outcome data will be stored separately; this protocol contains no measured rates.

## Units and fixed controls

- Ten independent workflow_dispatch runs, pair indices 1..10. Each runs one
  selected before Jest test and one selected after Jest test, each in a new
  Node/Jest process. Thus 10 workflow runs and 20 selected test invocations,
  not 20 independent workflow runs. Skipped non-selected tests are not samples.
- Existing `backend/demos/flaky-delay.demo.js` is unchanged. Before selects
  `sleep-based wait can inspect work before completion`; after selects
  `await completion waits for the work instead of guessing a delay`.
  Assertion is ready === true for both; only the wait strategy differs.
- Same full Git SHA for the batch, ubuntu-24.04 hosted runner label,
  Node 22.23.3, same package-lock SHA256, Jest config and demo file hashes.
  npm ci --no-audit --no-fund installs from that lockfile. Record actual image
  version/npm/Node; hosted hardware and scheduling cannot be held identical.
- Preselected balanced stress schedule: odd pairs slow (200 ms), even pairs
  fast (20 ms); waitMs 100. Both variants in each pair use the same profile.
  Odd pairs execute before then after; even pairs reverse order. Jest --no-cache.
- These are synthetic controlled durations, not natural EShop production flakes.
  A fast/slow mixture was chosen before data collection; report it prominently.

## Validity and retention

A valid invocation has one matching Jest assertion, an observed FM3 profile log,
parsed Jest result JSON and consistent assertion status/exit code. Passed/0 is
valid test_pass; failed/1 is valid test_fail. Install failure, missing/invalid
JSON, process timeout/signal or missing target test is infrastructure/harness
error and excluded from the rate denominator with an explicit reason.
All failed assertions remain in the denominator. Do not replace failed tests.

Target one valid observation per pair/variant. If infrastructure fails, retain
that run and rerun the same pair with the same SHA/profile, at most twice more.
The first valid observation for that pair/variant is included, never the best
outcome. Duplicate observations are retained and labelled, not silently dropped.
If 10 valid observations cannot be obtained, report the shortfall; do not invent.

Store variant, pair, run URL/ID/attempt, full SHA, UTC times, selected-test and
whole-invocation durations, classification, exit code, raw stdout/stderr and
Jest JSON. Raw streams are stored as stdout followed by stderr, explicitly
labelled; do not claim reconstructed interleaving.

failure_rate = valid test_fail / valid invocations.
reduction_pp = 100 * (before_rate - after_rate).
Even 10/10 passes only means no failure observed in this limited controlled sample.

## Cache comparison (one exploratory cold/warm pair)

Only pair-1 workflow runs cache jobs. Use an experiment-specific cache key
`ghuy-w620-<unique-id>-Linux-node22.23.3-<lock-sha256>`, exact lookup, no fallback
restore key. No shared cache is deleted or replaced. Cold must miss and install;
save after the measurement. Warm starts only after cold saves and must hit the
same key; install must be skipped. Both use same revision/OS/Node/dependencies.

Common metric: dependency preparation wall interval from a monotonic timestamp
before restore to the timestamp after restore + conditional npm ci. This includes
step transitions/orchestration and is not just npm ci or total job duration.
Exclude checkout, setup-node, cache save/upload. Record individual restore and
install step durations and whole-job duration from jobs API, separately.
Warm skipped npm ci has no install-time measurement; do not divide cold npm ci
by a zero/skipped warm install. speedup = cold preparation interval / warm
preparation interval, only for verified miss/hit and matching environment.
One pair cannot support general performance claims. Image/version differences
or cache-state mismatches make speedup unavailable, not adjusted to look better.

## AI triage evaluation

Pair 1 supplies one genuine failed before log. Reuse current ai_triage.analyze
and prompt unchanged; at most one Gemini call, no retries. Use repository
GEMINI_API_KEY only if configured; otherwise record not_called_missing_key.
No key is printed or stored. Model is the current configured default.

Capture API state/HTTP status, client request+response-body latency, actual JSON
response when returned and parse validity, and generated Markdown. The observer
buffers the real HTTP body but does not change the request or diagnosis code.
Missing credentials, HTTP/quota/model errors or no report are real outcomes;
not a successful diagnosis. Structural JSON validity is not diagnostic accuracy.

Reference analysis registered before the call: the failed selected sleep test
checks readiness after a fixed 100-ms wait while work is configured 200 ms and
ready=false is observed. Waiting for actual completion is a supported repair
hypothesis, not proof of SUT-wide correctness. One fail cannot establish
uncontrolled flakiness. SQLite/coupon faults have no supporting sign in this log.

After the call, enumerate diagnostic hypotheses from the actual response, cite
its text and supporting/contradicting log lines against this reference, and mark
supported/unsupported/uncertain. If calculating a support fraction, show numerator
and denominator and label it as a small analyst-coded evidence-support measure,
not overall accuracy. No response means quality and support fraction are N/A.

## Side effects and dispatch gate

- Dedicated workflow; contents:read only, no PR comments, deployment or business
  changes. Only AI evaluation job sees the Gemini key; it may make one billable
  request if configured, otherwise skips truthfully. Jobs have bounded timeouts.
- Push restricted to the metrics branch registers the new workflow without
  samples; all measurement jobs require dispatch inputs. Existing EShop CI also
  runs once on branch publication under the unchanged group workflow; do not
  include it in the sample. No main merge or change to eshop-ci.yml.
- API dispatch uses the registered numeric workflow ID and explicit metrics ref;
  verify full SHA, event and workflow name before accepting runs.
  See [GitHub workflow_dispatch documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch).
- Review workflow syntax, trigger/permissions, local classification checks,
  output redaction and unique key before dispatch. Preserve all attempts.
