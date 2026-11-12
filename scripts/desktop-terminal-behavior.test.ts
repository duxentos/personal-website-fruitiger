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

test('every terminal command requires the cd - prefix and dispatches the intended destination', () => {
  assert.ok(commandGuide.every(command => command.startsWith('cd -')));
  for (const command of commandGuide) assert.ok(parseCommand(command));
  assert.equal(parseCommand('open projects'), undefined);
  assert.equal(parseCommand('help'), undefined);
  assert.equal(parseCommand('cd -projects extra'), undefined);
  assert.equal(parseCommand('cd -nonexistent'), undefined);
  const app = parseCommand(' CD   -RESUME ');
  assert.ok(app?.kind === 'app');
  assert.equal(app.app, 'resume');
  const link = parseCommand('cd -linkedin');
  assert.ok(link?.kind === 'profile');
  assert.equal(link.profile, 'linkedin');
});
