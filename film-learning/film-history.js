/* 电影史：七张思维导图，按 PDF 原样的层级、顺序与分支逐节点呈现。 */
(()=>{'use strict';
const maps=window.historyMaps||[],main=document.querySelector('#history-main');if(!main||!maps.length)return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MARK={'star-yellow':'★','star-red':'★','flag-orange':'⚑','flag-blue':'⚑'};
const marks=n=>(n.m||[]).map(m=>`<img class="hm-mark" src="./img/history-markers/${m}.png?v=20261108c" alt="${MARK[m]||''}" width="14" height="14">`).join('');
const style=n=>{const s=[];if(n.f)s.push('--fill:'+n.f);if(n.s)s.push('--stroke:'+n.s);return s.length?` style="${s.join(';')}"`:''};
function nodeBox(n,kind){
  const cls=['hm-node','hm-'+kind];if(n.f)cls.push('is-filled');if(n.v)cls.push('is-vertical');if(n.w)cls.push('is-light');
  const rels=(n.r||[]).map(r=>r.d==='out'?`<span class="hm-rel">⇢ ${r.l?esc(r.l)+' → ':''}「${esc(r.to)}」</span>`:`<span class="hm-rel">⇠ 关联自「${esc(r.to)}」${r.l?'：'+esc(r.l):''}</span>`).join('');
  const callouts=(n.co||[]).map(c=>`<span class="hm-callout"${style(c)}>${esc(c.t)}</span>`).join('');
  return `<div class="${cls.join(' ')}"${style(n)}><span class="hm-text">${marks(n)}${esc(n.t)}</span>${callouts}${rels}</div>`;
}
function items(kids,groups,a,z){
  let out='',gs=groups.filter(g=>g.a>=a&&g.z<=z);
  for(let i=a;i<=z;){
    const g=gs.filter(x=>x.a===i).sort((p,q)=>q.z-p.z)[0];
    if(g){const inner=gs.filter(x=>x!==g&&x.a>=g.a&&x.z<=g.z);out+=`<li class="hm-group"><div class="hm-group-row"><div class="hm-gwrap"><ul class="hm-gitems">${items(kids,inner,g.a,g.z)}</ul><span class="hm-brace" aria-hidden="true"></span></div>${branch(g.n,'summary')}</div></li>`;gs=gs.filter(x=>x!==g&&!inner.includes(x));i=g.z+1}
    else{const ef=(kids[i].ef||[]).map(f=>`<div class="hm-efloat" style="padding-left:${(f.x*100).toFixed(1)}%">${branch(f,'float')}</div>`).join('');out+=`<li class="hm-item">${branch(kids[i],kids[i].k||'node')}${ef}</li>`;i++}
  }
  return out;
}
function kidsList(n){
  const kids=n.c||[],fl=n.fl||[];if(!kids.length&&!fl.length)return '';
  let html=kids.length?items(kids,n.g||[],0,kids.length-1):'';
  html+=fl.map(f=>`<li class="hm-float">${branch(f,'float')}</li>`).join('');
  return `<ul class="hm-kids${kids.length?'':' only-floats'}">${html}</ul>`;
}
function branch(n,kind){const line=kind==='era'&&(n.f||n.s)?` style="--line:${n.f||n.s}"`:'';return `<div class="hm-branch hm-b-${kind}"${line}>${nodeBox(n,kind)}${kidsList(n)}</div>`}
function country(d){
  const t=d.tree,kids=t.c||[];
  const trunk=items(kids.map(k=>({...k,k:k.k==='float'?'milestone':k.k})),t.g||[],0,kids.length-1);
  return `<section class="hm-country" id="history-${d.id}" aria-labelledby="history-${d.id}-title"><h2 id="history-${d.id}-title" class="hm-title"${style(t)}><span class="hm-title-zh">${esc(t.t)}</span><span class="en" lang="en">${esc(d.en)} · film history</span></h2><div class="hm-fit"><div class="hm-tree"><ul class="hm-trunk"${(kids.find(k=>k.k==='era')||{}).f?` style="--trunk:${kids.find(k=>k.k==='era').f}"`:''}>${trunk}</ul></div></div></section>`;
}
main.innerHTML=`<section class="hm-intro"><h1><span class="zh" lang="zh-CN">电影史</span><span class="en" lang="en">Film history</span></h1></section>`+maps.map(country).join('');
/* connector spines: from the first to the last connected child, measured after layout */
const small=matchMedia('(max-width:760px)');
function spines(){
  main.querySelectorAll('ul.hm-kids,ul.hm-trunk').forEach(ul=>{
    const own=[...ul.querySelectorAll(':scope>li.hm-item,:scope>li.hm-group li.hm-item')].filter(li=>li.parentElement.closest('ul.hm-kids,ul.hm-trunk')===ul);
    if(!own.length){ul.style.setProperty('--st','50%');ul.style.setProperty('--sb','50%');return}
    const r=ul.getBoundingClientRect(),z=parseFloat(ul.closest('.hm-trunk>li')?.style.zoom||1)||1;
    const c=li=>{const b=(li.querySelector(':scope>.hm-branch>.hm-node')||li).getBoundingClientRect();return small.matches?b.top+Math.min(18,b.height/2):b.top+b.height/2};
    let top=c(own[0])-r.top,bot=r.bottom-c(own[own.length-1]);
    if(ul.classList.contains('hm-trunk'))top=0;else if(!small.matches){top=Math.min(top,r.height/2);bot=Math.min(bot,r.height/2)}
    ul.style.setProperty('--st',Math.max(0,top/z)+'px');ul.style.setProperty('--sb',Math.max(0,bot/z)+'px');
  });
}
/* fit, era by era: first narrow the text columns a little, then scale that era's branch; never a horizontal scrollbar */
function fit(){
  main.querySelectorAll('.hm-trunk>li').forEach(li=>{li.style.zoom='';li.style.removeProperty('--nw')});
  if(!small.matches)main.querySelectorAll('.hm-fit').forEach(box=>{
    const cw=box.clientWidth;
    box.querySelectorAll('.hm-trunk>li').forEach(li=>{
      const w=()=>li.firstElementChild.getBoundingClientRect().width;let nw=320;li.style.setProperty('--nw',nw+'px');
      while(w()>cw+1&&nw>230){nw-=10;li.style.setProperty('--nw',nw+'px')}
      while(w()>cw/.82&&nw>170){nw-=10;li.style.setProperty('--nw',nw+'px')}
      const ww=w();if(ww>cw+1)li.style.zoom=String(Math.max(.5,Math.floor(cw/ww*1000)/1000));
    });
  });
  spines();
}
let t=0;const later=()=>{clearTimeout(t);t=setTimeout(fit,120)};
fit();window.addEventListener('resize',later,{passive:true});small.addEventListener?.('change',fit);
document.fonts?.ready?.then(fit);window.addEventListener('load',fit,{once:true});
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(fit,0)));
window.historyMapFit=fit;
})();
