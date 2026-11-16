# Ten-area polish review — 16 November 2026

The author requested autonomous work through the ten proposed areas. Changes preserve the Aqua/iOS 6 controls, dark text, Nothing headings, E7 wallpaper, single reactive Mii app and supplied media. Work is on codex/aero-portfolio; this review does not authorize or claim a main merge, production release or DNS change.

## Résumé selection

The previous website PDF was created on 5 November 2026 (149,030 bytes). A later download of that same PDF on 16 November had a newer filesystem time but identical old content. The chosen `Resume__print___Copy_.pdf` is the newest general résumé found by scanning résumé-named local files and connected Drive. PDF metadata gives 13 November 2026 at 05:25:40 UTC; Drive's corresponding stored PDF was updated at 05:27:19 UTC. The same-day `Azaan ECE resume.pdf` is a biomedical co-op-specific version; the general revision is better suited to the portfolio. No claim is made that inaccessible or unnamed files were exhaustively searched.

The chosen original is unchanged: 121,983 bytes, one page, SHA-256 `b9b9d9d4cfa06cf4d95d9a012ef54e5ac9d0e9fb41f816dd24ab3d228eaefd59`. Its NeuroSight award/project, rehabilitation work and expanded Biotron experience are present, and the older stray “bullets” line is absent. Core Graphics regenerated the complete 1440×1864 preview; the actual image was visually inspected for legible content, complete margins and the final Technical Skills section. The website displays the revision date, and its existing source-hash guard verifies the preview/PDF pair.

## Ten-area outcome

| Area | Work and verification |
| --- | --- |
| 1. Résumé | Replaced original PDF and full-page preview/manifest; compared two latest Drive candidates and local PDF metadata; visually inspected the rendered page. |
| 2. Windows | Preserved centered title math and drag/resize lifecycle; added active-title/focus detail and larger touch corner grips. Existing release-coordinate, restore-from-maximized, rotation and resize tests pass. |
| 3. Mobile/tablet | Added visualViewport height handling for the software keyboard, leaving pinch zoom intact and saved frames unchanged. Added keyboard/restore/pinch regression coverage. Shortcut drag now accounts for the final release coordinate and cancels cleanly on blur/hidden tabs. |
| 4. Aqua styling | Retained established palette/typography; unified navy labels, focus rings, active title highlights and touch control glyphs. Menus/modals scroll within the visible viewport. |
| 5. Photos | Gloss/bubble animation now waits for each photo's load event. Missing images show a framed fallback. Retained all five aspect-ratio slots, individually configured focal points, silent fitted MP4 and manual/reduced-motion behavior; packaged-media and allocation tests pass. |
| 6. Mii | Retained and audited all original GIFs, exact frames/timing, jump/music/Rick/thinking priorities, replay and still fallbacks. The full asset/reaction suite passes; no replacement animation is invented. |
| 7. iPod | Holds stop on blur, hidden tabs and lost capture; keyboard actions work after a long press. Added missing-cover fallback and reset stale timing after a failed track. Larger touch list/volume/wheel targets and sufficient screen space remain scrollable. Track order, repeat, shuffle, seek math and sound tests pass. |
| 8. Loading | Preserved randomized nonrepeating runners, measured crossing, bounded asset wait and skip/failure/reduced-motion policies. Preloaded the supplied Nothing font to reduce readiness latency. Startup state/timing and original runner asset tests pass. |
| 9. Terminal/menus | Preserved requested minimal cd command allowlist; improved draft/history restoration and contained scrolling. Added left/right/up/down/Home/End menu traversal, modal Tab containment and opener-focus restoration, graceful clipboard/fullscreen failures, and touch-aware help text. |
| 10. Quality/GitHub | Added build-time asset preflight for 64 files including all eight music tracks, metadata description and local project images. Local lint/build pass all 68 tests with no new runtime dependencies. GitHub/Vercel/browser evidence follows below. |

## Project content and provenance

Current main `projects.md` supplies the GOOSE architecture, NeuroSight links and three downloaded ClinTempo/GOOSE images; the file is copied into the review branch as the implementation source. The new résumé supplies NeuroSight, rehabilitation and Biotron facts. Existing project IDs remain stable. No unprovided GitHub repository is invented. The conflicting ClinTempo figures (25% in the résumé, 45% in projects.md) are omitted from portfolio text instead of selecting an unsupported resolution. Supplied screenshots were inspected and committed locally rather than relying on expiring attachments. Numeric outcomes in the original résumé are not changed.

## Automated checks and practical limits

`npm run lint` and `npm run build` pass. The build prepares eight music tracks, checks 64 local assets, passes 68 behavior tests, type-checks and bundles. New tests exercise the keyboard-sized workspace, expanded/floating frames, restored keyboard height, pinch zoom and invalid viewport data. Existing media, GIF, reaction, boot, sound, history/allowlist and gesture checks pass. React review covered hook cleanup, modal focus, stable frame/page keys, inactive-app rendering, reduced motion, accessible labels and local image fallback behavior.

