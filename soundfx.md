# SOUND-EFFECTS.md — Frutiger Aero Desktop Audio System

## 1. Objective

Implement a fully functional, nostalgic sound effects system across my existing Frutiger Aero desktop portfolio.

The audio experience should take inspiration from:

- Windows XP — soft startup sounds and desktop notifications.
- Windows Vista / 7 — glass-like interface sounds.
- Mac OS X Leopard — subtle UI feedback.
- iPod Classic — tactile click-wheel navigation.
- Nintendo Wii — playful, gentle interface sounds.

All audio must be associated with real interface interactions.

**Do not redesign the website or remove existing functionality.**

---

## 2. Audio Asset Directory

I will manually upload my sound effects to:

```text
public/
└── sounds/
    ├── desktop/
    │   ├── startup.mp3
    │   ├── shutdown.mp3
    │   ├── icon-click.mp3
    │   ├── window-open.mp3
    │   ├── window-close.mp3
    │   ├── window-minimize.mp3
    │   ├── window-maximize.mp3
    │   └── error.mp3
    ├── menu/
    │   ├── menu-open.mp3
    │   ├── menu-select.mp3
    │   └── menu-back.mp3
    ├── bubbles/
    │   ├── bubble-pop.mp3
    │   └── bubble-bounce.mp3
    ├── ipod/
    │   ├── wheel-click.mp3
    │   ├── select.mp3
    │   ├── menu-back.mp3
    │   └── track-change.mp3
    ├── mii/
    │   ├── greeting.mp3
    │   └── interaction.mp3
    └── notifications/
        ├── notification.mp3
        └── success.mp3
```

These filenames are suggested conventions, not assumptions that the assets already exist.

Support filenames and paths configured in a central sound manifest.

Do not invent audio files.

---

## 3. Sound Event Mapping

| Event | Sound File | Default |
|---|---|---|
| Desktop startup | `desktop/startup.mp3` | On |
| Desktop restart | `desktop/shutdown.mp3` | Off |
| Desktop icon click | `desktop/icon-click.mp3` | On |
| Window opened | `desktop/window-open.mp3` | On |
| Window closed | `desktop/window-close.mp3` | On |
| Window minimised | `desktop/window-minimize.mp3` | On |
| Window maximised | `desktop/window-maximize.mp3` | On |
| Invalid operation | `desktop/error.mp3` | On |
| Menu opened | `menu/menu-open.mp3` | On |
| Menu item selected | `menu/menu-select.mp3` | On |
| Menu back navigation | `menu/menu-back.mp3` | On |
| Bubble popped | `bubbles/bubble-pop.mp3` | On |
| Bubble bounced | `bubbles/bubble-bounce.mp3` | Off |
| iPod wheel scrolled | `ipod/wheel-click.mp3` | On |
| iPod SELECT pressed | `ipod/select.mp3` | On |
| iPod MENU pressed | `ipod/menu-back.mp3` | On |
| iPod track changed | `ipod/track-change.mp3` | On |
| Mii greeting | `mii/greeting.mp3` | On |
| Mii clicked | `mii/interaction.mp3` | On |
| Notification received | `notifications/notification.mp3` | On |
| Successful action | `notifications/success.mp3` | On |

Only trigger effects when the corresponding action genuinely occurs.

If an asset does not exist, skip that sound gracefully.

---

## 4. Central Audio Manager

Create one reusable sound effects manager.

The manager must:

- Load audio from the configured asset paths.
- Cache frequently used sound effects.
- Avoid unnecessary network requests.
- Control overall sound effect volume.
- Support individual category volume levels.
- Rate-limit repetitive effects.
- Prevent excessive overlapping playback.
- Handle missing files gracefully.
- Handle rejected playback promises.
- Remain independent from the iPod's music player.

Use the Web Audio API or reusable HTMLAudioElement instances, depending on the existing architecture.

Do not create a new audio element on every animation frame.

---

## 5. Sound Configuration

Implement a central configuration file:

```typescript
export const soundEffects = {
  desktop: {
    startup: "/sounds/desktop/startup.mp3",
    iconClick: "/sounds/desktop/icon-click.mp3",
    windowOpen: "/sounds/desktop/window-open.mp3",
    windowClose: "/sounds/desktop/window-close.mp3",
  },

  menu: {
    open: "/sounds/menu/menu-open.mp3",
    select: "/sounds/menu/menu-select.mp3",
    back: "/sounds/menu/menu-back.mp3",
  },

  bubbles: {
    pop: "/sounds/bubbles/bubble-pop.mp3",
  },

  ipod: {
    wheelClick: "/sounds/ipod/wheel-click.mp3",
    select: "/sounds/ipod/select.mp3",
    menuBack: "/sounds/ipod/menu-back.mp3",
  },

  mii: {
    greeting: "/sounds/mii/greeting.mp3",
  },

  notifications: {
    notification: "/sounds/notifications/notification.mp3",
  },
};
```

