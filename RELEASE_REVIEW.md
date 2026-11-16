# Release finishing pass — 16 November 2026

The user approved deployment and requested finishing touches before publication.

## Final content and polish

- Synced the latest main projects.md (blob 5b409da9048b8d551afcd342d6307d58d395a7c5), including the washer notifier, calipers holder and expanded separate Biotron entry. Eight total projects, five hardware entries, three software entries; original entries remain.
- Dates, contributions and architecture use only author-supplied facts. CAD completion is explicitly distinct from physical printing. No device/CAD image or repository link is invented.
- Added a code-native Aqua favicon, link-preview metadata, meaningful project tab titles, a clear missing-project state, desktop error recovery and a no-JavaScript introduction.
- Improved photo captions, phone-height media viewing, keyboard access to video controls, fullscreen Escape behavior and modified-arrow browser shortcuts. Browser Back returns focus to the matching project file.
- Preserved the E7 wallpaper/Aqua/Nothing typography, résumé PDF, Mii GIFs, randomized startup, music, About Me startup and editable Notes.

## Validation

- TypeScript and production build pass.
- All 81 behavior tests pass; the 79-file preflight includes eight music tracks.
- Added coverage for eight-project/five-hardware counts, original project preservation, completed ntfy filtering, CAD status accuracy and known/missing project browser titles.
- Earlier media duration/hash and geometry checks remain passing. Browser visual coverage remains limited as documented in PROJECT_PHOTOS_REVIEW.md; a production-ready build is not a claim of completed physical-device QA.

## Repository reconciliation

Main advanced by 15 author-document commits while the implementation branch was reviewed. Only projects.md and projectphotos.md differ in both trees. The release adopts the exact current main blobs for those briefs, retains other author documents, and keeps the application tree. A merge commit will record both histories before the release PR is merged.

## Production domain check

- Vercel team team_e4WpOpFvzhCNAoTpNavF9jLM, project prj_YcjToJfbFuWm7Cu6CBMLmkkjHYYZ.
- azaan.design is attached/verified in Vercel, but Vercel reports misconfigured=true, with Porkbun nameservers and parking A values 192.0.79.146 / 192.0.79.190.
- Current Vercel apex recommendation: A values 216.198.79.1 and 64.29.17.1. Recheck immediately before any DNS write.
- personal-website-fruitiger.vercel.app currently redirects to azaan.design (307), so a successful build alone does not make the public address work.
- Native Chrome reached Porkbun's account login. The user has been asked to sign in; no credentials or DNS writes have been performed. Deployment protection remains unchanged.
- Deployment IDs, release result and post-release checks will be recorded after the release operation.
