# IPOD.md — Fully Interactive iPod Classic Desktop Music Player

## 1. Objective

Build a fully interactive iPod Classic-inspired music player integrated into my existing Frutiger Aero personal portfolio.

The iPod should behave like a real desktop application, not a separate webpage or generic music widget.

The experience must combine:

- A realistic 2007-era iPod Classic design.
- A fully functional circular click wheel.
- Automatic music playback when the iPod is opened, subject to browser permissions.
- MP3 playback from local repository assets.
- A draggable, floating desktop window.
- Functional music navigation.
- Play, pause, skip, shuffle and repeat.
- Album artwork and song information.
- A nostalgic Now Playing interface.
- Smooth, authentic iPod animations.
- Persistent playback when the iPod is minimised.
- Integration with the existing macOS-inspired menu bar.
- use Music.md

**The goal is to create a realistic, working iPod Classic that visitors can interact with while exploring my portfolio.**

Do not rebuild the website or remove existing features.

---

## 2. iPod Desktop Application Behaviour

### Opening the iPod

Add an iPod Classic application icon to the desktop or existing application dock.

When the user clicks the icon:

1. Open a floating iPod application window.
2. Animate the device appearing with a subtle scale and fade transition.
3. Bring the window to the foreground.
4. Initialise the music library.
5. Load the first available MP3 or the previously selected track.
6. Attempt to begin playback immediately.
7. Display the Now Playing screen.
8. Update the playback indicator in the desktop menu bar.

The opening click should be used as the user interaction that initiates audio playback.

If the browser blocks playback, show a visible Play control and an unobtrusive explanation.

Never bypass browser autoplay policies.

### Window Behaviour

The iPod must support:

- Dragging around the desktop.
- Bringing the window to the foreground.
- Minimising.
- Restoring.
- Closing.
- Reopening without losing the current track.
- Preserving playback state.
- Staying within viewport boundaries.

Use the existing desktop window manager.

Do not build a second independent window manager.

### Closing and Minimising

Minimising the iPod should hide the device but keep music playing.

Closing the iPod window should hide the interface while retaining the audio player in the shared application state.

Music should continue playing unless the visitor pauses it.

Provide a separate Stop Playback command if needed.

Reopening the iPod should restore its current track, progress and playback state.

---

## 3. iPod Classic Physical Design

Create a convincing iPod Classic with an authentic early-2000s Apple appearance.

### Hardware

Include:

- Rounded rectangular aluminium body.
- White or black faceplate.
- Smooth metallic bezel.
- Recessed rectangular display.
- Circular matte click wheel.
- Centre SELECT button.
- MENU label at the top.
- Previous-track symbol on the left.
- Next-track symbol on the right.
- Play/pause symbol at the bottom.
- Fine highlights and realistic shadows.
- Subtle reflective edges.

The physical design must feel like a real piece of consumer hardware.

Avoid oversized, toy-like proportions.

### Colour Variants

Allow switching between:

- Classic White
- Classic Black
- Silver
- Aqua Blue
- Frutiger Green
- Holographic Pink

Keep the default appearance close to the classic white/silver iPod.

### Device Proportions

Preserve realistic iPod Classic proportions.

The screen should occupy the upper portion of the device, with the circular click wheel below it.

All controls must remain visually aligned and usable.

---

## 4. Functional Click Wheel

The circular click wheel must support real gesture-based interaction.

### Scrolling

When a user rotates their mouse or finger around the wheel:

- Clockwise movement scrolls down.
- Anticlockwise movement scrolls up.
- Scrolling changes the highlighted menu item.
- Sensitivity should feel natural.
- Large accidental jumps must be prevented.
- Selection should wrap only if explicitly enabled.

Use angular pointer movement rather than ordinary vertical dragging.

### Button Behaviour

**MENU**
- Navigate to the previous screen.
- Long press to return to the main menu.

**SELECT**
- Open the highlighted menu item.
- Select a song or album.
- Confirm settings.

**PREVIOUS**
- Go to the previous track.
- Hold to seek backwards where supported.

