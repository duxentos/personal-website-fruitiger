# Improvement 7 review

Read full `improvemment7.md` (blob `ccb1b216644fa0c19d404208bd1e74b13534ce0d`) and updated `Music.md` (blob `f98f8b85d90771c79c8c61eb6857ba6bb73011a0`) from main commit `c65e9fb7b11d4e56edd7748866fc30b860cef56c`. Both source files are copied verbatim into the implementation branch. The prior randomized running loader and single desktop Mii remain.

## Music and Mii

All eight supplied Music.md MP3s are prepared locally by the existing build script. Source-derived filenames/IDs stay stable: track one, two, four, five, six, seven, eight, then track three (Rick Astley). This avoids turning an existing saved track-three selection into a different song. Generated all-tracks order matches the library. Audio remains in the shared provider, independent of the iPod window. The source links are in Music.md; cached MP3s are fetched at build time on Vercel rather than adding large duplicate music blobs to GitHub.

New default music dance: supplied attachment `e545deb5-e6e9-49af-b4b6-9c7e5af5e195`, original 512×512 GIF, 100 frames / 2000ms, committed as `/mii-music-dance.gif`. Rick attachment `06deab54-c3e5-48cc-b21d-c9980b58f027` is actually a one-frame PNG, not an animated GIF. Its original bytes are committed under `/mii-rick.png`, and a restrained CSS side-step animates that supplied pose during the Rick dance state. No replacement character or fabricated GIF was generated. Find Me thinking still takes priority, initial jump remains, and reduced-motion/disabled/hidden states show the existing still.

## About Me snapshots

Inspected all nine images. Selected photos 1, 3, 5, 6, 7, 8 and 9 for a mix of graduation, group and outdoor portraits; omitted the soft stage photograph and near-duplicate group shot. These are 1000px maximum-edge JPEG copies with normalized orientation and no original metadata. Original source URLs remain in the brief. The shared gallery data gives neutral scene descriptions without inventing personal relationships or locations.

Two photo slots scroll to new images every 5.5 seconds. Every selected photo appears in the rotation, with no duplicate within a pair. Pause/resume and previous/next controls are keyboard accessible; controls have larger targets on coarse pointers. Hidden tabs, offscreen content, a closed Welcome window and reduced motion pause automatic rotation/video. Manual photo browsing remains available under reduced motion.

The supplied movie attachment `711a0170-c6af-4a99-89bd-b7e0a7d0699c` is converted from QuickTime to a browser-compatible, metadata-free H.264 MP4 (272×480, about 24.07 seconds) with its audio track removed. The larger video Polaroid uses muted, loop and playsInline, with a local poster. The project-folder orbit keeps its existing distinct landscape artwork; this personal gallery is scoped to About Me.

## Subtle window sounds

Window open/close now use Kenney CC0 `click_001.ogg` and `click_002.ogg`, reusing the already verified Interface Sounds source. Both are local assets and run at 35% event gain before existing master/category volume. Mute, category controls, click feedback and music independence remain. Sources and credits are recorded in `scripts/sound-sources.json` and `public/sounds/CREDITS.md`.

## Validation

Local `npm run lint` and `npm run build` pass all 63 tests, TypeScript and Vite. New coverage checks Rick-last ordering without changing IDs, Rick-only dance selection and thinking/reduced-motion priority, the original dance GIF and actual PNG signatures, quieter event gain, rotation coverage/wraparound, packaged JPEG/poster files and a real MP4 with no audio handler. All eight cached MP3s were decoded with FFmpeg; the video was decoded and showed only a video stream. React review covered effect cleanup, stable slot identities, no per-frame React updates, lazy photo loading, pause controls, live visibility handling and reduced-motion paths. No application dependencies were added; FFmpeg was used only as a temporary local media conversion/validation tool.

Deployed/browser results are recorded after verification. These local checks do not claim a physical-device, Safari, listening-quality, or complete UI pass.
