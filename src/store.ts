import {create} from 'zustand';
import {persist,createJSONStorage} from 'zustand/middleware';
import {scenarios,type Mode,type Outcome} from './data';
import {begin,investigate,decide,qualify,result,type Episode,type Result} from './engine';
export type Screen='menu'|'create'|'room'|'episode'|'scenarios'|'handbook'|'report'|'teacher'|'settings'|'achievements'|'about';
export interface Character {name:string;skin:string;hair:string;outfit:string;style:string}
interface Campaign {results:Result[];episode:Episode|null;started:boolean}
const empty=():Campaign=>({results:[],episode:null,started:false});
interface Store {screen:Screen;mode:Mode;character:Character;campaigns:Record<Mode,Campaign>;sound:boolean;motion:boolean;volume:number;storageError:boolean;go:(screen:Screen)=>void;newGame:(c:Character)=>void;continueGame:()=>void;startMode:(mode:Mode)=>void;exitMode:()=>void;launch:(id:number)=>void;investigate:(id:string)=>void;continueDialog:()=>void;risk:()=>void;decide:(outcome:Outcome)=>void;qualify:(choice:number)=>void;next:()=>void;playVideo:()=>void;settings:(values:Partial<Pick<Store,'sound'|'motion'|'volume'>>)=>void}
const patch=(state:Store,episode:Episode)=>({campaigns:{...state.campaigns,[state.mode]:{...state.campaigns[state.mode],episode}}});
export const useGame=create<Store>()(persist((set,get)=>({
 screen:'menu',mode:'story',character:{name:'Саша',skin:'#e6b18d',hair:'#382e2b',outfit:'#648e83',style:'short'},campaigns:{story:empty(),demo:empty(),teacher:empty()},sound:false,motion:true,volume:.25,storageError:false,
 go:screen=>set({screen}),
 newGame:character=>set({character,mode:'story',screen:'room',campaigns:{...get().campaigns,story:{...empty(),started:true}}}),
 continueGame:()=>{const c=get().campaigns.story;set({mode:'story',screen:c.episode?'episode':'room'})},
 startMode:mode=>{set({mode,screen:mode==='teacher'?'teacher':'room',campaigns:{...get().campaigns,[mode]:{...empty(),started:true}}})},
 exitMode:()=>set({mode:'story',screen:'menu'}),
 launch:id=>{const s=scenarios.find(x=>x.id===id);if(!s)return;const st=get();if(id===8&&st.mode==='story'&&st.campaigns.story.results.filter(r=>r.id<=7).length<7)return;set({...patch(st,begin(s)),screen:'episode'})},
 investigate:id=>{const st=get(),ep=st.campaigns[st.mode].episode;if(ep)set(patch(st,investigate(ep,scenarios[ep.id-1],id)))},
 continueDialog:()=>{const st=get(),ep=st.campaigns[st.mode].episode;if(ep&&!ep.continued&&ep.phase==='active')set(patch(st,{...ep,continued:true,history:[...ep.history,{who:'you',text:'Расскажите подробнее.'},{who:'them',text:scenarios[ep.id-1].followup}]}))},
 risk:()=>{const st=get(),ep=st.campaigns[st.mode].episode;if(ep&&ep.phase==='active')set(patch(st,{...ep,risk:true,phase:'critical'}))},
 decide:outcome=>{const st=get(),ep=st.campaigns[st.mode].episode;if(ep)set(patch(st,decide(ep,outcome)))},
 qualify:choice=>{const st=get(),ep=st.campaigns[st.mode].episode;if(!ep||ep.phase!=='law')return;const s=scenarios[ep.id-1],next=qualify(ep,s,choice);if(next.phase!=='debrief')return;const c=st.campaigns[st.mode];set({campaigns:{...st.campaigns,[st.mode]:{...c,episode:next,results:[...c.results.filter(r=>r.id!==ep.id),result(next,s)]}}})},
 next:()=>{const st=get(),c=st.campaigns[st.mode];set({campaigns:{...st.campaigns,[st.mode]:{...c,episode:null}},screen:st.mode==='demo'&&c.results.length>=2?'report':st.mode==='teacher'?'teacher':'room'})},
 playVideo:()=>{const st=get(),ep=st.campaigns[st.mode].episode;if(ep)set(patch(st,{...ep,videoPlayed:true}))},
 settings:values=>set(values)
}),{name:'ne-vedis-v1',version:1,storage:createJSONStorage(()=>({getItem:(key)=>{try{return localStorage.getItem(key)}catch{return null}},setItem:(key,value)=>{try{localStorage.setItem(key,value)}catch{queueMicrotask(()=>useGame.setState({storageError:true}))}},removeItem:(key)=>{try{localStorage.removeItem(key)}catch{/* no persistent storage */}}})),partialize:({storageError,...state})=>state,merge:(saved,current)=>{const s=saved as Partial<Store>;try{if(!s.campaigns||!(['story','demo','teacher'] as const).every(k=>Array.isArray(s.campaigns?.[k]?.results)))return current;if(!s.character||typeof s.character.name!=='string')return current;const screens=['menu','create','room','episode','scenarios','handbook','report','teacher','settings','achievements','about'];return {...current,...s,screen:screens.includes(s.screen??'')?s.screen!:'menu',mode:['story','demo','teacher'].includes(s.mode??'')?s.mode!:'story'};}catch{return current}}}));
