import test from 'node:test';
import assert from 'node:assert/strict';
import {queueClickFeedback} from '../src/audio/clickFeedback.ts';

test('unhandled clicks receive feedback, including clicks whose bubbling is stopped', () => {
  let callback = () => {};
  const engine = {requestCount: 0, plays: 0, async play() {this.plays++; return true;}};
  queueClickFeedback(engine, next => {callback = next;});
  assert.equal(engine.plays, 0);
  callback();
  assert.equal(engine.plays, 1);
});

test('an action-specific sound suppresses the generic click instead of doubling it', () => {
  let callback = () => {};
  const engine = {requestCount: 0, plays: 0, async play() {this.plays++; return true;}};
  queueClickFeedback(engine, next => {callback = next;});
  engine.requestCount++;
  callback();
  assert.equal(engine.plays, 0);
});
