(function(){
  const JL = window.JL, EMBED = !!window.JL_EMBED;
  /* embed (Google Sites) loads media from the published static site */
  const BASE = EMBED ? (window.JL_ASSET_BASE || "https://junielau.github.io/assets/") : "assets/";
  const src = it => BASE + it.img;
  const vsrc = it => BASE + it.video;
  const secs = ts => { if (!ts) return 0; const p = ts.split(/[–-]/)[0].split(":").map(Number); return Math.floor(p[0]*3600 + p[1]*60 + p[2]); };
  const $ = (s, r=document) => r.querySelector(s);
  /* ---------- language ---------- */
  let LANG = "en";
  try { LANG = localStorage.getItem("jl-lang") === "zh" ? "zh" : "en"; } catch(e) {}
  const ZH = () => LANG === "zh";
  const capOf = it => (ZH() && it.cap_zh) ? it.cap_zh : it.cap;
  const hooks = [];
  function applyLang(){
    document.documentElement.lang = ZH() ? "zh-CN" : "en";
    document.documentElement.classList.toggle("is-zh", ZH());
    document.querySelectorAll("[data-zh]").forEach(el => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = ZH() ? el.dataset.zh : el.dataset.en;
    });
    document.querySelectorAll(".langs button").forEach(b => b.classList.toggle("on", b.dataset.lang === LANG));
    hooks.forEach(f => f());
  }
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest(".langs button");
    if (!b) return;
    LANG = b.dataset.lang; try { localStorage.setItem("jl-lang", LANG); } catch(e) {}
    applyLang();
  });

  /* ---------- lightbox (YouTube · Vimeo · images) ---------- */
  const lb = $(".lb");
  let gset = null, gi = 0;
  function openLB(html, title, mode){
    $(".frame", lb).innerHTML = html; $(".t", lb).textContent = title || "";
    lb.classList.toggle("img", mode === "img"); lb.classList.add("on");
    document.documentElement.classList.add("lbopen");
  }
  function play(yt, title, start, vimeo){
    if (!yt && !vimeo) return;
    const st = start ? "&start=" + start : "";
    if (!lb) { window.open(vimeo ? "https://vimeo.com/" + vimeo : "https://www.youtube.com/watch?v=" + yt + (start ? "&t=" + start : ""), "_blank"); return; }
    gset = null;
    const url = vimeo ? "https://player.vimeo.com/video/" + vimeo + "?autoplay=1&title=0&byline=0&portrait=0&dnt=1&playsinline=1"
                      : "https://www.youtube-nocookie.com/embed/" + yt + "?autoplay=1&rel=0&modestbranding=1&playsinline=1" + st;
    openLB('<iframe src="' + url + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>', title, "video");
  }
  function showImg(){
    const it = gset[gi];
    openLB('<img src="' + BASE + it.f + '" alt="">', (gi + 1) + " / " + gset.length, "img");
  }
  function viewImg(set, i){ if (!lb) return; gset = set; gi = i; showImg(); }
  function step(d){ if (!gset) return; gi = (gi + d + gset.length) % gset.length; showImg(); }
  function close(){ if(!lb) return; lb.classList.remove("on","img"); $(".frame", lb).innerHTML = ""; gset = null; document.documentElement.classList.remove("lbopen"); }
  if (lb) {
    lb.addEventListener("click", e => {
      if (e.target.closest(".prev")) return step(-1);
      if (e.target.closest(".next")) return step(1);
      if (e.target === lb || e.target.classList.contains("x") || e.target.closest(".x") || (gset && e.target.classList.contains("frame"))) close();
    });
    document.addEventListener("keydown", e => { if (!lb.classList.contains("on")) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });
    let sx = null;
    lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive:true });
    lb.addEventListener("touchend", e => { if (sx === null || !gset) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); sx = null; }, { passive:true });
  }

  /* ---------- home: cursor-driven field of frames ---------- */
  const fieldEl = $(".field");
  if (fieldEl) {
    const home = $(".home"), stage = $(".fstage"), cap = $(".home .cap");
    const cur = $(".cur"), ttlEm = $(".cur .ttl em"), ttlSm = $(".cur .ttl small");
    const wm = $(".wmx"), echoes = [...document.querySelectorAll(".echo span")];
    const xyEl = $(".hud .xy"), idxEl = $(".hud .idx");
    const touch = matchMedia("(hover:none)").matches;
    const small = matchMedia("(max-width:700px)").matches;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tilt = document.createElement("div"); tilt.className = "tilt"; stage.appendChild(tilt); tilt.appendChild(fieldEl);
    // seeded random so the composition is stable
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const C = k => JL.clips.find(c => c.key === k);
    const clips = (small ? ["clip01","clip05"] : ["clip01","clip05","clip04","clip03"]).map(C).filter(Boolean);
    const pool = JL.all.slice();
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    let W, H, vw, vh, tiles = [];
    function build(){
      vw = innerWidth; vh = home.clientHeight || innerHeight;
      W = vw * (small ? 2.7 : 2.25); H = vh * (small ? 2.3 : 2.15);
      fieldEl.innerHTML = ""; tiles = []; seed = 7;
      const cols = small ? 4 : 7, colW = W / cols;
      let n = 0, ci = 0;
      for (let c = 0; c < cols; c++) {
        let y = -colW * (.15 + rnd() * .55);
        while (y < H) {
          const w = colW * (small ? .74 + rnd() * .2 : .56 + rnd() * .38);
          const h = small ? w * 1.25 : w * 9 / 16;
          const x = c * colW + (colW - w) * rnd();
          const useClip = ci < clips.length && n % 11 === 5;
          const it = useClip ? clips[ci++] : pool[n % pool.length];
          n++;
          const el = document.createElement("div"); el.className = "tile";
          el.style.cssText = "left:" + x.toFixed(1) + "px;top:" + y.toFixed(1) + "px;width:" + w.toFixed(1) + "px;height:" + h.toFixed(1) + "px";
          const im = document.createElement("div"); im.className = "im";
          if (it.video) {
            const v = document.createElement("video");
            v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
            ["muted","playsinline","webkit-playsinline","loop","disablepictureinpicture"].forEach(a => v.setAttribute(a, ""));
            v.preload = "metadata"; v.poster = src(it); v.src = vsrc(it); im.appendChild(v); el._v = v;
          } else im.style.backgroundImage = 'url("' + src(it) + '")';
          el.appendChild(im);
          const no = document.createElement("span"); no.className = "no"; no.textContent = String(n).padStart(2, "0"); el.appendChild(no);
          fieldEl.appendChild(el);
          tiles.push({ el, it, x, y, w, h, cx: x + w / 2, cy: y + h / 2, s: -1, o: -1, z: -1 });
          y += h + colW * (.07 + rnd() * .26);
        }
      }
      fieldEl.style.width = W + "px"; fieldEl.style.height = H + "px";
      if (idxEl) idxEl.textContent = "00 / " + String(tiles.length).padStart(2, "0");
    }
    build();
    let rT; addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(build, 150); });
    // input state
    let mx = innerWidth * .5, my = innerHeight * .45, cx = mx, cy = my, hasMouse = false, lastInput = 0;
    let ox = 0, oy = 0, tx = 0, ty = 0, pox = 0, poy = 0, rx = 0, ry = 0, vx = 0, vy = 0;
    let dragging = false, lx = 0, ly = 0, moved = 0, dvx = 0, dvy = 0, gx = 0, gy = 0;
    const clampT = () => { tx = Math.max(-(W - vw), Math.min(0, tx)); ty = Math.max(-(H - vh), Math.min(0, ty)); };
    tx = -(W - vw) * .5; ty = -(H - vh) * .45; ox = tx; oy = ty;
    if (!touch) {
      home.addEventListener("pointermove", e => { const r = home.getBoundingClientRect(); mx = e.clientX; my = e.clientY - r.top; hasMouse = true; lastInput = performance.now(); });
      home.addEventListener("pointerleave", () => cur && cur.classList.add("off"));
      home.addEventListener("pointerenter", () => cur && cur.classList.remove("off"));
    } else {
      stage.addEventListener("pointerdown", e => { dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; dvx = dvy = 0; lastInput = performance.now(); });
      addEventListener("pointermove", e => {
        if (!dragging) return;
        const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
        tx += dx * 1.25; ty += dy * 1.25; dvx = dx * 1.25; dvy = dy * 1.25; clampT(); lastInput = performance.now();
        const r = home.getBoundingClientRect(); mx = e.clientX; my = e.clientY - r.top;
      }, { passive:true });
      const up = () => { dragging = false; lastInput = performance.now(); };
      addEventListener("pointerup", up); addEventListener("pointercancel", up);
      // gyroscope only where no permission prompt is required (Android); iOS asks, so we skip it there
      if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== "function") {
        addEventListener("deviceorientation", e => { if (e.gamma == null) return; gx = Math.max(-1, Math.min(1, e.gamma / 30)); gy = Math.max(-1, Math.min(1, (e.beta - 45) / 30)); }, { passive:true });
      }
    }
    let hot = null;
    function hitTile(px, py){
      let best = null, bf = -1;
      for (const t of tiles) {
        const s = t.s > 0 ? t.s : 1, hw = t.w * s / 2, hh = t.h * s / 2, sx = t.cx + ox, sy = t.cy + oy;
        if (px > sx - hw && px < sx + hw && py > sy - hh && py < sy + hh && t.f > bf) { bf = t.f; best = t; }
      }
      return best;
    }
    stage.addEventListener("click", e => {
      if (touch && moved > 10) return;
      const r = home.getBoundingClientRect();
      const t = touch ? hitTile(e.clientX, e.clientY - r.top) : hot;
      if (t && t.it.yt) play(t.it.yt, capOf(t.it), secs(t.it.ts));
    });
    function title(it){
      const c = capOf(it) || ""; const i = c.lastIndexOf(" — ");
      return i > 0 ? [c.slice(0, i), c.slice(i + 3)] : [c, ""];
    }
    function setHot(t){
      if (t === hot) return;
      if (hot) { hot.el.classList.remove("hot"); hot.el.style.filter = ""; }
      hot = t;
      if (hot) {
        hot.el.classList.add("hot");
        const [a, b2] = title(hot.it);
        if (ttlEm) { ttlEm.textContent = a; ttlSm.textContent = b2; }
        if (cap) cap.innerHTML = "<b>●</b>&nbsp; " + capOf(hot.it);
        if (idxEl) idxEl.textContent = hot.el.querySelector(".no").textContent + " / " + String(tiles.length).padStart(2, "0");
      }
      cur && cur.classList.toggle("on", !!hot);
    }
    hooks.push(() => { const t = hot; hot = null; setHot(t); });
    const ep = echoes.map(() => ({ x: 0, y: 0 }));
    let prev = performance.now(), fr = 0;
    function frame(now){
      const dt = Math.min(.05, (now - prev) / 1000); prev = now; fr++;
      const idle = now - lastInput > (touch ? 2600 : 4000);
      let fx = mx, fy = my;                       // focus point (cursor / finger / auto)
      if (!touch) {
        if (!hasMouse && !RM) { const k = now / 1000; mx = vw * (.5 + .32 * Math.sin(k * .37)); my = vh * (.48 + .26 * Math.sin(k * .53 + 1)); fx = mx; fy = my; }
        tx = -(mx / vw) * (W - vw); ty = -(my / vh) * (H - vh);
      } else {
        if (!dragging) { tx += dvx; ty += dvy; dvx *= .92; dvy *= .92; }
        if (idle && !RM) { tx += Math.cos(now / 6000) * 26 * dt; ty += Math.sin(now / 4700) * 22 * dt; }
        tx += gx * 3; ty += gy * 3; gx *= .9; gy *= .9;
        clampT();
        if (!dragging) { fx = vw / 2; fy = vh * .5; }
      }
      const L = RM ? 1 : (touch ? .16 : .075);
      ox += (tx - ox) * L; oy += (ty - oy) * L;
      vx = ox - pox; vy = oy - poy; pox = ox; poy = oy;
      ry += (((fx / vw) - .5) * 14 - ry) * .08; rx += ((-(fy / vh) + .5) * 10 - rx) * .08;
      fieldEl.style.transform = "translate3d(" + ox.toFixed(1) + "px," + oy.toFixed(1) + "px,0)";
      tilt.style.transform = "rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
      const R = vw * (small ? .5 : .26), R2 = R * R;
      for (const t of tiles) {
        const dx = t.cx + ox - fx, dy = t.cy + oy - fy, f = Math.exp(-(dx * dx + dy * dy) / R2);
        t.f = f;
        const s = 1 + .34 * f, o = .3 + .7 * Math.min(1, f * 1.6 + .08), z = 220 * f;
        const ss = s.toFixed(3), os = o.toFixed(2);
        if (ss !== t.ss) { t.el.style.transform = "translate3d(0,0," + z.toFixed(0) + "px) scale(" + ss + ")"; t.ss = ss; t.s = s; t.el.style.zIndex = Math.round(f * 100); }
        if (os !== t.os) { t.el.style.opacity = os; t.os = os; }
        if (t.el._v) { const vis = Math.abs(dx) < vw * .8 && Math.abs(dy) < vh * .8; if (vis && t.el._v.paused) t.el._v.play().catch(()=>{}); else if (!vis && !t.el._v.paused) t.el._v.pause(); }
      }
      setHot(touch ? hitTile(fx, fy) : hitTile(mx, my));
      const sp = Math.min(16, Math.hypot(vx, vy) * .5);
      if (hot) hot.el.style.filter = sp > 1 ? "drop-shadow(" + sp.toFixed(1) + "px 0 0 rgba(255,0,60,.8)) drop-shadow(" + (-sp).toFixed(1) + "px 0 0 rgba(0,220,255,.7))" : "";
      // wordmark: parallax + velocity skew + chromatic split
      if (wm) {
        const sk = Math.max(-14, Math.min(14, vx * .35)), px = (fx / vw - .5) * -40, py = (fy / vh - .5) * -24;
        wm.style.transform = "translate(-50%,-50%) translate(" + px.toFixed(1) + "px," + py.toFixed(1) + "px) skewX(" + sk.toFixed(2) + "deg)";
        const k = Math.max(-18, Math.min(18, vx * .6));
        wm.style.textShadow = (k).toFixed(1) + "px 0 rgba(0,220,255,.55), " + (-k).toFixed(1) + "px 0 rgba(255,255,255,.18)";
        echoes.forEach((e, i) => {
          const r = .16 / (i + 1.4), q = ep[i];
          q.x += (px * (2.2 + i * 1.6) - q.x) * r; q.y += (py * (2.2 + i * 1.6) - q.y) * r;
          e.style.transform = "translate(-50%,-50%) translate(" + q.x.toFixed(1) + "px," + q.y.toFixed(1) + "px)";
        });
      }
      if (cur && !touch) {
        cx += (mx - cx) * .28; cy += (my - cy) * .28;
        cur.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
        if (fr % 6 === 0) { cur.classList.toggle("fl", cx > vw * .56); cur.classList.toggle("fb", cy < vh * .34); }
      }
      if (xyEl && fr % 4 === 0) xyEl.textContent = "X " + (fx / vw).toFixed(3) + "   Y " + (fy / vh).toFixed(3);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    document.addEventListener("touchstart", () => tiles.forEach(t => t.el._v && t.el._v.play().catch(()=>{})), { once:true, passive:true });
  }

  /* ---------- work grid ---------- */
  const grid = $(".grid");
  if (grid) {
    function renderGrid(){
      grid.innerHTML = "";
      JL.projects.forEach((p, i) => {
        const z = ZH(), title = z ? (p.title_zh || p.title) : p.title, sub = z ? "" : p.zh, role = z ? (p.role_zh || p.role) : p.role, note = z ? (p.note_zh || p.note) : p.note;
        const w = document.createElement("article");
        w.className = "w" + (i === 0 ? " big" : "") + (p.lbx ? " lbx" : "");
        w.innerHTML = '<div class="im" style="background-image:url(&quot;' + src(p) + '&quot;)"></div><span class="play">' + (z ? "播放" : "Play") + '</span>' +
          '<div class="cap"><h3>' + title + (sub ? "<i>" + sub + "</i>" : "") + '</h3><div class="sub">' + p.year + " &nbsp;·&nbsp; " + role + '</div>' +
          (note ? '<div class="note">' + note + "</div>" : "") + "</div>";
        w.addEventListener("click", () => play(p.yt, title + " — " + p.year));
        grid.appendChild(w);
      });
    }
    hooks.push(renderGrid);
  }
  /* ---------- v3 sections ---------- */
  const J2 = window.JL2 || {};
  const esc = s => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  // socials (old-site order, icons only)
  document.querySelectorAll(".soc").forEach(el => {
    el.innerHTML = (J2.social || []).map(s => '<a href="' + s.u + '" target="_blank" rel="noopener" aria-label="' + esc(s.n) + '" title="' + esc(s.n) + '"><img src="' + BASE + s.i + '" alt="' + esc(s.n) + '"' + (s.i.indexOf("xiaohongshu") > -1 ? ' class="xhs"' : '') + '></a>').join("");
  });
  // counts
  document.querySelectorAll("[data-count]").forEach(el => { const a = J2[el.dataset.count]; if (a) el.textContent = String(a.length).padStart(2, "0"); });
  // video cards
  document.querySelectorAll(".vgrid[data-v]").forEach(el => {
    const list = J2[el.dataset.v] || [];
    function render(){
      el.innerHTML = "";
      list.forEach(v => {
        const a = document.createElement("article"); a.className = "vc" + (v.img ? "" : " noimg");
        const sub = ZH() ? v.s_zh : v.s;
        a.innerHTML = '<div class="th">' + (v.img ? '<img src="' + BASE + v.img + '" alt="" loading="lazy">' : '<span class="ph">' + esc(v.t) + '</span>') +
          '<span class="pl"><i></i></span>' + (v.vimeo ? '<span class="tag">Vimeo</span>' : '') + '</div>' +
          '<h3>' + esc(v.t) + '</h3>' + (sub ? '<p>' + esc(sub) + '</p>' : '');
        a.addEventListener("click", () => play(v.yt, v.t, 0, v.vimeo));
        el.appendChild(a);
      });
    }
    hooks.push(render);
  });
  // galleries (full colour, lightbox)
  document.querySelectorAll(".gal[data-g]").forEach(el => {
    const set = J2[el.dataset.g] || [];
    el.innerHTML = set.map((it, i) => '<a href="' + BASE + it.f + '" data-i="' + i + '" class="gi"><img src="' + BASE + it.t + '" alt="" loading="lazy" width="' + it.w + '" height="' + it.h + '"></a>').join("");
    el.addEventListener("click", e => { const a = e.target.closest(".gi"); if (!a) return; e.preventDefault(); viewImg(set, +a.dataset.i); });
  });
  // Xinpianchang brand-film cards
  const xpc = $(".xpc");
  if (xpc) xpc.innerHTML = (J2.xpc || []).map(x => '<a class="xc" href="' + x.u + '" target="_blank" rel="noopener"><div class="th"><img src="' + BASE + x.img + '" alt="" loading="lazy"></div><h3>' + esc(x.t) + '</h3><p>' + "新片场 Xinpianchang ↗" + '</p></a>').join("");
  // logo walls — consistent optical size (area-normalised), white via filter-free pre-rendered PNGs
  document.querySelectorAll(".lw[data-l]").forEach(el => {
    const L = (J2.logos || {})[el.dataset.l] || [];
    const n = $(".n", el); if (n) n.textContent = L.length;
    const media = el.classList.contains("media");
    $(".logos", el).innerHTML = L.map(l => {
      const A = media ? 2400 : 2300, h = Math.max(18, Math.min(60, Math.sqrt(A / l.ar)));
      const w = Math.min(130 * Math.min(l.k || 1, 1.15), h * (l.k || 1) * l.ar), hh = w / l.ar;
      return '<span class="lg" title="' + esc(l.name) + '"><img src="' + BASE + 'logos/' + l.file + '" alt="' + esc(l.name) + '" loading="lazy" style="--h:' + hh.toFixed(1) + '"></span>';
    }).join("");
  });
  // press list
  const pl = $(".plist");
  if (pl) {
    function renderPress(){
      const P = J2.press || [];
      const f = P[0];
      const row = p => '<a class="pr" href="' + p.u + '" target="_blank" rel="noopener"><span class="d">' + esc(p.d || "—") + '</span><span class="o">' + esc(p.o) + '</span><span class="tt">' + esc(p.t) + '</span><span class="lt">' + esc(p.l) + '</span><span class="ar">↗</span></a>';
      pl.innerHTML = '<a class="feat" href="' + f.u + '" target="_blank" rel="noopener"><span class="k">' + (ZH() ? "专题报道" : "Featured") + ' · ' + esc(f.o) + ' · ' + esc(f.d) + '</span><h3>' + esc(f.t) + '</h3><span class="more">' + (ZH() ? "阅读全文 ↗" : "Read on Forbes ↗") + '</span></a>' +
        '<div class="phead"><span>' + (ZH() ? "日期" : "Date") + '</span><span>' + (ZH() ? "媒体" : "Outlet") + '</span><span>' + (ZH() ? "标题" : "Title") + '</span><span>' + (ZH() ? "语言" : "Lang") + '</span><span></span></div>' +
        P.slice(1).map(row).join("");
    }
    hooks.push(renderPress);
  }
  // mobile menu
  const burger = $(".burger"), mm = $(".mmenu");
  if (burger && mm) {
    const set = on => { document.documentElement.classList.toggle("menu", on); burger.setAttribute("aria-expanded", on); mm.setAttribute("aria-hidden", !on); };
    burger.addEventListener("click", () => set(!document.documentElement.classList.contains("menu")));
    mm.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
  }
  /* ---------- v4: editorial scroll motion ---------- */
  (function(){
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heads = [...document.querySelectorAll(".sh")];
    // marquee band per section (decorative, aria-hidden)
    heads.forEach(h => {
      const en = h.querySelector("h2").childNodes[0].textContent.trim(), zh = (h.querySelector("h2 i") || {}).textContent || "";
      const m = document.createElement("div"); m.className = "mq"; m.setAttribute("aria-hidden", "true");
      const unit = '<span>' + en + '</span><b>' + zh + '</b><i>✳</i>';
      m.innerHTML = '<div class="mqi">' + unit.repeat(10) + '</div>';
      h.parentNode.insertBefore(m, h);
      h._mq = m.firstChild;
      const t2 = h.querySelector("h2"); t2.setAttribute("data-o", en);
    });
    if (!RM && "IntersectionObserver" in window) {
      document.documentElement.classList.add("rv-on");
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
      const observeAll = () => document.querySelectorAll(".grid .w, .vc, .xc, .gal .gi, .pr, .feat, .lw .lg, .biotext p, .lists li, .portrait, .statement p").forEach(el => { if (!el.classList.contains("in")) io.observe(el); });
      hooks.push(observeAll);   // runs after every (re-)render, incl. language toggle
    }
    const skewers = [...document.querySelectorAll(".grid, .vgrid, .gal, .xpc")];
    let lastY = scrollY, sk = 0, mqx = 0;
    function tick(){
      const y = scrollY, v = y - lastY; lastY = y;
      if (!RM) {
        sk += (Math.max(-3, Math.min(3, v * .08)) - sk) * .12;
        const s = "skewY(" + sk.toFixed(2) + "deg)";
        if (Math.abs(sk) > .01) skewers.forEach(el => el.style.transform = s); else skewers.forEach(el => el.style.transform = "");
        mqx -= .6 + Math.abs(v) * .35;
        const vh = innerHeight;
        heads.forEach(h => {
          const r = h.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
          const p = 1 - (r.top + r.height) / (vh + r.height);          // 0 → 1 while passing
          h.querySelector("h2").style.transform = "translateX(" + ((.5 - p) * 14).toFixed(2) + "vw)";
          if (h._mq) { const half = h._mq.scrollWidth / 2 || 2000; h._mq.style.transform = "translateX(" + (mqx % half).toFixed(1) + "px)"; }
        });
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();
  applyLang();
})();
