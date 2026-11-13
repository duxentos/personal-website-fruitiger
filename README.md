# Azaan’s Aqua desktop

An interactive React + TypeScript + Vite portfolio based on the repository’s `Improvements` brief. The existing desktop, music, sound effects and project routes are retained.

## Run locally

Use Node.js 22.18+ (24 recommended):

```sh
npm install
npm run dev
npm run lint
npm run build
```

The build runs the behavior tests, TypeScript and Vite. Music preparation reads `Music.md`, caches supplied MP3s under `public/music/tracks`, and generates the local library. An internet connection is needed if those cached tracks are missing.

## Desktop and apps

- First visit: About Me, Stories, Projects and Where to Connect open in a staggered layout. Phones show the active app, with the system menu/window centre and Dock providing app switching.
- Returning visits restore open, closed and minimized states, stacking and floating geometry. Drag title bars; resize any edge or corner; traffic lights close, minimize and expand/restore. Keyboard arrows move a focused title bar or resize handle.
- Notes uses a leather header and legal paper, with editable titles/bodies, new/delete and recoverable deletion. Everything saves locally in this browser.
- Stories has illustrated chapters in `src/data/stories.ts`. Verified facts come from the supplied résumé. Reflections and missing personal anecdotes remain clearly marked for editing.
- Mii Plaza uses the supplied local image copied to `public/assets/mii-plaza-background.png`. Four original SVG visitors walk independently, change size with depth, wave and show character cards. Pause, visibility, speed and reduced motion are supported. Decorative figures baked into the background are static.
- Projects uses Aqua Finder icon/list/column views, folders, history, selection, keyboard navigation and project details. Edit `src/projects.ts` to add verified screenshots, status and project links.
- Terminal accepts `cd -about me`, `help`, `clear`, `ls` and `pwd`.
- Startup runs for a five-second minimum, then enters when critical artwork/font loading or fallbacks resolve. Skip/Escape enters immediately. Ordinary app navigation does not replay startup.

## Settings and content

`src/settings/store.ts` validates and versions browser settings under `azaan-os-settings`, migrates earlier desktop/music/sound/icon keys, and preserves independent sections. System Preferences can restore defaults while keeping notes. Private browsing or disabled storage provides session-only state.

Profile destinations and résumé are configured in `src/profile.ts`. The Nothing NDot display font and system UI fonts are preserved. No new package dependencies were added for this refinement.

See `IMPROVEMENTS_REVIEW.md` for file changes, verification evidence, source limitations and deployment status. Historical requests and their superseding changes remain in `CHANGELOG.md`.
