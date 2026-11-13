> Current refinement: see [IMPROVEMENTS_REVIEW.md](IMPROVEMENTS_REVIEW.md). The following is historical and superseded where the latest Improvements brief differs.

# Markdown requirements and implementation review

Review date: 2026-11-12. Reviewed all 11 Markdown briefs on `main` at `6093c4a5ac49af03ab0a1075443bff3a5e0fc1b9`, including unchanged design constraints and the new/updated subprompts. Implementation continues on `codex/aero-portfolio` / PR #1.

## Changes from this review

| Brief/update | Implementation | Verification |
|---|---|---|
| `loading screen.md` | Full-screen Aqua/Mii scene, replacing the original 3DS shell at the user’s later request; fixed 5-second duration, direct reveal without fading, Skip/Escape, preview/restart, static fallback and reduced motion; supplied clips and measured animation manifest retained | Downloaded and inspected all three clips; GIF metadata measured at 175 frames / 7000ms each; selection/cooldown tests pass; browser review recorded in PR |
| `soundfx.md` | One cached effects engine, 21 actual CC0 effects, category/master/event settings, category gains, bounded concurrency, cooldowns, interaction unlock, event wiring independent of iPod | All downloaded files validated as Ogg Vorbis; four sound-engine tests pass; asset origins/licence in `public/sounds/CREDITS.md` |
| `Music.md` | Third supplied MP3 added as track three; music preparation now discovers source attachments from Music.md and still scans local MP3s | Source downloaded and validated; manifest preparation produces three tracks |
| iPod improvement | Mii grooves on tracks one/two and uses a more energetic side-step on track three, tied to actual playing state | Original CSS choreography layered over supplied Mii artwork. No bespoke dance GIF was supplied or invented. Reduced motion shows a still |
| Mobile improvement | Original retro Devpost/LinkedIn/GitHub/Instagram icon treatments, consistent links, and Mii appearances in Notes, projects, About and the iPod | Same configured profile destinations retained; mobile/touch coverage remains part of the browser QA checklist |
| Existing Codex/design briefs | Kept React/TypeScript/Vite, shared desktop state, actual project routes/filters, NDot display type, Apple system UI font stack, accessibility controls, and no invented project claims | Production build/type checking is required before handoff |

## Current startup and interaction behavior

The latest user instruction supersedes the earlier timing and desktop arrangement:

- Startup is a full-screen Aqua scene without a handheld shell. Every normal/restart/preview sequence lasts a fixed 5 seconds and reveals the desktop directly, without an entry or exit fade. Skip/Escape enters earlier. Network speed does not extend the timer.
- Status text reflects actual font/artwork readiness; static artwork stays visible while a GIF loads.
- The four desktop shortcuts are Find Me, Résumé, Project Files and About Me. The Dock contains Home, Terminal, Notes and iPod. Social shortcuts live within Find Me.
- Touch layouts use the home screen and floating windows with draggable title bars, expand/restore, Back to Desktop, Home and 44px controls. Content scrolling is separate from title-bar movement; no hover is required.
- One capture listener handles trusted clicks. Action-specific audio takes priority, then a generic CC0 tick fills gaps, including stopped event propagation. Fast ticks reuse the existing audio handle. Mute and volume preferences remain effective.
- Supplied Mii clips have distinct contextual roles; random tap reactions avoid immediate repeats. Only the iPod companion responds to music playback.
- In-app navigation does not replay startup; preferences persist.

## Audio sourcing

Kenney's creator page verifies the **Interface Sounds** pack is **CC0**: https://kenney.nl/assets/interface-sounds . The original licence and a pinned mirror revision were checked before use. The upstream archive returned an access error, so the matching licensed mirror files were used. All 21 effects are committed as actual local Ogg Vorbis files, with no proprietary Windows, Apple or Nintendo recordings substituted. Original formats are retained; browsers that cannot decode an effect skip it safely.

Music is still the user's provided attachments. Preparation downloads these into the deployment's local `public/music/tracks` directory; additional MP3s committed there are discovered on the next dev restart/build. Editing library metadata is preserved.

## Validation

- Startup: duration selection is checked at 1, 1.5 and 2 seconds and remains bounded for out-of-range/non-finite inputs. All 15 behavior tests pass locally.
- Music: repeat/stop behavior, shuffle avoids the current track, wheel angle-boundary handling, and unloaded-media time labels.
- Effects: silence before unlock, caching/rate limits, master/category gain, missing-file suppression, and maximum concurrency.
- Mii: nonrepeating eligible choices, cooldown exclusion, and cooldown expiry.
- Actual download and media-header checks were run locally.
- Browser review observed the startup preview with its running Mii and the transition back to the desktop. Reduced-motion and explicit dismissal checks are recorded in PR #1.
- A browser review exposed alphabetical music ordering (one, three, two); source-order sorting and a regression test now keep one, two, three, followed by naturally sorted local additions.
- `?startup=preview` and the desktop-menu Preview Startup command provide repeatable explicit previews. Escape dismisses the startup overlay; Tab stays within its two controls.
- Build and browser results are recorded in PR #1 after each verified deployment; unexecuted checks are not counted as passes.

