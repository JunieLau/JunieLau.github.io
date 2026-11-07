/* Subject-keyed book diagrams. No positional/modulo assignment of different theories. */
(()=>{'use strict';const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
window.BookStructureArt=(type,{active=-1,stages=8}={})=>{
const labels={beats:'救猫咪：十五节拍卡片 / Save the Cat: fifteen-beat sheet',cycle:'出发、历险、归返的循环 / Departure, initiation and return cycle',three:'现代三幕：建立、对抗、解决 / Modern three acts: setup, confrontation, resolution',pyramid:'弗赖塔格：五部分与居中高潮 / Freytag: five parts and central climax'};
if(!labels[type])throw new Error('Unknown book structure: '+type);
const number=(x,y,n)=>`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="currentColor" stroke="none" font-family="sans-serif" font-size="11">${n}</text>`;
let body='';if(type==='beats'){body=Array.from({length:15},(_,i)=>{const x=24+(i%5)*64,y=28+Math.floor(i/5)*51;return `<g data-beat-card="${i+1}"><rect x="${x}" y="${y}" width="56" height="39" rx="3" fill="none" stroke="${i===active?'#e64a50':'currentColor'}" stroke-width="${i===active?3:1.4}"/>${number(x+28,y+20,i+1)}</g>`}).join('');}
if(type==='cycle'){body='<circle cx="180" cy="101.5" r="71" fill="none"/><path d="M237 49l11 9-14 5M123 154l-11-9 14-5"/>';body+=Array.from({length:stages},(_,i)=>{const a=-Math.PI/2+i*2*Math.PI/stages,x=180+71*Math.cos(a),y=101.5+71*Math.sin(a);return `<circle data-cycle-stage="${i+1}" cx="${x}" cy="${y}" r="${stages>12?7:10}" fill="#111"/>${number(x,y,i+1)}`}).join('');}
if(type==='three'){body='<path d="M24 163H336M25 153C65 151 83 126 102 119S156 106 178 83S228 53 258 57S307 105 335 130"/><path d="M102 28V173M258 28V173" stroke-dasharray="4 5"/>'+number(63,190,'I')+number(180,190,'II')+number(297,190,'III');}
if(type==='pyramid'){body='<path d="M24 162H50L180 40L310 162H336M180 40V173"/><g>'+[[50,162],[115,101],[180,40],[245,101],[310,162]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="11" fill="#111"/>${number(x,y,i+1)}`).join('')+'</g>';}
return `<svg class="library-line book-structure-art" data-structure="${type}" viewBox="0 0 360 203" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(labels[type])}" fill="none" stroke="currentColor" stroke-width="1.5"><title>${esc(labels[type])}</title><rect x=".75" y=".75" width="358.5" height="201.5" rx="3" fill="none"/>${body}</svg>`;
};})();
