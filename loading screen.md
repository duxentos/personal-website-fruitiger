# LOADING-SCREEN.md — Nintendo DS / 3DS Mii Boot Experience

## 1. Objective

Replace the existing Windows-inspired loading screen with a playful, highly polished Nintendo DS / Nintendo 3DS-inspired startup experience.

The loading screen should feature:

- A custom Mii character running across the screen.
- Randomly selected Mii GIF animations.
- Nintendo 3DS-inspired skeuomorphic interface design.
- Glossy buttons and reflective surfaces.
- Soft pastel colours and colourful gradients.
- Playful transitions.
- Interactive character behaviour.
- Authentic early-2010s handheld-console aesthetics.
- Seamless transition into my Frutiger Aero desktop.

**The loading experience should resemble opening a personalised Nintendo 3DS in 2011, rather than launching a modern website.**

Do not rebuild the existing portfolio.

Preserve the Windows XP Bliss-inspired desktop, interactive bubbles, macOS menu bar, iPod Classic and other existing features.

---

## 2. Core Visual Direction

Take inspiration from:

- Nintendo DSi Menu.
- Nintendo 3DS HOME Menu.
- Mii Maker.
- Mii Plaza.
- Wii-era character animations.
- Glossy early-2010s Nintendo UI.

### Skeuomorphic Design

Use:

- Soft white plastic-inspired surfaces.
- Rounded bevelled containers.
- Layered glossy gradients.
- Fine reflective borders.
- Subtle inset shadows.
- Soft ambient drop shadows.
- Raised interactive buttons.
- Gentle blue and aqua illumination.
- Pastel-coloured application tiles.
- Glossy icon highlights.

Avoid modern flat design.

Do not use generic SaaS cards or excessive glassmorphism.

The design should feel like a physical handheld console interface.

---

## 3. Suggested Loading Screen Composition

Divide the loading screen into two visual sections inspired by the Nintendo 3DS dual-screen layout.

### Upper Display

The upper section contains:

- A soft sky-blue gradient background.
- Floating translucent bubbles.
- A gently curved ground or platform.
- My animated Mii.
- A small personalised OS logo.
- Subtle reflections and highlights.

The Mii should be the main visual focus.

### Lower Display

The lower section resembles a Nintendo 3DS touchscreen.

Include:

- A glossy rounded interface panel.
- A nostalgic loading indicator.
- A short loading status.
- An optional Skip Intro button.
- Small colourful decorative interface elements.

Avoid making the lower screen excessively complex.

### Responsive Behaviour

On mobile, stack both sections vertically or use one compact combined layout.

The Mii must remain visible without causing horizontal overflow.

---

## 4. Mii Running Animation

**The primary animation should feature my Mii running across the loading screen.**

I will provide the required GIF files.

### Running Sequence

1. The Mii enters from outside the left edge of the stage.
2. The running GIF plays continuously.
3. The character moves horizontally toward the right.
4. Its movement speed matches the running animation as closely as practical.
5. The Mii occasionally slows down or pauses.
6. During pauses, it may perform a randomly selected animation.
7. After the animation, it resumes running.
8. When the desktop is ready, the Mii performs a final greeting animation.
9. The loading screen transitions into the desktop.

### Movement Requirements

- Use CSS transforms or Motion for React to move the character.
- Preserve the GIF's native proportions.
- Avoid stretching or distorting sprites.
- Keep movement smooth.
- Use directional flipping when appropriate.
- Prevent the Mii from appearing clipped.
- Maintain a consistent ground level.
- Keep the character within the visual stage during pauses.

Do not use random movement that makes the Mii jitter.

### Continuous Movement

If loading takes longer than one full traversal, allow the Mii to loop naturally.

Do not artificially extend loading just to complete a running animation.

---

## 5. Randomised Mii Animations

I will provide multiple GIFs for the Mii.

Codex must implement a flexible animation system that discovers or configures these assets.

### Recommended Directory

```text
public/
└── mii/
    ├── running.gif
    ├── idle.gif
    ├── waving.gif
    ├── jumping.gif
    ├── dancing.gif
    ├── spinning.gif
    ├── cheering.gif
    ├── thinking.gif
    └── animations/
        ├── animation-01.gif
        ├── animation-02.gif
        └── animation-03.gif
```

These are suggested filenames only.

Do not assume any GIF exists until it has been added.

### Animation Categories

Organise animations into:

**Locomotion**
- Running.
- Walking.
- Jumping.

**Idle**
- Standing.
- Looking around.
- Thinking.

**Playful**
- Dancing.
- Spinning.
- Cheering.

**Greeting**
- Waving.
- Celebrating.
- Welcoming.

Allow additional animations to be registered without rewriting the animation controller.

### Random Selection