Extend the configuration with other supported events as needed.

Do not hardcode sound paths across unrelated UI components.

---

## 6. System Preferences Integration

Add a functional Sound settings panel to the existing macOS-inspired System Preferences window.

Include:

- Master Sound Effects Toggle.
- Master Sound Effects Volume.
- Desktop Sounds Toggle.
- Menu Sounds Toggle.
- Bubble Sounds Toggle.
- iPod Click-Wheel Sounds Toggle.
- Mii Sounds Toggle.
- Notification Sounds Toggle.
- Test Sound button.
- Reset Sound Preferences button.

Persist preferences using localStorage.

### Default Values

```typescript
export const defaultSoundPreferences = {
  enabled: true,
  masterVolume: 0.25,
  desktop: true,
  menu: true,
  bubbles: true,
  ipod: true,
  mii: true,
  notifications: true,
};
```

Do not automatically trigger startup audio on initial page load.

A sound may play after a visitor explicitly interacts with the desktop.

---

## 7. iPod Music Integration

The iPod's music player and the desktop sound effects manager must operate independently.

Requirements:

- iPod music keeps playing during desktop sound effects.
- iPod music volume remains separate.
- Disabling desktop effects does not mute the music.
- Muting music does not necessarily disable interface effects.
- iPod click-wheel sound can be disabled independently.
- Rapid click-wheel scrolling must not cause audio overload.
- Opening or closing the iPod window must not recreate the music player.

Do not change the existing MP3 library implementation.

---

## 8. Bubble Sound Effects

Connect `bubble-pop.mp3` to actual bubble-pop events.

Requirements:

- Play one pop effect per bubble popped.
- Match the sound to the animation.
- Use subtle volume variation.
- Allow overlapping pops within a safe concurrency limit.
- Avoid playing sounds continuously during ordinary bubble movement.
- Disable bounce sounds by default.
- Respect the visitor's sound preferences.

Do not play bubble sounds simply because a bubble is visible.

---

## 9. Mii Character Sound Effects

Add optional audio reactions for the existing Mii character.

Suggested events:

- Greeting when deliberately activated.
- Short interaction sound when clicked.
- Optional confirmation sound when opening a project.

Do not make the Mii repeatedly speak or play sounds without user interaction.

Do not add fake dialogue or unnecessary voice generation.

---

## 10. Mobile Behaviour

The system must work on mobile browsers.

Requirements:

- Play sounds only when permitted by browser audio policies.
- Initialise audio after a user interaction.
- Support touch-triggered sounds.
- Keep volume conservative.
- Avoid excessive overlapping effects.
- Preserve accessibility.
- Do not interfere with mobile media playback controls.
- Avoid triggering sounds while the user simply scrolls the page.

---

## 11. Performance and Reliability

- Lazy-load infrequently used effects.
- Preload only frequently used assets when useful.
- Cache decoded audio when appropriate.
- Limit simultaneous sound instances.
- Use a cooldown for repetitive UI effects.
- Clean up audio resources and listeners.
- Avoid unhandled audio playback errors.
- Avoid unnecessary dependencies.
- Do not slow down the desktop bubble animations.
- Do not interrupt the iPod music player.

Use short, lightweight audio files where possible.

---

## 12. Accessibility

- Sound must never be the only indicator of an action.
- Provide visual feedback alongside sound feedback.
- Make all sound effects optional.
- Provide a clearly accessible mute control.
- Respect the visitor's playback choices.
- Avoid unexpectedly loud audio.
- Do not automatically play sounds before user interaction.
- Ensure critical notifications remain visible when sound is disabled.

---

## 13. Implementation Workflow

Before coding:

1. Inspect the current repository.
2. Identify existing desktop event handlers.
3. Find the existing iPod audio controller.
4. Check which sound assets are available.
5. Implement the central sound manifest.
6. Create a reusable sound manager.
7. Connect desktop sounds.
8. Connect menu sounds.
9. Connect bubble sounds.
10. Connect iPod wheel sounds.
11. Connect Mii interactions.
12. Connect notification sounds.
13. Add System Preferences controls.
14. Test desktop and mobile behaviour.
15. Run lint, TypeScript checks and production build.
16. Fix all discovered errors.

Preserve all existing functionality.

---

## 14. Acceptance Criteria

Implementation is complete when:

