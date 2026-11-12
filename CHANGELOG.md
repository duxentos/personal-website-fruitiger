# Website change log

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
