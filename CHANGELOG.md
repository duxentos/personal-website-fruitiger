# Website change log

## Projects and About Me briefs — 2026-11-16

- Implemented the current projects.md and aboutme.md: two interactive Aqua directories, six project case studies, status/search filters, card/list/column views, history, keyboard browsing and return focus.
- Added four verified NeuroSight screenshots and all six supplied iPhone photo references; retained ClinTempo/GOOSE media, introduced accessible fullscreen galleries, architecture inspectors, a GOOSE notch concept and restoration diary.
- Updated About Me interests and hobbies while keeping it open by default. Preserved the selected résumé PDF, Mii, music, Notes and desktop controls.
- Local validation: TypeScript, production build, 74 behavior tests and a 74-file asset preflight pass. See PROJECTS_ABOUT_REVIEW.md for sources and browser evidence.

## Visible Terminal command guide — 2026-11-16

- Terminal now prints its supported commands, descriptions and history/completion hints as soon as it opens. The help command uses the same guide, and clear retains its normal behavior.
- Validation: production build, asset preflight, TypeScript and all 69 behavior tests pass.

## About Me foreground on launch — 2026-11-16

- About Me is now the active startup/restart window as well as open, so phone layouts show the introduction immediately. Mii remains open alongside it on larger screens and available from the Dock.
- Returning sessions reopen and foreground About Me after a previous close/minimize while preserving saved geometry. Other apps keep the existing closed-on-launch policy.
- Regression coverage checks fresh and returning sessions at phone, tablet and desktop sizes. Validation: all 69 behavior tests, asset preflight, TypeScript and production build pass.

## Ten-area polish and current résumé — 2026-11-16

- Replaced the 5 November résumé with the newest general 13 November revision, verified against local PDF metadata and connected Drive. Regenerated the complete preview and source-hash manifest without editing résumé content.
- Added visual-viewport resizing for on-screen keyboards while preserving pinch zoom and saved window geometry; strengthened touch controls, focus styling and compact-menu scrolling.
- Photo bubbles now wait for image readiness; failed photos show a framed fallback. Retained all fifteen active photos, the silent video, Mii animations and randomized loading sequence.
- Cancelled iPod holds on blur, hidden tabs and lost pointer capture; restored keyboard actions after long presses and added missing-artwork fallback. Cleared stale playback timing after a failed track.
- Added full menu arrow/Home/End navigation, modal Tab containment and focus restoration, graceful clipboard/fullscreen failures, and Terminal draft-history restoration with local scrolling.
- Replaced project placeholders using current projects.md and the new résumé, including supplied ClinTempo/GOOSE images and NeuroSight links. Added a build-time asset preflight and search description/font preload.
- Local lint/build and the final Vercel preview pass all 68 tests. Native Chrome verified the desktop, résumé, menu/Terminal focus and music/Mii flows; phone/tablet emulation found and prompted fixes for tablet signal positioning and lazy-image dimensions. The standalone photos.md repository now contains all seventeen photos and the video/descriptions. Final Chrome résumé/phone QA reports zero page errors and no Issues notices after the image-sizing correction. Full evidence is in `OVERNIGHT_POLISH_REVIEW.md`.

## Improvement 9 desktop refinements — 2026-11-16

- Centered all window titles with symmetric positioning and a separate title row on narrow touch windows. Compact Find Me defaults to 440×320, with one-time geometry migration.
- Startup now opens only About Me and Mii and reads “welcome to Azaans space!”, retaining the randomized running GIFs.
- Replaced the photo glitch with a glossy gel-pop, light reflection and small pearlescent bubbles; retained mixed aspect ratios, focal crops, silent video, navigation and motion controls.
- Restyled Terminal as the Mac Basic profile with a white surface, black Menlo text and an inline prompt. Preserved the minimal real command allowlist, history and completion.
- Replaced diagonal arrows with horizontal Lucide arrows and document/download icons.
- Replaced the embedded résumé viewer with a full-page, clickable image of every supplied PDF page. Clicking opens the original PDF; a source-hash guard prevents stale previews. Added a reproducible native renderer.
- Local lint/build and Vercel pass all 66 tests. Chrome confirms two-app startup, working Terminal help and a full-page résumé link opening the original one-page PDF. Screenshot capture was blank; visual checks and other limits are recorded in `IMPROVEMENT_9_REVIEW.md`.

