// Bruitages « pâte à modeler » synthétisés (aucun fichier son externe).
import fs from 'fs';
const SR = 44100;
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 * 2 - 1; }; }
function bandpass(x, f0, q) {            // biquad RBJ
  const w = 2 * Math.PI * f0 / SR, al = Math.sin(w) / (2 * q), a0 = 1 + al;
  const b0 = al / a0, b2 = -al / a0, a1 = -2 * Math.cos(w) / a0, a2 = (1 - al) / a0;
  const y = new Float32Array(x.length); let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < x.length; i++) { const v = b0 * x[i] + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v; }
  return y;
}
const gen = (dur, fn) => { const n = Math.round(dur * SR), y = new Float32Array(n); for (let i = 0; i < n; i++) y[i] = fn(i / SR, i); return y; };
const att = (t, a) => Math.min(1, t / a);
const R = rng(7);
// « plop » mou : corps grave qui retombe + bruit mouillé + petit rebond (calé sur l'écrasement visuel)
function plop(f0, big) {
  const dur = 0.5 + 0.5 * big; let ph = 0;
  const body = gen(dur, t => { const f = f0 * (1 + 0.9 * Math.exp(-t * 30)); ph += 2 * Math.PI * f / SR; return Math.sin(ph) * att(t, .004) * Math.exp(-t * (9 - 4 * big)) * (1 + .25 * Math.cos(24 * t)); });
  const wet = bandpass(gen(0.16, t => R() * att(t, .003) * Math.exp(-t * 34)), 500 + 500 * (1 - big), 1.1);
  const wet2 = bandpass(gen(0.1, t => R() * att(t, .004) * Math.exp(-t * 50)), 900, 1.4);
  const y = body; for (let i = 0; i < wet.length; i++) y[i] += wet[i] * 2.2;
  const o = Math.round(0.13 * SR); for (let i = 0; i < wet2.length && o + i < y.length; i++) y[o + i] += wet2[i] * 1.0;
  if (big > .45) { let p2 = 0; for (let i = 0; i < y.length; i++) { const t = i / SR; p2 += 2 * Math.PI * (f0 / 2) / SR; y[i] += Math.sin(p2) * att(t, .01) * Math.exp(-t * 4) * .6 * big; } }
  return y;
}
const toc = f => gen(0.03, t => (Math.sin(2 * Math.PI * f * t) + .4 * Math.sin(2 * Math.PI * f * 2.7 * t) * Math.exp(-t * 200)) * att(t, .0008) * Math.exp(-t * 150));
const kalimba = (f, dur = 1.0) => gen(dur, t => (Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 5.5) + .3 * Math.sin(2 * Math.PI * f * 4 * t) * Math.exp(-t * 16) + .12 * Math.sin(2 * Math.PI * f * 6.3 * t) * Math.exp(-t * 28)) * att(t, .003));
function whoosh(dur, fc) { const n = Math.round(dur * SR); const y = bandpass(gen(dur, () => R()), fc, .7); for (let i = 0; i < n; i++) y[i] *= Math.pow(.5 - .5 * Math.cos(2 * Math.PI * i / n), 1.5); return y; }
const pip = () => gen(0.09, t => Math.sin(2 * Math.PI * (1700 + 2500 * t) * t) * att(t, .002) * Math.exp(-t * 45));

const bulle = f => gen(0.07, t => Math.sin(2 * Math.PI * (f + f * 9 * t) * t) * att(t, .004) * Math.exp(-t * 40));
const piece = f => gen(0.09, t => (Math.sin(2 * Math.PI * f * t) + .6 * Math.sin(2 * Math.PI * f * 1.59 * t) + .35 * Math.sin(2 * Math.PI * f * 2.31 * t)) * att(t, .0006) * Math.exp(-t * 55));
function zip(dur, f0) { let ph = 0; const tone = gen(dur, t => { ph += 2 * Math.PI * f0 * (1 + 1.6 * t / dur) / SR; return Math.sin(ph) * .35 * Math.pow(Math.sin(Math.PI * t / dur), 1.2); }); const w = whoosh(dur, f0 * 3); for (let i = 0; i < w.length; i++) tone[i] += w[i]; return tone; }

export function fabriqueSon(info, fichier) {
  const { dur, sons } = info, out = new Float32Array(Math.round((dur + 1) * SR));
  const add = (s, t, g) => { const o = Math.round(t * SR); for (let i = 0; i < s.length && o + i < out.length; i++) if (o + i >= 0) out[o + i] += s[i] * g; };
  const gamme = [261.63, 293.66, 329.63, 392, 440]; const note = k => gamme[k % 5] * Math.pow(2, Math.min(2, Math.floor(k / 5)));
  for (const e of sons) {
    const g = e.g ?? .3;
    if (e.s == 'plop') add(plop(300 * Math.pow(52 / 300, e.big), e.big), e.t, g);
    else if (e.s == 'whoosh') add(whoosh(e.d, e.fc), e.t, g);
    else if (e.s == 'zip') add(zip(e.d, e.f), e.t, g);
    else if (e.s == 'compteur') for (let j = 0; j < e.n; j++) add(toc(e.f + j * 45), e.t + j * e.pas, g);
    else if (e.s == 'pieces') for (let j = 0; j < e.n; j++) add(piece(2400 + (j % 4) * 180 + j * 25), e.t + j * e.pas, g);
    else if (e.s == 'bulles') for (let j = 0; j < e.n; j++) add(bulle(380 + 500 * Math.abs(R())), e.t + Math.abs(R()) * .9, g);
    else if (e.s == 'note') add(kalimba(note(e.k), e.d || 1.0), e.t, g);
    else if (e.s == 'toc') add(toc(e.f), e.t, g);
    else if (e.s == 'pip') add(pip(), e.t, g);
    else if (e.s == 'accord') [0, 2, 5, 7, 10].forEach((k, i) => add(kalimba(note(k), 1.6), e.t + i * .07, g));
  }
  // petite réverbe (4 peignes)
  const wet = new Float32Array(out.length);
  for (const [ms, fb] of [[29.7, .7], [37.1, .68], [41.1, .66], [43.7, .64]]) { const d = Math.round(ms / 1000 * SR), b = new Float32Array(out.length); for (let i = 0; i < out.length; i++) { b[i] = out[i] + (i >= d ? b[i - d] * fb : 0); wet[i] += b[i] * .25; } }
  let pk = 0; const N = Math.round(dur * SR), mixd = new Float32Array(N);
  for (let i = 0; i < N; i++) { mixd[i] = out[i] + .07 * wet[i]; pk = Math.max(pk, Math.abs(mixd[i])); }
  const buf = Buffer.alloc(44 + N * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) { const fade = Math.min(1, (N - i) / (SR * .05)); const v = Math.round(Math.tanh(mixd[i] / pk * 1.4) * .8 * fade * 32767); buf.writeInt16LE(v, 44 + i * 4); buf.writeInt16LE(v, 46 + i * 4); }
  fs.writeFileSync(fichier, buf);
}
