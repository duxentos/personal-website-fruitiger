# Improvements #2 implementation review

Source: `Improvements #2` on main, blob `01e5707bb1d17fb8774b6b7644e58cd68234f508`. Date: 2026-11-13. These nine instructions supersede conflicting earlier briefs. Work remains on `codex/aero-portfolio` / PR #1.

## Changes

1. **Stories:** iOS 6-inspired glass/beveled chapter controls, physical paper and photo frames, Helvetica Neue/Helvetica/system fallback typography. Existing centralized content, chapter navigation, draft labels and reduced motion remain.
2. **Wallpaper:** the existing public copy of the supplied `Futuristic Glass Plaza with Mii Walkers.png` is the default desktop background. Saved XP/meadow wallpaper migrates to the plaza. Explicit Vista selections remain available. Production uses a public URL, never the local filesystem URL.
3. **iPod:** restored the normal Aqua frame and toolbar, removed the Mii and the unused music-driven companion connection. All apps share traffic-light dimensions. Touch traffic lights have small 14px gel faces inside 40px hit targets; desktop uses the common existing controls.
4. **Plaza removal:** deleted `MiiPlaza.tsx`, `plazaModel.ts`, generated visitor CSS and obsolete plaza settings. Removed old Dock/menu/title references. Retired saved plaza windows cannot reopen.
5. **About Me:** larger responsive Mii frame and adjusted image positioning compensate for the transparent padding in the supplied render.
6. **Terminal:** removed Run; the form submits with Enter, or Go on a mobile keyboard. Command allowlist, history, completion and feedback remain.
7. **Startup:** 3500ms presentation + 180ms exit normally. Required assets/fonts resolve or fall back at 3800ms, targeting completion by 3980ms under a responsive browser event loop. Skip/Escape remains immediate; hidden/background tabs and browser scheduling can delay callbacks. Initial entry/reboot only.
8. **Bubbles:** higher initial velocities with gentle acceleration, time-based updates, mass-aware circle collision impulses, overlap separation and wall restitution. Bounded speed, pointer repulsion, popping, sounds, hidden-tab pause and reduced motion remain.
9. **Mii-only app:** one supplied waving Mii image from `Mii.md`, with the supplied still used for reduced motion, hidden tabs or image failure. No generated characters, cards, text, selection controls or plaza environment inside the app. Existing OS window controls remain outside its content.

## Changed files

- `src/apps/refinement.css`, `src/style.css`: Stories, avatar framing, shared traffic lights and wallpaper.
- `src/apps/mii/MiiApp.tsx`: Mii-only app; removed `MiiPlaza.tsx` and `plazaModel.ts`.
- `src/components/{Desktop.tsx,DesktopChrome.tsx,DesktopExtras.tsx,desktopLayout.ts,windowModel.ts,MiiCompanion.tsx}` and `src/main.tsx`: integration, migration and old-app removal.
- `src/components/bubblePhysics.ts`: time-based movement/collisions/bounds.
- `src/data/wallpapers.ts`: centralized wallpaper paths and selection migration.
- `src/apps/ipod/IPodApp.tsx`, `src/apps/terminal/TerminalApp.tsx` and `src/components/boot/{BootScreen.tsx,bootTiming.ts}`.
- Behavior tests, README, CHANGELOG, prior review supersession notice and `Improvements #2` snapshot.

## Verification

- `npm run lint`: passed.
- `npm run build`: passed, including all 32 behavior tests, TypeScript and Vite.
- Meaningful checks cover collision approach/separation, coincident bubble centres, wall reflection/rotation, time-based movement/speed limits, saved XP wallpaper migration, removal of saved plaza sessions, startup timing/fallback limits and prior notes/session/music/sound/icon/terminal regressions.
- React review: no new dependencies, one cleaned-up animation loop, transient animation state stays outside React renders, image-only app pauses animation on hidden tabs/reduced motion, existing keyboard and pointer window controls remain.
- Local package access/server restrictions are unchanged from the preceding review. Preview/build and browser results are recorded in PR #1 after deployment; no browser interaction pass is claimed before observation.

## Dependencies, assets and remaining limits

No new package or required asset. The supplied plaza image and Mii artwork are reused. Helvetica Neue is requested from the device font stack; Helvetica/Arial is used on devices without it. Existing missing biography/project media remain explicitly labeled. Production publication/DNS changes are outside this preview update.

Run: `npm install`, `npm run dev`. Check: `npm run lint`, `npm run build` (Node.js 22.18+).
