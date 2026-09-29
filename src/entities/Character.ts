import { AnimatedSprite, Container, Graphics } from 'pixi.js';
import type { CharacterArt } from '../core/gameAssets';
export class Character extends Container {
 sprite:AnimatedSprite;state='';facing=1;effect=new Graphics();private multiplier=1;private elapsed=0;private walkDistance=0;
 constructor(private art:CharacterArt,scale=1){super();this.multiplier=scale;this.addChild(new Graphics().ellipse(0,1,29*scale,6).fill({color:0x030705,alpha:.3}));this.sprite=new AnimatedSprite({textures:art.frames.idle,autoUpdate:false});this.sprite.anchor.set(.5,art.footAnchor??1);this.sprite.onFrameChange=()=>this.fitFrame();this.addChild(this.sprite,this.effect);this.setArt(art);}
 private fitFrame(){const scale=(this.art.displayHeight??64)/this.sprite.texture.orig.height*this.multiplier;this.sprite.anchor.set(.5,this.art.footAnchor??1);this.sprite.scale.set(scale*this.facing,scale);}
 setArt(art:CharacterArt){this.art=art;this.state='';this.walkDistance=0;this.animate('idle');}
 animate(state:string,facing=this.facing){this.facing=facing;this.fitFrame();if(state===this.state)return;this.state=state;this.sprite.textures=this.art.frames[state]??this.art.frames.idle;this.sprite.animationSpeed=state==='run'?.2:.15;
  const start=(state==='walk'||state==='run')?(this.art.walkStartFrame??0):0;
  if(state==='walk'||state==='run')this.walkDistance=start/this.sprite.totalFrames*(this.art.walkCycleDistance??132);
  this.sprite.gotoAndStop(start);
  this.fitFrame();this.effect.clear();this.elapsed=0;
  if(state==='block')this.effect.arc(facing*13,-65,52,-1.1,1.1).stroke({color:0xb9eef0,width:2,alpha:.65});
 }
 // Distance matches planted-foot travel, so feet do not slide. Pauses cannot advance any state.
 travel(distance:number){if(this.state!=='walk'&&this.state!=='run')return;const cycle=this.art.walkCycleDistance??132;this.walkDistance=(this.walkDistance+Math.abs(distance))%cycle;this.sprite.gotoAndStop(Math.floor(this.walkDistance/cycle*this.sprite.totalFrames));this.fitFrame();}
 tick(dt:number,reduced:boolean){
  this.elapsed+=dt;
  if(this.state!=='walk'&&this.state!=='run'){
   let frames=this.art.frames[this.state]??this.art.frames.idle;
   let frame=reduced?0:Math.floor(this.elapsed*(this.art.idleFps??8))%frames.length;
   const gesture=this.art.idleGesture;
   if(this.state==='idle'&&!reduced&&gesture){
    const variant=this.art.frames[gesture.name];
    const phase=this.elapsed%(gesture.delay+variant.length/gesture.fps);
    if(phase>=gesture.delay){frames=variant;frame=Math.min(variant.length-1,Math.floor((phase-gesture.delay)*gesture.fps));}
   }
   if(this.sprite.textures!==frames)this.sprite.textures=frames;
   this.sprite.gotoAndStop(frame);this.fitFrame();
  }
  this.sprite.y=0;this.sprite.rotation=this.state==='dodge'?(this.facing*.12):this.state==='hurt'?(-this.facing*.09):0;
 }
}
