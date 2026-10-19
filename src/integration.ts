import type {Result} from './engine';
export interface ExternalIdentity {subject:string;displayName:string;provider:string}
export interface LearningAdapter {authorize():Promise<ExternalIdentity|null>;sendResults(report:LearningReport):Promise<void>}
export interface LearningReport {schemaVersion:1;simulator:'ne-vedis';mode:string;generatedAt:string;results:Result[];notice:string}
export function makeReport(mode:string,results:Result[]):LearningReport{return {schemaVersion:1,simulator:'ne-vedis',mode,generatedAt:new Date().toISOString(),results,notice:'Учебные действия внутри симулятора. Не психологическая диагностика.'}}
export function downloadJSON(report:LearningReport){const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='ne-vedis-report.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
// Contract only. No university identity provider or result endpoint is connected.
export const localAdapter:LearningAdapter={authorize:async()=>null,sendResults:async()=>{throw new Error('Адаптер ЭИОС не подключён. Используйте экспорт JSON.')}};
