(()=>{
'use strict';
const bar=document.querySelector('.topbar');
if(!bar)return;
bar.classList.add('full-width-sitebar');
if(!document.querySelector('link[data-site-nav-style]')){
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='./site-nav.css?v=20261108u';
  css.dataset.siteNavStyle='';
  document.head.appendChild(css);
}
if(!document.querySelector('link[data-readability-style]')){
  const read=document.createElement('link');
  read.rel='stylesheet';
  read.href='./readability.css?v=20261108u';
  read.dataset.readabilityStyle='';
  document.head.appendChild(read);
}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const label=(z,e)=>`<span class="nav-label"><span class="zh" lang="zh-CN">${esc(z)}</span><span class="en" lang="en">${esc(e)}</span></span>`;
document.querySelector('.brand')?.setAttribute('href','./books.html');
const current=location.pathname.split('/').pop()||'index.html';
const pages=[
  ['books.html','书单','Books'],
  ['index.html','救猫咪','Save the Cat!'],
  ['hero-journey.html','英雄之旅','The hero’s journey'],
  ['three-act.html','诗学与三幕','Poetics & three acts'],
  ['freytag.html','弗赖塔格','Freytag’s pyramid'],
  ['modern-monomyth.html','单一神话','Modern monomyth'],
  ['films.html','片单','Films'],
  ['film-history.html','电影史','Film history'],
  ['cinematography.html','摄影','Image'],
  ['composition.html','构图','Composition'],
  ['composition-essentials.html','构图基础','Essentials'],
  ['one-shot-thirty-ways.html','一个镜头三十拍','30 Ways'],
  ['composing-for-movement.html','运动构图','Movement'],
  ['compositions.html','50 种构图','50 Compositions'],
  ['chemistry.html','化学反应','Chemistry'],
  ['composition-for-editing.html','为剪辑构图','Editing'],
  ['mastering-bw.html','掌握黑白','B&W'],
  ['understanding-color.html','理解色彩','Color'],
  ['directors-workbook.html','导演手册','Workbook'],
  ['getting-unstuck.html','走出卡点','Unstuck'],
  ['directors-voice.html','导演声音','Voice']
];
const nav=document.querySelector('.site-nav');
if(nav){
  nav.innerHTML=pages.map(([href,z,e])=>`<a href="./${href}"${current===href?' aria-current="page"':''}>${label(z,e)}</a>`).join('');
}
function syncLang(){
  const mode=document.documentElement.dataset.mode||'bi';
  document.querySelectorAll('[data-lang]').forEach(button=>{
    button.setAttribute('aria-pressed',String(button.dataset.lang===mode));
  });
}
syncLang();
document.addEventListener('click',event=>{
  if(event.target.closest('[data-lang]'))requestAnimationFrame(syncLang);
});
})();
