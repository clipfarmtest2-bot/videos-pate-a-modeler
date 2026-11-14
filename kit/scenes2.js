// Scènes à objets dessinés : « zoom » (plongée d'objet en objet) et « frise » (voyage dans le temps).
// Chargé après le script principal de moteur.html : utilise ses variables (O, N, T, D, SONS, RB, RE, E, V, LT…).
const svgf=(vb,inner)=>`<svg viewBox="${vb}" width="100%" height="100%" style="overflow:visible;display:block">${inner}</svg>`;
const back=x=>{const c=2.2;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2);};
const NOIR='#1b1b2e';
// ---------- objets de la scène zoom : 100 unités = la taille réelle annoncée ; vb = cadre du dessin ; c = couleur du décor une fois « dedans » ----------
const helice=()=>{let a='',b='',r='';for(let y=-18;y<=118;y+=4){const x=42*Math.sin(y*.07);a+=(a?'L':'M')+(50+x).toFixed(1)+' '+y;b+=(b?'L':'M')+(50-x).toFixed(1)+' '+y;
  if((y+18)%20==0)r+=`<line x1="${(50+x).toFixed(1)}" y1="${y}" x2="${(50-x).toFixed(1)}" y2="${y}" stroke="#fff3c9" stroke-width="5" stroke-linecap="round"/>`;}
 return r+`<path d="${a}" fill="none" stroke="#ff8fd0" stroke-width="13" stroke-linecap="round"/><path d="${b}" fill="none" stroke="#7fd4ff" stroke-width="13" stroke-linecap="round"/>`;};
const pointes=()=>{let s='';for(let k=0;k<12;k++){const a=k*Math.PI/6,c=Math.cos(a),n=Math.sin(a);
  s+=`<line x1="${(50+28*c).toFixed(1)}" y1="${(50+28*n).toFixed(1)}" x2="${(50+42*c).toFixed(1)}" y2="${(50+42*n).toFixed(1)}" stroke="#ff7ab8" stroke-width="4"/><circle cx="${(50+45*c).toFixed(1)}" cy="${(50+45*n).toFixed(1)}" r="5" fill="#ff7ab8"/>`;}return s;};
