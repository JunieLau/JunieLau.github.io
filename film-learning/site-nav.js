(()=>{'use strict';const bar=document.querySelector('.topbar');bar?.classList.add('full-width-sitebar');if(!document.querySelector('link[data-site-nav-style]')){const css=document.createElement('link');css.rel='stylesheet';css.href='./site-nav.css?v=20261108p';css.dataset.siteNavStyle='';document.head.appendChild(css)};const d=(z,e)=>`<span class="zh" lang="zh-CN">${z}</span><span class="en" lang="en">${e}</span>`;document.querySelector('.brand')?.setAttribute('href','./books.html');const current=location.pathname.split('/').pop()||'index.html';const books=[['books.html','书单与结构比较','Reading & comparison'],['index.html','救猫咪','Save the Cat!'],['hero-journey.html','英雄之旅','The hero’s journey'],['three-act.html','诗学与三幕结构','Poetics & three acts'],['freytag.html','弗赖塔格金字塔','Freytag’s pyramid'],['modern-monomyth.html','现代单一神话','Modern monomyth']];const link=([href,z,e])=>`<a href="./${href}"${current===href?' aria-current="page"':''}>${d(z,e)}</a>`;const nav=document.querySelector('.site-nav');if(nav)nav.innerHTML=`<details class="nav-books"><summary${books.some(b=>b[0]===current)?' class="current-group"':''}>${d('书单','Books')}</summary><div class="book-menu">${books.map(link).join('')}</div></details>${[['films.html','片单','Films'],['film-history.html','电影史','Film history'],['cinematography.html','摄影','Image'],['composition.html','构图','Composition'],['composition-essentials.html','构图基础','Essentials'],['one-shot-thirty-ways.html','一个镜头三十拍','30 Ways'],['composing-for-movement.html','运动构图','Movement'],['compositions.html','50 种构图','50 Compositions'],['chemistry.html','化学反应','Chemistry'],['composition-for-editing.html','为剪辑构图','Editing'],['mastering-bw.html','掌握黑白','B&W'],['understanding-color.html','理解色彩','Color'],['directors-workbook.html','导演手册','Workbook'],['getting-unstuck.html','走出卡点','Unstuck'],['directors-voice.html','导演声音','Voice']].map(link).join('')}`;document.addEventListener('click',e=>{if(!e.target.closest('.nav-books'))document.querySelector('.nav-books')?.removeAttribute('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape'){const menu=document.querySelector('.nav-books[open]');if(menu){menu.removeAttribute('open');menu.querySelector('summary').focus()}}});
// Fit against the real usable width (including vertical-scrollbar loss), not a viewport estimate.
let navFitQueued=false;
function fitSiteNav(){
 if(!bar||!nav||window.innerWidth<1280)return;
 if(getComputedStyle(bar).display!=='grid'||nav.getBoundingClientRect().width<=0)return;
 bar.style.removeProperty('--site-nav-zh-size');bar.style.removeProperty('--site-nav-en-size');
 const sample=nav.querySelector(':scope>a')||nav.querySelector('summary');if(!sample)return;
 const zh=parseFloat(getComputedStyle(sample).fontSize),en=parseFloat(getComputedStyle(sample.querySelector('.en')).fontSize);
 const available=nav.getBoundingClientRect().width;
 const required=()=>Array.from(nav.children).reduce((n,e)=>n+e.getBoundingClientRect().width,0)+(parseFloat(getComputedStyle(nav).columnGap)||0)*(nav.children.length-1);
 for(let scale=1;required()>available-.5&&scale>.75;){scale-=.025;bar.style.setProperty('--site-nav-zh-size',(zh*scale).toFixed(3)+'px');bar.style.setProperty('--site-nav-en-size',(en*scale).toFixed(3)+'px')}
}
function queueNavFit(){if(navFitQueued)return;navFitQueued=true;const run=()=>{navFitQueued=false;fitSiteNav()};if(window.requestAnimationFrame)window.requestAnimationFrame(run);else run()}
window.addEventListener('resize',queueNavFit,{passive:true});
document.querySelector('link[data-site-nav-style]')?.addEventListener('load',queueNavFit);
document.fonts?.ready.then(queueNavFit);
document.addEventListener('click',e=>{if(e.target.closest('[data-lang]'))queueNavFit()});
if(window.ResizeObserver&&bar&&nav){const fitObserver=new ResizeObserver(queueNavFit);fitObserver.observe(bar);fitObserver.observe(nav)}
queueNavFit();
})();