## Improvement 8 framing and media catalogue — 2026-11-16

- Matched the praying video frame to its exact portrait ratio, removing the contain-mode side bars. Preserved silent looping playback.
- Added three photo frames for five total, with landscape, portrait, widescreen, square and tall ratios. Added all eight new photos to the fifteen-photo active collection and configured face-aware focal points. Wide group shots retain a wide frame.
- Replaced the vertical slideshow transition with a short cyan/green scan-band glitch. Mobile uses a local scrollable filmstrip; pause, previous/next, visibility and reduced-motion behavior remain.
- Switched Rick Astley from the PNG/CSS pose to the original happy GIF from `Mii.md`. Normal music and randomized running startup remain.
- Added `photos.md` with all seventeen supplied photos, the video, source links, scene descriptions, active asset paths, and the existing Projects landscape artwork.
- Local lint/build and all 64 behavior tests pass. Source/crop/preview evidence is recorded in `IMPROVEMENT_8_REVIEW.md`.
- Vercel independently passes all 64 tests; all new photo/GIF/video URLs return the correct media types. Chrome visibly verified five mixed photo frames and the fitted border-free video. Concurrent native-browser changes/timeouts prevented isolated control/Rick checks; exact limits are recorded in the review.

## Improvement 7 music, photos and sound — 2026-11-15

- Imported the latest `Music.md` and `improvemment7.md` from main. Expanded to all eight supplied songs; Rick Astley keeps the track-three ID/title and plays last.
- Updated normal music to the supplied 100-frame dancing GIF. Rick Astley uses the supplied still PNG with CSS dance motion; Find Me thinking, arrival jump, reduced-motion stills and randomized running startup remain.
- Added seven selected, optimized personal photos and a larger silent looping video to About Me. Two photo slots scroll through the collection, with pause/previous/next and hidden/offscreen/reduced-motion handling. Projects retains its separate landscape Polaroids.
- Replaced open/close tones with short CC0 mechanical clicks at lower event gain.
- Local lint/build and all 63 behavior tests pass; all eight local MP3s decode and the converted MP4 contains video only. See `IMPROVEMENT_7_REVIEW.md` for sources and verification limits.
- Vercel independently passes all 63 tests and serves the ordered eight-track library and new media. Chrome verified rotating personal photos, a playing video, the new normal dance, and real iPod playback; subsequent Chrome unavailability prevented the final manual Rick selection. Deployed evidence is in the review.

## Randomized running Mii loader — 2026-11-14

- Restored one randomly selected supplied running GIF per startup/reboot: scenic route, shortcut or little hop. Added both missing original GIFs as local assets.
- Finish after one measured seven-second crossing and bounded critical-asset readiness; no fade. Skip/Escape and reduced-motion/failure fallbacks remain. Normal app navigation does not replay the loader.
- Preserved the single default-open desktop Mii app and its jump/dance/thinking reactions. Added selection/timing/packaged-asset coverage; all 57 tests, TypeScript and production build pass. See `LOADING_MII_REVIEW.md`.

## Compact Find Me links — 2026-11-14

- Removed the diagonal arrows from the four “want to find me?” social links.
- Made the Aqua pills fit their icon and label, with less horizontal padding and wrapping on narrow windows. Kept 44px touch targets on mobile and coarse pointers.
- Validation: `npm run build` passed with all 52 behavior tests, TypeScript, and Vite production bundling.

## Mii startup default — 2026-11-14

- Made Mii the focused startup app as well as an open, frontmost window on fresh entry and reboot. A previous close/minimize does not keep it hidden on the next visit; saved floating geometry is retained.
- Extended the launch regression to cover both closed and minimized returning sessions.
- Validation: `npm run build` passed with all 52 behavior tests, TypeScript, and Vite production bundling.

## Single contextual Mii app — 2026-11-14

