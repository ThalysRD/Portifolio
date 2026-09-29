import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { timelineFallback } from './src/data/timeline.ts';
const root=fileURLToPath(new URL('.',import.meta.url));const assets=[];
function collect(path,relative){for(const f of readdirSync(path,{withFileTypes:true})){if(f.isDirectory())collect(path+'/'+f.name,relative+f.name+'/');else assets.push(relative+f.name);}}
collect(root+'public/assets','assets/');
export default defineConfig(({command})=>({base:'./',define:{__AVAILABLE_ASSETS__:JSON.stringify(assets)},optimizeDeps:{noDiscovery:true,include:[]},resolve:command==='serve'?{alias:{'pixi.js':fileURLToPath(new URL('./.dev/pixi.mjs',import.meta.url))}}:undefined,server:{host:'127.0.0.1',port:5173,strictPort:true},plugins:[{name:'static-timeline',transformIndexHtml(html){return html.replace('<!--portfolio-->',timelineFallback());}}]}));
