import test from 'node:test';
import assert from 'node:assert/strict';
import {BOOT_DURATION_MS,BOOT_ASSET_TIMEOUT_MS,BOOT_EXIT_MS,canEnterDesktop} from '../src/components/boot/bootTiming.ts';

test('startup and bounded fallback fit the requested three-to-four-second interval', () => {
  assert.ok(BOOT_DURATION_MS>=3000);
  assert.ok(BOOT_DURATION_MS+BOOT_EXIT_MS<=4000);
  assert.ok(BOOT_ASSET_TIMEOUT_MS+BOOT_EXIT_MS<=4000);
});

test('boot waits for both the minimum and required assets or fallbacks',()=>{
 assert.equal(canEnterDesktop(false,true),false);
 assert.equal(canEnterDesktop(true,false),false);
 assert.equal(canEnterDesktop(true,true),true);
});
