'use strict';
const lensWideStills=[
  {
    "file": "hidden.webp",
    "label": "12mm",
    "film": "A Hidden Life",
    "year": 2019,
    "cinematographer": "Jörg Widmer",
    "source": "https://film-grab.com/wp-content/uploads/photo-gallery/A_Hidden_Life_002.jpg?bwg=1598512351",
    "gallery": "https://film-grab.com/2020/09/07/a-hidden-life/",
    "originalResolution": [
      1280,
      536
    ],
    "resolution": [
      1000,
      419
    ],
    "match": [
      "视觉构图匹配",
      "Composition matched"
    ],
    "bytes": 85852,
    "fullFile": "hidden-full.webp",
    "filmZh": "隐秘的生活",
    "displayCropSource": [
      0,
      0,
      1280,
      536
    ],
    "cropFocus": "center"
  },
  {
    "file": "birdman.webp",
    "label": "18mm",
    "film": "Birdman",
    "year": 2014,
    "cinematographer": "Emmanuel Lubezki",
    "source": "https://film-grab.com/wp-content/uploads/photo-gallery/05 (147).jpg?bwg=1547150414",
    "gallery": "https://film-grab.com/2015/05/08/birdman/",
    "originalResolution": [
      1280,
      690
    ],
    "resolution": [
      1000,
      419
    ],
    "match": [
      "同片替代；非原板同帧",
      "Same-film alternative; not the board frame"
    ],
    "bytes": 22494,
    "fullFile": "birdman-full.webp",
    "filmZh": "鸟人",
    "displayCropSource": [
      0,
      0,
      1280,
      690
    ],
    "cropFocus": "center"
  },
  {
    "file": "wrestler.webp",
    "label": "24mm (Equiv)",
    "film": "The Wrestler",
    "year": 2008,
    "cinematographer": "Maryse Alberti",
    "source": "https://film-grab.com/wp-content/uploads/photo-gallery/38 (1219).jpg?bwg=1547475552",
    "gallery": "https://film-grab.com/2010/08/24/the-wrestler/",
    "originalResolution": [
      1024,
      426
    ],
    "resolution": [
      1000,
      419
    ],
    "match": [
      "遮挡图替代；该帧焦段未核实",
      "Replacement for covered image; exact focal length unverified"
    ],
    "bytes": 43754,
    "fullFile": "wrestler-full.webp",
    "filmZh": "摔角王",
    "displayCropSource": [
      0,
      0,
      1024,
      426
    ],
    "cropFocus": "center"
  },
  {
    "file": "toni.webp",
    "label": "32mm",
    "film": "Toni Erdmann",
    "year": 2016,
    "cinematographer": "Patrick Orth",
    "source": "https://film-grab.com/wp-content/uploads/photo-gallery/Toni_Erdmann_021.jpg?bwg=1569844321",
    "gallery": "https://film-grab.com/2020/05/12/toni-erdmann/",
    "originalResolution": [
      1280,
      696
    ],
    "resolution": [
      1000,
      419
    ],
    "match": [
      "视觉构图匹配",
      "Composition matched"
    ],
    "bytes": 111076,
    "fullFile": "toni-full.webp",
    "filmZh": "托尼·厄德曼",
    "displayCropSource": [
      0,
      0,
      1280,
      696
    ],
    "cropFocus": "bottom: preserve bench/person"
  },
  {
    "file": "1917.webp",
    "label": "40mm",
    "film": "1917",
    "year": 2019,
    "cinematographer": "Roger Deakins",
    "source": "https://film-grab.com/wp-content/uploads/photo-gallery/1917_005.jpg?bwg=1598511562",
    "gallery": "https://film-grab.com/2020/09/01/1917/",
    "originalResolution": [
      1280,
      533
    ],
    "resolution": [
      1000,
      419
    ],
    "match": [
      "视觉构图匹配",
      "Composition matched"
    ],
    "bytes": 82494,
    "fullFile": "1917-full.webp",
    "filmZh": "1917",
    "displayCropSource": [
      0,
      0,
      1280,
      533
    ],
    "cropFocus": "center"
  },
  {
    "file": "psycho.webp",
    "label": "50mm",
    "film": "Psycho",
    "year": 1960,
    "cinematographer": "John L. Russell",
    "source": "https://film-grab.com/wp-content/uploads/photo-gallery/15 (844).jpg?bwg=1547297037",
    "gallery": "https://film-grab.com/2012/12/28/psycho/",
    "originalResolution": [
      1022,
      556
    ],
    "resolution": [
      1000,
      419
    ],
    "match": [
      "同片贝茨宅夜景替代；非原板同帧",
      "Alternative night view of Bates house; not the board frame"
    ],
    "bytes": 19542,
    "fullFile": "psycho-full.webp",
    "filmZh": "惊魂记",
    "displayCropSource": [
      0,
      0,
      1022,
      556
    ],
    "cropFocus": "top: preserve roof/windows"
  },
  {
    "file": "alienhd.webp",
    "label": "75mm",
    "film": "Alien",
    "year": 1979,
    "cinematographer": "Derek Vanlint",
    "source": "https://www.bluscreens.net/uploads/1/4/8/9/14897402/alien3_orig.jpg",
    "gallery": "https://www.bluscreens.net/alien.html",
    "originalResolution": [
      1100,
      619
    ],
    "resolution": [
      1000,
      419
    ],
    "match": [
      "视觉构图匹配",
      "Composition matched"
    ],
    "bytes": 65734,
    "fullFile": "alienhd-full.webp",
    "filmZh": "异形",
    "displayCropSource": [
      0,
      74,
      1100,
      544
    ],
    "cropFocus": "center"
  },
  {
    "file": "gems.webp",
    "label": "Above 85mm",
    "film": "Uncut Gems",
    "year": 2019,
    "cinematographer": "Darius Khondji",
    "source": "https://film-grab.com/wp-content/uploads/photo-gallery/Uncut_Gems_047.jpg?bwg=1601639366",
    "gallery": "https://film-grab.com/2020/12/11/uncut-gems/",
    "originalResolution": [
      1280,
      536
    ],
    "resolution": [
      1000,
      419
    ],
    "match": [
      "视觉构图匹配",
      "Composition matched"
    ],
    "bytes": 116320,
    "fullFile": "gems-full.webp",
    "filmZh": "原钻",
    "displayCropSource": [
      0,
      0,
      1280,
      536
    ],
    "cropFocus": "center"
  }
];
const narrativeMatrix=[[1, 1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 1, 1]];
const wideFeelings=[
 ['让人物很小、山野很大，像被整个世界包围。','A small figure within a vast landscape feels surrounded by the world.'],
 ['把人和剧场同时留下，观众像身在表演空间里。','Hold the person and theatre together, as if the viewer is inside the performance space.'],
 ['留住独行人物周围的空地，让环境参与情绪。','Leave open space around a solitary figure so the environment shares the emotion.'],
 ['人物与城市保持距离，日常空间也能带出疏离。','Separate the person from the city; ordinary space can suggest estrangement.'],
 ['让身体与壕沟同时清楚，像跟人物一起越过障碍。','Keep bodies and trenches together, as if crossing the obstacle with the characters.'],
 ['把房子当作被观察的对象，窗与阴影藏住秘密。','Observe the house as a subject, with windows and shadows hiding secrets.'],
 ['横向铺开人物与休眠舱，让室内空间显得有秩序。','Spread people and cryopods across the frame to give the interior an ordered feeling.'],
 ['从远处看人，喷泉与城市的层次像挤到他身边。','Watch from a distance as fountain and city layers seem to gather around the person.']
];
const narrativeQualities=[
 ['让人物动作更夸张','Exaggerated Char. Movement'],['让小空间显得更开阔','Expand Small Space'],['前后更多地方看起来清楚','Deep Depth of Focus'],['近拍人脸更容易夸张变形','Facial Distortion @ CU'],['把环境展示出来','Showcase Environment'],['更多关注外部世界','Outer World'],['空间有前后纵深','3D Space'],['较暗环境（原图提示）','Low Light'],['保留人物处境与背景','Context'],['画面较不显晃动','Camera Stability (Less Shake)'],['亲近人物的观察','Humanist'],['熟悉、日常的感觉','Familiar'],['更多关注人物内心','Inner World'],['前后层次像靠在一起','Compress Space'],['画面更像平面图案','2D Design'],['清楚范围窄、背景更易模糊','Shallow DOF'],['少交代周围环境','Conceal Environment'],['陌生、非日常的感觉','Unfamiliar']
];
function renderLensWide(){
 const labels=['&lt;12mm','18mm','24mm','32mm','40mm','50mm','75mm','&gt;100mm'];
 const arrows=[[['像身在其中','insider'],['像在外面观察','outsider']],[['前后都较清楚','deep focus'],['清楚范围较窄','shallow focus']],[['空间像向外展开','expansion'],['前后像挤在一起','compression']]];
 return `<section id="lens-wide" class="cine-section lens-wide-section"><p class="eyebrow">03 · Film Reframed</p>${pair('广角镜头怎么选：同一个远景，不同焦段','Choosing a lens for a wide shot: different focal lengths','h2')}${para('这里的“远景”是人物在画面里的大小，不等于一定用广角镜头。按你的讲义顺序放大看片：从 12mm 到 85mm 以上，都能拍远景。','A wide shot describes the subject’s size in the frame, not necessarily a wide-angle lens. Follow your board from 12mm to above 85mm: each can frame a wide shot.')}${para('重要：这些是不同电影、不同机位与画幅的片例，不是同一场景的科学对照。焦段标签沿用课堂板，未独立核实每帧实拍焦段；《摔角王》的 24mm 等效只是替代栏位，不是该帧参数声明。','Important: these are different films, viewpoints and capture formats, not a controlled comparison. Focal labels follow the course board and are not independently verified for each frame. The Wrestler occupies the 24mm-equivalent replacement slot; that is not a verified specification for this frame.')}${pair('板上统一为约 2.39:1 的等大裁切；点击看完整原图。','All board images use identical approximately 2.39:1 crops; select one to view the full original.','p','lens-wide-note')}<div class="lens-wide-grid">${lensWideStills.map((d,i)=>`<figure><h3>${d.label==='Above 85mm'?'85mm+':d.label==='24mm (Equiv)'?'24mm*':d.label}</h3><a class="wide-still-link" href="./assets/lens-wide/${d.fullFile}" data-wide-still="${i}" aria-label="${d.film} (${d.year}) — ${d.label}"><img src="./assets/lens-wide/${d.file}" width="1000" height="419" alt="${d.film}: ${wideFeelings[i][1]}" loading="lazy"></a><figcaption><strong>${pair(d.filmZh+' ('+d.year+')',d.film+' ('+d.year+')')}</strong>${cell(wideFeelings[i])}</figcaption></figure>`).join('')}</div><div id="narrative-chart" class="narrative-chart-section">${pair('按叙事感觉选镜头','Lens selection by narrative qualities','h3')}${para('Film Reframed 原图的 18 行与 144 格标记，逐格转为可读表格。彩色表示原图标记，暗格表示原图未标记；不是优劣评分，也不是只能这样拍。','The 18 rows and 144 cells from Film Reframed are rebuilt as a readable table. Color means marked in the original; dark means unmarked. These are not scores or rules.')}${para('读图边界：焦段本身不能决定低光表现、景深、脸部变形或心理感受。还要固定或说明画幅、机位距离、光圈、对焦位置与构图条件；低光尤其取决于透光量、曝光、感光设置和照明。','Limits: focal length alone does not determine low-light performance, depth of field, facial distortion or emotion. State capture format, viewpoint distance, aperture, focus and framing. Low-light performance particularly depends on transmission, exposure, sensitivity settings and lighting.')}<div class="narrative-scroll" tabindex="0" role="region" aria-label="Film Reframed lens narrative chart"><div class="narrative-arrows">${arrows.map((a,i)=>`<div class="narrative-arrow arrow-${i}"><span>${cell(a[0])}</span><span class="arrow-line" aria-hidden="true">↔</span><span>${cell(a[1])}</span></div>`).join('')}</div><table class="narrative-table"><thead><tr class="narrative-bands"><th>${pair('表达倾向','Narrative quality')}</th><th colspan="2" class="chart-wide">${pair('风格化','STYLIZED')}</th><th colspan="4" class="chart-natural">${pair('自然','NATURAL')}</th><th colspan="2" class="chart-long">${pair('风格化','STYLIZED')}</th></tr><tr><th>${pair('焦段 →','Focal length →')}</th>${labels.map(l=>`<th scope="col">${l}</th>`).join('')}</tr></thead><tbody>${narrativeQualities.map((q,r)=>`<tr><th scope="row">${cell(q)}</th>${narrativeMatrix[r].map((v,c)=>`<td class="${v?(c<2?'chart-wide':c<6?'chart-natural':'chart-long'):'chart-empty'}"><span class="chart-screen-reader">${pair(v?'原图有标记':'原图无标记',v?'Marked in original':'Unmarked in original')}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div>${pair('图表来源：Film Reframed，用户提供的《lens selection by narrative qualities》讲义。中文为面向导演的白话翻译，彩色格与原 PDF 一致。剧照版权归各影片权利人，公开来源不等于开放授权。','Chart: Film Reframed, user-supplied “lens selection by narrative qualities” handout. Chinese labels are plain-language translations; filled cells match the source PDF. Still rights remain with the films’ rights holders; public availability is not an open license.','p','lens-wide-note')}</div><details class="lens-wide-credits"><summary>${pair('图片来源与课堂标签说明','Image credits and course-label notes')}</summary>${para('焦段标签沿用 Film Reframed 课堂板，未独立核实每帧实拍焦段；24mm* 表示等效栏位，《摔角王》是遮挡图的替代，不是该帧焦段已验证。板上 8 张均为 1000×419px；原图未放大，完整原图用于点击查看。','Focal labels follow the Film Reframed course board and are not independently verified for each frame. 24mm* is the equivalent-focal-length slot; The Wrestler replaces the covered image without a verified focal claim. All eight board crops are 1000×419px; originals are not upscaled and remain available on click.')}<ol>${lensWideStills.map(d=>`<li><strong>${d.film} (${d.year}) · ${d.label}</strong> · ${pair('摄影：'+d.cinematographer,'DP: '+d.cinematographer)} · ${d.originalResolution.join(' × ')} · ${cell(d.match)} <a href="${d.gallery}" target="_blank" rel="noopener">${pair('来源 ↗','Source ↗')}</a></li>`).join('')}</ol><a href="./assets/lens-wide/CREDITS.md">${pair('完整来源记录','Full provenance record')}</a></details><dialog id="lens-wide-lightbox" class="lens-wide-lightbox"><button type="button" class="lightbox-close">${pair('关闭 ×','Close ×')}</button><img alt=""><p></p></dialog></section>`;
}
function setupLensWide(){
 const dialog=document.getElementById('lens-wide-lightbox');
 document.querySelectorAll('[data-wide-still]').forEach(a=>a.addEventListener('click',e=>{
  if(typeof dialog.showModal!=='function')return;
  e.preventDefault();const d=lensWideStills[Number(a.dataset.wideStill)],im=dialog.querySelector('img');im.src=a.href;im.alt=d.film+' ('+d.year+') — '+d.label;dialog.querySelector('p').textContent=im.alt+' · '+d.originalResolution.join(' × ');dialog.showModal();
 }));
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
}
