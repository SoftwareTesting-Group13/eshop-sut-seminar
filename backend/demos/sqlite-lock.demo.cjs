// Controlled teaching reproduction: two connections, one disposable SQLite file.
// This is not a failure captured from the EShop application or parallel Jest workers.
const sqlite3 = require('sqlite3');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const mode = process.argv[2];
if (!['parallel', 'serial'].includes(mode)) {
  console.error('Usage: node backend/demos/sqlite-lock.demo.cjs parallel|serial');
  process.exitCode = 2;
} else {
  main(mode).catch((error) => {
    console.error(error.stack || error);
    process.exitCode = 1;
  });
}

function open(filename) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(filename, (error) => {
      if (error) return reject(error);
      db.configure('busyTimeout', 0);
      resolve(db);
    });
  });
}
function run(db, sql) {
  return new Promise((resolve, reject) => db.run(sql, (error) => error ? reject(error) : resolve()));
}
function get(db, sql) {
  return new Promise((resolve, reject) => db.get(sql, (error, row) => error ? reject(error) : resolve(row)));
}
function close(db) {
  return new Promise((resolve, reject) => db.close((error) => error ? reject(error) : resolve()));
}
function log(message) {
  console.log(`${new Date().toISOString()} [SQLITE-DEMO] ${message}`);
}

async function main(selectedMode) {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'ghuy-sqlite-demo-'));
  const filename = path.join(folder, 'isolated.sqlite');
  let first;
  let second;
  let transactionOpen = false;
  try {
    log(`mode=${selectedMode} processCount=1 connectionCount=2 busyTimeoutMs=0`);
    log(`node=${process.version} platform=${process.platform} temporaryDb=true`);
    if (process.env.GITHUB_RUN_ID) {
      log(`run=${process.env.GITHUB_RUN_ID} attempt=${process.env.GITHUB_RUN_ATTEMPT} sha=${process.env.GITHUB_SHA}`);
    }
    first = await open(filename);
    await run(first, 'PRAGMA journal_mode = DELETE');
    await run(first, 'CREATE TABLE writes (writer TEXT NOT NULL)');
    second = await open(filename);
    const version = await get(first, 'SELECT sqlite_version() AS version');
    log(`sqlite=${version.version} journalMode=DELETE sharedFile=true`);
    await run(first, 'BEGIN IMMEDIATE');
    transactionOpen = true;
    await run(first, "INSERT INTO writes VALUES ('A')");
    log('writer=A INSERT succeeded; write transaction remains open');
    if (selectedMode === 'serial') {
      await run(first, 'COMMIT');
      transactionOpen = false;
      log('writer=A COMMIT completed before writer=B starts');
    }
    log(`writer=B attempting INSERT while writerATransactionOpen=${transactionOpen}`);
    try {
      await run(second, "INSERT INTO writes VALUES ('B')");
    } catch (error) {
      log(`writer=B INSERT failed code=${error.code} message=${error.message}`);
      throw error;
    }
    if (selectedMode === 'parallel') {
      throw new Error('Demo did not reproduce SQLITE_BUSY: writer B unexpectedly succeeded');
    }
    const row = await get(first, 'SELECT COUNT(*) AS count FROM writes');
    if (row.count !== 2) throw new Error(`Expected 2 committed writes, received ${row.count}`);
    log(`PASS committedWrites=${row.count}`);
  } finally {
    if (first && transactionOpen) {
      await run(first, 'ROLLBACK');
      log('writer=A ROLLBACK completed during cleanup');
    }
    if (second) await close(second);
    if (first) await close(first);
    for (const suffix of ['', '-journal', '-wal', '-shm']) {
      const temporaryFile = filename + suffix;
      if (fs.existsSync(temporaryFile)) fs.unlinkSync(temporaryFile);
    }
    fs.rmdirSync(folder);
    log('Temporary database and connections cleaned up');
  }
}
