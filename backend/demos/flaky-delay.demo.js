// Week 5 / Failure Mode 3: synthetic async-delay demo, independent of the SUT DB.
// The assertion stays the same; injected work duration changes between runs.
jest.useRealTimers();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const profile = process.env.FLAKY_PROFILE || 'random';
const waitMs = 100;

if (!['fast', 'slow', 'random'].includes(profile)) {
  throw new Error('FLAKY_PROFILE must be fast, slow, or random.');
}

// Wide margins keep the controlled fast/slow demonstrations easy to reproduce.
// Random selects one duration per run; this is fault injection, not measured CI data.
const workDelayMs = profile === 'fast' ? 20
  : profile === 'slow' ? 200
    : Math.random() < 0.5 ? 20 : 200;

function startAsyncWork() {
  const state = { ready: false };
  const completed = sleep(workDelayMs).then(() => {
    state.ready = true;
  });
  return { state, completed };
}

describe('Failure Mode 3 - async delay / sleep-based flaky test', () => {
  test('sleep-based wait can inspect work before completion', async () => {
    const job = startAsyncWork();
    try {
      await sleep(waitMs);
      console.log(
        `[FM3][sleep] profile=${profile} workDelayMs=${workDelayMs} waitMs=${waitMs} ready=${job.state.ready}`,
      );
      expect(job.state.ready).toBe(true);
    } finally {
      // Drain the operation even after an assertion failure, avoiding leaked timers.
      await job.completed;
    }
  });

  test('await completion waits for the work instead of guessing a delay', async () => {
    const job = startAsyncWork();
    await job.completed;
    console.log(
      `[FM3][await] profile=${profile} workDelayMs=${workDelayMs} ready=${job.state.ready}`,
    );
    expect(job.state.ready).toBe(true);
  });
});
