# 电影学习 · Film Learning

Plain static HTML/CSS/JS. No build step, backend, analytics, remote fonts, or API dependency. Every local asset and page link is relative, so the site works at `/film-learning/` or another subfolder. Nothing has been committed, pushed, or published.

## Original learning modules

- `index.html` + `app.js`: eight-chapter Save the Cat! course; loglines, ten story types, hero, all fifteen beats, the forty-card Board, eight laws, revision pitfalls, and directing / short-film / AI-film applications. Includes a runtime-scaled beat explorer, an editorial beat index, eight quizzes, and a local logline self-check.
- `cinematography.html`, `cinematography.js`, `cinematography-data.js`: 17 imaging systems, 13 lens families, 12 mood test proposals, 12 director/DP studies, and the full 30-row audit of the supplied tables. Official/reputable source links accompany factual entries. Camera/lens tables are filterable; narrow screens scroll each table without widening the document.
- `composition.html` + `composition.js`: two chapters based on Film Reframed’s *Composition & Intention* (8 pages) and *Composing for Character* (7 pages). Five intentions; association, echo, juxtaposition, repetition, relationships, angles, eyelines, hero/profile framing, effects, and first–last comparison. Practical directing questions, checklists, and two quizzes are independent teaching additions.
- `style.css`: shared black editorial design; the latest override section documents the current visual system.
- `editorial.js`: shared mastheads, concept rows, still/diagram pair placement, editorial director studies, and the additional beat index. Original teaching content and interaction modules remain intact.
- `stills-data.js` and `img/stills-manifest.json`: per-still provenance and descriptive metadata.
- `fact-check.md`: complete bilingual source-table audit with conclusions, corrections, qualifications, and URLs.

## Language and privacy

中英 / bilingual is the default. 中文 and English modes hide the other language; selection persists across all ten pages using `film-learning-language` in localStorage. Bilingual English follows Chinese in an equally readable sans-serif line. Story quiz progress and the logline stay in this browser only, with graceful handling when localStorage is unavailable. User text is never injected as HTML or sent to an outside service.

## Editorial design reference and current black edition

Several pages of both supplied PDFs were rendered at 150 dpi and visually reviewed. At 1275 × 1650, their approximate side margin is 6.3%; the overview still column takes roughly 31% of the content width with a 4% gutter. The dominant flat heading accent sampled from the render is **#409aba**. The site uses these proportions for its concept rows, white paper, quiet black serif body, lowercase English headings, top-right kicker/title mastheads, thin table rules, and generous vertical space. Still-plus-diagram rows allocate 48% to the visual pair and 48% to text, with the same 4% gutter, to accommodate the additional requested diagram.

The paragraph above records the original light editorial reference, not the current palette. The current edition keeps that composition and all course material but uses **#0A0A0A** backgrounds, **#F2F2EE** primary text, **#C3C3BD** secondary text, and restrained **#F06552** navigation/action accents. Fonts are Arial/system sans with Noto Sans SC, Noto Sans CJK SC, PingFang SC and Microsoft YaHei fallbacks. Body text is 18–20 px; captions and metadata are 14–15 px. English stays readable rather than becoming a miniature translation. See `black-redesign.md` for the final design and QA record.

There are no gradients, glow, glass effects, forced smooth scrolling or scroll snapping. Still images retain their original colors and complete frames; paired drawings use light lines on black. Desktop navigation is sticky; mobile navigation returns to normal document flow to preserve reading space. Keyboard focus uses a visible three-pixel outline; reduced motion disables transitions.

## Supplied stills and original line drawings

At the user’s explicit request, `pdfimages -all` extracted all **27** embedded images from the two PDFs. They were optimized to JPEG quality ~82 without upscaling (maximum 1600 px). Five are smaller overview repetitions of the same intention frames; the site uses the better detail-page versions, yielding **22 distinct displayed stills**, each paired with its own original thin-stroke SVG compositional study. Paired frames are side by side on desktop and stacked on mobile. Other concept slots retain clearly labeled original neutral schematics, not claimed film stills.

Each still carries a Film Reframed guide/page credit. Confident film-title recognitions are explicitly labeled **visual identification**, not passed off as captions from the PDFs; uncertain titles remain unconfirmed. Schematics are simplified interpretive readings, not exact optical measurements, original production storyboards, or guaranteed psychological laws. See `img/README.md` and the JSON manifest for individual filenames and source mappings.

