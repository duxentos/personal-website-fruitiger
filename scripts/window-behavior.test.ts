import test from 'node:test';
import assert from 'node:assert/strict';
import {fitWindowFrame, moveWindowFrame} from '../src/components/windowGeometry.ts';

test('touch windows leave room to drag and stay completely in the workspace', () => {
  const size = {w: 355, h: 640};
  const frame = fitWindowFrame({x: 400, y: 900, w: 940, h: 650}, size, true);
  assert.ok(frame.w < size.w && frame.h < size.h);
  assert.ok(frame.x >= 0 && frame.x + frame.w <= size.w);
  assert.ok(frame.y >= 0 && frame.y + frame.h <= size.h);
  assert.deepEqual(moveWindowFrame(frame, -1000, -1000, size), {x: 0, y: 0});
  const far = moveWindowFrame(frame, 1000, 1000, size);
  assert.equal(far.x + frame.w, size.w);
  assert.equal(far.y + frame.h, size.h);
});

test('rotation and a short viewport keep controls reachable; zoom uses the full workspace', () => {
  const frame = fitWindowFrame({x: 500, y: 450, w: 600, h: 500}, {w: 300, h: 150}, true);
  assert.ok(frame.x + frame.w <= 300 && frame.y + frame.h <= 150);
  assert.ok(frame.h >= 56);
  assert.deepEqual(fitWindowFrame({...frame, zoom: true}, {w: 300, h: 150}, true), {x: 0, y: 0, w: 300, h: 150, zoom: true});
});
