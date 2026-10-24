const fs=require('fs'),ot=require('opentype.js'),w=require('wawoff2'),QR=require('qrcode');
const REPO='/home/user/root-jylee.github.io', OUT=REPO+'/assets/brand'; fs.mkdirSync(OUT,{recursive:true});
const URL='https://root-jylee.github.io/';
(async()=>{
  const cal=JSON.parse(fs.readFileSync(__dirname+'/glyph/calR.json'));
  const lmB=ot.parse(new Uint8Array(await w.decompress(fs.readFileSync(REPO+'/assets/fonts/LM-bold.woff2'))).buffer);
  const lmR=ot.parse(new Uint8Array(await w.decompress(fs.readFileSync(REPO+'/assets/fonts/LM-regular.woff2'))).buffer);
  const NAVY='#0b2a4d',GOLD='#e0b13a',RED='#c0392b';
  const rad=(c,sw=6)=>`<path d="M6 58 L22 92 L40 14 L96 14" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const R=(c)=>`<path transform="translate(44 78) scale(.70)" d="${cal.d}" fill="${c}"/>`;
  const markG=(cRad,cR,sw)=>rad(cRad,sw)+R(cR);
  // ---- text on arc
  const adv=(f,ch,fs)=>f.charToGlyph(ch).advanceWidth/f.unitsPerEm*fs;
  function arcText(font,text,fs,track,cx,cy,r,centerDeg,inward,fill){
    const widths=[...text].map(ch=>adv(font,ch,fs)); const total=widths.reduce((a,b)=>a+b,0)+track*(text.length-1);
    const totalAng=total/r; let out=''; let cum=0;
    [...text].forEach((ch,i)=>{const mid=cum+widths[i]/2; const off=(mid-total/2)/r; // radians
      const th=inward? (centerDeg*Math.PI/180 - off) : (centerDeg*Math.PI/180 + off);
      const px=cx+r*Math.cos(th), py=cy+r*Math.sin(th);
      const phi=(inward? th-Math.PI/2 : th+Math.PI/2)*180/Math.PI;
      const p=font.charToGlyph(ch).getPath(-widths[i]/2,0,fs).toPathData(2);
      if(ch!==' ') out+=`<path transform="translate(${px.toFixed(2)} ${py.toFixed(2)}) rotate(${phi.toFixed(2)})" d="${p}" fill="${fill}"/>`;
      cum+=widths[i]+track;});
    return {svg:out,deg:totalAng*180/Math.PI};
  }
  function seal(ink,twoTone){
    const cx=200,cy=200; const inkR=twoTone?GOLD:ink, inkT=ink;
    let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">`;
    s+=`<circle cx="${cx}" cy="${cy}" r="192" fill="none" stroke="${inkT}" stroke-width="7"/>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="140" fill="none" stroke="${inkT}" stroke-width="2.5"/>`;
    const top=arcText(lmB,'ROOT LAB',30,4,cx,cy,152,-90,false,inkT);
    const bot=arcText(lmR,'THE CATHOLIC UNIVERSITY OF KOREA',19,2.2,cx,cy,168,90,true,inkT);
    s+=top.svg+bot.svg;
    // separators at 9 and 3 o'clock
    for(const a of [Math.PI,0]){const px=cx+160*Math.cos(a),py=cy+160*Math.sin(a);s+=`<path transform="translate(${px} ${py}) rotate(45)" d="M-5 0 L0 -5 L5 0 L0 5 Z" fill="${inkT}"/>`;}
    // centre mark
    const sc=2.05; s+=`<g transform="translate(${(cx-51*sc).toFixed(1)} ${(cy-53*sc).toFixed(1)}) scale(${sc})">${markG(inkR,inkT,6)}</g>`;
    s+='</svg>'; return {s,top:top.deg,bot:bot.deg};
  }
  const sr=seal(RED,false), sn=seal(NAVY,false), st=seal(NAVY,true);
  fs.writeFileSync(OUT+'/seal-red.svg',sr.s); fs.writeFileSync(OUT+'/seal-navy.svg',sn.s); fs.writeFileSync(OUT+'/seal-navy-gold.svg',st.s);
  console.log('seal arcs deg: top',sr.top.toFixed(1),'bottom',sr.bot.toFixed(1));
  // ---- QR
  const q=QR.create(URL,{errorCorrectionLevel:'H'}); const n=q.modules.size, d=q.modules.data;
  console.log('QR version',q.version,'modules',n);
  const M=4; // quiet zone modules
  const W=n+2*M; let cells='';
  for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(d[y*n+x])cells+=`M${x+M} ${y+M}h1v1h-1z`;
  const qrSvg=(withMark,fg=NAVY)=>{let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" width="${W*20}" height="${W*20}" shape-rendering="crispEdges"><rect width="${W}" height="${W}" fill="#fff"/><path d="${cells}" fill="${fg}"/>`;
    if(withMark){const box=Math.round(n*0.26); const bx=(W-box)/2; s+=`<rect x="${bx}" y="${bx}" width="${box}" height="${box}" rx="${(box*0.12).toFixed(2)}" fill="#fff"/>`;
      const ms=(box*0.82)/100; s+=`<g shape-rendering="auto" transform="translate(${(W/2-51*ms).toFixed(3)} ${(W/2-53*ms).toFixed(3)}) scale(${ms.toFixed(4)})">${markG(GOLD,NAVY,7)}</g>`;}
    return s+'</svg>';};
  fs.writeFileSync(OUT+'/qr-rootlab.svg',qrSvg(false)); fs.writeFileSync(OUT+'/qr-rootlab-mark.svg',qrSvg(true));
  // card: QR + url text
  const fs2=26; let x=0,parts='';for(const ch of 'root-jylee.github.io'){const g=lmR.charToGlyph(ch);parts+=`<path d="${g.getPath(x,0,fs2).toPathData(2)}" fill="${NAVY}"/>`;x+=g.advanceWidth/lmR.unitsPerEm*fs2;}
  const CW=400,CH=470; const inner=qrSvg(true).replace(/<svg[^>]*>/,'').replace('</svg>','');
  const card=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CW} ${CH}" width="${CW*3}" height="${CH*3}"><rect width="${CW}" height="${CH}" rx="24" fill="#fff" stroke="#dde3ea" stroke-width="2"/><g transform="translate(20 20) scale(${(360/W).toFixed(4)})" shape-rendering="crispEdges">${inner}</g><g transform="translate(${((CW-x)/2).toFixed(1)} 428)">${parts}</g></svg>`;
  fs.writeFileSync(OUT+'/qr-card.svg',card);
  console.log('written');
})();
