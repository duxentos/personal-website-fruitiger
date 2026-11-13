export type StorageLike = {getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem(key: string): void};
export const SETTINGS_KEY = 'azaan-os-settings';
const VERSION = 2;
const legacy: Record<string, string> = {desktop: 'azaan-desktop-preferences', music: 'azaan-ipod', sound: 'azaan-sound-preferences', icons: 'azaan-desktop-icon-order'};
export function object(value: unknown): Record<string, unknown> {return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};}
export function finite(value: unknown, fallback: number, min: number, max: number) {return typeof value === 'number' && Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;}
export function shape<T extends Record<string, unknown>>(defaults: T, value: unknown): T {
  const saved = object(value), result = {...defaults};
  for (const key of Object.keys(defaults) as (keyof T)[]) {
    const original = defaults[key], candidate = saved[key as string];
    if (typeof original === 'object' && original !== null && !Array.isArray(original)) result[key] = shape(original as Record<string, unknown>, candidate) as T[keyof T];
    else if (typeof original === typeof candidate && (typeof candidate !== 'number' || Number.isFinite(candidate))) result[key] = candidate as T[keyof T];
  }
  return result;
}
export function createSettingsStore(storage: StorageLike | null) {
  let memory: Record<string, unknown> = {};
  const parse = (text: string | null): unknown => {try {return text ? JSON.parse(text) : undefined;} catch {return undefined;}};
  function snapshot() {try {return object(parse(storage?.getItem(SETTINGS_KEY) ?? null));} catch {return {};}}
  return {
    read<T>(section: string, validate: (value: unknown) => T): T {
      const root = snapshot();
      if (typeof root.version === 'number' && root.version > VERSION) return validate(undefined);
      const sections = object(root.sections ?? root.data);
      let value = sections[section] ?? memory[section];
      if (value === undefined && legacy[section]) {try {value = parse(storage?.getItem(legacy[section]) ?? null);} catch {}}
      return validate(value);
    },
    write(section: string, value: unknown): boolean {
      const root = snapshot();
      if (typeof root.version === 'number' && root.version > VERSION) return false;
      memory[section] = value;
      try {if (!storage) return false; storage.setItem(SETTINGS_KEY, JSON.stringify({version: VERSION, sections: {...object(root.sections ?? root.data), ...memory, [section]: value}})); return true;} catch {return false;}
    },
    restoreDefaults() {
      const notes = this.read('notes', value => value);
      memory = notes === undefined ? {} : {notes};
      try {
        storage?.removeItem(SETTINGS_KEY);
        for (const key of Object.values(legacy)) storage?.removeItem(key);
        storage?.setItem(SETTINGS_KEY, JSON.stringify({version: VERSION, sections: memory}));
      } catch {}
    },
  };
}
let browserStorage: StorageLike | null = null;
try {if (typeof localStorage !== 'undefined') browserStorage = localStorage;} catch {}
export const settingsStore = createSettingsStore(browserStorage);