**NEXT**
- Go to the next track.
- Hold to seek forwards where supported.

**PLAY / PAUSE**
- Toggle playback.

### Input Support

Support:

- Mouse dragging.
- Touch gestures.
- Mouse wheel over the screen.
- Keyboard arrow keys.
- Enter to select.
- Escape to go back.
- Space to play/pause when the iPod is focused.

Do not intercept browser shortcuts unnecessarily.

---

## 5. MP3 File Integration

I will manually add MP3 files to the repository.

**Design the entire music system so that adding music requires minimal configuration.**

### Recommended File Structure

```text
public/
└── music/
    ├── tracks/
    │   ├── song-one.mp3
    │   ├── song-two.mp3
    │   └── song-three.mp3
    ├── covers/
    │   ├── album-one.webp
    │   └── album-two.webp
    └── library.json
```

The filenames above are examples only.

Do not invent real songs or assume the files already exist.

### Music Discovery

Implement a build-time script that:

1. Scans `public/music/tracks/` for MP3 files.
2. Builds a music manifest.
3. Uses real filenames as initial track titles.
4. Reads metadata when practical using an appropriate lightweight library.
5. Connects matching album artwork where configured.
6. Generates a typed music library file or JSON manifest.
7. Produces valid public URLs for the audio player.

**Important:** Browsers cannot freely scan the contents of a public directory at runtime.

Use build-time file discovery, or an explicitly maintained manifest, rather than attempting unsupported browser filesystem access.

If a library manifest already exists, update it without destroying manually edited metadata.

### Adding New Music

When I add a new MP3 and run the development server or build process, the track should become available automatically.

For development, ensure newly added files are detected after a restart or through a supported file-watching mechanism.

Never require me to create a new React component for every song.

### Missing Files

- Skip missing audio gracefully.
- Show an error only when necessary.
- Never crash the entire iPod.
- Never display a track as playable when its file is unavailable.

---

## 6. Automatic Playback

### Primary Behaviour

When a visitor opens the iPod using a click or tap, immediately attempt to play the selected MP3.

If no track was previously selected, play the first available track.

Do not require visitors to navigate through several menus before hearing music.

### Browser Autoplay Rules

Implement audio playback within the user-triggered opening interaction whenever possible.

Do not assume that calling `play()` will succeed.

Handle rejected playback promises gracefully.

If playback is blocked:

- Keep the iPod open.
- Show the Now Playing screen.
- Display a clear Play control.
- Allow playback to begin with a direct user interaction.

Do not fake playback indicators.

### Subsequent Playback

When the current track finishes:

- Automatically advance to the next track.
- Respect shuffle and repeat settings.
- Update artwork and metadata.
- Maintain continuous playback where supported.

Do not restart the current track unnecessarily when the user navigates between portfolio pages.

### Default Audio Settings

- Autoplay on iPod opening: enabled, subject to browser permissions.
- Volume: 50%.
- Shuffle: disabled.
- Repeat: all.
- Initial track: first available track.
- Background playback while window is minimised: enabled.

Never play multiple tracks simultaneously.

---

## 7. iPod Navigation

Implement the original iPod-style hierarchical menu system.

### Main Menu

```text
iPod

Music                 >
Now Playing           >
Cover Flow            >
Playlists             >
Settings              >
About                 >
```

### Music

```text
Music

Songs                 >
Artists               >
Albums                >
Genres                >
Playlists             >
Shuffle Songs         >
```

Each screen must display real data from the music library.

Selecting a song should immediately play it.

Selecting an album should display its available tracks.

---

## 8. Now Playing Screen

The Now Playing display is the default screen when the iPod opens.

Show:

- Album artwork.
- Song title.
- Artist.
- Album.
- Playback progress bar.
- Elapsed time.
- Remaining time.
- Play/pause indicator.
- Shuffle indicator.
- Repeat indicator.

### Artwork

If cover artwork exists, display it.

Otherwise, display a tasteful generic iPod-style album placeholder.

