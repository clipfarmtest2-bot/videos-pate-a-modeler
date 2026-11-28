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
// ================= outils communs aux scènes 12 à 16 =================
const ecrase=v=>{if(v<0)return [1,1];const q=.22*Math.exp(-v*9)*Math.cos(v*24);return [1+q*.8,1-q];};   // rebond « pâte » à l'atterrissage
const etape=t=>{let k=0;for(let i=1;i<N;i++)if(t>=T[i])k=i;return k;};
const rythme=()=>O.map((o,k)=>{const P=(k<N-1?T[k+1]:(FT.length?FT[0]:T[k]+4))-T[k];return Math.min(1,P/2.6);});
const legendeDiv=(id,y)=>`<div id="${id}" class="ln" style="top:${y}px;width:1080px;text-align:center;font-size:40px;color:#fff6e3;text-shadow:0 3px 0 rgba(0,0,0,.4)"></div>`;
// ================= scène 12 : grue (une grue soulève des objets de plus en plus lourds, le peson s'affole) =================
// cadre des objets : viewBox 0 -90 200 250 ; sol à y = 160 ; les élingues se rejoignent à (100, -80) = point d'accroche
const elingue=(y,w)=>`<path d="M100 -80L${100-w} ${y}M100 -80L${100+w} ${y}" stroke="#6e4526" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="100" cy="-80" r="9" fill="none" stroke="#8a8f99" stroke-width="5"/>`;
const GFIG={
 vache:{y:62,w:56,s:`<rect x="52" y="120" width="14" height="40" rx="6" fill="#e9e4dc"/><rect x="128" y="120" width="14" height="40" rx="6" fill="#e9e4dc"/><path d="M168 82q22 4 18 40" fill="none" stroke="#e9e4dc" stroke-width="6" stroke-linecap="round"/><rect x="44" y="62" width="128" height="68" rx="28" fill="#fbf7ef"/><rect x="72" y="122" width="14" height="38" rx="6" fill="#fbf7ef"/><rect x="146" y="122" width="14" height="38" rx="6" fill="#fbf7ef"/><path d="M78 64q20 6 18 30q-20 8-30-6q-4-18 12-24zM128 86q24-6 30 14q-6 22-26 16q-12-14-4-30z" fill="#2b2b36"/><ellipse cx="104" cy="128" rx="14" ry="9" fill="#f4a9b8"/><circle cx="34" cy="76" r="26" fill="#fbf7ef"/><ellipse cx="22" cy="90" rx="18" ry="13" fill="#f4a9b8"/><circle cx="16" cy="88" r="3" fill="${NOIR}"/><circle cx="27" cy="88" r="3" fill="${NOIR}"/><circle cx="36" cy="68" r="4.5" fill="${NOIR}"/><path d="M22 54l-8-12M48 54l8-12" stroke="#e8c14a" stroke-width="6" stroke-linecap="round"/>`},
 voiture:{y:78,w:64,s:`<path d="M14 136V112q0-14 14-18l30-6 22-24q8-8 20-8h40q12 0 20 10l20 22q24 4 26 22v26z" fill="#e0453a"/><path d="M66 90l18-20q4-4 10-4h22v24zM124 66h14q8 0 12 6l14 18h-40z" fill="#9fdcff"/><rect x="8" y="128" width="184" height="12" rx="6" fill="#b8352c"/><circle cx="52" cy="140" r="20" fill="#2b2b36"/><circle cx="52" cy="140" r="8" fill="#cfd4dc"/><circle cx="150" cy="140" r="20" fill="#2b2b36"/><circle cx="150" cy="140" r="8" fill="#cfd4dc"/><rect x="176" y="104" width="12" height="9" rx="4" fill="#ffe08a"/>`},
 hippo:{y:60,w:58,s:`<rect x="58" y="122" width="22" height="38" rx="9" fill="#7a6e93"/><rect x="138" y="122" width="22" height="38" rx="9" fill="#7a6e93"/><ellipse cx="116" cy="102" rx="70" ry="46" fill="#8f83a8"/><rect x="84" y="124" width="22" height="36" rx="9" fill="#8f83a8"/><rect x="160" y="124" width="22" height="36" rx="9" fill="#8f83a8"/><path d="M182 98q16 0 14 14" fill="none" stroke="#8f83a8" stroke-width="6" stroke-linecap="round"/><ellipse cx="44" cy="94" rx="38" ry="32" fill="#9d92b5"/><ellipse cx="26" cy="104" rx="26" ry="20" fill="#b9aecf"/><circle cx="18" cy="98" r="3.5" fill="#5a4f70"/><circle cx="34" cy="96" r="3.5" fill="#5a4f70"/><circle cx="54" cy="70" r="6" fill="${NOIR}"/><ellipse cx="66" cy="60" rx="7" ry="9" fill="#7a6e93"/><path d="M18 118h22" stroke="#fff6e3" stroke-width="5" stroke-linecap="round"/>`},
 elephant:{y:50,w:60,s:`<g transform="translate(0,22)">${ANI.elephant}</g>`},
 bus:{y:52,w:72,s:`<rect x="6" y="52" width="188" height="88" rx="16" fill="#ffb11f"/><rect x="6" y="104" width="188" height="10" fill="#e08a12"/>${[0,1,2,3,4].map(j=>`<rect x="${22+j*32}" y="64" width="24" height="30" rx="5" fill="#9fdcff"/>`).join('')}<rect x="170" y="62" width="18" height="52" rx="5" fill="#9fdcff"/><circle cx="46" cy="142" r="17" fill="#2b2b36"/><circle cx="46" cy="142" r="7" fill="#cfd4dc"/><circle cx="154" cy="142" r="17" fill="#2b2b36"/><circle cx="154" cy="142" r="7" fill="#cfd4dc"/>`},
 camion:{y:40,w:80,s:`<rect x="4" y="40" width="142" height="88" rx="6" fill="#2f80da"/><path d="M24 40v88M44 40v88M64 40v88M84 40v88M104 40v88M124 40v88" stroke="#2566b5" stroke-width="5"/><path d="M152 64h20q12 0 16 12l8 22v30h-44z" fill="#e0453a"/><path d="M160 72h12q6 0 9 8l5 14h-26z" fill="#9fdcff"/><rect x="4" y="126" width="194" height="10" rx="5" fill="#3b3550"/>${[22,52,168].map(x=>`<circle cx="${x}" cy="142" r="15" fill="#2b2b36"/><circle cx="${x}" cy="142" r="6" fill="#cfd4dc"/>`).join('')}`},
 baleine:{y:80,w:62,s:`<g transform="translate(0,48)">${FIG.baleine()}</g>`},
 statue:{y:62,w:34,s:`<rect x="62" y="132" width="76" height="28" rx="4" fill="#b7a58a"/><rect x="70" y="122" width="60" height="14" rx="3" fill="#cdbb9c"/><path d="M76 124q-4-48 8-74h32q12 26 8 74z" fill="#5fb59a"/><path d="M84 52q-10 30-2 70M100 54v68M116 52q10 30 2 70" stroke="#4a9a80" stroke-width="4" fill="none"/><path d="M112 60q14-30 18-76" fill="none" stroke="#5fb59a" stroke-width="13" stroke-linecap="round"/><rect x="122" y="-30" width="16" height="16" rx="3" fill="#4a9a80"/><path d="M130 -32q-12-16 0-34q12 18 0 34z" fill="#ffb11f"/><path d="M84 66q-14 6-14 24" fill="none" stroke="#5fb59a" stroke-width="11" stroke-linecap="round"/><rect x="62" y="82" width="16" height="22" rx="3" fill="#4a9a80"/><circle cx="100" cy="38" r="16" fill="#5fb59a"/><path d="M84 28l-10-12M92 23l-4-15M100 21v-16M108 23l4-15M116 28l10-12" stroke="#5fb59a" stroke-width="5" stroke-linecap="round"/>`},
 nuage:{y:66,w:56,s:`<g id="gor" style="display:none"><path d="M96 138l-14 26h14l-8 26 26-34h-14l10-18z" fill="#ffe14a"/></g><g id="gnu"><circle cx="58" cy="108" r="34" fill="#ffffff"/><circle cx="96" cy="88" r="44" fill="#ffffff"/><circle cx="140" cy="102" r="36" fill="#ffffff"/><circle cx="168" cy="122" r="22" fill="#ffffff"/><circle cx="30" cy="126" r="20" fill="#ffffff"/><rect x="28" y="110" width="150" height="36" rx="18" fill="#ffffff"/><path d="M36 140h132" stroke="#d6e6f5" stroke-width="10" stroke-linecap="round"/><circle cx="82" cy="72" r="12" fill="#ffffff" opacity=".8"/></g>`},
};
const PESON=`<circle cx="55" cy="55" r="52" fill="#fff6e3"/><circle cx="55" cy="55" r="52" fill="none" stroke="#3b3550" stroke-width="7"/><path d="M27 83A40 40 0 1 1 83 83" fill="none" stroke="#c9c2b0" stroke-width="7" stroke-dasharray="3 9"/><path d="M71 20A40 40 0 0 1 83 83" fill="none" stroke="#e0453a" stroke-width="7"/><circle cx="55" cy="55" r="7" fill="#3b3550"/><path d="M55 107v20" stroke="#3b3550" stroke-width="5"/><path d="M55 125q-14 0-14 10q0 9 9 9" fill="none" stroke="#8a8f99" stroke-width="7" stroke-linecap="round"/>`;
SCENES.grue={
 X:640,GY:1180,W:340,H:425,MX:160,MY:452,LIFT:172,MAXB:4.5,
 init(){
  const m=O.map(o=>o.kg),lo=Math.log(m[0]/3),hi=Math.log(m[N-1]);
  this.w=m.map(v=>cl((Math.log(v)-lo)/(hi-lo)));this.A=rythme();
  O.forEach((o,i)=>{const a=i?this.A[i]:1,t0=i?T[i]:0,tl=i?t0+.7*a:.35;
   evObj(i,i?t0+.62*a:0,{cs:i?tl:-9,dur:.6*a,...(o.aff||{n:o.kg,suf:' KG'})});
   if(i)SONS.push({t:t0,s:'whoosh',d:.4*a/V,fc:700,g:.3},{t:t0+.55*a,s:'plop',big:.15+.6*this.w[i],g:.55},{t:t0+.66*a,s:'toc',f:520,g:.35});
   else SONS.push({t:.02,s:'plop',big:.15,g:.5},{t:.3,s:'toc',f:520,g:.35});
   SONS.push({t:tl,s:'zip',d:.6*a/V,f:150+30*i,g:.32},{t:tl,s:'compteur',n:12,f:900,pas:.6*a/12,g:.12},{t:tl+.65*a,s:'note',k:i,g:.26});
   if(this.w[i]>.7)SONS.push({t:tl+.55*a,s:'toc',f:240,g:.3},{t:tl+.7*a,s:'toc',f:210,g:.25});});
 },
 build(L){let h=`<div class="clay" style="left:-40px;top:${this.GY}px;width:1160px;height:40px;border-radius:20px;background:#8a6a45"></div>`;
  let lat='';for(let y=0;y<720;y+=48)lat+=`<path d="M8 ${y}L52 ${y+48}M52 ${y}L8 ${y+48}" stroke="#e0a21f" stroke-width="5"/>`;
  h+=`<div class="clay" style="left:130px;top:452px;width:60px;height:730px">${svgf('0 0 60 730',`<rect x="2" y="0" width="8" height="730" fill="#ffb11f"/><rect x="50" y="0" width="8" height="730" fill="#ffb11f"/>${lat}`)}</div>`;
  h+=`<div class="clay" style="left:80px;top:1130px;width:160px;height:56px;border-radius:10px;background:#9aa1ad"></div>`;
  let jl='';for(let x=0;x<930;x+=40)jl+=`<path d="M${x} 6L${x+20} 48L${x+40} 6" stroke="#e0a21f" stroke-width="5" fill="none"/>`;
  h+=`<div id="gjb" class="clay" style="left:40px;top:425px;width:980px;height:150px">${svgf('0 0 980 150',`<rect x="0" y="0" width="960" height="9" rx="4" fill="#ffb11f"/><rect x="0" y="45" width="960" height="9" rx="4" fill="#ffb11f"/>${jl}<rect x="0" y="54" width="86" height="80" rx="8" fill="#8a8f99"/><rect x="0" y="54" width="86" height="16" fill="#6f747e"/><rect x="132" y="60" width="64" height="58" rx="10" fill="#e0453a"/><rect x="142" y="70" width="44" height="26" rx="5" fill="#9fdcff"/><rect x="578" y="52" width="44" height="18" rx="5" fill="#3b3550"/><circle cx="586" cy="50" r="6" fill="#22222e"/><circle cx="614" cy="50" r="6" fill="#22222e"/>`)}</div>`;
  h+=`<div id="gcb" style="width:6px;border-radius:3px;background:#3b3550"></div>`;
  h+=`<div id="gas" class="clay" style="width:110px;height:150px">${svgf('0 0 110 150',PESON+'<g id="gai"><path d="M55 55L55 14" stroke="#e0453a" stroke-width="8" stroke-linecap="round"/></g>')}</div>`;
  O.forEach((o,i)=>{const f=GFIG[o.fig];h+=`<div id="go${i}" class="clay" style="display:none;width:${this.W}px;height:${this.H}px"><div id="gi${i}" style="position:absolute;inset:0">${svgf('0 -90 200 250',elingue(f.y,f.w)+f.s)}</div></div>`;});
  h+=legendeDiv('glg',420);
  L.innerHTML=h;const g=id=>document.getElementById(id);
  Object.assign(this,{jb:g('gjb'),cb:g('gcb'),as:g('gas'),ai:g('gai'),o:O.map((_,i)=>g('go'+i)),oi:O.map((_,i)=>g('gi'+i)),gor:g('gor'),gnu:g('gnu')});g('glg').textContent=D.legende||'';},
 draw(t,bi){
  const GY=this.GY,H=this.H,W=this.W,X=this.X,top0=GY-H,top1=top0-this.LIFT,k=etape(t),a=k?this.A[k]:1,v=k?t-T[k]:t;
  this.o.forEach(e=>e.style.display='none');
  let hook,load=0,needle=0,sway=0;
  const Q=[],show=(i,x,top,sx,sy,rot,op=1)=>Q.push([i,x,top,sx,sy,rot,op]);
  const lif=x=>eio(cl(x));
  if(RB){const q1=eio(cl(RP/.45)),q2=cl((RP-.5)/.42),L=N-1;
   if(q1<1){const y=lerp(top1,top1-1500,q1*q1);show(L,X,y,1,1,0);}
   hook=lerp(top1,top0,q1)+17;load=this.w[L]*(1-q1);needle=load;
   if(q2>0)show(0,X,lerp(-500,top0,q2*q2),1,1,0);}
  else{
   if(k==0){const L0=lif((t-.35)/.6),[sx,sy]=L0>0?[1,1]:ecrase(t);const top=lerp(top0,top1,L0);
    sway=L0>=1?1.4*Math.sin((t-.95)*3.2)*Math.exp(-(t-.95)*1.2):0;
    show(0,X,top,sx,sy,L0>0?sway:0);hook=top+17;load=this.w[0]*L0;needle=this.w[0]*(L0<1?back(cl((t-.35)/.6)):1);}
   else{
    // l'objet précédent redescend puis glisse hors du cadre
    const dn=lif(v/(.3*a)),out=eo(cl((v-.3*a)/(.32*a)));
    if(out<1)show(k-1,X-1100*out,lerp(top1,top0,dn),1,1,0,1);
    // le nouvel objet tombe, rebondit, puis est soulevé
    const q=cl((v-.3*a)/(.25*a)),L1=lif((v-.7*a)/(.6*a));let top=top0,sx=1,sy=1;
    if(v<.55*a)top=lerp(-500,top0,q*q);else if(L1<=0)[sx,sy]=ecrase(v-.55*a);else top=lerp(top0,top1,L1);
    const tl=T[k]+1.3*a;sway=L1>=1?1.4*Math.sin((t-tl)*3.2)*Math.exp(-(t-tl)*1.2):0;
    if(v>=.3*a)show(k,X,top,sx,sy,L1>0?sway:0);
    hook=(v<.3*a?lerp(top1,top0,dn):L1>0?top:top0)+17;
    load=v<.3*a?this.w[k-1]*(1-dn):this.w[k]*L1;
    needle=v<.3*a?load:this.w[k]*(L1<=0?0:L1<1?back(cl((v-.7*a)/(.6*a))):1);}
  }
  // flèche de la grue qui plie sous la charge
  const th=this.MAXB*load*Math.PI/180,dy=480*Math.sin(th),hard=load>.7&&!RB?(bi%2?1:-1)*1.2*(load-.7)/.3:0;
  this.jb.style.transformOrigin=`${this.MX-40}px 27px`;this.jb.style.transform=`rotate(${(th*180/Math.PI+hard*.15)}deg)`;
  const hy=hook+dy,ty=this.MY+38+dy;
  // tout ce qui pend au crochet descend avec la flèche
  Q.forEach(([i,x,top,sx,sy,rot,op])=>{const e=this.o[i],y=top+(Math.abs(top+17-hook)<1?dy:0);e.style.display='block';e.style.opacity=op;
   e.style.transformOrigin=rot?'50% 4%':'50% 100%';e.style.transform=`translate(${x-W/2+jit(bi,i*7+1,1.2)}px,${y+jit(bi,i*7+2,1.2)}px) rotate(${rot+jit(bi,i*7+3,.5)}deg) scale(${sx},${sy})`;});
  const ax=X+sway*3.2;this.as.style.transform=`translate(${ax-55+jit(bi,301,1)}px,${hy-150+jit(bi,302,1)}px) rotate(${sway}deg)`;this.as.style.transformOrigin='50% 100%';
  this.cb.style.height=Math.max(0,hy-150-ty+4)+'px';this.cb.style.transform=`translate(${X-3}px,${ty}px)`;
  const na=-135+270*cl(needle*1.0)+(needle>.98&&!RB?(bi%2?4:-4):0);this.ai.setAttribute('transform',`rotate(${na.toFixed(1)} 55 55)`);
  // orage : à l'écran de fin, le nuage s'assombrit et lâche un éclair
  if(this.gnu){const sf=FT.length?cl((t-FT[0]-.3)/.6)*(RB?1-eio(cl(RP/.3)):1):0;
   this.gnu.style.filter=sf>0?`brightness(${1-.55*sf})`:'';this.gor.style.display=sf>.6&&bi%4!=3?'':'none';}
  tag('');fleche(0);
 }
};
// ================= scène 13 : echiquier (on double les grains de riz de case en case) =================
const grainR=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="26" ry="11" fill="#fbf6e6"/><ellipse cx="${x-6}" cy="${y-4}" rx="12" ry="3.5" fill="#ffffff"/></g>`;
const tasRiz=(cx,by,w,h,n,seed)=>{let s=`<path d="M${cx-w/2} ${by}Q${cx} ${by-h*2} ${cx+w/2} ${by}Z" fill="#f4ecd2"/>`;
 for(let j=0;j<n;j++){const u=rnd(seed+j,1)-.5,x=cx+u*w*.85,ymax=by-h*(1-4*u*u)*1.0,y=by-(by-ymax)*rnd(seed+j,2)*.95;s+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(w/30).toFixed(1)}" ry="${(w/70).toFixed(1)}" fill="${j%3?'#fffdf4':'#e6dcc0'}" transform="rotate(${(rnd(seed+j,3)*180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;}return s;};
const XFIG={   // cadre 0 0 200 200, posé en bas (y = 200)
 g1:grainR(100,186,-12),
 g2:grainR(80,186,-12)+grainR(124,182,20),
 g4:grainR(70,188,-12)+grainR(128,188,14)+grainR(98,170,-30)+grainR(104,190,4),
 cuillere:`<path d="M96 168L190 120" stroke="#cfd4dc" stroke-width="14" stroke-linecap="round"/><ellipse cx="70" cy="172" rx="56" ry="26" fill="#cfd4dc"/><ellipse cx="70" cy="166" rx="46" ry="16" fill="#e9edf3"/>${tasRiz(70,168,84,26,26,11)}`,
 sac:`<path d="M44 196q-14-60 14-116q-8-16 6-26h72q14 10 6 26q28 56 14 116z" fill="#d9b77a"/><path d="M64 56q36 14 72 0" fill="none" stroke="#a8844a" stroke-width="7" stroke-linecap="round"/><path d="M60 54q40-26 80 0" fill="#fbf6e6"/><text x="100" y="150" font-family="Fredoka" font-weight="700" font-size="38" text-anchor="middle" fill="#8a5a2c">RIZ</text>`,
 camion:`<path d="M10 70h120l-10 90H20z" fill="#ffb11f"/>${tasRiz(70,74,124,30,40,21)}<path d="M136 96h30q12 0 18 12l12 24v32h-60z" fill="#e0453a"/><path d="M146 104h18q6 0 9 7l7 17h-34z" fill="#9fdcff"/><rect x="6" y="156" width="192" height="12" rx="6" fill="#3b3550"/>${[40,98,168].map(x=>`<circle cx="${x}" cy="176" r="18" fill="#2b2b36"/><circle cx="${x}" cy="176" r="7" fill="#cfd4dc"/>`).join('')}`,
 cargo:`<path d="M4 120h192l-22 64H26z" fill="#2f5fd0"/><rect x="4" y="160" width="192" height="12" fill="#e0453a"/>${[0,1,2].map(j=>`<rect x="${30+j*46}" y="100" width="40" height="22" rx="3" fill="#8a5a33"/>${tasRiz(50+j*46,104,40,16,12,40+j*20)}`).join('')}<rect x="164" y="78" width="26" height="44" rx="4" fill="#fff6e3"/><rect x="168" y="84" width="18" height="8" rx="2" fill="#9fdcff"/><rect x="172" y="58" width="10" height="22" fill="#e0453a"/><path d="M0 196q25-10 50 0t50 0t50 0t50 0" fill="none" stroke="#7fd4ff" stroke-width="8" stroke-linecap="round"/>`,
 montagne:`${tasRiz(100,198,196,96,120,61)}`,
 geante:`${tasRiz(100,198,200,98,170,91)}<g fill="#ffffff" opacity=".92"><ellipse cx="40" cy="128" rx="26" ry="10"/><ellipse cx="56" cy="122" rx="16" ry="10"/><ellipse cx="162" cy="140" rx="26" ry="9"/><ellipse cx="150" cy="134" rx="15" ry="9"/></g>`,
};
SCENES.echiquier={
 S:260,CX:540,CY:1000,
 sq(n){const r=Math.floor((n-1)/8);let c=(n-1)%8;if(r%2)c=7-c;return [c*this.S+this.S/2,(7-r)*this.S+this.S/2];},
 at(nc){const a=Math.floor(nc),b=Math.min(64,a+1),f=nc-a,p=this.sq(Math.max(1,a)),q=this.sq(b);return [lerp(p[0],q[0],f),lerp(p[1],q[1],f)];},
 init(){this.A=rythme();
  O.forEach((o,i)=>{const a=i?this.A[i]:1,t0=i?T[i]:0,tp=i?t0+.9*a:0;
   evObj(i,tp,o.aff?{cs:tp+.05,dur:.6*a,...o.aff}:{});
   if(i){const nb=o.case-O[i-1].case;SONS.push({t:t0,s:'whoosh',d:.9*a/V,fc:900,g:.3});
    for(let j=1;j<=Math.min(nb,16);j++)SONS.push({t:t0+.9*a*eio(j/(Math.min(nb,16)+1)),s:'toc',f:900+30*j,g:.14});
    SONS.push({t:tp+.25*a,s:'plop',big:.1+.7*i/N,g:.55},{t:tp+.3*a,s:'pieces',n:8,pas:.04,g:.12},{t:tp+.6*a,s:'note',k:i,g:.26});}
   else SONS.push({t:.02,s:'plop',big:.05,g:.5},{t:.6,s:'note',k:0,g:.26});});
 },
 frac(t){return (this.nc(t)-1)/63;},
 nc(t){if(RB)return lerp(O[N-1].case,1,RE);const k=etape(t);return k?lerp(O[k-1].case,O[k].case,eio(cl((t-T[k])/(.9*this.A[k])))):1;},
 build(L){const S=this.S;let h=`<div id="xbd" class="clay" style="width:${8*S+40}px;height:${8*S+40}px;border-radius:26px;background:#6e4526"><div style="position:absolute;left:20px;top:20px;width:${8*S}px;height:${8*S}px;background:repeating-conic-gradient(#f0d9a8 0 25%,#9a6a40 0 50%);background-size:${2*S}px ${2*S}px"></div>`;
  for(let n=1;n<=64;n++){const [x,y]=this.sq(n);const r=Math.floor((n-1)/8),c=Math.round((x-S/2)/S),dark=(c+(7-r))%2==0;
   h+=`<div class="ln" style="position:absolute;left:${20+x-S/2+14}px;top:${20+y-S/2+8}px;font-size:42px;color:${dark?'#f0d9a8':'#9a6a40'};opacity:.95">${n}</div>`;}
  h+=`<div id="xhl" style="position:absolute;left:20px;top:20px;width:${S-16}px;height:${S-16}px;border:8px solid #ffe08a;border-radius:18px;box-shadow:0 0 30px #ffe08a"></div></div>`;
  h+=`<div style="left:40px;top:160px;width:1000px;height:320px;border-radius:44px;background:rgba(14,30,24,.62)"></div><div style="left:40px;top:1205px;width:1000px;height:265px;border-radius:44px;background:rgba(14,30,24,.62)"></div>`;
  O.forEach((o,i)=>h+=`<div id="xo${i}" class="clay" style="display:none;width:${o.taille}px;height:${o.taille}px">${svgf('0 0 200 200',XFIG[o.fig])}</div>`);
  h+=legendeDiv('xlg',420);
  L.innerHTML=h;const g=id=>document.getElementById(id);this.bd=g('xbd');this.hl=g('xhl');this.o=O.map((_,i)=>g('xo'+i));g('xlg').textContent=D.legende||'';},
 draw(t,bi){
  const S=this.S,k=etape(t),nc=this.nc(t),[cx0,cy]=this.at(nc),cx=Math.max(400,Math.min(8*S-400,cx0)),ox=this.CX-cx,oy=this.CY-cy;
  this.bd.style.transform=`translate(${ox-20+jit(bi,1,.8)}px,${oy-20+jit(bi,2,.8)}px)`;
  const nr=Math.round(nc),[hx,hy]=this.sq(nr);this.hl.style.transform=`translate(${hx-S/2+8}px,${hy-S/2+8}px)`;this.hl.style.opacity=Math.abs(nc-nr)<.02?1:.35;
  let tg=null;
  O.forEach((o,i)=>{const e=this.o[i],[x,y]=this.sq(o.case),w=o.taille,sx0=lerp(x+ox,this.CX,cl((w-450)/350)),by=y+oy+S*.36;
   let vis=RB?(i==N-1||i==0):i<=k,dy=0,sx=1,sy=1,sc=1,op=1;
   if(RB)sc=i==0?cl((1.6-nc)/.6):1-eio(cl(RP/.3));
   else if(i<k){op=i==k-1?1-cl((t-T[k])/(.45*this.A[k])):0;if(op<=0)vis=false;}
   if(!RB&&i==k){const v=i?t-(T[i]+.9*this.A[i]):t+9;if(i==0)[sx,sy]=ecrase(t);else if(v<0)vis=false;else if(v<.25*this.A[i]){const q=v/(.25*this.A[i]);dy=-(1-q*q)*1500;}else[sx,sy]=ecrase(v-.25*this.A[i]);
    if(v>.35*this.A[i]||i==0)tg=[o.masse,sx0,by-w*(o.haut||1)-86];}
   if(!vis||sc<=.01||sx0+w/2<-50||sx0-w/2>1130||by-w>1950||by<0){e.style.display='none';return;}
   e.style.display='block';e.style.opacity=op;e.style.transformOrigin='50% 100%';
   e.style.transform=`translate(${sx0-w/2+jit(bi,i*7+1,1.2)}px,${by-w+dy+jit(bi,i*7+2,1.2)}px) rotate(${jit(bi,i*7+3,.6)}deg) scale(${sx*sc},${sy*sc})`;});
  tag(tg&&tg[0]&&!RB?tg[0]:'',tg?tg[1]:0,tg?Math.max(430,tg[2]):0,bi);fleche(0);
 }
};
// ================= scène 14 : carte (la carte se replie puis se déplie à chaque voyage plus long) =================
const MFIG={   // cadre 0 0 200 160, l'animal regarde vers la droite
 gnou:`<path d="M30 70q-22 10-20 40" fill="none" stroke="#4a3a30" stroke-width="7" stroke-linecap="round"/><rect x="40" y="96" width="14" height="58" rx="6" fill="#5a4a3e"/><rect x="108" y="96" width="14" height="58" rx="6" fill="#5a4a3e"/><path d="M30 60q50-26 100-6v52H36q-12-20-6-46z" fill="#7a6656"/><path d="M60 54q30-18 70-2" fill="none" stroke="#3b2f28" stroke-width="10" stroke-linecap="round"/><rect x="58" y="98" width="14" height="56" rx="6" fill="#7a6656"/><rect x="126" y="98" width="14" height="56" rx="6" fill="#7a6656"/><path d="M124 50q20-20 44 2l14 38q-6 10-18 4l-24-20z" fill="#6a5848"/><path d="M146 40q-10-20 6-30M166 44q18-14 10-34" fill="none" stroke="#e9e2d0" stroke-width="7" stroke-linecap="round"/><circle cx="160" cy="58" r="4" fill="${NOIR}"/><path d="M138 66q4 30-10 36" fill="none" stroke="#2b2420" stroke-width="8" stroke-linecap="round"/>`,
 caribou:`<rect x="46" y="96" width="13" height="58" rx="6" fill="#8a6e52"/><rect x="112" y="96" width="13" height="58" rx="6" fill="#8a6e52"/><rect x="34" y="60" width="110" height="48" rx="22" fill="#a8896a"/><rect x="64" y="100" width="13" height="54" rx="6" fill="#a8896a"/><rect x="130" y="100" width="13" height="54" rx="6" fill="#a8896a"/><path d="M120 74q8-22 30-26" fill="none" stroke="#f0e6d6" stroke-width="20" stroke-linecap="round"/><ellipse cx="164" cy="56" rx="24" ry="15" fill="#a8896a"/><circle cx="160" cy="50" r="4" fill="${NOIR}"/><circle cx="186" cy="58" r="5" fill="#3b2f28"/><path d="M152 42q-6-24 8-38M156 22l-16-8M158 12l12-8M166 40q14-18 30-20M184 22l6-14" fill="none" stroke="#e8d7b8" stroke-width="6" stroke-linecap="round"/><path d="M34 70q-12-4-14 10" fill="none" stroke="#f0e6d6" stroke-width="10" stroke-linecap="round"/>`,
 saumon:`<path d="M30 80l-26-26v52z" fill="#e0745c"/><path d="M30 80q40-44 110-34q44 8 56 34q-12 26-56 34q-70 10-110-34z" fill="#f08a6c"/><path d="M50 92q60 22 140-12q-20 24-56 30q-50 8-84-18z" fill="#ffd2bd"/><path d="M90 48l20-24 22 26z" fill="#e0745c"/><circle cx="168" cy="72" r="6" fill="${NOIR}"/><g fill="#c45a44"><circle cx="80" cy="66" r="3"/><circle cx="100" cy="60" r="3"/><circle cx="118" cy="66" r="3"/></g>`,
 monarque:`<path d="M96 80q-56-74-88-40q-10 40 38 48q-40 20-20 52q30 14 70-50z" fill="#ff8a1e"/><path d="M104 80q56-74 88-40q10 40-38 48q40 20 20 52q-30 14-70-50z" fill="#ff8a1e"/><path d="M96 80q-56-74-88-40q-10 40 38 48q-40 20-20 52q30 14 70-50zM104 80q56-74 88-40q10 40-38 48q40 20 20 52q-30 14-70-50z" fill="none" stroke="#22222e" stroke-width="7" stroke-linejoin="round"/><path d="M60 54l20 26M40 88l50-6M140 54l-20 26M160 88l-50-6" stroke="#22222e" stroke-width="5"/><g fill="#fff"><circle cx="22" cy="50" r="4"/><circle cx="178" cy="50" r="4"/><circle cx="36" cy="124" r="3.5"/><circle cx="164" cy="124" r="3.5"/></g><rect x="94" y="52" width="12" height="70" rx="6" fill="#22222e"/><path d="M98 54q-6-20-16-26M102 54q6-20 16-26" fill="none" stroke="#22222e" stroke-width="4" stroke-linecap="round"/>`,
 bosse:`<path d="M24 66l-22-24 2 34-4 26z" fill="#2c3e5c"/><path d="M20 70q50-36 120-30q50 6 58 34q-10 24-60 30q-74 8-118-34z" fill="#3b5378"/><path d="M40 86q60 30 150-8q-14 22-58 28q-52 6-92-20z" fill="#e6ecf2"/><path d="M90 96q-10 40-50 56q30 0 66-46z" fill="#3b5378"/><g fill="#5b7398"><circle cx="160" cy="48" r="4"/><circle cx="176" cy="54" r="4"/><circle cx="168" cy="42" r="3"/></g><circle cx="170" cy="70" r="5" fill="#10151c"/>`,
 hirondelle:`<path d="M36 84l-34-22 10 24-12 16z" fill="#1f2a5a"/><path d="M40 84q40-30 100-28q36 2 46 26q-12 22-48 24q-60 4-98-22z" fill="#2a3a7a"/><path d="M110 92q40 12 76-10q-8 20-34 24q-26 4-42-14z" fill="#f4ead6"/><path d="M80 66q20-50 70-58q-20 30-40 60z" fill="#22306a"/><circle cx="170" cy="70" r="16" fill="#2a3a7a"/><path d="M174 84q10 4 14-6" fill="#d8402f"/><path d="M184 66l14 6-14 4z" fill="#22222e"/><circle cx="172" cy="66" r="3.5" fill="#fff"/>`,
 grise:`<path d="M24 70l-22-24 2 34-4 24z" fill="#7d8794"/><path d="M20 72q50-36 120-30q50 6 58 34q-10 24-60 30q-74 8-118-34z" fill="#97a2b0"/><g fill="#c9d0d8"><ellipse cx="70" cy="66" rx="9" ry="5"/><ellipse cx="104" cy="56" rx="7" ry="4"/><ellipse cx="124" cy="78" rx="10" ry="5"/><ellipse cx="150" cy="60" rx="6" ry="4"/><ellipse cx="90" cy="88" rx="7" ry="4"/></g><path d="M100 100q-6 26-30 38q24 2 46-34z" fill="#7d8794"/><circle cx="174" cy="70" r="5" fill="#10151c"/>`,
 luth:`<path d="M60 80q-34 30-56 34q30 10 64-16z" fill="#2f3a44"/><path d="M110 70q20-50 60-62q-10 36-44 70z" fill="#2f3a44"/><path d="M40 84q20-40 80-42q50 0 60 34q-6 26-60 30q-60 4-80-22z" fill="#3e4c58"/><path d="M58 70q50-10 108 2M52 86q60 6 120-2M70 60l-4 40M110 48v62M146 54l6 48" fill="none" stroke="#5f7282" stroke-width="5" stroke-linecap="round"/><circle cx="186" cy="70" r="16" fill="#3e4c58"/><circle cx="190" cy="66" r="3.5" fill="#fff"/>`,
 sterne:`<path d="M44 86l-40-30 14 30-14 22z" fill="#e9eef3"/><path d="M40 86q40-26 96-24q30 2 40 22q-12 18-44 20q-56 4-92-18z" fill="#f6f9fb"/><path d="M70 72q30-60 90-66q-26 36-56 70z" fill="#c9d3dc"/><circle cx="164" cy="72" r="16" fill="#f6f9fb"/><path d="M148 66q14-20 32-4l-2 6q-14-6-28 6z" fill="#22222e"/><path d="M178 72l22 4-22 6z" fill="#e0453a"/><circle cx="168" cy="70" r="3" fill="${NOIR}"/>`,
};
SCENES.carte={
 MX:60,MY:482,MW:960,MH:700,AX:110,AY:150,R:790,
 th(i){return .6+.16*Math.sin(i*1.7+.4);},
 init(){this.A=rythme();
  O.forEach((o,i)=>{const a=i?this.A[i]:1,t0=i?T[i]:0;
   evObj(i,i?t0+.75*a:0,{cs:i?t0+.8*a:-9,dur:1.0*a,de:i?O[i-1].km:0,...(o.aff||{n:o.km,suf:' KM'})});
   if(i)SONS.push({t:t0,s:'whoosh',d:.35*a/V,fc:1300,g:.3},{t:t0+.4*a,s:'toc',f:380,g:.3},{t:t0+.58*a,s:'toc',f:340,g:.3},{t:t0+.7*a,s:'plop',big:.1+.5*i/N,g:.5},{t:t0+.8*a,s:'compteur',n:16,f:900,pas:a/16,g:.12},{t:t0+1.85*a,s:'note',k:i,g:.26});
   else SONS.push({t:.02,s:'plop',big:.1,g:.5},{t:.6,s:'note',k:0,g:.26});});
 },
 etat(t){   // s : pixels par km ; vis : rectangle visible de la carte (x0,y0,x1,y1) ; p : progression du trajet courant
  const R=this.R,W=this.MW,H=this.MH,AX=this.AX,AY=this.AY,full=[0,0,W,H];
  if(RB)return {k:N-1,s:llog(R/O[N-1].km,R/O[0].km,RE),vis:full,p:1,v:9};
  const k=etape(t);if(!k)return {k,s:R/O[0].km,vis:full,p:1,v:t};
  const a=this.A[k],v=t-T[k],s0=R/O[k-1].km,s1=R/O[k].km,z=eio(cl(v/(.35*a))),s=llog(s0,s1,z),r=s/s0;
  const old=[AX-AX*r,AY-AY*r,AX+(W-AX)*r,AY+(H-AY)*r],hx=eio(cl((v-.35*a)/(.2*a))),hy=eio(cl((v-.55*a)/(.2*a)));
  return {k,s,vis:[old[0]*(1-hx),old[1]*(1-hy),lerp(old[2],W,hx),lerp(old[3],H,hy)],p:eio(cl((v-.8*a)/(1.0*a))),v,a};
 },
 pt(i,u,s){const d=O[i].km,th=this.th(i),L=d*u,w=.06*d*Math.sin(u*Math.PI*3)*Math.sin(u*Math.PI);
  return [this.AX+(L*Math.cos(th)-w*Math.sin(th))*s,this.AY+(L*Math.sin(th)+w*Math.cos(th))*s];},
 build(L){const W=this.MW,H=this.MH;
  let isl='';for(let i=0;i<N;i++)for(let j=0;j<3;j++)isl+=`<ellipse id="ci${i}_${j}" fill="${j%2?'#cfe3a2':'#e8d7a6'}" stroke="#b9a578" stroke-width="3"/>`;
  let tr='';for(let i=0;i<N;i++)tr+=`<path id="ct${i}" fill="none" stroke="#c2412f" stroke-width="7" stroke-linecap="round" stroke-dasharray="2 15"/>`;
  let h=`<div id="cmap" class="clay" style="left:${this.MX}px;top:${this.MY}px;width:${W}px;height:${H}px"><svg width="${W}" height="${H}" style="display:block"><rect width="${W}" height="${H}" rx="22" fill="#a9dcec"/>${isl}${tr}<circle id="cA" r="11" fill="#c2412f"/>
   <g transform="translate(${W-80} ${86})"><circle r="44" fill="#fff6e3" opacity=".85"/><path d="M0 -38l10 38-10 38-10-38z" fill="#c2412f"/><path d="M0 38l10-38h-20z" fill="#3b3550"/><text y="-48" font-family="Fredoka" font-weight="700" font-size="26" text-anchor="middle" fill="#3b3550">N</text></g>
   <g id="csb"><rect id="csr" x="40" y="${H-58}" height="14" rx="7" fill="#3b3550"/><text id="cst" x="40" y="${H-70}" font-family="Fredoka" font-weight="700" font-size="34" fill="#3b3550"></text></g></svg></div>`;
  h+=`<div id="cpl" style="width:4px;height:${H}px;background:rgba(80,60,30,.35)"></div><div id="cph" style="height:4px;width:${W}px;background:rgba(80,60,30,.35)"></div>`;
  O.forEach((o,i)=>h+=`<div id="ca${i}" class="clay" style="display:none;width:250px;height:200px">${svgf('0 0 200 160',MFIG[o.fig])}</div>`);
  h+=legendeDiv('cpr',418);
  L.innerHTML=h;const g=id=>document.getElementById(id);
  Object.assign(this,{map:g('cmap'),A0:g('cA'),pl:g('cpl'),ph:g('cph'),sr:g('csr'),stx:g('cst'),pr:g('cpr'),t:O.map((_,i)=>g('ct'+i)),a:O.map((_,i)=>g('ca'+i)),is:O.map((_,i)=>[0,1,2].map(j=>g(`ci${i}_${j}`)))});},
 draw(t,bi,ev){
  const {k,s,vis,p,v,a}=this.etat(t),W=this.MW,H=this.MH,MX=this.MX,MY=this.MY;
  this.map.style.clipPath=`inset(${vis[1]}px ${W-vis[2]}px ${H-vis[3]}px ${vis[0]}px round 22px)`;
  this.map.style.transform=`translate(${jit(bi,1,.8)}px,${jit(bi,2,.8)}px)`;
  this.A0.setAttribute('cx',this.AX);this.A0.setAttribute('cy',this.AY);
  // îles de décor : chaque voyage a les siennes, à sa propre échelle
  const IS=[[.3,.7,.09],[.85,.18,.08],[.7,1.0,.06]],fade=RB?1-cl(RP/.35):1;
  this.is.forEach((row,i)=>row.forEach((e,j)=>{const d=O[i].km,[fx,fy,fr]=IS[j],r=fr*d*s,show=RB?(i==0?1:fade):(i<=k?1:0);e.style.opacity=show;
   if(show<=.01||r<3||r>1500){e.style.display='none';return;}e.style.display='';e.setAttribute('cx',this.AX+fx*d*s*1.1);e.setAttribute('cy',this.AY+fy*d*s*.75);e.setAttribute('rx',r*1.3);e.setAttribute('ry',r);}));
  // trajets en pointillés
  this.t.forEach((e,i)=>{const cur=i==k&&!RB,u1=cur?(k?p:1):1,on=RB?(i==0?1:fade):(i<=k?1:0);
   if(!on||(cur&&k&&u1<=0)){e.style.display='none';return;}let d='';for(let j=0;j<=48;j++){const [x,y]=this.pt(i,u1*j/48,s);d+=(j?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}
   e.style.display='';e.setAttribute('d',d);e.style.opacity=on;e.setAttribute('stroke-width',i==k?10:6);});
  // animaux : le voyageur du moment en grand, les précédents en petit au bout de leur trajet
  this.a.forEach((e,i)=>{let show=false,x,y,sz=250,op=1,sx=1,sy=1,rot=0,dy=0;
   if(RB){if(i==0||i==N-1){show=true;[x,y]=this.pt(i,1,s);sz=i==0?lerp(110,250,eio(cl((RP-.3)/.6))):250;op=i==0?cl((RP-.25)/.2):fade;}}
   else if(i==k){show=true;[x,y]=this.pt(i,k?p:1,s);
    if(!k)[sx,sy]=ecrase(t);else{const q=cl((v-.55*a)/(.15*a));if(v<.55*a)show=false;else if(v<.7*a)dy=-(1-q*q)*900;else[sx,sy]=ecrase(v-.7*a);
     if(p>0&&p<1){rot=6*Math.sin(t*14);dy+=-10*Math.abs(Math.sin(t*10));}}}
   else if(i==k-1){show=true;[x,y]=this.pt(i,1,s);sz=lerp(250,110,eio(cl(v/(.35*a))));}
   else if(i==k-2){show=true;[x,y]=this.pt(i,1,s);sz=110;op=1-eio(cl(v/(.35*a)));}
   if(!show||op<=.01){e.style.display='none';return;}
   const sxs=MX+x,sys=MY+y;e.style.display='block';e.style.opacity=op;e.style.width=sz+'px';e.style.height=sz*.8+'px';e.style.transformOrigin='50% 100%';
   e.style.transform=`translate(${sxs-sz/2+jit(bi,i*7+1,1)}px,${sys-sz*.62+dy+jit(bi,i*7+2,1)}px) rotate(${rot+jit(bi,i*7+3,.6)}deg) scale(${sx},${sy})`;});
  // plis de la carte : l'ancienne carte devient un panneau de la nouvelle
  const r=k&&!RB?(R=>R)(s*O[k-1].km/this.R):0,po=k&&!RB?cl(1-(v-1.2*a)/(.8*a)):0;
  if(r>0&&r<.97&&po>0){const x=this.AX+(W-this.AX)*r,y=this.AY+(H-this.AY)*r;this.pl.style.display=this.ph.style.display='block';this.pl.style.opacity=this.ph.style.opacity=po;
   this.pl.style.transform=`translate(${MX+x-2}px,${MY}px)`;this.ph.style.transform=`translate(${MX}px,${MY+y-2}px)`;
   this.pl.style.clipPath=`inset(${vis[1]}px 0 ${H-vis[3]}px 0)`;this.ph.style.clipPath=`inset(0 ${W-vis[2]}px 0 ${vis[0]}px)`;}else this.pl.style.display=this.ph.style.display='none';
  // échelle
  const nice=[100,200,500,1000,2000,5000,10000,20000,50000];let km=nice[0];for(const n of nice)if(n*s<=300)km=n;
  this.sr.setAttribute('width',Math.max(8,km*s));this.stx.textContent=fr(km)+' km';
  const ix=ev.fin?-1:ev.i;this.pr.textContent=ix>=0?(O[ix].precis||''):(D.finPrecis||'');
  tag('');fleche(0);
 }
};
// ================= scène 15 : imprimante (une imprimante recouvre chaque lieu de feuilles A4, vu du ciel) =================
const lignesFoot=`<rect width="10500" height="6800" fill="#4fa64a"/>${[0,1,2,3,4,5,6,7,8,9].map(j=>j%2?`<rect x="${j*1050}" width="1050" height="6800" fill="#5bb556"/>`:'').join('')}<g fill="none" stroke="#fff" stroke-width="60"><rect x="30" y="30" width="10440" height="6740"/><path d="M5250 30V6770"/><circle cx="5250" cy="3400" r="915"/><rect x="30" y="1384" width="1650" height="4032"/><rect x="8820" y="1384" width="1650" height="4032"/></g>`;
const PLACES={   // vb = cadre ; m = unités par mètre (pour la grille des feuilles) ; clip = forme recouverte
 pingpong:{vb:[274,152.5],m:100,s:`<rect width="274" height="152.5" rx="3" fill="#2f6fb5"/><rect x="2" y="2" width="270" height="148.5" fill="none" stroke="#fff" stroke-width="3"/><path d="M2 76.25H272" stroke="#fff" stroke-width="1.5"/><rect x="135" y="-8" width="4" height="168.5" fill="#3b3550"/>`},
 tennis:{vb:[2377,1097],m:100,s:`<rect width="2377" height="1097" fill="#3b7dd8"/><g fill="none" stroke="#fff" stroke-width="22"><rect x="11" y="11" width="2355" height="1075"/><path d="M11 148H2366M11 949H2366M548 148V949M1829 148V949M548 548.5H1829"/></g><rect x="1178" y="-40" width="22" height="1177" fill="#22222e"/>`},
 basket:{vb:[2800,1500],m:100,s:`<rect width="2800" height="1500" fill="#d99a5c"/>${[1,2,3,4,5,6,7,8,9].map(j=>`<path d="M0 ${j*150}H2800" stroke="#c4874c" stroke-width="10"/>`).join('')}<g fill="none" stroke="#fff" stroke-width="22"><rect x="11" y="11" width="2778" height="1478"/><path d="M1400 11V1489"/><circle cx="1400" cy="750" r="180"/><rect x="11" y="505" width="580" height="490"/><rect x="2209" y="505" width="580" height="490"/><path d="M11 90H300A675 675 0 0 1 300 1410H11M2789 90H2500A675 675 0 0 0 2500 1410H2789"/></g>`},
 piscine:{vb:[5000,2500],m:100,s:`<rect width="5000" height="2500" fill="#3fa9e0"/>${[1,2,3,4,5,6,7,8,9].map(j=>`<path d="M0 ${j*250}H5000" stroke="${j%2?'#e0453a':'#fff6e3'}" stroke-width="40" stroke-dasharray="120 80"/>`).join('')}${[0,1,2,3,4,5,6,7,8,9].map(j=>`<path d="M300 ${j*250+125}H4700" stroke="#1d3f72" stroke-width="30"/>`).join('')}`},
 foot:{vb:[10500,6800],m:100,s:lignesFoot},
 monaco:{vb:[1000,620],clip:'M40 120Q120 40 260 70Q380 40 470 110Q560 60 640 150Q760 160 820 260Q900 330 880 430Q790 470 700 420Q620 500 520 470Q420 560 300 510Q160 540 90 440Q10 330 40 120Z',
  s:`<rect width="1000" height="620" rx="30" fill="#3fa9e0"/><path d="M40 120Q120 40 260 70Q380 40 470 110Q560 60 640 150Q760 160 820 260Q900 330 880 430Q790 470 700 420Q620 500 520 470Q420 560 300 510Q160 540 90 440Q10 330 40 120Z" fill="#e8d7a6" stroke="#b9a578" stroke-width="10"/>${[[160,160],[250,240],[380,170],[330,330],[470,260],[560,330],[200,380],[420,420],[650,280],[740,350]].map(([x,y],j)=>`<rect x="${x}" y="${y}" width="${50+j%3*14}" height="${40+j%2*16}" rx="6" fill="${['#f2b8a0','#fff6e3','#f5d77a'][j%3]}"/>`).join('')}<path d="M700 420q40 60 130 40" fill="none" stroke="#fff6e3" stroke-width="12"/><g fill="#fff">${[[760,520],[820,540],[880,510]].map(([x,y])=>`<path d="M${x} ${y}h40l-8 12h-24z"/>`).join('')}</g>`},
 paris:{vb:[1000,760],clip:'M120 330Q130 160 330 110Q520 50 700 110Q880 170 900 360Q910 560 720 640Q520 720 320 660Q120 600 120 330Z',
  s:`<path d="M120 330Q130 160 330 110Q520 50 700 110Q880 170 900 360Q910 560 720 640Q520 720 320 660Q120 600 120 330Z" fill="#d9cfbd" stroke="#8a8f99" stroke-width="22"/><ellipse cx="150" cy="380" rx="80" ry="130" fill="#6fb35a"/><ellipse cx="870" cy="460" rx="90" ry="80" fill="#6fb35a"/><path d="M880 420Q700 560 560 380Q440 250 300 420Q220 520 130 470" fill="none" stroke="#3fa9e0" stroke-width="34" stroke-linecap="round"/>${[[300,220],[420,180],[560,200],[650,280],[380,520],[520,560],[680,520],[260,330]].map(([x,y],j)=>`<rect x="${x}" y="${y}" width="60" height="44" rx="6" fill="${j%2?'#c9b79a':'#efe6d4'}"/>`).join('')}`},
 france:{vb:[1000,1000],clip:'M520 40L640 90L700 120L860 230L900 300L850 420L840 520L800 600L880 700L900 790L760 850L700 880L640 870L560 900L480 950L430 930L330 900L220 880L250 760L280 620L230 560L160 470L60 420L40 360L200 320L320 290L340 210L440 160L500 110Z M900 840L950 860L940 960L900 950Z',
  s:`<path d="M520 40L640 90L700 120L860 230L900 300L850 420L840 520L800 600L880 700L900 790L760 850L700 880L640 870L560 900L480 950L430 930L330 900L220 880L250 760L280 620L230 560L160 470L60 420L40 360L200 320L320 290L340 210L440 160L500 110Z M900 840L950 860L940 960L900 950Z" fill="#8cc46a" stroke="#4f8a3a" stroke-width="18" stroke-linejoin="round"/><path d="M560 230Q520 330 600 420Q660 520 600 620" fill="none" stroke="#3fa9e0" stroke-width="16" stroke-linecap="round"/><circle cx="520" cy="270" r="18" fill="#e0453a"/>`},
 terre:{vb:[1000,1000],clip:'M500 0A500 500 0 1 1 499.9 0Z',s:svgObj({look:'terre'},77).replace('viewBox="0 0 100 100"','x="0" y="0" width="1000" height="1000" viewBox="0 0 100 100"').replace(/<svg ([^>]*) width="100%" height="100%"/,'<svg $1')},
};
const IMPRIMANTE=`<rect x="10" y="40" width="240" height="100" rx="18" fill="#cfd4dc"/><rect x="10" y="40" width="240" height="26" rx="13" fill="#e9edf3"/><rect x="40" y="20" width="180" height="34" rx="6" fill="#fffdf6"/><rect x="50" y="104" width="160" height="14" rx="7" fill="#3b3550"/><circle cx="222" cy="86" r="8" fill="#4fd16a"/><rect x="30" y="80" width="60" height="12" rx="6" fill="#9aa1ad"/>`;
SCENES.imprimante={
 CX:540,CY:745,BW:900,BH:540,PX:540,PY:1120,
 init(){this.A=rythme();
  O.forEach((o,i)=>{const a=i?this.A[i]:1,t0=i?T[i]:0,tp=t0+.42*a;
   evObj(i,i?t0+.3*a:0,{cs:i?tp:-9,dur:1.25*a,...(o.aff||{})});
   if(i){SONS.push({t:t0,s:'whoosh',d:.4*a/V,fc:800,g:.3},{t:t0+.3*a,s:'plop',big:.1+.6*i/N,g:.5},{t:tp,s:'compteur',n:18,f:1000,pas:1.25*a/18,g:.1},{t:tp+1.3*a,s:'note',k:i,g:.26});
    for(let x=0;x<1.25*a;x+=.13)SONS.push({t:tp+x,s:'zip',d:.09,f:500+(Math.round(x*10)%3)*60,g:.12});}
   else SONS.push({t:.02,s:'plop',big:.1,g:.5},{t:.6,s:'note',k:0,g:.26});});
 },
 fitp(i){const [w,h]=PLACES[O[i].fig].vb,s=Math.min(this.BW/w,this.BH/h);return [w*s,h*s];},
 build(L){let h='';
  O.forEach((o,i)=>{const P=PLACES[o.fig],[w,hh]=P.vb,[W,H]=this.fitp(i),px=w/W;   // px = unités du cadre par pixel
   let pat;if(P.m&&.21*P.m/px>=4){const cw=.21*P.m,ch=.297*P.m;pat=`<pattern id="ip${i}" patternUnits="userSpaceOnUse" width="${cw}" height="${ch}"><rect width="${cw}" height="${ch}" fill="#fffdf6" stroke="#bdb39b" stroke-width="${Math.max(cw*.07,px*.9)}"/></pattern>`;}
   else{const c=16*px;pat=`<pattern id="ip${i}" patternUnits="userSpaceOnUse" width="${c}" height="${c*1.41}"><rect width="${c}" height="${c*1.41}" fill="#fffdf6" stroke="#b8ad94" stroke-width="${px*1.6}"/></pattern>`;}
   const clip=P.clip?`<path d="${P.clip}"/>`:`<rect width="${w}" height="${hh}"/>`;
   h+=`<div id="io${i}" class="clay" style="display:none;width:${W}px;height:${H}px"><svg viewBox="0 0 ${w} ${hh}" width="100%" height="100%" style="overflow:visible;display:block"><defs>${pat}<clipPath id="ic${i}">${clip}</clipPath></defs>${P.s}<g clip-path="url(#ic${i})" opacity=".52"><rect id="iv${i}" x="${-w*.1}" y="0" width="${w*1.2}" height="0" fill="url(#ip${i})"/></g></svg></div>`;});
  for(let j=0;j<6;j++)h+=`<div class="ifl clay" style="display:none;width:46px;height:64px;border-radius:4px;background:#fffdf6"></div>`;
  h+=`<div id="ipr" class="clay" style="width:260px;height:150px">${svgf('0 0 260 150',IMPRIMANTE)}</div>`;
  h+=legendeDiv('ilg',418);
  L.innerHTML=h;const g=id=>document.getElementById(id);
  Object.assign(this,{o:O.map((_,i)=>g('io'+i)),v:O.map((_,i)=>g('iv'+i)),fl:[...L.querySelectorAll('.ifl')],pr:g('ipr')});g('ilg').textContent=D.legende||'';},
 cover(i,c){const [w,h]=PLACES[O[i].fig].vb;this.v[i].setAttribute('height',h*c);this.v[i].setAttribute('y',0);},
 draw(t,bi){
  const k=etape(t),CX=this.CX,CY=this.CY;this.o.forEach(e=>e.style.display='none');
  const put=(i,x,y,sx,sy,op=1)=>{const e=this.o[i],[W,H]=this.fitp(i);e.style.display='block';e.style.opacity=op;e.style.transformOrigin='50% 100%';
   e.style.transform=`translate(${x-W/2+jit(bi,i*7+1,1.2)}px,${y-H/2+jit(bi,i*7+2,1.2)}px) rotate(${jit(bi,i*7+3,.4)}deg) scale(${sx},${sy})`;};
  let print=null;   // {c, front y à l'écran, x0, x1}
  if(RB){const q1=eio(cl(RP/.4)),q2=cl((RP-.4)/.38);
   if(q1<1){this.cover(N-1,1);put(N-1,CX-1200*q1,CY,1-.5*q1,1-.5*q1);}
   if(q2>0){this.cover(0,1);put(0,CX,lerp(-600,CY,q2*q2),1,1);}}
  else if(!k){this.cover(0,1);const [sx,sy]=ecrase(t);put(0,CX,CY,sx,sy);}
  else{const a=this.A[k],v=t-T[k],o=eo(cl(v/(.3*a)));
   if(o<1){this.cover(k-1,1);put(k-1,CX-1200*o,CY,1-.5*o,1-.5*o);}
   if(v>=0){const q=cl(v/(.3*a)),c=eio(cl((v-.42*a)/(1.25*a)));let y=CY,sx=1,sy=1;if(v<.3*a)y=lerp(-320,CY,q*q);else[sx,sy]=ecrase(v-.3*a);
    this.cover(k,c);put(k,CX,y,sx,sy);if(c>0&&c<1){const [W,H]=this.fitp(k);print={c,y:CY-H/2+H*c,x0:CX-W/2,x1:CX+W/2,de:T[k]+.42*a};}}}
  // feuilles qui volent de l'imprimante vers le bord de la zone recouverte
  this.fl.forEach((e,j)=>{if(!print){e.style.display='none';return;}const ph=(((t-print.de)*2.2+j/6)%1+1)%1,x2=lerp(print.x0+40,print.x1-40,rnd(j+Math.floor((t-print.de)*2.2+j/6),5)),y2=print.y;
   const x=lerp(this.PX,x2,ph),y=lerp(this.PY-40,y2,ph)-260*Math.sin(Math.PI*ph);e.style.display='block';e.style.opacity=1-Math.pow(ph,4);
   e.style.transform=`translate(${x-23}px,${y-32}px) rotate(${ph*540+j*40}deg) scale(${1-.4*ph})`;});
  const sh=print?(bi%2?3:-3):0;this.pr.style.transform=`translate(${this.PX-130+sh}px,${this.PY-75+jit(bi,401,1)}px)`;
  tag('');fleche(0);
 }
};
// ================= scène 16 : tapis (un tapis roulant apporte à chaque animal ce qu'il mange en un jour) =================
const miroir=s=>`<g transform="translate(240 0) scale(-1 1)">${s}</g>`;
const TFIG={   // cadre 0 0 240 200, posé en bas, l'animal regarde vers la droite ; b = bouche (x, y)
 colibri:{b:[226,86],vole:1,s:`<path d="M60 112l-46 20 30-34z" fill="#2f9f5e"/><ellipse cx="110" cy="104" rx="56" ry="28" fill="#3fb36e"/><ellipse cx="118" cy="116" rx="40" ry="14" fill="#e9f5e4"/><g id="tw1"><path d="M100 92q-30-70 20-80q20 30-4 84z" fill="#9fdcc0"/></g><g id="tw2" style="display:none"><path d="M100 104q-60 20-70 56q40 6 78-50z" fill="#9fdcc0"/></g><circle cx="160" cy="88" r="22" fill="#3fb36e"/><path d="M150 100q12 14 26 4" fill="#e0453a"/><path d="M178 84l50 2-50 6z" fill="#3b3550"/><circle cx="166" cy="82" r="4.5" fill="${NOIR}"/>`},
 souris:{b:[206,150],s:`<g transform="translate(20,48)">${miroir(ANI.souris)}</g>`},
 koala:{b:[200,104],s:`<ellipse cx="110" cy="150" rx="66" ry="50" fill="#9aa2ad"/><ellipse cx="118" cy="160" rx="38" ry="32" fill="#e9e4dc"/><circle cx="150" cy="92" r="46" fill="#a9b1bc"/><circle cx="110" cy="62" r="26" fill="#a9b1bc"/><circle cx="110" cy="62" r="14" fill="#f0e6ea"/><circle cx="192" cy="62" r="26" fill="#a9b1bc"/><circle cx="192" cy="62" r="14" fill="#f0e6ea"/><ellipse cx="176" cy="104" rx="14" ry="20" fill="#3b3550"/><circle cx="140" cy="88" r="5" fill="${NOIR}"/><circle cx="166" cy="84" r="5" fill="${NOIR}"/><ellipse cx="80" cy="190" rx="26" ry="10" fill="#8a929d"/><ellipse cx="146" cy="192" rx="26" ry="10" fill="#8a929d"/>`},
 lion:{b:[214,136],s:`<path d="M30 120q-26 0-24 30" fill="none" stroke="#d99a3c" stroke-width="9" stroke-linecap="round"/><circle cx="8" cy="154" r="9" fill="#8a5a2c"/><rect x="40" y="150" width="20" height="50" rx="8" fill="#c98a34"/><rect x="128" y="150" width="20" height="50" rx="8" fill="#c98a34"/><rect x="30" y="112" width="140" height="56" rx="26" fill="#e0a54a"/><rect x="62" y="152" width="20" height="48" rx="8" fill="#e0a54a"/><rect x="150" y="152" width="20" height="48" rx="8" fill="#e0a54a"/><circle cx="164" cy="80" r="12" fill="#d99a3c"/><circle cx="204" cy="80" r="12" fill="#d99a3c"/><circle cx="184" cy="108" r="40" fill="#e8ad52"/><ellipse cx="196" cy="122" rx="22" ry="16" fill="#f6d9a0"/><circle cx="176" cy="102" r="5" fill="${NOIR}"/><circle cx="200" cy="100" r="5" fill="${NOIR}"/><ellipse cx="208" cy="116" rx="9" ry="6" fill="#6e3d1e"/><path d="M196 128q12 8 22-2" fill="none" stroke="#6e3d1e" stroke-width="4" stroke-linecap="round"/>`},
 girafe:{b:[214,26],s:`<rect x="58" y="138" width="16" height="62" rx="7" fill="#e0a54a"/><rect x="132" y="138" width="16" height="62" rx="7" fill="#e0a54a"/><path d="M40 120q-14 10-12 40" fill="none" stroke="#e0a54a" stroke-width="7" stroke-linecap="round"/><ellipse cx="104" cy="126" rx="66" ry="32" fill="#f2bf5c"/><rect x="80" y="140" width="16" height="60" rx="7" fill="#f2bf5c"/><rect x="152" y="140" width="16" height="60" rx="7" fill="#f2bf5c"/><path d="M150 112L188 26" stroke="#f2bf5c" stroke-width="30" stroke-linecap="round"/><g fill="#b8732c"><ellipse cx="80" cy="120" rx="12" ry="9"/><ellipse cx="110" cy="112" rx="11" ry="8"/><ellipse cx="136" cy="128" rx="10" ry="8"/><ellipse cx="96" cy="138" rx="9" ry="6"/><ellipse cx="166" cy="76" rx="7" ry="9"/><ellipse cx="178" cy="50" rx="6" ry="8"/></g><ellipse cx="200" cy="24" rx="26" ry="15" fill="#f2bf5c"/><path d="M184 12l-4-14M194 10l2-14" stroke="#b8732c" stroke-width="6" stroke-linecap="round"/><circle cx="196" cy="18" r="4" fill="${NOIR}"/>`},
 panda:{b:[198,112],s:`<ellipse cx="104" cy="150" rx="70" ry="50" fill="#fbf8f2"/><path d="M40 150q0-40 40-44h20v94H54q-14-20-14-50z" fill="#22222e"/><ellipse cx="160" cy="186" rx="30" ry="14" fill="#22222e"/><ellipse cx="70" cy="190" rx="30" ry="12" fill="#22222e"/><circle cx="160" cy="92" r="46" fill="#fbf8f2"/><circle cx="128" cy="54" r="16" fill="#22222e"/><circle cx="194" cy="56" r="16" fill="#22222e"/><ellipse cx="146" cy="92" rx="11" ry="15" fill="#22222e" transform="rotate(-20 146 92)"/><ellipse cx="180" cy="92" rx="11" ry="15" fill="#22222e" transform="rotate(20 180 92)"/><circle cx="147" cy="90" r="4" fill="#fff"/><circle cx="179" cy="90" r="4" fill="#fff"/><ellipse cx="164" cy="114" rx="8" ry="6" fill="#22222e"/>`},
 hippo:{b:[230,152],s:`<g transform="translate(10,40)">${miroir(GFIG.hippo.s)}</g>`},
 elephant:{b:[226,150],s:`<g transform="translate(0,60)">${miroir(ANI.elephant)}</g>`},
 baleine:{b:[234,140],s:`<g transform="translate(-30,40) scale(1.3)">${miroir(FIG.baleine())}</g>`},
};
const NOURR={   // cadre 0 0 100 80
 nectar:`<path d="M50 78V40" stroke="#4f9a3a" stroke-width="6"/>${[0,1,2,3,4].map(j=>`<ellipse cx="${50+18*Math.cos(j*1.256)}" cy="${30+18*Math.sin(j*1.256)}" rx="14" ry="10" fill="#ff7fc8" transform="rotate(${j*72} ${50+18*Math.cos(j*1.256)} ${30+18*Math.sin(j*1.256)})"/>`).join('')}<circle cx="50" cy="30" r="10" fill="#ffd23d"/>`,
 graines:`<ellipse cx="34" cy="62" rx="14" ry="10" fill="#d9a35c"/><ellipse cx="60" cy="64" rx="14" ry="10" fill="#c98a4b"/><ellipse cx="48" cy="46" rx="14" ry="10" fill="#e8b874"/>`,
 feuilles:`<path d="M12 64q30-60 80-50q-20 56-80 50z" fill="#7fae7a"/><path d="M14 62q36-26 72-44" stroke="#5a8a56" stroke-width="4" fill="none"/>`,
 viande:`<path d="M10 40q0-30 40-30q40 0 40 30q0 32-40 32q-40 0-40-32z" fill="#d8505a"/><path d="M24 40q4-16 26-16" fill="none" stroke="#f4b6b8" stroke-width="7" stroke-linecap="round"/><circle cx="64" cy="44" r="8" fill="#fff3e6"/>`,
 acacia:`<path d="M6 60L94 26" stroke="#8a5a2c" stroke-width="6" stroke-linecap="round"/>${[0,1,2,3,4].map(j=>`<ellipse cx="${20+j*16}" cy="${50-j*6}" rx="10" ry="6" fill="#5fae4a"/><ellipse cx="${26+j*16}" cy="${64-j*6}" rx="10" ry="6" fill="#4f9a3a"/>`).join('')}`,
 bambou:`<rect x="8" y="34" width="86" height="16" rx="8" fill="#9ccf5a"/><path d="M34 34v16M62 34v16" stroke="#6fa03a" stroke-width="5"/><path d="M80 34q10-22 18-26q-2 18-14 28z" fill="#5fae4a"/>`,
 herbe:`<path d="M20 76q-4-40 6-60M36 76q0-46 14-66M54 76q4-40-4-62M70 76q6-36 22-50M84 76q0-30-10-44" stroke="#5fae4a" stroke-width="9" stroke-linecap="round" fill="none"/>`,
 plantes:`<path d="M10 70q40-10 80-50" stroke="#8a5a2c" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="40" cy="40" r="14" fill="#5fae4a"/><circle cx="62" cy="28" r="14" fill="#4f9a3a"/><circle cx="78" cy="50" r="12" fill="#5fae4a"/><circle cx="30" cy="62" r="9" fill="#e0453a"/>`,
 krill:`${[0,1,2].map(j=>`<g transform="translate(${j*26-4},${(j%2)*14})"><path d="M14 44q10-26 34-20q-6 14-20 24z" fill="#ff8a8a"/><path d="M16 46l-10 8M22 48l-6 10" stroke="#e0606a" stroke-width="3"/><circle cx="40" cy="30" r="3" fill="${NOIR}"/></g>`).join('')}`,
};
SCENES.tapis={
 GY:1160,AX:300,AW:580,BX:540,BY:1086,
 init(){this.A=rythme();
  this.r=Math.max(1,Math.round(3*LT/7))*7/LT;   // bouchées par seconde, réglées pour que la boucle retombe juste (7 morceaux en circulation)
  O.forEach((o,i)=>{const a=i?this.A[i]:1,t0=i?T[i]:0;
   evObj(i,i?t0+.35*a:0,{cs:i?t0+.45*a:-9,dur:1.3*a,...(o.aff||{})});
   if(i)SONS.push({t:t0,s:'whoosh',d:.4*a/V,fc:600,g:.3},{t:t0+.3*a,s:'plop',big:.1+.7*i/N,g:.55},{t:t0+.45*a,s:'compteur',n:16,f:900,pas:1.3*a/16,g:.1},{t:t0+1.8*a,s:'note',k:i,g:.26});
   else SONS.push({t:.6,s:'note',k:0,g:.26});});
  const f0=FT.length?FT[0]:LT;SONS.push({t:f0+.3,s:'plop',big:.1,g:.5});
  for(let x=1/this.r;x<TR;x+=1/this.r)if(this.mange(x))SONS.push({t:x,s:'toc',f:620+(Math.round(x*7)%3)*90,g:.13});
 },
 qui(t){   // animal à table et état des transitions
  if(RB)return {i:0,v:9};
  const f0=FT.length?FT[0]:1e9;if(t>=f0){const v=t-f0;return {i:N-1,v,fin:1};}
  const k=etape(t);return {i:k,v:k?t-T[k]:9};},
 mange(t){const q=this.qui(t);if(q.fin)return q.v>.45;if(!q.i)return 1;return q.v>.45*this.A[q.i];},
 build(L){let h=`<div id="tbt" class="clay" style="left:${this.BX}px;top:${this.BY}px;width:640px;height:46px;border-radius:23px;background:#3b3550"></div>`;
  for(let j=0;j<6;j++)h+=`<div class="clay" style="left:${this.BX+30+j*110}px;top:${this.BY+30}px;width:36px;height:36px;border-radius:50%;background:#8a8f99"></div>`;
  h+=`<div class="clay" style="left:-40px;top:${this.GY}px;width:1160px;height:40px;border-radius:20px;background:#a8744a"></div>`;
  O.forEach((o,i)=>h+=`<div id="ta${i}" class="clay" style="display:none;width:${this.AW}px;height:${this.AW*200/240}px">${svgf('0 0 240 200',TFIG[o.fig].s.replace(/id="tw(\d)"/g,`id="tw$1_${i}"`))}</div>`);
  for(let j=0;j<7;j++)h+=`<div class="tno clay" style="display:none;width:130px;height:104px"></div>`;
  h+=legendeDiv('tlg',418);
  L.innerHTML=h;const g=id=>document.getElementById(id);
  Object.assign(this,{bt:g('tbt'),a:O.map((_,i)=>g('ta'+i)),no:[...L.querySelectorAll('.tno')],w1:O.map((_,i)=>g('tw1_'+i)),w2:O.map((_,i)=>g('tw2_'+i)),cur:-1});g('tlg').textContent=D.legende||'';},
 bouche(i,x,y){const [bx,by]=TFIG[O[i].fig].b,s=this.AW/240;return [x-this.AW/2+bx*s,y-this.AW*200/240+by*s];},
 draw(t,bi){
  const q=this.qui(t),AW=this.AW,AH=AW*200/240,AX=this.AX,GY=this.GY;
  this.a.forEach(e=>e.style.display='none');
  const put=(i,x,y,sx,sy,rot=0)=>{const e=this.a[i];e.style.display='block';e.style.transformOrigin='50% 100%';
   e.style.transform=`translate(${x-AW/2+jit(bi,i*7+1,1.2)}px,${y-AH+jit(bi,i*7+2,1.2)}px) rotate(${rot+jit(bi,i*7+3,.5)}deg) scale(${sx},${sy})`;
   if(this.w1[i]){this.w1[i].style.display=bi%2?'none':'';this.w2[i].style.display=bi%2?'':'none';}};
  const posY=(i,tt)=>TFIG[O[i].fig].vole?GY-70+14*Math.sin(2*Math.PI*Math.round(LT/1.2)*tt/LT):GY;
  let eat=-1;
  if(q.fin||(!RB&&q.i>0)){const n=q.fin?0:q.i,p=q.fin?N-1:q.i-1,a=q.fin?1:this.A[q.i],v=q.v,o=eo(cl(v/(.3*a)));
   if(o<1)put(p,AX-800*o,posY(p,t),1,1);
   if(v>=0){const qq=cl(v/(.3*a));let y=posY(n,t),sx=1,sy=1;if(v<.3*a)y=lerp(-300,y,qq*qq);else if(!TFIG[O[n].fig].vole)[sx,sy]=ecrase(v-.3*a);put(n,AX,y,sx,sy);if(this.mange(t))eat=n;}}
  else{put(0,AX,posY(0,t),1,1);eat=0;}
  // tapis roulant : les rayures défilent, la nourriture avance puis saute dans la bouche
  this.bt.style.background=`repeating-linear-gradient(90deg,#3b3550 0 40px,#4d466a 40px 80px)`;this.bt.style.backgroundPosition=`${-((t*160)%80)}px 0`;
  const fd=eat>=0?O[eat].food:null,r=this.r,nb=this.no.length;
  if(fd&&this.cur!==fd){this.no.forEach(e=>e.innerHTML=svgf('0 0 100 80',NOURR[fd]));this.cur=fd;}
  const [mx,my]=eat>=0?this.bouche(eat,AX,posY(eat,t)):[0,0];
  this.no.forEach((e,j)=>{if(eat<0){e.style.display='none';return;}const ph=((t*r/nb*1+j/nb)%1+1)%1;   // chaque morceau fait le trajet en nb/r secondes
   let x,y,sc=1;if(ph<.82){x=lerp(1120,this.BX+20,ph/.82);y=this.BY-74;}else{const u=(ph-.82)/.18;x=lerp(this.BX+20,mx,u);y=lerp(this.BY-74,my-44,u)-120*Math.sin(Math.PI*u);sc=1-.6*u;}
   e.style.display='block';e.style.transform=`translate(${x-65}px,${y-20}px) rotate(${jit(bi,500+j,2)}deg) scale(${sc})`;});
  tag('');fleche(0);
 }
};
// ================= outils des scènes 17 à 21 =================
const finT=()=>FT.length?FT[0]:1e9;   // instant du premier écran de fin
const sortie=(t,a)=>{const k=etape(t);return {k,a:k?a[k]:1,v:k?t-T[k]:t};};
// ================= scène 17 : linge (chaque patte a sa chaussette, étendue sur un fil à linge) =================
const corpsLong=(n,x0,x1,y,h,col,leg,legc,amp,per,tete)=>{   // corps segmenté + pattes (vue de côté), tête à droite
 let b='',f='',l='';const pts=[];for(let i=0;i<n;i++){const u=n>1?i/(n-1):0,x=lerp(x0,x1,u),yy=y+amp*Math.sin(u*Math.PI*per);pts.push([x,yy]);}
 const rx=Math.max(2.2,(x1-x0)/Math.max(1,n-1)*.62);
 pts.forEach(([x,yy],i)=>{b+=`<path d="M${(x-2).toFixed(1)} ${(yy+h*.5).toFixed(1)}l${(-leg*.35).toFixed(1)} ${(leg).toFixed(1)}" stroke="${mix(legc,'#000000',.25)}" stroke-width="${Math.max(1.6,rx*.32).toFixed(1)}" stroke-linecap="round"/>`;
  f+=`<path d="M${(x+2).toFixed(1)} ${(yy+h*.5).toFixed(1)}l${(leg*.3).toFixed(1)} ${(leg*1.05).toFixed(1)}" stroke="${legc}" stroke-width="${Math.max(1.8,rx*.36).toFixed(1)}" stroke-linecap="round"/>`;
  l+=`<ellipse cx="${x.toFixed(1)}" cy="${yy.toFixed(1)}" rx="${(rx*1.15).toFixed(1)}" ry="${h}" fill="${i%2?col:mix(col,'#000000',.12)}"/>`;});
 const [hx,hy]=pts[n-1];return b+l+f+(tete||'').replace(/HX/g,hx.toFixed(1)).replace(/HY/g,hy.toFixed(1));};
