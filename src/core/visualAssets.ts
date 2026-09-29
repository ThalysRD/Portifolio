import { Assets, Rectangle, Texture } from 'pixi.js';
import {createMatrixSprites} from './matrixSprites';
import { assetManifest } from './assetManifest';
import type { CharacterArt } from './gameAssets';
export interface VisualArt{outfits:Record<string,CharacterArt>;environments:Texture[]}
export async function loadVisualArt():Promise<VisualArt>{
 const paths=[assetManifest.outfitsAtlas,assetManifest.matrixIdle,assetManifest.matrixWalk,assetManifest.matrixWalkBetween,assetManifest.matrixGesture,assetManifest.environmentsAtlas,assetManifest.campus];
 const [atlas,matrixIdle,matrixWalk,matrixWalkBetween,matrixGesture,environments,campus]=await Promise.all(paths.map(path=>Assets.load<Texture>(new URL(path,document.baseURI).href)));
 campus.source.scaleMode='nearest';atlas.source.scaleMode='nearest';environments.source.scaleMode='nearest';
 const outfits:Record<string,CharacterArt>={};
 // Hand-aligned frame rectangles preserve the generated poses without rewriting the original PNG.
 const columns=[[24,149,89],[190,356,277],[374,529,450],[540,707,622],[713,888,803],[895,1100,985],[1099,1315,1157],[1320,1447,1380]];
 const rows=[[0,276],[276,550],[550,820],[820,1086]];
 const names=['matrix','hunter','cowboy','casual'];
 for(let row=0;row<4;row++){
  const [y,end]=rows[row];
  const frames=columns.map(([x,right,pivot],col)=>new Texture({source:atlas.source,frame:new Rectangle(x,y,right-x,end-y),orig:new Rectangle(0,0,320,280),trim:new Rectangle(160-(pivot-x),280-(end-y),right-x,end-y)}));
  outfits[names[row]]={loaded:true,displayHeight:155,frames:{idle:[frames[0]],walk:[frames[1],frames[0],frames[3],frames[0]],run:[frames[1],frames[2],frames[3],frames[2]],jump:[frames[4]],fall:[frames[4]],jab:[frames[5]],kick:[frames[6]],knee:[frames[7]],elbow:[frames[5]],block:[frames[7]],dodge:[frames[4]],hurt:[frames[0]],defeat:[frames[0]],digitize_in:[frames[0]],digitize_out:[frames[0]]}};
 }
 outfits.matrix=createMatrixSprites(matrixIdle,matrixWalk,matrixWalkBetween,matrixGesture);
 return {outfits,environments:[...[0,1,2,3].map(i=>new Texture({source:environments.source,frame:new Rectangle(i%2*768,Math.floor(i/2)*512,768,512)})),campus]};
}