- Existing sound files load successfully.
- Missing sound files do not crash the application.
- Desktop clicks trigger their mapped sounds.
- Window actions trigger appropriate sounds.
- Menu selections produce audio feedback.
- Bubble pops play synchronized sound effects.
- iPod wheel navigation produces controlled clicking feedback.
- Mii interactions trigger configured sounds.
- Notifications play sound when enabled.
- Master mute works.
- Individual category toggles work.
- Volume controls work.
- Preferences persist across reloads.
- iPod music operates independently.
- No unnecessary overlapping sound occurs.
- Mobile browser restrictions are handled.
- Build and type checks pass.

---

## 15. Strict Constraints

- NO fake sound effects.
- NO hardcoded audio paths scattered throughout components.
- NO unnecessary audio dependencies.
- NO sound on every mouse movement.
- NO uncontrolled overlapping effects.
- NO unexpected loud playback.
- NO autoplay before user interaction.
- NO interruption of iPod music.
- NO duplicated sound managers.
- NO removal of existing functionality.
- NO unlicensed copyrighted sound assets.

## 16. Automatic Sound Effect Discovery & Download

### Objective

Automatically source, download and integrate sound effects for every interaction specified in this document.

I do not want to manually download, rename or organise individual audio files.

Codex should handle the entire process where network access and licensing permit.

### Sound Sources

Prioritise:

1. Freesound — CC0-licensed effects.
2. Pixabay — appropriately licensed sound effects.
3. Mixkit — sound effects permitted for website use.
4. Other trustworthy public-domain or appropriately licensed sound libraries.

Use actual downloadable audio assets, not preview URLs or HTML pages.

**Only download assets with licences permitting use and redistribution in a public GitHub repository and deployed website.**

### Audio Aesthetic

Find sounds resembling the following eras without copying proprietary recordings:

**Windows XP**
- Warm startup chimes.
- Gentle application-opening sounds.
- Soft notification tones.

**Windows Vista / Windows 7**
- Glass-like interface clicks.
- Airy electronic notifications.
- Soft window transition sounds.
- Watery bubble pops.

**Mac OS X Leopard**
- Subtle menu selection clicks.
- Gentle confirmation sounds.
- Minimal navigation feedback.

**iPod Classic**
- Short tactile click-wheel sounds.
- Selection clicks.
- Menu navigation ticks.

**Nintendo Wii / 3DS**
- Playful, gentle electronic sounds.
- Friendly character interactions.
- Soft confirmation tones.

### Automatic Download Workflow

1. Read the sound event mapping in Section 3.
2. Identify all required sound assets.
3. Search suitable licensed sound libraries.
4. Verify the licence of each candidate.
5. Download the best matching effect.
6. Validate that the downloaded file is audio.
7. Convert to MP3 where necessary and legally permitted.
8. Trim excessive silence where appropriate.
9. Normalise excessively loud effects conservatively.
10. Save each sound using its specified filename.
11. Generate or update the central sound manifest.
12. Connect every available sound to its event handler.
13. Test audio loading and playback.

Use the folder structure defined in Section 2.

### Asset Tracking

Create:

`public/sounds/CREDITS.md`

Record for every downloaded effect:

- Filename.
- Original title.
- Creator.
- Source URL.
- Licence.
- Attribution requirements.
- Download date.

Do not guess licence information.

If a licence cannot be verified, do not download or use that asset.

### Missing Audio

If a suitable asset cannot be located:

- Leave the effect unmapped.
- Do not substitute unrelated sounds.
- Do not create fake audio files.
- Record the missing sound in the implementation summary.

The application must continue working without missing audio.

### Integration Requirements

Use the existing sound manager.

Do not introduce a second audio system.

All downloaded effects must respect:

- Master volume.
- Category toggles.
- Individual sound settings.
- Audio concurrency limits.
- Browser autoplay restrictions.
- Existing iPod playback.

### Acceptance Criteria

The task is complete when:

- All available sound effects are downloaded into the correct directories.
- All assets have verified redistribution permissions.
- The sound manifest references actual files.
- Every configured event plays its corresponding effect.
- Missing assets are handled gracefully.
- Desktop music playback remains independent.
- System Preferences controls work.
- Sound effects do not become irritating through repetition.
- TypeScript and production build checks pass.
- `CREDITS.md` documents the origins and licences.

### Final Instruction

**Do not stop after finding links to sound effects. Download, organise, integrate and test the actual audio files whenever technically possible and legally permitted.**

Do not claim assets were downloaded or tested unless those operations succeeded.

## Final Goal

Create a polished, nostalgic desktop sound system that makes my Frutiger Aero portfolio feel like a real operating system from the Windows XP, Vista, Windows 7, Mac OS X Leopard and Nintendo Wii era.

Every click, window interaction, bubble pop and iPod navigation action should have deliberate, subtle audio feedback.

**The sound design must enhance the experience without becoming distracting.**