const LINGE_F={   // cadre 0 0 400 200, posé en bas (y = 200), regarde vers la droite
 humain:`<g transform="translate(60,4) scale(1.4)">${ANI.humain}</g>`,
 chien:`<g transform="translate(60,4) scale(1.4)">${ANI.chien}</g>`,
 fourmi:`<g transform="translate(60,-30) scale(2.8)">${ZFIG.fourmi.s}</g>`,
 araignee:`<g stroke="#2b2440" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">${[[195,130,90,62,34,198],[198,132,150,84,140,198],[218,132,252,84,262,198],[222,128,318,62,384,198]].map(p=>`<path d="M${p[0]} ${p[1]}L${p[2]} ${p[3]}L${p[4]} ${p[5]}"/>`).join('')}</g><g stroke="#4a3d6e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none">${[[200,122,120,44,70,198],[202,126,160,70,112,198],[214,126,262,66,300,198],[218,120,296,40,354,198]].map(p=>`<path d="M${p[0]} ${p[1]}L${p[2]} ${p[3]}L${p[4]} ${p[5]}"/>`).join('')}</g><ellipse cx="160" cy="116" rx="62" ry="50" fill="#5d4c8c"/><ellipse cx="146" cy="100" rx="22" ry="12" fill="#7d6cb0"/><circle cx="244" cy="128" r="34" fill="#6b5a9c"/><circle cx="252" cy="118" r="9" fill="#fff"/><circle cx="272" cy="120" r="8" fill="#fff"/><circle cx="254" cy="119" r="4" fill="${NOIR}"/><circle cx="273" cy="121" r="3.6" fill="${NOIR}"/>`,
 crabe:`<g stroke="#c4402c" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none">${[0,1,2,3].map(j=>`<path d="M${150-j*12} ${140+j*4}L${96-j*20} ${150-j*6}L${76-j*16} 198"/><path d="M${250+j*12} ${140+j*4}L${304+j*20} ${150-j*6}L${324+j*16} 198"/>`).join('')}<path d="M160 120L112 74M240 120L288 74"/></g><path d="M86 30q30-26 52 10l-14 14q-10-12-20-6l18 18-20 16q-30-20-16-52z" fill="#e8553c"/><path d="M314 30q-30-26-52 10l14 14q10-12 20-6l-18 18 20 16q30-20 16-52z" fill="#e8553c"/><ellipse cx="200" cy="132" rx="96" ry="50" fill="#e8553c"/><ellipse cx="200" cy="118" rx="70" ry="22" fill="#f27a5e"/><path d="M180 92v-30M220 92v-30" stroke="#c4402c" stroke-width="8" stroke-linecap="round"/><circle cx="180" cy="58" r="11" fill="#fff"/><circle cx="220" cy="58" r="11" fill="#fff"/><circle cx="182" cy="59" r="5" fill="${NOIR}"/><circle cx="222" cy="59" r="5" fill="${NOIR}"/>`,
 scutigere:(()=>{let s='';for(let i=0;i<15;i++){const x=110+i*12,ln=58+i*4.5;s+=`<path d="M${x} 120q${-30-i} ${-60} ${-60-i*1.5} ${78}" stroke="#a88a5c" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M${x} 124q${30+i} ${-46} ${ln*.9} ${74}" stroke="#d9b98a" stroke-width="4" fill="none" stroke-linecap="round"/>`;}
  return s+`<path d="M110 118q-50-40-96-30M110 122q-60 0-100 40" stroke="#d9b98a" stroke-width="3" fill="none"/><rect x="104" y="106" width="196" height="26" rx="13" fill="#c9a26a"/><path d="M118 112v14M140 112v14M162 112v14M184 112v14M206 112v14M228 112v14M250 112v14M272 112v14" stroke="#8a6a40" stroke-width="5"/><path d="M300 112q40-60 90-72M300 120q50-30 96-14" stroke="#d9b98a" stroke-width="3" fill="none"/><circle cx="304" cy="118" r="15" fill="#c9a26a"/><circle cx="310" cy="112" r="4.5" fill="${NOIR}"/>`;})(),
 scolopendre:corpsLong(21,40,330,150,15,'#d9622b',30,'#f2b33d',8,1.6,`<circle cx="HX" cy="HY" r="20" fill="#7a2a1a" transform="translate(22,-2)"/><path d="M372 140q14-24 26-26M372 150q18-10 26 0" stroke="#7a2a1a" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="360" cy="140" r="4" fill="#fff"/>`),
 illacme:corpsLong(70,20,360,168,8,'#f2e3c2',18,'#f6d7a0',6,2.2,`<circle cx="HX" cy="HY" r="12" fill="#e9cfa2" transform="translate(12,0)"/><path d="M380 160q10-14 18-14" stroke="#e9cfa2" stroke-width="4" fill="none" stroke-linecap="round"/>`),
 eumillipes:corpsLong(150,10,380,166,6.5,'#f4e9d6',16,'#f0d6aa',9,3.2,`<circle cx="HX" cy="HY" r="11" fill="#efdcbc" transform="translate(10,0)"/><path d="M394 158q6-12 6-18" stroke="#efdcbc" stroke-width="4" fill="none" stroke-linecap="round"/>`),
};
const CHAUSS=['#e0453a','#2f80da','#ffb11f','#4fb56c','#b06ad9','#ff7fc8'];
const chaussette=(x,c,r)=>`<g transform="translate(${x} 0)"><rect x="30" y="0" width="14" height="26" rx="3" fill="#c98a4b"/><path d="M24 18h28v60q0 8 6 10l14 4q10 4 8 14q-2 10-14 8l-30-6q-14-3-12-18z" fill="${c}"/><rect x="24" y="18" width="28" height="14" rx="4" fill="${r}"/><path d="M24 52h28" stroke="${r}" stroke-width="6"/><path d="M60 92q8 4 6 12" stroke="${mix(c,'#000000',.25)}" stroke-width="5" fill="none"/></g>`;
const tuileChauss=()=>'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 125" width="450" height="125">${[0,1,2,3,4,5].map(j=>chaussette(j*75,CHAUSS[j],'#fff6e3')).join('')}</svg>`);
SCENES.linge={
 X0:70,W:940,Y0:470,H:520,GY:1180,AX:460,AW:740,BX:930,BY:1118,
 init(){this.A=rythme();
  O.forEach((o,i)=>{const a=i?this.A[i]:1,t0=i?T[i]:0,tf=t0+.45*a;
   evObj(i,i?t0+.35*a:0,{cs:i?tf:-9,dur:1.0*a,de:i?O[i-1].pattes:0,...(o.aff||{n:o.pattes,suf:' CHAUSSETTES'})});
   if(i){SONS.push({t:t0,s:'whoosh',d:.4*a/V,fc:700,g:.3},{t:t0+.3*a,s:'plop',big:.1+.5*i/N,g:.5},{t:tf+1.0*a,s:'note',k:i,g:.26});
    const nb=Math.min(14,o.pattes-O[i-1].pattes);for(let j=0;j<nb;j++)SONS.push({t:tf+1.0*a*j/nb,s:'zip',d:.07,f:600+(j%3)*90,g:.12},{t:tf+1.0*a*j/nb+.05,s:'toc',f:1300,g:.12});}
   else SONS.push({t:.02,s:'plop',big:.1,g:.5},{t:.6,s:'note',k:0,g:.26});});
 },
 nb(t){   // nombre de chaussettes étendues
  if(RB)return llog(O[N-1].pattes,O[0].pattes,RE);
  const {k,a,v}=sortie(t,this.A);if(!k)return O[0].pattes;
  const q=cl((v-.45*a)/(1.0*a));return lerp(O[k-1].pattes,O[k].pattes,q);},
 grille(c){const W=this.W,H=this.H;let s=Math.min(150,.9*Math.sqrt(W*H/(.9375*Math.max(1,c))));
  for(let g=0;g<60;g++){const co=Math.floor(W/(.75*s)),ro=Math.floor(H/(1.25*s));if(co*ro>=c)break;s*=.97;}
  return {s,sp:.75*s,rh:1.25*s,co:Math.floor(W/(.75*s))};},
 build(L){let h=`<div class="clay" style="left:-40px;top:${this.GY}px;width:1160px;height:40px;border-radius:20px;background:#7a9a4a"></div>`;
  h+=`<div class="clay" style="left:40px;top:${this.Y0-60}px;width:22px;height:${this.GY-this.Y0+60}px;border-radius:11px;background:#8a5a33"></div><div class="clay" style="left:1018px;top:${this.Y0-60}px;width:22px;height:${this.GY-this.Y0+60}px;border-radius:11px;background:#8a5a33"></div>`;
  for(let r=0;r<30;r++)h+=`<div class="lcd" style="display:none;height:4px;border-radius:2px;background:#fff6e3"></div>`;
  h+=`<div id="lrows" class="clay" style="width:1080px;height:1920px">`;for(let r=0;r<30;r++)h+=`<div class="lrw" style="position:absolute;display:none;background-image:url('${tuileChauss()}');background-repeat:repeat-x"></div>`;h+=`</div>`;
  O.forEach((o,i)=>h+=`<div id="la${i}" class="clay" style="display:none;width:${this.AW}px;height:${this.AW/2}px">${svgf('0 0 400 200',LINGE_F[o.fig])}</div>`);
  h+=`<div class="clay" style="left:${this.BX-80}px;top:${this.BY-30}px;width:160px;height:92px">${svgf('0 0 160 92','<path d="M6 10h148l-14 82H20z" fill="#d9a35c"/><path d="M14 30h132M18 52h124M22 74h116" stroke="#b07a3a" stroke-width="6"/>'+[0,1,2].map(j=>`<g transform="translate(${18+j*40} -26) rotate(${-20+j*20} 30 40) scale(.6)">${chaussette(0,CHAUSS[j+2],'#fff6e3')}</g>`).join(''))}</div>`;
  for(let j=0;j<5;j++)h+=`<div class="lfl clay" style="display:none;width:80px;height:125px">${svgf('0 0 80 125',chaussette(0,CHAUSS[j],'#fff6e3'))}</div>`;
  h+=legendeDiv('llg',418);
  L.innerHTML=h;const g=id=>document.getElementById(id);
  Object.assign(this,{rw:[...L.querySelectorAll('.lrw')],cd:[...L.querySelectorAll('.lcd')],a:O.map((_,i)=>g('la'+i)),fl:[...L.querySelectorAll('.lfl')]});g('llg').textContent=D.legende||'';},
 draw(t,bi){
  const GY=this.GY,AW=this.AW,AX=this.AX;this.a.forEach(e=>e.style.display='none');
  const put=(i,x,y,sx,sy)=>{const e=this.a[i];e.style.display='block';e.style.transformOrigin='50% 100%';
   e.style.transform=`translate(${x-AW/2+jit(bi,i*7+1,1.2)}px,${y-AW/2+jit(bi,i*7+2,1.2)}px) rotate(${jit(bi,i*7+3,.5)}deg) scale(${sx},${sy})`;};
  let fill=false;
  if(RB){const q1=eio(cl(RP/.4)),q2=cl((RP-.4)/.38);if(q1<1)put(N-1,AX-1200*q1,GY,1,1);if(q2>0)put(0,AX,lerp(-300,GY,q2*q2),1,1);}
  else{const {k,a,v}=sortie(t,this.A);
   if(!k){const [sx,sy]=ecrase(t);put(0,AX,GY,sx,sy);}
   else{const o=eo(cl(v/(.3*a)));if(o<1)put(k-1,AX-1200*o,GY,1,1);
    const q=cl(v/(.3*a));let y=GY,sx=1,sy=1;if(v<.3*a)y=lerp(-300,GY,q*q);else[sx,sy]=ecrase(v-.3*a);put(k,AX,y,sx,sy);
    fill=v>.45*a&&v<1.45*a&&t<finT();}}
  // chaussettes : rangées de gauche à droite, de haut en bas ; la grille rétrécit quand il en faut plus
  const c=Math.max(1,Math.round(this.nb(t))),G=this.grille(c),rows=Math.ceil(c/G.co),off=this.X0+(this.W-G.co*G.sp)/2;
  this.rw.forEach((e,r)=>{const k=Math.min(G.co,c-r*G.co);if(r>=rows||k<=0){e.style.display='none';return;}
   const w=rows==1?k*G.sp:k*G.sp,x0=rows==1?this.X0+(this.W-k*G.sp)/2:off;
   e.style.display='block';e.style.width=w+'px';e.style.height=G.rh+'px';e.style.backgroundSize=`${6*G.sp}px ${G.rh}px`;
   e.style.transform=`translate(${x0+jit(bi,200+r,.8)}px,${this.Y0+r*G.rh+jit(bi,240+r,.8)}px)`;});
  this.cd.forEach((e,r)=>{if(r>=rows){e.style.display='none';return;}const th=Math.max(2,G.s*.05);
   e.style.display='block';e.style.width='980px';e.style.height=th+'px';e.style.transform=`translate(50px,${this.Y0+r*G.rh+G.s*.1-th/2}px)`;});
  // chaussettes qui volent du panier vers la prochaine place libre
  const last=c-1,lr=Math.floor(last/G.co),lc=last%G.co,lx0=rows==1?this.X0+(this.W-c*G.sp)/2:off,tx=lx0+(lc+.5)*G.sp,ty=this.Y0+lr*G.rh+G.rh*.4;
  this.fl.forEach((e,j)=>{if(!fill){e.style.display='none';return;}const ph=((t*2.6+j/5)%1+1)%1,x=lerp(this.BX,tx,ph),y=lerp(this.BY-40,ty,ph)-220*Math.sin(Math.PI*ph),sc=lerp(.9,Math.max(.25,G.s/125),ph);
   e.style.display='block';e.style.opacity=1-Math.pow(ph,6);e.style.transform=`translate(${x-40}px,${y-62}px) rotate(${ph*400+j*50}deg) scale(${sc})`;});
  tag('');fleche(0);
 }
};
// ================= scène 18 : thermo (un thermomètre géant qui grimpe, son échelle se resserre à chaque palier) =================
const boule=(o,x,y,r,k)=>svgObj(o,k).replace('width="100%" height="100%"',`x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}"`);
const flocon=(x,y,r,c)=>{let s='';for(let j=0;j<6;j++){const a=j*Math.PI/3,cx=Math.cos(a),sy=Math.sin(a);s+=`<path d="M${x} ${y}l${(r*cx).toFixed(1)} ${(r*sy).toFixed(1)}M${(x+r*.6*cx).toFixed(1)} ${(y+r*.6*sy).toFixed(1)}l${(r*.3*Math.cos(a+.8)).toFixed(1)} ${(r*.3*Math.sin(a+.8)).toFixed(1)}M${(x+r*.6*cx).toFixed(1)} ${(y+r*.6*sy).toFixed(1)}l${(r*.3*Math.cos(a-.8)).toFixed(1)} ${(r*.3*Math.sin(a-.8)).toFixed(1)}"/>`;}
 return `<g stroke="${c}" stroke-width="${Math.max(2,r*.16).toFixed(1)}" stroke-linecap="round" fill="none">${s}</g>`;};
