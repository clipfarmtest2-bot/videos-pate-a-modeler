// node rendu.mjs videos/<nom>.json            → out/<id>.mp4 + couverture + texte de publication
// node rendu.mjs videos/<nom>.json --apercu 0.5,12,35   → images fixes dans build/ (pas de rendu)
import { createRequire } from 'module';
import { spawn, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fabriqueSon } from './son.mjs';
const dir = path.dirname(new URL(import.meta.url).pathname);
let chromium;
try { ({ chromium } = createRequire(dir + '/')('playwright')); } catch { ({ chromium } = createRequire('/opt/npm-tools/node_modules/')('playwright')); }
const args = process.argv.slice(2), fichier = args.find(a => a.endsWith('.json'));
if (!fichier) { console.error('Usage : node rendu.mjs videos/<nom>.json [--apercu t1,t2]'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(fichier, 'utf8')), id = data.id;
const ap = args.indexOf('--apercu'), apercu = ap >= 0 ? args[ap + 1].split(',').map(Number) : null;
const FPS = 15, SEG = 6, build = `${dir}/build`, out = `${dir}/out`;
fs.mkdirSync(build, { recursive: true }); fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const page = async () => { const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } }); await pg.goto('file://' + dir + '/moteur.html'); const info = await pg.evaluate(d => { const i = init(d); return document.fonts.ready.then(() => i); }, data); await pg.waitForTimeout(300); return [pg, info]; };
const [pg0, info] = await page();
const shot = async (pg, t, file) => { await pg.evaluate(t => draw(t), t); return pg.screenshot({ type: 'jpeg', quality: 95, ...(file ? { path: file } : {}) }); };
if (apercu) { for (const t of apercu) await shot(pg0, t, `${build}/apercu-${id}-${t}.jpg`); await b.close(); console.log('aperçus dans build/ · durée', info.dur, 's'); process.exit(0); }
console.log(`${id} : ${info.dur.toFixed(1)} s, ${info.n} objets`);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const deb = Number(opt('--debut', 0)), finT = Math.min(info.dur, Number(opt('--fin', info.dur))), nom = opt('--sortie', id);   // extrait : --debut s --fin s --sortie nom
const nseg = Math.ceil((finT - deb) / SEG - 1e-9), jobs = Math.min(nseg, Math.max(2, Math.min(6, os.cpus().length - 1)));
let next = 0, fait = 0;
async function worker(pg) {
  while (next < nseg) {
    const s = next++, t0 = deb + s * SEG, t1 = Math.min(finT, t0 + SEG), n = Math.round((t1 - t0) * FPS), tmp = `${build}/seg-${s}.tmp.mp4`;
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-', '-vf', 'fps=30', '-frames:v', String(Math.round((t1 - t0) * 30)),
      '-c:v', 'libx264', '-crf', '17', '-maxrate', '14M', '-bufsize', '28M', '-preset', 'medium', '-pix_fmt', 'yuv420p', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise(r => ff.on('exit', r));
    for (let f = 0; f < n; f++) { const buf = await shot(pg, t0 + f / FPS + 1e-4); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
    ff.stdin.end(); if (await done !== 0) throw new Error('ffmpeg segment ' + s);
    fs.renameSync(tmp, `${build}/seg-${s}.mp4`); process.stdout.write(`\r  images : ${++fait}/${nseg} segments`);
  }
}
const pages = [pg0]; for (let i = 1; i < jobs; i++) pages.push((await page())[0]);
await Promise.all(pages.map(worker)); console.log('');
// couverture : le dernier objet posé
await shot(pg0, info.couv, `${out}/${nom}-couverture.jpg`);
await b.close();
fs.writeFileSync(`${build}/liste.txt`, Array.from({ length: nseg }, (_, s) => `file 'seg-${s}.mp4'`).join('\n'));
fabriqueSon(info, `${build}/son.wav`);
const run = a => { const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...a], { stdio: 'inherit' }); if (r.status !== 0) throw new Error('ffmpeg'); };
run(['-f', 'concat', '-safe', '0', '-i', `${build}/liste.txt`, '-c', 'copy', `${build}/video.mp4`]);
run(['-i', `${build}/video.mp4`, '-ss', String(deb), '-t', String(finT - deb), '-i', `${build}/son.wav`, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '44100', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', `${out}/${nom}.tmp.mp4`]);
fs.renameSync(`${out}/${nom}.tmp.mp4`, `${out}/${nom}.mp4`);
const p = data.publication; if (p) fs.writeFileSync(`${out}/${nom}-publication.txt`, `${p.titre}\n\n${p.description}\n\n${p.hashtags.join(' ')}\n`);
console.log(`Terminé : out/${nom}.mp4`);
