import {useGame} from './store';
import {Icon} from './icons';
import s from './App.module.css';
export function Room({interactive=false,onDevice,onDoor,onBook}:{interactive?:boolean;onDevice?:()=>void;onDoor?:()=>void;onBook?:()=>void}) {const c=useGame(x=>x.character);return <div className={s.roomArt}>
<svg viewBox="0 0 1000 810" role="img" aria-label="Уютная комната студента: рабочий стол с ноутбуком и телефоном, книжный стеллаж, окно, кресло и растения">
<defs>
 <linearGradient id="wall" x2="0" y2="1"><stop stopColor="#e5e5d9"/><stop offset="1" stopColor="#c8d7cb"/></linearGradient>
 <linearGradient id="side" x2="1" y2=".7"><stop stopColor="#f4e4cf"/><stop offset="1" stopColor="#e3d9c4"/></linearGradient>
 <linearGradient id="floor" x2=".7" y2="1"><stop stopColor="#dfbd99"/><stop offset="1" stopColor="#efcfac"/></linearGradient>
 <linearGradient id="glass" x2="0" y2="1"><stop stopColor="#afc7be"/><stop offset="1" stopColor="#e6ebd4"/></linearGradient>
 <linearGradient id="wood" x2=".5" y2="1"><stop stopColor="#c88f65"/><stop offset="1" stopColor="#a66c4c"/></linearGradient>
 <linearGradient id="screen" x2="1" y2="1"><stop stopColor="#d0e8df"/><stop offset="1" stopColor="#8db8ab"/></linearGradient>
 <radialGradient id="light"><stop stopColor="#fff4bb" stopOpacity=".6"/><stop offset="1" stopColor="#fff4bb" stopOpacity="0"/></radialGradient>
 <filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#1d3b32" floodOpacity=".15"/></filter>
 <filter id="soft"><feGaussianBlur stdDeviation="10"/></filter>
 <pattern id="rug" width="25" height="25" patternUnits="userSpaceOnUse"><rect width="25" height="25" fill="#f0e8d7"/><path d="M0 0h25v25" fill="none" stroke="#ded8c6" strokeWidth="1"/></pattern>
</defs>
<ellipse cx="525" cy="726" rx="375" ry="48" fill="#546455" opacity=".08" filter="url(#soft)"/>
<g filter="url(#shadow)">
 <path d="m120 492 423-221 373 222-414 248Z" fill="url(#floor)"/>
 <path d="m120 492 382 235 414-234v22L502 754 120 515Z" fill="#bb9778"/>
 <path d="M120 492V166L543 0v271Z" fill="url(#wall)" transform="translate(0 38)"/>
 <path d="m543 38 373 208v285L543 309Z" fill="url(#side)"/>
 <path d="m120 505 423-218 373 221" fill="none" stroke="#c8c8b7" strokeWidth="9"/>
 <g stroke="#ba9574" opacity=".23"><path d="m199 535 413-224m-338 268 413-224m-338 269 413-224m-338 270 413-224m-337 269 413-224"/><path d="m354 390 376 219m-520-144 374 221"/></g>
 <path d="m274 536 249-132 265 155-251 146Z" fill="url(#rug)" stroke="#faf3e2" strokeWidth="7"/>
 {/* window and afternoon light */}
 <path d="m192 204 238-100v207L192 432Z" fill="#819c90"/>
 <path d="m201 211 220-93v184L201 413Z" fill="url(#glass)"/>
 <path d="m222 350 30-83 24 53 30-126 25 84 26-105 22 70 42-93v152L201 413Z" fill="#7d9a85" opacity=".42"/>
 <path d="m208 391 212-103v13L208 409Z" fill="#a2b8a2"/>
 <path d="m310 165 0 190m-109-52 220-98" stroke="#f6f0e2" strokeWidth="9"/>
 <path d="m187 197 249-102v12L187 214Zm-6 237 254-124 11 13-259 126Z" fill="#f4ecda"/>
 <path d="m174 213 8-6v223l-8 4m268-333-8 4v201l8-4" stroke="#bac4b6" strokeWidth="7"/>
 <path d="m201 415 220-110 338 198-228 127Z" fill="#fff6d3" opacity=".2"/>
 {/* wall prints and pinboard */}
 <path d="m475 123 40-16v67l-40 17Z" fill="#f7efda" stroke="#81998c" strokeWidth="4"/><path d="m486 142 17-7v31l-17 7Z" fill="#d88265"/>
 <path d="m660 177 97 54v100l-97-55Z" fill="#a67958" stroke="#c59b77" strokeWidth="5"/>
 <path d="m673 198 27 15v35l-27-15Zm39 21 30 17v25l-30-17Zm-34 35 27 16v25l-27-16Z" fill="#f6e9cb"/>
 <path d="m717 264 22 12v29l-22-12Z" fill="#7aa293"/>
 <circle cx="684" cy="209" r="2" fill="#cf7059"/><circle cx="730" cy="237" r="2" fill="#cf7059"/>
 {/* hanging shelf */}
 <path d="m592 130 83 48-30 16-82-49Z" fill="#b18560"/><path d="m563 145 82 49v8l-82-49Z" fill="#956b4e"/>
 <path d="m586 138 0-37 11 6v38m7 2v-41l8 5v41m4 2v-33l14 8v33" stroke="#718d81" strokeWidth="6"/>
 <path d="m645 159 0-37 11 6v37" stroke="#d58165" strokeWidth="10"/>
 {/* bookshelf */}
 <path d="m766 350 71-41 72 43v201l-72 41-71-42Z" fill="#b38259"/>
 <path d="m777 355 60-33v253l-60-36Z" fill="#8a6247"/><path d="m837 322 60 36v184l-60 33Z" fill="#9d7354"/>
 <path d="m775 415 62 38 63-36v10l-63 37-62-38Zm0 68 62 38 63-36v10l-63 37-62-38Z" fill="#d4ae83"/>
 <g strokeWidth="13"><path d="m791 360v56" stroke="#e6c99b"/><path d="m806 369v55" stroke="#73988a"/><path d="m822 378v53" stroke="#cf8164"/><path d="m854 386v49" stroke="#4f7168"/><path d="m872 377v49" stroke="#d3bd8f"/><path d="m889 368v47" stroke="#e4dfc5"/></g>
 <path d="m788 466 43 26 48-28v17l-48 28-43-25Z" fill="#e2c493"/><path d="m788 454 43 26 48-28v12l-48 28-43-26Z" fill="#75948b"/>
 <path d="m850 527 32-18v30l-32 18Z" fill="#e8dbba"/><path d="m857 532 18-10" stroke="#a7906d" strokeWidth="3"/>
 {/* plant by shelf */}
 <path d="m829 325 7 22q18 10 38-8l5-25Z" fill="#d3ae89"/><ellipse cx="853" cy="320" rx="26" ry="12" fill="#a57c58"/>
 <path d="M852 320v-72m0 54q-40-1-33-36 34-3 33 36m1-20q34-3 30-35-34 1-30 35m-1-16q-26-4-24-32 29 3 24 32" fill="#507b60" stroke="#467355" strokeWidth="3"/>
 {/* desk legs */}
 <path d="m302 464-5 138 15 9 13-140Zm369-50 5 133 14 8 5-135Z" fill="#436a5f"/>
 <path d="m550 544 2 106 14 8 9-117Z" fill="#365e54"/>
 <path d="m289 433 167-93 257 147-164 98-260-149Z" fill="url(#wood)"/>
 <path d="m289 433 260 149 164-95v15l-164 97-260-150Z" fill="#a87854"/>
 <path d="m302 430 153-82 244 139-150 87Z" fill="#d5ad80"/>
 {/* notebooks */}
 <path d="m331 445 45-24 56 31-45 25Z" fill="#4c756c"/><path d="m331 439 45-24 56 31-45 25Z" fill="#f3e9ca"/><path d="m333 431 43-24 55 31-44 25Z" fill="#c57158"/>
 <path d="m341 432 28-16m-20 22 28-16" stroke="#e9bf94" strokeWidth="2"/>
 {/* laptop with perspective */}
 <path d="m439 406 104-56 91 49-104 62Z" fill="#49675e"/>
 <path d="m440 406-5-102 103-49 6 95Z" fill="#39594f"/>
 <path d="m447 396-4-87 90-42 4 77Z" fill="url(#screen)"/>
 <path d="m452 317 75-36v13l-75 36Z" fill="#faf6df"/>
 <path d="m455 340 22-10v37l-22 11Z" fill="#ecdfb8"/><path d="m483 327 43-20v7l-43 20m0 0 38-17v6l-38 18m0 1 31-15v6l-31 14" fill="#f7f1db"/>
 <path d="m449 410 94-49 69 38-92 54Z" fill="#b9c7b8"/>
 <g stroke="#6e8c7d" strokeWidth="2"><path d="m468 411 73-39m-65 45 74-38m-65 44 73-38m-65 44 74-38"/><path d="m484 401 30 17m-18-24 30 17m-18-24 30 17m-18-24 30 17"/></g>
 <path d="m545 426 24-13 14 8-24 14Z" fill="#8ca99b"/>
 {/* smartphone */}
 <g className={s.artPhone}><path d="m591 477 29-17 37 20-29 18Z" fill="#294d44" stroke="#1d3d35" strokeWidth="3"/><path d="m599 476 20-12 29 16-20 12Z" fill="#8cb9a6"/><path d="m609 479 11-6 9 5-11 7Z" fill="#eef1d2"/><circle cx="650" cy="473" r="6" fill="#ed775d"/></g>
 {/* mug, card, headphones */}
 <path d="M392 397v25q17 16 30 0v-25" fill="#efe7cf"/><ellipse cx="407" cy="397" rx="15" ry="8" fill="#e5dbc2"/><ellipse cx="407" cy="397" rx="11" ry="5" fill="#79533e"/><path d="M423 402c22-7 19 21 0 15" fill="none" stroke="#e7dec5" strokeWidth="5"/>
 <path d="m486 506 28-16 30 17-29 17Z" fill="#4d796c"/><path d="m497 506 9-5" stroke="#dcb77a" strokeWidth="5"/>
 <path d="M638 436q18-39 48-13m-46 19 8 6m33-19 8 6" fill="none" stroke="#3c5249" strokeWidth="9" strokeLinecap="round"/>
 {/* lamp */}
 <ellipse cx="655" cy="460" rx="24" ry="11" fill="#527669"/><path d="m655 454 2-68-22-33" stroke="#355d51" strokeWidth="7" fill="none"/><path d="m615 342 32-13 15 30-51 19Z" fill="#4d796b"/><ellipse cx="637" cy="364" rx="27" ry="9" transform="rotate(-19 637 364)" fill="#f6df9d"/><ellipse cx="597" cy="452" rx="115" ry="63" fill="url(#light)"/>
 {/* student and upholstered chair */}
 <ellipse cx="423" cy="670" rx="89" ry="24" fill="#607568" opacity=".16"/>
 <path d="m434 617-13 54m13-15-46 18m46-18 50 13m-50-13-9-37" fill="none" stroke="#4a6055" strokeWidth="10" strokeLinecap="round"/>
 <path d="m382 563 51-25 49 27v47l-49 30-51-27Z" fill="#52766b"/>
 <path d="m424 590 49 12 12 54-24 12-24-41-28-10Z" fill="#343f3b"/>
 <path d="m457 656 31-2 16 15-26 13-20-12Z" fill="#eee5ce"/>
 <path d="m413 595 29 21-3 47-23 8-9-50Z" fill="#404c44"/>
 <path d="m415 663 28 0 9 17-29 8-12-12Z" fill="#f2e9d5"/>
 <path d="m392 529 13-65q22-24 45-5l24 65-33 37Z" fill={c.outfit}/>
 <path d="m447 470 36 14 27-20 10 12-29 32-41-14Z" fill={c.outfit}/>
 <path d="m502 466 18-10 12 9-14 13Z" fill={c.skin}/>
 <path d="m417 459 0-24 28-8 1 32q-9 15-29 0" fill={c.skin}/>
 <path d="m409 406q19-29 40-2l3 26q-4 22-23 21l-20-16Z" fill={c.skin}/>
 <path d={c.style==='long'?'M403 448v-37q-4-37 30-38 34 3 24 36l-4 43-12-11 1-34-29 5-1 38Z':'M405 427q-17-49 20-52 31-6 34 24l-13 15-9-16-22 10-1 23Z'} fill={c.hair}/>
 <path d="m381 529q33-13 55 9l-2 75-56-13q-22-31 3-71" fill="#6d9382"/><path d="m380 537q20-10 37 1" stroke="#87a797" strokeWidth="3" fill="none"/>
 {/* tote bag */}
 <path d="m231 532 47-24 25 18-5 64-47 27-25-20Z" fill="#d2c3a1"/><path d="m240 529v-27q20-25 35-7v24" stroke="#9e9b7e" strokeWidth="6" fill="none"/><path d="m247 554 32-18" stroke="#9aab8d" strokeWidth="7"/>
 {/* tall plant in left foreground */}
 <ellipse cx="207" cy="574" rx="42" ry="18" fill="#526d55" opacity=".13"/><path d="m171 520 10 55q25 22 51-4l9-53Z" fill="#c17c5b"/><ellipse cx="206" cy="520" rx="35" ry="15" fill="#a96b50"/>
 <path d="m205 522 0-114m0 72q-60-2-48-46 44-9 48 46m0-29q51-7 46-46-42 0-46 46m0-17q-46-13-32-55 36 3 32 55m0-29q34-1 30-37-37-7-30 37" fill="#547d5b" stroke="#456f50" strokeWidth="3"/>
 {/* door */}
 <path d="m575 226 61 36v115l-61-34Z" fill="#c5b69a" stroke="#baab91" strokeWidth="5"/><path d="m582 241 47 27v94l-47-26Z" fill="#d3c8ae"/><circle cx="623" cy="315" r="4" fill="#8c866f"/>
</g>
</svg>
{interactive&&<><button className={`${s.hotspot} ${s.phoneHotspot}`} onClick={onDevice}><span className={s.ping}/><Icon name="phone" size={17}/><b>Смартфон</b></button><button className={`${s.hotspot} ${s.laptopHotspot}`} onClick={onDevice}><Icon name="laptop" size={17}/><b>Ноутбук</b></button><button className={`${s.hotspot} ${s.bookHotspot}`} onClick={onBook}><Icon name="book" size={17}/><b>Документы</b></button><button className={`${s.hotspot} ${s.doorHotspot}`} onClick={onDoor}><Icon name="home" size={17}/><b>В коридор</b></button></>}
</div>}
