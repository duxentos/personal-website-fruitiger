# Projects and About Me review — 16 November 2026

The current author briefs drive the existing Aqua desktop rather than replacing its operating-system interface.

## Author sources

- projects.md on main: blob faafbd96f111d2bec0bd0b84a1734281ecb9f428.
- aboutme.md on main: blob 5ae176361ad83822f6aa816176c0544ef1efe2e7.
- The selected 13 November general résumé remains byte-for-byte unchanged (SHA256 b9b9d9d4cfa06cf4d95d9a012ef54e5ac9d0e9fb41f816dd24ab3d228eaefd59).
- NeuroSight: https://devpost.com/software/nuerosight and https://writeontime.ink/. The Devpost URL spelling is intentional. Public author screenshots and description establish the stack, record review, assessments and time-series/ML sections. No clinical accuracy or award is claimed. The linked pac2mac repository returned 404, so it is omitted from working links.
- Asset-level original URLs and captions are stored in src/projects.ts; brief provenance and caveats are in src/data/projectSources.json.

## Delivered behavior

- Software and Hardware directories with thumbnails, custom Lucide-based Aqua icon compositions, counts, breadcrumbs and back/forward history.
- Search combines with directory and completion filters; card, list and column views retain the desktop View menu preference.
- NeuroSight, ClinTempo, GOOSE, ECE 198 Rehabilitation Device and iPhone 4 Restoration have dedicated data-driven windows. Existing Biotron remains a separate sixth project.
- Close, return and Escape reopen the matching directory and focus its originating project. Deep links remain /projects/:id; the directory uses /projects.
- Galleries have intrinsic dimensions, contained full images, captions, lazy thumbnails, wraparound navigation, fullscreen focus containment/Escape and missing-image fallbacks.
- Interactive architecture inspectors distinguish planned nodes. GOOSE has a clearly labeled expandable notch concept, not a claimed live integration.
- iPhone restoration includes all six supplied photo references and a narrative diary. Photos 3 and 6 are the same supplied photograph; both references are retained and identified. No photo timestamps or same-angle before/after comparison are invented.
- About Me reflects the supplied ML, embedded systems and biomedical interests plus music, cricket, football/soccer, photography and new sports. It remains open and active on entry. Editable Notes are preserved.

## Accuracy choices

- ClinTempo's latest author brief reports 45% reduced typing time; the site explicitly labels it project-reported. It does not claim independently measured clinical outcomes or alter the résumé's original wording.
- ECE 198 details use the chosen résumé: ESP32, pulse oximeter, accelerometer, Python, time-series/regression and comparison with commercial wearables. Missing schematics/CAD are tracked as data TODOs rather than fabricated.
- Cloud sync and GOOSE integrations remain planned/developing. Status filters group ClinTempo under in progress because continuing development is explicit, while its prototype completion is described.

## Verification

- Local TypeScript and production build pass.
- All 74 behavior tests pass, including combined filtering, navigation history, gallery wraparound, image bytes/dimensions, architecture references and planned-state accuracy.
- Asset preflight verifies 74 packaged files including all eight music tracks. All 13 project gallery images are checked against their actual dimensions.
- Browser preview evidence will be appended after the review deployment is inspected.

This review branch does not promote production, merge main or change DNS. Existing résumé/media/startup/session/gesture/sound tests remain passing.
