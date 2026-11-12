import type {WindowId} from '../../components/Desktop';
type Command = {name: string; description: string} & (
  | {kind: 'app'; app: WindowId}
  | {kind: 'profile'; profile: 'linkedin' | 'github' | 'instagram' | 'devpost'}
  | {kind: 'music'; action: 'play' | 'pause' | 'next' | 'previous'}
  | {kind: 'utility'; action: 'help' | 'apps' | 'clear' | 'home'}
);
export const commands: Command[] = [
  {name: 'help', description: 'all commands', kind: 'utility', action: 'help'},
  {name: 'projects', description: 'project files', kind: 'app', app: 'projects'},
  {name: 'resume', description: 'my résumé', kind: 'app', app: 'resume'},
  {name: 'about', description: 'about me', kind: 'app', app: 'welcome'},
  {name: 'findme', description: 'find me online', kind: 'app', app: 'connect'},
  {name: 'notes', description: 'a welcome note', kind: 'app', app: 'notes'},
  {name: 'ipod', description: 'music player', kind: 'app', app: 'ipod'},
  {name: 'settings', description: 'system preferences', kind: 'app', app: 'settings'},
  {name: 'linkedin', description: 'LinkedIn profile', kind: 'profile', profile: 'linkedin'},
  {name: 'github', description: 'GitHub profile', kind: 'profile', profile: 'github'},
  {name: 'instagram', description: 'Instagram profile', kind: 'profile', profile: 'instagram'},
  {name: 'devpost', description: 'Devpost profile', kind: 'profile', profile: 'devpost'},
  {name: 'play', description: 'play music', kind: 'music', action: 'play'},
  {name: 'pause', description: 'pause music', kind: 'music', action: 'pause'},
  {name: 'next', description: 'next track', kind: 'music', action: 'next'},
  {name: 'previous', description: 'previous track', kind: 'music', action: 'previous'},
  {name: 'apps', description: 'list apps', kind: 'utility', action: 'apps'},
  {name: 'home', description: 'return to the desktop', kind: 'utility', action: 'home'},
  {name: 'clear', description: 'clear the terminal', kind: 'utility', action: 'clear'},
];
export const commandGuide = commands.map(command => `cd -${command.name}`);
export function parseCommand(input: string): Command | undefined {
  const match = /^cd\s+-([a-z]+)$/i.exec(input.trim());
  return match ? commands.find(command => command.name === match[1].toLowerCase()) : undefined;
}
