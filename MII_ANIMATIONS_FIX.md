# Mii GIF delivery repair

## Reproduced failure

On deployment `dpl_7gZqdF3Dzpn3RXCrpjKKxN3jZH51`, `/mii-intro.gif` and `/mii-curious.gif` returned HTTP 200 with `Content-Type: text/html; charset=utf-8` and a 417-character SPA document. The GitHub tree at `893ca524acd85fe44d677a196face0dd833213dc` contained only `public/mii-crossing.gif` and `public/mii-still.png`; intro, happy and curious were present only in the local workspace. The catch-all SPA rewrite masked the absent files, and the image error handler displayed stills. Prior behavior-model tests did not check packaged image files.

## Repair

Commit the exact original supplied intro/jump, happy/dance and curious GIFs, plus the original Hello/wave attachment from `Mii.md` (`12484d35-ce6c-4cad-865c-041b0fb78edd`). Host every active clip locally. The shared `src/data/miiClips.ts` manifest drives companion/profile URLs and the startup clip. The supplied images and animation bytes are preserved.

Measured GIF metadata: jump 200 frames / 4000ms; wave 11 / 220ms (five loops for greeting); dancing 50 / 1000ms; confused 121 / 2420ms; crossing 175 / 7000ms. The 512×512 companion clips and 1000×480 crossing are actual multi-frame GIFs.

Explicit say-hi clicks now bypass the 5.5-second automatic hover/open cooldown, so repeated taps replay immediately. Automatic triggers remain throttled. Existing reduced-motion, disabled-reaction, hidden-tab and failed-load still fallbacks remain.

## Regression coverage

`mii-assets-behavior.test.ts` reads each runtime manifest file from `public/`, parses GIF records/frame timing, checks the supplied animated frame counts/durations and PNG fallback, and rejects an HTML fallback even when HTTP status is 200. Missing files now fail the build on a fresh checkout/Vercel. A replay regression checks that an explicit second tap is accepted while automatic hover remains throttled. Local lint/build pass all 51 tests, TypeScript and Vite.

## Deployed verification

Application commit `538f02d62b10b74834974db0b4c6f18dc1fd582a` is READY as `dpl_62JfHmEzEnxBgbDhFFbVe6pU1Lk7`:
https://personal-website-fruitiger-hvr6nixf2-azaank041208-hash.vercel.app

Vercel independently passed all 51 tests, including the new packaged-asset checks on its clean checkout. The five deployed requests now return HTTP 200 and `Content-Type: image/gif`: intro with `?reaction=2`, wave with `?reaction=2`, happy, curious, and crossing with `?play=1`. This correct image MIME type replaces the HTML fallback from the reproduced failure.

Native Chrome opened the repaired desktop, accepted the say-hi click, and showed the Welcome Mii in different animation poses across captures, including the happy/star-eyed dancing pose during music playback. Find Me opened from its button and displayed the supplied confused Mii image. The confused GIF is visually subtle; captures showed it loaded rather than claiming a complete frame-by-frame/physical-device audit. The full original wave GIF was downloaded from the supplied Mii.md link and verified as 11 frames / 220ms; its short transition was not isolated in a browser capture. Reduced-motion and disabled-animation settings deliberately retain still images.

The Aqua palette, E7 wallpaper, Polaroids and other app behavior remain. README, CHANGELOG, exact asset bytes and this diagnosis are recorded in the working branch/PR. The following documentation-only commit does not alter the tested application source.
