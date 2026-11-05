import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
const root=resolve('dist');
async function htmlFiles(dir){const paths=[];for(const entry of await readdir(dir,{withFileTypes:true})){const path=resolve(dir,entry.name);if(entry.isDirectory())paths.push(...await htmlFiles(path));else if(path.endsWith('.html'))paths.push(path);}return paths;}
test('static pages ship valid JSON-LD, distinct canonicals and reachable local assets',async()=>{
 const files=await htmlFiles(root);assert.equal(files.length,14);
 const canonicals=new Set();
 for(const file of files){const html=await readFile(file,'utf8');assert.equal((html.match(/<h1\b/g)||[]).length,1,file);assert.ok(html.includes('lang="es-VE"'));const canonical=html.match(/rel="canonical" href="([^"]+)"/)[1];if(!file.endsWith('/404.html')){assert.ok(!canonicals.has(canonical));canonicals.add(canonical);}
  for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){const schema=JSON.parse(match[1]);assert.ok(schema['@graph'].length>=3);assert.ok(!match[1].includes('InStock'));}
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){const raw=match[1].split('#')[0].split('?')[0];if(!raw||/^(https?:|mailto:|tel:)/.test(raw))continue;const target=resolve(dirname(file),raw);assert.ok(target.startsWith(root));const info=await stat(target);if(info.isDirectory())assert.ok((await stat(resolve(target,'index.html'))).isFile());}
 }
});