Implement a random animation selector.

Requirements:

- Randomly select from available, registered animations.
- Avoid selecting the same animation twice consecutively when alternatives exist.
- Support weighted probabilities.
- Use configurable animation durations.
- Respect per-animation cooldowns.
- Allow certain animations to occur only in appropriate states.
- Return to running or idle after an animation completes.

Do not play every GIF simultaneously.

### Animation Timing

Because browser GIF elements do not reliably expose animation-completion events, store a configured duration for each GIF.

Use that duration to determine when to transition between animations.

Do not guess animation durations from filenames.

Allow me to adjust animation timings through a central manifest.

---

## 6. Mii Animation Manifest

Implement a typed animation configuration.

Example:

```typescript
type MiiAnimation = {
  id: string;
  src: string;
  category:
    | "locomotion"
    | "idle"
    | "playful"
    | "greeting";
  durationMs: number;
  weight?: number;
  loop?: boolean;
  canInterrupt?: boolean;
};
```

Create a central manifest containing the GIFs that exist.

Use build-time discovery if appropriate.

Ensure unknown or missing files are skipped gracefully.

Do not attempt to scan directories through unsupported browser APIs.

---

## 7. Interactive Mii Behaviour

Make the Mii react to the visitor during loading.

### Click / Tap

When the visitor clicks the Mii:

- Play a randomly selected reaction animation.
- Optionally play an associated sound effect.
- Return to the previous movement state afterward.

### Pointer Hover

On pointer-capable devices:

- The Mii may briefly look toward the cursor.
- Show subtle visual feedback.

Do not constantly restart animations when the pointer moves.

### Animation Interruptions

A user-triggered animation may temporarily interrupt running.

After the reaction finishes, return to the previous state.

Do not allow repeated clicks to create overlapping animations or runaway queues.

---

## 8. Nintendo 3DS-Inspired Loading Indicator

Replace the Windows XP segmented progress bar with a Nintendo handheld-inspired indicator.

Possible styles:

- Small glossy rounded loading tiles.
- A row of gently illuminated squares.
- A colourful 3DS HOME Menu-inspired progress strip.
- Soft bouncing dots within a bevelled panel.

Prefer a compact horizontal indicator.

### Loading Text

Use brief system-style text such as:

- "Starting AzaanOS..."
- "Preparing desktop..."
- "Loading projects..."
- "Welcome!"

Do not display fake technical processes.

### Progress Accuracy

The loading indicator should reflect actual resource readiness.

When numerical progress cannot be measured, use an indeterminate animation.

Do not fabricate percentages.

Do not delay the application to showcase the animation.

---

## 9. Background and Environment

Create a soft Nintendo-inspired loading environment.

### Colours

Use:

- Pearl White: `#F9FCFF`
- Sky Blue: `#8DDCFF`
- Aqua: `#63D8E8`
- Mint Green: `#A7E8B3`
- Pastel Pink: `#FFC9DE`
- Lavender: `#C9BAFF`
- Warm Yellow: `#FFE78C`
- Soft Silver: `#DBE5ED`

### Environment Features

Include:

- A soft gradient sky.
- A glossy floor or platform.
- Subtle circular patterns.
- Gentle ambient shadows.
- Optional floating bubbles.
- Small decorative highlights.

Keep the background visually calm enough for the Mii to remain the focus.

Avoid excessive particle effects.

---

## 10. Transition Into the Desktop

When critical resources are ready:

1. Stop scheduling new random animations.
2. Allow the current animation to finish if it will not noticeably delay access.
3. Otherwise transition immediately.
4. Optionally play the Mii's greeting GIF if already available.
5. Fade or slide away the loading interface.
6. Reveal the Windows XP Bliss-inspired desktop.
7. Display desktop icons and the macOS menu bar.
8. Start the desktop bubble system.
9. Restore the Mii companion to its normal desktop position.

**Do not run the full loading sequence on every page navigation.**

The transition should feel like leaving the Nintendo 3DS HOME Menu and entering a personalised desktop.

---

## 11. Sound Effects Integration

Use the existing `sound-effects.md` system.

Optional sounds:

- Nintendo-inspired startup chime.
- Mii footsteps.
- Soft selection click.
- Character reaction sound.
- Welcome confirmation tone.

Only use audio files that I provide or that are appropriately licensed.

Do not reproduce proprietary Nintendo sounds without permission.

Sound must remain optional and obey browser autoplay rules.

Do not play overlapping footsteps on every animation frame.

---

## 12. Animation Preferences

Add settings to System Preferences:

- Show Startup Animation.
- Enable Random Mii Animations.
- Enable Mii Interactions.
- Mii Animation Frequency.
- Enable Mii Sound Effects.
- Reduced Motion.

