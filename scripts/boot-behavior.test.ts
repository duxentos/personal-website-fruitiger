import test from 'node:test';
import assert from 'node:assert/strict';
import {pickBootDurationMs} from '../src/components/boot/bootTiming.ts';

test('startup timing covers 3–7 seconds and always stays within those bounds', () => {
  assert.equal(pickBootDurationMs(0), 3000);
  assert.equal(pickBootDurationMs(0.5), 5000);
  assert.equal(pickBootDurationMs(1), 7000);
  for (const sample of [-1, 0, 0.1, 0.25, 0.9, 1, 2, NaN, Infinity]) {
    const duration = pickBootDurationMs(sample);
    assert.ok(Number.isInteger(duration) && duration >= 3000 && duration <= 7000);
  }
});
