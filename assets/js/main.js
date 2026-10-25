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

  /* ---------- home: 3D rotating ring (v7 cyberfolk — sharp / readable) ---------- */
  const carousel = $(".carousel");
  if (carousel) {
    const home = $(".home"), stage = $(".stage"), scene = $(".scene"), cap = $(".home .cap");
    const wordmarks = [".wordmark", ".wm2"].map(s => $(s)).filter(Boolean);
    const echoes = [...document.querySelectorAll(".home .echo span")];
    const hx = $(".home .hx"), hy = $(".home .hy"), hv = $(".home .hv");
    const hidx = $(".home .idx"), hang = $(".home .hang");
    const touch = matchMedia("(hover:none)").matches;
    const small = matchMedia("(max-width:700px)").matches;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const C = k => JL.clips.find(c => c.key === k);
    // muted loops: desktop few, mobile fewer — full color
    const clipKeys = small ? ["cfclip_02","cfclip_10"] : ["cfclip_01","cfclip_02","cfclip_05","cfclip_06","cfclip_10"];
    const clips = clipKeys.map(C).filter(Boolean);
    // Ring pool: interleave sharp YT covers + cyberfolk stills + muted clips
    const pool = [];
    const used = new Set();
    const push = it => { if (!it || used.has(it.key)) return; used.add(it.key); pool.push(it); };
    const covers = (JL.covers || []).slice();
    const prefer = [
      "cf_27_tsui-folk-cyber_one-blink_dragon-fireworks",
      "cf_04_ninagawa-colour_dear-stranger_petal-field-heroine",
      "cf_15_wong-urban_every-multiverse_umbrella-neon-street",
      "cf_38_speed-racer-digital_culture-pop-soda_pink-muscle-car",
      "cf_30_tsui-folk-cyber_the-court_red-robed-corridor",
      "cf_08_ninagawa-colour_dear-stranger_blossom-sea",
      "cf_43_daniels-surreal_dear-stranger_underwater-float",
      "cf_48_tarsem-system_chanel-spec_gilded-hall-gown",
      "cf_06_ninagawa-colour_culture-pop-soda_neon-girl-group",
      "cf_33_luhrmann-theatre_every-multiverse_clock-ballerina",
      "cf_01_ninagawa-colour_dear-stranger_red-flower-forest",
      "cf_21_wong-urban_girls_neon-crowd",
      "cf_16_wong-urban_dear-stranger_neon-city-night",
      "cf_49_tarsem-system_dear-stranger_red-carpet-gown",
      "cf_40_gilliam-absurd_what-if-mother_scarlet-studio",
      "cf_07_ninagawa-colour_love-from-void_goldfish-swarm"
    ].map(k => JL.all.find(f => f.key === k)).filter(Boolean);
    // round-robin: cover → still → (clip every 3rd) so fronts stay sharp & varied
    let ci = 0, fi = 0, vi = 0, tick = 0;
    const N = small ? 8 : 12;
    while (pool.length < N * 2 + 4) {
      if (tick % 3 === 0 && ci < covers.length) push(covers[ci++]);
      else if (tick % 3 === 1 && fi < prefer.length) push(prefer[fi++]);
      else if (vi < clips.length) push(clips[vi++]);
      else if (ci < covers.length) push(covers[ci++]);
      else if (fi < prefer.length) push(prefer[fi++]);
      else break;
      tick++;
    }
    JL.all.forEach(push);
    covers.forEach(push);
    const items = pool.slice(0, N);
    const backs = pool.slice(N, N * 2);
    while (backs.length < N) backs.push(pool[backs.length % pool.length]);

    let cw, ch, R, step;
    const cards = [];
    function layout(){
      const w = innerWidth, h = home.clientHeight || innerHeight;
      if (small) {
        cw = Math.min(w * .78, h * .42); ch = cw * 9 / 16;
        home.style.setProperty("--persp", Math.round(w * 2.0) + "px");
        home.style.setProperty("--push", Math.round(-Math.min(w, h) * .06) + "px");
        home.style.setProperty("--tilt", "-8deg");
      } else {
        // readable front: large 16:9, mild depth
        cw = Math.min(w * .52, h * .58); ch = cw * 9 / 16;
        home.style.setProperty("--persp", "1800px");
        home.style.setProperty("--push", "-60px");
        home.style.setProperty("--tilt", "-10deg");
      }
      home.style.setProperty("--cw", cw.toFixed(1) + "px");
      home.style.setProperty("--ch", ch.toFixed(1) + "px");
      step = 360 / N;
      const raw = (cw * .5) / Math.tan(Math.PI / N) + cw * (small ? .08 : .12);
      R = Math.min(raw, h * (small ? .28 : .32));
      cards.forEach((c, i) => {
        c.base = "rotateY(" + (i * step).toFixed(3) + "deg) translateZ(" + R.toFixed(1) + "px)";
        c.el.style.transform = c.base;
        c._xf = null;
      });
    }
    function makeFace(it, cls){
      const f = document.createElement("div"); f.className = "face" + (cls ? " " + cls : "");
      if (it.video) {
        const v = document.createElement("video");
        v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
        ["muted","playsinline","webkit-playsinline","loop","disablepictureinpicture"].forEach(a => v.setAttribute(a, ""));
        v.preload = "metadata"; v.poster = src(it); v.src = vsrc(it);
        f.appendChild(v); f._v = v; f.style.backgroundImage = 'url("' + src(it) + '")';
      } else {
        f.style.backgroundImage = 'url("' + src(it) + '")';
      }
      return f;
    }
    items.forEach((it, i) => {
      const el = document.createElement("div"); el.className = "card";
      const front = makeFace(it, "");
      el.appendChild(front);
      el._it = it; el._front = front; el._back = null;
      carousel.appendChild(el);
      cards.push({ el, it, i, ang: i * (360 / N), base: "" });
      el.addEventListener("pointerenter", () => { if (!touch) { hoverPause = true; setHot(el); } });
      el.addEventListener("pointerleave", () => { if (!touch) { hoverPause = false; if (hot === el) setHot(null); } });
      el.addEventListener("click", e => {
        if (moved > 8) return;
        e.stopPropagation();
        const target = el._it;
        if (target && target.yt) play(target.yt, capOf(target), secs(target.ts));
      });
    });
    layout();
    let rT; addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(layout, 120); });

    let rot = 0, vel = 0, dragging = false, lx = 0, ly = 0, moved = 0, hoverPause = false;
    let mx = innerWidth / 2, my = innerHeight / 2;
    let hot = null, frontEl = null, frontIdx = 0;
    let roll = 0, tiltNudge = 0;
    function setHot(el){
      if (hot === el) return;
      if (hot) hot.classList.remove("hot");
      hot = el;
      if (hot) hot.classList.add("hot");
      const it = hot ? hot._it : (frontEl && frontEl._it);
      if (cap) cap.innerHTML = it ? "<b>●</b>&nbsp; " + capOf(it) : "";
    }
    function nearFront(el){
      const i = cards.find(c => c.el === el).i;
      let a = ((i * step + rot) % 360 + 360) % 360;
      if (a > 180) a -= 360;
      return Math.abs(a) < 90;
    }
    function setFront(){
      let best = null, ba = 1e9, bi = 0;
      cards.forEach(c => {
        let a = ((c.i * step + rot) % 360 + 360) % 360;
        if (a > 180) a -= 360;
        const aa = Math.abs(a);
        if (aa < ba) { ba = aa; best = c.el; bi = c.i; }
        // ONLY front half of ring visible — hide far side so nothing ghosts through
        const o = aa > 95 ? 0 : (.72 + .28 * Math.max(0, 1 - aa / 95));
        if (c._o !== o) {
          c.el.style.opacity = o.toFixed(2);
          c.el.style.visibility = o < .05 ? "hidden" : "visible";
          c._o = o;
        }
        const t = Math.max(0, 1 - aa / 100);
        const sc = small ? (.96 + .28 * t) : (.92 + .28 * t); // front ~1.2×
        const sk = (a / 90) * (small ? .6 : 1.0);
        const zBoost = (small ? 28 : 56) * t;
        const xf = c.base + " translateZ(" + zBoost.toFixed(1) + "px) rotateZ(" + sk.toFixed(2) + "deg) scale(" + sc.toFixed(3) + ")";
        if (c._xf !== xf) { c.el.style.transform = xf; c._xf = xf; }
        // HARD RULE: never blur
        if (c._flt) { c.el.style.filter = ""; c._flt = ""; }
        const vis = aa < 85;
        const f = c.el._front;
        if (f && f._v) {
          if (vis && f._v.paused) f._v.play().catch(()=>{});
          else if (!vis && !f._v.paused) f._v.pause();
        }
      });
      if (frontEl !== best) {
        if (frontEl) frontEl.classList.remove("front");
        frontEl = best; frontIdx = bi;
        if (frontEl) frontEl.classList.add("front");
        if (!hot && cap) cap.innerHTML = frontEl ? "<b>●</b>&nbsp; " + capOf(frontEl._it) : "";
      }
      if (hidx) hidx.textContent = String(frontIdx + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0");
      if (hang) {
        let deg = ((rot % 360) + 360) % 360;
        hang.textContent = "ROT " + deg.toFixed(1) + "°";
      }
    }
    hooks.push(() => {
      const it = (hot && hot._it) || (frontEl && frontEl._it);
      if (cap && it) cap.innerHTML = "<b>●</b>&nbsp; " + capOf(it);
    });

    // pointer drag / swipe — wilder sensitivity + vertical roll
    stage.addEventListener("pointerdown", e => {
      dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; vel = 0;
      home.classList.add("grab");
      try { stage.setPointerCapture(e.pointerId); } catch(_){}
    });
    stage.addEventListener("pointermove", e => {
      mx = e.clientX; my = e.clientY;
      if (!dragging) return;
      const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy) * .3;
      const d = dx * (small ? .22 : .16);
      rot += d; vel = d * .85;
      roll += dy * .006;
      roll = Math.max(-4, Math.min(4, roll));
      tiltNudge += dy * .004;
      tiltNudge = Math.max(-3, Math.min(3, tiltNudge));
    });
    const endDrag = () => { dragging = false; home.classList.remove("grab"); };
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    home.addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    // wheel spins hard
    home.addEventListener("wheel", e => {
      const s = (e.deltaY + e.deltaX) * .045;
      rot += s; vel = s * .35;
    }, { passive: true });

    let prev = performance.now();
    const AUTO_BASE = small ? 4.5 : 6.5; // deg / sec — calm readable spin
    function frame(now){
      const dt = Math.min(.05, (now - prev) / 1000); prev = now;
      if (!dragging) {
        if (!RM && !hoverPause) {
          // uneven auto: pulse + soft figure-8 wobble
          const pulse = 1 + .18 * Math.sin(now * .0009);
          rot += AUTO_BASE * pulse * dt;
        }
        if (!RM) {
          rot += vel;
          vel *= .94;
          if (Math.abs(vel) < .002) vel = 0;
          roll *= .97; tiltNudge *= .97;
        } else vel = 0;
      }
      carousel.style.transform = "rotateY(" + rot.toFixed(3) + "deg)";
      // scene reacts to pointer + velocity
      if (scene && !RM) {
        const nx = (mx / innerWidth) * 2 - 1;
        const ny = (my / innerHeight) * 2 - 1;
        const r = roll + nx * 1.2 + vel * .12;
        const t = (small ? -8 : -10) + tiltNudge + ny * -0.7;
        home.style.setProperty("--roll", r.toFixed(2) + "deg");
        home.style.setProperty("--tilt", t.toFixed(2) + "deg");
      }
      // glitch / RGB split on title driven by speed
      const spd = Math.min(10, Math.abs(vel) * 8 + (dragging ? 1.5 : 0));
      const glx = spd * .25;
      const gly = spd * .1;
      home.style.setProperty("--glx", glx.toFixed(2));
      home.style.setProperty("--gly", gly.toFixed(2));
      if (wordmarks.length && !RM) {
        const sk = Math.max(-4, Math.min(4, vel * 1.6));
        const sx = Math.sin(now * .001) * .6;
        const sy = 0;
        wordmarks.forEach(wm => {
          if (wm.classList.contains("wm2")) {
            wm.style.transform = "skewX(" + sk.toFixed(2) + "deg) translate(" + sx.toFixed(2) + "px," + sy.toFixed(2) + "px)";
          } else {
            wm.style.transform = "translate(-50%,-58%) translateZ(40px) skewX(" + sk.toFixed(2) + "deg) translateX(" + sx.toFixed(2) + "px)";
          }
          wm.style.filter = "";
        });
      }
      // outline echo trails lag behind
      if (echoes.length && !RM) {
        echoes.forEach((sp, i) => {
          const lag = (i + 1) * (1.8 + spd * .35);
          const ox = -vel * lag * 2.2 + Math.sin(now * .001 + i) * (2 + i);
          const oy = Math.cos(now * .0012 + i * .7) * (3 + i * 1.5) - spd * i * .4;
          const sc = 1 + i * .012 + spd * .004;
          sp.style.transform = "translate(calc(-50% + " + ox.toFixed(1) + "px), calc(-50% + " + oy.toFixed(1) + "px)) scale(" + sc.toFixed(3) + ") skewX(" + (vel * (i + 1) * .8).toFixed(2) + "deg)";
          sp.style.opacity = String(Math.max(.06, .28 - i * .07));
        });
      }
      // HUD
      if (hx) hx.textContent = "X " + String(Math.round(mx)).padStart(4, "0");
      if (hy) hy.textContent = "Y " + String(Math.round(my)).padStart(4, "0");
      if (hv) hv.textContent = "VEL " + (vel >= 0 ? "+" : "") + vel.toFixed(2);
      setFront();
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    document.addEventListener("touchstart", () => {
      cards.forEach(c => { [c.el._front, c.el._back].forEach(f => f && f._v && f._v.play().catch(()=>{})); });
    }, { once: true, passive: true });
    setFront();
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
