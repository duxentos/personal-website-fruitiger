import test from 'node:test';
import assert from 'node:assert/strict';
import {BOOT_DURATION_MS,canEnterDesktop} from '../src/components/boot/bootTiming.ts';

test('startup uses the requested fixed five-second duration', () => {
  assert.equal(BOOT_DURATION_MS, 5000);
});

test('boot waits for both the minimum and required assets or fallbacks',()=>{
 assert.equal(canEnterDesktop(false,true),false);
 assert.equal(canEnterDesktop(true,false),false);
 assert.equal(canEnterDesktop(true,true),true);
});
