# Improvements implementation plan

Source: `Improvements` on main, blob `252421af93af2b7510d2db68a144db9f58fcae2d` (read in full).

The existing React/Vite app already has shared desktop state, reusable AquaWindow, pointer capture, sound/music providers, real project routes and a five-second boot. Reuse those; no rebuild or new runtime dependencies.

1. Centralize versioned storage, validate/migrate old preferences, and persist sessions without losing closed/minimized states.
2. Add reusable edge/corner resizing, correct focus after close/minimize, viewport fitting and first-visit/returning-session layouts.
3. Restore the Mii plaza with the supplied local image, independent time-based movement, walkable zones, depth sizing, selection and motion controls.
4. Add centralized Stories content; move the engineering reflection there. Replace Notes with an original iOS 6-style editable notebook with local autosave and recoverable deletion.
5. Simplify Terminal to `cd -about me`, help, clear, ls and pwd, without Mii/profile widgets.
6. Refine Projects into an Aqua Finder with actual selection, folder history, views, keyboard opening and source-backed details. Missing screenshots/status/links stay explicitly unprovided.
7. Gate boot on both five seconds and required resource readiness, add reduced-motion-safe transitions, then test storage, window geometry, notes, terminal, plaza and existing sound/music behavior. Build on Vercel and exercise the browser when available.

Publication/DNS changes remain a separate pending approval; this pass updates the implementation branch and preview.

Implementation phases completed locally. Local TypeScript, production bundle and 27 behavior checks pass. GitHub/Vercel preview and browser evidence are recorded in IMPROVEMENTS_REVIEW.md.
