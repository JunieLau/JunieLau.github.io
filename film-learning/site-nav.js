(()=>{
'use strict';
const bar=document.querySelector('.topbar');
if(!bar)return;
bar.classList.add('full-width-sitebar');
if(!document.querySelector('link[data-site-nav-style]')){
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='./site-nav.css?v=20261108r';
  css.dataset.siteNavStyle='';
  document.head.appendChild(css);
}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const d=(z,e)=>`<span class="nav-label"><span class="zh" lang="zh-CN">${esc(z)}</span><span class="en" lang="en">${esc(e)}</span></span>`;
document.querySelector('.brand')?.setAttribute('href','./books.html');
const current=location.pathname.split('/').pop()||'index.html';
const books=[
  ['books.html','书单与结构比较','Reading & comparison'],
  ['index.html','救猫咪','Save the Cat!'],
  ['hero-journey.html','英雄之旅','The hero’s journey'],
  ['three-act.html','诗学与三幕结构','Poetics & three acts'],
  ['freytag.html','弗赖塔格金字塔','Freytag’s pyramid'],
  ['modern-monomyth.html','现代单一神话','Modern monomyth']
];
const image=[
  ['cinematography.html','摄影','Image'],
  ['composition.html','构图','Composition'],
  ['composition-essentials.html','构图基础','Essentials'],
  ['one-shot-thirty-ways.html','一个镜头三十拍','30 Ways'],
  ['composing-for-movement.html','运动构图','Movement'],
  ['compositions.html','50 种构图','50 Compositions'],
  ['chemistry.html','化学反应','Chemistry'],
  ['composition-for-editing.html','为剪辑构图','Editing'],
  ['mastering-bw.html','掌握黑白','B&W'],
  ['understanding-color.html','理解色彩','Color']
];
const practice=[
  ['directors-workbook.html','导演手册','Workbook'],
  ['getting-unstuck.html','走出卡点','Unstuck'],
  ['directors-voice.html','导演声音','Voice']
];
const link=([href,z,e])=>`<a href="./${href}"${current===href?' aria-current="page"':''}>${d(z,e)}</a>`;
const menu=(id,z,e,items)=>{
  const here=items.some(item=>item[0]===current);
  return `<details class="nav-group nav-books" data-nav="${id}"><summary class="${here?'current-group is-current':''}">${d(z,e)}</summary><div class="book-menu">${items.map(link).join('')}</div></details>`;
};
const direct=(href,z,e)=>`<a class="nav-direct" href="./${href}"${current===href?' aria-current="page"':''}>${d(z,e)}</a>`;
const nav=document.querySelector('.site-nav');
if(nav){
  nav.innerHTML=[
    menu('books','书单','Books',books),
    direct('films.html','片单','Films'),
    direct('film-history.html','电影史','Film history'),
    menu('image','影像语言','Image language',image),
    menu('practice','导演练习','Director practice',practice)
  ].join('');
}
function placeMenu(menuEl){
  const panel=menuEl.querySelector('.book-menu');
  if(!panel)return;
  panel.style.left='0';
  panel.style.right='auto';
  const rect=panel.getBoundingClientRect();
  if(rect.right>window.innerWidth-12){
    panel.style.left='auto';
    panel.style.right='0';
  }
}
function closeMenus(except){
  document.querySelectorAll('.nav-group[open]').forEach(menuEl=>{
    if(menuEl!==except)menuEl.removeAttribute('open');
  });
}
nav?.addEventListener('toggle',event=>{
  const menuEl=event.target;
  if(!(menuEl instanceof HTMLDetailsElement)||!menuEl.classList.contains('nav-group'))return;
  if(!menuEl.open)return;
  closeMenus(menuEl);
  placeMenu(menuEl);
},true);
document.addEventListener('click',event=>{
  const owner=event.target.closest('.nav-group');
  if(owner)closeMenus(owner);
  else closeMenus(null);
});
document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const open=[...document.querySelectorAll('.nav-group[open]')];
  if(!open.length)return;
  open.forEach(menuEl=>menuEl.removeAttribute('open'));
  open[open.length-1].querySelector('summary')?.focus();
});
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
