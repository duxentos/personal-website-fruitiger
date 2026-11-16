type ClickEngine = {readonly requestCount: number; play: (key: 'desktop.click') => Promise<boolean>};
/** Let the target's own action sound win; otherwise supply one quiet click. */
export function queueClickFeedback(engine: ClickEngine, enqueue: (callback: () => void) => void = callback => {setTimeout(callback, 0);}) {
  const before = engine.requestCount;
  enqueue(() => {
    if (engine.requestCount === before) void engine.play('desktop.click');
  });
}
