import {beforeEach,describe,expect,it} from 'vitest';
import {scenarios,sources,legalNorms,criteria} from '../src/data';
import {begin,investigate,decide,qualify,result,score,breakdown,resources,competencies} from '../src/engine';
import {useGame} from '../src/store';
import {makeReport} from '../src/integration';
for(const s of scenarios)describe(`Эпизод ${s.id}: ${s.revealed}`,()=>{
 it('три исхода имеют разные последствия и объяснимые баллы',()=>{
  let ep=begin(s);for(const a of s.investigations)ep=investigate(ep,s,a.id);
  const safe=qualify(decide(ep,'safe'),s,s.answer);const recovered=qualify(decide({...ep,risk:true,phase:'critical'},'recovered'),s,s.answer);const loss=qualify(decide({...ep,risk:true,phase:'critical'},'loss'),s,s.answer);
  expect(score(safe.evidence)).toBe(100);expect(score(recovered.evidence)).toBe(90);expect(score(loss.evidence)).toBe(75);
  expect(result(loss,s).loss).toBe(s.loss);expect(result(recovered,s).loss).toBe(0);expect(result(safe,s).outcome).toBe('safe');
 });
 it('не начисляет баллы повторно за исследование и не разрешает его после исхода',()=>{let ep=begin(s);ep=investigate(ep,s,s.investigations[0].id);expect(investigate(ep,s,s.investigations[0].id)).toBe(ep);ep=decide(ep,'safe');expect(investigate(ep,s,s.investigations[1].id)).toBe(ep)});
 it('не приравнивает сохранённые деньги к правовой грамотности',()=>{const ep=qualify(decide(begin(s),'safe'),s,(s.answer+1)%4);expect(result(ep,s).loss).toBe(0);expect(breakdown(ep.evidence).law).toBe(0);expect(score(ep.evidence)).toBe(25)});
 it('первый экран не раскрывает название схемы, а источники и критерии существуют',()=>{expect(s.title).not.toBe(s.revealed);expect(s.investigations.reduce((n,a)=>n+a.points,0)).toBe(50);expect(s.law.every(a=>legalNorms.some(n=>n.article===a))).toBe(true);expect(s.sourceIds.every(id=>sources.some(x=>x.id===id))).toBe(true);expect(s.legalOptions[s.answer]).toBeTruthy();expect(s.recovery.length).toBeGreaterThan(80);expect(s.clues.length).toBeGreaterThanOrEqual(3)});
});
describe('Ресурсы, интеграции и баллы',()=>{
 it('не выдаёт стартовых компетенций и не уходит в отрицательные ресурсы',()=>{expect(competencies([])).toEqual([0,0,0,0,0]);expect(resources([])).toEqual({money:50000,stress:0});const rs=scenarios.map(s=>result(qualify(decide({...begin(s),risk:true},'loss'),s,s.answer),s));expect(resources(rs).money).toBe(0);expect(resources(rs).stress).toBe(100)});
 it('ограничивает категории 25 баллами',()=>{expect(score(Array.from({length:20},(_,j)=>({id:String(j),criterion:'law' as const,points:25,label:'x'})))).toBe(25);expect(Object.keys(criteria)).toHaveLength(4)});
 it('формирует экспорт без настоящих персональных данных',()=>{const report=makeReport('demo',[]);expect(report.schemaVersion).toBe(1);expect(report.mode).toBe('demo');expect(report.notice).toContain('Не психологическая диагностика');expect(JSON.stringify(report)).not.toContain('password')});
});
describe('Сохранения и независимые кампании',()=>{
 beforeEach(()=>{localStorage.clear();useGame.setState({screen:'menu',mode:'story',campaigns:{story:{started:false,results:[],episode:null},demo:{started:false,results:[],episode:null},teacher:{started:false,results:[],episode:null}}})});
 it('сохраняет незавершённый эпизод, решение и правовой выбор',async()=>{useGame.getState().newGame(useGame.getState().character);useGame.getState().launch(1);useGame.getState().investigate('details');const json=JSON.parse(localStorage.getItem('ne-vedis-v1')!);expect(json.state.campaigns.story.episode.seen).toEqual(['details']);useGame.getState().decide('safe');await useGame.persist.rehydrate();expect(useGame.getState().campaigns.story.episode?.phase).toBe('law');useGame.getState().qualify(1);expect(useGame.getState().campaigns.story.results[0].score).toBe(62)});
 it('переигрывание заменяет результат, а не прибавляет деньги и баллы',()=>{useGame.getState().newGame(useGame.getState().character);const run=(bad:boolean)=>{useGame.getState().launch(1);if(bad){useGame.getState().risk();useGame.getState().decide('loss')}else useGame.getState().decide('safe');useGame.getState().qualify(1)};run(true);expect(resources(useGame.getState().campaigns.story.results).money).toBe(30000);run(false);expect(useGame.getState().campaigns.story.results).toHaveLength(1);expect(resources(useGame.getState().campaigns.story.results).money).toBe(50000)});
 it('демо и преподаватель не меняют личную историю',()=>{useGame.getState().newGame(useGame.getState().character);useGame.getState().launch(1);useGame.getState().investigate('details');const story=structuredClone(useGame.getState().campaigns.story);for(const mode of ['demo','teacher'] as const){useGame.getState().startMode(mode);useGame.getState().launch(2);useGame.getState().risk();useGame.getState().decide('loss');useGame.getState().qualify(1);expect(useGame.getState().campaigns.story).toEqual(story)}useGame.getState().exitMode();expect(useGame.getState().mode).toBe('story')});
 it('финал закрыт до семи глав в истории, но доступен преподавателю',()=>{useGame.getState().launch(8);expect(useGame.getState().campaigns.story.episode).toBeNull();useGame.getState().startMode('teacher');useGame.getState().launch(8);expect(useGame.getState().campaigns.teacher.episode?.id).toBe(8)});
 it('не начисляет повторно правовые баллы',()=>{useGame.getState().launch(1);useGame.getState().decide('safe');useGame.getState().qualify(1);const first=useGame.getState().campaigns.story.results[0];useGame.getState().qualify(0);expect(useGame.getState().campaigns.story.results[0]).toEqual(first)});
});