const THERMO_F={   // cadre 0 0 200 200, posé en bas
 vostok:`<path d="M0 200V150q50-24 100-10t100-6V200z" fill="#f4f8fc"/><rect x="34" y="96" width="96" height="56" rx="8" fill="#e0453a"/><rect x="30" y="88" width="104" height="14" rx="7" fill="#fff6e3"/><rect x="48" y="112" width="22" height="18" rx="3" fill="#9fdcff"/><rect x="88" y="116" width="24" height="36" rx="3" fill="#8a2a20"/><path d="M156 150V56" stroke="#8a8f99" stroke-width="6"/><path d="M156 58h36l-9 11 9 11h-36z" fill="#2f80da"/>${flocon(30,40,14,'#ffffff')}${flocon(110,24,10,'#ffffff')}${flocon(180,110,9,'#ffffff')}`,
 congelateur:`<rect x="36" y="14" width="128" height="186" rx="14" fill="#e6edf3"/><rect x="46" y="26" width="108" height="164" rx="8" fill="#9fd8f5"/><rect x="46" y="96" width="108" height="8" fill="#e6edf3"/><rect x="58" y="62" width="30" height="30" rx="6" fill="#dff4ff"/><rect x="96" y="70" width="44" height="22" rx="5" fill="#ff9a8a"/><rect x="60" y="150" width="34" height="36" rx="6" fill="#dff4ff"/><rect x="102" y="140" width="40" height="46" rx="6" fill="#ffe08a"/><path d="M50 30q20 10 40 0t40 2t22-2" stroke="#ffffff" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="164" y="20" width="16" height="176" rx="6" fill="#cfd8e0"/>`,
 glacon:`<ellipse cx="100" cy="190" rx="84" ry="12" fill="#7fc8ef" opacity=".8"/><rect x="40" y="70" width="120" height="118" rx="26" fill="#bfe9ff"/><rect x="40" y="70" width="120" height="118" rx="26" fill="none" stroke="#e8f8ff" stroke-width="6"/><path d="M60 96q10-12 30-12" stroke="#ffffff" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M150 150q10 20 2 34" stroke="#9fdcff" stroke-width="8" fill="none" stroke-linecap="round"/>`,
 corps:`<g transform="translate(-30,18) scale(1.3)">${ANI.humain}</g>`,
 casserole:`<rect x="20" y="170" width="160" height="30" rx="8" fill="#3b3550"/><path d="M60 168h80M70 176h60" stroke="#ff6a2b" stroke-width="6" stroke-linecap="round"/><path d="M34 90h132v62q0 18-18 18H52q-18 0-18-18z" fill="#cfd4dc"/><rect x="28" y="84" width="144" height="12" rx="6" fill="#e9edf3"/><path d="M172 98h22" stroke="#3b3550" stroke-width="10" stroke-linecap="round"/><g fill="#9fdcff"><circle cx="70" cy="88" r="8"/><circle cx="104" cy="84" r="10"/><circle cx="136" cy="88" r="7"/></g><path d="M70 66q-12-16 0-30t0-30M104 66q-12-16 0-30t0-30M138 66q-12-16 0-30" stroke="#ffffff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".85"/>`,
 venus:`<defs><clipPath id="qvc"><circle cx="100" cy="106" r="90"/></clipPath></defs><circle cx="100" cy="106" r="90" fill="#d99a52"/><g clip-path="url(#qvc)" fill="none" stroke-linecap="round"><path d="M0 60q50-24 100 0t100-4" stroke="#f2cf8e" stroke-width="18"/><path d="M0 100q60 30 120-2t90 10" stroke="#efc27a" stroke-width="22"/><path d="M0 146q50-20 100 6t110-6" stroke="#f2cf8e" stroke-width="16"/><path d="M20 180q60-12 160 0" stroke="#c4843f" stroke-width="12"/></g><circle cx="70" cy="70" r="22" fill="#fff" opacity=".18"/>`,
 volcan:`<path d="M4 200L78 70h44l74 130z" fill="#6e4a36"/><path d="M30 200L86 100h12z" fill="#5a3a2a"/><path d="M78 70h44l-6 12q-16 12-32 0z" fill="#ff5a1f"/><path d="M100 78q-6 40-26 70q-12 22-20 52h30q6-40 20-68q12-26 10-54z" fill="#ff7a1f"/><path d="M100 80q-2 30-12 52" stroke="#ffd24a" stroke-width="8" fill="none" stroke-linecap="round"/><g fill="#ff9a3d"><circle cx="86" cy="40" r="9"/><circle cx="116" cy="30" r="7"/><circle cx="100" cy="14" r="6"/></g>`,
 soleil:`${[...Array(12)].map((_,j)=>{const a=j*Math.PI/6;return `<path d="M${(100+70*Math.cos(a-.2)).toFixed(1)} ${(106+70*Math.sin(a-.2)).toFixed(1)}L${(100+98*Math.cos(a)).toFixed(1)} ${(106+98*Math.sin(a)).toFixed(1)}L${(100+70*Math.cos(a+.2)).toFixed(1)} ${(106+70*Math.sin(a+.2)).toFixed(1)}z" fill="#ff9a1e"/>`;}).join('')}${boule({couleur:'#ffc23d'},100,106,76,62)}`,
 eclair:`<g fill="#8a93a6"><circle cx="58" cy="56" r="34"/><circle cx="102" cy="40" r="42"/><circle cx="146" cy="58" r="32"/><rect x="26" y="52" width="150" height="42" rx="21"/></g><path d="M108 88l-34 62h30l-18 50 56-74h-32l22-38z" fill="#ffe14a"/>`,
 coeursoleil:`<circle cx="100" cy="104" r="94" fill="#ff8a1e"/><path d="M100 104L100 10A94 94 0 0 1 194 104z" fill="#ffb11f"/><path d="M100 104L100 44A60 60 0 0 1 160 104z" fill="#ffd24a"/><path d="M100 104L100 74A30 30 0 0 1 130 104z" fill="#fff3c9"/><g fill="#d9661a"><circle cx="58" cy="70" r="10"/><circle cx="70" cy="150" r="13"/><circle cx="138" cy="160" r="9"/></g>`,
 flocon:`${flocon(100,104,88,'#e8f8ff')}<circle cx="100" cy="104" r="14" fill="#e8f8ff"/>`,
};
SCENES.thermo={
 CB:1030,TT:500,XT:150,OX:690,GY:1180,OW:470,
 p(T){const sl=x=>Math.sign(x)*Math.log10(1+Math.abs(x)/10);return sl(T)-sl(-100);},
 init(){this.A=rythme();
  O.forEach((o,i)=>{const a=i?this.A[i]:1,t0=i?T[i]:0,tm=t0+.35*a;
   evObj(i,i?t0+.3*a:0,{cs:i?tm:-9,dur:1.0*a,...(o.aff||{n:o.temp,suf:' °C'})});
   if(i)SONS.push({t:t0,s:'whoosh',d:.4*a/V,fc:700,g:.3},{t:t0+.3*a,s:'plop',big:.15+.5*i/N,g:.5},{t:tm,s:'zip',d:1.0*a/V,f:200+40*i,g:.35},{t:tm,s:'compteur',n:14,f:900,pas:1.0*a/14,g:.12},{t:tm+1.05*a,s:'note',k:i,g:.26});
   else SONS.push({t:.02,s:'plop',big:.1,g:.5},{t:.1,s:'bulles',n:6,g:.15},{t:.6,s:'note',k:0,g:.26});});
  const f=finT();if(f<1e9)SONS.push({t:f+.05,s:'whoosh',d:.9/V,fc:500,g:.35},{t:f+.35,s:'plop',big:.2,g:.45});
 },
 niv(t){   // niveau du liquide (en unités p)
  const P=O.map(o=>this.p(o.temp)),pf=this.p(D.finTemp??-273.15),f=finT();
  if(RB){const st=f<1e9?pf:P[N-1];return lerp(st,P[0],RE);}
  if(t>=f)return lerp(P[N-1],pf,eio(cl((t-f)/1.0)));
  const {k,a,v}=sortie(t,this.A);if(!k)return P[0];return lerp(P[k-1],P[k],eio(cl((v-.35*a)/(1.0*a))));},
 frac(t){return cl((this.niv(t)+.5)/7.7);},
 build(L){const XT=this.XT,TT=this.TT,CB=this.CB;
  let h=`<div class="clay" style="left:-40px;top:${this.GY}px;width:1160px;height:40px;border-radius:20px;background:#6d6a8a"></div>`;
  h+=`<div class="clay" style="left:${XT-62}px;top:${TT-50}px;width:124px;height:${CB-TT+190}px"><div style="position:absolute;left:12px;top:0;width:100px;height:${CB-TT+120}px;border-radius:50px;background:#c9d6e3"></div><div style="position:absolute;left:0;top:${CB-TT+56}px;width:124px;height:124px;border-radius:50%;background:#c9d6e3"></div><div style="position:absolute;left:36px;top:30px;width:52px;height:${CB-TT+40}px;border-radius:26px;background:#eef3f8"></div></div>`;
  h+=`<div id="qbu" class="clay" style="left:${XT-46}px;top:${CB+22}px;width:92px;height:92px;border-radius:50%"></div><div id="qco" class="clay" style="left:${XT-24}px;width:48px;border-radius:24px 24px 0 0"></div>`;
  for(let i=0;i<N;i++)h+=`<div class="qtk" style="display:none;left:${XT+56}px;width:40px;height:9px;border-radius:5px;background:#fff6e3"></div><div class="qtl ln" style="display:none;left:${XT+104}px;font-size:46px;color:#fff6e3;text-shadow:0 3px 0 rgba(0,0,0,.35)"></div>`;
  O.forEach((o,i)=>h+=`<div id="qo${i}" class="clay" style="display:none;width:${this.OW}px;height:${this.OW}px">${svgf('0 0 200 200',THERMO_F[o.fig])}</div>`);
  if(D.finFig)h+=`<div id="qof" class="clay" style="display:none;width:${this.OW}px;height:${this.OW}px">${svgf('0 0 200 200',THERMO_F[D.finFig])}</div>`;
  h+=legendeDiv('qlg',418);
  L.innerHTML=h;const g=id=>document.getElementById(id);
  Object.assign(this,{bu:g('qbu'),co:g('qco'),tk:[...L.querySelectorAll('.qtk')],tl:[...L.querySelectorAll('.qtl')],o:O.map((_,i)=>g('qo'+i)),of:g('qof')});g('qlg').textContent=D.legende||'';},
 couleur(P){const S=[[-.5,'#bfe9ff'],[.6,'#7fd4ff'],[1.04,'#5fb0ff'],[1.7,'#ff9a3d'],[3.1,'#ff3b2f'],[4.5,'#ffd24a'],[7.3,'#ffe680']];
  for(let j=1;j<S.length;j++)if(P<=S[j][0])return mix(S[j-1][1],S[j][1],cl((P-S[j-1][0])/(S[j][0]-S[j-1][0])));return S.at(-1)[1];},
 draw(t,bi){
  const OX=this.OX,GY=this.GY,OW=this.OW,P=this.niv(t),top=Math.max(1.5,P/.8),yp=p=>this.CB-Math.max(0,p)/top*(this.CB-this.TT),f=finT();
  // liquide : tremble un peu, déborde de couleur selon la chaleur
  const col=this.couleur(P),yl=yp(P)+(P>0?2*Math.sin(t*9):0);
  this.co.style.background=col;this.co.style.height=Math.max(0,this.CB+40-yl)+'px';this.co.style.transform=`translate(0,${yl}px)`;
  this.bu.style.background=col;this.bu.style.transform=P<0?`scale(${1-.25*cl(-P/.5)})`:'';
  // graduations : chaque palier atteint laisse un trait ; l'échelle se resserre, les anciens libellés trop proches s'effacent
  const k=RB?-1:t>=f?N-1:etape(t),vis=[];
  for(let i=N-1;i>=0;i--){const ok=RB?i==0&&RP>.5:i<k||(i==k&&P>=this.p(O[i].temp)-.02)||(t>=f&&i<=k);const y=yp(this.p(O[i].temp));
   const tk=this.tk[i],tl=this.tl[i];if(!ok||y<this.TT-6){tk.style.display=tl.style.display='none';continue;}
   tk.style.display='block';tk.style.transform=`translate(0,${y-4.5}px)`;
   const libre=vis.every(v=>Math.abs(v-y)>56);tl.style.display=libre?'block':'none';if(libre){vis.push(y);tl.textContent=O[i].grad;tl.style.transform=`translate(${jit(bi,300+i,1)}px,${y-28+jit(bi,330+i,1)}px)`;}}
  // objets : le précédent file à droite, le nouveau tombe et rebondit
  this.o.forEach(e=>e.style.display='none');if(this.of)this.of.style.display='none';
  const put=(e,x,y,sx,sy,j)=>{e.style.display='block';e.style.transformOrigin='50% 100%';e.style.transform=`translate(${x-OW/2+jit(bi,j*7+1,1.2)}px,${y-OW+jit(bi,j*7+2,1.2)}px) rotate(${jit(bi,j*7+3,.5)}deg) scale(${sx},${sy})`;};
  const chute=(e,v,j)=>{const q=cl(v/.3);let y=GY,sx=1,sy=1;if(v<.3)y=lerp(-500,GY,q*q);else[sx,sy]=ecrase(v-.3);put(e,OX,y,sx,sy,j);};
  if(RB){const q1=eio(cl(RP/.4)),q2=cl((RP-.4)/.38),last=this.of||this.o[N-1];if(q1<1)put(last,OX+900*q1,GY,1,1,40);if(q2>0)put(this.o[0],OX,lerp(-500,GY,q2*q2),1,1,0);}
  else if(t>=f&&this.of){const v=t-f,o=eo(cl(v/.3));if(o<1)put(this.o[N-1],OX+900*o,GY,1,1,N-1);chute(this.of,v,40);}
  else{const {k,a,v}=sortie(t,this.A);if(!k){const [sx,sy]=ecrase(t);put(this.o[0],OX,GY,sx,sy,0);}
   else{const o=eo(cl(v/(.3*a)));if(o<1)put(this.o[k-1],OX+900*o,GY,1,1,k-1);chute(this.o[k],v/a,k);}}
  tag('');fleche(0);
 }
};
// ================= scène 19 : pile (des girafes s'empilent jusqu'au sommet de chaque géant) =================
const GIRAFE_T=`<path d="M70 150v10M50 150v10" stroke="#c98a34" stroke-width="7"/><rect x="28" y="96" width="9" height="62" rx="4" fill="#d99a3c"/><rect x="70" y="96" width="9" height="62" rx="4" fill="#d99a3c"/><ellipse cx="54" cy="96" rx="34" ry="17" fill="#f2bf5c"/><rect x="40" y="100" width="9" height="58" rx="4" fill="#f2bf5c"/><rect x="82" y="100" width="9" height="58" rx="4" fill="#f2bf5c"/><path d="M76 90L96 22" stroke="#f2bf5c" stroke-width="17" stroke-linecap="round"/><g fill="#b8732c"><ellipse cx="44" cy="92" rx="7" ry="5"/><ellipse cx="62" cy="88" rx="6" ry="5"/><ellipse cx="54" cy="102" rx="6" ry="4"/><ellipse cx="88" cy="56" rx="4" ry="6"/><ellipse cx="93" cy="36" rx="3.5" ry="5"/></g><ellipse cx="104" cy="14" rx="15" ry="9" fill="#f2bf5c"/><path d="M96 6l-3-6M102 5l1-6" stroke="#b8732c" stroke-width="4" stroke-linecap="round"/><circle cx="102" cy="11" r="2.6" fill="${NOIR}"/>`;
const tuileGirafe=()=>'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160" width="120" height="160">${GIRAFE_T}</svg>`);
const PILE_F={   // vb : [largeur, hauteur] du dessin, posé en bas ; la largeur suit les proportions réelles
 karri:{vb:[110,200],s:`<path d="M50 200V70h10v130z" fill="#d9c7a8"/><path d="M55 120l-22-30M55 100l20-26M55 150l18-18" stroke="#c9b28c" stroke-width="5" stroke-linecap="round"/><g fill="#5f9e4a"><ellipse cx="34" cy="80" rx="26" ry="20"/><ellipse cx="78" cy="70" rx="28" ry="22"/><ellipse cx="56" cy="40" rx="32" ry="26"/><ellipse cx="40" cy="22" rx="18" ry="14"/><ellipse cx="72" cy="20" rx="20" ry="16"/></g><g fill="#7fb85f"><ellipse cx="50" cy="34" rx="12" ry="8"/><ellipse cx="80" cy="62" rx="10" ry="7"/></g>`},
 liberte:{vb:[70,200],s:`<path d="M8 200l6-56h42l6 56z" fill="#b7a58a"/><rect x="12" y="104" width="46" height="44" rx="3" fill="#cdbb9c"/><rect x="16" y="98" width="38" height="10" rx="2" fill="#b7a58a"/><path d="M24 100q-4-34 4-52h14q8 18 4 52z" fill="#5fb59a"/><path d="M40 50q6-16 10-38" stroke="#5fb59a" stroke-width="7" stroke-linecap="round" fill="none"/><rect x="46" y="6" width="9" height="9" rx="2" fill="#4a9a80"/><path d="M50 6q-7-8 0-16q7 8 0 16z" fill="#ffb11f"/><circle cx="35" cy="40" r="8" fill="#5fb59a"/><path d="M27 34l-5-6M31 31l-2-7M35 30v-7M39 31l2-7M43 34l5-6" stroke="#5fb59a" stroke-width="3" stroke-linecap="round"/><rect x="18" y="60" width="8" height="12" rx="2" fill="#4a9a80"/>`},
 hyperion:{vb:[50,200],s:`<rect x="21" y="40" width="8" height="160" fill="#8a4a2a"/><g fill="#2f6b3a"><path d="M25 0L8 40h34z"/><path d="M25 24L4 74h42z"/><path d="M25 56L2 110h46z"/><path d="M25 90L4 140h42z"/></g><g fill="#3f8a4a"><path d="M25 8L16 30h18z"/><path d="M25 66L14 92h22z"/></g>`},
 kheops:{vb:[334,200],s:`<path d="M0 200L167 0l167 200z" fill="#e2c57f"/><path d="M167 0l167 200H190z" fill="#cfae63"/><g stroke="#c4a058" stroke-width="3">${[40,80,120,160].map(y=>`<path d="M${167-y*.835} ${y}H${167+y*.835}"/>`).join('')}</g>`},
 eiffel:{vb:[96,194],x0:52,y0:6,s:REP.eiffel},
 burj:{vb:[44,200],s:`<path d="M22 0v40" stroke="#9aa8ba" stroke-width="3"/><path d="M18 40h8l3 40h4l3 40h4l2 80H4l2-80h4l3-40h4z" fill="#c9d4e2"/><path d="M22 40v160" stroke="#a9b6c8" stroke-width="3"/><g fill="#7fb6e0" opacity=".6"><rect x="16" y="90" width="12" height="6"/><rect x="12" y="140" width="20" height="6"/><rect x="10" y="176" width="24" height="6"/></g>`},
 everest:{vb:[230,200],s:`<path d="M0 200L60 110l20 16L130 0l42 70 16-12 42 142z" fill="#7a7f8e"/><path d="M130 0l42 70-16-4-14 14-14-22-14 18-12-8z" fill="#ffffff"/><path d="M60 110l20 16-10 4-10-8-10 6z" fill="#ffffff"/><path d="M130 0l42 70 16-12 42 142H140z" fill="#5f6474" opacity=".45"/>`},
};
SCENES.pile={
 G:5.5,GY:1180,LX:650,HMAX:700,WMAX:760,
 init(){this.A=rythme();this.G=D.girafe||5.5;
  this.S=O.map(o=>{if(!o.fig)return 100;const f=PILE_F[o.fig],r=f.vb[0]/f.vb[1];return Math.min(100,this.HMAX/o.h,this.WMAX/(o.h*r));});
  O.forEach((o,i)=>{const a=i?this.A[i]:1,t0=i?T[i]:0,tf=t0+.55*a;
   evObj(i,i?t0+.4*a:0,{cs:i?tf:-9,dur:1.0*a,de:i?O[i-1].n:0,...(o.aff||{n:o.n,suf:' GIRAFES'})});
   if(i){SONS.push({t:t0,s:'whoosh',d:.4*a/V,fc:500,g:.3},{t:t0+.47*a,s:'plop',big:.2+.6*i/N,g:.55},{t:tf+1.05*a,s:'note',k:i,g:.26});
    const nb=Math.min(14,o.n-O[i-1].n);for(let j=0;j<nb;j++)SONS.push({t:tf+1.0*a*(j+1)/(nb+1),s:'plop',big:.05,g:.18});
    SONS.push({t:tf,s:'compteur',n:16,f:850,pas:1.0*a/16,g:.1});}
   else SONS.push({t:.02,s:'plop',big:.2,g:.5},{t:.6,s:'note',k:0,g:.26});});
 },
 etat(t){   // s : pixels par mètre ; c : girafes empilées ; ax : position de la pile ; la/lo : repère courant / précédent et leur visibilité
  if(RB)return {s:llog(this.S[N-1],this.S[0],RE),c:llog(O[N-1].n,1,RE),ax:lerp(210,540,eio(cl((RP-.3)/.5))),cur:N-1,cv:1-eio(cl(RP/.35)),dy:0,prev:-1,pv:0};
  const {k,a,v}=sortie(t,this.A);if(!k)return {s:this.S[0],c:1,ax:540,cur:0,cv:0,dy:0,prev:-1,pv:0};
  const z=eio(cl(v/(.4*a))),q=cl((v-.3*a)/(.17*a));
  return {s:llog(this.S[k-1],this.S[k],z),c:lerp(O[k-1].n,O[k].n,cl((v-.55*a)/(1.0*a))),ax:k==1?lerp(540,210,z):210,cur:k,cv:v<.3*a?0:1,dy:v<.47*a?-(1-q*q)*1400:0,sq:v-.47*a,prev:k-1,pv:1-cl((v-.2*a)/(.2*a))};},
 build(L){let h=`<div class="clay" style="left:-40px;top:${this.GY}px;width:1160px;height:44px;border-radius:22px;background:#c9a86a"></div>`;
  O.forEach((o,i)=>{if(!o.fig)return;const f=PILE_F[o.fig];h+=`<div id="pl${i}" class="clay" style="display:none">${svgf(`${f.x0||0} ${f.y0||0} ${f.vb[0]} ${f.vb[1]}`,f.s)}</div>`;});
  h+=`<div id="pst" style="filter:url(#f-clay) drop-shadow(0 0 7px #fff3c9) drop-shadow(4px 8px 6px rgba(8,8,40,.5));background-image:url('${tuileGirafe()}');background-repeat:repeat-y;background-position:left bottom"></div><div id="pfa" class="clay" style="display:none;background-image:url('${tuileGirafe()}');background-size:100% 100%"></div>`;
  h+=legendeDiv('plg',418);
  L.innerHTML=h;const g=id=>document.getElementById(id);Object.assign(this,{l:O.map((_,i)=>g('pl'+i)),st:g('pst'),fa:g('pfa'),lg:g('plg')});},
 draw(t,bi,ev){
  const e=this.etat(t),GY=this.GY,gh=this.G*e.s,gw=gh*.75,n=Math.floor(e.c+1e-6),fr=e.c-n;
  // les repères : le précédent rétrécit avec la caméra puis s'efface, le nouveau tombe et s'écrase
  this.l.forEach(x=>{if(x)x.style.display='none';});
  const montre=(i,op,dy,sq)=>{const el=this.l[i];if(!el||op<=.01)return;const f=PILE_F[O[i].fig],H=O[i].h*e.s,W=H*f.vb[0]/f.vb[1];let [sx,sy]=sq!=null&&sq>=0?ecrase(sq):[1,1];
   el.style.display='block';el.style.opacity=op;el.style.width=W+'px';el.style.height=H+'px';el.style.transformOrigin='50% 100%';
   el.style.transform=`translate(${this.LX-W/2+jit(bi,i*7+1,1.2)}px,${GY-H+dy+jit(bi,i*7+2,1.2)}px) rotate(${jit(bi,i*7+3,.4)}deg) scale(${sx},${sy})`;};
  if(e.prev>=0)montre(e.prev,e.pv,0);
  if(e.cur>0)montre(e.cur,e.cv,e.dy,e.sq);
  // la pile de girafes
  let [sx,sy]=!RB&&e.cur==0?ecrase(t):[1,1];
  const st=this.st,w=Math.max(9,gw),hh=Math.max(1,n*gh);st.style.width=w+'px';st.style.height=hh+'px';
  if(gh>=3){st.style.backgroundImage=`url('${tuileGirafe()}')`;st.style.backgroundSize=`${w}px ${gh}px`;st.style.backgroundColor='transparent';st.style.borderRadius='0';}
  else{st.style.backgroundImage='none';st.style.backgroundColor='#f2bf5c';st.style.borderRadius='3px';}
  st.style.transformOrigin='50% 100%';st.style.transform=`translate(${e.ax-w/2+jit(bi,401,1.2)}px,${GY-hh+jit(bi,402,1)}px) scale(${sx},${sy})`;
  // une girafe qui tombe sur le haut de la pile pendant qu'elle grandit
  const fa=this.fa;if(fr>.02&&gh>=8&&!RB){const y=GY-hh-gh-(1-fr)*(1-fr)*gh*3;fa.style.display='block';fa.style.width=gw+'px';fa.style.height=gh+'px';fa.style.transform=`translate(${e.ax-gw/2}px,${y}px)`;}else fa.style.display='none';
  const ix=ev.fin?-1:ev.i;this.lg.textContent=ix>=0?(O[ix].precis||''):(D.finPrecis||'');
  tag('');fleche(0);
 }
};
// ================= scène 20 : coeur (un cœur bat au vrai rythme de chaque animal, le moniteur trace les battements) =================
const COEUR_F={   // vb : cadre du dessin, posé en bas, regarde vers la droite
 baleine:{vb:'0 0 200 130',s:`<g transform="translate(200 4) scale(-1 1)">${FIG.baleine()}</g>`},
 elephant:{vb:'0 0 200 140',s:miroir(ANI.elephant).replace('translate(240 0)','translate(200 0)')},
 humain:{vb:'40 0 130 140',s:ANI.humain},
 chien:{vb:'0 0 200 140',s:miroir(ANI.chien).replace('translate(240 0)','translate(200 0)')},
 chat:{vb:'0 0 200 140',s:`<path d="M30 92q-30-10-20-60" fill="none" stroke="#e08a3c" stroke-width="12" stroke-linecap="round"/><rect x="50" y="104" width="14" height="34" rx="6" fill="#c97a30"/><rect x="118" y="104" width="14" height="34" rx="6" fill="#c97a30"/><ellipse cx="96" cy="96" rx="62" ry="30" fill="#f0a04a"/><rect x="70" y="106" width="14" height="32" rx="6" fill="#f0a04a"/><rect x="134" y="106" width="14" height="32" rx="6" fill="#f0a04a"/><path d="M70 82h10M90 76h10M110 82h10" stroke="#c97a30" stroke-width="6" stroke-linecap="round"/><circle cx="156" cy="64" r="30" fill="#f0a04a"/><path d="M134 46l-2-30 20 16zM176 44l6-28-22 14z" fill="#f0a04a"/><path d="M138 40l0-14 9 9zM172 38l3-14-10 8z" fill="#ffc8b0"/><ellipse cx="148" cy="62" rx="4" ry="6" fill="${NOIR}"/><ellipse cx="168" cy="62" rx="4" ry="6" fill="${NOIR}"/><path d="M154 74l4 4 4-4z" fill="#e0606a"/><path d="M168 76h22M168 80l20 6M144 76h-22M144 80l-20 6" stroke="#fff6e3" stroke-width="2"/>`},
 lapin:{vb:'0 0 200 140',s:`<circle cx="36" cy="100" r="14" fill="#ffffff"/><ellipse cx="88" cy="106" rx="54" ry="32" fill="#d8cfc4"/><ellipse cx="62" cy="128" rx="26" ry="10" fill="#c4b9ac"/><ellipse cx="130" cy="132" rx="12" ry="7" fill="#c4b9ac"/><circle cx="146" cy="84" r="28" fill="#e2d9ce"/><ellipse cx="128" cy="34" rx="10" ry="32" fill="#e2d9ce" transform="rotate(-14 128 34)"/><ellipse cx="128" cy="36" rx="5" ry="24" fill="#f4b6c4" transform="rotate(-14 128 36)"/><ellipse cx="150" cy="30" rx="10" ry="32" fill="#d8cfc4" transform="rotate(10 150 30)"/><circle cx="154" cy="80" r="5" fill="${NOIR}"/><circle cx="172" cy="92" r="5" fill="#f08aa0"/>`},
 souris:{vb:'0 30 200 110',s:miroir(ANI.souris).replace('translate(240 0)','translate(200 0)')},
 colibri:{vb:'0 0 240 200',s:TFIG.colibri.s.replace(/id="tw(\d)"/g,'class="ctw$1"')},
 musaraigne:{vb:'0 20 200 120',s:`<path d="M44 118q-30 6-40-10" fill="none" stroke="#8a7a6e" stroke-width="7" stroke-linecap="round"/><ellipse cx="96" cy="108" rx="56" ry="28" fill="#8f8076"/><ellipse cx="98" cy="122" rx="44" ry="10" fill="#b8aca2"/><path d="M140 92q30 4 56 20q-30 8-52 6z" fill="#a39488"/><circle cx="194" cy="112" r="5" fill="#e0909a"/><circle cx="146" cy="96" r="4" fill="${NOIR}"/><circle cx="130" cy="86" r="8" fill="#b8aca2"/><ellipse cx="80" cy="134" rx="10" ry="5" fill="#e0b8b0"/><ellipse cx="124" cy="134" rx="10" ry="5" fill="#e0b8b0"/><path d="M180 108l14-8M180 112l16 0" stroke="#5a4e46" stroke-width="1.5"/>`},
};
const COEUR=`<path d="M100 186C40 140 6 104 6 64C6 32 30 10 58 10C78 10 92 22 100 38C108 22 122 10 142 10C170 10 194 32 194 64C194 104 160 140 100 186Z" fill="#e0303a"/><path d="M40 44q8-18 28-18" stroke="#ff8a8a" stroke-width="12" fill="none" stroke-linecap="round"/><ellipse cx="146" cy="58" rx="14" ry="9" fill="#ff6a6a" opacity=".6"/>`;
SCENES.coeur={
 X0:90,X1:990,Y0:500,MH:220,HX:270,HY:960,HS:320,AX:760,GY:1180,AW:540,AH:380,FW:4,
 init(){this.A=rythme();
  this.P=O.map(o=>60/o.bpm*V);   // intervalle entre deux battements, en temps de scène
  O.forEach((o,i)=>{const a=i?this.A[i]:1,t0=i?T[i]:0;
   evObj(i,i?t0+.35*a:0,{cs:i?t0+.4*a:-9,dur:.9*a,...(o.aff||{n:o.bpm})});
   if(i)SONS.push({t:t0,s:'whoosh',d:.4*a/V,fc:700,g:.3},{t:t0+.3*a,s:'plop',big:.1+.5*i/N,g:.4},{t:t0+1.3*a,s:'note',k:i,g:.22});
   else SONS.push({t:.6,s:'note',k:0,g:.22});});
  for(const b of this.battements(0,TR-.05)){const r=O[b.i].bpm;
   if(r<=160)SONS.push({t:b.t,s:'plop',big:.45,g:.42},{t:b.t+Math.min(.13,this.P[b.i]*.3),s:'plop',big:.3,g:.25});
   else SONS.push({t:b.t,s:'toc',f:520+r*.2,g:r>600?.09:.16});}
 },
 battements(t0,t1){   // instants des battements (temps de scène) entre t0 et t1 ; chaque animal bat depuis son arrivée
  const out=[];for(let i=0;i<N;i++){const a=i?T[i]:0,b=i<N-1?T[i+1]:1e9,P=this.P[i];
   const j0=Math.max(0,Math.ceil((Math.max(a,t0)-a)/P-1e-9));for(let j=j0;;j++){const tb=a+j*P;if(tb>Math.min(b,t1)+1e-9||tb>=b)break;out.push({t:tb,i});}}
  return out;},
 build(L){let h=`<div class="clay" style="left:-40px;top:${this.GY}px;width:1160px;height:40px;border-radius:20px;background:#5a6a8a"></div>`;
  let grid='';for(let x=40;x<960;x+=60)grid+=`<path d="M${x} 0V${this.MH+40}" stroke="#1f4a3a" stroke-width="2"/>`;for(let y=20;y<this.MH+40;y+=50)grid+=`<path d="M0 ${y}H960" stroke="#1f4a3a" stroke-width="2"/>`;
  h+=`<div class="clay" style="left:${this.X0-30}px;top:${this.Y0-20}px;width:960px;height:${this.MH+40}px"><svg width="960" height="${this.MH+40}" style="display:block"><rect width="960" height="${this.MH+40}" rx="26" fill="#10241c"/>${grid}<rect width="960" height="${this.MH+40}" rx="26" fill="none" stroke="#3b3550" stroke-width="14"/></svg></div>`;
  h+=`<svg id="ctr" width="1080" height="1920" style="position:absolute;left:0;top:0"><path id="ctp" fill="none" stroke="#6dff9a" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" style="filter:drop-shadow(0 0 8px #6dff9a)"/><circle id="ctd" r="11" fill="#d8ffe4" style="filter:drop-shadow(0 0 10px #6dff9a)"/></svg>`;
  h+=`<div id="cpr" class="ln" style="left:${this.X0+4}px;top:${this.Y0-6}px;font-size:38px;color:#6dff9a;background:rgba(16,36,28,.92);padding:2px 14px;border-radius:14px"></div>`;
  h+=`<div id="cco" class="clay" style="width:${this.HS}px;height:${this.HS*.95}px;filter:url(#f-clay) drop-shadow(0 0 30px #ff3b3b88) drop-shadow(8px 16px 10px rgba(8,8,40,.5))">${svgf('0 0 200 190',COEUR)}</div>`;
  O.forEach((o,i)=>{const f=COEUR_F[o.fig];h+=`<div id="ca${i}" class="clay" style="display:none;width:${this.AW}px;height:${this.AH}px"><svg viewBox="${f.vb}" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" style="overflow:visible;display:block">${f.s}</svg></div>`;});
  h+=legendeDiv('clg',418);
  L.innerHTML=h;const g=id=>document.getElementById(id);
  Object.assign(this,{tp:g('ctp'),td:g('ctd'),pr:g('cpr'),co:g('cco'),a:O.map((_,i)=>g('ca'+i))});g('clg').textContent=D.legende||'';},
 trace(t){   // chemin du moniteur à l'instant t (fenêtre de 6 s réelles)
  const W=this.FW*V,X0=this.X0,X1=this.X1,yb=this.Y0+this.MH*.62,bs=this.battements(t-W,t),px=(X1-X0)/W;
  let d=`M${X0} ${yb}`;
  bs.forEach((b,j)=>{const x=X1-(t-b.t)*px,sp=this.P[b.i]*px,w=Math.min(36,sp*.85);
   if(x-w*.5<X0)return;d+=`L${(x-w*.5).toFixed(1)} ${yb}L${(x-w*.28).toFixed(1)} ${yb+16}L${(x-w*.08).toFixed(1)} ${yb-118}L${(x+w*.16).toFixed(1)} ${yb+38}L${(x+w*.4).toFixed(1)} ${yb}`;});
  return d+`L${X1} ${yb}`;},
 draw(t,bi,ev){
  const AX=this.AX,GY=this.GY,AW=this.AW,AH=this.AH;
  // moniteur
  let op=1,tt=t;if(RB){if(RP<.45){op=1-RP/.45;}else{tt=0;op=cl((RP-.45)/.4);}}
  this.tp.setAttribute('d',this.trace(tt));this.tp.style.opacity=op;
  const last=this.battements(tt-this.FW*V,tt).pop(),spx=last?this.P[last.i]*(this.X1-this.X0)/(this.FW*V):99;this.tp.setAttribute('stroke-width',Math.max(2.2,Math.min(7,spx*.3)).toFixed(1)),db=last?(tt-last.t)/V:9,yb=this.Y0+this.MH*.62;
  this.td.setAttribute('cx',this.X1);this.td.setAttribute('cy',yb-(db<.05?60:0));this.td.style.opacity=op;
  // cœur : se gonfle à chaque battement ; trop rapide pour l'œil, il vibre
  const P=last?this.P[last.i]/V:9;let pu=Math.exp(-db/.09);if(P<.25)pu=.55+.35*(bi%2);if(RB)pu=lerp(.5,1,RE);
  this.co.style.transformOrigin='50% 55%';this.co.style.transform=`translate(${this.HX-this.HS/2+jit(bi,501,1.2)}px,${this.HY-this.HS*.5+jit(bi,502,1.2)}px) scale(${1+.16*pu})`;
  this.pr.textContent=RB?(O[0].precis||''):ev.fin?(D.finPrecis||''):(O[ev.i].precis||'');this.pr.style.opacity=op;
  // animaux
  this.a.forEach(e=>e.style.display='none');
  const put=(i,x,y,sx,sy)=>{const e=this.a[i];e.style.display='block';e.style.transformOrigin='50% 100%';
   e.style.transform=`translate(${x-AW/2+jit(bi,i*7+1,1.2)}px,${y-AH+jit(bi,i*7+2,1.2)}px) rotate(${jit(bi,i*7+3,.5)}deg) scale(${sx},${sy})`;
   e.querySelectorAll('.ctw1').forEach(w=>w.style.display=bi%2?'none':'');e.querySelectorAll('.ctw2').forEach(w=>w.style.display=bi%2?'':'none');};
  if(RB){const q1=eio(cl(RP/.4)),q2=cl((RP-.4)/.38);if(q1<1)put(N-1,AX+900*q1,GY,1,1);if(q2>0)put(0,AX,lerp(-400,GY,q2*q2),1,1);}
  else{const {k,a,v}=sortie(t,this.A);
   if(!k){const [sx,sy]=ecrase(t);put(0,AX,GY,sx,sy);}
   else{const o=eo(cl(v/(.3*a)));if(o<1)put(k-1,AX+900*o,GY,1,1);const q=cl(v/(.3*a));let y=GY,sx=1,sy=1;if(v<.3*a)y=lerp(-400,GY,q*q);else[sx,sy]=ecrase(v-.3*a);put(k,AX,y,sx,sy);}}
  tag('');fleche(0);
 }
};
// ================= scène 21 : lumiere (un grain de lumière file d'un astre à l'autre, le temps du trajet s'affiche) =================
const astre=(o,k)=>svgObj(o,k);
const LUM_F={   // contenu d'un cadre carré
 lune:()=>astre({look:'lune'},71),terre:()=>astre({look:'terre'},72),neptune:()=>astre({look:'neptune'},73),
 soleil:()=>svgf('0 0 200 200',THERMO_F.soleil),
 proxima:()=>astre({couleur:'#ff6a3d'},74),
 centre:()=>astre({look:'galaxie',couleur:'#ffd27a'},75),
 andromede:()=>astre({look:'galaxie',couleur:'#d99aff'},76),
 voyager:()=>svgf('0 0 200 200',`<path d="M100 110L190 40M100 110l-70 80" stroke="#cfd4dc" stroke-width="6" stroke-linecap="round"/><rect x="84" y="100" width="40" height="34" rx="4" fill="#e3b93e"/><path d="M40 50a62 62 0 0 0 110 40z" fill="#eef1f5"/><path d="M40 50a62 62 0 0 0 110 40" fill="none" stroke="#b9c0cc" stroke-width="6"/><path d="M95 70l30 30" stroke="#8a8f99" stroke-width="5"/><circle cx="125" cy="100" r="7" fill="#8a8f99"/><circle cx="190" cy="40" r="10" fill="#8a8f99"/><circle cx="30" cy="190" r="9" fill="#8a8f99"/>`),
};
SCENES.lumiere={
 TY:840,SX:230,DX:850,FS:330,
 init(){this.A=rythme();
  this.du=O.map((o,i)=>Math.min(1.2,.55+.1*Math.log10(1+o.sec)));   // durée du trajet à l'écran (fraction de a)
  O.forEach((o,i)=>{const a=i?this.A[i]:1,t0=i?T[i]:0,tp=t0+(i?.45*a:0),d=this.du[i]*a;
   evObj(i,i?t0+.4*a:0,{cs:tp,dur:d,...(o.aff||{})});
   if(i)SONS.push({t:t0,s:'whoosh',d:.4*a/V,fc:900,g:.3},{t:t0+.3*a,s:'plop',big:.15,g:.4},{t:t0+.36*a,s:'plop',big:.3,g:.35});
   SONS.push({t:tp,s:'zip',d:d/V,f:500+60*i,g:.4},{t:tp+d,s:'pip',g:.35},{t:tp+d+.05,s:'note',k:i,g:.26});});
 },
 etat(t){if(RB)return {k:-1};const {k,a,v}=sortie(t,this.A),tp=k?.45*a:0,d=this.du[k]*a;return {k,a,v,p:cl((v-tp)/d),arr:v-tp-d};},
 build(L){let h='';for(let j=0;j<40;j++){const r=4+rnd(j,3)*8;h+=`<div class="star lst" style="width:${r}px;height:${r}px"></div>`;}
  h+=`<div id="ltr" style="left:0;top:${this.TY-5}px;width:1080px;height:10px;background:repeating-linear-gradient(90deg,rgba(255,246,227,.55) 0 22px,rgba(0,0,0,0) 22px 44px)"></div>`;
  O.forEach((o,i)=>{if(o.traverse)h+=`<div id="lg${i}" class="clay" style="display:none;width:900px;height:900px;filter:url(#f-clay) drop-shadow(0 0 40px #9fb4ff88)">${astre({look:'galaxie',couleur:'#9fb4ff'},77)}</div>`;
   else h+=`<div id="ls${i}" class="clay" style="display:none;width:${this.FS}px;height:${this.FS}px">${LUM_F[o.de]()}</div><div id="ld${i}" class="clay" style="display:none;width:${this.FS}px;height:${this.FS}px">${LUM_F[o.a]()}</div>`;});
  h+=`<div id="lqu" style="height:34px;border-radius:17px;background:linear-gradient(90deg,rgba(255,240,160,0),rgba(255,240,160,.85))"></div><div id="lph" style="width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 38% 35%,#ffffff,#fff3a0 45%,#ffc23d);filter:url(#f-clay) drop-shadow(0 0 26px #ffe14a) drop-shadow(0 0 60px #ffe14a)"></div><div id="lfl" style="width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(255,250,200,.9),rgba(255,240,160,0) 70%)"></div>`;
  h+=legendeDiv('llg2',418);
  L.innerHTML=h;const g=id=>document.getElementById(id);
  Object.assign(this,{s:O.map((_,i)=>g('ls'+i)),d:O.map((_,i)=>g('ld'+i)),gx:O.map((_,i)=>g('lg'+i)),ph:g('lph'),qu:g('lqu'),fl:g('lfl'),lg:g('llg2'),tr:g('ltr'),st:[...L.querySelectorAll('.lst')]});},
 paire(i,dx,dy,op,sq,bi){   // place l'astre de départ et celui d'arrivée (ou la galaxie à traverser)
  const FS=this.FS,o=O[i],[sx,sy]=sq>=0?ecrase(sq):[1,1];
  if(o.traverse){const e=this.gx[i];e.style.display='block';e.style.opacity=op;e.style.transform=`translate(${90+dx}px,${this.TY-450+dy}px) rotate(${-20+jit(bi,600,.5)}deg) scale(${sx*.95},${sy*.62})`;return;}
  [[this.s[i],this.SX-dx],[this.d[i],this.DX+dx]].forEach(([e,x],j)=>{e.style.display='block';e.style.opacity=op;e.style.transformOrigin='50% 50%';
   e.style.transform=`translate(${x-FS/2+jit(bi,i*7+j,1.2)}px,${this.TY-FS/2+dy+jit(bi,i*7+3+j,1.2)}px) scale(${sx},${sy})`;});},
 draw(t,bi,ev){
  [...this.s,...this.d,...this.gx].forEach(e=>{if(e)e.style.display='none';});
  const e=this.etat(t);let p=0,cur=0,arr=-1;
  if(RB){const q1=eio(cl(RP/.4)),q2=cl((RP-.4)/.38);if(q1<1)this.paire(N-1,900*q1,0,1-q1,-1,bi);if(q2>0)this.paire(0,(1-q2)*(1-q2)*900,0,q2,-1,bi);cur=0;p=0;}
  else{const {k,a,v}=e;cur=k;p=e.p;arr=e.arr;
   if(!k)this.paire(0,0,0,1,t,bi);
   else{const o=eo(cl(v/(.22*a)));if(o<1)this.paire(k-1,700*o,0,1-o,-1,bi);const q=cl(v/(.3*a));this.paire(k,(1-q)*(1-q)*700,0,Math.min(1,.3+q),v>=.3*a?v-.3*a:-1,bi);}}
  // le grain de lumière et sa traînée
  const o=O[cur],x0=o.traverse?110:this.SX+this.FS*.3,x1=o.traverse?970:this.DX-this.FS*.3,x=lerp(x0,x1,eio(p)),y=this.TY,show=RB?RP>.6:(e.k==0||e.v>.3*e.a);
  this.ph.style.display=show?'block':'none';this.ph.style.transform=`translate(${x-32}px,${y-32}px) scale(${1+.08*Math.sin(t*30)})`;
  const ql=p>0&&p<1&&!RB?Math.min(360,x-x0):0;this.qu.style.display=ql>4?'block':'none';this.qu.style.width=ql+'px';this.qu.style.transform=`translate(${x-ql}px,${y-17}px)`;
  const fl=arr>=0&&arr<.5&&!RB?1-arr/.5:0;this.fl.style.display=fl>0?'block':'none';this.fl.style.opacity=fl;this.fl.style.transform=`translate(${x1-100}px,${y-100}px) scale(${1+arr*2})`;
  this.tr.style.opacity=o.traverse&&!RB?0:1;
  // étoiles du fond qui scintillent
  this.st.forEach((s,j)=>{s.style.opacity=.45+.4*Math.sin(t*3+j*1.7)**2;s.style.transform=`translate(${20+rnd(j,1)*1040}px,${460+rnd(j,2)*700}px)`;});
  const ix=ev.fin?-1:ev.i;this.lg.textContent=ix>=0?(O[ix].precis||''):(D.finPrecis||'');
  tag('');fleche(0);
 }
};
