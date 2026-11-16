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

Main advanced by 15 author-document commits while the implementation branch was reviewed. Only projects.md and projectphotos.md differ in both trees. The release adopts the exact current main blobs for those briefs, retains other author documents, and keeps the application tree. Merge commit c0a8e0a675a011d23306e5ad37a0269b06c0ee65 records the approved release. Its tree exactly matches tested implementation tree 4b5d189eaee98ecbd12a6477f80376285dcf1747; PR #1 is merged.

## Production domain check

- Vercel team team_e4WpOpFvzhCNAoTpNavF9jLM, project prj_YcjToJfbFuWm7Cu6CBMLmkkjHYYZ.
- azaan.design is attached/verified in Vercel, but Vercel reports misconfigured=true, with Porkbun nameservers and parking A values 192.0.79.146 / 192.0.79.190.
- Current Vercel apex recommendation: A values 216.198.79.1 and 64.29.17.1. Recheck immediately before any DNS write.
- personal-website-fruitiger.vercel.app currently redirects to azaan.design (307), so a successful build alone does not make the public address work.
- The user signed into Porkbun. Both apex A records were updated in its DNS UI and read back as 216.198.79.1 and 64.29.17.1 (TTL 600). Existing wildcard and ACME TXT records were preserved. No nameservers, account credentials, email settings or deployment-protection settings were changed.
- Vercel then reported configuredBy=A, acceptedChallenges=[http-01], the correct two A records and misconfigured=false.

## Deploy result

- URL: https://azaan.design/
- Target: production
- Status: READY
- Commit: c0a8e0a675a011d23306e5ad37a0269b06c0ee65
- Framework: Vite / React / TypeScript
- Deployment: dpl_HDD6HCp55EJTzR9NRtmnNYd2kkhf
- Build duration: approximately 29 seconds (Vercel build stage approximately 22 seconds).
- Aliases assigned: azaan.design, personal-website-fruitiger.vercel.app and existing main/project aliases. The default Vercel hostname retains its redirect to the custom domain.
- The GitHub merge request timed out at the connector after completing server-side. Readback confirmed PR #1 merged and main at the expected merge commit before continuing; no duplicate merge was attempted.

## Post-release verification

- Production build independently passes all 81 tests and the 79-file asset preflight.
- HTTPS root returns 200 with the new favicon/metadata and production JS/CSS. Compiled JavaScript contains both newly added project names. CSS, favicon, washer deep link, full MP4 and résumé PDF all return 200 with correct MIME types.
- Native Chrome visited https://azaan.design/ without a share parameter or login. It showed the original running intro, then About Me and Mii on the Aqua desktop. Project Files showed Software (3), Hardware (5) and eight projects overall; the supplied portrait/photo/video prints were visible and fitted. Screenshots confirmed the intended E7 background, blue controls/dark text and Nothing heading style.
- Active user browsing intermittently triggered the UI guard. This final check covers desktop appearance and displayed content, not an exhaustive mobile, fullscreen, sound or keyboard interaction audit. Earlier automated geometry/media/gesture tests remain passing.
- Runtime server-error scan for this production deployment over the previous 15 minutes returned no matching error/fatal records. This is a static client app: that scan does not establish an absence of client-side errors. No drains are configured; client monitoring was not added.
- No www DNS record was saved or advertised; only the working apex domain was changed.
