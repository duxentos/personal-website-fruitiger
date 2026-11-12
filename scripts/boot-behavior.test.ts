import test from 'node:test';
import assert from 'node:assert/strict';
import {BOOT_DURATION_MS} from '../src/components/boot/bootTiming.ts';

test('startup uses the requested fixed five-second duration', () => {
  assert.equal(BOOT_DURATION_MS, 5000);
});
