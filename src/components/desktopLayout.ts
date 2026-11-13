export const touchDesktopQuery = '(max-width: 1023px), (pointer: coarse)';
export function isTouchDesktop() {
  return typeof matchMedia === 'function' && matchMedia(touchDesktopQuery).matches;
}
export const desktopShortcuts = [
  {id: 'connect', label: 'find me'},
  {id: 'resume', label: 'résumé'},
  {id: 'projects', label: 'project files'},
  {id: 'welcome', label: 'about me'},
] as const;
export const dockApps = ['terminal', 'notes', 'ipod', 'stories', 'mii'] as const;
