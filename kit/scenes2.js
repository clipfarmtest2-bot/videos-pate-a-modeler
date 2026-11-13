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
