import {scenarios} from './data';
import type {Episode, Evidence, Result} from './engine';
import type {Campaign, Store} from './store';

const object=(v:unknown):v is Record<string,unknown>=>typeof v==='object'&&v!==null&&!Array.isArray(v);
const integer=(v:unknown,min:number,max:number):v is number=>Number.isInteger(v)&&Number(v)>=min&&Number(v)<=max;
const outcome=(v:unknown)=>v==='safe'||v==='recovered'||v==='loss';
function validEvidence(v:unknown):v is Evidence[] {
 return Array.isArray(v)&&v.length<=5&&v.every(e=>object(e)&&typeof e.id==='string'&&typeof e.label==='string'&&['recognition','verification','strategy','law'].includes(String(e.criterion))&&integer(e.points,0,25))&&new Set(v.map(e=>e.id)).size===v.length;
}
function validResult(v:unknown):v is Result {
 if(!object(v)||!integer(v.id,1,scenarios.length))return false;
 const sc=scenarios[v.id-1];
 return outcome(v.outcome)&&integer(v.score,0,100)&&integer(v.errors,0,3)&&integer(v.loss,0,sc.loss)&&integer(v.legalChoice,0,sc.legalOptions.length-1)&&validEvidence(v.evidence);
}
function validEpisode(v:unknown):v is Episode {
 if(!object(v)||!integer(v.id,1,scenarios.length))return false;
 const sc=scenarios[v.id-1];
 if(!Array.isArray(v.seen)||!v.seen.every(id=>sc.investigations.some(a=>a.id===id))||new Set(v.seen).size!==v.seen.length)return false;
 if(!Array.isArray(v.history)||!v.history.every(h=>object(h)&&['them','you','system'].includes(String(h.who))&&typeof h.text==='string'))return false;
 if(typeof v.risk!=='boolean'||typeof v.videoPlayed!=='boolean'||typeof v.continued!=='boolean'||!validEvidence(v.evidence))return false;
 if(!['active','critical','law','debrief'].includes(String(v.phase)))return false;
 if(v.phase==='critical'&&!v.risk)return false;
 if(['law','debrief'].includes(String(v.phase))&&!outcome(v.outcome))return false;
 return v.phase!=='debrief'||integer(v.legalChoice,0,sc.legalOptions.length-1);
}
function validCampaign(v:unknown):v is Campaign {
 if(!object(v)||typeof v.started!=='boolean'||!Array.isArray(v.results)||v.results.length>scenarios.length||!v.results.every(validResult))return false;
 const episode=v.episode,results=v.results;
 if(episode!==null&&!validEpisode(episode))return false;
 return new Set(results.map(x=>x.id)).size===results.length&&(episode===null||episode.phase!=='debrief'||results.some(x=>x.id===episode.id));
}
/** Restore only serializable fields; malformed campaigns cannot replace store actions. */
export function restoreSave(saved:unknown,current:Store):Store {
 if(!object(saved))return current;
 const campaigns={...current.campaigns};
 for(const mode of ['story','demo','teacher'] as const){
  if(object(saved.campaigns)&&validCampaign(saved.campaigns[mode]))campaigns[mode]=saved.campaigns[mode];
 }
 const mode=saved.mode==='demo'||saved.mode==='teacher'?saved.mode:'story';
 const screens=['menu','create','room','episode','scenarios','handbook','report','teacher','settings','achievements','about'];
 const screen=typeof saved.screen==='string'&&screens.includes(saved.screen)?saved.screen as Store['screen']:'menu';
 const c=saved.character;
 const character=object(c)&&typeof c.name==='string'&&c.name.trim().length>0&&c.name.length<=24&&['skin','hair','outfit'].every(k=>typeof c[k]==='string'&&/^#[0-9a-f]{6}$/i.test(c[k] as string))&&(c.style==='short'||c.style==='long')?c as unknown as Store['character']:current.character;
 return {...current,campaigns,mode,character,screen:screen==='episode'&&!campaigns[mode].episode?'menu':screen,
  sound:typeof saved.sound==='boolean'?saved.sound:current.sound,motion:typeof saved.motion==='boolean'?saved.motion:current.motion,
  volume:typeof saved.volume==='number'&&Number.isFinite(saved.volume)?Math.max(0,Math.min(1,saved.volume)):current.volume};
}
