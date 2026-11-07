# 电影学习 · Film Learning

Plain static HTML/CSS/JS. No build step, backend, analytics, remote fonts, or API dependency. Every local asset and page link is relative, so the site works at `/film-learning/` or another subfolder. Nothing has been committed, pushed, or published.

## Three learning volumes

- `index.html` + `app.js`: eight-chapter Save the Cat! course; loglines, ten story types, hero, all fifteen beats, the forty-card Board, eight laws, revision pitfalls, and directing / short-film / AI-film applications. Includes a runtime-scaled beat explorer, an editorial beat index, eight quizzes, and a local logline self-check.
- `cinematography.html`, `cinematography.js`, `cinematography-data.js`: 17 imaging systems, 13 lens families, 12 mood test proposals, 12 director/DP studies, and the full 30-row audit of the supplied tables. Official/reputable source links accompany factual entries. Camera/lens tables are filterable; narrow screens scroll each table without widening the document.
- `composition.html` + `composition.js`: two chapters based on Film Reframed’s *Composition & Intention* (8 pages) and *Composing for Character* (7 pages). Five intentions; association, echo, juxtaposition, repetition, relationships, angles, eyelines, hero/profile framing, effects, and first–last comparison. Practical directing questions, checklists, and two quizzes are independent teaching additions.
- `style.css`: shared white editorial design.
- `editorial.js`: shared mastheads, concept rows, still/diagram pair placement, editorial director studies, and the additional beat index. Original teaching content and interaction modules remain intact.
- `stills-data.js` and `img/stills-manifest.json`: per-still provenance and descriptive metadata.
- `fact-check.md`: complete bilingual source-table audit with conclusions, corrections, qualifications, and URLs.

## Language and privacy

中英 / bilingual is the default. 中文 and English modes hide the other language; selection persists across all three pages using `film-learning-language` in localStorage. Bilingual English is a quieter secondary serif line. Story quiz progress and the logline stay in this browser only, with graceful handling when localStorage is unavailable. User text is never injected as HTML or sent to an outside service.

## Editorial design reference

Several pages of both supplied PDFs were rendered at 150 dpi and visually reviewed. At 1275 × 1650, their approximate side margin is 6.3%; the overview still column takes roughly 31% of the content width with a 4% gutter. The dominant flat heading accent sampled from the render is **#409aba**. The site uses these proportions for its concept rows, white paper, quiet black serif body, lowercase English headings, top-right kicker/title mastheads, thin table rules, and generous vertical space. Still-plus-diagram rows allocate 48% to the visual pair and 48% to text, with the same 4% gutter, to accommodate the additional requested diagram.

The font stack is Georgia, Noto Serif SC, Songti SC, STSong, SimSun, serif. PDF fonts were not extracted. No gradients, glow, dark backgrounds, heavy card fills, or decorative stock imagery are used. The shared top navigation remains sticky. Reduced-motion and print styles are included.

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

## Redesign QA

Headless Chromium matrix: **all three pages × all three language modes × desktop 1440×1100 / mobile 390×844 = 18 cases**, plus nine all-page/all-mode checks at 320 px. Checks include white backgrounds, document-width overflow, unique IDs, broken images, every displayed still’s matching drawing, desktop/mobile pair geometry, all story/composition quizzes, beat selection/scaling, the logline checklist and safe text handling, camera/lens filters, intentional horizontal table scrolling, language persistence across reload/navigation, and all three `file://` entry points. Screenshots and the full machine-readable report are outside the deployable folder in `/workspace/film-learning-shots/` (`redesign-*.png`, `redesign-qa-results.json`).
