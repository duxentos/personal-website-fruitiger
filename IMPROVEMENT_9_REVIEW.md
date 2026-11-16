# Improvements 9 review

Read `Improvements 9.md`, blob `b8aa7950fbe4c7376f0c24e9d55f878c48a551cc`, from main commit `2e2a51a48893c2a25f4462a2a84bb3a16a0dc74a`. All eight numbered items are implemented in the existing React/Vite desktop; no runtime dependency was added.

## Window titles, Find Me and startup

A final stylesheet replaces accumulated asymmetric title offsets with left:50%, translateX(-50%) and a symmetric bounded text width. On touch windows narrower than 360px the title occupies its own centered row, preserving the three window-control targets. Desktop Mii keeps its normal compact one-row title bar.

Find Me defaults to 440×320 with less padding, a 30px heading and the existing compact social pills. Layout revision 6 migrates the previous oversized Find Me frame once; subsequent intentional resizing is saved. Only About Me and Mii open at startup/reboot, with Mii focused; other windows remain closed while their saved geometry stays available. Projects can still be opened normally. Startup displays the requested “welcome to Azaans space!” heading and retains the randomized supplied running GIFs, one-crossing timing and Skip/reduced-motion fallbacks.

## Gallery, arrows and Terminal

The glitch slices, hue offsets and scan-band keyframes are removed. New photos use a short gel-like scale pop, a soft reflective sweep and three small pearlescent bubbles. No per-frame React updates or duplicated photo slices remain. Existing five-frame allocation, face/subject crops, fifteen active photos, fitted silent video, pause/manual browsing, hidden/offscreen behavior and reduced motion remain.

Diagonal ArrowUpRight icons and the remaining diagonal external-link glyphs are replaced with horizontal Lucide ArrowRight or FileText/Download icons. No emoji replacement was introduced.

Terminal follows the classic Mac Basic appearance: white background, black Menlo text, a compact inline zsh-style prompt, native-looking caret/selection, minimal padding and an Aqua title bar. The decorative banner and input placeholder are removed. Click-to-focus, keyboard input, history, completion and the existing cd -about me/help/clear/ls/pwd allowlist remain. Unsupported commands return a zsh-style text error; no host shell is executed. This is a browser portfolio app with native-inspired UI, not an actual macOS Terminal process.

## Full résumé preview

The original supplied PDF has one page. It is unchanged. Core Graphics rendered that entire page at 1440×1864 into a local JPEG. The first visual inspection exposed an upscale issue; explicit source-to-image scaling corrected it, and the final full-page image was inspected with all content and margins intact. No résumé text or claims were edited.

ResumeApp displays every rendered page, without an iframe, object or embedded PDF toolbar. Each whole page is a link to the original PDF in a new tab. Separate Open PDF and Download controls remain. A JSON manifest stores page numbers, dimensions and the exact source PDF SHA-256; tests fail if the PDF changes without regenerating previews. `scripts/render-resume.swift` is a reproducible macOS-only maintenance tool; Vercel uses the committed preview and needs no Swift/Poppler installation.

## Validation

Local lint/build pass all 66 tests, TypeScript and Vite. Updated session tests explicitly open Projects before testing its minimized-state persistence, check the two-app launch, compact Find Me migration and saved resizing. New résumé packaging coverage verifies the source PDF hash, every numbered page and actual JPEG bytes. Existing gallery, sound/music, Mii, settings, boot and gesture tests remain passing. React review covers stable page/frame keys, effect cleanup, accessible whole-page links, retained input behavior, reduced motion and no new animation render loop.

The separate photos repository request is prepared in the local `photos-collection` directory and ZIP (17 JPEGs, silent MP4/poster, README, photos.md and media.json). The connector has no repository-creation action, gh authentication/network is unavailable, and the browser’s GitHub creation page is blank. Creation is pending an empty destination repository; no repository creation is claimed. The website’s existing photos.md catalogue remains committed.

## Deployed verification

Application commit `81dd699c054c7abcb705d8ca2d388fbf330972d5` is deployed at:
https://personal-website-fruitiger-ooimgyeqh-azaank041208-hash.vercel.app

Vercel deployment `dpl_F7g2EtEFx55Wyi3uMsgyXFnvt1rb` completed successfully and independently passed all 66 tests. The deployed résumé JPEG and original PDF both return HTTP 200 with their correct image/jpeg and application/pdf types.

Chrome's accessibility tree confirmed only About Me and Mii were open on entry. Opening Terminal showed `azaan — zsh` and the inline prompt; running `help` returned the expected command list. Opening Résumé exposed a complete page-1-of-1 link plus Open PDF/Download controls, without an embedded viewer. Clicking the page opened a new tab to the original PDF; Chrome reported a one-page PDF document and Finished loading PDF.

The native screenshot stream returned a solid blank image even while Chrome's accessibility tree exposed the functioning application. Consequently title centering, precise sizing/colors, the brief glossy transition and the new loader wording are implemented and statically checked, but not claimed as visually verified in this deployment. No fresh phone/Safari, console or manual reduced-motion pass is claimed. Concurrent user navigation also interrupted further GitHub repository setup; no user draft was edited. The separate photos repository still returns 404 and remains pending an empty destination.

This documentation-only follow-up leaves the tested application tree unchanged. No merge, production promotion or DNS change was performed.