- Restored one standalone Mii app and its Dock/File-menu launcher; it opens on arrival alongside Welcome and Projects. Removed embedded Welcome/Find Me Miis and the startup crossing character.
- The app loops jumping on arrival/home, dances for iPod or user-started music, and thinks while Find Me is active, including during music. Background autoplay alone does not override jumping. No waving sequence.
- The normal draggable/resizable/minimizable/closable app stays above its context window without taking focus. Existing GIF packaging checks remain. Startup now waits only for critical assets, with Skip/Escape and bounded fallback.
- Updated context/session regressions; all 52 tests, TypeScript and Vite pass locally and in Vercel. Chrome verified arrival jump → iPod dance → Find Me thinking while music continued, using the same Mii app with no embedded copies. See `SINGLE_MII_APP_REVIEW.md`.

## Mii GIF delivery repair — 2026-11-14

- Found that intro/happy/curious GIFs existed locally but were missing from the GitHub tree. Their deployed URLs returned the SPA HTML with HTTP 200, triggering image-error still fallbacks.
- Added the missing supplied GIFs and original waving GIF to the repository. All active clips now use local URLs through a shared manifest; startup uses the same manifest.
- Explicit say-hi taps bypass the automatic greeting cooldown and replay immediately. Added actual packaged-GIF/frame/duration/PNG/HTML-fallback and replay checks: all 51 tests, TypeScript and Vite pass locally.
- See `MII_ANIMATIONS_FIX.md` for deployed evidence.

## Distinct floating pictures — 2026-11-14

- Replaced the two empty Polaroid slots with the existing meadow and Vista aurora illustrations. Each set now shows E7, green hills and blue aurora with its own accurate caption.
- Welcome and Projects share the three-image gallery and retain their existing floating motion. The E7 desktop wallpaper and iOS 6/Aqua palette are preserved. No new assets or dependencies.
- Local and Vercel builds pass all 43 tests. Native Chrome visually confirmed three distinct pictures/captions in Welcome and the new hills/aurora orbiting Projects. Both SVG asset URLs returned HTTP 200. Tested code: `896ada2a64c6b50a19a56348dfd5b7a333121cf2`; preview: https://personal-website-fruitiger-sq4m5jevc-azaank041208-hash.vercel.app

## Aqua palette correction — 2026-11-14

- Re-read `codex prompt.md` and `UIreference.md`, and inspected the supplied heyclicky/Aqua and iOS 6 reference images after the author clarified the palette.
- Confined subtle violet hues to the exact E7 wallpaper through light CSS layers; restored pale glossy Aqua blue controls and dark navy text across window content, button labels and selections.
- Preserved Frutiger button shapes/highlights, Nothing display type, Mac Terminal contrast, icons and all app behavior. See `AQUA_PALETTE_REVIEW.md`.

## Improvement 6 — 2026-11-14

- Read `improvement6.md` and `Mii.md`; added the exact supplied E7 wallpaper locally and changed startup from 1.25 traversals to one completed crossing.
- Rebuilt Welcome with a clear introduction, projects/find-me actions and a compact floating Polaroid footer. Projects retains more visible floating Polaroid motion. Supplied E7 artwork fills one slot; unsupplied personal photos/video remain placeholders.
- Replaced random companion animations with supplied jump → wave, music/iPod hover dancing and Find Me confused clips. Miis appear only in Welcome and Find Me; removed the standalone avatar app/menu/Dock entry and résumé Mii, with saved-session recovery.
- Reduced annotations to selective editorial emphasis and adopted Frutiger.js Aero/glass action and Finder/Notes button styles locally with MIT attribution.
- Updated launch layout migration for the fuller Welcome and added four reaction/session regressions. All 43 tests, TypeScript and Vite pass locally. No new package dependencies. See `IMPROVEMENTS_6_REVIEW.md`.

## Improvement #5 — 2026-11-13

- Restored Mac-style monospace Terminal typography with an explicit font exception and responsive command entry/focus feedback.
- Added a reusable, accessible SVG annotation component supporting the 12 supplied styles; one keyword per text app or active blog post. Reduced motion displays static marks. Mii stays image-only and editable Notes content stays untouched.
- Refined About Me heading sizing, touch Finder/Notes controls and Dock indicator spacing.
- All 39 behavior tests, TypeScript and Vite pass locally. No new dependencies/assets. See `IMPROVEMENTS_5_REVIEW.md`.

## Improvements #4 — 2026-11-13

