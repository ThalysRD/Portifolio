import {Rectangle,Texture} from 'pixi.js';
import type {CharacterArt} from './gameAssets';

// Complete illustrated sprites. Each entry is [x,y,width,height,head centre].
// The crop and head registration are measured on the source sheet; no body part is articulated.
const idleBounds=[
 [93,9,152,306,79],[400,9,152,306,78.5],[707,9,152,306,78.5],[1014,9,153,306,79.5],
 [93,321,152,307,77.5],[399,321,153,307,78],[706,321,153,307,78.5],[1013,321,154,307,79.5],
 [93,635,152,306,78.5],[400,635,152,306,78],[707,635,152,306,78.5],[1014,635,153,306,79.5],
 [93,947,153,306,78],[399,947,154,306,79],[706,947,155,306,79.5],[1014,947,154,306,79]
];
const walkBounds=[
 [42,13,363,425,210],[504,13,296,425,195.5],[978,13,213,426,163.5],[1377,13,358,425,208],
 [42,453,389,423,209.5],[503,454,320,422,194],[971,456,233,420,170.5],[1376,454,359,422,209.5]
];
const walkBetweenBounds=[
 [46,11,344,430,207.5],[502,11,312,428,195],[949,12,337,427,193],[1377,12,358,428,207],
 [59,452,264,425,195],[494,453,324,424,203.5],[948,454,352,423,193],[1382,453,348,424,203]
];
const gestureBounds=[
 [133,6,229,434,122.5],[558,6,231,434,124],[1004,6,232,434,116.5],[1448,6,232,434,115],
 [128,449,233,433,114],[558,449,233,433,123.5],[1004,449,232,433,121],[1450,449,228,433,115.5]
];

function frames(atlas:Texture,bounds:number[][]){
 atlas.source.scaleMode='nearest';
 return bounds.map(([x,y,width,height,head])=>new Texture({
  source:atlas.source,frame:new Rectangle(x,y,width,height),
  orig:new Rectangle(0,0,height,height),trim:new Rectangle(height/2-head,0,width,height)
 }));
}

export function createMatrixSprites(idleAtlas:Texture,walkAtlas:Texture,walkBetweenAtlas:Texture,gestureAtlas:Texture):CharacterArt{
 const idle=frames(idleAtlas,idleBounds),keys=frames(walkAtlas,walkBounds),between=frames(walkBetweenAtlas,walkBetweenBounds),glasses=frames(gestureAtlas,gestureBounds);
 // Hold the forward arm briefly at its turnaround. The generated intermediate at
 // index 4 lifts the foot too early, so it is deliberately excluded from playback.
 const walk=keys.flatMap((key,i)=>[key,i===4?key:between[i]]);
 return {loaded:true,displayHeight:190,walkCycleDistance:128,walkStartFrame:4,idleFps:5,
  idleGesture:{name:'idle_glasses',delay:8,fps:5},
  frames:{idle,idle_glasses:glasses,walk,run:walk,jump:[idle[0]],fall:[idle[0]],jab:[idle[0]],kick:[idle[0]],knee:[idle[0]],elbow:[idle[0]],block:[idle[0]],dodge:[idle[0]],hurt:[idle[0]],defeat:[idle[0]],digitize_in:[idle[0]],digitize_out:[idle[0]]}
 };
}
