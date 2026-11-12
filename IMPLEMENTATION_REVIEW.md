# Markdown requirements and implementation review

Review date: 2026-11-12. Reviewed all 11 Markdown briefs on `main` at `6093c4a5ac49af03ab0a1075443bff3a5e0fc1b9`, including unchanged design constraints and the new/updated subprompts. Implementation continues on `codex/aero-portfolio` / PR #1.

## Changes from this review

| Brief/update | Implementation | Verification |
|---|---|---|
| `loading screen.md` | 3DS-style dual display; supplied running/jumping clips; measured animation manifest; weighted selection with no immediate repeats and cooldowns; resource-based startup, Skip, preview, restart, fallback artwork, reduced motion | Downloaded and inspected all three clips; GIF metadata measured at 175 frames / 7000ms each; selection/cooldown tests pass; browser review recorded in PR |
| `soundfx.md` | One cached effects engine, 21 actual CC0 effects, category/master/event settings, category gains, bounded concurrency, cooldowns, interaction unlock, event wiring independent of iPod | All downloaded files validated as Ogg Vorbis; four sound-engine tests pass; asset origins/licence in `public/sounds/CREDITS.md` |
| `Music.md` | Third supplied MP3 added as track three; music preparation now discovers source attachments from Music.md and still scans local MP3s | Source downloaded and validated; manifest preparation produces three tracks |
| iPod improvement | Mii grooves on tracks one/two and uses a more energetic side-step on track three, tied to actual playing state | Original CSS choreography layered over supplied Mii artwork. No bespoke dance GIF was supplied or invented. Reduced motion shows a still |
| Mobile improvement | Original retro Devpost/LinkedIn/GitHub/Instagram icon treatments, consistent links, and Mii appearances in Notes, projects, About and the iPod | Same configured profile destinations retained; mobile/touch coverage remains part of the browser QA checklist |
| Existing Codex/design briefs | Kept React/TypeScript/Vite, shared desktop state, actual project routes/filters, NDot display type, Apple system UI font stack, accessibility controls, and no invented project claims | Production build/type checking is required before handoff |

## Startup readiness and animation behavior

- Startup waits on real font/artwork readiness, with bounded fallbacks; it shows no made-up progress percentage or technical process.
- It never holds the desktop for a seven-second GIF cycle. A fast cached load may show only a short transition.
- The supplied wide clips already contain character traversal, so the controller does not translate the full scene a second time.
- Normal in-app navigation does not replay startup. Restart respects the startup preference; an explicit startup preview remains open until dismissed.
- GIF durations come from frame metadata, not filenames. Optional reactions are loaded when selected.
- Interface effects remain silent before a trusted user interaction. The user's earlier explicit music-autoplay request remains implemented independently with a Play fallback when blocked.

## Audio sourcing

Kenney's creator page verifies the **Interface Sounds** pack is **CC0**: https://kenney.nl/assets/interface-sounds . The original licence and a pinned mirror revision were checked before use. The upstream archive returned an access error, so the matching licensed mirror files were used. All 21 effects are committed as actual local Ogg Vorbis files, with no proprietary Windows, Apple or Nintendo recordings substituted. Original formats are retained; browsers that cannot decode an effect skip it safely.

Music is still the user's provided attachments. Preparation downloads these into the deployment's local `public/music/tracks` directory; additional MP3s committed there are discovered on the next dev restart/build. Editing library metadata is preserved.

## Automated checks

- Music: repeat/stop behavior, shuffle avoids the current track, wheel angle-boundary handling, and unloaded-media time labels.
- Effects: silence before unlock, caching/rate limits, master/category gain, missing-file suppression, and maximum concurrency.
- Mii: nonrepeating eligible choices, cooldown exclusion, and cooldown expiry.
- Actual download and media-header checks were run locally.
- Build and browser results are recorded in PR #1 after each verified deployment; unexecuted checks are not counted as passes.

## Preserved limitations and content gaps

- The Mii uses supplied 2D renders and original CSS choreography; it is not a configurable Three.js character model.
- Engineering project technical descriptions, verified status, screenshots, architectures and metrics still require source material. Missing information is not fabricated.
- Mobile/touch, screen-reader behavior, natural end-of-track advancement, and all physical click-wheel gestures require end-to-end browser coverage; pure logic tests do not establish those results.
- No optional audio-reactive visualizer is included, and no fake audio bars are shown.
- Ogg effects intentionally fail silently when unsupported or missing; the MP3 music player remains independent.