- Adapted the supplied magnetic Dock with existing Motion, Aqua colours/icons, spring sizing/lift, labels, running state, touch and reduced-motion support.
- Reworked dragging with global pointer tracking, drag-to-restore for maximized windows, scaled coordinate conversion, final-release placement and geometry acknowledgment before preview cleanup.
- Added six gesture-model regressions. All 39 tests, TypeScript and Vite pass locally. No new dependencies or assets.
- See `IMPROVEMENTS_4_REVIEW.md` for the file map, validation and browser limits.

## Improvements #3 — 2026-11-13

- Applied the nine-item brief: smaller about/projects-only entry and reboot, wider Mii waving framing, startup tied to 1.25 measured crossings, compact icon spacing, corrected gesture completion, blog/photo/MP4 placeholders, two type roles and lowercase small UI.
- Added the original supplied crossing GIF locally and retired the previous Stories chapter data in favor of unpublished blog placeholders.
- Geometry remains saved; older four-window sessions migrate to the new launch layout.
- No new dependencies. See `IMPROVEMENTS_3_REVIEW.md` for the file map, timing interpretation, tests and preview evidence.

## Improvements #2 — 2026-11-13

- Applied all nine items from `Improvements #2` (blob `01e5707bb1d17fb8774b6b7644e58cd68234f508`).
- Stories now uses an iOS 6 glass journal, physical paper/photo layers and Helvetica Neue typography.
- Replaced XP/meadow wallpaper with the supplied plaza image, including saved-setting migration. Removed the plaza application, generated visitor code and controls; added an app containing only the supplied Mii artwork.
- Restored the standard Aqua iPod window and shared traffic lights; removed the iPod Mii and music-driven companion coupling. Larger About Me artwork accounts for source-image padding.
- Terminal submits with Enter/Go without a Run button.
- Shortened startup to 3.5 seconds plus a short transition, with bounded critical-asset fallback within the 3–4 second target.
- Replaced slow bubble drift with lively time-based motion, natural collision impulses, separation and wall bounce.
- TypeScript, production build and all 32 behavior tests pass locally. No new dependencies/assets. See `IMPROVEMENTS_2_REVIEW.md` for scope and verification limits.

## Improvements brief refinement — 2026-11-13

- Applied the latest `Improvements` brief. It supersedes the earlier Notes-only startup, removed plaza, all-`cd` terminal commands and no-transition startup requests.
- Repaired shared window focus, eight-direction resize, touch gestures, bounds and saved geometry/session modes; new visitors receive four primary apps.
- Added Stories, a restored interactive plaza with the supplied image, persistent editable skeuomorphic Notes and an Aqua Finder project browser.
- Centralized validated/versioned preferences and legacy migration; preserved sound effects/music/profile destinations.
- Boot now waits at least five seconds and for critical assets or fallbacks, with reduced-motion-aware transitions.
- No dependency additions. See `IMPROVEMENTS_REVIEW.md` for tests, file map and remaining content placeholders.

## Fixed five-second startup — 2026-11-12

- Replaced random 1–2 second startup with a fixed 5000ms presentation, as requested.
- Normal startup, preview and Restart share the same timer; no fade is added. Skip/Escape still enters immediately and optional artwork cannot extend the timer.
- Updated the existing timing regression check. All 19 behavior tests pass locally. Production build results are recorded in PR #1.


## Welcome notes on launch — 2026-11-12

- Notes (`welcome.txt`) is the only app window opened and focused on initial launch and Restart. All other windows start closed on desktop, phone and tablet.
- Added the exact title “Welcome to my personal website”, the requested first-year computer engineering introduction, cricket as the favourite hobby, and a second paper note about wanting to do engineering.
- Read and visually inspected the included résumé. Both local portfolio copies are identical (SHA-256 `ffed325d52a1d2340a183151371da31a7b29932a8a1ddd9ca7a5228cea13ed9a`). Summary facts come from Waterloo Computer Engineering, Biomechatronics/exoskeleton work, rehabilitation-device work and ClinTempo. No contact details, unverified metrics or invented achievements were added. Motivation is drafted from those project themes.
- Interpreted “Wii section” as the standalone Say Hi/Mii app after requesting clarification. Removed that window, its Dock/menu/CLI entries and its obsolete widget toggle. Contextual/startup Mii artwork remains in the other apps.
- Preserved dragging, the four desktop shortcuts, 1–2 second startup, click feedback, music and `cd -something` syntax. All 19 existing behavior tests pass locally; production and browser observations are recorded in PR #1.


