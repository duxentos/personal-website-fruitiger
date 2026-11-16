/** Read frame/delay metadata without decoding or mistaking compressed bytes for frames. */
export function inspectGif(bytes:Uint8Array){
 const data=Buffer.from(bytes);const header=data.toString('ascii',0,6);
 if(!['GIF87a','GIF89a'].includes(header)||data.length<13)throw new Error('Expected GIF image bytes');
 let cursor=13+(data[10]&128?3*2**((data[10]&7)+1):0),frames=0,durationMs=0,delayMs=0;
 function blocks(){while(true){if(cursor>=data.length)throw new Error('Truncated GIF blocks');const size=data[cursor++];if(!size)return;cursor+=size;if(cursor>data.length)throw new Error('Truncated GIF block');}}
 while(cursor<data.length){const kind=data[cursor++];
  if(kind===0x3b)return{frames,durationMs,width:data.readUInt16LE(6),height:data.readUInt16LE(8)};
  if(kind===0x21){const label=data[cursor++];if(label===0xf9){if(data[cursor]!==4||cursor+6>data.length)throw new Error('Invalid GIF control block');delayMs=data.readUInt16LE(cursor+2)*10;}blocks();}
  else if(kind===0x2c){if(cursor+9>data.length)throw new Error('Truncated GIF frame');const packed=data[cursor+8];cursor+=9;if(packed&128)cursor+=3*2**((packed&7)+1);cursor++;blocks();frames++;durationMs+=delayMs;delayMs=0;}
  else throw new Error('Invalid GIF record');
 }
 throw new Error('Missing GIF trailer');
}
