# Supplied project frames — 16 November 2026

Read projectphotos.md on main (blob a9e11b1599fcfcae41dd7dbc26e82cefce98e6b2). Its two attached portraits and linked Google Photos film now replace the scenery placeholders around Projects.

## Media and source choices

- McMaster Engineering photo: both people and projector boxes remain visible. Caption describes the backdrop; no award or project association is inferred.
- Electronics workbench photo: hands, laptop, ESP32 diagram and components remain visible. It is not assigned to a specific hardware project without author confirmation.
- Full film: the shared Google Photos page supplies a public H.264/AAC rendition. The packaged MP4 is 360×640, 51.533 seconds, all 1541 video frames; the source page reports 51.508 seconds. This is the full timeline, not a shortened loop. The original shared-album link is retained for higher-resolution access.
- Both 1201×1602 photos are JPEG-optimized without resizing. The video is remuxed for fast start without re-encoding or removing audio. Original and packaged encoded stream SHA256s match:
  - Video: 62562e676002795f7ce524d2b908b2d8fa440e14041e54199f83d415d41332a1
  - Audio: ca013500b4b30971683e8189a5f9b382b9985363924389d6bfc90647c1fa5a6a
- Original source links, descriptive captions, dimensions, duration and packaged byte/hash metadata are in src/data/projectMedia.ts and src/data/projectPhotoSources.json. Raw Google page data/account metadata is not included.

## Visibility and behavior

- Every media well follows its actual width/height ratio. Images and videos use contain rather than crop; labels have their own space.
- A free-space layout fits all three frames completely outside the Projects window and within the desktop, with room for their subtle rotation. When that is impossible—or on phone/tablet widths and expanded windows—the collection appears inside the Projects window's scrollable content. Frames are no longer hidden on mobile.
- Tap/Enter opens a full-size modal photo viewer or the full video with native controls, seeking, download and original-source links. Escape closes the viewer; focus returns to the matching frame even after a layout change.
- Preview video loops muted only while visible, the document is active and reduced motion is off. Opening the viewer pauses the preview; full playback starts muted and retains user-accessible original audio. Closing/minimizing Projects closes its viewer.
- About Me snapshots, original silent About Me video, résumé, Mii, loading sequence and music are unchanged.

## Verification

- TypeScript and production build pass, as do all 78 behavior tests and the 78-file asset preflight.
- Geometry tests cover desktop positions/sizes, viewport boundaries, non-overlap, media ratios, and phone/tablet/expanded/space-constrained fallbacks.
- Packaged bytes/dimensions/SHA256 tests cover both photos, poster and film. MP4 checks verify duration, video dimensions, retained audio and fast-start metadata ordering.
- FFmpeg decodes the complete packaged film without error (1541 frames, 51.52 seconds). Original and packaged encoded video/audio hashes are identical.
- Review-deployment and browser evidence will be appended after inspection.

Changes are saved to the review branch; this task does not merge main, promote production or change DNS.
