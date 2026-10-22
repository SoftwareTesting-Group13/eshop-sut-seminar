# SQLite lock — controlled teaching demo

This branch prepares worksheet A. It does not change EShop business logic or
use `backend/database.sqlite`. Each invocation creates and removes its own
temporary SQLite file. No artificial log messages are presented as CI results.

The word `parallel` denotes overlapping write transactions on **two connections
in one Node process**, not two Jest workers. `BEGIN IMMEDIATE` and an awaited
insert establish that A holds the write lock before B attempts its write.
`busyTimeout=0` intentionally makes B report SQLITE_BUSY immediately.
`serial` runs the same writes after A commits, then verifies two committed rows.
This demonstrates lock contention; it does not prove the historical SUT failed
for this reason. It is not a flaky-rate experiment.

From repository root, after installing backend dependencies:

```powershell
node backend/demos/sqlite-lock.demo.cjs parallel
$parallelExit = $LASTEXITCODE
node backend/demos/sqlite-lock.demo.cjs serial
$serialExit = $LASTEXITCODE
Write-Output "parallel=$parallelExit serial=$serialExit"
```

Expected: parallel prints SQLITE_BUSY and exits 1; serial prints
`PASS committedWrites=2` and exits 0. Both release connections and remove the
isolated database. No fixed sleep controls the transaction ordering.

## CI preparation — not yet executed

Workflow `.github/workflows/ghuy-sqlite-lock-demo.yml` runs on pushes to this demo branch, with two
matrix jobs and fail-fast disabled. Parallel is intentionally a failed job;
serial should pass. Both upload their real output when the demo step runs.
A failed dependency-install step is not SQLite evidence.

Before publishing, review the demo branch diff. Push only this dedicated branch
when approved; never push it directly to main. The existing EShop workflow may
also run on any branch push; its results are separate from this teaching demo.

The push trigger is restricted to `test/giahuy-sqlite-lock-demo`. No run starts until this local branch is published. Manual dispatch is also declared.

After obtaining a real run, record run URL/attempt, full SHA, job/step, UTC time,
runner/Node/SQLite versions, raw job logs and excerpts. Label the worksheet
packet as a **controlled CI reproduction on a demo branch**. Copy sanitized
logs into the worksheet branch only after the run exists.

Suggested screenshot: `ghuy_03f_sqlite_ci_failure.png` for parallel SQLITE_BUSY;
`ghuy_03g_sqlite_serial_pass.png` for serial PASS, showing the run and job IDs.


## Local verification already performed

Recorded logs and environment are in `Materials/Sample_Logs/local/` on this
branch. They are local Windows results (Node 24), not CI results (planned
Ubuntu / Node 22). The files identify the pre-commit execution explicitly.
The verification checked exit codes, the SQLITE_BUSY message and two committed
writes in serial mode. Local dependencies were reused from the existing
worksheet workspace through NODE_PATH; no production database was accessed.
