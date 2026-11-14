# Single contextual Mii app

Latest author instruction supersedes the previous placement restriction and jump→wave sequence. Restore exactly one standalone Mii app. Remove embedded copies from Welcome and Find Me and remove the crossing Mii from startup.

The Mii app opens on arrival, with looping jump as its default/home animation. It uses the supplied local jump GIF only; no wave phase. Active iPod triggers dancing even if paused. Playback after a deliberate music interaction keeps dancing after switching apps. The MusicProvider tracks manual use separately from automatic playback/retry so autoplay alone cannot change the arrival jump. Active Find Me selects the supplied thinking/curious GIF and takes priority over playback. Focusing/replaying/dragging Mii retains the previous app context; closing the contextual app releases it.

The avatar window is restored in the window registry, launch policy (revision 5), Dock and File menu. Only one Mii image is rendered, inside this app. The Dock uses a generic person-outline glyph. The Mii window stays above the app controlling it without taking that app's focus; it retains normal close, minimize, zoom, move, resize and saved geometry. Explicitly closing Mii is respected until reopened; a fresh entry opens it again. Smaller screens retain the shared bounded floating-window behavior.

Welcome/Find Me become text/actions-only; existing Aqua blue/dark text, E7/violet wallpaper, Polaroids and music/sound behavior remain. The startup brand screen has no Mii image and leaves on settled critical-asset readiness, with bounded fallback and Skip/Escape. Obsolete crossing-countdown tests were removed; the original GIF files and packaged-byte checks remain to prevent the prior missing-asset regression. Reduced motion, hidden-tab, disabled-animation and file-error states show the supplied still inside Mii only.

Validation: context tests cover arrival despite autoplay, iPod/paused/background playback, thinking priority, retained/released focus context and still fallbacks. Session tests cover three-app entry, saved/reopened Mii geometry, floating layer without focus stealing and respecting close. Local lint/build and deployed/browser results are recorded after verification. No new assets or dependencies.

## Deployed verification

Application commit `d343e7d4ff67be4a9179c70cfdc192a58d0067b0` is READY as `dpl_H8WMejZZb3s4SFJ7BzRPqu6w63tk`:
https://personal-website-fruitiger-j9uwi4nyp-azaank041208-hash.vercel.app

Local lint/build and Vercel independently pass all 52 tests. The dancing GIF replay URL returned HTTP 200 / image/gif; all supplied GIF-byte/frame checks also passed in Vercel's fresh checkout.

Native Chrome visibly confirmed one Mii window open on arrival with the jumping GIF and a `replay jumping mii animation` control. Welcome contained no embedded character. Opening iPod from the Dock changed that same app's control to `replay dancing mii animation`; a subsequent capture showed the supplied star-eyed dancing character. Minimizing iPod left music playing. Opening Find Me then changed the same Mii app to `replay thinking mii animation`, visibly showing the supplied thinking pose, while Find Me itself had no Mii image. The Mii app stayed above both context windows, and its Dock entry and normal window controls remained visible.

These observations verify the requested desktop context flow. A new physical-device, isolated drag/resize or reduced-motion toggle pass was not performed; those paths retain the shared window/asset checks and static fallback coverage. The brand screen has no image element in source and no crossing countdown. No layout, palette, wallpaper or Polaroid redesign was included. The following documentation-only commit records results without altering tested application source.