Film Reframed is credited for the framework and source guides; film-still rights remain with the respective rights holders. Attribution does not imply endorsement or constitute a license. The supplied PDFs themselves and their embedded fonts are **not** included. Before public deployment, independently assess permissions or applicable copyright exceptions for the extracted stills.

## Replacing the images later

- Names use `intention-<concept>-<description>.jpg` or `character-<concept>-<description>.jpg`.
- A paired drawing uses the **same basename** plus `-diagram.svg`.
- Replace a JPG in place to retain the existing links. Keep a 16:9 presentation in mind; the current layout preserves the source aspect using `object-fit: contain` instead of distorting or silently cropping it.
- If a frame changes, update its drawing too. Drawings use a `viewBox="0 0 360 203"` and the shared accent/ink palette.
- Update `stills-data.js` **and** `img/stills-manifest.json` together for credits, descriptions, page references, and translated copy. No build is required.
- The five `intention-overview-*.jpg` assets are extraction/provenance duplicates, not extra displayed stills.
- Other replaceable concept slots are generated by `lineVisual()` in `editorial.js`. Replace that SVG markup with a relative `<img src="./img/descriptive-name.jpg">`, preserve the caption, and provide accurate source/rights information. Do not silently present a neutral schematic as a frame from the named film.

## Research boundaries

- Save the Cat! is independently paraphrased from official public material and reading notes; this is not a book translation or a claim to have inspected a licensed Chinese edition page by page.
- Beat targets use the original **110-page** model and percentages calculated as page/110. Today’s official rounded percentage scheme is explicitly distinguished rather than mixed with it.
- The Finding Nemo mapping is an interpretive teaching reading, not documented Pixar methodology or actual film timestamps; theme and act boundaries can be debated.
- Dynamic range figures are manufacturer-rated, not controlled cross-brand rankings. Frame rates depend on recording window, codec, media, firmware, and licenses.
- Mood packages and director-style translation exercises are creative test proposals, not guaranteed aesthetics or historical rental lists.
- Audit status totals: **8 confirmed, 16 corrected/qualified, 6 not objectively verifiable**. Every original row is covered, separating facts from aesthetic judgments.
- Both Film Reframed guides were fully read and all pages rendered; several were additionally rendered at 150 dpi for the redesign. Source concepts are paraphrased, not reproduced as long quotations. Context-sensitive symbolism and visual psychology are presented as hypotheses to test.

## Preview and package

Serve the folder with any static server, for example from its parent:

```sh
python3 -m http.server 8765 --directory /workspace
# http://localhost:8765/film-learning/
```

It also opens through `file://` without fetch/API calls. To package the complete deployable folder:

```sh
cd /workspace && tar czf film-learning.tar.gz film-learning
```

## Earlier light-edition QA (historical)

Headless Chromium matrix: **all three pages × all three language modes × desktop 1440×1100 / mobile 390×844 = 18 cases**, plus nine all-page/all-mode checks at 320 px. Checks include white backgrounds, document-width overflow, unique IDs, broken images, every displayed still’s matching drawing, desktop/mobile pair geometry, all story/composition quizzes, beat selection/scaling, the logline checklist and safe text handling, camera/lens filters, intentional horizontal table scrolling, language persistence across reload/navigation, and all three `file://` entry points. Screenshots and the full machine-readable report are outside the deployable folder in `/workspace/film-learning-shots/` (`redesign-*.png`, `redesign-qa-results.json`).

## Reading library and seven-map history expansion

The static site now has ten pages:

- `index.html` — existing complete Save the Cat! course (still the default home).
- `books.html` — elegant reading contents and a fifteen-row cross-model comparison.
- `hero-journey.html` — Campbell’s 1949 text vs the 1990 conversations title, three phases, seventeen motifs, Vogler’s twelve-stage screen adaptation, film readings, director checklist, quiz.
- `three-act.html` — Aristotle’s Poetics distinguished from modern Field-style screenplay paradigms; concepts, film study, checklist, quiz.
- `freytag.html` — five parts / three moments, original SVG pyramid, original central Climax distinction, film transfer and exercise, checklist, quiz.
- `modern-monomyth.html` — explicitly defined editorial umbrella: Vogler, Harmon, Lawrence/Jewett, Murdock; compression, critiques, short/AI-film exercise, checklist, quiz.
- `films.html` — Faces (1968), Pretty Woman (1990), Glazer’s BRAVIA Paint (2006), comparison with Fuglsig’s Balls (2005), and The Zone of Interest (2023). Verified credits are separated from editorial study observations.
- `film-history.html` — UK, Germany, Italy, Japan, France, USA, USSR/Eastern Europe: bilingual expandable era trees from all seven supplied PDFs; hash-linked accessible country tabs, keyboard arrows/Home/End, expand/collapse controls, per-tab correction notes and downloadable original Chinese extractions.
- `cinematography.html` and `composition.html` — existing image and composition courses retained, with their authorized user-PDF stills and paired original diagrams unchanged.

