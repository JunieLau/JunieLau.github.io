# Black editorial edition — delivery record

## Scope

All ten pages use the new black design through `style.css`. Only the stylesheet and documentation changed. Every HTML page, JavaScript/data module, PDF-derived still and original drawing is byte-for-byte unchanged, verified against pre-redesign SHA-256 hashes. No commit, push or publication was performed.

## Visual system

- Page: #0A0A0A; primary type: #F2F2EE; secondary type: #C3C3BD; actions/current navigation: #F06552.
- Contrast on the page: primary **17.64:1**, secondary **11.18:1**, accent **6.31:1**. Body links also use underlines; focus uses a clear 3 px outline.
- System sans/Arial with Noto Sans SC, Noto Sans CJK SC, PingFang SC and Microsoft YaHei fallbacks. The installed Inter mapped to an extra-light face, so the reliable regular system-sans stack was used rather than risking thin teaching text.
- Body 18–20 px, metadata/captions 14–15 px; responsive headings and naturally wrapping titles. English follows Chinese in bilingual mode, using readable secondary text at the same body size. The nonselected language blocks stay hidden in single-language modes, including the open Books menu.
- Outer width up to 1248 px, prose up to 780 px, desktop 216 px course TOC and 56 px gap. Main side padding is 56 px on desktop and 22 px on mobile. Section gaps total 96 px desktop / 60 px mobile.
- Editorial image/text rows, subtle exercise panels, thin-rule tables with contained horizontal scrolling. No glow, neon, glass, gradients or universal outlined cards.
- Original still colors and complete frames remain intact via contain. Paired images have equal display-slot heights on desktop and stack on mobile. Drawing images use a light-stroke filter; inline diagrams use neutral light strokes with transparent open geometry. Pyramid numbers enlarge on phones.
- Desktop navigation remains sticky. Mobile navigation stays in normal flow, avoiding a large fixed header over the lesson. No smooth scrolling, scroll snapping or scroll hijacking. Reduced motion disables transitions.

## QA

Headless Chromium passed:

- **60** main combinations: ten pages × three languages × 1440×1100 / 390×844. No document overflow, broken images, duplicate IDs, JavaScript errors or language-visibility failures.
- **30** additional 320 px cases and all **ten** direct `file://` entries.
- All original course quizzes, logline checklist/safe text handling, beat selection/runtime scaling, camera/lens searches, composition quizzes, book quizzes, local links and cross-page/reload language persistence.
- All seven history countries, URL hashes, expand/collapse, keyboard arrows/Home/End and reload.
- **60** final-detail checks: open Books menus stay contained and pure-language, chapter anchors remain clear of sticky navigation, and text is not clipped.
- **60** visible-text audits: no text below 14 px and no text/background contrast below 4.5:1.
- **Six** mode/viewport checks for matched still/diagram geometry, original image color, contain, visible keyboard focus and reduced motion.
- Representative desktop, mobile, Chinese-only and English-only captures were visually reviewed.

Machine-readable results/scripts live outside the deployable folder in `/workspace/film-learning-shots/`: `black-qa-results.json`, `black-text-audit.json`, `black-detail-qa.json`, `black-extra-qa.json`, `black-content-preservation.json`, and their corresponding Python scripts.

No functional or layout failures remain in the tested Chromium matrix. Other browser engines were not tested. Existing research qualifications and supplied-still rights cautions remain unchanged; no rights clearance is claimed by this visual redesign.

## Screenshots

- `/workspace/film-learning-shots/black-beat-sheet-desktop.png`
- `/workspace/film-learning-shots/black-books-desktop.png`
- `/workspace/film-learning-shots/black-books-mobile.png`
- `/workspace/film-learning-shots/black-bravia-desktop.png`
- `/workspace/film-learning-shots/black-cameras-table-desktop.png`
- `/workspace/film-learning-shots/black-chinese-mobile.png`
- `/workspace/film-learning-shots/black-cinematography-desktop.png`
- `/workspace/film-learning-shots/black-comparison-desktop.png`
- `/workspace/film-learning-shots/black-composition-desktop.png`
- `/workspace/film-learning-shots/black-composition-mobile.png`
- `/workspace/film-learning-shots/black-composition-stills-desktop.png`
- `/workspace/film-learning-shots/black-english-desktop.png`
- `/workspace/film-learning-shots/black-film-history-desktop.png`
- `/workspace/film-learning-shots/black-films-desktop.png`
- `/workspace/film-learning-shots/black-films-mobile.png`
- `/workspace/film-learning-shots/black-freytag-desktop.png`
- `/workspace/film-learning-shots/black-freytag-mobile.png`
- `/workspace/film-learning-shots/black-hero-journey-desktop.png`
- `/workspace/film-learning-shots/black-hero-journey-mobile.png`
- `/workspace/film-learning-shots/black-history-france-desktop.png`
- `/workspace/film-learning-shots/black-history-germany-desktop.png`
- `/workspace/film-learning-shots/black-history-italy-desktop.png`
- `/workspace/film-learning-shots/black-history-japan-desktop.png`
- `/workspace/film-learning-shots/black-history-mobile.png`
- `/workspace/film-learning-shots/black-history-usa-desktop.png`
- `/workspace/film-learning-shots/black-history-ussr-desktop.png`
- `/workspace/film-learning-shots/black-index-desktop.png`
- `/workspace/film-learning-shots/black-index-mobile.png`
- `/workspace/film-learning-shots/black-modern-monomyth-desktop.png`
- `/workspace/film-learning-shots/black-three-act-desktop.png`

## Package

`/workspace/film-learning.tar.gz` — the complete static site, relative paths, no build step; screenshots and test scripts are not included in the deployment archive.
