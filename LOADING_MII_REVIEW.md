# Randomized running Mii startup

Latest instruction: keep the randomized running Mii animations in the loading screen. This restores a startup-only exception to the single desktop Mii app; it does not restore embedded characters to Welcome, Find Me or iPod.

Each boot chooses one original full-stage clip: scenic route, shortcut or little hop. Deliberate reboots avoid the immediately preceding clip when random animation is enabled; disabling that preference uses scenic route. The GIF owns all movement and is displayed with contain sizing, without another translation or fade. One measured 175-frame / 7000ms crossing starts after the selected image loads. Desktop entry waits for that crossing and settled critical wallpaper/fonts. Skip and Escape finish immediately. Reduced motion bypasses animation; missing/stalled GIFs use the supplied still and bounded readiness, so they cannot trap startup. Navigation does not restart it. The shared desktop app still opens and is focused by default.

## Assets

All runners are local, original supplied GIFs from `loading screen.md`:

- `/mii-crossing.gif`: scenic route, attachment `3fe2ea08-f625-461e-b6cc-5f95eab8d33d` (existing asset).
- `/mii-shortcut.gif`: attachment `39808990-5c40-44e5-ab98-85bcbcef7a3d`, 853061 bytes.
- `/mii-little-hop.gif`: attachment `1011e8a3-93bb-44be-97e6-ae993bc75366`, 991641 bytes.

Each measures 1000×480, 175 frames, 7000ms. The existing GIF record parser verifies packaged frames/timing for both additions at build time, guarding against absent files or HTML SPA fallbacks. Startup loads only its selected runner.

## Validation

`npm run build` passes all 57 behavior tests, TypeScript and Vite. New checks cover selection across all three runners, no immediate repeat on reboot, the fixed-choice preference, waiting for image load before starting timing, the exact one-crossing boundary, critical-resource readiness, and failure/reduced-motion completion. Existing desktop Mii reaction and startup-window checks remain passing. Deployed and browser observations are recorded separately after verification; model tests alone do not claim a visual browser pass.