## Draggable mobile and tablet windows — 2026-11-12

- The latest instruction supersedes the earlier full-screen-only touch layout: windows now float and their title bars accept touch, pen and mouse dragging. Multiple open windows retain their stacking order and bring forward on interaction.
- Touch frames leave room for movement, clamp the complete window inside the usable workspace, and refit on rotation or viewport changes. The green control expands/restores; tablets also expose minimize. Back to Desktop and close retain large tap targets.
- Content scrolling stays separate from title-bar movement. Pointer capture, cancellation, drag thresholds and button exclusion prevent accidental scrolling/window moves. Transient movement uses a compositor transform; window position commits on release.
- Preserved draggable desktop icons, all `cd -something` Terminal commands and the welcome-to-utopia note.
- All 19 behavior tests pass locally, including touch bounds, rotation/short viewport fitting, expand sizing and the existing command/order/music/Mii/sound checks. Production and browser observations are recorded in PR #1.


## Draggable touch icons, cd commands and welcome note — 2026-11-12

- Added direct pointer dragging for desktop shortcuts in phone/tablet/coarse-pointer layouts. Icons snap to grid positions and save their order locally, remaining on-screen across orientation changes. An 8px movement threshold separates taps from dragging; cancelled gestures restore the icon, and dropping does not open its app. Alt + arrows provides keyboard rearrangement.
- All Terminal commands now require the `cd -something` syntax. Added a visible/tappable command list for apps, profiles, music and utilities, retaining command history and completion without trapping normal Tab navigation.
- Replaced the Notes terminal guide with “welcome to azaan’s personal utopia” and a short invitation to explore and listen. Kept its contextual Mii.
- Added regression coverage for invalid saved icon orders, moving icons without duplication/loss, command prefixes and app/profile routing. All 17 behavior tests pass locally. Production/browser results are recorded in PR #1.


## Faster startup and touch desktop — 2026-11-12

- Shortened startup to a random 1–2 seconds and removed the fade entirely. Skip/Escape still enters immediately.
- Kept exactly four desktop launchers: Find Me, Résumé, Project Files and About Me. Removed their Dock copies and the desktop social shortcuts. Social destinations remain inside Find Me.
- Dock now contains Home, Terminal, Notes, iPod and Say Hi. Added clear Back to Desktop navigation in touch windows.
- Touch layouts cover tablets up to 1023px and coarse pointers. They start on the home screen, use full-screen app views, larger 44px controls, scrolling iPod menus, expanded wheel targets, safe-area spacing, and no touch dragging/hover magnification.
- Added a shared click-sound fallback, preserving dedicated action sounds and existing mute/volume preferences. Rapid clicks reuse and restart the cached CC0 tick.
- Assigned different supplied Mii clips to About, projects, Notes, Terminal, résumé, iPod and Say Hi. Tap reactions now vary; music only drives the iPod companion. Replacements load before swapping.
- All 15 behavior tests pass locally, including shorter timing, click fallback/deduplication, rapid click replay, and existing music/Mii/effect checks. Production and browser checks are recorded in PR #1.


## Loading-screen revision — 2026-11-12

- User instruction supersedes the original loading-screen brief: removed the 3DS case, screens, hinge and console controls. Replaced them with an open full-screen Aqua scene, Nothing dot-matrix display type, supplied Mii artwork and soft bubbles.
- Normal startup, Restart and Preview now choose a random 3–7 second interval and fade into the desktop automatically. The fade is included in that interval; slow optional assets cannot extend it. Skip Intro and Escape enter immediately.
- Added static artwork while the first GIF loads, and preload-before-swap for reactions to prevent a blank first frame. Missing replacement clips are skipped and stale transitions are invalidated.
- Preserved reduced-motion behavior, focus containment/restoration, preference persistence and the existing desktop/iPod.
- Added startup duration coverage; all 12 behavior tests pass locally. Previous native Chrome checks verified Tab containment, Enter/Escape dismissal, reduced motion, focus restoration, continued music, and the real sound-playback test result. Final Vercel and browser results are tracked in PR #1.


## Startup, interface sounds and updated subprompts — 2026-11-12

