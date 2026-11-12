# Azaan's Aqua desktop

A React + TypeScript + Vite portfolio following the repository's Frutiger Aero, macOS Aqua, Mii, iPod, startup and sound-effect briefs.

## Development

Use Node.js 22.18+ (Node.js 24 recommended).

```sh
npm install
npm run dev
npm run lint
npm run build
```

The predev/build preparation reads supplied MP3 links from `Music.md`, downloads them into `public/music/tracks`, scans that directory, and updates `public/music/library.json` without discarding manually edited metadata. Network access is needed when a supplied MP3 is not already present. Add more local MP3s to `public/music/tracks` and restart dev or build. Matching artwork can go in `public/music/covers`.

## Configuration

- `src/profile.ts`: configured profiles and résumé.
- `src/projects.ts`: project files; unverified technical details remain unfilled.
- `src/data/miiAnimations.ts`: supplied character clips, measured timings, weights and cooldowns.
- `src/data/soundManifest.ts`: actual local interface-effect paths and default event settings.
- `public/sounds/CREDITS.md`: sound origins and CC0 licence records.
- System Preferences: themes, wallpaper, startup, Mii, bubbles and sound controls; preferences are saved in that browser.

Music persists while app windows are closed/minimized. Browser autoplay rejection displays a Play control. Desktop effects only unlock after an interaction and have separate volume/mute settings.

Startup is a full-screen Aqua scene with your supplied Mii artwork, with no 3DS/handheld shell. Each startup lasts a fixed 5 seconds, then reveals the desktop directly with no fade-in or fade-out. Skip Intro or Escape enters immediately. To replay it, use the desktop menu’s **preview startup** command, System Preferences, or `?startup=preview`. Preview follows the same automatic timing. Slow optional assets cannot extend that interval; available static artwork remains visible while GIFs load. System Preferences can disable startup or enable reduced motion.

`IMPLEMENTATION_REVIEW.md` records the requirement review, validation and limitations. `CHANGELOG.md` records the implementation history. Work is tracked in PR #1; preview deployment links and verified build/browser results are in that PR.

## Desktop and touch controls

Only Find Me, Résumé, Project Files and About Me live on the desktop. The Dock contains Home, Terminal, Notes and iPod, so these destinations are not duplicated. Social links remain inside Find Me. Touch layouts (up to 1023px or a coarse primary pointer) start on the home screen, open floating windows that can be dragged by their title bars, and provide a Back to Desktop control and the Dock’s Home button. Buttons use larger tap targets; title-bar dragging works with touch, pen and mouse. Touch windows can expand/restore; corner resizing and Dock hover magnification remain mouse interactions.

A shared trusted-click listener supplies a quiet CC0 click when an action has no dedicated sound. Dedicated feedback takes precedence, avoiding a second generic click; rapid generic clicks retrigger the cached sound. Existing sound mute/volume/category settings still apply. Mii artwork differs by context, while tap reactions vary without immediate repeats; only the iPod Mii dances with music.

## Icon arrangement, Terminal and Notes

On phones and tablets, drag a desktop icon onto another grid position to rearrange the four shortcuts. A tap still opens the app; dragging does not. The order is saved locally and the grid adapts to rotation. Alt + arrow keys also rearrange a focused icon.

All Terminal commands now use `cd -something`. Use `cd -help` or expand the command list to see and tap every available command. App commands include `cd -projects`, `cd -resume`, `cd -about`, `cd -findme`, `cd -notes`, `cd -ipod`, `cd -settings`. Profiles use `cd -linkedin`, `cd -github`, `cd -instagram`, and `cd -devpost`; music uses `cd -play`, `cd -pause`, `cd -next`, and `cd -previous`. Utilities include `cd -apps`, `cd -home`, and `cd -clear`. History and Tab completion remain available.

Notes opens by itself on launch and Restart, with every other app window closed. It contains “Welcome to my personal website”, a short résumé-informed introduction, cricket as the favourite hobby, and a separate note about engineering. The old command guide stays inside Terminal.

Touch windows stay within the usable workspace while moving. Multiple windows can stay open; touching a window brings it forward. Drag the title bar, scroll inside the content, and use the green control to expand or restore. Rotation/viewport changes refit windows so title-bar controls remain reachable.

The former Wii-inspired Say Hi/Mii app and its Dock/menu/CLI entries have been removed. The intro uses the résumé already included at `public/azaan-khan-resume.pdf`; first-year status and cricket come from the user’s instructions. The engineering motivation is a first-person editorial draft grounded in the listed projects, not a quotation from the résumé.