Do not use unrelated artwork.

### Playback Progress

Progress must update using the real audio element's playback state.

Seeking should update the actual audio playback position.

The interface must never display fictional playback progress.

---

## 9. Cover Flow

Create an interactive Cover Flow mode inspired by the classic iPod.

Features:

- Horizontal album carousel.
- Perspective rotation.
- Centred selected album.
- Reflective album artwork.
- Smooth transitions.
- Click-wheel navigation.
- Keyboard navigation.
- Touch swipe support.

Selecting an album opens its track list.

Use CSS 3D transforms unless additional rendering technology is necessary.

Do not introduce a heavy 3D engine for simple album rotations.

---

## 10. Music Controls and Playlists

Implement:

- Play.
- Pause.
- Next track.
- Previous track.
- Shuffle.
- Repeat one.
- Repeat all.
- Repeat off.
- Seek.
- Volume adjustment.
- Mute.
- Playlist navigation.

Allow playlists to be configured through a data file.

Optional user-created playlists should persist locally where practical.

Do not build unnecessary authentication or cloud music storage.

---

## 11. macOS Menu Bar Integration

Connect the iPod to my existing macOS-inspired desktop menu bar.

When the iPod is active, the application menu should provide:

**iPod**
- About iPod
- Preferences
- Close iPod

**File**
- Open Music Library
- Open Playlist

**View**
- Now Playing
- Cover Flow
- Songs
- Albums

**Controls**
- Play/Pause
- Next Track
- Previous Track
- Shuffle
- Repeat

**Window**
- Minimise iPod
- Bring iPod to Front
- Close iPod

Use the established menu architecture rather than replacing it.

### Now Playing Indicator

Add a compact indicator to the right side of the desktop menu bar.

Display:

- Music-note icon.
- Short track title when space permits.
- Playback status.
- Play/pause control.

Clicking the indicator should reopen or focus the iPod.

The indicator must reflect actual audio state.

---

## 12. Background Music Behaviour

The audio player must remain independent of the iPod's visible window component.

Use a shared audio controller so:

- Opening windows does not restart playback.
- Minimising does not stop music.
- Navigating portfolio sections does not stop music.
- Reopening the iPod does not create a second audio instance.
- Changing themes does not affect playback.
- Closing project windows does not affect music.
- Pausing music always stops playback.

Preserve track selection and settings where appropriate.

Do not attempt to preserve uninterrupted playback across a full browser reload.

---

## 13. Optional Audio Visualiser

Implement a lightweight audio-reactive visualiser.

Visual inspiration:

- Windows Media Player.
- Early iTunes.
- Frutiger Aero colour gradients.

Use actual audio analysis through the Web Audio API.

Do not animate random bars and claim they respond to the music.

The visualiser should be optional and disabled when reduced-motion preferences require it.

---

## 14. Mobile Responsiveness

On mobile devices:

- Open the iPod as a dedicated app view.
- Scale it to fit the viewport.
- Preserve the circular click wheel.
- Support touch rotation.
- Keep all controls accessible.
- Avoid horizontal scrolling.
- Respect safe-area insets.
- Use compact menu navigation.
- Keep music playing when navigating elsewhere within the website.

Do not force the full desktop draggable-window interface onto a phone.

---

## 15. Technical Architecture

Use the existing React + TypeScript application.

Suggested architecture:

```text
src/
├── apps/
│   └── ipod/
│       ├── IPodApp.tsx
│       ├── IPodShell.tsx
│       ├── IPodScreen.tsx
│       ├── ClickWheel.tsx
│       ├── NowPlaying.tsx
│       ├── CoverFlow.tsx
│       ├── MusicLibrary.tsx
│       ├── PlaylistScreen.tsx
│       ├── IPodSettings.tsx
│       ├── AudioController.ts
│       ├── hooks/
│       │   ├── useClickWheel.ts
│       │   ├── useIPodNavigation.ts
│       │   └── useAudioPlayer.ts
│       └── ipod.css
├── data/
│   └── musicManifest.ts
└── scripts/
    └── generateMusicManifest.mjs

public/
└── music/
    ├── tracks/
    ├── covers/
    └── library.json
```

