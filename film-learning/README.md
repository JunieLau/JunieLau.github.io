# 电影学习 · Film Learning

Plain static HTML/CSS/JS. No build step, backend, analytics, external font request, or API dependency. All local assets and navigation use relative paths, including when hosted at `/film-learning/`.

## Entry points
- `index.html`: eight-chapter Save the Cat! teaching course, interactive 15-beat explorer with runtime scaling, one quiz per chapter, local logline worksheet, and source notes.
- `cinematography.html`: 17 camera / imaging-system entries, 13 lens families, 12 mood-oriented test proposals, 12 director / cinematographer studies, and a 30-row audit of the two supplied screenshots.
- `fact-check.md`: complete bilingual source-table audit, also downloadable on page 2.
- `style.css`, `app.js`, `cinematography-data.js`, `cinematography.js`: supporting assets.

## Preview / publish
Serve this folder with any static server, or publish these files in the root of the intended GitHub Pages repository. No commit, push, repository creation, or external publication has been performed.

Language defaults to bilingual. Language choice, quiz progress, and the logline are stored locally in the browser, with graceful fallback if localStorage is unavailable. User text is not inserted as HTML or sent to a service.

## Research boundaries
- This is an independent paraphrased guide based on official public materials and reputable reading notes, not a book translation or a claim to have inspected an entire licensed Chinese edition.
- The beat targets use the original 110-page model; displayed percentages are page/110. The current official site uses a different rounded percentage model, explicitly distinguished on page 1.
- Finding Nemo beat boundaries are an interpretive teaching reading, not the filmmakers' documented writing process or film timestamps. Theme placement and act boundaries can reasonably be debated.
- Camera dynamic range is manufacturer-rated, not a controlled cross-brand test. Frame rates depend on recording window, codec, media, and licenses.
- Mood-to-equipment pairings and director-style translation exercises are explicitly marked as creative proposals, not provable prescriptions or historical rental lists.
- Audit labels: 8 confirmed, 16 corrected/qualified, 6 not objectively verifiable. Each original row is covered, with facts separated from aesthetic judgments and source URLs supplied.

Headless Chromium QA: both pages at 1440×1000 and 390×844 in all three modes (12 cases). Tested language persistence, unique IDs, no page-width overflow, every quiz, logline storage and checklist, beat selection/scaling, table filters, and horizontal table scrolling. No JavaScript errors. Screenshots and detailed test results are in `/workspace/film-learning-shots/` (not needed for deployment).
