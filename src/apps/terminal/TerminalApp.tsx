import {useRef, useState, type FormEvent} from 'react';
import {useDesktop} from '../../components/Desktop';
import {useMusic} from '../ipod/MusicProvider';
import {playSound} from '../../audio/SoundEngine';
import {MiiCompanion} from '../../components/MiiCompanion';
import {profile} from '../../profile';
import {commands, commandGuide, parseCommand} from './commands';

export function TerminalApp() {
  const desktop = useDesktop();
  const music = useMusic();
  const [lines, setLines] = useState(['welcome to azaanOS.', 'try cd -help for every command, or tap one below.']);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [position, setPosition] = useState(0);
  const end = useRef<HTMLDivElement>(null);

  function runCommand(raw: string) {
    if (!raw.trim()) return;
    setHistory(current => [...current, raw]);
    setPosition(history.length + 1);
    setInput('');
    const command = parseCommand(raw);
    let output = '';
    if (!command) {
      output = 'unknown command. try cd -help.';
      playSound('desktop.error');
    } else if (command.kind === 'app') {
      desktop.open(command.app);
      output = `opened ${command.description}.`;
    } else if (command.kind === 'profile') {
      window.open(profile[command.profile], '_blank', 'noopener,noreferrer');
      output = `opened ${command.description} in a new tab.`;
    } else if (command.kind === 'music') {
      if (command.action === 'play') music.play();
      if (command.action === 'pause') music.pause();
      if (command.action === 'next') music.next();
      if (command.action === 'previous') music.previous();
      output = `${command.description} requested. check the iPod for playback status.`;
    } else if (command.action === 'clear') {
      setLines([]);
      return;
    } else if (command.action === 'home') {
      desktop.showDesktop();
      output = 'back home.';
    } else if (command.action === 'apps') {
      output = commands.filter(item => item.kind === 'app').map(item => `cd -${item.name}`).join('  ·  ');
    } else {
      output = commands.map(item => `cd -${item.name.padEnd(10)} ${item.description}`).join('\n') + '\n\n↑/↓ history · tab to complete';
    }
    setLines(current => [...current, 'azaan@desktop ~ % ' + raw, output]);
    requestAnimationFrame(() => end.current?.scrollIntoView({block: 'end'}));
  }

  function submit(event: FormEvent) {event.preventDefault(); runCommand(input.trim());}
  return <div className="terminal-app" onClick={event => {
    if (!(event.target as HTMLElement).closest('button,summary')) document.getElementById('terminal-input')?.focus();
  }}>
    <MiiCompanion compact context="terminal"/>
    <div className="terminal-output" aria-live="polite">{lines.map((line, index) => <div key={index}>{line}</div>)}</div>
    <details className="terminal-commands"><summary>available commands</summary><div>{commands.map(command => <button key={command.name} onClick={() => runCommand(`cd -${command.name}`)} title={command.description}>cd -{command.name}</button>)}</div></details>
    <form onSubmit={submit}>
      <label htmlFor="terminal-input">azaan@desktop ~ %</label>
      <input id="terminal-input" aria-label="terminal command" autoCapitalize="none" autoComplete="off" spellCheck={false} value={input}
        placeholder="cd -help" onChange={event => setInput(event.target.value)} onKeyDown={event => {
          if (event.key === 'ArrowUp') {event.preventDefault(); const index = Math.max(0, position - 1); setPosition(index); setInput(history[index] || '');}
          if (event.key === 'ArrowDown') {event.preventDefault(); const index = Math.min(history.length, position + 1); setPosition(index); setInput(history[index] || '');}
          if (event.key === 'Tab' && !event.shiftKey && input.trim()) {const completion = commandGuide.find(command => command.startsWith(input.toLowerCase())); if (completion && completion !== input) {event.preventDefault(); setInput(completion);}}
        }}/>
      <button type="submit">run</button>
    </form>
    <div ref={end}/>
  </div>;
}

export function NotesApp() {
  return <div className="notes-desk">
    <article className="notes-guide welcome-note">
      <div className="note-heading"><span className="micro">a note from azaan</span><MiiCompanion compact context="notes"/></div>
      <h1>Welcome to my personal website</h1>
      <p>hey my name is azaan, a first year comp eng student at the University of Waterloo.</p>
      <p>I enjoy bringing hardware and software together. I’m part of Waterloo’s Biomechatronics design team, working on an assistive exoskeleton, and I’ve been building a rehabilitation device and clinical software through ClinTempo.</p>
      <p className="note-hobby">Outside engineering, my favourite hobby is cricket.</p>
    </article>
    <article className="notes-guide engineering-note">
      <span className="micro">another little note</span>
      <h2>Why I want to do engineering</h2>
      <p>I’d love to use engineering to make things that are useful to people. My work on assistive technology, rehabilitation devices and clinical software brings together the parts I enjoy most: code, circuits, and solving practical problems.</p>
      <p>I want to keep learning how things work, testing ideas, and turning them into something real — especially where hardware and software meet.</p>
    </article>
  </div>;
}