Adapt these paths to the existing repository.

Do not duplicate existing audio or window-management functionality.

---

## 16. Accessibility and Performance

- Respect reduced-motion preferences.
- Support keyboard navigation.
- Ensure clickable controls have accessible labels.
- Avoid excessive animation.
- Clean up audio event listeners.
- Release unused resources.
- Lazy-load album artwork.
- Use one shared audio element.
- Handle missing audio files.
- Avoid unnecessary rerenders.
- Keep Cover Flow rendering lightweight.
- Maintain compatibility with the existing bubble animation system.

The iPod must not significantly degrade desktop performance.

---

## 17. Anti-Vibe-Coding Requirements

- No emoji music controls.
- No fake playback.
- No decorative click wheel.
- No generic Spotify clone.
- No unnecessary purple gradients.
- No fake album metadata.
- No random placeholder songs.
- No broken playlists.
- No unnecessary authentication.
- No backend unless clearly justified.
- No heavy dependencies without a practical benefit.
- No separate music player disconnected from the iPod interface.

Every interactive control must perform its stated function.

---

## 18. Implementation Instructions

Before coding:

1. Inspect the existing website and desktop architecture.
2. Locate the app launcher and window manager.
3. Inspect the existing macOS-style menu bar.
4. Create the iPod application components.
5. Build the realistic iPod shell.
6. Implement the circular click wheel.
7. Implement the music discovery script.
8. Connect the HTML audio playback engine.
9. Implement automatic playback when opened.
10. Create the Now Playing interface.
11. Implement library navigation.
12. Add Cover Flow.
13. Connect music controls to the menu bar.
14. Implement persistent background playback.
15. Optimise for mobile devices.
16. Test all controls.
17. Run lint, TypeScript checks and production build.
18. Fix any discovered issues.

Do not stop after creating the visual interface.

The implementation must include actual working behaviour.

---

## 19. Acceptance Tests

The implementation is complete only when:

- Clicking the iPod desktop icon opens the iPod.
- The iPod appears as a floating window.
- The iPod can be dragged.
- The click wheel scrolls correctly.
- SELECT and MENU work.
- MP3 files added to the music folder appear in the library after the supported discovery/build step.
- Clicking the iPod icon attempts to start playback.
- The first available song plays if permitted by the browser.
- Browser-blocked playback is handled gracefully.
- Music automatically advances to the next track.
- Shuffle and repeat work.
- Progress and duration reflect actual playback.
- Cover Flow displays configured albums.
- Minimising the iPod preserves playback.
- Reopening the iPod preserves the current track.
- Only one audio instance exists.
- Menu bar playback controls work.
- Mobile interactions work.
- The application builds without TypeScript errors.

  IMPROVEMENT: for track 1 and track 2 make the mii do a normal dance and track three make it do a jazzy rick astley dance 

## Final Objective

Create a beautifully detailed, fully interactive iPod Classic that functions as the music player for my Frutiger Aero desktop portfolio.

When visitors click the iPod icon, the device should pop open as a floating window and immediately attempt to play music from the MP3 collection I have added.

Visitors should be able to rotate the click wheel, navigate songs, browse albums, adjust playback, minimise the iPod and continue exploring my projects while listening.

**The experience should feel like a real 2007 iPod Classic running inside a nostalgic Windows XP / macOS Leopard desktop environment.**

**IPOD UI**
<img width="1200" height="1124" alt="image" src="https://github.com/user-attachments/assets/2afcdb15-7143-4fa7-bc31-f8b204c0f388" />
<img width="591" height="805" alt="image" src="https://github.com/user-attachments/assets/4e958cde-4fe3-456c-83d2-3f10055772ed" />
<img width="1200" height="1200" alt="image" src="https://github.com/user-attachments/assets/5b52d7a6-f030-4632-93a2-14536eff2d3c" />