Shared navigation now groups the five books/models under Books, with a reading/comparison entry plus Films, Film History, Image, and Composition. It is injected consistently by `site-nav.js` on every page. `library.js` renders the new reading/film courses, original line drawings, and quizzes. `history-data.js` holds the editorial bilingual history trees; `film-history.js` supplies accessible interaction. `editorial.js` supports the new mastheads without applying Save the Cat-only transforms to them. Language choice remains `bi` / `zh` / `en` under localStorage key `film-learning-language`, default bilingual. All paths remain relative; no build, dependencies, server-side component, or fetch API is required.

Research boundaries: see `books-research.md` and `history-notes.md`. Modern Monomyth is explicitly not misrepresented as a uniquely identified book. Aristotle did not literally prescribe three screenplay acts. Freytag’s original Climax is central, not the modern late-film climax. The comparison table is interpretive rather than a conversion standard. Film-history fact-checking is deliberately light; original Chinese source extractions in `source-notes/` remain uncorrected provenance records, not verified teaching text. No original mind-map images are reproduced and no new copyrighted web stills were downloaded.

Latest regression test: ten pages × three languages × desktop/mobile (60 combinations), plus 30 checks at 320px, all ten direct `file://` pages, shared-nav persistence, local page/source-record links, existing beat/logline/camera/composition interactions, new book quizzes, and all seven history tabs including keyboard, URL hash, and expand/collapse. Results and reproducible Playwright script: `/workspace/film-learning-shots/books-qa-results.json` and `books-qa.py`. Screenshots: `books-*.png`, `history-*.png` in the same screenshots folder. Package contains site files only, not screenshots or research renders.

Complete packaged file inventory: `FILELIST.txt`. Full delivery summary, history corrections, and the original 30-row equipment audit: `delivery-report.md`.

Additional final checks: 36 sticky-anchor clearance tests across all languages and both viewport widths, plus paired-still DOM and layout orientation checks, passed (`books-anchor-qa.json` in the screenshots folder). Extra reviewed captures include `history-mobile-tree.png`, `books-chinese-mobile.png`, `books-english-desktop.png`, and `books-zone-desktop.png`.

## Current black-edition QA

All ten pages were rechecked in bilingual, Chinese and English at 1440×1100 and 390×844, including overflow, JavaScript errors, image loading, local links and all learning interactions. Additional 320 px, direct-file, language-persistence, keyboard-tab, full-frame still/diagram and reduced-motion tests are included. Every visible text node was also checked for minimum 14 px size and 4.5:1 text contrast in all 60 main combinations. Final results, scripts and `black-*.png` screenshots are under `/workspace/film-learning-shots/`; the current delivery details are in `black-redesign.md`. All HTML, JavaScript, data, supplied stills and diagram files are unchanged by this visual-only redesign. Nothing has been committed, pushed or published.


## Current expanded mind-map revision

`film-history.html` now loads dedicated `film-history.css` and `history-supplement.js` alongside the preserved `history-data.js` and rewritten `film-history.js`. The seven PDFs’ left-root / vertical-spine / rightward-branch topology is recreated with selectable HTML nodes and measured SVG connectors. Desktop maps have internal scrolling and 100–150% zoom; mobile uses nested collapsible trees without an oversized canvas. Country hashes, keyboard tab navigation, all original topic accounts, source-record downloads and the shared language preference remain. Added teaching nodes have a small dot and source links. Full corrections and the complete added-film manifest are in `history-notes.md`.

Current regression evidence is **DOM-only**: 42 combinations (seven countries × three modes × desktop/mobile logic) pass state, expansion, hash, parent/child, source-link and content-preservation checks. The cinematography DOM suite also passes again. No current real-browser geometry/overflow/image check or new mindmap-/wide- screenshot is claimed; those remain pending in this revision. Historical screenshot/QA claims above refer to previous editions only.
