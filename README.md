# Azaan’s Aqua desktop

An interactive React + TypeScript + Vite portfolio based on the repository’s `Improvements`, latest `improvement 8.md` / `Music.md`, and the author’s single-Mii-app and randomized-running startup instructions. The existing desktop, music, sound effects and project routes are retained.

## Run locally

Use Node.js 22.18+ (24 recommended):

```sh
npm install
npm run dev
npm run lint
npm run build
```

The build runs the behavior tests, TypeScript and Vite. Music preparation reads all eight supplied links in `Music.md`, caches MP3s under `public/music/tracks`, and generates the local library. Track three (Rick Astley) retains its identity but is placed last, after tracks one, two, four through eight. An internet connection is needed if those cached tracks are missing.

## Desktop and apps

- Entry and reboot: about me, projects and one Mii app open in staggered windows; Welcome has room for its introduction, actions and Polaroid footer. Smaller screens use bounded floating windows, with the system menu/window centre and Dock providing app switching.
- Returning visits keep saved geometry, while other apps start closed under the latest three-app entry policy. Drag title bars, including drag-to-restore from maximized windows; resize any edge or corner; traffic lights close, minimize and expand/restore. Keyboard arrows move a focused title bar or resize handle.
- Notes uses a leather header and legal paper, with editable titles/bodies, new/delete and recoverable deletion. Everything saves locally in this browser.
- Blogs has unpublished post placeholders in `src/data/blogs.ts`. Floating photo/MP4 slots around Projects are configured in `src/data/projectMedia.ts`; add asset URLs when supplied.
- One standalone Mii app opens and receives focus by default on arrival, including after it was closed or minimized in an earlier visit. It is the only place the character is rendered on the desktop: looping jump on a fresh visit/home, dancing while using iPod or after user-started music playback, thinking while Find Me is active. Normal music uses the new supplied 100-frame dancing GIF; Rick Astley now uses the original happy GIF from `Mii.md` (50 frames / 1000ms), as requested in Improvement 8. The previous static-pose CSS dance is retired. Focusing Mii keeps the preceding context; Find Me thinking takes priority over music. Background autoplay alone keeps the initial jump. The app has normal drag/resize/close/minimize/expand controls and a Dock/File-menu launcher. Embedded Welcome/Find Me Miis remain removed. Startup separately uses the supplied randomized running clips.
- The supplied character-free E7 artwork stays the default wallpaper, with restrained violet atmosphere and Aqua blue/dark-label controls.
- Blogs uses a compact glass and paper reader. Nothing NDot remains the display type and Helvetica Neue the lowercase interface font; Terminal explicitly uses a Mac-style monospace stack. iPod, About Me and Find Me contain no character copies; only the standalone Mii app shows the supplied character on the desktop.
- Bubbles use livelier time-based motion, circle collision impulses and bounded wall bounces, retaining pause, reduced motion and interaction settings.
- Projects uses Aqua Finder icon/list/column views, folders, history, selection, keyboard navigation and project details. Edit `src/projects.ts` to add verified screenshots, status and project links.
- Terminal accepts `cd -about me`, `help`, `clear`, `ls` and `pwd`. Submit with Enter/Go; there is no Run button. Its Mac-style monospace font is protected from the global interface rule; narrow windows get a full-width, 16px command field.
- Startup randomly selects one of the three supplied running GIFs, plays one complete measured seven-second crossing after the image loads, then reveals the ready desktop without a fade. Reboots avoid repeating the previous clip; disabling random animations uses the scenic route. Skip/Escape bypass it, and reduced motion or failed/stalled clips use a still and readiness-only completion. Critical assets retain their bounded fallback. Normal app navigation never replays startup.

The magnetic Dock uses spring-based proximity sizing and lift with the established Aqua palette. Touch controls stay fixed-size with visible labels; reduced motion keeps the Dock still. The active pointer gesture is tracked at window level, and final geometry stays visible until state confirms it.

The default appearance keeps the supplied E7 wallpaper with a subtle violet atmosphere confined to the background. Window chrome, controls and selections retain glossy iOS 6/Aqua blue with dark navy text. Palette tokens live in `src/apps/aquaPalette.css`; the Nothing display font and Mac Terminal font remain.

## Settings and content

`src/settings/store.ts` validates and versions browser settings under `azaan-os-settings`, migrates earlier desktop/music/sound/icon keys, and preserves independent sections. System Preferences can restore defaults while keeping notes. Private browsing or disabled storage provides session-only state.

Profile destinations and résumé are configured in `src/profile.ts`. The Nothing NDot display font and system UI fonts are preserved. No new package dependencies were added for this refinement. The original Mii GIF files are committed in `public/` and referenced by `src/data/miiClips.ts`. The build verifies their animated frame counts and measured timing, plus the PNG fallback, so missing/invalid clips fail the build. Mii-app replay clicks restart the current clip; reduced-motion and hidden-tab states still use the supplied still.

Annotations now appear sparingly in the welcome engineering introduction and the selected discoveries blog placeholder; routine controls, Terminal, Notes, Finder, résumé and iPod stay unmarked. `src/components/ui/AnnotatedText.tsx` supports all 12 supplied variants; blog keywords/styles live in `src/data/blogs.ts`. Marks draw once when visible, respect both reduced-motion settings and never intercept input. The floating Polaroids around Projects retain three landscapes in `src/data/projectMedia.ts`. About Me uses fifteen supplied personal photos in `src/data/welcomeSnapshots.ts`, cycling five landscape, portrait, wide, square and tall frames every 6.5 seconds with a brief cyan/green glitch effect. Manually chosen focal points keep faces in view; wide group pictures use the widescreen slot. The video Polaroid matches the exact 272 × 480 portrait ratio, so it fits without side bars. The optimized MP4 has no audio track and loops silently. All seventeen supplied photographs, the video and existing landscape artwork are catalogued with source links and scene descriptions in `photos.md`; two earlier reference photographs remain outside the active selection. Gallery pause/previous/next controls remain available; offscreen, hidden-tab and reduced-motion states pause automatic changes and video.

Frutiger.js Aero/glass action and Finder/Notes button styles are included locally, with the MIT license in `THIRD_PARTY_NOTICES.md`. Native window traffic lights, menus, Dock and physical iPod controls retain their OS roles.

See `IMPROVEMENT_8_REVIEW.md` for the latest frame/GIF changes and `photos.md` for the complete media catalogue; `IMPROVEMENT_7_REVIEW.md` records the preceding music/media/sound changes, `LOADING_MII_REVIEW.md` for randomized startup, and `SINGLE_MII_APP_REVIEW.md` for desktop character behavior and `IMPROVEMENTS_6_REVIEW.md` for the preceding refinements and `IMPROVEMENTS_REVIEW.md` for file changes, verification evidence, source limitations and deployment status. Historical requests and their superseding changes remain in `CHANGELOG.md`.