- Reviewed all 11 current Markdown briefs and recorded the requirement mapping in IMPLEMENTATION_REVIEW.md.
- Added the supplied 3DS-style startup clips, measured timing metadata, weighted/cooldown selection, real readiness, Skip, restart/preview, and persisted startup/Mii/reduced-motion preferences.
- Downloaded and committed 21 CC0 Kenney interface effects with per-file credits; added one cached, user-unlocked sound manager with rate limits, four-effect concurrency, graceful failures and independent preferences.
- Connected actual desktop, menu, bubble, iPod, Mii, success and error actions to configured effects. No synthetic notifications or fake playback indicators were added.
- Added track three from Music.md, track-aware Mii choreography, wider character presence and original retro social icons.
- Refreshed README setup/configuration instructions, preserved all author briefs and source assets, and retained the existing iPod/desktop implementation.
- Browser review observed the 3DS preview and desktop transition. Added a direct startup-preview URL, menu command, Escape dismissal, focus restoration and Tab containment for repeatable testing.
- Fixed supplied-track ordering found during review; the source order now stays track one, track two, track three.
- Corrected the companion JSX grouping error caught by the first preview build; the next production build passed.
- Local validation: three-track preparation and audio-header checks succeeded; 11 behavior tests pass. Production and browser results are recorded in PR #1.


## Menu.md improvement pass — 2026-11-12

- Re-read all Markdown briefs and identified the new improvement list in Menu.md.
- Added embossed hover treatments, proximity-based Dock magnification, and brushed/raised styling throughout preferences.
- UI typography uses the platform Apple system font on Apple devices, with Helvetica Neue and Segoe UI fallbacks. NDot remains the display face. No Apple font binaries are redistributed.
- Added a real desktop-navigation terminal with cd -linkedin, cd -github, cd -instagram, cd -devpost, open-app commands, playback commands, history, completion, and help. It does not execute OS shell commands.
- Notes now contains a terminal guide with working app launchers and profile links.
- LinkedIn, GitHub, Devpost, and Instagram share one skeuomorphic pill style and verified profile destinations.
- Added a résumé app with embedded PDF, open, and download controls using the résumé from the earlier portfolio repository.


## iPod music app — 2026-11-12

- Re-read codex prompt.md, Music.md, and ipod-music-player-window.md.
- Added an iPod Classic application using the existing desktop window manager and a Dock icon.
- The first supplied MP3 is labeled track one; the second supplied MP3 is labeled track two. No artist/album metadata is invented.
- Build/dev preparation retrieves the supplied attachments, scans public/music/tracks, and preserves edited manifest metadata and configured playlists. Published audio is served locally from /music/tracks. Additional MP3 files are discovered at the next dev restart or build.
- Added a single shared audio element, startup/open autoplay attempts, browser-rejection fallback, play/pause, seek, volume/mute, next/previous, shuffle, repeat modes, auto-advance, missing-file handling, and saved settings. Closing/minimizing the iPod preserves playback.
- Added angular click-wheel navigation, keyboard controls, long-press menu/seek, library group menus, playlists, Now Playing, Cover Flow, and six device finishes.
- Added contextual iPod/File/View/Controls menus and a real playback indicator in the desktop menu bar.
- Verified both attachment downloads and prepared the local music manifest. Four logic tests passed for repeat, shuffle, wheel boundary movement, and time formatting. Vercel build verification is recorded in PR #1.
- Browser verification: observed the autoplay-blocked state, activated playback, and observed track one progress advance to 0:31 with the browser reporting audio playing. The terminal also showed a real LinkedIn navigation result during review. Full click-wheel, mobile, and repeat-at-track-end interaction tests remain unverified.
- Fixed native Enter/Space activation of focused player buttons, auto-scrolling selected menu items, and accurate blocked-play labels for the current track.


## Desktop-first launch — 2026-11-12

- Re-read the updated Menu.md, including its explicit removal of footer and scroll-down sections.
- Removed the footer-like signature and automatic introduction/notes windows at launch. The OS desktop is the starting view.
- Introduction remains available as the About app in the menu and Dock.
- Only the native-style system menu bar remains at the top; there is no separate website header/navigation.
- Mobile now has a fixed desktop viewport, with the active application filling the available area and scrolling only inside application windows.
- Added show-desktop and restart commands; saved preferences survive restart.
- Uses the Bliss image supplied in Menu.md as the default landscape, with the original vector meadow as an asset-load fallback and Vista-inspired aurora as an alternate.


