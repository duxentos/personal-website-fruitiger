# Improvements implementation review

Date: 2026-11-13. Source: `Improvements` on main, blob `252421af93af2b7510d2db68a144db9f58fcae2d`. This latest brief supersedes historical requests that conflict with it. Work remains on `codex/aero-portfolio` / PR #1.

## Implemented

- Shared window reducer handles focus/stacking, close/minimize/maximize/restore and default/returning sessions. Eight resize directions and title dragging accept mouse, pen and touch. Geometry is bounded to the usable workspace; maximize retains the floating restore frame across refresh.
- First visitors receive About Me, Stories, Projects and Where to Connect in a viewport-aware staggered layout. Phones display the active window and retain app switching through menu/window centre and Dock. Returning visitors keep closed/minimized states.
- Version-2 settings service validates data and merges independent sections, migrates legacy desktop/music/sound/icon values, protects future schema data and falls back to memory when storage fails. Restore Defaults keeps notes.
- Stories is a separate illustrated scrapbook with centralized chapter data. Engineering motivation is a labeled draft. Biography/project facts use the supplied résumé; unknown observations and hackathon memories remain editable prompts.
- Notes supports create/edit/delete, autosave, title editing, saved note navigation and recoverable deletion, with leather stitching and yellow ruled legal paper. Engineering reflections moved to Stories.
- Terminal exposes only `cd -about me`, `help`, `clear`, `ls`, `pwd`, with no Mii or profile commands.
- Mii Plaza uses the supplied 1672×941 local image copied unchanged to `public/assets/mii-plaza-background.png`. Four original shaded SVG visitors use independent pavement paths, time-based requestAnimationFrame updates, depth-aware sizing, idle/walk/wave/turn states and selectable cards. Pause, visibility, speed and reduced motion are supported. Hidden tabs stop the loop.
- Projects uses Aqua Finder toolbar/sidebar, icon/list/column views, category folders, history, search/sort, selection, double-click/Enter opening and an inspector. Verified project details, technologies, status, features and explicit missing-media states replace unsupported claims.
- Startup has a five-second minimum followed by critical font/wallpaper/still readiness or resolved fallback. Smooth short entrance/exit transitions respect reduced motion. Duplicate reboot triggers are ignored; navigation does not replay startup. Skip/Escape remains available.
- Existing Nothing NDot typography, wallpaper choices, sound engine, iPod library/playback, résumé and profile links/routes remain integrated. No package dependencies added.

## File map

- Architecture: `src/settings/store.ts`, `src/components/{Desktop.tsx,windowModel.ts,windowGeometry.ts,AquaWindow.tsx}`.
- Desktop integration: `src/main.tsx`, `src/components/{DesktopChrome.tsx,DesktopExtras.tsx,DesktopShortcuts.tsx,desktopLayout.ts}`.
- Apps: `src/apps/{mii,notes,stories,projects,terminal}` and shared `src/apps/refinement.css`.
- Data: `src/data/stories.ts`, `src/projects.ts`, supplied plaza PNG under `public/assets`.
- Persistence integration: `src/apps/ipod/MusicProvider.tsx`, `src/audio/SoundProvider.tsx`.
- Boot: `src/components/boot/{BootScreen.tsx,bootTiming.ts}`.
- Regression coverage: `scripts/{refinement,desktop-terminal,boot}-behavior.test.ts`; other existing suites retained.
- Records: `README.md`, `CHANGELOG.md`, `IMPLEMENTATION_PLAN.md`, this review and a snapshot of `Improvements`.

## Verification

Story: open the portfolio → boot/readiness → restored desktop → independent apps and persisted browser data. This is a client-only app; no API/database or credentials are required.

- Local TypeScript: `npm run lint` passes.
- Local production build: `npm run build` passes, including all 27 behavior tests, TypeScript and Vite.
- Tests cover settings migration/corruption/future schema, section merging, defaults preserving notes, four initial windows, closed/minimized session restoration, viewport bounds, maximize restore geometry, edge resize anchoring, notebook delete/undo and intentional empty state, independent time-based plaza movement and walkable zones, boot readiness, terminal allowlist and prior music/sound/icon behavior.
- Network package installation was unavailable because `registry.npmjs.org` DNS resolution failed. Local verification reused existing installed packages through temporary workspace symlinks; these are excluded from GitHub. No dependency manifest changes were made.
- Local dev server was blocked by the environment (`listen EPERM 127.0.0.1:5173`). Preview/browser verification is recorded below after deployment.

## Content and asset limits

- No further asset is required to run the implemented apps. The original plaza source includes static decorative figures; only the four SVG overlay visitors are interactive. These are original 2D vector characters with depth scaling, not imported Nintendo models or a WebGL scene.
- The source did not supply verified project screenshots or per-project GitHub/demo URLs, a completed Goose description, precise ClinTempo development status, or personal origin/hackathon anecdotes. Their UI/data clearly identifies these gaps. Add them to `src/projects.ts` and `src/data/stories.ts` when available.
- Notes and settings are browser-local; they do not sync between devices. Blocked autoplay still needs a user interaction, as browsers require.
- Production publication and external DNS changes have not been performed. The prior custom-domain/Vercel production diagnosis remains in PR #1.

Run with `npm install` then `npm run dev` on Node.js 22.18+; run checks with `npm run lint` and `npm run build`.