const ecailles=()=>{let s='';for(let x=-130;x<=230;x+=36)s+=`<path d="M${x} 4q16 46 0 92" fill="none" stroke="#6e4526" stroke-width="5"/>`;return s;};
const ZFIG={
 piece:{c:'#8f7424',s:`<circle cx="50" cy="50" r="49" fill="#e3b93e"/><circle cx="50" cy="50" r="44" fill="none" stroke="#c79a25" stroke-width="2.5"/><circle cx="50" cy="50" r="35" fill="#d5d9df"/><text x="50" y="68" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#8b929c">1 €</text>`},
 fourmi:{c:'#6b3520',s:`<g stroke="#4a2414" stroke-width="3.5" stroke-linecap="round" fill="none"><path d="M52 50l-8-22M56 50l2-24M60 50l12-18M52 56l-10 24M56 58l2 24M60 56l14 20"/><path d="M82 42q8-14 15-11M85 46q10-5 14-1"/></g><ellipse cx="26" cy="54" rx="22" ry="15" fill="#8a4424"/><ellipse cx="56" cy="53" rx="12" ry="9" fill="#9a4d28"/><circle cx="76" cy="48" r="11" fill="#8a4424"/><circle cx="80" cy="45" r="2.6" fill="${NOIR}"/>`},
 sable:{c:'#8f7a4a',s:`<polygon points="50,5 83,20 95,54 78,88 40,95 10,72 6,36 26,12" fill="#e2c57f"/><polygon points="50,5 83,20 60,45 26,12" fill="#f1dca0"/><polygon points="60,45 95,54 78,88 52,70" fill="#cfae63"/><polygon points="6,36 26,12 60,45 30,60" fill="#ead092"/>`},
 cheveu:{c:'#5e3b20',vb:[-150,-150,400,400],s:`<g transform="rotate(-20 50 50)"><rect x="-150" y="0" width="400" height="100" rx="14" fill="#8a5a33"/>${ecailles()}<rect x="-150" y="12" width="400" height="13" rx="6" fill="#a8744a"/></g>`},
 globule:{c:'#7e1823',s:`<circle cx="50" cy="50" r="48" fill="#d8323c"/><ellipse cx="50" cy="50" rx="25" ry="23" fill="#b02431"/><ellipse cx="35" cy="29" rx="12" ry="6" fill="#ee6a70" opacity=".8"/>`},
 bacterie:{c:'#48691f',vb:[-10,0,135,100],s:`<g fill="none" stroke="#6b9a2e" stroke-width="3" stroke-linecap="round"><path d="M90 46q8-9 15 0t14-2"/><path d="M90 54q8 9 15 0t14 4"/></g><rect x="6" y="28" width="86" height="44" rx="22" fill="#9bd14a"/><g fill="#6b9a2e"><circle cx="30" cy="44" r="4"/><circle cx="52" cy="58" r="5"/><circle cx="70" cy="43" r="3.5"/></g><ellipse cx="40" cy="36" rx="16" ry="4" fill="#c4ec86" opacity=".7"/>`},
 virus:{c:'#3d2f86',s:`${pointes()}<circle cx="50" cy="50" r="30" fill="#7b5be0"/><circle cx="42" cy="42" r="7" fill="#9a80ee"/><circle cx="60" cy="58" r="5" fill="#6446c4"/>`},
 adn:{c:'#6a2f5c',vb:[-50,-25,200,150],s:helice()},
 eau:{c:'#8a1c2a',s:`<circle cx="22" cy="70" r="17" fill="#f3f3f3"/><circle cx="78" cy="70" r="17" fill="#f3f3f3"/><circle cx="50" cy="42" r="30" fill="#e0303a"/><text x="50" y="54" font-family="Fredoka" font-weight="700" font-size="30" text-anchor="middle" fill="#fff6e3">O</text><text x="22" y="77" font-family="Fredoka" font-weight="700" font-size="18" text-anchor="middle" fill="#8b929c">H</text><text x="78" y="77" font-family="Fredoka" font-weight="700" font-size="18" text-anchor="middle" fill="#8b929c">H</text>`},
 atome:{c:'#1f4a66',s:`<circle cx="50" cy="50" r="46" fill="#7fd4ff" opacity=".2"/><circle cx="50" cy="50" r="46" fill="none" stroke="#7fd4ff" stroke-width="3" stroke-dasharray="7 7"/><circle cx="50" cy="50" r="9" fill="#ff7d5c"/><circle cx="96" cy="50" r="6.5" fill="#dff4ff"/>`},
};
// ================= scène 5 : zoom (on plonge dans un objet pour en trouver un plus petit) =================
SCENES.zoom={
 S:560,CY:800,
 anc(i){return O[i].ancre||[.15,-.1];},
 init(){
  const P=this.P=[[0,0]];
  for(let i=1;i<N;i++){const a=this.anc(i-1);P[i]=[P[i-1][0]+a[0]*O[i-1].d,P[i-1][1]+a[1]*O[i-1].d];}
  O.forEach((o,i)=>{const gr=1-(i-1)/Math.max(1,N-2);
   evObj(i,i?T[i]+.6:0,{cs:i?T[i]+.65:.1,...(o.aff||{n:o.d})});
   if(i)SONS.push({t:T[i]-.7,s:'pip',g:.28},{t:T[i],s:'zip',d:.8/V,f:240+50*i,g:.5},{t:T[i]+.85,s:'plop',big:.15+.5*gr,g:.55},{t:T[i]+.65,s:'compteur',n:10,f:1000,pas:.055,g:.14},{t:T[i]+1.2,s:'note',k:i,g:.26});
   else SONS.push({t:.02,s:'plop',big:.6,g:.6},{t:.12,s:'compteur',n:10,f:1000,pas:.055,g:.16},{t:.68,s:'note',k:0,g:.26});});
 },
 build(L){let h='';for(let j=0;j<16;j++){const r=6+rnd(j,3)*10;h+=`<div class="star" style="width:${r}px;height:${r}px"></div>`;}
  O.forEach((o,i)=>{const f=ZFIG[o.fig];h+=`<div id="z${i}" class="clay" style="display:none">${svgf((f.vb||[0,0,100,100]).join(' '),f.s)}</div>`;});
  h+=`<div id="lp" class="clay" style="display:none"><div style="position:absolute;inset:0;border:16px solid #fff6e3;border-radius:50%;box-sizing:border-box"></div><div style="position:absolute;left:84%;top:84%;width:50%;height:26px;margin-top:-13px;background:#c98a4b;border-radius:13px;transform-origin:0 50%;transform:rotate(45deg)"></div></div>`;
  L.innerHTML=h;this.z=O.map((_,i)=>document.getElementById('z'+i));this.lp=document.getElementById('lp');this.st=[...L.querySelectorAll('.star')];},
 etat(t){   // on plonge de l'objet k-1 vers l'objet k, u va de 0 à 1
  if(RB){const w=RE*(N-1),f=Math.min(N-2,Math.floor(w));return {k:N-1-f,u:1-(w-f)};}
  let k=0;for(let i=1;i<N;i++)if(t>=T[i])k=i;
  return k?{k,u:eio(cl((t-T[k])/.9))}:{k:1,u:0};
 },
 teinte(i){return i<0?D.fond[0]:mix(ZFIG[O[i].fig].c,'#0c0c14',.35);},
 draw(t,bi){
  const {k,u}=this.etat(t),S=this.S,CY=this.CY,a=this.anc(k-1);
  const s0=S/O[k-1].d,s=llog(s0,S/O[k].d,u),tx=540+(1-u)*a[0]*S,ty=CY+(1-u)*a[1]*S;
  E.bg.style.background=mix(this.teinte(k-2),this.teinte(k-1),u);
  for(let i=0;i<N;i++){const el=this.z[i],vb=ZFIG[O[i].fig].vb||[0,0,100,100];
   const size=O[i].d*s,bm=size*Math.max(vb[2],vb[3])/100;
   if(size<1.5||bm>6000||i>k+2){el.style.display='none';continue;}
   let op=cl((6000-bm)/3400);if(i==k-1)op*=lerp(1,.25,u);else if(i<k-1)op*=.25;
   const x=tx+(this.P[i][0]-this.P[k][0])*s,y=ty+(this.P[i][1]-this.P[k][1])*s;
   let sx=1,sy=1,rot=jit(bi,i*7+3,.6);
   if(i==0&&!RB&&k==1&&u==0){const q=.24*Math.exp(-t*9)*Math.cos(t*24);sy=1-q;sx=1+q*.8;}   // rebond d'entrée dès la première image
   if(O[i].fig=='atome')rot=t*150;
   el.style.display='block';el.style.opacity=op;el.style.width=size*vb[2]/100+'px';el.style.height=size*vb[3]/100+'px';
   el.style.transformOrigin=`${(50-vb[0])/vb[2]*100}% ${(50-vb[1])/vb[3]*100}%`;
   el.style.transform=`translate(${x-size*(50-vb[0])/100+jit(bi,i*7+1,1.2)}px,${y-size*(50-vb[1])/100+jit(bi,i*7+2,1.2)}px) rotate(${rot}deg) scale(${sx},${sy})`;
  }
  // la loupe repère le prochain objet, puis on plonge dedans
  let lr=0,lx=0,ly=0,lo=1;
  if(!RB){
   if(u>0&&u<.5){lr=Math.max(70,O[k].d*s0*.7+34)*(s/s0);lx=tx;ly=ty;lo=1-u/.5;}
   else{const c=u==0?k-1:k;if(c+1<N){const dn=T[c+1]-t;if(dn>0&&dn<=.7){const aa=this.anc(c);lr=Math.max(70,O[c+1].d*S/O[c].d*.7+34)*back(cl((.7-dn)/.22));lx=540+aa[0]*S;ly=CY+aa[1]*S;}}}
  }
  const lp=this.lp;if(lr>2){lp.style.display='block';lp.style.opacity=lo;lp.style.width=lp.style.height=2*lr+'px';lp.style.transform=`translate(${lx-lr+jit(bi,301,1)}px,${ly-lr+jit(bi,302,1)}px)`;}else lp.style.display='none';
  // poussières qui filent vers les bords : donnent la sensation de zoom
  const lg=Math.log(s)/Math.log(6);
  this.st.forEach((e,j)=>{const ph=((lg+j/16)%1+1)%1,r=90+1050*ph*ph,an=j*2.4;e.style.opacity=Math.min(1,ph*4)*.8;e.style.transform=`translate(${540+r*Math.cos(an)}px,${CY+r*1.25*Math.sin(an)}px)`;});
  tag('');fleche(0);
 }
};
// ---------- animaux (cadre 200 × 140, posés sur le sol) et repères historiques (cadre 200 × 200) ----------
const ANI={
 ephemere:`<path d="M150 96q22 6 44-8M150 100q24 10 46 6M150 104q20 16 40 22" fill="none" stroke="#e9e4c8" stroke-width="3" stroke-linecap="round"/><ellipse cx="96" cy="58" rx="46" ry="20" fill="#dff1ff" opacity=".9" transform="rotate(-28 96 58)"/><ellipse cx="120" cy="68" rx="30" ry="13" fill="#c8e6fb" opacity=".9" transform="rotate(-18 120 68)"/><rect x="52" y="90" width="104" height="16" rx="8" fill="#bfe3a0"/><circle cx="50" cy="94" r="13" fill="#a9d184"/><circle cx="45" cy="90" r="4" fill="${NOIR}"/><path d="M70 104l-8 30M92 106v30M114 104l8 30" stroke="#8fb56c" stroke-width="4" stroke-linecap="round"/>`,
 souris:`<path d="M150 112q40 6 44-24" fill="none" stroke="#e7a3a8" stroke-width="5" stroke-linecap="round"/><ellipse cx="104" cy="104" rx="56" ry="32" fill="#b8b0a8"/><circle cx="62" cy="72" r="18" fill="#cfc7bf"/><circle cx="62" cy="72" r="10" fill="#e7a3a8"/><path d="M50 92q-30 8-40 26q30 8 56-6z" fill="#b8b0a8"/><circle cx="40" cy="104" r="5" fill="${NOIR}"/><circle cx="12" cy="118" r="5" fill="#e7a3a8"/><ellipse cx="86" cy="134" rx="14" ry="6" fill="#9c948c"/><ellipse cx="132" cy="134" rx="14" ry="6" fill="#9c948c"/>`,
 chien:`<path d="M160 72q26-22 28-46" fill="none" stroke="#c98a4b" stroke-width="10" stroke-linecap="round"/><rect x="66" y="96" width="16" height="42" rx="7" fill="#b37738"/><rect x="126" y="96" width="16" height="42" rx="7" fill="#b37738"/><rect x="58" y="62" width="110" height="48" rx="22" fill="#c98a4b"/><rect x="92" y="98" width="16" height="40" rx="7" fill="#c98a4b"/><rect x="150" y="98" width="16" height="40" rx="7" fill="#c98a4b"/><circle cx="52" cy="52" r="28" fill="#d49a5c"/><ellipse cx="30" cy="62" rx="18" ry="12" fill="#e2b580"/><circle cx="16" cy="58" r="6" fill="${NOIR}"/><circle cx="46" cy="44" r="5" fill="${NOIR}"/><ellipse cx="70" cy="40" rx="10" ry="22" fill="#8a5a2c" transform="rotate(18 70 40)"/>`,
 elephant:`<rect x="72" y="92" width="24" height="46" rx="9" fill="#7b8391"/><rect x="142" y="92" width="24" height="46" rx="9" fill="#7b8391"/><ellipse cx="120" cy="72" rx="64" ry="46" fill="#8d95a3"/><rect x="98" y="96" width="24" height="42" rx="9" fill="#8d95a3"/><rect x="160" y="96" width="24" height="42" rx="9" fill="#8d95a3"/><circle cx="54" cy="56" r="34" fill="#9aa2b0"/><ellipse cx="76" cy="50" rx="20" ry="30" fill="#7b8391"/><path d="M34 70q-22 12-18 42q2 14 14 12" fill="none" stroke="#9aa2b0" stroke-width="15" stroke-linecap="round"/><circle cx="42" cy="48" r="5" fill="${NOIR}"/><path d="M42 84q-10 12-22 10" fill="none" stroke="#fff6e3" stroke-width="6" stroke-linecap="round"/>`,
 humain:`<rect x="84" y="106" width="15" height="32" rx="6" fill="#3b3550"/><rect x="105" y="106" width="15" height="32" rx="6" fill="#3b3550"/><rect x="80" y="54" width="44" height="62" rx="18" fill="#7a5bd0"/><circle cx="102" cy="34" r="22" fill="#f2c29b"/><path d="M80 32q2-26 24-24q22 0 20 26q-10-14-22-12q-12-2-22 10z" fill="#e8e8ee"/><circle cx="95" cy="37" r="3" fill="${NOIR}"/><circle cx="109" cy="37" r="3" fill="${NOIR}"/><path d="M120 72q18 6 20 20" fill="none" stroke="#7a5bd0" stroke-width="10" stroke-linecap="round"/><path d="M142 88v50" stroke="#8a5a2c" stroke-width="6" stroke-linecap="round"/>`,
 tortue:`<rect x="50" y="108" width="22" height="30" rx="9" fill="#6f8f4a"/><rect x="130" y="108" width="22" height="30" rx="9" fill="#6f8f4a"/><path d="M166 108q16 0 22 12" fill="none" stroke="#6f8f4a" stroke-width="8" stroke-linecap="round"/><path d="M36 106q-24-2-26-24q14-12 30 0z" fill="#8fb56c"/><path d="M36 114a66 64 0 0 1 132 0z" fill="#5f8a3a"/><path d="M68 112l10-34h44l10 34M78 78l-22 10M122 78l24 10M100 50v28" fill="none" stroke="#3f6626" stroke-width="5" stroke-linejoin="round"/><circle cx="22" cy="86" r="4" fill="${NOIR}"/>`,
 baleine:`<g transform="translate(0,14)">${FIG.baleine()}</g>`,
 requin:`<path d="M172 70l26-28-4 30 6 24z" fill="#6f7f96"/><path d="M92 50l14-32 18 36z" fill="#6f7f96"/><path d="M14 74q40-30 100-28q40 2 62 26q-24 22-62 24q-60 2-100-22z" fill="#7f8fa6"/><path d="M30 84q50 14 110 2q-30 16-60 14q-30-2-50-16z" fill="#dfe6ee"/><path d="M98 94l-8 26 28-20z" fill="#6f7f96"/><circle cx="40" cy="68" r="4.5" fill="${NOIR}"/><path d="M58 64v10M66 63v11M74 63v11" stroke="#5a687c" stroke-width="3"/>`,
 palourde:`<path d="M20 112q80 44 160 0q-80 18-160 0z" fill="#cdb489"/><path d="M20 112a80 80 0 0 1 160 0q-80 22-160 0z" fill="#e9d5b0"/><path d="M100 34v84M70 42l-14 72M130 42l14 72M44 60l-16 50M156 60l16 50" stroke="#c9ad7c" stroke-width="5" stroke-linecap="round" fill="none"/>`,
 eponge:`<rect x="92" y="94" width="16" height="44" rx="6" fill="#cfcfc0"/><path d="M60 24q40-14 80 0q8 42-22 78h-36q-30-36-22-78z" fill="#f2f2e6"/><ellipse cx="100" cy="26" rx="40" ry="10" fill="#d9d9c8"/><g fill="#cfcfc0"><circle cx="80" cy="52" r="6"/><circle cx="104" cy="48" r="7"/><circle cx="124" cy="60" r="5"/><circle cx="90" cy="74" r="6"/><circle cx="112" cy="78" r="6"/></g>`,
};
const REP={
 fusee:`<path d="M84 168q16 34 32 0z" fill="#ff9a3d"/><path d="M72 146l-24 34h28zM128 146l24 34h-28z" fill="#e0453a"/><rect x="72" y="62" width="56" height="110" rx="16" fill="#eef1f5"/><path d="M72 80q28-76 56 0z" fill="#e0453a"/><circle cx="100" cy="108" r="14" fill="#7fd4ff"/>`,
 avion:`<path d="M62 72v54M100 72v54M138 72v54" stroke="#8a5a2c" stroke-width="4"/><rect x="50" y="62" width="100" height="11" rx="5" fill="#e9d5b0"/><rect x="50" y="124" width="100" height="11" rx="5" fill="#e9d5b0"/><rect x="30" y="92" width="130" height="22" rx="11" fill="#c9a86a"/><path d="M158 96l28-14v38z" fill="#b89858"/><rect x="20" y="70" width="9" height="66" rx="4" fill="#5a3a2a"/><circle cx="80" cy="154" r="11" fill="#3b3550"/><circle cx="122" cy="154" r="11" fill="#3b3550"/>`,
 eiffel:`<path d="M100 8l10 62h-20zM88 70h24l8 52h-40zM78 122h44l24 76h-26q-20-44-40 0h-26z" fill="#d8c8a8"/><rect x="82" y="66" width="36" height="9" fill="#b7a58a"/><rect x="72" y="117" width="56" height="10" fill="#b7a58a"/>`,
 bicorne:`<path d="M18 138q82-122 164 0q-20 14-38 4q-44-22-88 0q-18 10-38-4z" fill="#22222e"/><path d="M42 132q58-42 116 0" fill="none" stroke="#e8c14a" stroke-width="6"/><circle cx="100" cy="96" r="13" fill="#e0453a"/><circle cx="100" cy="96" r="8" fill="#fff"/><circle cx="100" cy="96" r="4" fill="#2f5fd0"/>`,
 couronne:`<path d="M34 152l-12-82 40 36 38-62 38 62 40-36-12 82z" fill="#e8c14a"/><rect x="34" y="148" width="132" height="26" rx="8" fill="#d2a52c"/><circle cx="22" cy="68" r="10" fill="#e0453a"/><circle cx="100" cy="42" r="11" fill="#2f80da"/><circle cx="178" cy="68" r="10" fill="#e0453a"/><circle cx="70" cy="161" r="6" fill="#4fb56c"/><circle cx="100" cy="161" r="6" fill="#e0453a"/><circle cx="130" cy="161" r="6" fill="#4fb56c"/>`,
 caravelle:`<rect x="96" y="28" width="8" height="114" fill="#5a3a2a"/><path d="M106 40q52 32 0 84z" fill="#fff6e3"/><path d="M94 52q-44 26 0 74z" fill="#efe3c6"/><path d="M100 28l32-8-32-8z" fill="#e0453a"/><path d="M22 138h156l-24 46H50z" fill="#8a5a2c"/><rect x="22" y="134" width="156" height="10" rx="5" fill="#a8744a"/>`,
 mammouth:`<rect x="62" y="142" width="26" height="54" rx="10" fill="#6e4526"/><rect x="142" y="142" width="26" height="54" rx="10" fill="#6e4526"/><path d="M40 152q-10-92 70-98q78-4 76 82q0 20-10 22h-130z" fill="#8a5a33"/><rect x="94" y="148" width="26" height="48" rx="10" fill="#8a5a33"/><circle cx="56" cy="92" r="40" fill="#9a6a40"/><path d="M34 112q-14 32-4 64q4 12 16 8" fill="none" stroke="#9a6a40" stroke-width="18" stroke-linecap="round"/><path d="M50 124q-36 36-10 64M64 126q-16 40 14 60" fill="none" stroke="#fff6e3" stroke-width="8" stroke-linecap="round"/><circle cx="46" cy="84" r="5" fill="${NOIR}"/>`,
};
// ================= scène 6 : frise (on remonte le temps, un arrêt par objet) =================
SCENES.frise={
 SP:1300,
 init(){O.forEach((o,i)=>{
   evObj(i,i?T[i]+.75:0,{n:o.ans,de:i?O[i-1].ans:0,cs:i?T[i]+.1:.1,dur:1.0,suf:' ANS',...(o.aff||{})});
   if(i)SONS.push({t:T[i],s:'whoosh',d:1.0/V,fc:650,g:.5},{t:T[i]+.1,s:'compteur',n:16,f:820,pas:.055,g:.14},{t:T[i]+1.0,s:'plop',big:.2+.6*i/N,g:.5},{t:T[i]+1.15,s:'note',k:i,g:.26});
   else SONS.push({t:.02,s:'plop',big:.1,g:.5},{t:.6,s:'note',k:0,g:.26});});},
 pos(t){if(RB)return (N-1)*(1-RE);let k=0;for(let i=1;i<N;i++)if(t>=T[i])k=i;return k?k-1+eio(cl((t-T[k])/1.0)):0;},   // position, en nombre d'arrêts
 frac(t){return this.pos(t)/(N-1);},
 build(L){let h=`<div id="fsol" class="clay" style="left:-40px;top:1010px;width:1160px;height:150px;border-radius:40px;background:${D.sol||'#c9a86a'}"></div>`;
  for(let j=0;j<14;j++)h+=`<div class="ftk" style="width:12px;height:44px;border-radius:6px;background:rgba(40,25,10,.3)"></div>`;
  for(let j=0;j<10;j++)h+=`<div class="ftr" style="height:8px;border-radius:4px;background:rgba(255,255,255,.6)"></div>`;
  O.forEach((o,i)=>{if(o.repere)h+=`<div id="fr${i}" class="clay" style="display:none;width:380px;height:380px">${svgf('0 0 200 200',REP[o.repere])}</div>`;
   h+=`<div id="fa${i}" class="clay" style="display:none;width:480px;height:336px">${svgf('0 0 200 140',ANI[o.fig])}</div>`;});
  h+=`<div id="fc" class="ln" style="top:418px;width:1080px;text-align:center;font-size:44px;color:#fff6e3;text-shadow:0 3px 0 rgba(0,0,0,.35)"></div><div id="fy" class="ln" style="top:462px;width:1080px;text-align:center;color:#fff6e3;text-shadow:0 8px 0 #a99a7c,0 20px 22px rgba(0,0,0,.4);line-height:1.1"></div>`;
  L.innerHTML=h;const g=id=>document.getElementById(id);this.a=O.map((_,i)=>g('fa'+i));this.r=O.map((_,i)=>g('fr'+i));this.fy=g('fy');g('fc').textContent=D.legende||'';
  this.tk=[...L.querySelectorAll('.ftk')];this.tr=[...L.querySelectorAll('.ftr')];},
 draw(t,bi){
  const p=this.pos(t),SP=this.SP,AN=D.annee||2026,bouge=Math.abs(p-Math.round(p))>.004;
  O.forEach((o,i)=>{const dx=(p-i)*SP,a=this.a[i],r=this.r[i];
   if(Math.abs(dx)>1280){a.style.display='none';if(r)r.style.display='none';return;}
   let sx=1,sy=1;if(i==0&&!RB&&p==0){const q=.22*Math.exp(-t*9)*Math.cos(t*24);sy=1-q;sx=1+q*.8;}
   else if(!bouge){const v=t-(T[i]+1.0);if(i&&v>=0){const q=.16*Math.exp(-v*9)*Math.cos(v*24);sy=1-q;sx=1+q*.8;}}
   a.style.display='block';a.style.transformOrigin='50% 100%';
   a.style.transform=`translate(${(o.repere?70:300)+dx+jit(bi,i*7+1,1.3)}px,${676+jit(bi,i*7+2,1.3)}px) rotate(${jit(bi,i*7+3,.8)}deg) scale(${sx},${sy})`;
   if(r){r.style.display='block';r.style.opacity=o.fantome?.45:1;r.style.transform=`translate(${640+dx+jit(bi,i*7+4,1)}px,${632+jit(bi,i*7+5,1)}px) rotate(${jit(bi,i*7+6,.5)}deg)`;}
  });
  this.tk.forEach((e,j)=>e.style.transform=`translate(${(((j*110+p*SP)%1540)+1540)%1540-200}px,1050px)`);
  this.tr.forEach((e,j)=>{e.style.opacity=bouge?.75:0;e.style.width=140+rnd(j,3)*220+'px';e.style.transform=`translate(${((rnd(j,1)*1500+p*SP*2.4)%1500+1500)%1500-250}px,${440+rnd(j,2)*540}px)`;});
  const i0=Math.min(N-1,Math.floor(p+1e-9)),f=p-i0;let txt;
  if(f<.004||i0>=N-1)txt=O[i0].an||String(Math.round(AN-O[i0].ans));
  else{const Y=Math.round(AN-llog(Math.max(.4,O[i0].ans),O[i0+1].ans,f));txt=Y>0?String(Y):fr(-Y)+' AV. J.-C.';}
  fit(this.fy,txt,165,.62);
  tag('');fleche(0);
 }
};
// ================= scène 7 : creuse (un tunnel s'enfonce dans la Terre vue en coupe, la planète se dévoile) =================
const CUILLERE=`<rect x="44" y="-20" width="12" height="80" rx="6" fill="#cfd4dc"/><ellipse cx="50" cy="76" rx="21" ry="27" fill="#e3e7ee"/><ellipse cx="45" cy="70" rx="9" ry="13" fill="#f6f8fb"/>`;
const CREUSEUR=`<ellipse cx="90" cy="114" rx="52" ry="26" fill="#3b5fb0"/><rect x="62" y="52" width="48" height="62" rx="20" fill="#e0453a"/><circle cx="92" cy="34" r="22" fill="#f2c29b"/><path d="M70 30q6-24 26-22q20 2 18 22q-12-10-22-8q-12 0-22 8z" fill="#5a3a2a"/><circle cx="100" cy="36" r="3" fill="${NOIR}"/><path d="M104 70q34 6 52 34" fill="none" stroke="#e0453a" stroke-width="12" stroke-linecap="round"/><circle cx="158" cy="106" r="8" fill="#f2c29b"/>`;
const fmtDist=m=>m<10000?fr(Math.round(m))+' m':fr(Math.round(m/1000))+' km';
SCENES.creuse={
 Y0:600,LG:300,R:6371000,
 C:[[0,'#8a5a33'],[35000,'#d9662b'],[670000,'#c44a22'],[2890000,'#f2a23a'],[5150000,'#ffe9a8']],
 init(){O.forEach((o,i)=>{
   evObj(i,i?T[i]+1.0:0,{cs:i?T[i]+.3:.1,dur:.9,...o.aff});
   if(i)SONS.push({t:T[i],s:'zip',d:1.0/V,f:150+30*i,g:.4},{t:T[i]+.2,s:'compteur',n:14,f:700,pas:.06,g:.14},{t:T[i]+1.1,s:'plop',big:.3+.6*i/N,g:.55},{t:T[i]+1.25,s:'note',k:i,g:.26});
   else SONS.push({t:.02,s:'plop',big:.2,g:.5},{t:.1,s:'compteur',n:12,f:700,pas:.06,g:.14},{t:.9,s:'note',k:0,g:.26});});
  for(let t=1.4;t<TR-.4;t+=.42)SONS.push({t,s:'toc',f:420+60*(Math.floor(t*7)%3),g:.09});   // petits coups de cuillère
 },
 etat(t){   // de l'arrêt k-1 vers k (u de 0 à 1) ; f = part du premier trou déjà creusée
  if(RB){const w=eio(cl(RP/.7))*(N-1),fl=Math.min(N-2,Math.floor(w));return {k:N-1-fl,u:1-(w-fl),f:1-eio(cl((RP-.7)/.2))};}
  let k=0;for(let i=1;i<N;i++)if(t>=T[i])k=i;
  return k?{k,u:eio(cl((t-T[k])/1.1)),f:1}:{k:1,u:0,f:eo(cl(t/.8))};
 },
 frac(t){const e=this.etat(t);return (e.k-1+e.u)/(N-1);},
 build(L){let h='';for(let j=0;j<14;j++){const r=5+rnd(j,3)*9;h+=`<div class="star" style="width:${r}px;height:${r}px"></div>`;}
  h+=`<div id="cg" style="background:#5fa35a"></div>`;this.C.forEach((c,j)=>h+=`<div id="cc${j}" style="background:${c[1]};box-shadow:inset 0 0 90px rgba(60,20,0,.35)"></div>`);
  h+=`<div id="ctu" style="background:#24140c"></div><div style="width:1080px;height:1920px;background:url(${bruit()});background-size:1080px 1920px;mix-blend-mode:multiply;opacity:.7"></div>`;
  h+=`<div id="cta" class="clay" style="background:#6e4526;border-radius:50% 50% 0 0"></div>`;
  for(let j=0;j<6;j++)h+=`<div class="cb" style="width:22px;height:22px;border-radius:50%;background:#6e4526"></div>`;
  h+=`<div id="cch" class="clay" style="display:none">${svgf('0 0 200 140',CREUSEUR)}</div><div id="csp" class="clay" style="width:110px;height:138px">${svgf('0 -20 100 125',CUILLERE)}</div>`;
  h+=`<div style="left:50px;top:1196px;width:980px;height:290px;border-radius:44px;background:rgba(20,10,6,.62)"></div>`;
  h+=`<div id="cl" class="ln" style="top:420px;width:1080px;text-align:center;font-size:40px;color:#fff6e3;text-shadow:0 3px 0 rgba(0,0,0,.4)"></div>`;
  L.innerHTML=h;const g=id=>document.getElementById(id);this.g=g('cg');this.c=this.C.map((_,j)=>g('cc'+j));this.tu=g('ctu');this.ta=g('cta');this.ch=g('cch');this.sp=g('csp');this.cl=g('cl');
  this.cl.textContent=D.legende||'';this.bt=[...L.querySelectorAll('.cb')];this.st=[...L.querySelectorAll('.star')];},
 couche(e,r,y){if(y>2000){e.style.display='none';return;}e.style.display='block';
  if(r>14000){e.style.borderRadius='0';e.style.width='1300px';e.style.height='2300px';e.style.transform=`translate(-110px,${y}px)`;}
  else{e.style.borderRadius='50%';e.style.width=e.style.height=2*r+'px';e.style.transform=`translate(${540-r}px,${y}px)`;}},
 draw(t,bi){
  const {k,u,f}=this.etat(t),Y0=this.Y0,LG=this.LG,R=this.R,prof=llog(O[k-1].prof,O[k].prof,u),s=LG/prof,len=LG*f,pr=(k-1+u)/(N-1);
  this.couche(this.g,R*s+12,Y0-12);this.C.forEach(([B],j)=>this.couche(this.c[j],(R-B)*s,Y0+B*s));
  const w=Math.max(14,Math.min(180,s)),tu=this.tu;   // tunnel d'un mètre de large
  tu.style.width=w+'px';tu.style.height=len+'px';tu.style.borderRadius=`0 0 ${w/2}px ${w/2}px`;tu.style.transform=`translate(${540-w/2}px,${Y0}px)`;
  this.sp.style.transformOrigin='50% 0';this.sp.style.transform=`translate(${540-55+jit(bi,3,1)}px,${Y0+len-120}px) rotate(${16*Math.sin(t*13)}deg)`;
  this.bt.forEach((e,j)=>{const ph=((t*1.9+j/6)%1+1)%1,sd=j%2?1:-1;e.style.opacity=f>0?1-ph:0;e.style.transform=`translate(${540+sd*(w/2+16+ph*(70+40*rnd(j,2)))-11}px,${Y0-18-150*(.6+.4*rnd(j,4))*Math.sin(Math.PI*ph)}px)`;});
  const hc=1.25*s,ch=this.ch;if(hc>12&&hc<600){ch.style.display='block';ch.style.opacity=cl((hc-12)/30);ch.style.height=hc+'px';ch.style.width=hc*200/140+'px';ch.style.transform=`translate(${540-w/2-hc*200/140-.03*s+jit(bi,5,1)}px,${Y0-hc+4+jit(bi,6,1)}px)`;}else ch.style.display='none';
  const wt=.9*s,ht=.38*s*f,ta=this.ta;if(wt>8&&wt<700){ta.style.display='block';ta.style.width=wt+'px';ta.style.height=ht+'px';ta.style.transform=`translate(${540+w/2+.12*s}px,${Y0-ht+4}px)`;}else ta.style.display='none';
  this.cl.style.opacity=cl(pr*(N-1)*2-.6);
  this.st.forEach((e,j)=>{e.style.opacity=cl((pr-.5)/.2)*.9;e.style.transform=`translate(${30+rnd(j,1)*1020+jit(bi,100+j,.8)}px,${150+rnd(j,2)*380}px)`;});
  const repos=u==0||u==1,cur=u==0?k-1:k;
  tag(f<.99?'':repos?O[cur].ptxt||fmtDist(O[cur].prof):fmtDist(prof),540+w/2+150,Y0+len-70,bi);fleche(0);
 }
};
// ================= scène 8 : escalier (un marcheur grimpe vers l'espace, les repères défilent) =================
const MARCHEUR=`<rect x="26" y="70" width="34" height="58" rx="12" fill="#2f6fb5"/><g id="mA" stroke="#3b3550" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M60 130l-14 62"/><path d="M78 130l22 38l-4 24"/></g><g id="mB" stroke="#3b3550" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M60 130l22 38l-6 24"/><path d="M78 130l-10 62"/></g><rect x="44" y="62" width="48" height="76" rx="20" fill="#e0453a"/><path d="M84 84q22 8 24 30" fill="none" stroke="#e0453a" stroke-width="12" stroke-linecap="round"/><circle cx="70" cy="38" r="24" fill="#f2c29b"/><path d="M48 34q4-26 26-24q22 2 20 26q-12-12-24-10q-12 0-22 8z" fill="#5a3a2a"/><circle cx="80" cy="40" r="3.2" fill="${NOIR}"/>`;
const EFIG={
 maison:`<rect x="50" y="100" width="100" height="92" rx="6" fill="#f2e3c6"/><path d="M34 108l66-62 66 62z" fill="#e0453a"/><rect x="88" y="142" width="26" height="50" rx="4" fill="#8a5a2c"/><rect x="60" y="118" width="22" height="22" rx="3" fill="#7fd4ff"/>`,
 eiffel:REP.eiffel,fusee:REP.fusee,
 everest:`<path d="M6 194l74-154 40 62 24-36 50 128z" fill="#7b8391"/><path d="M80 40l-27 56 21-10 14 16 12-22 5-8z" fill="#fff"/><path d="M144 66l-14 28 14-6 12 12 5-8z" fill="#fff"/>`,
 iss:`<rect x="16" y="68" width="48" height="64" rx="4" fill="#2f5fd0"/><rect x="136" y="68" width="48" height="64" rx="4" fill="#2f5fd0"/><path d="M40 68v64M160 68v64M16 100h48M136 100h48" stroke="#7fa2ff" stroke-width="3"/><rect x="60" y="94" width="80" height="12" rx="5" fill="#b9c2d6"/><rect x="82" y="76" width="36" height="48" rx="13" fill="#eef1f5"/><circle cx="100" cy="100" r="9" fill="#7fd4ff"/>`,
 satellite:`<path d="M100 78v-24" stroke="#b9c2d6" stroke-width="6"/><path d="M76 54a24 15 0 0 1 48 0z" fill="#eef1f5"/><rect x="12" y="84" width="58" height="34" rx="4" fill="#2f5fd0"/><rect x="130" y="84" width="58" height="34" rx="4" fill="#2f5fd0"/><path d="M41 84v34M159 84v34" stroke="#7fa2ff" stroke-width="3"/><rect x="74" y="76" width="52" height="50" rx="8" fill="#e8c14a"/>`,
 lune:`<circle cx="100" cy="100" r="92" fill="#cfd3da"/><g fill="#a9aeb8"><circle cx="70" cy="72" r="20"/><circle cx="128" cy="118" r="26"/><circle cx="90" cy="144" r="12"/><circle cx="140" cy="62" r="11"/><circle cx="46" cy="118" r="9"/></g>`,
};
SCENES.escalier={
 K:6,XC:360,YC:1040,
 init(){O.forEach((o,i)=>{
   evObj(i,i?T[i]+1.0:0,{cs:i?T[i]+.25:.1,dur:1.0,de:0,suf:' PAS',...(o.aff||{})});
   if(i){SONS.push({t:T[i],s:'whoosh',d:1.1/V,fc:520,g:.35},{t:T[i]+1.2,s:'plop',big:.2+.5*i/N,g:.5},{t:T[i]+1.35,s:'note',k:i,g:.26});for(let j=0;j<this.K;j++)SONS.push({t:T[i]+.1+j*.19,s:'toc',f:300+(j%2)*70,g:.22});}
   else SONS.push({t:.02,s:'plop',big:.1,g:.5},{t:.6,s:'note',k:0,g:.26});});},
 pos(t){if(RB)return (N-1)*(1-RE);let k=0;for(let i=1;i<N;i++)if(t>=T[i])k=i;return k?k-1+eio(cl((t-T[k])/1.2)):0;},
 frac(t){return this.pos(t)/(N-1);},
 build(L){let h='';for(let j=0;j<18;j++){const r=5+rnd(j,3)*9;h+=`<div class="star" style="width:${r}px;height:${r}px"></div>`;}
  O.forEach((o,i)=>h+=`<div id="eo${i}" class="clay" style="display:none;width:290px;height:290px">${svgf('0 0 200 200',EFIG[o.fig])}</div>`);
  for(let j=0;j<17;j++)h+=`<div class="em clay" style="width:122px;height:1500px;border-radius:14px 14px 0 0;background:${D.marche||'#586079'}"></div>`;
  h+=`<div id="ew" class="clay" style="width:150px;height:250px">${svgf('0 0 120 200',MARCHEUR)}</div>`;
  h+=`<div id="ec" class="ln" style="top:430px;left:50px;font-size:40px;color:#fff6e3;text-shadow:0 3px 0 rgba(0,0,0,.4)"></div><div id="ey" class="ln" style="top:476px;left:50px;color:#fff6e3;text-shadow:0 8px 0 #7d8399,0 20px 22px rgba(0,0,0,.4);line-height:1.1"></div>`;
  L.innerHTML=h;const g=id=>document.getElementById(id);this.o=O.map((_,i)=>g('eo'+i));this.w=g('ew');this.ey=g('ey');g('ec').textContent=D.legende||'';
  this.m=[...L.querySelectorAll('.em')];this.st=[...L.querySelectorAll('.star')];this.mA=g('mA');this.mB=g('mB');},
 draw(t,bi){
  const p=this.pos(t),K=this.K,XC=this.XC,YC=this.YC,ph=((p*K)%1+1)%1,bouge=Math.abs(p-Math.round(p))>.004;
  this.m.forEach((e,j)=>{const q=j-6;e.style.transform=`translate(${XC-61+q*120-120*ph}px,${YC-q*80+80*ph}px)`;});
  const yt=YC+(ph<.5?80*ph:80*ph-80);let sx=1,sy=1;if(!bouge&&!RB){const v=p==0?t:t-(T[Math.round(p)]+1.2);if(v>=0){const q=.2*Math.exp(-v*9)*Math.cos(v*24);sy=1-q;sx=1+q*.8;}}
  const pas=bouge?Math.floor(p*K*2)%2:0;this.mA.style.display=pas?'none':'';this.mB.style.display=pas?'':'none';
  this.w.style.transformOrigin='50% 100%';this.w.style.transform=`translate(${XC-75+jit(bi,1,1)}px,${yt-246+jit(bi,2,1)}px) rotate(${bouge?6:0}deg) scale(${sx},${sy})`;
  O.forEach((o,i)=>{const d=i-p,e=this.o[i];if(Math.abs(d)>.93){e.style.display='none';return;}
   e.style.display='block';e.style.transform=`translate(${730+d*900+jit(bi,i*7+3,1.2)}px,${436-d*640+jit(bi,i*7+4,1.2)}px) rotate(${jit(bi,i*7+5,.7)}deg)`;});
  this.st.forEach((e,j)=>{e.style.opacity=cl((p-2.4)/.8)*.9;e.style.transform=`translate(${30+rnd(j,1)*1020+jit(bi,100+j,.8)}px,${140+((rnd(j,2)*900+p*260)%900)}px)`;});
  const i0=Math.min(N-1,Math.floor(p+1e-9)),f=p-i0;
  fit(this.ey,O[i0].atxt&&f<.004?O[i0].atxt:fmtDist(f<.004||i0>=N-1?O[i0].alt:llog(Math.max(1,O[i0].alt),O[i0+1].alt,f)),120,1.0);
  tag('');fleche(0);
 }
};
// ================= scène 9 : balance (un objet d'un côté, une pluie de petits de l'autre jusqu'à l'équilibre) =================
const BFIG={
 trombone:`<path d="M70 184V62a30 30 0 0 1 60 0v100a20 20 0 0 1-40 0V84" fill="none" stroke="#c4ccd8" stroke-width="13" stroke-linecap="round"/>`,
 piece:`<g transform="translate(20,40) scale(1.6)">${ZFIG.piece.s}</g>`,
 souris:`<g transform="translate(0,60)">${ANI.souris}</g>`,chien:`<g transform="translate(0,60)">${ANI.chien}</g>`,
 telephone:`<rect x="56" y="18" width="88" height="180" rx="16" fill="#22222e"/><rect x="64" y="32" width="72" height="142" rx="6" fill="#4f9bff"/><circle cx="100" cy="186" r="5" fill="#666"/>`,
 chat:`<path d="M152 152q40-10 30-62" fill="none" stroke="#e59a3c" stroke-width="12" stroke-linecap="round"/><rect x="66" y="176" width="22" height="22" rx="9" fill="#f5b65e"/><rect x="112" y="176" width="22" height="22" rx="9" fill="#f5b65e"/><ellipse cx="104" cy="150" rx="56" ry="46" fill="#f2a94a"/><path d="M52 66l-4-42 32 24zM116 66l6-42-34 24z" fill="#f2a94a"/><circle cx="84" cy="84" r="38" fill="#f5b65e"/><circle cx="70" cy="82" r="5" fill="${NOIR}"/><circle cx="98" cy="82" r="5" fill="${NOIR}"/><path d="M79 95l5 6 5-6z" fill="#e0707a"/>`,
 personne:`<rect x="74" y="128" width="22" height="70" rx="9" fill="#3b3550"/><rect x="104" y="128" width="22" height="70" rx="9" fill="#3b3550"/><path d="M66 80q-22 20-18 52M134 80q22 20 18 52" fill="none" stroke="#2f9f5e" stroke-width="14" stroke-linecap="round"/><rect x="66" y="62" width="68" height="86" rx="24" fill="#2f9f5e"/><circle cx="100" cy="36" r="28" fill="#f2c29b"/><path d="M72 32q4-30 30-28q28 2 24 32q-14-14-28-12q-14 0-26 8z" fill="#5a3a2a"/><circle cx="90" cy="39" r="3.5" fill="${NOIR}"/><circle cx="110" cy="39" r="3.5" fill="${NOIR}"/>`,
};
SCENES.balance={
 P:[540,700],HL:330,PD:170,
 init(){O.forEach((o,i)=>{const t0=i?T[i]:-.5;
   evObj(i,i?T[i]+.4:0,{cs:i?T[i]+.5:.02,dur:1.2,...o.aff});
   SONS.push(i?{t:t0+.4,s:'plop',big:.2+.6*i/N,g:.55}:{t:.02,s:'plop',big:.2,g:.5},{t:Math.max(.05,t0+.5),s:'compteur',n:20,f:1300,pas:.055,g:.12},{t:t0+1.7,s:'note',k:i,g:.3},{t:t0+1.7,s:'pip',g:.2});});},
 build(L){let h=`<div class="clay" style="left:522px;top:690px;width:36px;height:380px;border-radius:14px;background:#8a5a33"></div><div class="clay" style="left:380px;top:1056px;width:320px;height:36px;border-radius:16px;background:#8a5a33"></div>`;
  h+=`<div class="bs" style="width:10px;height:${this.PD}px;border-radius:5px;background:#e9d5b0"></div><div class="bs" style="width:10px;height:${this.PD}px;border-radius:5px;background:#e9d5b0"></div>`;
  h+=`<div id="bbe" class="clay" style="width:700px;height:26px;border-radius:13px;background:#c98a4b"></div><div class="clay" style="left:513px;top:673px;width:54px;height:54px;border-radius:50%;background:#e8c14a"></div>`;
  h+=`<div class="bp clay" style="width:300px;height:22px;border-radius:11px;background:#c98a4b"></div><div class="bp clay" style="width:300px;height:22px;border-radius:11px;background:#c98a4b"></div>`;
  O.forEach((o,i)=>h+=`<div id="bo${i}" class="clay" style="display:none;width:250px;height:250px">${svgf('0 0 200 200',BFIG[o.fig])}</div>`);
  let pts='';for(let j=0;j<46;j++){const x=14+rnd(j,1)*172,y=118-rnd(j,2)*100*(1-Math.pow(Math.abs(x-100)/100,1.6));pts+=`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="5" ry="3.2" fill="${j%3?'#8a4424':'#3d1d10'}"/>`;}
  h+=`<div id="bta" class="clay"><svg viewBox="0 0 200 120" preserveAspectRatio="none" width="100%" height="100%" style="display:block"><path d="M2 120q10-104 98-108q88 4 98 108z" fill="#5a2f1c"/>${pts}</svg></div>`;
  for(let j=0;j<14;j++)h+=`<div class="bf" style="width:24px;height:14px;border-radius:50%;background:#6b3520"></div>`;
  h+=`<div id="bl" class="ln" style="top:420px;width:1080px;text-align:center;font-size:40px;color:#fff6e3;text-shadow:0 3px 0 rgba(0,0,0,.4)"></div>`;
  L.innerHTML=h;const g=id=>document.getElementById(id);this.be=g('bbe');this.o=O.map((_,i)=>g('bo'+i));this.ta=g('bta');g('bl').textContent=D.legende||'';
  this.s=[...L.querySelectorAll('.bs')];this.p=[...L.querySelectorAll('.bp')];this.f=[...L.querySelectorAll('.bf')];},
 draw(t,bi){
  const [px,py]=this.P,HL=this.HL,PD=this.PD;let k=0;for(let i=1;i<N;i++)if(t>=T[i])k=i;
  const v=k?t-T[k]:t+.5;let th,oi=k,os=1,ody=0,pi=-1,ps=0,ts,verse=false;
  if(RB){const a=eo(cl(RP/.35));   // tout s'en va, puis le premier objet retombe et fait pencher la balance
   if(RP<.35){oi=N-1;os=1-a;ts=1-a;th=0;}else{oi=0;ts=0;ody=-(1-Math.pow(cl((RP-.35)/.4),2))*900;th=-13*eo(cl((RP-.75)/.2));}}
  else{const q=eio(cl((v-.5)/1.2));verse=v>.5&&v<1.7;
   th=v<.4?0:v<.5?-13*eo((v-.4)/.1):v<1.7?-13*Math.pow(1-q,1.3):1.6*Math.exp(-(v-1.7)*6)*Math.sin((v-1.7)*18);
   ody=v<.15?-900:v<.4?-(1-Math.pow((v-.15)/.25,2))*900:0;ts=Math.pow(q,.55);
   if(k>0&&v<.15){pi=k-1;ps=1-v/.15;ts=ps;}}
  const a=th*Math.PI/180,lx=px-HL*Math.cos(a),ly=py-HL*Math.sin(a),rx=px+HL*Math.cos(a),ry=py+HL*Math.sin(a);
  this.be.style.transform=`translate(${px-350}px,${py-13}px) rotate(${th}deg)`;
  [[lx,ly],[rx,ry]].forEach(([x,y],j)=>{this.s[j].style.transform=`translate(${x-5}px,${y}px)`;this.p[j].style.transform=`translate(${x-150+jit(bi,20+j,.8)}px,${y+PD}px)`;});
  this.o.forEach((e,i)=>{const sc=i==oi?os:i==pi?ps:0;if(sc<=.01||(i==oi&&ody<-890)){e.style.display='none';return;}
   e.style.display='block';e.style.transformOrigin='50% 100%';e.style.transform=`translate(${lx-125+jit(bi,i*7+1,1)}px,${ly+PD-246+(i==oi?ody:0)+jit(bi,i*7+2,1)}px) rotate(${jit(bi,i*7+3,.6)}deg) scale(${sc})`;});
  const tw=290*ts,thh=178*Math.pow(ts,1.1),ta=this.ta;if(ts>.02){ta.style.display='block';ta.style.width=tw+'px';ta.style.height=thh+'px';ta.style.transform=`translate(${rx-tw/2+jit(bi,30,.8)}px,${ry+PD-thh+5}px)`;}else ta.style.display='none';
  this.f.forEach((e,j)=>{if(!verse){e.style.display='none';return;}const ph=((t*2.6+j/14)%1+1)%1;e.style.display='block';e.style.transform=`translate(${rx+(rnd(j,1)-.5)*170-12}px,${lerp(440,ry+PD-thh*.6,ph*ph)}px) rotate(${rnd(j,5)*180}deg)`;});
  tag('');fleche(0);
 }
};
// ================= scène 10 : remplit (chaque récipient plein est versé dans le suivant, puis on complète goutte à goutte) =================
const EAU='#4fb3ff';
// vb = cadre du dessin ; cav = forme intérieure (l'eau y est découpée) ; ct/cb = haut et bas de l'eau ; mx = position de l'ouverture (fraction de la largeur) ; mw/mh = taille max à l'écran
const RFIG={
 goutte:{vb:[100,130],mh:300,s:`<path d="M50 4C62 30 90 58 90 88A40 40 0 0 1 10 88C10 58 38 30 50 4Z" fill="${EAU}"/><ellipse cx="34" cy="82" rx="9" ry="17" fill="#d6f0ff" opacity=".85" transform="rotate(18 34 82)"/>`},
 cuillere:{vb:[260,110],mx:180/260,lip:[256,34],mw:640,cav:'M116 40A64 54 0 0 0 244 40Z',ct:40,cb:94,
  back:`<path d="M120 42L10 12" stroke="#cfd4dc" stroke-width="18" stroke-linecap="round"/><path d="M106 36A74 66 0 0 0 254 36Z" fill="#cfd4dc"/><path d="M116 40A64 54 0 0 0 244 40Z" fill="#8f96a3"/>`,
  front:`<rect x="104" y="31" width="152" height="10" rx="5" fill="#e9edf3"/>`},
 verre:{vb:[120,150],lip:[110,8],cav:'M16 12H104L94 136H26Z',ct:12,cb:136,
  back:`<path d="M8 6H112L100 144H20Z" fill="#dff3ff" opacity=".35"/>`,
  front:`<path d="M8 6H112L100 144H20Z" fill="none" stroke="#f4fbff" stroke-width="6" stroke-linejoin="round"/><path d="M24 22L33 124" stroke="#fff" stroke-width="6" opacity=".55" stroke-linecap="round"/>`},
 bouteille:{vb:[110,300],lip:[68,10],cav:'M46 30H64V62Q94 88 94 120V272Q94 286 80 286H30Q16 286 16 272V120Q16 88 46 62Z',ct:30,cb:286,
  back:`<path d="M40 22H70V58Q102 84 102 118V276Q102 294 84 294H26Q8 294 8 276V118Q8 84 40 58Z" fill="#dff3ff" opacity=".35"/>`,
  front:`<path d="M40 22H70V58Q102 84 102 118V276Q102 294 84 294H26Q8 294 8 276V118Q8 84 40 58Z" fill="none" stroke="#f4fbff" stroke-width="6" stroke-linejoin="round"/><rect x="34" y="2" width="42" height="24" rx="6" fill="#2f80da"/><rect x="9" y="156" width="92" height="46" fill="#ff7d5c" opacity=".7"/><path d="M24 128V258" stroke="#fff" stroke-width="6" opacity=".5" stroke-linecap="round"/>`},
 seau:{vb:[180,180],lip:[168,54],cav:'M20 62H160L146 166H34Z',ct:62,cb:166,
  back:`<path d="M24 60Q90 -30 156 60" fill="none" stroke="#8a8f99" stroke-width="7"/><path d="M12 56H168L152 172H28Z" fill="#ffcf3d" opacity=".4"/>`,
  front:`<path d="M12 56H168L152 172H28Z" fill="none" stroke="#ffb11f" stroke-width="7" stroke-linejoin="round"/><rect x="6" y="50" width="168" height="14" rx="7" fill="#ffb11f"/>`},
 baignoire:{vb:[340,180],lip:[334,26],cav:'M20 36H320Q318 140 248 140H92Q22 140 20 36Z',ct:36,cb:140,
  back:`<circle cx="74" cy="164" r="14" fill="#c9a86a"/><circle cx="266" cy="164" r="14" fill="#c9a86a"/><path d="M8 28H332Q332 150 250 150H90Q8 150 8 28Z" fill="#fff6e3" opacity=".35"/><path d="M296 24V6H326" fill="none" stroke="#cfd4dc" stroke-width="8" stroke-linecap="round"/>`,
  front:`<path d="M8 28H332Q332 150 250 150H90Q8 150 8 28Z" fill="none" stroke="#fff6e3" stroke-width="8" stroke-linejoin="round"/><rect x="2" y="22" width="336" height="14" rx="7" fill="#fff6e3"/>`},
 cube:{vb:[200,214],lip:[116,8],cav:'M20 30H180V188H20Z',ct:30,cb:188,
  back:`<rect x="12" y="22" width="176" height="172" rx="10" fill="#f2f7fb" opacity=".4"/>`,
  front:`<path d="M12 22H188V194H12ZM56 22V194M100 22V194M144 22V194M12 80H188M12 138H188" fill="none" stroke="#9aa1ad" stroke-width="5"/><rect x="82" y="6" width="36" height="18" rx="4" fill="#2f80da"/><rect x="4" y="194" width="192" height="20" rx="4" fill="#a8744a"/>`},
 piscine:{vb:[400,170],lip:[364,28],cav:'M40 30H360V150H40Z',ct:30,cb:150,
  back:`<rect x="0" y="30" width="400" height="140" fill="#8a5a33"/><rect x="0" y="22" width="400" height="14" rx="7" fill="#5fa35a"/><path d="M40 30H360V150H40Z" fill="#cdeeff"/><path d="M80 30V150M120 30V150M160 30V150M200 30V150M240 30V150M280 30V150M320 30V150M40 70H360M40 110H360" stroke="#a9dcf5" stroke-width="3"/>`,
  front:`<rect x="34" y="24" width="332" height="10" rx="5" fill="#e9e2d0"/><path d="M326 14V96M346 14V96M326 38H346M326 62H346" fill="none" stroke="#cfd4dc" stroke-width="5" stroke-linecap="round"/>`},
 olympique:{vb:[520,150],cav:'M20 26H500V136H20Z',ct:26,cb:136,cordes:1,
  back:`<rect x="0" y="26" width="520" height="124" fill="#8a5a33"/><path d="M20 26H500V136H20Z" fill="#cdeeff"/><path d="M40 126H480" stroke="#1d3f72" stroke-width="6"/><path d="M40 118V134M480 118V134" stroke="#1d3f72" stroke-width="6"/>`,
  front:`<rect x="0" y="20" width="520" height="12" rx="6" fill="#e9e2d0"/><g fill="#e0453a"><rect x="24" y="6" width="22" height="16" rx="3"/><rect x="474" y="6" width="22" height="16" rx="3"/></g>`},
};
const PIPETTE=`<rect x="22" y="64" width="16" height="118" rx="6" fill="#e8f6ff" opacity=".85"/><path d="M24 178L30 200L36 178Z" fill="#e8f6ff"/><rect x="25" y="120" width="10" height="58" rx="4" fill="${EAU}"/><ellipse cx="30" cy="40" rx="24" ry="34" fill="#e0453a"/><rect x="14" y="62" width="32" height="12" rx="5" fill="#b8352c"/>`;
const GOUTTE=`<path d="M50 4C62 30 90 58 90 88A40 40 0 0 1 10 88C10 58 38 30 50 4Z" fill="${EAU}"/>`;
SCENES.remplit={
 GY:1150,TX:540,TIP:640,
 taille(i,mw,mh){const f=RFIG[O[i].fig],[w,h]=f.vb,s=Math.min((f.mw||mw)/w,mh/h,(f.mh||1e9)/h);return [w*s,h*s];},
 init(){
  this.A=O.map((o,k)=>{const P=(k<N-1?T[k+1]:(FT.length?FT[0]:T[k]+4))-T[k];return Math.min(1,P/3.0);});
  O.forEach((o,i)=>{const a=this.A[i];
   evObj(i,i?T[i]+.45*a:0,{cs:i?T[i]+.45*a:.1,dur:i?1.8*a:.6,...(o.aff||{n:1})});
   if(i){const t0=T[i];SONS.push({t:t0,s:'whoosh',d:.45*a/V,fc:900,g:.35},{t:t0+.45*a,s:'plop',big:.1+.6*i/N,g:.5},
     i>1?{t:t0+.72*a,s:'zip',d:.5*a/V,f:260,g:.28}:{t:t0+.72*a,s:'toc',f:900,g:.3},{t:t0+.75*a,s:'bulles',n:9,g:.2},
     {t:t0+.45*a,s:'compteur',n:16,f:900,pas:1.8*a/16,g:.1},{t:t0+2.3*a,s:'note',k:i,g:.26});
    for(let x=1.3*a;x<2.25*a;x+=.11)SONS.push({t:t0+x,s:'toc',f:1500+((x*40)|0)%3*120,g:.1});}
   else SONS.push({t:.02,s:'plop',big:.2,g:.55},{t:.6,s:'note',k:0,g:.26});});
 },
 build(L){let h=`<div class="clay" style="left:-40px;top:${this.GY}px;width:1160px;height:44px;border-radius:22px;background:#a8744a"></div>`;
  O.forEach((o,i)=>{const f=RFIG[o.fig],[w,hh]=f.vb;
   const eau=f.cav?`<clipPath id="rq${i}"><path d="${f.cav}"/></clipPath><rect id="rw${i}" x="-10" y="0" width="${w+20}" height="0" fill="${EAU}" clip-path="url(#rq${i})"/><rect id="rs${i}" x="-10" y="0" width="${w+20}" height="5" fill="#c9ecff" clip-path="url(#rq${i})"/>`:'';
   let cordes='';if(f.cordes){for(let x=24;x<500;x+=16)cordes+=`<circle cx="${x}" cy="0" r="5" fill="${(x/16|0)%2?'#e0453a':'#fff6e3'}"/>`;cordes=`<g id="rc${i}">${cordes}</g>`;}
   h+=`<div id="ro${i}" class="clay" style="display:none">${svgf(`0 0 ${w} ${hh}`,f.s||(f.back+eau+cordes+f.front))}</div>`;});
  h+=`<div id="rfl" style="display:none;height:24px;border-radius:12px;background:${EAU};transform-origin:0 50%"></div>`;
  for(let j=0;j<4;j++)h+=`<div class="rdr clay" style="display:none;width:26px;height:34px">${svgf('0 0 100 130',GOUTTE)}</div>`;
  h+=`<div id="rpi" class="clay" style="width:72px;height:240px">${svgf('0 0 60 200',PIPETTE)}</div>`;
  L.innerHTML=h;const g=id=>document.getElementById(id);
  this.o=O.map((_,i)=>g('ro'+i));this.w=O.map((_,i)=>g('rw'+i));this.s=O.map((_,i)=>g('rs'+i));this.c=O.map((_,i)=>g('rc'+i));
  this.fl=g('rfl');this.pi=g('rpi');this.dr=[...L.querySelectorAll('.rdr')];},
 pose(i){const [W,H]=this.taille(i,760,480),f=RFIG[O[i].fig];return {W,H,x:this.TX-(f.mx??.5)*W,y:this.GY-H};},   // position au repos (bas posé sur la table)
 surf(i,p,lev){const f=RFIG[O[i].fig],sc=p.H/f.vb[1];return p.y+(f.cb-(f.cb-f.ct)*lev)*sc;},
 niveau(i,lev){const f=RFIG[O[i].fig];if(!f.cav)return;const y=f.cb-(f.cb-f.ct)*lev;
  this.w[i].setAttribute('y',y);this.w[i].setAttribute('height',Math.max(0,f.cb-y+2));this.s[i].setAttribute('y',y-2);this.s[i].style.display=lev>.004?'':'none';
  if(this.c[i])this.c[i].setAttribute('transform',`translate(0,${Math.max(y,f.ct+8)})`);},
 place(i,x,y,W,H,rot,sx,sy,bi,op=1){const e=this.o[i];e.style.display='block';e.style.opacity=op;e.style.width=W+'px';e.style.height=H+'px';
  e.style.transformOrigin='50% 100%';e.style.transform=`translate(${x+jit(bi,i*7+1,1.2)}px,${y+jit(bi,i*7+2,1.2)}px) rotate(${rot+jit(bi,i*7+3,.5)}deg) scale(${sx},${sy})`;},
 draw(t,bi){
  const GY=this.GY,TX=this.TX,TIP=this.TIP;let k=0;for(let i=1;i<N;i++)if(t>=T[i])k=i;
  this.o.forEach(e=>e.style.display='none');this.fl.style.display='none';
  let goutte=null;   // { de: instant de début, a: rythme, cible: y de la surface } pour la pipette
  const rebond=v=>{if(v<0)return [1,1];const q=.22*Math.exp(-v*9)*Math.cos(v*24);return [1+q*.8,1-q];};
  if(RB){   // le grand bassin s'en va, la goutte du début retombe
   const pN=this.pose(N-1),q1=eio(cl(RE/.5));if(q1<1){this.niveau(N-1,1);this.place(N-1,pN.x,pN.y,pN.W,pN.H,0,1-q1,1-q1,bi);}
   const q2=cl((RE-.5)/.5),p0=this.pose(0);if(q2>0)this.place(0,p0.x,p0.y-(1-q2*q2)*1500,p0.W,p0.H,0,1,1,bi);
  }else if(k==0){const p0=this.pose(0),[sx,sy]=rebond(t),w=.035*Math.sin(t*7);this.place(0,p0.x,p0.y,p0.W,p0.H,0,sx*(1+w),sy*(1-w),bi);}
  else{
   const a=this.A[k],v=t-T[k],pc=this.pose(k),pp=this.pose(k-1),part=O[k-1].vol/O[k].vol;
   // nouveau récipient : il tombe, rebondit, se remplit (versement puis gouttes)
   let dy=0,sx=1,sy=1;if(v<.45*a){const q=v/(.45*a);dy=-(1-q*q)*1500;}else[sx,sy]=rebond(v-.45*a);
   const lev=v<.75*a?0:v<1.3*a?part*eio(cl((v-.75*a)/(.5*a))):part+(1-part)*eio(cl((v-1.3*a)/a));
   this.niveau(k,lev);this.place(k,pc.x,pc.y+dy,pc.W,pc.H,0,sx,sy,bi);
   if(v>1.3*a&&v<2.3*a)goutte={de:T[k]+1.3*a,y:this.surf(k,pc,lev)};
   // récipient précédent : il monte au-dessus, se penche et se vide dedans
   const m=eio(cl(v/(.55*a))),[W2,H2]=this.taille(k-1,200,165),sx2=TX-.5*W2-160,sy2=585;
   if(O[k-1].fig=='goutte'){   // la goutte se rapetisse puis tombe dans la cuillère
    const [W3,H3]=[46,60],x0=pp.x+pp.W/2,y0=pp.y+pp.H,q=cl((v-.55*a)/(.2*a)),ys=this.surf(k,pc,0);
    if(v<.8*a){const W=lerp(pp.W,W3,m),H=lerp(pp.H,H3,m),yb=lerp(y0,TIP+70,m)+q*q*(ys-TIP-60);this.place(k-1,lerp(x0,TX,m)-W/2,yb-H,W,H,0,1,1,bi);}
   }else if(v<1.6*a){
    const W=lerp(pp.W,W2,m),H=lerp(pp.H,H2,m),cx=lerp(pp.x+pp.W/2,sx2,m),cy=lerp(pp.y+pp.H/2,sy2,m);
    const ang=115*eio(cl((v-.55*a)/(.3*a))),pl=1-eio(cl((v-.75*a)/(.5*a))),z=1-eio(cl((v-1.28*a)/(.3*a)));
    this.niveau(k-1,pl);
    const e=this.o[k-1];e.style.display='block';e.style.opacity=1;e.style.width=W+'px';e.style.height=H+'px';e.style.transformOrigin='50% 50%';
    e.style.transform=`translate(${cx-W/2+jit(bi,(k-1)*7+1,1.2)}px,${cy-H/2+jit(bi,(k-1)*7+2,1.2)}px) rotate(${ang}deg) scale(${z})`;
    if(v>.72*a&&v<1.27*a){const r=ang*Math.PI/180,lp=RFIG[O[k-1].fig].lip,lx=(lp[0]/RFIG[O[k-1].fig].vb[0]-.5)*W,ly=(lp[1]/RFIG[O[k-1].fig].vb[1]-.5)*H,x1=cx+lx*Math.cos(r)-ly*Math.sin(r),y1=cy+lx*Math.sin(r)+ly*Math.cos(r);
     const x2=TX,y2=this.surf(k,pc,lev)+6,L=Math.hypot(x2-x1,y2-y1),th=24*Math.min(1,(1.27*a-v)/(.12*a),(v-.72*a)/(.06*a));
     const f=this.fl;f.style.display='block';f.style.width=L+'px';f.style.height=th+'px';f.style.borderRadius=th/2+'px';f.style.transform=`translate(${x1}px,${y1-th/2}px) rotate(${Math.atan2(y2-y1,x2-x1)}rad)`;}
   }
  }
  // pipette : elle presse et lâche des gouttes pendant le remplissage
  const pq=goutte?Math.sin((t-goutte.de)*30):0;
  this.pi.style.transformOrigin='50% 0';this.pi.style.transform=`translate(${TX-36+jit(bi,401,1)}px,${TIP-236+jit(bi,402,1)}px) scale(${1+.08*Math.max(0,pq)},${1-.04*Math.max(0,pq)})`;
  this.dr.forEach((e,j)=>{if(!goutte){e.style.display='none';return;}const ph=(((t-goutte.de)*2.6+j/4)%1+1)%1,y=lerp(TIP,goutte.y-30,ph*ph);
   if(y>goutte.y-34||t-goutte.de<j/(4*2.6)){e.style.display='none';return;}e.style.display='block';e.style.transform=`translate(${TX-13}px,${y}px)`;});
  tag('');fleche(0);
 }
};
// ================= scène 11 : horloge (un personnage compte à voix haute, le réveil s'affole, les pages du calendrier s'envolent) =================
const PARLEUR=`<rect x="62" y="250" width="30" height="86" rx="12" fill="#3b3550"/><rect x="108" y="250" width="30" height="86" rx="12" fill="#3b3550"/><ellipse cx="74" cy="336" rx="24" ry="10" fill="#22222e"/><ellipse cx="126" cy="336" rx="24" ry="10" fill="#22222e"/>
<rect x="50" y="134" width="100" height="134" rx="36" fill="#2f9f5e"/><path d="M58 160q-30 40-14 86" fill="none" stroke="#2f9f5e" stroke-width="22" stroke-linecap="round"/><path d="M142 160q34 -10 40 -56" fill="none" stroke="#2f9f5e" stroke-width="22" stroke-linecap="round"/><circle cx="183" cy="98" r="14" fill="#f2c29b"/>
<circle cx="100" cy="82" r="56" fill="#f2c29b"/><path id="hcv" d="M44 76q2-62 58-60q56 2 54 62q-22-30-56-28q-34 0-56 26z" fill="#5a3a2a"/>
<g id="hbb"><path d="M50 96q4 64 50 70q46-6 50-70q-20 22-50 22q-30 0-50-22z" fill="#e8e8ee"/></g>
<circle cx="80" cy="82" r="6" fill="${NOIR}"/><circle cx="120" cy="82" r="6" fill="${NOIR}"/><ellipse id="hbo" cx="100" cy="112" rx="14" ry="10" fill="#7a2230"/>`;
const REVEIL=`<path d="M52 176l-16 20M148 176l16 20" stroke="#b8352c" stroke-width="10" stroke-linecap="round"/><g id="hcl"><circle cx="42" cy="34" r="26" fill="#ffb11f"/><circle cx="158" cy="34" r="26" fill="#ffb11f"/></g><rect x="94" y="2" width="12" height="16" rx="4" fill="#b8352c"/>
<circle cx="100" cy="104" r="92" fill="#e0453a"/><circle cx="100" cy="104" r="76" fill="#fff6e3"/>
${Array.from({length:12},(_,j)=>{const a=j*Math.PI/6,c=Math.cos(a),s=Math.sin(a),r1=j%3?62:56;return `<line x1="${(100+r1*s).toFixed(1)}" y1="${(104-r1*c).toFixed(1)}" x2="${(100+70*s).toFixed(1)}" y2="${(104-70*c).toFixed(1)}" stroke="#3b3550" stroke-width="${j%3?4:7}" stroke-linecap="round"/>`;}).join('')}
<g id="hh"><line x1="100" y1="104" x2="100" y2="62" stroke="${NOIR}" stroke-width="10" stroke-linecap="round"/></g>
<g id="hm2" opacity=".25"><line x1="100" y1="104" x2="100" y2="44" stroke="${NOIR}" stroke-width="7" stroke-linecap="round"/></g><g id="hm"><line x1="100" y1="104" x2="100" y2="44" stroke="${NOIR}" stroke-width="7" stroke-linecap="round"/></g>
<g id="hs2" opacity=".3"><line x1="100" y1="116" x2="100" y2="38" stroke="#e0453a" stroke-width="3.5" stroke-linecap="round"/></g><g id="hs"><line x1="100" y1="116" x2="100" y2="38" stroke="#e0453a" stroke-width="3.5" stroke-linecap="round"/></g>
<circle cx="100" cy="104" r="7" fill="#e0453a"/>`;
// angle d'une aiguille entre deux instants : vrai mouvement si peu de tours, sinon 2 tours de plus « affolés » qui finissent pile à la bonne heure
function aiguille(Sa,Sb,u,P){const a=Sa/P*360,b=Sb/P*360,d=b-a;if(Math.abs(d)<=720)return {ang:a+d*u,vite:0};
 const am=((a%360)+360)%360,r=d>0?(((b-a)%360)+360)%360+720:-((((a-b)%360)+360)%360+720);return {ang:am+r*u,vite:u>0&&u<1?1:0};}
