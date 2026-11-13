# Improvement #5 review

Source: `Improvement #5`, blob `36ef8ef3bf21ae149b283da1ae3e1e4f671ad3a3`. Work remains on `codex/aero-portfolio` / PR #1.

## Terminal and usability

- The global Helvetica rule was overriding Terminal's original monospace stack. A later explicit Terminal exception now uses SFMono-Regular, Menlo, Monaco, Consolas and monospace fallbacks, with ligatures disabled and 14px desktop text.
- Narrow command entry uses a separate full-width 16px input with a 44px minimum height. Enter/Go, history, completion and the existing command allowlist remain. The input receives a visible keyboard focus outline.
- About Me headings scale with the actual window width instead of consuming a small window at their previous large size.
- Touch Finder navigation, view buttons, search and Notes actions have at least 44px controls. Touch Dock running indicators sit below their persistent labels.

## Keyword annotations

`src/components/ui/AnnotatedText.tsx` implements the supplied API locally, without a new package or missing import alias. Supported variants: wavy, underline, doubleUnderline, dottedUnderline, line, arrow, highlight, circle, box, bracket, strikethrough and crossOut.

Each text app has one annotated word: engineering (About Me), projects (Finder), the first project-name word (details), find (Connect), notes (Notes toolbar), desktop (Terminal prompt), résumé (Resume toolbar), ipod (device wordmark), yours (Preferences). Each active blog article has one explicit keyword/style in `src/data/blogs.ts`. Strike/cross-out variants are supported but deliberately not applied to identity or résumé content. The Mii-only app remains image-only; editable Notes and all original résumé/project claims are preserved. Blog placeholders remain unpublished placeholders.

Marks draw once on intersection, disconnect their observer, use CSS animation instead of per-frame state, and support delay. System or desktop reduced motion shows the completed static mark. Decorative SVG is hidden from accessibility APIs, ignores pointer events, inherits the surrounding font and adds no box dimensions. Text stays selectable and accessible names remain intact.

## Validation

Local `npm run lint` and `npm run build` pass: all 39 existing behavior tests, TypeScript and Vite. The suite covers commands, notes, persistence, sound, music, boot, touch window bounds and pointer gesture logic; it is not a visual annotation test. No redundant CSS/string tests were added for this presentation change. React quality review checked effect cleanup, stable keys, no new runtime dependencies, decorative SVG accessibility and no frame-by-frame React updates.

Browser/deployment evidence follows after the preview is available. No production promotion, main-branch update or DNS change is part of this revision.
