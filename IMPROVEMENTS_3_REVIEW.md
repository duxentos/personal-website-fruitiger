# Improvements #3 implementation review

Source: `Improvements #3`, blob `50cb5ad389a6cd09b349ea17a6eba690826ed2dd`. These nine instructions supersede conflicting earlier briefs. Work remains on `codex/aero-portfolio` / PR #1.

## Changes

1. Entry and reboot open only **about me** and **projects** in smaller, staggered windows. All other apps start closed, including previously open/minimized extras. A layout revision migrates the earlier four-window default once; later custom geometry remains saved. Other apps can still be opened normally.
2. Waving artwork has a wider framing (78% of its app area), compensating for the closer camera in the supplied GIF. The padded still has separate sizing.
3. Startup completes after **1.25 crossings**. Inspection of the supplied traversal GIF confirmed 175 frames / 7000ms and one left-to-right crossing, so normal entry occurs after 8750ms from displayed-image readiness. The animation is no longer randomly replaced mid-crossing. It is bundled locally as `public/mii-crossing.gif`, copied unchanged from the previously downloaded supplied clip (`3fe2ea08-f625-461e-b6cc-5f95eab8d33d`). Returning from a hidden tab restarts a fresh visible traversal. Reduced motion/unavailable artwork uses a short still fallback; Skip/Escape remains available. Critical assets must also resolve or fall back.
4. Desktop and touch launchers use compact 88px cells with consistent 12px gaps, and Dock items share an 8px gap with viewport-appropriate sizes.
5. The two-app entry policy also applies to saved sessions and deliberate reboot.
6. Dragging starts from actual displayed geometry. Unchanged ResizeObserver callbacks no longer cancel a gesture. Pointer-up includes the last coordinates, and transient movement is removed in a layout effect after committed geometry renders, preventing snap-back. Cancel/close cleanup is retained.
7. Stories is now a simple blog reader with three explicitly unpublished placeholders in `src/data/blogs.ts`. No personal posts are fabricated. Photo and MP4 placeholders float beside/below Projects on desktop; add future asset URLs in `src/data/projectMedia.ts`. No photos/videos were supplied for these slots. Future video playback respects reduced motion and hidden tabs.
8. Two font roles are enforced: Nothing NDot for display headings and Helvetica Neue for Apple-style UI, with device fallbacks. Existing third-family declarations are overridden by the shared tokens.
9. Smaller Apple-style interface labels render lowercase. Content data and uploaded files are not rewritten by CSS casing.

## Files

- Window lifecycle/gesture: `src/components/{windowModel.ts,Desktop.tsx,AquaWindow.tsx}`.
- Layout/type/labels: `src/apps/refinement.css`, `src/components/DesktopChrome.tsx`, `src/apps/terminal/TerminalApp.tsx`.
- Mii/startup: `src/apps/mii/MiiApp.tsx`, `src/components/boot/{BootScreen.tsx,bootTiming.ts}`, `public/mii-crossing.gif`.
- Blog/media: `src/data/{blogs.ts,projectMedia.ts}`, `src/apps/stories/StoriesApp.tsx`, `src/components/ProjectMedia.tsx`, `src/main.tsx`; retired `src/data/stories.ts`.
- Tests/records: boot and session behavior tests, README, CHANGELOG, this review and the source brief snapshot.

## Verification and limits

Local TypeScript passes. The behavior suite includes 33 checks covering the measured crossing boundary/readiness, the two-app launch/migration policy, retained geometry and existing notes/music/sound/bubble/window regressions. Production/browser results are recorded in PR #1 after deployment. No new dependencies. Browser timing follows its event loop; reduced motion and failed assets intentionally use a still fallback rather than forcing animated crossings.

Local writes were briefly interrupted by a full disk. Only the task's generated build output and temporary Swift module cache were removed; source writes and validation then resumed. No user content was deleted.

Run on Node.js 22.18+: `npm install`, `npm run dev`; verify with `npm run lint` and `npm run build`. Production/DNS publication is separate from this preview update.

## Preview observations

The first preview deployed READY and independently passed all 33 tests, TypeScript and Vite. Native Chrome showed the supplied crossing clip and automatic desktop entry, with only about me/projects open, compact launchers and three floating media placeholders. Visual QA found native controls resetting inherited lowercase; the rule was applied directly to desktop UI descendants. The native pointer-drag automation timed out and user activity also changed the browser state, so a complete pointer/gesture pass is not claimed.

## Final build and browser limits

Code commit `dc2f3ab57fd28620bf0f41aeacbc98fb56c63fa6` deployed READY as `dpl_5pBZAZvFZ7zeH41wn2DrRUajqq2N`. Vercel passed all 33 tests, TypeScript and Vite. The final homepage and CSS returned HTTP 200, and the deployed CSS contains the direct lowercase-control rule.

The preceding preview was observed rendering the crossing animation and entering the two-window desktop automatically. Blog-reader accessibility content showed the three unpublished post placeholders. The last browser navigation was blocked by an unexpected Chrome password-security alert, which was left untouched. Final visual casing, current phone spacing and a full pointer-drag pass are not claimed as browser-verified. No console-error pass is claimed for this revision.
