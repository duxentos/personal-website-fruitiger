export const commandGuide=['cd -about me','help','clear','ls','pwd'];
export type Command={kind:'app';app:'welcome';description:string}|{kind:'utility';action:'help'|'clear'|'ls'|'pwd';description:string};
export function parseCommand(input:string):Command|undefined{const value=input.trim().toLowerCase().replace(/\s+/g,' ');if(value==='cd -about me')return{kind:'app',app:'welcome',description:'About Me'};if(['help','clear','ls','pwd'].includes(value))return{kind:'utility',action:value as 'help'|'clear'|'ls'|'pwd',description:value};return undefined;}
