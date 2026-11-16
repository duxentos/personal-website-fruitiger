import {desktopShortcuts} from './desktopLayout.ts';
export type ShortcutId = typeof desktopShortcuts[number]['id'];
const defaults = desktopShortcuts.map(shortcut => shortcut.id);
export function normalizeIconOrder(value: unknown): ShortcutId[] {
  const saved = Array.isArray(value) ? value : [];
  const valid = saved.filter((id): id is ShortcutId => defaults.includes(id));
  return [...new Set([...valid, ...defaults])];
}
export function moveIcon(order: ShortcutId[], id: ShortcutId, destination: number): ShortcutId[] {
  const from = order.indexOf(id);
  if (from < 0 || !Number.isInteger(destination) || destination < 0 || destination >= order.length) return order;
  const next = order.filter(item => item !== id);
  next.splice(destination, 0, id);
  return next;
}