SCENES.horloge={
 init(){
  this.A=O.map((o,k)=>{const P=(k<N-1?T[k+1]:(FT.length?FT[0]:T[k]+4))-T[k];return Math.min(1,P/2.6);});
  O.forEach((o,i)=>{const a=this.A[i];
   evObj(i,i?T[i]+.1:0,o.aff||{n:o.n});
   if(i){const t0=T[i];SONS.push({t:t0,s:'whoosh',d:.5*a/V,fc:800,g:.35},{t:t0+.05,s:'compteur',n:16,f:1000+40*i,pas:1.1*a/16,g:.13},{t:t0+1.2*a,s:'plop',big:.15+.5*i/N,g:.5},{t:t0+1.3*a,s:'note',k:i,g:.26});
    if(i>=3)SONS.push({t:t0+.15,s:'pip',g:.2},{t:t0+.45*a,s:'pip',g:.2});
    if(Math.floor(o.n/86400)>Math.floor(O[i-1].n/86400))SONS.push({t:t0+.3,s:'whoosh',d:.7*a/V,fc:2200,g:.25});}
   else SONS.push({t:.02,s:'plop',big:.15,g:.5},{t:.08,s:'compteur',n:10,f:1000,pas:.09,g:.14},{t:.7,s:'note',k:0,g:.26});});
  for(let t=.5;t<TR-.3;t+=1.0)SONS.push({t,s:'toc',f:1250,g:.07});   // tic-tac
 },
 S(t){if(RB)return llog(O[N-1].n,1,RE)-RE;let k=0;for(let i=1;i<N;i++)if(t>=T[i])k=i;
  if(!k)return O[0].n*eio(cl((t-.05)/.95));return llog(O[k-1].n,O[k].n,eio(cl((t-T[k]-.05)/(1.1*this.A[k]))));},
 frac(t){const S=this.S(t);return cl(Math.log10(Math.max(1,S))/Math.log10(O[N-1].n));},
 build(L){let h=`<div class="clay" style="left:-40px;top:1190px;width:1160px;height:40px;border-radius:20px;background:#a8744a"></div>`;
  h+=`<div id="hlg" class="ln" style="top:415px;width:1080px;text-align:center;font-size:40px;color:#fff6e3;text-shadow:0 3px 0 rgba(0,0,0,.4)"></div>`;
  h+=`<div id="hbu" class="clay" style="left:60px;top:480px;width:480px;height:130px"><div style="position:absolute;inset:0;border-radius:40px;background:#fff6e3"></div><svg style="position:absolute;left:96px;top:118px" width="80" height="90" viewBox="0 0 80 90"><path d="M0 0H64L18 86Z" fill="#fff6e3"/></svg><div id="hnb" class="ln" style="position:absolute;left:0;top:0;width:480px;height:130px;display:flex;align-items:center;justify-content:center;color:#2b2f3a"></div></div>`;
  h+=`<div id="hpe" class="clay" style="left:30px;top:716px;width:280px;height:476px">${svgf('0 0 200 340',PARLEUR)}</div>`;
  h+=`<div id="hre" class="clay" style="width:400px;height:420px">${svgf('0 0 200 210',REVEIL)}</div>`;
  for(let j=0;j<3;j++)h+=`<div class="hpg clay" style="display:none;width:230px;height:150px;border-radius:12px;background:#fffdf6;border-top:34px solid #e0453a;box-sizing:border-box"></div>`;
  h+=`<div id="hca" class="clay" style="left:650px;top:1012px;width:250px;height:178px"><div style="position:absolute;left:0;top:0;width:250px;height:178px;border-radius:14px;background:#fffdf6"></div><div style="position:absolute;left:0;top:0;width:250px;height:48px;border-radius:14px 14px 0 0;background:#e0453a;color:#fff6e3;font:700 34px Fredoka;text-align:center;line-height:50px">JOUR</div><div id="hcn" class="ln" style="position:absolute;left:0;top:52px;width:250px;text-align:center;color:#2b2f3a;line-height:120px"></div></div>`;
  L.innerHTML=h;const g=id=>document.getElementById(id);
  Object.assign(this,{nb:g('hnb'),bu:g('hbu'),pe:g('hpe'),re:g('hre'),cn:g('hcn'),hh:g('hh'),hm:g('hm'),hm2:g('hm2'),hs:g('hs'),hs2:g('hs2'),hcl:g('hcl'),hbb:g('hbb'),hcv:g('hcv'),hbo:g('hbo'),pg:[...L.querySelectorAll('.hpg')]});
  g('hlg').textContent=D.legende||'';},
 draw(t,bi){
  let k=0;for(let i=1;i<N;i++)if(t>=T[i])k=i;
  const S=this.S(t);let Sa,Sb,u;
  if(RB){Sa=O[N-1].n;Sb=0;u=RE;}else if(!k){Sa=0;Sb=O[0].n;u=eio(cl((t-.05)/.95));}else{Sa=O[k-1].n;Sb=O[k].n;u=eio(cl((t-T[k]-.05)/(1.1*this.A[k])));}
  const tr=t0=>t0>=0?.14*Math.exp(-t0*9):0,tk=RB?-1:k?t-T[k]:t;
  // bulle : le nombre que l'on dit
  const txt=fr(Math.max(1,Math.floor(S+Math.max(1e-6,S*1e-9))));this.nb.textContent=txt;this.nb.style.fontSize=Math.min(100,430/(txt.length*.6))+'px';
  this.bu.style.transformOrigin='30% 100%';this.bu.style.transform=`translate(${jit(bi,1,1)}px,${jit(bi,2,1)}px) scale(${1+tr(tk)})`;
  // personnage : rebond, bouche qui parle, barbe et cheveux qui blanchissent avec les jours
  const vieux=cl(Math.log(Math.max(1,S/86400))/Math.log(O[N-1].n/86400));
  this.hbb.setAttribute('transform',`translate(100 96) scale(${vieux} ${vieux}) translate(-100 -96)`);this.hbb.style.display=vieux>.02?'':'none';
  this.hcv.setAttribute('fill',mix('#5a3a2a','#e8e8ee',vieux));
  const parle=(u>0&&u<1)||(!k&&!RB&&t<1.05);this.hbo.setAttribute('ry',parle?(bi%2?12:4):6);
  let sx=1,sy=1;if(!RB&&tk>=0){const v=k?tk-1.2*this.A[k]:tk;if(v>=0||!k){const q=.2*Math.exp(-Math.max(0,v)*9)*Math.cos(Math.max(0,v)*24);sy=1-q;sx=1+q*.8;}}
  this.pe.style.transformOrigin='50% 100%';this.pe.style.transform=`translate(${jit(bi,3,1.2)}px,${jit(bi,4,1.2)}px) scale(${sx},${sy})`;
  // réveil : les aiguilles suivent le temps écoulé (départ à midi)
  const H=aiguille(Sa,Sb,u,43200),M=aiguille(Sa,Sb,u,3600),Se=aiguille(Sa,Sb,u,60),fou=M.vite||H.vite||Se.vite;
  const rot=(el,a)=>el.setAttribute('transform',`rotate(${a.toFixed(2)} 100 104)`);
  rot(this.hh,H.ang);rot(this.hm,M.ang);rot(this.hs,Se.ang);rot(this.hm2,M.ang-(M.vite?25:0));rot(this.hs2,Se.ang-(Se.vite?30:0));
  this.hm2.style.display=M.vite?'':'none';this.hs2.style.display=Se.vite?'':'none';
  this.hcl.setAttribute('transform',fou?`translate(0 ${bi%2?-5:3})`:'');
  this.re.style.transformOrigin='50% 50%';this.re.style.transform=`translate(${520+jit(bi,5,1.2)}px,${600+jit(bi,6,1.2)}px) rotate(${fou?(bi%2?5:-5):jit(bi,7,.6)}deg)`;
  // calendrier : numéro du jour, pages qui s'envolent quand les jours défilent
  const jour=Math.floor(S/86400)+1,ja=Math.floor(Sa/86400),jb=Math.floor(Sb/86400),vole=ja!=jb&&u>0&&u<.85;
  const jt=fr(jour);this.cn.textContent=jt;this.cn.style.fontSize=Math.min(110,230/(jt.length*.62))+'px';
  this.pg.forEach((e,j)=>{if(!vole){e.style.display='none';return;}const ph=((u/.85*5+j/3)%1+1)%1;e.style.display='block';e.style.opacity=1-ph*ph;
   e.style.transform=`translate(${660+ph*260}px,${1040-ph*420-(1-ph)*0}px) rotate(${ph*(60+40*j)}deg) scale(${1-ph*.5})`;});
  tag('');fleche(0);
 }
};
