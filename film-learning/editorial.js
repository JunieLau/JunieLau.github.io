/* Shared progressive editorial layout; teaching content and existing interactions remain in their page modules. */
(()=>{
'use strict';
const dual=(z,e,tag='span',cls='')=>`<${tag} class="${cls}"><span class="zh" lang="zh-CN">${z}</span><span class="en" lang="en">${e}</span></${tag}>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stills=window.filmLearningStills||[];
const page=document.querySelector('#composition-main')?'composition':document.querySelector('#cine-main')?'image':'story';
const titles={story:['救猫咪','save the cat!'],image:['摄影与镜头','cameras, lenses & intention'],composition:['构图','composition & character']};
const main=document.querySelector('main');
main.insertAdjacentHTML('afterbegin',`<div class="editorial-masthead">${dual('电影学习','film learning','p','masthead-kicker')}${dual(...titles[page],'p','masthead-title')}</div>`);
function study(index){
 const d=stills[index];if(!d)return '';
 const g=d.guide==='intention'?['构图与意图','Composition & Intention']:['为人物构图','Composing for Character'];
 const movie=d.title?d.title.split(' / '):['片名未确认','Film title unconfirmed'];
 return `<div class="paired-study" data-still="${d.name}"><div class="still-diagram-pair"><figure><img src="./img/${d.name}.jpg" alt="${esc(d.zh+' / '+d.en)}" loading="lazy" width="360" height="203">${dual('讲义剧照','Guide still','figcaption')}</figure><figure><img src="./img/${d.name}-diagram.svg" alt="${esc('原创构图线稿：'+d.zh+' / Original line study: '+d.en)}" loading="lazy" width="360" height="203">${dual('原创构图线稿','Original line study','figcaption')}</figure></div>${dual(`来源：Film Reframed《${g[0]}》第 ${d.page} 页 · ${esc(movie[0])}${d.title?'（视觉识别）':''}`,`Source: Film Reframed, ${g[1]}, p. ${d.page} · ${esc(movie[1]||movie[0])}${d.title?' (visual identification)':''}`,'p','still-credit')}${dual(d.ideaZh,d.ideaEn,'p','frame-reading')}</div>`;
}
function lineVisual(z,e,i=0){
 // Original, neutral storyboard slots: simple spatial patterns, never a claimed film still.
 const bodies=[`<path d="M30 154H330M72 154V43H288V154M94 43V154M266 43V154"/><circle cx="180" cy="86" r="13"/><path d="M163 149L164 110Q180 101 196 110L197 149M180 100V155"/>`, `<path d="M35 170L140 49H255L329 170M140 49V167M255 49V167"/><circle cx="182" cy="105" r="11"/><path d="M169 148V122L196 122V148M112 169H246"/>`, `<path d="M22 163H338M120 35V170M240 35V170" stroke-dasharray="3 5"/><circle cx="120" cy="86" r="13"/><circle cx="262" cy="86" r="13"/><path d="M102 148L105 111H135L138 148M244 148L247 111H277L280 148M152 113H231M222 106L232 113L222 120"/>`, `<path d="M25 170H335M25 45H335"/><circle cx="180" cy="83" r="15"/><path d="M153 156L156 111Q180 99 204 111L207 156M63 170L146 89M297 170L214 89"/>`];
 return `<figure class="concept-visual"><svg viewBox="0 0 360 203" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#409aba" stroke-width="1.25" role="img" aria-label="${esc(z+' / '+e)}"><rect x=".5" y=".5" width="359" height="202" fill="#fafaf8" stroke="#e3e3dd"/>${bodies[i%4]}</svg>${dual(z,e,'figcaption')}${dual('原创示意 · 可替换剧照位','Original schematic · replaceable still slot','figcaption','original-label')}</figure>`;
}
function makeRow(el,visual){
 const body=document.createElement('div');body.className='row-copy';while(el.firstChild)body.appendChild(el.firstChild);el.appendChild(body);el.insertAdjacentHTML('afterbegin',visual);el.classList.add('editorial-row');if(visual.includes('paired-study'))el.classList.add('has-still');
}
function headingText(el){return [el.querySelector('h3 .zh')?.textContent||'构图练习',el.querySelector('h3 .en')?.textContent||'Compositional exercise'];}
function gallery(index,z,e,bz,be){return `<article class="gallery-row">${study(index)}<div class="gallery-copy">${dual(z,e,'h3')}${dual(bz,be,'p')}</div></article>`;}
if(page==='story'){
 document.querySelector('.hero-art')?.remove();
 document.querySelectorAll('.grid>.card,.law-list>.law,.pitfall').forEach((el,i)=>{const [z,e]=headingText(el);makeRow(el,lineVisual(z,e,i));});
 const detail=document.querySelector('#beat-detail');
 function decorateBeat(){if(detail.querySelector('.concept-visual'))return;const name=detail.querySelector('h3 .zh')?.textContent||'',en=detail.querySelector('h3 .en')?.textContent||'';detail.insertAdjacentHTML('afterbegin',lineVisual('《海底总动员》 · '+name,'Finding Nemo · '+en,Number(document.querySelector('[data-beat][aria-pressed=true]')?.dataset.beat||0)));}
 decorateBeat();new MutationObserver(decorateBeat).observe(detail,{childList:true});
 // A scannable editorial index complements (rather than replaces) the interactive timeline.
 const overview=document.createElement('div');overview.className='beat-overview';overview.innerHTML=dual('十五个节拍，一次看清','Fifteen beats at a glance','h3')+dual('先浏览功能，再回到上方互动节拍表读完整片例。页位仍按 110 页模型换算。','Scan the functions, then return to the interactive beat sheet for the complete worked examples. Page targets still follow the 110-page model.','p','small muted')+beats.map((b,i)=>`<article class="editorial-row">${lineVisual('《海底总动员》 · '+String(i+1).padStart(2,'0'),'Finding Nemo · '+b[1],i)}<div class="row-copy"><span class="index">${String(i+1).padStart(2,'0')} · ${b[2]}${b[2]!==b[3]?'–'+b[3]:''} / 110 · ${Math.round(b[2]/110*100)}${b[2]!==b[3]?'–'+Math.round(b[3]/110*100):''}%</span>${dual(b[0],b[1],'h3')}${dual(b[4],b[5],'p')}</div></article>`).join('');
 document.querySelector('#beats details').insertAdjacentElement('afterend',overview);
}
if(page==='image'){
 document.querySelectorAll('.cine-principles>.card').forEach((el,i)=>makeRow(el,lineVisual(...headingText(el),i)));
 const table=document.querySelector('#director-table'),rows=[...table.tBodies[0].rows],headers=[...table.tHead.rows[0].cells];
 const container=document.createElement('div');container.className='director-rows';
 rows.forEach((tr,i)=>{const cells=[...tr.cells],article=document.createElement('article');article.className='editorial-row';const z=cells[0].querySelector('.zh')?.textContent||cells[0].textContent,e=cells[0].querySelector('.en')?.textContent||cells[0].textContent;
 article.innerHTML=lineVisual(z,e,i)+`<div class="row-copy"><span class="index">${String(i+1).padStart(2,'0')}</span><h3>${cells[0].innerHTML}</h3>${cells.slice(1).map((c,n)=>`<div><h4>${headers[n+1].innerHTML}</h4>${c.innerHTML}</div>`).join('')}</div>`;container.appendChild(article);});
 const wrap=table.closest('.table-wrap'),hint=wrap.previousElementSibling;if(hint?.classList.contains('table-hint'))hint.remove();wrap.replaceWith(container);
}
if(page==='composition'){
 const first=document.querySelector('#intention');
 first.querySelector('.lede').insertAdjacentHTML('afterend',gallery(0,'观看之前，先问意图','Before looking, ask about intention','封面剧照的重复座位与人群，是一项读图练习：我们的注意力被组织到哪里？以下读图与线稿由本课程补充，不是讲义原注。','The cover’s repeated seats and audience offer a reading exercise: where is our attention organized? These readings and line studies are course additions, not original guide captions.'));
 document.querySelectorAll('.intention-card').forEach((el,i)=>{el.querySelector('.composition-diagram')?.remove();el.insertAdjacentHTML('afterbegin',study(i+1));});
 const second=document.querySelector('#character');second.querySelector('.lede').insertAdjacentHTML('afterend',gallery(6,'先看见一个关系','First, see a relation','封面把多个面孔压进同一画面：谁在前景，谁被遮挡，视线指向哪里？距离与重叠需要结合动作和上下文解释。','The cover compresses faces into one frame: who is nearer, who is occluded, and where do gazes point? Interpret proximity and overlap with action and context.'));
 const table=second.querySelector('.composition-table'),rows=[...table.tBodies[0].rows],headers=[...table.tHead.rows[0].cells],out=document.createElement('div');out.className='character-concepts';
 rows.forEach((tr,i)=>{const cells=[...tr.cells],a=document.createElement('article');a.className='editorial-row';const z=cells[0].querySelector('.zh').textContent,e=cells[0].querySelector('.en').textContent;
 const media=i===0?study(7):i===3?study(8):lineVisual(z,e,i);if(i===0||i===3)a.classList.add('has-still');
 a.innerHTML=media+`<div class="row-copy"><h3>${cells[0].innerHTML}</h3>${cells.slice(1).map((c,n)=>`<div class="concept-description"><h4>${headers[n+1].innerHTML}</h4>${c.innerHTML}</div>`).join('')}</div>`;out.appendChild(a);});
 const tw=table.closest('.table-wrap'),hint=tw.previousElementSibling;if(hint?.classList.contains('table-hint'))hint.remove();tw.replaceWith(out);
 // The standalone abstract pattern remains as a separate exercise, not a claim about a still.
 second.querySelectorAll('.relationship-grid>.card').forEach((el,i)=>{el.querySelector('.composition-diagram')?.remove();makeRow(el,study(9+i));});
 const groups=[[12,13],[14,15],[16],[17],[18,19],[20,21]];
 second.querySelectorAll('.character-tool-grid>.card').forEach((el,i)=>{makeRow(el,`<div class="study-stack">${groups[i].map(study).join('')}</div>`);el.classList.add('has-still');if(i===5)el.querySelector('.row-copy').insertAdjacentHTML('beforeend',dual('读图边界：这两张是讲义列出的首尾研究示例；此处不声称它们来自同一部电影，也不声称为同一人物精确匹配的第一格与最后一格。','Reading boundary: these are the guide’s first–last study examples. We do not claim that they come from one film or are precisely matched first and final frames of the same character.','p','small muted'));});
 const legend=dual('剧照与片名：剧照取自用户提供的两份 Film Reframed 讲义。讲义没有逐一标注片名；可辨认的标题标为“视觉识别”，无法确认的保留说明。线稿是本课程的简化观察，不是原片分镜、光学测量或唯一正确的解释。','Stills and titles: images come from the two user-supplied Film Reframed guides, which do not caption every film. Recognizable titles are labeled “visual identification”; uncertain titles remain unconfirmed. Line drawings are simplified observations, not original storyboards, optical measurements, or definitive interpretations.','p','credits-legend');
 first.querySelector('.intention-grid').insertAdjacentHTML('beforebegin',legend);
 const source=document.querySelector('#composition-sources');source.insertAdjacentHTML('beforeend',dual('替换与来源清单','Replacement & provenance manifest','h3','source-heading')+dual('图片及逐张来源清单保存在 img/；README 说明了命名、替换和版权边界。公开上线前，请自行确认剧照使用所需的权利或适用例外。','Images and a per-frame source manifest are in img/; the README explains naming, replacement, and copyright boundaries. Before public deployment, independently confirm the required rights or applicable exceptions for still use.','p','small muted'));
}
// Language changes alter the sticky bars' heights; keep anchors clear in every mode.
function updateStickyMetrics(){
 const top=document.querySelector('.topbar').getBoundingClientRect().height;
 const nav=document.querySelector('.cine-nav');
 const extra=nav&&innerWidth>640?nav.getBoundingClientRect().height:0;
 document.documentElement.style.setProperty('--topbar-height',top+'px');
 document.documentElement.style.setProperty('--chapter-nav-height',extra+'px');
}
const stickyResize=new ResizeObserver(updateStickyMetrics);
stickyResize.observe(document.querySelector('.topbar'));
if(document.querySelector('.cine-nav'))stickyResize.observe(document.querySelector('.cine-nav'));
window.addEventListener('resize',updateStickyMetrics,{passive:true});
updateStickyMetrics();
})();
