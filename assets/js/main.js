/* Junie Lau — v9d multi-page. Home: billboard ring of works — sharp, full colour, drag / swipe / list-hover / hover-zoom / idle drift. */
(function(){
  const JL = window.JL || {}, J2 = window.JL2 || {};
  const BASE = "assets/";
  const $ = (s, r=document) => r.querySelector(s), $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TOUCH = matchMedia("(hover:none)").matches;
  /* ---------- language ---------- */
  let LANG = "en"; try { LANG = localStorage.getItem("jl-lang") === "zh" ? "zh" : "en"; } catch(e) {}
  const ZH = () => LANG === "zh";
  const hooks = [];
  const T = (en, zh) => ZH() ? zh : en;
  function applyLang(){
    document.documentElement.lang = ZH() ? "zh-CN" : "en";
    document.documentElement.classList.toggle("is-zh", ZH());
    $$("[data-zh]").forEach(el => { if (el.dataset.en === undefined) el.dataset.en = el.innerHTML; el.innerHTML = ZH() ? el.dataset.zh : el.dataset.en; });
    $$(".langs button").forEach(b => b.classList.toggle("on", b.dataset.lang === LANG));
    $$("[data-zh-t]").forEach(el => { if (el.dataset.enT === undefined) el.dataset.enT = el.textContent; el.textContent = ZH() ? el.dataset.zhT : el.dataset.enT; });
    hooks.forEach(f => f());
  }
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest(".langs button"); if (!b) return;
    LANG = b.dataset.lang; try { localStorage.setItem("jl-lang", LANG); } catch(e) {}
    applyLang();
  });
  const PA = (JL.projects || []).map((p, o) => ({ p, o })).sort((a, b) => (parseInt(b.p.year) || 0) - (parseInt(a.p.year) || 0) || a.o - b.o).map(x => x.p); /* newest → oldest everywhere */
  const MOREIDS = ((window.JL2 || {}).filmMore || []).map(v => v.pid).filter(Boolean);
  const P = PA.filter(p => MOREIDS.indexOf(p.id) < 0); /* main film list; projects moved into "More films" keep their work pages (PA) */
  const pTitle = p => ZH() ? (p.title_zh || p.title) : p.title;
  const pRole = p => ZH() ? (p.role_zh || p.role) : p.role;
  const pNote = p => ZH() ? (p.note_zh || p.note) : p.note;
  const stillsOf = id => (JL.frames || []).filter(f => f.pid === id);
  const clipsOf = id => (JL.clips || []).filter(f => f.pid === id);
  /* ---------- lightbox ---------- */
  const lb = $(".lb"); let gset = null, gi = 0;
  function openLB(h, title, mode){ $(".frame", lb).innerHTML = h; $(".t", lb).textContent = title || ""; lb.classList.toggle("img", mode === "img"); lb.classList.add("on"); document.documentElement.classList.add("lbopen"); }
  function ytURL(yt, start){ return "https://www.youtube-nocookie.com/embed/" + yt + "?autoplay=1&rel=0&modestbranding=1&playsinline=1" + (start ? "&start=" + start : ""); }
  function play(yt, title, start, vimeo){
    if (!yt && !vimeo) return; gset = null;
    const url = vimeo ? "https://player.vimeo.com/video/" + vimeo + "?autoplay=1&title=0&byline=0&portrait=0&dnt=1&playsinline=1" : ytURL(yt, start);
    openLB('<iframe src="' + url + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>', title, "video");
  }
  function showImg(){ const it = gset[gi]; openLB('<img src="' + BASE + it.f + '" alt="">', (gi + 1) + " / " + gset.length + (it.c ? "  ·  " + it.c : ""), "img"); }
  function viewImg(set, i){ gset = set; gi = i; showImg(); }
  function step(d){ if (!gset) return; gi = (gi + d + gset.length) % gset.length; showImg(); }
  function close(){ lb.classList.remove("on","img"); $(".frame", lb).innerHTML = ""; gset = null; document.documentElement.classList.remove("lbopen"); }
  if (lb) {
    lb.addEventListener("click", e => { if (e.target.closest(".prev")) return step(-1); if (e.target.closest(".next")) return step(1); if (e.target === lb || e.target.closest(".x") || (gset && e.target.classList.contains("frame"))) close(); });
    document.addEventListener("keydown", e => { if (!lb.classList.contains("on")) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });
    let sx = null;
    lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive:true });
    lb.addEventListener("touchend", e => { if (sx === null || !gset) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); sx = null; }, { passive:true });
  }
  /* ---------- menu + socials + counts ---------- */
  const burger = $(".burger"), mm = $(".mmenu");
  if (burger && mm) {
    const set = on => { document.documentElement.classList.toggle("menu", on); burger.setAttribute("aria-expanded", on); mm.setAttribute("aria-hidden", !on); };
    burger.addEventListener("click", () => set(!document.documentElement.classList.contains("menu")));
    mm.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
  }
  $$(".soc").forEach(el => {
    const lab = el.classList.contains("lab");
    el.innerHTML = (J2.social || []).map(s => '<a href="' + s.u + '" target="_blank" rel="noopener" aria-label="' + esc(s.n) + '" title="' + esc(s.n) + '"><img src="' + BASE + s.i + '" alt=""' + (s.i.indexOf("xiaohongshu") > -1 ? ' class="xhs"' : '') + '>' + (lab ? '<span>' + esc(s.n) + '</span>' : '') + '</a>').join("");
  });
  $$("[data-count]").forEach(el => { const k = el.dataset.count, a = k === "projects" ? P : J2[k]; if (a) el.textContent = String(a.length).padStart(2, "0"); });

  /* =========================================================
     HOME — ring of works (v9b). 2D-projected billboard ring: every frame faces the viewer,
     front frame renders at exactly 1:1 scale (no 3D resampling), no blur, no overlays.
     ========================================================= */
  const fold = $(".fold");
  if (fold) {
    const ringEl = $(".ring", fold), small = matchMedia("(max-width:760px)").matches;
    /* backdrop (option 5, 剧照暗场): sharp full-colour stills of the front work, slow crossfade loop, dimmed by .bgx .shade (never blurred).
       Each still is fully decoded before it fades in over the previous one, so there is never a black frame. */
    const bgx = $(".bgx", fold), bgHost = bgx && $(".still", bgx);
    const BGDWELL = 4500, BGFADE = 1600;
    const BGSET = {   /* real frames from each film (stills-for-site); chanel-15 has motion blur in the source and is never used */
      goldfish: ["bg/goldfish-2.jpg", "bg/goldfish-1.jpg", "bg/goldfish-3.jpg"],
      zhengxie: ["bg/zhengxie-1.jpg", "bg/zhengxie-2.jpg", "bg/zhengxie-3.jpg"],
      euler: ["bg/euler-1.jpg", "bg/euler-4.jpg", "bg/euler-2.jpg", "bg/euler-3.jpg"],
      void: ["bg/void-2.jpg", "bg/void-1.jpg", "bg/void-3.jpg"],
      mother: ["bg/mother-2.jpg", "bg/mother-3.jpg", "bg/mother-1.jpg"],
      thermal: ["bg/thermal-1.jpg", "bg/thermal-4.jpg", "bg/thermal-2.jpg", "bg/thermal-3.jpg"],
      chanel: ["frames/cf_23_tarsem-system_chanel-spec_chanel-20.jpg", "frames/cf_26_tarsem-system_chanel-spec_chanel-hall.jpg", "frames/cf_02_tarsem-system_chanel-spec_chanel-premiere.jpg"]
    };
    const bgList = w => {
      if (BGSET[w.p.id]) return BGSET[w.p.id];
      const f = (JL.frames || []).filter(x => x.pid === w.p.id && !/chanel-15/.test(x.img)).map(x => x.img);
      const s = f.length > 1 ? [f[1], f[0]].concat(f.slice(2)) : f;   /* keep the existing lead still first */
      return s.length ? s.slice(0, 3) : [w.p.img];                     /* no stills at all: its own cover */
    };
    if (bgHost && !document.getElementById("jl-ring-css")) document.head.insertAdjacentHTML("beforeend", '<style id="jl-ring-css">.bgx .still{background:none}.bgx .still img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 40%;opacity:0;transition:opacity ' + BGFADE + 'ms ease-in-out;will-change:opacity;transform:translateZ(0)}.bgx .still img.on{opacity:1}.p-home .rail.tight a{padding-top:3px;padding-bottom:3px}.rc .dm{position:absolute;inset:calc(-2px * var(--ek));background:#000;opacity:0;pointer-events:none;will-change:opacity}</style>');
    const bgCache = {};
    const bgImg = src => bgCache[src] || (bgCache[src] = new Promise(res => {
      const im = new Image(), ok = () => res(im); im.alt = ""; im.src = BASE + src;
      (im.decode ? im.decode() : Promise.reject()).then(ok, () => { if (im.complete && im.naturalWidth) ok(); else { im.onload = ok; im.onerror = () => res(null); } });
    }));
    let bgW = null, bgI = 0, bgTok = 0, bgT = 0, bgD = 0, bgTop = null;
    const bgShow = (src, tok) => bgImg(src).then(im => {
      if (!im || tok !== bgTok || im === bgTop) return;
      im.classList.remove("on"); bgHost.appendChild(im);           /* newest layer on top, old one stays opaque underneath */
      requestAnimationFrame(() => requestAnimationFrame(() => im.classList.add("on")));
      const old = bgTop; bgTop = im;
      if (old) setTimeout(() => { if (old !== bgTop && old.parentNode) { old.classList.remove("on"); old.remove(); } }, BGFADE + 80);
    });
    const bgCycle = tok => {
      const L = bgList(bgW); if (L.length < 2 || RM) return;
      bgImg(L[(bgI + 1) % L.length]);                                /* decode the next still during the dwell */
      bgT = setTimeout(() => { if (tok !== bgTok) return; bgI = (bgI + 1) % L.length; bgShow(L[bgI], tok).then(() => { if (tok === bgTok) bgCycle(tok); }); }, BGDWELL + BGFADE);
    };
    const BGX = w => {
      if (!bgHost || w === bgW) return;
      bgW = w; const tok = ++bgTok; clearTimeout(bgT); clearTimeout(bgD);
      const L = bgList(w); fold.classList.toggle("bg-cov", L[0] === w.p.img);   /* covers carry title type: dim a little more */
      const go = () => {
        if (tok !== bgTok) return; bgI = 0;
        bgShow(L[0], tok).then(() => { if (tok === bgTok) bgCycle(tok); });
        const k = W.indexOf(w); [1, -1].forEach(d => bgImg(bgList(W[(k + d + W.length) % W.length])[0]));   /* warm the neighbours */
      };
      bgTop ? (bgD = setTimeout(go, 140)) : go();                  /* fast spins skip the works flying past */
    };
    const ACC = ["#ff4f8b", "#ffc531", "#13c8a4", "#ff3dd2", "#ff8a00", "#7b5cff"];
    const W = P.map((p, o) => ({ p, o })).sort((a, b) => (parseInt(b.p.year) || 0) - (parseInt(a.p.year) || 0) || a.o - b.o).map(({ p }, i) => ({ p, img: BASE + p.img, col: ACC[i % ACC.length] })); /* newest → oldest */
    const N = W.length, STEP = 360 / N;
    const cards = W.map((w, i) => {
      const a = document.createElement("a"); a.className = "rc"; a.href = "work-" + w.p.id + ".html";
      a.style.setProperty("--c", w.col);
      a.innerHTML = '<img src="' + w.img + '" alt="" draggable="false" width="1280" height="720"><b class="no">' + String(i + 1).padStart(2, "0") + '</b><span class="dm"></span><span class="lb2"><i></i><em>' + w.p.year + '</em></span>';
      a.addEventListener("pointerdown", e => { ptype = e.pointerType; });
      a.addEventListener("click", e => {
        if (moved > 6) { e.preventDefault(); return; }
        // touch / pen: first tap enlarges, second tap on the same cover opens the work
        if (ptype !== "mouse" && hover !== i) { e.preventDefault(); hover = i; idle = performance.now(); }
      });
      a.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") { hover = i; idle = performance.now(); } });
      a.addEventListener("pointerleave", e => { if (e.pointerType === "mouse" && hover === i) hover = -1; });
      ringEl.appendChild(a);
      return { el: a, dm: $(".dm", a), i, ang0: i * STEP, k: 1 };
    });
    function labels(){ cards.forEach(c => { $("i", c.el).textContent = pTitle(W[c.i].p); }); }
    const ENL = 1.7, DPR = Math.max(1, window.devicePixelRatio || 1), SRCW = 1280;   // official maxres covers are 1280 px wide
    let ew = 0, eh = 0, ptype = "mouse";
    let cw = 0, R = 0, PERSP = 0, cx = 0, cy = 0, TILT = 0;
    function layout(){
      const w = fold.clientWidth, h = fold.clientHeight;
      if (small) {
        cw = Math.round(w * .8); R = Math.round(w * 1.75); PERSP = R * 2.2; cx = w / 2; TILT = .15; cy = h * .50 - R * TILT;
        /* mobile: drop the ring just enough that no cover (at any drift angle) rises into the credit staircase */
        const cr = $(".hd .cred", fold);
        if (cr) {
          const fb = fold.getBoundingClientRect(), lim = cr.getBoundingClientRect().bottom - fb.top + 14;   /* 14 px breathing gap */
          const reach = c => { let m = -1e9; for (let a = 0; a < 360; a += 1) { const th = a * Math.PI / 180, z = R * Math.cos(th), off = ((a + 540) % 360) - 180;
            const s = PERSP / (PERSP + R - z) * (.72 + .28 * Math.exp(-(off / 20) * (off / 20))); m = Math.max(m, s * (c * 9 / 32 + 4) - z * TILT * s); } return m; };   /* +4: frame outline */
          /* short screens: if the dropped ring would sink well under the caption (≈150 px tall, 90 px off the bottom), scale it down instead */
          const floorOf = c => h - 90 - 150 + c * 9 / 64;                         /* front cover may tuck ≤ 1/4 of its height under the caption */
          let need = lim + reach(cw);
          while (need + R * TILT + cw * 9 / 32 > floorOf(cw) && cw > w * .55) { cw = Math.round(cw * .97); need = lim + reach(cw); }
          cy = Math.max(cy, need);
        }
      }
      else {
        cw = Math.round(Math.min(560, w * .39, (h - 230) * 16 / 9));         // ≤ 560 px: 1280 covers always drawn below native size
        R = Math.round(Math.max(w * 1.04, cw * 2.5)); PERSP = R * 2.2; cx = w * .5; TILT = .10; cy = h * .655 - R * TILT;
      }
      fold.style.setProperty("--cw", cw + "px"); fold.style.setProperty("--chh", Math.round(cw * 9 / 16) + "px");
      // frames are laid out at the ENLARGED pixel size and scaled DOWN at rest → hover zoom never upscales
      ew = Math.round(cw * ENL); eh = Math.round(ew * 9 / 16);
      fold.style.setProperty("--ew", ew + "px"); fold.style.setProperty("--eh", eh + "px"); fold.style.setProperty("--ek", ENL);
    }
    let rot = 0, pend = 0, vel = 0, target = null, dragging = false, lx = 0, moved = 0, hover = -1, idle = performance.now(), front = -1;
    const nowEl = $(".now", fold), rail = $(".rail", fold);
    function setNow(k){
      const w = W[k], p = w.p, href = "work-" + p.id + ".html";
      $(".idx", nowEl).textContent = String(k + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0");
      const t = $(".ttl", nowEl); t.textContent = pTitle(p); t.href = href;
      $(".meta", nowEl).textContent = p.year + "  ·  " + pRole(p) + (pNote(p) ? "  ·  " + pNote(p).split("·")[0].trim() : "");
      $(".go", nowEl).href = href;
      fold.style.setProperty("--acc", w.col);
      BGX(w);
      $$("li", rail).forEach((li, j) => li.classList.toggle("on", j === k));
      nowEl.classList.remove("in"); requestAnimationFrame(() => requestAnimationFrame(() => nowEl.classList.add("in")));   /* no forced reflow mid-rotation */
    }
    function renderRail(){
      rail.innerHTML = W.map((w, j) => '<li style="--c:' + w.col + '"><a href="work-' + w.p.id + '.html" data-k="' + j + '"><b>' + String(j + 1).padStart(2, "0") + '</b><span>' + esc(pTitle(w.p)) + '</span><i>' + w.p.year + '</i></a></li>').join("");
      labels(); if (front >= 0) setNow(front);
    }
    hooks.push(renderRail);
    const norm = a => ((a % 360) + 540) % 360 - 180;   // → (-180, 180]
    function spinTo(k){ rot += pend; pend = 0; target = rot + norm(-cards[k].ang0 - rot); vel = 0; idle = performance.now(); }
    function place(dt){
      let best = 0, bz = -1e9;
      cards.forEach(c => {
        const th = (c.ang0 + rot) * Math.PI / 180;
        const x = R * Math.sin(th), z = R * Math.cos(th);
        const off = norm(c.ang0 + rot);
        const s = PERSP / (PERSP + R - z) * (.72 + .28 * Math.exp(-(off / 20) * (off / 20)));   // front (z = R) → exactly 1, neighbours step back
        const y = z * TILT;                                 // tilted ellipse: front lower, back higher
        // hover zoom: ~1.7×, capped so the shown width never exceeds the 1280 px source at this screen's pixel ratio
        const kMax = Math.max(1, Math.min(ENL, (SRCW / DPR) / (cw * s)));
        const kt = hover === c.i ? kMax : 1;
        c.k += (kt - c.k) * (RM ? 1 : 1 - Math.exp(-(dt || .016) * 11)); if (Math.abs(kt - c.k) < .002) c.k = kt;
        const sc = s * c.k * cw / ew;                        // ≤ 1 always (element is already at the enlarged size)
        // sub-pixel, compositor-only motion: no integer snapping (rounding made covers stall/jump 1 px → 发抖)
        const tx = cx + x * s - ew / 2, ty = cy + y * s - eh / 2;
        const xf = "translate3d(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px,0) scale(" + sc.toFixed(4) + ")";
        if (c._xf !== xf) { c.el.style.transform = xf; c._xf = xf; }
        const up = c.k > 1.01;
        if (c._up !== up) { c.el.classList.toggle("zoom", up); c._up = up; }
        c._zz = up ? 1e9 + (hover === c.i ? 1 : 0) : z;
        // depth dimming on a GPU opacity layer (a per-frame CSS filter forced every cover to repaint)
        const dk = up ? "0.000" : (1 - (.58 + .42 * (z + R) / (2 * R))).toFixed(3); if (c._b !== dk) { c.dm.style.opacity = dk; c._b = dk; }
        if (z > bz) { bz = z; best = c.i; }
      });
      // stacking by depth rank: z-index only changes when two covers actually cross
      cards.slice().sort((a, b) => a._zz - b._zz).forEach((c, r) => { const zi = String(c._zz >= 1e9 ? 5000 + r : 10 + r); if (c._z !== zi) { c.el.style.zIndex = zi; c._z = zi; } });
      if (best !== front) { if (front >= 0) cards[front].el.classList.remove("front"); front = best; cards[front].el.classList.add("front"); setNow(front); }
    }
    // drag (mouse + touch) with inertia; vertical page scroll stays native on touch
    fold.addEventListener("pointerdown", e => {
      if (e.target.closest(".rail, .now, .cta-contact, .hd a")) return;
      if (e.pointerType !== "mouse" && !e.target.closest(".rc")) hover = -1;   // tap outside a cover: un-zoom
      dragging = true; moved = 0; lx = e.clientX; vel = 0; target = null; fold.classList.add("grab");
    });
    addEventListener("pointermove", e => {
      if (!dragging) return;
      const dx = e.clientX - lx; lx = e.clientX; moved += Math.abs(dx);
      const d = dx * (small ? .32 : .16); pend += d; vel = d; idle = performance.now();   /* applied in rAF, eased: pointer events and frames never beat */
      if (moved > 6 && e.pointerType !== "mouse") hover = -1;
    }, { passive: true });
    const end = () => { if (!dragging) return; dragging = false; fold.classList.remove("grab"); idle = performance.now(); };
    addEventListener("pointerup", end); addEventListener("pointercancel", end);
    fold.addEventListener("wheel", e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { pend -= e.deltaX * .08; vel = -e.deltaX * .02; target = null; idle = performance.now(); } }, { passive: true });
    rail.addEventListener("mouseover", e => { const a = e.target.closest("a[data-k]"); if (a) spinTo(+a.dataset.k); });
    rail.addEventListener("focusin", e => { const a = e.target.closest("a[data-k]"); if (a) spinTo(+a.dataset.k); });
    let prev = -1;
    const ease = (k, dt) => 1 - Math.exp(-k * dt);   // frame-rate independent exponential easing
    function frame(now){
      const dt = prev < 0 ? 1 / 60 : Math.max(0, Math.min(.05, (now - prev) / 1000)); prev = now;
      if (pend) { const a = Math.abs(pend) < .001 ? pend : pend * ease(RM ? 1e3 : 26, dt); rot += a; pend -= a; }
      if (!dragging) {
        if (target !== null) { const d = target - rot; rot += d * ease(7, dt); if (Math.abs(d) < .02) { rot = target; target = null; } }
        else if (Math.abs(vel) > .01 && !RM) { rot += vel * dt * 60; vel *= Math.pow(.9, dt * 60); }
        else {
          vel = 0;
          const quiet = now - idle;
          if (hover >= 0) { /* hovering a cover: ring holds still */ }
          else if (quiet < 2600 || RM) {
            // settle the nearest frame to the front so it reads at 1:1
            const k = cards.reduce((b, c) => Math.abs(norm(c.ang0 + rot)) < Math.abs(norm(cards[b].ang0 + rot)) ? c.i : b, 0);
            const d = norm(-cards[k].ang0 - rot); rot += d * ease(5, dt); if (Math.abs(d) < .005) rot += d;
          } else rot -= (small ? 5 : 4) * dt;   // slow idle drift
        }
      }
      place(dt); requestAnimationFrame(frame);
    }
    /* keep the right-hand index clear of the hero tag stack (it is centred by CSS; nudge it down only when they would touch) */
    function fitRail(){
      rail.style.top = rail.style.transform = ""; rail.classList.remove("tight");
      const cr = $(".hd .cred", fold), ct = $(".cta-contact", fold); if (!cr || small || getComputedStyle(rail).display === "none") return;
      const fb = fold.getBoundingClientRect(), minTop = cr.getBoundingClientRect().bottom - fb.top + 14;
      if (rail.getBoundingClientRect().top - fb.top < minTop) { rail.style.top = minTop + "px"; rail.style.transform = "none"; }
      if (ct && rail.getBoundingClientRect().bottom > ct.getBoundingClientRect().top - 10) rail.classList.add("tight");   /* short screens: slimmer rows */
    }
    layout(); renderRail(); place(); fitRail(); requestAnimationFrame(frame);
    if (small && document.fonts && document.fonts.ready) document.fonts.ready.then(() => { layout(); cards.forEach(c => c._xf = null); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitRail);
    let rT; addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(() => { layout(); fitRail(); cards.forEach(c => c._xf = null); }, 120); });
    window.JLring = { spinTo, get hover(){ return hover; }, get front(){ return front; }, nudge(v){ vel = v; target = null; idle = performance.now(); } };
  }
  /* home index tiles: each tile hard-cuts through sharp stills on hover */
  const TILE_IMG = {
    film: ["cf_07_ninagawa-colour_dear-stranger_cherry-orchard", "cf_12_speed-racer-digital_every-multiverse_lightning-station", "cf_45_tsui-folk-cyber_one-blink_lantern-promenade"],
    commercial: ["cf_26_tarsem-system_chanel-spec_chanel-hall", "cf_36_speed-racer-digital_culture-pop-soda_pink-muscle-car", "cf_23_tarsem-system_chanel-spec_chanel-20"],
    art: ["cf_22_ninagawa-colour_every-multiverse_beaded-parlour", "cf_34_chow-street_dear-stranger_cake-tower-room", "cf_29_tarsem-system_female-heroes_opera-dressing-room"],
    about: ["cf_10_tarsem-system_dear-stranger_red-carpet", "cf_38_ninagawa-colour_dear-stranger_red-pavilion", "cf_42_ninagawa-colour_every-multiverse_beaded-clock"],
    press: ["cf_50_luhrmann-theatre_dear-stranger_talk-show", "cf_06_tsui-folk-cyber_the-court_t17", "cf_04_tsui-folk-cyber_the-court_court-21"],
    contact: ["cf_11_wong-urban_girls_neon-crowd", "cf_32_wong-urban_girls_pink-hair-burger", "cf_20_wong-urban_dear-stranger_neon-city-night"]
  };
  $$(".tiles .tile").forEach(t => {
    const keys = TILE_IMG[t.dataset.pid] || []; const imgs = keys.map(k => (JL.frames || []).find(f => f.key === k)).filter(Boolean).map(f => BASE + f.thumb);
    if (!imgs.length) return;
    const im = document.createElement("span"); im.className = "ti"; im.style.backgroundImage = 'url("' + imgs[0] + '")'; t.prepend(im);
    let k = 0, h = null;
    t.addEventListener("mouseenter", () => { h = setInterval(() => { k = (k + 1) % imgs.length; im.style.backgroundImage = 'url("' + imgs[k] + '")'; }, 420); });
    t.addEventListener("mouseleave", () => { clearInterval(h); });
  });

  /* =========================================================
     FILM — tile wall + index list
     ========================================================= */
  const wall = $(".wall");
  if (wall) {
    function renderWall(){
      wall.innerHTML = P.map((p, i) => {
        const st = stillsOf(p.id)[0];
        return '<a class="wt wt3" href="work-' + p.id + '.html"><span class="fr"><span class="c" style="background-image:url(&quot;' + BASE + p.img + '&quot;)"></span>' +
          (st ? '<span class="s" style="background-image:url(&quot;' + BASE + st.thumb + '&quot;)"></span>' : '') + '</span>' +
          '<span class="cap"><b>' + String(i + 1).padStart(2, "0") + '</b><span class="t">' + esc(pTitle(p)) + '</span><i>' + p.year + '</i></span></a>';
      }).join("");
    }
    hooks.push(renderWall);
  }
  const il = $(".ilist");
  if (il) {
    const render = () => { il.innerHTML = P.map(p => '<li><a href="work-' + p.id + '.html"><span class="y">' + p.year + ',</span><span class="t">' + esc(pTitle(p)) + '</span><span class="r">' + esc(pRole(p)) + '</span></a></li>').join(""); };
    hooks.push(render);
  }
  /* =========================================================
     WORK DETAIL
     ========================================================= */
  const work = $(".work");
  if (work) {
    const P = PA; /* work pages: unchanged prev/next across all films */
    const id = work.dataset.pid, i = P.findIndex(p => p.id === id), p = P[i];
    const pl = $(".player", work);
    pl.addEventListener("click", () => {
      if (pl.classList.contains("on")) return;
      pl.classList.add("on");
      pl.insertAdjacentHTML("beforeend", '<iframe src="' + ytURL(pl.dataset.yt) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>');
    });
    const ws = $(".wstills", work);
    function renderStills(){
      const S = stillsOf(id), C = clipsOf(id);
      if (!S.length && !C.length) { ws.innerHTML = ""; return; }
      const set = S.map(f => ({ f: f.img, c: pTitle(p) }));
      ws.innerHTML = '<h2 class="lab">' + (C.length ? T("Stills &amp; clips", "剧照与片段") : T("Stills", "剧照")) + ' <span class="n">' + String(S.length + C.length).padStart(2, "0") + '</span></h2>' + (C.length ? '<div class="cg n' + Math.min(C.length, 3) + '">' : '') +
        C.map(c => '<figure class="clip"><video muted loop playsinline preload="none" poster="' + BASE + c.img + '" data-src="' + BASE + c.video + '"></video><figcaption>' + T("Clip", "片段") + ' · ' + esc(c.ts || "") + '</figcaption></figure>').join("") + (C.length ? '</div>' : '') + '<div class="sg">' +
        S.map((f, j) => '<a class="st" href="' + BASE + f.img + '" data-i="' + j + '"><img src="' + BASE + f.thumb + '" alt="' + esc(pTitle(p)) + '" loading="lazy" width="960" height="540"></a>').join("") + '</div>';
      $$(".st", ws).forEach(a => a.addEventListener("click", e => { e.preventDefault(); viewImg(set, +a.dataset.i); }));
      // lazy clips: load + play only while on screen
      const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(en => { const v = en.target; if (en.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(()=>{}); } else v.pause(); }), { rootMargin: "100px" }) : null;
      $$("video", ws).forEach(v => io ? io.observe(v) : (v.src = v.dataset.src));
    }
    hooks.push(renderStills);
    const pn = $(".pn", work);
    hooks.push(() => {
      const a = P[(i - 1 + P.length) % P.length], b = P[(i + 1) % P.length];
      pn.innerHTML = [[a, T("← Previous", "← 上一部")], [b, T("Next →", "下一部 →")]].map(([q, l]) => '<a href="work-' + q.id + '.html" style="background-image:url(&quot;' + BASE + q.img + '&quot;)"><span><small>' + l + '</small>' + esc(pTitle(q)) + '</span></a>').join("");
    });
  }
  /* =========================================================
     SHARED RENDERERS (video cards, galleries, xinpianchang, logos, press)
     ========================================================= */
  $$(".vgrid[data-v]").forEach(el => {
    const list = J2[el.dataset.v] || [];
    hooks.push(() => {
      el.innerHTML = "";
      list.forEach((v, n) => {
        const a = document.createElement(v.href ? "a" : "article"); a.className = "vc"; if (v.href) a.href = v.href;
        const sub = ZH() ? v.s_zh : v.s;
        a.innerHTML = '<div class="th">' + (v.img ? '<img src="' + BASE + v.img + '" alt="" loading="lazy">' : '<span class="ph">' + esc(v.t) + '</span>') + '<span class="pl"><i></i></span>' + (v.vimeo ? '<span class="tag">Vimeo</span>' : '') + '</div>' +
          '<h3><b>' + String(n + 1).padStart(2, "0") + '</b>' + esc(v.t) + '</h3>' + (sub ? '<p>' + esc(sub) + '</p>' : '');
        if (!v.href) a.addEventListener("click", () => play(v.yt, v.t, 0, v.vimeo));
        el.appendChild(a);
      });
    });
  });
  $$(".gal[data-g]").forEach(el => {
    const set = J2[el.dataset.g] || [];
    el.innerHTML = set.map((it, i) => '<a href="' + BASE + it.f + '" data-i="' + i + '" class="gi"><img src="' + BASE + it.t + '" alt="" loading="lazy" width="' + it.w + '" height="' + it.h + '"></a>').join("");
    el.addEventListener("click", e => { const a = e.target.closest(".gi"); if (!a) return; e.preventDefault(); viewImg(set, +a.dataset.i); });
  });
  /* Commercial: one uniform 16:9 grid, newest → oldest */
  $$(".cgrid[data-c]").forEach(el => {
    const list = J2[el.dataset.c] || [];
    hooks.push(() => {
      el.innerHTML = "";
      list.forEach((v, n) => {
        const ext = !v.yt;
        const a = document.createElement(ext ? "a" : "article"); a.className = "vc cc";
        if (ext) { a.href = v.u; a.target = "_blank"; a.rel = "noopener"; }
        const sub = ZH() ? v.s_zh : v.s;
        a.innerHTML = '<div class="th"><img src="' + BASE + v.img + '" alt="' + esc(v.t) + '" loading="lazy" width="960" height="540">' + (ext ? '<span class="pl ex"><i></i></span>' : '<span class="pl"><i></i></span>') + '</div>' +
          '<h3 title="' + esc(v.t) + '"><b>' + String(n + 1).padStart(2, "0") + '</b><span>' + esc(v.t) + '</span></h3><p><span>' + esc(sub) + (ext ? ' ↗' : '') + '</span><em>' + esc(v.y || "") + '</em></p>';
        if (!ext) a.addEventListener("click", () => play(v.yt, v.t, 0, v.vimeo));
        el.appendChild(a);
      });
    });
  });
  const xpc = $(".xpc");
  if (xpc) xpc.innerHTML = (J2.xpc || []).map((x, n) => '<a class="xc" href="' + x.u + '" target="_blank" rel="noopener"><div class="th"><img src="' + BASE + x.img + '" alt="" loading="lazy"></div><h3><b>' + String(n + 1).padStart(2, "0") + '</b>' + esc(x.t) + '</h3><p>新片场 Xinpianchang ↗</p></a>').join("");
  $$(".lw[data-l]").forEach(el => {
    const L = (J2.logos || {})[el.dataset.l] || [];
    const n = $(".n", el); if (n) n.textContent = L.length;
    $$('.lwn[data-ln="' + el.dataset.l + '"]').forEach(x => x.textContent = L.length);
    /* logo walls v2: equal cells; width as % of the cell from equal-visual-area + ink-density normalisation */
    const box = $(".logos", el);
    box.innerHTML = L.map(l => {
      const ar = l.ar || 3, dk = Math.max(.72, Math.min(1.22, Math.pow(.33 / (l.dn || .33), .35)));
      const w = Math.min(.8, .27 * ar, Math.sqrt(.11 * ar) * dk) * 100;
      return '<span class="lg" title="' + esc(l.name) + '"><img src="' + BASE + 'logos/' + l.file + '" alt="' + esc(l.name) + '" loading="lazy" style="width:' + w.toFixed(1) + '%"></span>';
    }).join("");
    $$("img", box).forEach(i => { const cap = () => i.style.maxWidth = Math.round(i.naturalWidth / 2) + "px"; i.complete && i.naturalWidth ? cap() : i.addEventListener("load", cap); });   /* never upscale past 2× density */
    const fill = () => {   /* pad the last row with empty cells so the hairline grid stays a clean rectangle */
      $$(".lg.e", box).forEach(x => x.remove());
      const c = getComputedStyle(box).gridTemplateColumns.split(" ").filter(Boolean).length, r = L.length % c;
      if (c > 1 && r) box.insertAdjacentHTML("beforeend", '<span class="lg e" aria-hidden="true"></span>'.repeat(c - r));
    };
    fill(); addEventListener("resize", fill);
  });
  const pl = $(".plist");
  if (pl) {
    const side = $(".pside");
    hooks.push(() => {
      const L = J2.press || [], f = L[0];
      const yr = p => (p.d || "").slice(0, 4) || "—";
      const years = [...new Set(L.slice(1).map(yr))];
      const row = p => '<a class="pr" href="' + p.u + '" target="_blank" rel="noopener"><span class="d">' + esc(p.d || "—") + '</span><span class="o">' + esc(p.o) + '</span><span class="tt">' + esc(ZH() && p.t_zh ? p.t_zh : p.t) + '</span><span class="lt">' + esc(p.l) + '</span><span class="ar">↗</span></a>';
      /* featured Forbes card (option 3: full-bleed photo hero) — dek verbatim from the Forbes article (2026-09-04); photo + wordmark cropped/traced from Junie's screenshot of the article; zh = our translation, marked as such */
      const FX = f.u.indexOf("maureenkerr/2026/09/04") > -1 ? {
        img: BASE + "press/forbes/photo.jpg", w: 2416, h: 1590, wm: BASE + "press/forbes/forbes-wordmark-white.svg",
        t: ["How AI And Peter Gabriel Changed Junie Lau’s Path To Directing", "AI 与 Peter Gabriel 如何改变了 Junie Lau 的导演之路"],
        dek: ["Filmmaker Junie Lau used generative AI to break into directing, win Peter Gabriel’s backing and turn childhood memories into Goldfish Mayhem.", "电影人 Junie Lau 借助生成式 AI 踏入导演行业，赢得 Peter Gabriel 的支持，并把童年记忆化作《金鱼街大乱斗》。"]
      } : null;
      const L2 = x => ZH() ? x[1] : x[0];
      const featHTML = FX ? '<article class="fx"><img class="fx-bg" src="' + FX.img + '" alt="" width="' + FX.w + '" height="' + FX.h + '" loading="lazy">' +
        '<div class="fx-in"><div class="fx-top"><a class="fx-wm" href="' + f.u + '" target="_blank" rel="noopener"><img src="' + FX.wm + '" alt="Forbes" width="596" height="169"></a>' +
        '<p class="fx-k"><span>' + T("Featured", "精选") + '</span><span>' + T("Forbes", "福布斯") + '</span><span>Maureen Kerr</span><span>' + esc(f.d.replace(/-/g, ".")) + '</span></p></div>' +
        '<div class="fx-bot"><h3 class="fx-t"><a href="' + f.u + '" target="_blank" rel="noopener">' + esc(L2(FX.t)) + '</a></h3>' +
        '<div class="fx-side"><p class="fx-dek">' + esc(L2(FX.dek)) + '</p><a class="fx-btn" href="' + f.u + '" target="_blank" rel="noopener">' + T("Read on Forbes", "去福布斯阅读全文") + ' <i>↗</i></a>' +
        (ZH() ? '<span class="fx-note">标题与导语为中文译文，原文为英文</span>' : '') + '</div></div></div></article>'
        : '<a class="feat" href="' + f.u + '" target="_blank" rel="noopener"><span class="k">' + T("Featured", "专题报道") + ' · ' + esc(f.o) + ' · ' + esc(f.d) + '</span><h3>' + esc(ZH() && f.t_zh ? f.t_zh : f.t) + '</h3><span class="more">' + T("Read on Forbes ↗", "阅读全文 ↗") + '</span></a>';
      const fbox = $(".pfeat");
      if (fbox) fbox.innerHTML = featHTML;
      pl.innerHTML = (fbox ? '' : featHTML) +
        years.map(y => '<h3 class="py" id="y' + y + '">' + y + '</h3>' + L.slice(1).filter(p => yr(p) === y).map(row).join("")).join("");
      if (side) side.innerHTML = '<p class="k">' + T("Index", "索引") + '</p>' + years.map(y => '<a href="#y' + y + '">' + y + ' <i>' + L.slice(1).filter(p => yr(p) === y).length + '</i></a>').join("") +
        '<p class="k">' + T("Outlets", "媒体") + '</p><ul>' + [...new Set(L.map(p => p.o.split(" (")[0]))].map(o => '<li>' + esc(o) + '</li>').join("") + '</ul>';
    });
  }
  /* press videos: click-to-play covers → inline youtube-nocookie embed */
  $$(".pvid .player").forEach(pv => pv.addEventListener("click", () => {
    if (pv.classList.contains("on")) return;
    pv.classList.add("on");
    pv.insertAdjacentHTML("beforeend", '<iframe src="' + ytURL(pv.dataset.yt) + '" title="' + esc(pv.dataset.t || "") + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>');
  }));
  /* work-with-Junie form: calm thank-you after FormSubmit redirect (?sent=1) */
  const sent = $(".wwj .sent");
  if (sent && /[?&]sent=1\b/.test(location.search)) { sent.hidden = false; const f = $(".wwj .wf"); if (f) f.hidden = true; }
  /* about: long bio collapsed */
  const more = $(".biowrap .more");
  if (more) more.addEventListener("click", () => { const w = more.parentNode; w.classList.toggle("open"); more.innerHTML = w.classList.contains("open") ? T("Show less −", "收起 −") : T("Read full bio +", "展开完整简介 +"); });
  /* reveal on scroll */
  if (!RM && "IntersectionObserver" in window) {
    document.documentElement.classList.add("rv-on");
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
    hooks.push(() => $$(".wt, .vc, .xc, .gi, .pr, .feat, .fx, .lg, .lists li, .tile, .ilist li, .st, .clip").forEach(el => { if (!el.classList.contains("in")) io.observe(el); }));
  }
  /* Home hero credit labels: clean, even staircase (same step per line, one direction) */
  function stairCred(){
    /* natural-width boxes, right-aligned via CSS — clear any leftover forced widths */
    $$(".p-home .cred > span").forEach(s => { s.style.width = ""; });
  }
  hooks.push(stairCred);
  addEventListener("resize", stairCred);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(stairCred);
  applyLang();
})();
