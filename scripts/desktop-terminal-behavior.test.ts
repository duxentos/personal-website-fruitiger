import test from 'node:test';
import assert from 'node:assert/strict';
import {moveIcon, normalizeIconOrder} from '../src/components/iconOrder.ts';
import {commandGuide, parseCommand} from '../src/apps/terminal/commands.ts';

test('saved icon arrangements recover from invalid, repeated or missing entries', () => {
  assert.deepEqual(normalizeIconOrder(['resume', 'resume', 'unknown', 'connect']), ['resume', 'connect', 'projects', 'welcome']);
  assert.equal(normalizeIconOrder(null).length, 4);
  assert.deepEqual(moveIcon(normalizeIconOrder(null), 'welcome', 0), ['welcome', 'connect', 'resume', 'projects']);
  const order = normalizeIconOrder(null);
  assert.equal(moveIcon(order, 'resume', -1), order);
});

test('terminal exposes the minimal commands and rejects removed destinations', () => {
  assert.deepEqual(commandGuide, ['cd -about me','help','clear','ls','pwd']);
  for (const command of commandGuide) assert.ok(parseCommand(command));
  assert.deepEqual(parseCommand(' CD   -ABOUT ME '), {kind:'app',app:'welcome',description:'About Me'});
  for (const command of ['cd -resume','cd -linkedin','cd -projects','open projects','cd -about me extra']) assert.equal(parseCommand(command),undefined);
});
