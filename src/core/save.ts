export interface SaveData {version:1;completed:string[];skills:string[];contracts:string[];checkpoint:{phase:string;x:number}|null;easy:boolean;effects:boolean;language:'pt-BR'|'en'}
const initial=():SaveData=>({version:1,completed:[],skills:[],contracts:[],checkpoint:null,easy:true,effects:true,language:'pt-BR'});
export class Save {
 data=initial();available=true;
 constructor(){try{const raw=localStorage.getItem('construct-portfolio-v1');if(raw){const p=JSON.parse(raw);if(p.version===1&&Array.isArray(p.completed)&&Array.isArray(p.skills)&&Array.isArray(p.contracts)){this.data={...initial(),...p,completed:p.completed.filter((x:unknown)=>typeof x==='string'),skills:p.skills.filter((x:unknown)=>typeof x==='string'),contracts:p.contracts.filter((x:unknown)=>typeof x==='string'),language:p.language==='en'?'en':'pt-BR'};if(!this.data.checkpoint||typeof this.data.checkpoint.phase!=='string'||!Number.isFinite(this.data.checkpoint.x))this.data.checkpoint=null;}}}catch{this.available=false;}}
 write(){try{localStorage.setItem('construct-portfolio-v1',JSON.stringify(this.data));}catch{this.available=false;}}
 add(type:'completed'|'skills'|'contracts',id:string){if(this.data[type].includes(id))return false;this.data[type].push(id);this.write();return true;}
 reset(){this.data=initial();this.write();}
}
