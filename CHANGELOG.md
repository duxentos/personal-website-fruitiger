# Website change log

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
