# Website change log

## Cohesive Aqua desktop — 2026-11-12

- Converted the scrolling page into a desktop while retaining welcome copy, notes, Mii, project search/filtering, project routes, and LinkedIn content.
- Added File, Edit, View, Window, Help, and desktop menus with working application launch, active-window controls, search, clipboard, wallpaper selection, arrangement, and help commands.
- Added a magnifying Dock with original skeuomorphic application icons and running/minimized indicators.
- Centralized window state; added pointer and keyboard moving/resizing, active-window stacking, expand/restore, minimize, close, and Dock relaunch.
- Mobile uses stacked windows and touch-sized controls rather than desktop dragging.
- Reduced the Mii render to fit its stage and show the waving character in full.
- Added original local Vista-inspired aurora and XP-inspired meadow vector wallpapers; these are new illustrations rather than Microsoft wallpaper files.
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
