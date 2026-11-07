'use strict';
// Language-neutral values stay visible once in bi, zh and en modes alike.
const pair=(z,e,tag='span',cls='')=>String(z).trim()===String(e).trim()
 ?`<${tag} class="${cls}"><span class="language-neutral">${String(z).trim()}</span></${tag}>`
 :`<${tag} class="${cls}"><span class="zh" lang="zh-CN">${z}</span><span class="en" lang="en">${e}</span></${tag}>`;
const para=(z,e)=>pair(z,e,'p');
const links=keys=>keys.map((k,i)=>`<a class="source-link" href="${S[k]}" target="_blank" rel="noopener">${pair('来源 '+(i+1)+' ↗','Source '+(i+1)+' ↗')}</a>`).join('');
const cell=v=>Array.isArray(v)?pair(v[0],v[1]):v;
const hints=()=>pair('表格可左右滑动；每行来源可直接打开。','Scroll tables horizontally; open the sources linked in each row.','p','table-hint');
const plain=v=>(Array.isArray(v)?v.join(' '):v).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const short=v=>Array.isArray(v)?v.map(x=>x.split(/[；;。]/)[0]):v;
const compareSpecs={};
function table(id,headers,rows,widths){
 const kind=id.split('-')[0], z=kind==='camera'?'摄影机':kind==='lens'?'镜头':kind==='mood'?'题材与情绪':'导演';
 let groups=rows.map((r,i)=>kind==='camera'?cameraCompare[i][0]:kind==='lens'?(i<2?'ARRI / ZEISS':i<4?'Cooke':i<6?'ZEISS':i===6?'Leitz':i===7?'Panavision':i<10?'Atlas':i===10?'Cooke':i===11?'Canon':'Sigma'):kind==='mood'?(i<2?'古装与群像 / Period & ensemble':i<7?'叙事与氛围 / Narrative & atmosphere':'人物与机动 / Character & mobility'):directorCompare[i].slice(0,2).join(' / '));
 let cols=kind==='camera'?[['摄影机／系统','Camera / system'],['画幅／尺寸','Format / dimensions'],['采样／记录','Sampling / recording'],['动态范围¹','DR¹ · stops'],['帧率 fps²','Frame rate fps²'],['用途／重点','Use / focus'],['完整资料','Full entry']]:[headers[0],headers[1],kind==='director'?['视觉语汇','Visual language']:headers[2],headers[3],['完整资料','Full entry']];
 let values=rows.map((r,i)=>{
 if(kind==='camera'){
  const split=r[1].map(x=>x.split('<br>'));return [r[0],cameraFormatOverride[i]||split.map(x=>x[0]),cameraRecording[i]||split.map(x=>x[1]||'—'),cameraCompare[i][1],cameraCompare[i][2],cameraCompare[i][3]];
 }
 if(kind==='lens')return [r[0],r[1],short(r[2]),short(r[3])];
 if(kind==='director')return [r[0],r[1],directorCompare[i][2],short(r[3])];
 return [r[0],r[1],short(r[2]),short(r[3])];
 });
 compareSpecs[id]={headers,rows,groups,cols,values,kind};
 return `<div class="compare-tools" data-for="${id}"><label>${pair('搜索'+z+'（含完整资料）','Search '+kind+' entries (including full notes)')}<input id="${kind}-search" type="search" autocomplete="off"></label><label>${pair('品牌／类别','Brand / category')}<select id="${kind}-group"><option value="">${pairOption('全部','All')}</option>${[...new Set(groups)].map(g=>`<option value="${g}">${g}</option>`).join('')}</select></label><output id="${kind}-count" aria-live="polite"></output></div>`+pair('点击列名排序；按品牌／类别分组。完整参数、适用边界及来源全部直接列在每个条目下方；搜索会查找全部内容。','Select a column heading to sort within groups. Full specifications, limitations, and sources are always visible beneath each entry and remain searchable.','p','table-hint')+(kind==='camera'?pair('¹ 动态范围为厂家标称，不是同条件排名；— 表示原资料未列或不适用。² 帧率须同时阅读分辨率、画幅、编码和授权条件；不是所有模式的统一最高值。卡口未统一核对，不作推定，请向租赁方确认。','¹ Manufacturer-rated DR is not a controlled ranking; — means not listed or not applicable. ² Read fps with resolution, crop, codec and licensing, not as an unconditional maximum. Mounts are not uniformly verified; confirm the rental configuration.','p','table-hint'):'')+`<div class="table-wrap comparison-scroll" tabindex="0" role="region" aria-label="${z} / ${kind} comparison"><table id="${id}" class="reference-table compact-compare ${kind}-compare"><colgroup>${(kind==='camera'?[18,17,13,9,19,16,8]:[19,25,24,24,8]).map(w=>`<col style="width:${w}%">`).join('')}</colgroup><thead><tr>${cols.map((h,i)=>`<th scope="col"${i<cols.length-1?' aria-sort="none"':''}>${i<cols.length-1?`<button type="button" data-sort="${i}">${cell(h)}<span aria-hidden="true" class="sort-arrow"> ↕</span></button>`:cell(h)}</th>`).join('')}</tr></thead><tbody></tbody></table><div class="table-empty" hidden>${pair('没有匹配条目。','No matching entries.')}</div></div>`;
}
function pairOption(z,e){return String(z).trim()===String(e).trim()?String(z).trim():z+' / '+e}
function groupNames(group){
 if(group==='Film / 胶片')return ['胶片','Film'];
 if(group==='ARRI / ZEISS')return [group,group];
 const parts=group.split(' / ');return parts.length===2?parts:[group,group];
}
function updateComparisonLanguage(){
 const mode=document.documentElement.dataset.mode;
 document.querySelectorAll('.compare-tools option').forEach(o=>{const names=o.value?groupNames(o.value):['全部','All'];o.textContent=mode==='zh'?names[0]:mode==='en'?names[1]:names[0]===names[1]?names[0]:names.join(' / ')});
}