## Preserved limitations and content gaps

- The Mii uses supplied 2D renders and original CSS choreography; it is not a configurable Three.js character model.
- Engineering project technical descriptions, verified status, screenshots, architectures and metrics still require source material. Missing information is not fabricated.
- Mobile/touch, screen-reader behavior, natural end-of-track advancement, and all physical click-wheel gestures require end-to-end browser coverage; pure logic tests do not establish those results.
- No optional audio-reactive visualizer is included, and no fake audio bars are shown.
- Ogg effects intentionally fail silently when unsupported or missing; the MP3 music player remains independent.

## Browser loading-screen review (2026-11-12)

The preceding implementation at `1b721e3` was exercised in native Chrome: the running Mii preview rendered; Tab cycled between its two controls; Escape entered the desktop; Reduced Motion produced the static Mii and suppressed desktop bubbles; Enter dismissed the preview and restored focus to its launcher. Normal motion was restored afterward. System Preferences reported “test sound played” after the real playback promise resolved. iPod track one continued playing on the desktop.

A transient blank image on a first reaction led to preloading each replacement before swapping it. Later user instructions remove the handheld framing, shorten startup to 1–2 seconds and remove fading; the earlier indefinite-preview/readiness-only behavior is superseded. Final build and visual verification results are recorded in PR #1. Mobile/touch coverage is not claimed by these Chrome checks.

## Touch/feedback follow-up

The current pass adds shared click fallback/deduplication and rapid-click replay tests. The CSS/layout implementation includes phone/tablet/coarse-pointer support; these tests alone do not establish physical touchscreen or screen-reader coverage. Final production build and browser observations are recorded in PR #1.

## Latest user override: icon dragging, CLI syntax and Notes

Phone/tablet desktop shortcuts now support dragging into persistent grid order, and touch app windows now support title-bar dragging under the latest user instruction. Dragging does not launch an app; tapping does. Icon order is validated before restoring and positions adapt to viewport changes. Keyboard rearrangement uses Alt + arrows.

Every Terminal command now uses `cd -something`, including help, apps, profiles, playback and utilities. The command list lives inside Terminal. Notes no longer contains that guide; it is a simple welcome to Azaan’s personal utopia with the supplied Mii.

All 17 behavior tests pass locally, including saved-order recovery and command parsing/routing. Final production/browser observations are recorded in PR #1; logic tests are not a physical-touch pass.

## Latest override: mobile/tablet window dragging

Touch windows now float instead of being forced full-screen. Pointer capture and a movement threshold apply only to the title bar; controls are excluded and content retains scrolling. Temporary movement uses transforms, commits on release and reverts on cancellation. Window geometry clamps to the actual workspace and adapts to viewport changes, with explicit expand/restore. All 19 behavior tests pass locally, including boundary, short-screen and rotation sizing checks. CLI `cd -something` syntax and the utopia welcome note remain unchanged. Browser/device results are recorded in PR #1.

## Latest user override: personal welcome and startup state

Notes is now the only open/focused app on initial launch and Restart, independent of screen type. Its larger `welcome.txt` window contains two paper notes: an introduction titled “Welcome to my personal website”, and “Why I want to do engineering”. First-year status and cricket are user-provided. The factual summary is based on the included résumé’s Waterloo Computer Engineering, Biomechatronics exoskeleton, rehabilitation-device and ClinTempo experience. The engineering motivation is an authored first-person draft using those themes; it is not a quoted statement.

Résumé inspected: `public/azaan-khan-resume.pdf`, SHA-256 `ffed325d52a1d2340a183151371da31a7b29932a8a1ddd9ca7a5228cea13ed9a`. The earlier portfolio’s local copy has the same hash. The unrelated ModernCV sample outside the portfolio was not used. No private contact data was copied into the introduction.

“Wii section” was treated as the standalone Say Hi/Mii app after an optional clarification question. That app and all its launch entries were removed; other contextual Mii artwork remains. The unused desktop-widget setting was removed with it. All 19 existing tests pass locally; build and browser outcomes are recorded in PR #1.

## Latest startup timing override

The user set startup to a fixed five seconds. The central `BOOT_DURATION_MS` constant is 5000ms; normal startup, preview and Restart share that timer. No fade is added, Skip/Escape still enters immediately, and slow optional assets cannot lengthen the timer. The timing test is updated; all 19 behavior tests pass locally.
