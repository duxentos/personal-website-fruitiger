# Azaan’s Aqua desktop

An interactive React + TypeScript + Vite portfolio based on the repository’s `Improvements` and latest `Improvements #4` briefs. The existing desktop, music, sound effects and project routes are retained.

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

- Entry and reboot: only about me and projects open in smaller staggered windows. Phones show the active app, with the system menu/window centre and Dock providing app switching.
- Returning visits keep saved geometry, while extra apps start closed under the latest two-app entry policy. Drag title bars, including drag-to-restore from maximized windows; resize any edge or corner; traffic lights close, minimize and expand/restore. Keyboard arrows move a focused title bar or resize handle.
- Notes uses a leather header and legal paper, with editable titles/bodies, new/delete and recoverable deletion. Everything saves locally in this browser.
- Blogs has unpublished post placeholders in `src/data/blogs.ts`. Floating photo/MP4 slots around Projects are configured in `src/data/projectMedia.ts`; add asset URLs when supplied.
- The Mii app contains only the author-supplied waving artwork from `Mii.md`, with a supplied still for reduced motion or hidden tabs. The plaza app and generated visitor characters have been removed. The plaza image now serves as the default desktop wallpaper; saved XP selections migrate to it.
- Blogs uses a compact glass and paper reader. The two font roles are Nothing NDot display type and Helvetica Neue UI with lowercase small interface labels. iPod uses the standard Aqua window without a Mii, and About Me shows a larger supplied Mii.
- Bubbles use livelier time-based motion, circle collision impulses and bounded wall bounces, retaining pause, reduced motion and interaction settings.
- Projects uses Aqua Finder icon/list/column views, folders, history, selection, keyboard navigation and project details. Edit `src/projects.ts` to add verified screenshots, status and project links.
- Terminal accepts `cd -about me`, `help`, `clear`, `ls` and `pwd`. Submit with Enter/Go; there is no Run button.
- Startup follows 1¼ plays of the supplied seven-second crossing clip (8.75 seconds after it appears), with asset readiness, hidden-tab handling, still/reduced-motion fallback and immediate Skip/Escape. Ordinary app navigation does not replay startup.

The magnetic Dock uses spring-based proximity sizing and lift with the established Aqua palette. Touch controls stay fixed-size with visible labels; reduced motion keeps the Dock still. The active pointer gesture is tracked at window level, and final geometry stays visible until state confirms it.

## Settings and content

`src/settings/store.ts` validates and versions browser settings under `azaan-os-settings`, migrates earlier desktop/music/sound/icon keys, and preserves independent sections. System Preferences can restore defaults while keeping notes. Private browsing or disabled storage provides session-only state.

Profile destinations and résumé are configured in `src/profile.ts`. The Nothing NDot display font and system UI fonts are preserved. No new package dependencies were added for this refinement.

See `IMPROVEMENTS_4_REVIEW.md` for the latest refinements and `IMPROVEMENTS_REVIEW.md` for file changes, verification evidence, source limitations and deployment status. Historical requests and their superseding changes remain in `CHANGELOG.md`.
