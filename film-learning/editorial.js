/* Shared progressive editorial layout; teaching content and existing interactions remain in their page modules. */
(()=>{
'use strict';
const dual=(z,e,tag='span',cls='')=>`<${tag} class="${cls}"><span class="zh" lang="zh-CN">${z}</span><span class="en" lang="en">${e}</span></${tag}>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stills=window.filmLearningStills||[];
const page=document.body.dataset.volume|| (document.querySelector('#composition-main')?'composition':document.querySelector('#cine-main')?'image':'story');
const titles={story:['救猫咪','Save the Cat!'],image:['摄影与镜头','Cameras, Lenses & Intention'],composition:['构图','Composition & Character']};
Object.assign(titles,{books:['书单与结构','Books & Story Structures'],hero:['英雄之旅','The Hero’s Journey'],three:['诗学与三幕结构','Poetics & Three Acts'],freytag:['五部结构金字塔','Freytag’s Pyramid'],modern:['现代单一神话','Modern Monomyth'],films:['导演的片单','Films for a Director'],history:['电影史','Histories of Cinema']});
const main=document.querySelector('main');
main.insertAdjacentHTML('afterbegin',`<div class="editorial-masthead">${dual('电影学习','Film Learning','p','masthead-kicker')}${dual(...titles[page],'p','masthead-title')}</div>`);
function study(index){
 const d=stills[index];if(!d)return '';
 const g=d.guide==='intention'?['构图与意图','Composition & Intention']:['为人物构图','Composing for Character'];
 const movie=d.title?d.title.split(' / '):['片名未确认','Film title unconfirmed'];
 return `<div class="paired-study" data-still="${d.name}"><div class="still-diagram-pair"><figure><img src="./img/${d.name}.jpg" alt="${esc(d.zh+' / '+d.en)}" loading="lazy" width="360" height="203">${dual('讲义剧照','Guide still','figcaption')}</figure></div>${dual(`来源：Film Reframed《${g[0]}》第 ${d.page} 页 · ${esc(movie[0])}${d.title?'（视觉识别）':''}`,`Source: Film Reframed, ${g[1]}, p. ${d.page} · ${esc(movie[1]||movie[0])}${d.title?' (visual identification)':''}`,'p','still-credit')}${dual(d.ideaZh,d.ideaEn,'p','frame-reading')}</div>`;
}
function lineVisual(z,e,i=0){
 if(!['story','books','hero','three','freytag','modern'].includes(page))return '';
 const type={story:'beats',books:'beats',hero:'cycle',three:'three',freytag:'pyramid',modern:'cycle'}[page];
 return `<figure class="concept-visual">${window.BookStructureArt(type,{active:page==='story'?i:-1,stages:page==='hero'?17:8})}${dual(z,e,'figcaption')}${dual('原创结构示意 · 非电影剧照','Original structural schematic · not a film still','figcaption','original-label')}</figure>`;
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
 if(!table.classList.contains('compact-compare')){
 const container=document.createElement('div');container.className='director-rows';
 rows.forEach((tr,i)=>{const cells=[...tr.cells],article=document.createElement('article');article.className='editorial-row';const z=cells[0].querySelector('.zh')?.textContent||cells[0].textContent,e=cells[0].querySelector('.en')?.textContent||cells[0].textContent;
 article.innerHTML=lineVisual(z,e,i)+`<div class="row-copy"><span class="index">${String(i+1).padStart(2,'0')}</span><h3>${cells[0].innerHTML}</h3>${cells.slice(1).map((c,n)=>`<div><h4>${headers[n+1].innerHTML}</h4>${c.innerHTML}</div>`).join('')}</div>`;container.appendChild(article);});
 const wrap=table.closest('.table-wrap'),hint=wrap.previousElementSibling;if(hint?.classList.contains('table-hint'))hint.remove();wrap.replaceWith(container);
 }
}
if(page==='composition'){
 const first=document.querySelector('#intention');
 first.querySelector('.lede').insertAdjacentHTML('afterend',gallery(0,'观看之前，先问意图','Before looking, ask about intention','封面剧照的重复座位与人群，是一项读图练习：我们的注意力被组织到哪里？以下读图由本课程补充，不是讲义原注。','The cover’s repeated seats and audience offer a reading exercise: where is our attention organized? These readings are course additions, not original guide captions.'));
 document.querySelectorAll('.intention-card').forEach((el,i)=>{el.querySelector('.composition-diagram')?.remove();el.insertAdjacentHTML('afterbegin',study(i+1));});
 const second=document.querySelector('#character');second.querySelector('.lede').insertAdjacentHTML('afterend',gallery(6,'先看见一个关系','First, see a relation','封面把多个面孔压进同一画面：谁在前景，谁被遮挡，视线指向哪里？距离与重叠需要结合动作和上下文解释。','The cover compresses faces into one frame: who is nearer, who is occluded, and where do gazes point? Interpret proximity and overlap with action and context.'));
 const table=second.querySelector('.composition-table'),rows=[...table.tBodies[0].rows],headers=[...table.tHead.rows[0].cells],out=document.createElement('div');out.className='character-concepts';
 rows.forEach((tr,i)=>{const cells=[...tr.cells],a=document.createElement('article');a.className='editorial-row';const z=cells[0].querySelector('.zh').textContent,e=cells[0].querySelector('.en').textContent;
 const media=i===0?study(7):i===3?study(8):lineVisual(z,e,i);if(i===0||i===3)a.classList.add('has-still');
 a.innerHTML=media+`<div class="row-copy"><h3>${cells[0].innerHTML}</h3>${cells.slice(1).map((c,n)=>`<div class="concept-description"><h4>${headers[n+1].innerHTML}</h4>${c.innerHTML}</div>`).join('')}</div>`;out.appendChild(a);});
 const tw=table.closest('.table-wrap'),hint=tw.previousElementSibling;if(hint?.classList.contains('table-hint'))hint.remove();tw.replaceWith(out);
 // The standalone abstract pattern remains as a separate exercise, not a claim about a still.
 second.querySelectorAll('.relationship-grid>.card').forEach((el,i)=>{el.querySelector('.composition-diagram')?.remove();makeRow(el,study(9+i));});
 const groups=[[12,13],[14,15],[16],[17],[19,21],[18,20]];
 second.querySelectorAll('.character-tool-grid>.card').forEach((el,i)=>{if(i===4)el.id='character-effects';if(i===5)el.id='character-beginnings-endings';makeRow(el,`<div class="study-stack">${groups[i].map(study).join('')}</div>`);el.classList.add('has-still');});
 const legend=dual('剧照与片名：剧照取自用户提供的两份 Film Reframed 讲义。讲义没有逐一标注片名；可辨认的标题标为“视觉识别”，无法确认的保留说明。本课程读图是简化观察，不是原片分镜、光学测量或唯一正确的解释。','Stills and titles: images come from the two user-supplied Film Reframed guides, which do not caption every film. Recognizable titles are labeled “visual identification”; uncertain titles remain unconfirmed. The readings are simplified observations, not original storyboards, optical measurements, or definitive interpretations.','p','credits-legend');
 first.querySelector('.intention-grid').insertAdjacentHTML('beforebegin',legend);
 const source=document.querySelector('#composition-sources');source.insertAdjacentHTML('beforeend',dual('替换与来源清单','Replacement & provenance manifest','h3','source-heading')+dual('图片及逐张来源清单保存在 img/；README 说明了命名、替换和版权边界。公开上线前，请自行确认剧照使用所需的权利或适用例外。','Images and a per-frame source manifest are in img/; the README explains naming, replacement, and copyright boundaries. Before public deployment, independently confirm the required rights or applicable exceptions for still use.','p','small muted'));
}
// Put overview diagrams in the same media/copy tracks as the following rows.
main.querySelectorAll('.wide-diagram').forEach(el=>{
 const row=document.createElement('article');row.className='editorial-row library-row overview-row';
 const fig=document.createElement('figure');fig.className='concept-visual';while(el.firstChild)fig.appendChild(el.firstChild);
 fig.insertAdjacentHTML('beforeend',dual('原创结构示意','Original structural schematic','figcaption'));
 const copy=document.createElement('div');copy.className='row-copy';
 const circle=el.closest('#story-circle');
 copy.innerHTML=dual('先看整体，再读每一步','Read the whole before the steps','h3')+dual(circle?'先看需求、出发、代价与返回怎样连成循环；下方八步把这个循环拆成可拍的行动，不是固定时长或强制顺序。':'先看出发、历险、归返的关系；下方逐项说明如何把变化落实到行动与人物关系。图形不规定固定时长。',circle?'See how need, departure, cost and return connect. The eight steps below turn this cycle into filmable actions, not compulsory timing or order.':'See the relation between departure, initiation and return, then read how change becomes action and relationships. The diagram does not prescribe timing.','p');
 row.append(fig,copy);el.replaceWith(row);
});
// Use the available width for every translated prose block, including nested intros.
main.querySelectorAll('p').forEach(el=>{
 if(el.closest('table,figure,.map-node,.lens-wide-lightbox'))return;
 if(el.querySelector(':scope > .zh')&&el.querySelector(':scope > .en')){
  el.classList.add('reading-pair');el.parentElement.classList.add('reading-container');
 }
});
// A one-digit numbered teaching heading uses the same 01–09 format site-wide.
main.querySelectorAll('h2 .zh,h2 .en,h3 .zh,h3 .en,h4 .zh,h4 .en').forEach(el=>{
 const first=el.firstChild;if(first?.nodeType===Node.TEXT_NODE)first.textContent=first.textContent.replace(/^([1-9])(?=\s*·)/,'0$1');
});
main.querySelectorAll('.index,.beat-num,.nav-num').forEach(el=>{
 if(/^[1-9]$/.test(el.textContent.trim()))el.textContent=el.textContent.trim().padStart(2,'0');
});
// Language changes alter the sticky bars' heights; keep anchors clear in every mode.
function updateStickyMetrics(){
 const top=document.querySelector('.topbar').getBoundingClientRect().height;
 const nav=document.querySelector('.cine-nav');
 const extra=nav&&getComputedStyle(nav).position==='sticky'&&innerWidth>760?nav.getBoundingClientRect().height:0;
 document.documentElement.style.setProperty('--topbar-height',top+'px');
 document.documentElement.style.setProperty('--chapter-nav-height',extra+'px');
}
const stickyResize=new ResizeObserver(updateStickyMetrics);
stickyResize.observe(document.querySelector('.topbar'));
if(document.querySelector('.cine-nav'))stickyResize.observe(document.querySelector('.cine-nav'));
window.addEventListener('resize',updateStickyMetrics,{passive:true});
updateStickyMetrics();
// Generated sections may appear after the browser's first hash pass. Align once,
// after the actual sticky-header height is available, using shared scroll margins.
if(location.hash)requestAnimationFrame(()=>{
 let target;try{target=document.getElementById(decodeURIComponent(location.hash.slice(1)))}catch(e){}
 if(target&&main.contains(target)&&typeof target.scrollIntoView==='function')target.scrollIntoView({block:'start',behavior:'auto'});
});
})();
