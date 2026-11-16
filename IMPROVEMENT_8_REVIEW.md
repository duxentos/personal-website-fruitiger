# Improvement 8 and photos catalogue

Read full `improvement 8.md` (blob `d4fc576156b3cbcf9fcc4822f635fe2145b98c1b`) from main commit `7e28800e87ed82b5fbfd582c9548c9d06438eec7`. The source brief is included in this branch. The author's follow-up additionally requests a new `photos.md` containing all supplied frame photos/videos and their descriptions.

## Frames and collection

The silent 272×480 MP4 now lives in a frame with the same 17:30 aspect ratio, and fills that viewport instead of letterboxing with contain. This removes the artificial side bars without cropping the praying scene. Its audio-free loop, poster, inline playback and pause handling remain.

The gallery adds three photo frames, for five photo slots plus the separate video. Shapes are 4:3 landscape, 3:4 portrait, 16:9 wide, square and 4:5 tall. Each slot selects an appropriate source orientation, and the widescreen slot preserves wide group/stage pictures. No photo is repeated within the visible five-frame set. Native photo proportions and manually reviewed focal points replace the shared 35% vertical crop; square/tall slots use portraits. Narrow app windows use a horizontal filmstrip within the gallery, keeping the page/window bounds intact.

All eight new source attachments are optimized as orientation-normalized JPEGs at a maximum 1000px edge, with metadata removed. The active collection now contains fifteen photos: seven selected from Improvement 7 and all eight from Improvement 8. A native contact sheet was inspected for all eight new photos, followed by native-aspect and square crop previews of every active photo. The configured subject/face positions remain visible in those previews. This is a crop review, not identity recognition or verification of personal relationships/locations.

The former vertical slide is replaced by a brief 280ms cyan/green image-band glitch with small horizontal offsets and colour refraction. It settles immediately into the clear photo and runs only when the collection changes while visible. Photo sets advance every 6.5 seconds, with pause/resume and manual navigation retained. Offscreen/hidden/reduced-motion states disable automatic changes and effects; the duplicated visual slices are decorative and hidden from accessibility.

## Rick Astley and preserved behavior

Rick Astley now uses the original local `/mii-happy.gif` from `Mii.md`, measured as 50 frames / 1000ms. The previous PNG/CSS dance is no longer used. The normal supplied dance GIF, thinking priority, arrival jump, single default-open desktop Mii, music order, quiet window clicks and randomized running loader are retained.

## photos.md

The new root document embeds all seventeen supplied source photographs, gives each a neutral visible-scene description, links original sources and lists local assets for the fifteen active photos. Earlier source photos 02 and 04 remain in the catalogue even though the preceding brief's best-picture selection omitted them from rotation. The supplied praying video is linked with its silent MP4/poster assets and playback details. A separate section also documents the three existing landscape artworks still used around Projects.

## Local validation

`npm run lint` and `npm run build` pass all 64 tests, TypeScript and Vite. Meaningful coverage checks all fifteen photos become reachable, five distinct images per set, source orientation/widescreen allocation, backward wrapping, small/empty libraries, real JPEG/poster/MP4 packaging, the audio-free video and the original happy GIF's measured frames/timing. Existing music, sound, window gesture, settings and startup tests remain passing. React review covered cleaned-up timers/observers, stable frame keys, no per-frame React animation state, lazy images, empty alt text on decorative glitch slices, pause/manual controls and both reduced-motion paths. No new runtime dependencies.

Deployed/browser observations and their limits follow.

## Deployed verification — 2026-11-16

Application commit `6c0074700bc782dbc95f8ba320832d34b1fab209` is READY as `dpl_7evYL58v7FWvWibqw9YAcLEtqgv5`:
https://personal-website-fruitiger-ph9cgnoki-azaank041208-hash.vercel.app

Vercel independently passes all 64 tests, TypeScript and Vite. All eight new photo URLs return HTTP 200 / image/jpeg; the happy replay GIF returns HTTP 200 / image/gif and the silent video returns HTTP 200 / video/mp4. GitHub independently confirms that `photos.md` contains seventeen photo entries and one video entry.

Native Chrome visibly showed all five differently shaped photo frames plus the separate praying-video frame. The video filled its portrait viewport with no artificial dark side bars. Multiple new photos rendered with visible faces/subjects, the still-active personal collection changed across observations, the gallery controls were present, and the existing Projects landscapes and default-open Mii remained.

Concurrent user activity repeatedly invalidated the native action state before the isolated Next/Pause and Rick-selection checks. A final fresh-state iPod navigation attempt timed out and reset the CUA kernel. These actions are therefore not claimed as passed. The exact 280ms glitch was not isolated in a browser capture; its implementation/reduced-motion behavior was reviewed in CSS. No new phone/Safari, console, drag or listening-quality pass is claimed. Happy-GIF selection, file frames/timing, frame allocation, distinct-photo sets and navigation wraparound retain automated coverage above. This documentation-only follow-up does not change tested application source.