Persist appropriate preferences locally.

### Reduced Motion

When reduced motion is preferred:

- Do not move the Mii across the screen.
- Show a static frame or image.
- Disable unnecessary particles.
- Use a simple loading indicator.
- Reveal the desktop as soon as it is ready.

---

## 13. Session Behaviour

### First Visit

Show the complete startup sequence without artificially delaying the desktop.

### Returning Visitor

Optionally use a shortened sequence or skip it if configured.

### Internal Navigation

Never replay the loader.

### Restart Desktop

Allow the existing Restart Desktop command to replay the startup presentation.

### Reload

Preserve the visitor's startup preferences.

Do not erase portfolio data or music preferences.

---

## 14. Mobile Optimisation

The loading screen must work on:

- Small phones.
- Large phones.
- Tablets.
- Desktop monitors.

### Mobile Requirements

- Scale the Mii responsively.
- Reduce stage traversal distance.
- Keep buttons touch-friendly.
- Avoid landscape-only layouts.
- Respect safe areas.
- Avoid oversized GIFs.
- Reduce decorative effects.
- Prevent horizontal scrolling.

The character should remain the focus even on small screens.

---

## 15. Technical Architecture

Use the existing React and TypeScript stack.

Suggested structure:

```text
src/
├── components/
│   └── boot/
│       ├── BootScreen.tsx
│       ├── DualScreenLayout.tsx
│       ├── MiiRunner.tsx
│       ├── MiiAnimationPlayer.tsx
│       ├── LoadingIndicator.tsx
│       └── BootTransition.tsx
├── hooks/
│   ├── useBootSequence.ts
│   └── useMiiAnimations.ts
├── data/
│   └── miiAnimations.ts
└── styles/
    └── boot.css

public/
└── mii/
    ├── running.gif
    └── animations/
```

Adapt to the existing repository.

### State Management

Use a small state machine:

```typescript
type MiiState =
  | "running"
  | "idle"
  | "reacting"
  | "greeting";

type BootState =
  | "initialising"
  | "loading"
  | "ready"
  | "error";
```

Do not create conflicting timers or animation state.

Clean up timers and event listeners on unmount.

---

## 16. Performance Requirements

- Avoid loading every Mii GIF immediately.
- Preload the running animation and one fallback animation.
- Lazy-load optional reaction GIFs.
- Optimise large GIFs where possible.
- Use CSS transforms for movement.
- Avoid triggering React rerenders on every animation frame.
- Pause unnecessary animation when the tab is hidden.
- Avoid expensive animation libraries unless already installed.
- Do not delay desktop readiness.

---

## 17. Quality Assurance

Verify:

1. The Mii runs smoothly across the loading screen.
2. Random animations are selected correctly.
3. The same animation is not repeated unnecessarily.
4. Interactive reactions work.
5. Missing GIFs fail gracefully.
6. Animation durations are configurable.
7. The 3DS-style layout remains responsive.
8. The Mii is not stretched or clipped.
9. Loading progress is meaningful.
10. Skip Intro works.
11. Reduced-motion behaviour works.
12. Desktop transition works.
13. Normal navigation does not replay the loader.
14. Startup audio respects browser permissions.
15. Existing desktop and iPod features remain functional.

Run TypeScript checks, linting and production build.

---

## 18. Strict Constraints

- NO generic modern loading spinner.
- NO Windows XP boot screen.
- NO fake loading percentages.
- NO emojis replacing character artwork.
- NO static decorative Mii when animations are available.
- NO excessive animation delays.
- NO stretched GIFs.
- NO random animation flickering.
- NO simultaneous conflicting GIFs.
- NO autoplay audio before user interaction.
- NO heavy animation dependencies without justification.
- NO removal of existing portfolio functionality.

## Final Goal

Create a beautifully nostalgic Nintendo DS / 3DS-inspired loading screen featuring my animated Mii character running, reacting and performing randomly selected GIF animations.

The interface should feel tactile, playful and skeuomorphic, with polished handheld-console styling.

When the desktop is ready, the Mii should complete its current action or gracefully transition, revealing the Frutiger Aero portfolio.

**It should feel like a small Nintendo-inspired world coming to life before the visitor enters my desktop.**
here are the gifs provided <img width="1000" height="480" alt="the-scenic-route" src="https://github.com/user-attachments/assets/3fe2ea08-f625-461e-b6cc-5f95eab8d33d" />
<img width="1000" height="480" alt="taking-a-shortcut" src="https://github.com/user-attachments/assets/39808990-5c40-44e5-ab98-85bcbcef7a3d" />
<img width="1000" height="480" alt="a-little-hop" src="https://github.com/user-attachments/assets/1011e8a3-93bb-44be-97e6-ae993bc75366" />