## Cohesive Aqua desktop — 2026-11-12

- Converted the scrolling page into a desktop while retaining welcome copy, notes, Mii, project search/filtering, project routes, and LinkedIn content.
- Added File, Edit, View, Window, Help, and desktop menus with working application launch, active-window controls, search, clipboard, wallpaper selection, arrangement, and help commands.
- Added a magnifying Dock with original skeuomorphic application icons and running/minimized indicators.
- Centralized window state; added pointer and keyboard moving/resizing, active-window stacking, expand/restore, minimize, close, and Dock relaunch.
- Mobile uses stacked windows and touch-sized controls rather than desktop dragging.
- Reduced the Mii render to fit its stage and show the waving character in full.
- Added original local Vista-inspired aurora and XP-inspired meadow vector wallpapers; these are new illustrations rather than Microsoft wallpaper files.
- Integrated the newly added Menu.md brief with Spotlight (Cmd/Ctrl+K), searchable project/app results, saved theme/wallpaper and bubble preferences, desktop icon/widget visibility, project list/grid/icon views, and an application/window centre.
- Added iridescent bubbles with pointer repulsion, tap-to-pop, soft collisions, lower mobile counts, visibility pausing, and reduced-motion suppression. Only bubble surfaces receive pointer events; app controls remain above them.
- Disabled sorting by status because verified project statuses have not been supplied.
- Kept NDot typography and the existing character asset references.
- Validation: Vercel preview build result recorded in PR #1. Browser interaction verification is reported separately.


## Aqua window and character update — 2026-11-12

Requested changes:
- Use the new waving Mii for the say-hi interaction.
- Use the confused Mii beside a LinkedIn connection link.
- Replace Doto with Nothing's NDot dot-matrix typeface.
- Restore macOS Aqua styling, with stronger Frutiger Aero colour and slightly higher saturation.
- Make the windows interactive and record the work in GitHub.

Implemented:
- Centralized character assets and the verified LinkedIn destination in `src/profile.ts`.
- Added reusable Aqua windows with close/reopen, minimize/restore, and zoom/restore controls.
- Title bars support pointer dragging on desktop, arrow-key movement, Shift for larger steps, and Home to reset position.
- Mobile windows stay stacked; zoom uses a viewport-sized view. Reduced-motion users receive a still character image.
- Added saturated aqua/sky fields, green landscape accents, reflective blue buttons, silver title bars, and colored traffic-light controls.
- Replaced the Doto display font with NDot-57. The local font asset is sourced from https://nothing.wiki/download/NDot-57.otf; NDot is a Nothing typeface. Body text retains a readable sans serif.

Asset references:
- Wave: https://github.com/user-attachments/assets/12484d35-ce6c-4cad-865c-041b0fb78edd
- Confused: https://github.com/user-attachments/assets/de9a2123-b680-4373-ac87-caa9feb613f1
- Introduction: https://github.com/user-attachments/assets/818d59fb-4ecf-46c3-a6a9-6ebb692fa713
- LinkedIn: https://www.linkedin.com/in/azaan-khan-2774a7381/ (from the user's earlier repository profile configuration).

Verification:
- Wave asset downloaded and visually inspected.
- Character assets, window state behavior, keyboard handlers, and responsive rules reviewed in source.
- Vercel production build result is recorded in the pull request after deployment completes.
- Browser interaction and visual QA remain unverified because the browser host was unavailable in this session.

Remaining content limitations:
- Engineering project technical details and status need verified source material.
- Character interactions use the user's supplied rendered animations rather than a configurable 3D model.

## Earlier iterations

- Added the React/TypeScript/Vite project, project explorer, filters, direct project routes, and responsive styling.
- Removed the redundant About/Projects/Contact desktop shortcut menu at the user's request.
- Used heyclicky.com and the Markdown UI references to revise the desktop composition.
- Replaced the CSS avatar with supplied Mii render assets.
- First Vercel build exposed an unsupported icon export; corrected it and set Vite's output directory. Subsequent preview builds passed.