const section=(id,n,z,e,body)=>`<section id="${id}" class="cine-section"><p class="eyebrow">${n}</p>${pair(z,e,'h2')}${body}</section>`;
const cameraHeaders=[['摄影机／系统','Camera / system'],['画幅与采样','Format & sampling'],['已核对规格','Verified specifications'],['如何使用／边界','Use & boundaries'],['依据','Evidence']];
const lensHeaders=[['镜头系列','Lens family'],['覆盖与范围','Coverage & range'],['光圈／特点','Aperture / features'],['注意事项','Caveats'],['依据','Evidence']];
const status=s=>pair(s==='correct'?'确认':s==='corrected'?'已修正':'无法客观验证',s==='correct'?'Confirmed':s==='corrected'?'Corrected':'Unverifiable','span','status '+s);
const cameraSection=section('cameras','01','摄影机与成像系统','Cameras & imaging systems',para('先选实际记录窗口，再谈镜头与交付。动态范围为厂家标称，不同品牌测试方法不一，不能直接当作同条件排名；最高帧率也必须与分辨率、画幅、编码、介质和授权一起读。此表是教学参考，不是实时租赁库存。','Choose the recording window before optics and delivery. Dynamic range is manufacturer-rated; differing test methods make these unsuitable as a controlled cross-brand ranking. Read frame rates alongside resolution, crop, codec, media, and licenses. This is a learning reference, not live rental inventory.')+table('camera-table',cameraHeaders,cameras,[17,21,25,29,8]));
const lensSection=section('lenses','02','镜头：规格与性格分开读','Lenses: separate specs from character',para('T 值描述实际透光效率，不等于景深的全部。焦段数量以当前官方列表为准；同焦段特殊版不应重复算成新焦段。“暖、柔、冷、史诗”只有在明确照明、曝光、滤镜和调色条件下才有可比较的意义。','T-stop describes transmitted light, not every aspect of depth of field. Counts follow current official listings; a special variant at the same focal length is not another distinct focal length. Warm, gentle, cool, and epic become comparable only with defined lighting, exposure, filtration, and grade.')+table('lens-table',lensHeaders,lenses,[18,21,23,30,8])+`<div class="callout">${pair('变形不是一种万能滤镜','Anamorphic is not a universal filter','h3')}${para('2×、1.5× 是压缩比，不是最终宽高比。解挤后宽高比约为“记录窗口宽 ÷ 高 × 压缩比”，再按交付裁切。椭圆焦外和水平眩光依设计、对焦距离、光圈与光源而变，不保证自动出现，更不是一定呈蓝色。大画幅机身配 S35 镜头时，先确认裁切、暗角与分辨率。','2× and 1.5× are squeeze ratios, not delivery aspect ratios. Desqueezed ratio is approximately recorded width ÷ height × squeeze, before delivery cropping. Oval bokeh and horizontal flares vary with design, focus, aperture, and source; they are not guaranteed or necessarily blue. Test crop, vignetting, and resolution when combining a large-format body with S35 optics.')}</div>`);
const moodSection=section('moods','03','从情绪出发，而非从品牌出发','Begin with the feeling, not the brand',para('下面是原创的试拍起点，不是行业唯一正确的组合，也不是声称某位导演实际用过它。规格依据来自相应器材来源，组合与调度建议属于课程延伸。先定人物距离、时间感与空间压力，再看预算、覆盖、重心、噪声、跟焦、收声和后期是否支持。','These are original starting points for tests, not exclusive industry prescriptions or claims about a director’s actual equipment. Product sources support the specifications; packages and blocking suggestions are course exercises. Decide distance, duration, and spatial pressure first, then test budget, coverage, balance, noise, focus, sound, and post.')+table('mood-table',[['题材／情绪','Genre / mood'],['试拍组合','Test package'],['调度与测试','Staging & tests'],['不要误读','Do not assume'],['依据','Evidence']],moods,[15,22,27,28,8]));
const directorSection=section('directors','04','研究一部作品，不复制一个标签','Study a film, not a label',para('风格来自导演、摄影指导、设计、演员、剪辑与具体条件的合作。以下片名与摄影署名有资料依据；“如何转译”是本课程的分析练习，不是导演的原话，也不覆盖其全部作品。先看场景，再学其决策。','Style emerges from collaboration among director, cinematographer, designers, performers, editors, and circumstances. Film and DP credits are sourced; translation exercises are our analysis, not the directors’ words or definitions of entire careers. Watch the scene before borrowing the decision.')+table('director-table',[['导演','Director'],['代表作品 · 摄影指导','Reference film · DP'],['可观察的视觉语汇','Observable visual language'],['转译成你的练习','Translate into an exercise'],['依据','Evidence']],directors,[14,24,27,27,8]));
document.querySelector('#cine-main').innerHTML=`<section class="cine-intro"><p class="eyebrow">${pair('Junie 的电影手记 · 第二卷','Junie’s film notebook · Volume 02')}</p>${pair('让画面成为选择。','Make the image a choice.','h1')}${pair('从成像系统到镜头，再从导演的作品走向自己的视觉语言。先核对事实，再讨论感觉。','From imaging systems to lenses, and from filmmakers’ work to a visual language of your own. Check the facts first. Then discuss the feeling.','p','lede')}<div class="cine-stats"><div><strong>${cameras.length}</strong>${pair('成像系统条目','Imaging system entries')}</div><div><strong>${lenses.length}</strong>${pair('镜头系列','Lens families')}</div><div><strong>${moods.length}</strong>${pair('情绪试拍方案','Mood test proposals')}</div><div><strong>${directors.length}</strong>${pair('导演研究','Director studies')}</div></div></section><nav class="cine-nav" aria-label="摄影章节 / Image chapters">${[['cameras','摄影机','Cameras'],['lenses','镜头','Lenses'],['moods','题材与情绪','Mood & genre'],['directors','导演视觉','Directors']].map((n,i)=>`<a href="#${n[0]}">${pair('0'+(i+1)+' · '+n[1],n[2])}</a>`).join('')}</nav><div class="cine-body">${section('principles','00','先记住三件事','Three things before the tables',`<div class="cine-principles"><article class="card">${pair('透视来自机位','Viewpoint shapes perspective','h3')}${para('画幅与焦距改变取景范围；与人物的距离改变空间关系。比较器材前，先说清是否匹配构图和机位。','Format and focal length alter field of view; distance changes spatial relations. State framing and viewpoint conditions before comparing systems.')}</article><article class="card">${pair('参数不是风格','Specs are not a style','h3')}${para('17 档、8K、T1.3 与 2× 都是有条件的技术信息，不会自动带来真实、温柔、冷酷或史诗感。','Seventeen stops, 8K, T1.3, and 2× are conditional technical information, not automatic realism, tenderness, coldness, or epic scale.')}</article><article class="card">${pair('先试一个场景','Test one scene first','h3')}${para('用同一位演员、同一光线和同一调色比较。让试拍回答一个叙事问题，而不是只寻找“最电影感”的器材。','Compare the same actor, light, and grade. Make a test answer a story question, not merely search for the most cinematic equipment.')}</article></div>`)}${cameraSection}${lensSection}${moodSection}${directorSection}</div>`;
// Keep the complete previous reference page, with corrections integrated into the matching entries, below the guide.
const technicalContent=document.querySelector('#cine-main').innerHTML;
document.querySelector('#cine-main').innerHTML=renderDirectorGuide()+`<section id="technical-reference" class="technical-appendix cine-section"><h2>${pair('给摄影师的完整参数','Full technical reference for the cinematographer')}</h2>${para('这里保留参数、试拍提醒、筛选和各条目的来源；已将需要的修正放回相应条目。上方建议不是器材能自动产生的风格，租赁前请与摄影师一起确认。','Specifications, testing notes, filters and individual source links remain here; corrections are integrated into the matching entries. The proposals above are not automatic equipment looks; confirm configurations with your cinematographer before renting.')}<div class="technical-content">${technicalContent}</div></section>`;
document.getElementById('focal-guide').insertAdjacentHTML('afterend',renderLensWide());
document.querySelector('.director-nav a[href="#focal-guide"]').insertAdjacentHTML('afterend',`<a href="#lens-wide">${pair('远景片例与叙事图表','Wide-shot stills & narrative chart')}</a>`);
setupLensWide();

