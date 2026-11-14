# Azaan’s Aqua desktop

An interactive React + TypeScript + Vite portfolio based on the repository’s `Improvements` and latest `improvement6.md` and `Mii.md` briefs. The existing desktop, music, sound effects and project routes are retained.

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

- Entry and reboot: only about me and projects open in staggered windows; Welcome has room for its introduction, actions and Polaroid footer. Phones show the active app, with the system menu/window centre and Dock providing app switching.
- Returning visits keep saved geometry, while extra apps start closed under the latest two-app entry policy. Drag title bars, including drag-to-restore from maximized windows; resize any edge or corner; traffic lights close, minimize and expand/restore. Keyboard arrows move a focused title bar or resize handle.
- Notes uses a leather header and legal paper, with editable titles/bodies, new/delete and recoverable deletion. Everything saves locally in this browser.
- Blogs has unpublished post placeholders in `src/data/blogs.ts`. Floating photo/MP4 slots around Projects are configured in `src/data/projectMedia.ts`; add asset URLs when supplied.
- Miis appear only in Welcome and Find Me. The contextual companion uses the exact supplied jump/introduction, waving, happy/dancing and confused GIFs from `Mii.md`. Welcome reacts on opening/hover/click, music or iPod hover/focus; Find Me remains confused. Idle, hidden, disabled and reduced-motion Welcome states use the supplied still. The standalone Mii launcher/window is retired, including recovery from old saved sessions. The latest supplied character-free E7 artwork is the default wallpaper; saved plaza/XP choices follow it, with Vista still optional.
- Blogs uses a compact glass and paper reader. Nothing NDot remains the display type and Helvetica Neue the lowercase interface font; Terminal explicitly uses a Mac-style monospace stack. iPod uses the standard Aqua window without a Mii, and About Me shows a larger supplied Mii.
- Bubbles use livelier time-based motion, circle collision impulses and bounded wall bounces, retaining pause, reduced motion and interaction settings.
- Projects uses Aqua Finder icon/list/column views, folders, history, selection, keyboard navigation and project details. Edit `src/projects.ts` to add verified screenshots, status and project links.
- Terminal accepts `cd -about me`, `help`, `clear`, `ls` and `pwd`. Submit with Enter/Go; there is no Run button. Its Mac-style monospace font is protected from the global interface rule; narrow windows get a full-width, 16px command field.
- Startup exits after one complete play of the supplied seven-second crossing clip (7 seconds after it appears), with asset readiness, hidden-tab handling, still/reduced-motion fallback and immediate Skip/Escape. Ordinary app navigation does not replay startup.

The magnetic Dock uses spring-based proximity sizing and lift with the established Aqua palette. Touch controls stay fixed-size with visible labels; reduced motion keeps the Dock still. The active pointer gesture is tracked at window level, and final geometry stays visible until state confirms it.

The default appearance keeps the supplied E7 wallpaper with a subtle violet atmosphere confined to the background. Window chrome, controls and selections retain glossy iOS 6/Aqua blue with dark navy text. Palette tokens live in `src/apps/aquaPalette.css`; the Nothing display font and Mac Terminal font remain.

## Settings and content

`src/settings/store.ts` validates and versions browser settings under `azaan-os-settings`, migrates earlier desktop/music/sound/icon keys, and preserves independent sections. System Preferences can restore defaults while keeping notes. Private browsing or disabled storage provides session-only state.

Profile destinations and résumé are configured in `src/profile.ts`. The Nothing NDot display font and system UI fonts are preserved. No new package dependencies were added for this refinement.

Annotations now appear sparingly in the welcome engineering introduction and the selected discoveries blog placeholder; routine controls, Terminal, Notes, Finder, résumé and iPod stay unmarked. `src/components/ui/AnnotatedText.tsx` supports all 12 supplied variants; blog keywords/styles live in `src/data/blogs.ts`. Marks draw once when visible, respect both reduced-motion settings and never intercept input. The exact supplied E7 artwork also appears in a floating Polaroid; remaining personal photo/MP4 slots stay explicit placeholders. Polaroids float beside Projects and in a small Welcome footer, pausing offscreen, in hidden tabs or under reduced motion.

Frutiger.js Aero/glass action and Finder/Notes button styles are included locally, with the MIT license in `THIRD_PARTY_NOTICES.md`. Native window traffic lights, menus, Dock and physical iPod controls retain their OS roles.

See `IMPROVEMENTS_6_REVIEW.md` for the latest refinements and `IMPROVEMENTS_REVIEW.md` for file changes, verification evidence, source limitations and deployment status. Historical requests and their superseding changes remain in `CHANGELOG.md`.
