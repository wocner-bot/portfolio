import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {load} from 'cheerio';
const ids=['studio','editorial','gallery','bold'];
const pages=['index.html',...fs.readdirSync('dist/work').map(slug=>`work/${slug}/index.html`)];
const normalize=s=>s.replace(/\s+/g,' ').trim();
const text=($,selector)=>$(selector).toArray().map(el=>normalize($(el).text()));
for(const page of pages){
 const original=load(fs.readFileSync(`dist/${page}`,'utf8'));
 const baseline=load(execFileSync('git',['show',`b7529c1:dist/${page}`],{encoding:'utf8'}));
 assert.equal(original('body').html(),baseline('body').html(),`Original body changed: ${page}`);
 for(const id of ids){
  const $=load(fs.readFileSync(`dist/design/${id}/${page}`,'utf8'));
  for(const selector of ['main h1','main h2','main h3','main p','main li']) assert.deepEqual(text($,selector),text(original,selector),`${id}/${page}: changed ${selector}`);
  assert.deepEqual($('main img').toArray().map(el=>$(el).attr('src')),original('main img').toArray().map(el=>original(el).attr('src')),`${id}/${page}: images changed`);
  assert.equal($(`link[href="/vendor/${id}.css"]`).length,1);
  for(const el of $('a[href]').toArray()){
   const href=$(el).attr('href');if(!href.startsWith('/')||href.startsWith('//'))continue;
   const [pathname,hash]=href.split('#');const file='dist'+(pathname.endsWith('/')?pathname+'index.html':pathname);
   assert.ok(fs.existsSync(file),`Broken internal link: ${href}`);
   if(hash){const target=load(fs.readFileSync(file,'utf8'));assert.ok(target(`[id="${hash}"]`).length,`Missing anchor ${href}`);}
  }
 }
}
for(const file of ['style.css','devices.css','case.css'])assert.equal(fs.readFileSync(`dist/${file}`,'utf8'),execFileSync('git',['show',`b7529c1:dist/${file}`],{encoding:'utf8'}),`Original stylesheet modified: ${file}`);
console.log('PASS: all 32 variant pages retain text, images, valid internal routes, and their own kit. Original markup and styles unchanged.');
