# Aqua palette correction

Author clarification: E7 wallpaper with subtle purple hues; retain iOS 6/Aqua blue and darker text.

Re-read current main sources `codex prompt.md` (blob `4affb8d41f0b5cbf24a5d98d0ec9066e180cbd8e`) and `UIreference.md` (blob `526c1b31ac971429d5ca25e5633ecb1ba58609be`). Inspected supplied attachments `63aa8150-5faa-4fa4-a472-11525b2ade3e` (heyclicky/Aqua dark-label button treatment) and `e2514732-e8ee-407d-88f2-c59c5be4c589` (iOS 6 glossy icons and blue atmosphere) in Chrome.

`src/apps/aquaPalette.css` provides the final palette tokens and overrides. The exact E7 PNG remains intact; low-opacity violet CSS layers affect only its desktop background. UI windows, menus, selections and buttons use pale blue/ice/gloss with dark navy labels, including hover/pressed states. Welcome, Find Me, project/blog copy, toolbar metadata and Polaroid captions are darker. Desktop/Dock labels also receive dark text, with a light translucent backing for desktop shortcuts. Terminal keeps light text on its dark Mac-style surface; Notes retains its material styling.

No behavior, supplied image bytes, dependencies, window geometry or Mii logic is changed. README and CHANGELOG record this correction. Existing build/behavior verification and deployed visual results are recorded below.
