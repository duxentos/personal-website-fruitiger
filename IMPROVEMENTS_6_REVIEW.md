# Improvement 6 review

Sources: `improvement6.md` blob `2d67f0d9f0f6fa9f6a79c6c58de457548d205310` and unchanged `Mii.md` blob `4f58468156fed6a0c2413196510693261c53644b`. Work remains on `codex/aero-portfolio` / PR #1.

## Brief decisions and content

- Item 4 asks for a Mii app, while later item 9 explicitly limits Miis to Welcome and Find Me. A clarification was offered; absent a different answer, the later placement restriction governs. The reactive companion is implemented as a shared component in those two windows; no standalone avatar window, Dock icon, Finder/iPod/resume companion or generated replacement character remains. Old avatar sessions recover to current windows. Startup retains its explicitly requested crossing.
- Item 7 is incomplete (“the welcome pag”). Items 8 and 11 provide the actionable Welcome direction: cohesive introduction/actions and a small footer with moving Polaroids.
- The exact supplied character-free E7 wallpaper is committed locally as `public/assets/improvement6-wallpaper.png` (1370×768), from attachment `9618d197-9c73-42f5-95e0-b01ba098b592`. Existing plaza/XP selections use this latest asset; explicit Vista choices are preserved.
- Startup now uses one complete measured traversal of the original local 175-frame, 7000ms clip, rather than 1.25 loops/8750ms. It exits immediately once the crossing and bounded critical-asset readiness complete; Skip/Escape, still/failure fallback and hidden-tab restart remain.
- Welcome presents the author's name, first-year Waterloo computer engineering details, cricket interest, projects/find-me actions and a compact Polaroid footer. Launch revision 4 gives the introduction/footer enough default space. The incomplete item is not used to invent new personal history.
- One Polaroid uses the supplied E7 illustration, labelled as E7 artwork. Other photo/MP4 slots remain honest placeholders because no personal media was supplied. Motion is stronger around Projects and subtler in the Welcome footer; it pauses offscreen/hidden and under reduced motion.

## Reactions and typography

`MiiCompanion.tsx` and `miiReaction.ts` replace the previous random animation selection with explicit context. Welcome opening/hover/click plays the supplied excited/introduction jump (4s), then supplied wave (five 220ms loops). New music playback or mouse/keyboard focus on iPod selects the supplied happy/dancing GIF immediately in Welcome; a later explicit greeting can jump/wave over ongoing music before returning to dancing; no Mii is inserted into iPod. Find Me uses the supplied confused/curious GIF. No new artwork or unsupported animation is generated. Still, intro, dance and confused assets are local; the supplied wave retains its original GitHub attachment URL with a still fallback.

Reactions are optional, have a greeting cooldown, wait for image readiness for sequence timing, use supplied stills for hidden/reduced/disabled states, and clean up observers/listeners/timers. A still idle state avoids constant motion. Music stays shared through the existing MusicProvider. iPod hover clears on leave/blur/unmount.

Annotations are removed from routine controls, Finder/details, Notes, Terminal, résumé, Preferences, Find Me and the iPod wordmark. A scaled-down underline remains in Welcome and a single configured highlight in the discoveries placeholder. The reusable 12-variant component remains available. Nothing display type, Helvetica UI and the explicit Mac Terminal monospace font are preserved.

## Frutiger.js reference

Adapted actual Aero/glass/button/icon-button styles from https://biagio-scaglia.github.io/frutiger-js/ and its primary repository https://github.com/Biagio-Scaglia/frutiger-js (`packages/core/src/components/button.css`, `icon-button.css`). The styles are local in `src/vendor/frutiger-buttons.css`; MIT copyright/license and source attribution are in `THIRD_PARTY_NOTICES.md`. No new runtime package is needed. Normal app actions, Finder navigation/views/open and Notes actions use these classes; touch hit areas, disabled states and focus rings remain. OS menu entries, traffic lights, Dock icons and the physical iPod wheel retain their specialized behavior. Reduced motion suppresses hover lifts.

## Verification

Local `npm run lint` and `npm run build` pass: 43 behavior tests, TypeScript and Vite. Added meaningful checks for greeting progression, music/hover/context priority, hidden/reduced/disabled behavior and retired-avatar session recovery; existing boot/wallpaper assertions now reflect the new brief. Existing window, settings, notes, command, sound and music checks pass. React quality review covered effect cleanup, stable keys, controlled state, accessibility and no per-frame React animation loop.

Deployment/browser evidence is recorded below. Physical-device/browser coverage and missing personal media are stated explicitly; no production/main/DNS update is included.

## Deployed evidence and limits

Final application commit `c77abc7998ee3f82c3522765c1d1ee2f90ba06b5` deployed READY as `dpl_6ZCtfNW2ftwenAQx33JsvwCq8HkS`:
https://personal-website-fruitiger-fph0us37x-azaank041208-hash.vercel.app

Vercel independently passed all 43 tests, TypeScript and Vite; authenticated homepage HTTP 200. The wallpaper also returned HTTP 200 / image/png on the preceding deployment with the same asset.

Native Chrome observed the new Welcome introduction/actions, supplied Mii, Polaroid footer, changed Polaroid positions between captures, Frutiger Aero/glass buttons and the five-item Home/Terminal/Notes/iPod/Blogs Dock. The first visual pass exposed a legacy background URL in `style.css` even though the loader used the new wallpaper; this was corrected. The next preview (`a1ebef446c510ffb61d04ce3e48bb0a3cc0a881b`) visibly showed the character-free E7 wallpaper, the crossing startup, and automatic entry into the desktop without Skip. These observations support automatic completion, not stopwatch-level timing; the exact one-crossing duration is checked by the behavior test and measured GIF metadata.

Concurrent user activity in Chrome repeatedly invalidated the app state before further clicks. Find Me launching, a complete isolated reaction sequence, mobile emulation, reduced-motion toggling and console inspection were therefore not completed in this browser pass. The final application commit additionally gives Welcome 30px more default height and allows explicit greetings over ongoing music while new playback/iPod hover interrupts them; these changes pass the 43-test model/build checks but were not re-observed in Chrome. This distinction is intentional: prior Improvement 5 phone/console results are not reused as proof for this revision.

Missing personal photo/MP4 slots remain placeholders. The original external wave clip still depends on GitHub; failed image loads fall back to the local supplied still. All implementation choices, source snapshots and limitations are recorded in the branch and PR. The following documentation-only commit does not alter the tested application source.
