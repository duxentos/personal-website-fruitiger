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

To inspect startup without delaying normal visits, use the desktop menu’s **preview startup** command or append `?startup=preview` to the preview URL. Normal startup reveals the desktop as soon as its critical artwork is ready.

`IMPLEMENTATION_REVIEW.md` records the requirement review, validation and limitations. `CHANGELOG.md` records the implementation history. Work is tracked in PR #1; preview deployment links and verified build/browser results are in that PR.