function setMode(m){document.documentElement.dataset.mode=m;updateComparisonLanguage();document.documentElement.lang=m==='en'?'en':'zh-CN';document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===m));try{localStorage.setItem('film-learning-language',m)}catch(e){}}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.lang)));setMode(document.documentElement.dataset.mode);
function setupComparison(id,spec){
 const {headers,rows,groups,cols,values,kind}=spec,t=document.getElementById(id),body=t.tBodies[0],tools=document.querySelector(`[data-for="${id}"]`),input=tools.querySelector('input'),select=tools.querySelector('select'),count=tools.querySelector('output');
 let sort=-1,direction=1;
 function paint(){
  const term=input.value.toLocaleLowerCase().trim(),indices=rows.map((r,i)=>i).filter(i=>(!select.value||groups[i]===select.value)&&plain(rows[i].slice(0,-1).flat()).toLocaleLowerCase().includes(term));
  let out='';
  [...new Set(groups)].forEach(group=>{
   const items=indices.filter(i=>groups[i]===group);
   if(!items.length)return;
   if(sort>=0)items.sort((a,b)=>direction*plain(values[a][sort]).localeCompare(plain(values[b][sort]),'zh-CN',{numeric:true}));
   out+=`<tr class="compare-group"><th colspan="${cols.length}" scope="colgroup">${cell(groupNames(group))} <span class="group-count">· ${items.length}</span></th></tr>`;
   items.forEach(i=>{
    out+=`<tr class="compare-entry" data-entry="${i}">${values[i].map((v,c)=>c===0?`<th scope="row" class="row-heading">${cell(v)}</th>`:`<td${kind==='camera'&&c===3?' class="numeric"':''}>${cell(v)}</td>`).join('')}<td>${pair('资料见下行','Notes below')}</td></tr><tr class="compare-detail" id="${id}-detail-${i}"><td colspan="${cols.length}"><div class="entry-detail"><h3>${cell(rows[i][0])}</h3><dl>${rows[i].slice(1,-1).map((v,j)=>`<div><dt>${cell(headers[j+1])}</dt><dd>${cell(v)}</dd></div>`).join('')}</dl><div class="entry-sources">${links(rows[i][rows[i].length-1])}</div></div></td></tr>`;
   });
  });
  body.innerHTML=out;count.textContent=indices.length+' / '+rows.length;t.parentElement.querySelector('.table-empty').hidden=indices.length!==0;
 }
 input.addEventListener('input',paint);select.addEventListener('change',paint);
 t.addEventListener('click',event=>{
  const sorter=event.target.closest('[data-sort]');
  if(sorter){const next=Number(sorter.dataset.sort);direction=sort===next?-direction:1;sort=next;t.querySelectorAll('thead th[aria-sort]').forEach((h,i)=>h.setAttribute('aria-sort',i===sort?(direction===1?'ascending':'descending'):'none'));t.querySelectorAll('.sort-arrow').forEach((a,i)=>a.textContent=i===sort?(direction===1?' ↑':' ↓'):' ↕');paint();}
 });
 paint();
}
Object.entries(compareSpecs).forEach(([id,spec])=>setupComparison(id,spec));