The browser access host is unavailable, so native Chrome was used. Raising its window restored screenshot capture. Desktop screenshots confirm the E7/violet background, Aqua/dark labels, centered titles, compact Find Me, full résumé preview and distinct Mii reactions. Phone (375×667) and tablet (768×1024) Chrome emulation were inspected, including scrolling to the lower iPod controls. A tablet-only signal bug was exposed: its pseudo-elements were positioned against the shared signal group because `position:relative` existed only below 760px. Each button now owns its pseudo-element on every breakpoint and has a 44px touch target; the redundant back control remains hidden.

The first preview also exposed a lazy-image dimension notice. Intrinsic width/height metadata was read from the supplied photo/project/artwork files and applied to every lazy image. The iPod screen no longer changes volume while its parent window is scrolled; wheel volume navigation stays on the actual click wheel. The follow-up changes were checked in the final preview below. No physical iPhone/iPad/Safari or performance-score claim is made.

The prior separate media-repository request is now fulfilled at https://github.com/duxentos/photos.md. GitHub's form loaded successfully, and the public repository was created and initialized. Commit `268c4fc0300e8993cbbd3dc65253443c02caef87` contains 22 files: all seventeen optimized supplied photos, silent MP4 and poster, README.md/photos.md descriptions and media.json source metadata. GitHub's recursive tree readback verified every path and blob SHA. The website's existing photos.md catalogue remains committed.


## First deployed checkpoint

Application commit `c46d4f71ae9657223fa442c90c1afc61b1d5f423`, deployment `dpl_rSxBV6Bsz8HbAe93vRiMtnnwL3Me`, is READY. Vercel independently passes all 68 tests and the 64-file preflight. The new PDF returns application/pdf and exactly 121,983 bytes; its preview and all three project images return the correct image types and exact committed byte sizes. The music manifest is available. NeuroSight's demo/Devpost URLs and the GitHub profile return HTTP 200.

Native Chrome verified the loader's requested wording, automatic exit to only About Me/Mii, About Me expand/restore, menu End/right/down traversal, Spotlight Shift-Tab/Tab wrap, Enter on search dismissal and opener focus restoration, Terminal help/cd command and unfinished draft recovery after Up/Down, and opening the replacement PDF. Chrome's PDF viewer loaded the one-page document with NeuroSight and current Biotron text. Find Me selects thinking; iPod selects dancing; the full song list keeps Rick/track three last (8 of 8), playing it selects the supplied happy/star-glasses animation. An 800ms held seek retains the song, and a subsequent keyboard Enter advances normally. Playback time advanced on ordinary and Rick tracks. Music was muted/paused during testing. The first console observation reported zero messages and no page errors; its dimension notice triggered the follow-up correction above.


## Final responsive follow-up

Commit `b0b4f9141d1c23ad2824274e50a5347737f0fa71` deployed READY as `dpl_BimiCQHjdd4BMv3TPmwk3T7dx9Xc`, independently passing all 68 tests and the asset preflight. Native Chrome at 768×1024 confirms separate red/yellow/green signals in the tablet title bars, with both default apps available; 375×667 confirms the résumé toolbar/date, readable full-page preview and reachable controls. The initial default-app check reported zero page errors and no Issues notices.

Opening Résumé then produced one lazy-image improvement notice even though Elements showed its exact width=1440 and height=1864 attributes. The résumé window is itself opened on demand, so its first page now loads eagerly at high priority and reserves an explicit aspect ratio; any later pages remain lazy with reserved aspect ratios. This removes an unnecessary delay for the primary page. The notice was inspected rather than hidden. Pointer-drag attempts through emulation did not produce a reliable isolated movement measurement; gesture/release/resize behavior remains covered by the passing model tests, not claimed as physically device-tested.


## Verified final checkpoint

Final tested application commit: `1b86cacd858389dd675a705b1f34345d27a3e55a`.
Vercel deployment: `dpl_35XPLQtrXoi6YN9n7ZN19DzmuruY` (READY).
Preview: https://personal-website-fruitiger-87d557shh-azaank041208-hash.vercel.app

Vercel independently passed all 68 tests and the 64-file asset preflight, then completed the production bundle. Native Chrome's final 375×667 check opened Résumé and visibly confirmed the full-page preview, clear 13 November revision label, centered title and three separate controls. The Issues panel then reported **0 page errors, 0 breaking changes and 0 possible improvements**, including after the résumé image loaded; the lazy-image notice is resolved. DevTools was closed afterward and the preview left with About Me/Mii open and music paused. The supplied PDF content was not edited.

The complete pass covers all ten requested areas through concrete refinements, source/media checks and recorded verification. Browser evidence is limited to native desktop Chrome and Chrome phone/tablet emulation. Actual iOS Safari, a physical software keyboard, audible sound-effect QA, a measured performance score and isolated physical touch dragging are not claimed. Model tests cover keyboard viewport behavior and gesture geometry. The following documentation-only commit preserves this tested application tree. No main merge, production promotion or DNS change was made.
