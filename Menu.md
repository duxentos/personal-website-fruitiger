# MENU.md — Interactive Frutiger Aero Desktop Environment

## 1. Objective

Transform the existing portfolio's desktop environment into a functional operating-system-inspired interface combining:

- Windows XP Bliss-inspired landscape wallpaper.
- Windows Vista and Windows 7 interactive bubbles.
- Mac OS X Leopard / Snow Leopard interactive menu bar.
- Windows Aero-style project windows.
- Existing Mii-inspired desktop companion.

This is a functional portfolio interface, not a static OS mock-up.

**Preserve existing components, project information, routes, responsiveness and functionality. Do not rebuild the website.**

## 2. Windows XP Desktop Background

Create a beautiful desktop background inspired by the Windows XP Bliss wallpaper.

Visual requirements:

- Vibrant rolling green hills.
- Bright blue sky.
- Soft white clouds.
- Natural sunlight.
- Rich grass-green gradients.
- Slightly saturated, nostalgic photography-inspired colours.

Implementation constraints:

- Prefer an original, appropriately licensed landscape image or illustration.
- Fill the desktop viewport without distortion.
- Preserve the horizon's visual balance across screen sizes.
- Ensure menu bars and desktop icons remain readable.
- Provide mobile-specific positioning.
- Avoid unnecessary background movement.
- Never stretch the wallpaper.
- Maintain a fallback background while assets load.

The background should convey the optimism and tranquillity of the original Windows XP desktop.

## 3. Interactive Windows Vista / 7 Bubbles

Implement a real-time animated bubble system inspired by the classic Windows Vista and Windows 7 Bubbles screensaver.

### Bubble Appearance

Bubbles must resemble translucent soap bubbles rather than flat CSS circles.

Each bubble should feature:

- Transparent glass-like interior.
- Thin iridescent edges.
- Subtle cyan, violet, pink and green reflections.
- Bright specular highlights.
- Soft internal gradients.
- Realistic transparency.
- Variation in size and reflection.

Avoid oversized opaque circles or generic glowing orbs.

### Movement

Bubbles should:

- Float gently around the desktop.
- Move with varied speeds and directions.
- Drift naturally.
- Respond subtly to pointer proximity.
- Have slight changes in trajectory.
- Remain visually distinct.
- Never obscure important text.

Implement smooth, lightweight animation using Canvas 2D or an efficient equivalent.

Avoid heavy physics engines unless genuinely necessary.

### Bubble Interactions

**Pointer hover:**
- Nearby bubbles gently move away from the cursor.
- Apply subtle elastic movement.

**Click or tap:**
- Bubbles pop.
- Play a short, visually satisfying ripple or sparkle animation.
- Remove the bubble after the animation.
- Optionally generate a replacement after a short delay.

**Dragging:**
- Allow users to gently push bubbles around.
- Use pointer events for mouse and touch input.
- Avoid interfering with page scrolling.

**Collision:**
- Bubbles should respond softly to one another.
- Prevent unnatural overlapping where practical.
- Use simplified physics rather than expensive simulation.

### Bubble Controls

Add a preference in the system menu to:

- Enable / disable bubbles.
- Select low, medium or high bubble density.
- Adjust movement speed.
- Enable / disable bubble interactions.

Save preferences in localStorage.

### Bubble Performance

- Target smooth animation on desktop.
- Reduce bubble counts on mobile.
- Pause animation when the page is not visible.
- Respect `prefers-reduced-motion`.
- Avoid unnecessary React rerenders.
- Use device pixel ratio responsibly.
- Limit collision calculations.
- Keep bubbles behind application windows and menus.

**Important:** Bubbles should only intercept pointer events when the user deliberately interacts with them. Do not place a full-screen overlay that blocks the website.

## 4. macOS Leopard-Inspired Menu Bar

Implement a persistent, functional menu bar at the top of the desktop.

### Left Side

- Portfolio / OS Logo
- Finder
- File
- Edit
- View
- Go
- Window
- Help

### Right Side

- Connectivity indicator
- Sound control (only if the website has audio)
- Theme selector
- Spotlight search
- Notification centre
- Local date and time

### Visual Design

Use Mac OS X Leopard / Snow Leopard styling:

- Translucent glossy surface.
- Subtle silver-blue gradients.
- Thin highlight along the top.
- Soft border along the bottom.
- Compact menu labels.
- Lucida Grande / Segoe UI-inspired typography.
- Subtle shadows beneath open dropdowns.
- Classic light-blue active menu highlighting.

Do not imitate modern macOS Sonoma styling.

## 5. Menu Functionality

### Portfolio Menu

- About This Portfolio — opens an About window.
- System Preferences — opens settings.
- Appearance — opens theme controls.
- Projects — opens Project Explorer.
- Restart Desktop — resets temporary window state.
- Return Home — navigates to the desktop.

Restart Desktop must preserve saved preferences.

### Finder

- About Finder.
- Finder Preferences.
- Show Desktop Icons.
- Hide Desktop Icons.
- Show All Windows.

### File

- New Project Window.
- Open Project.
- Close Active Window.
- Close All Windows.
- Copy Project URL.

### Edit

- Copy Portfolio Link.
- Copy Selected Project Link.
- Select All Projects.
- Deselect All Projects.

Disable actions that do not apply to the current state.

### View

- Icon View.
- List View.
- Grid View.
- Sort by Name.
- Sort by Category.
- Sort by Status.
- Toggle Desktop Widgets.
- Enter Fullscreen.

### Go

- Home.
- Projects.
- About.
- Experience.
- Skills.
- Contact.

Use the existing application router.

### Window

- Minimise Window.
- Maximise Window.
- Restore Window.
- Bring All to Front.
- Close Window.
- Dynamic list of currently open windows.

### Help

- Portfolio Help.
- Keyboard Shortcuts.
- About the Interface.
- Report an Issue, if configured.

All visible enabled commands must work.

## 6. Native-Feeling Menu Behaviour

Implement actual desktop menu interactions:

- Click a title to open its dropdown.
- Click it again to close.
- Click outside to dismiss.
- Escape closes the current menu.
- While a menu is open, hovering another title switches menus.
- Arrow keys navigate available menu items.
- Enter activates the highlighted item.
- Disabled items appear disabled.
- Submenus reposition to remain inside the viewport.
- Only one top-level menu should be open at a time.

Use accessible focus management and ARIA patterns.

Do not implement dropdowns using CSS hover alone.

## 7. Spotlight Search

Build a functional macOS-inspired Spotlight overlay.

Shortcuts:

- Cmd + K on macOS.
- Ctrl + K on Windows and Linux.

Search:

- Projects.
- Skills.
- Technologies.
- Portfolio pages.
- Project descriptions.

Requirements:

- Live search.
- Keyboard navigation.
- Enter to open results.
- Escape to close.
- Highlight selected results.
- Proper empty states.

Use existing project data as the source of truth.

## 8. Desktop Window Management

The menu bar must integrate with the existing desktop windows.

Support:

- Opening project windows.
- Closing windows.
- Minimising windows.
- Maximising windows.
- Bringing windows to the front.
- Switching between open project windows.
- Correct window stacking.
- Restoring minimised windows.
- Dragging windows on desktop.
- Keeping windows within usable screen bounds.

The Window menu must update dynamically.

Do not create a second independent window manager.

## 9. Themes and Colours

Retain the expanded Frutiger Aero palette.

Provide theme options:

- Classic Aqua — blue, cyan, silver.
- Bliss — sky blue, green, white.
- Aurora — turquoise, purple, mint.
- Sunset — orange, coral, pink.
- Candy — pink, lavender, electric blue.

Theme changes should affect menus, windows, docks, highlights and selected states.

Do not make the Bliss wallpaper monochromatic when changing themes.

Allow the wallpaper and interface theme to be controlled independently.

## 10. Desktop Layering

Use a clearly defined stacking system:

1. Background wallpaper.
2. Animated bubbles.
3. Desktop icons.
4. Desktop widgets and Mii character.
5. Application windows.
6. Desktop dock.
7. Top macOS menu bar.
8. Dropdown menus and Spotlight.
9. Modal dialogs and notifications.

Maintain consistent z-index tokens.

Ensure bubbles do not interfere with clicking desktop icons or application windows.

## 11. Mobile Responsiveness

On mobile devices, adapt the desktop environment into a touch-friendly interface.

- Keep the Windows XP-inspired wallpaper.
- Reduce bubble density.
- Support tap-to-pop.
- Replace full menu bar with a compact top bar.
- Provide an overflow menu for desktop commands.
- Use full-screen project windows.
- Prevent horizontal scrolling.
- Respect mobile safe areas.
- Maintain minimum 44×44px touch targets.
- Avoid hover-dependent interactions.
- Ensure bubbles never prevent natural scrolling.

Preserve the Frutiger Aero visual identity.

## 12. Technical Architecture

Use React, TypeScript and the project's existing styling system.

Suggested components:

```text
src/
├── components/
│   ├── desktop/
│   │   ├── DesktopBackground.tsx
│   │   ├── BubbleCanvas.tsx
│   │   ├── DesktopEnvironment.tsx
│   │   └── DesktopWindow.tsx
│   └── system/
│       ├── MenuBar.tsx
│       ├── MenuDropdown.tsx
│       ├── SpotlightSearch.tsx
│       ├── NotificationCentre.tsx
│       ├── PreferencesWindow.tsx
│       └── MobileMenu.tsx
├── hooks/
│   ├── useBubblePhysics.ts
│   ├── useKeyboardShortcuts.ts
│   └── useDesktopPreferences.ts
└── styles/
    └── desktop.css
```

Adapt to the existing repository structure. Do not duplicate existing components.

Use CSS custom properties for themes and stacking layers.

Prefer Canvas 2D for bubble animation when it provides sufficient visual quality.

Avoid unnecessary dependencies and external services.

## 13. Accessibility and Performance

- Respect reduced-motion settings.
- Provide a complete option to disable bubbles.
- Pause inactive animation.
- Avoid excessive backdrop filtering.
- Preserve readable text contrast.
- Maintain keyboard-accessible menus.
- Never trap keyboard focus unintentionally.
- Ensure meaningful functionality works without animation.
- Support browser zoom.
- Avoid unnecessary GPU-intensive effects.

All interface controls must work without depending on bubble animation.

## 14. Quality Assurance

Test:

1. Menu dropdowns and keyboard navigation.
2. All enabled menu commands.
3. Background scaling at multiple viewport sizes.
4. Bubble movement and interactions.
5. Bubble disabling and preferences.
6. Window stacking and focus.
7. Spotlight searching.
8. Theme persistence.
9. Mobile touch interactions.
10. Reduced-motion behaviour.
11. Fullscreen behaviour.
12. Existing project functionality.

Run lint, TypeScript checking and production build.

Do not claim tests passed without executing them.

## 15. Strict Design Constraints

- NO generic SaaS navigation.
- NO emoji-based interface icons.
- NO meaningless buttons.
- NO fake OS-level controls.
- NO flat opaque bubble circles.
- NO excessive particle effects.
- NO broken project windows.
- NO massive glass panels obscuring the wallpaper.
- NO unnecessary dependencies.
- NO changes that break existing portfolio content.
- NO copying proprietary UI assets without appropriate permission.

## 16. Implementation Priorities

Implement in this order:

1. Inspect existing portfolio architecture.
2. Integrate the Bliss-inspired desktop background.
3. Implement the working macOS menu bar.
4. Connect commands to existing functionality.
5. Implement Spotlight.
6. Add the interactive bubble system.
7. Integrate settings and theme preferences.
8. Adapt for mobile.
9. Optimise performance.
10. Test and fix all issues.

## Final Design Goal



The website should feel like **Windows XP Bliss meets Windows Vista Aero meets Mac OS X Leopard**.

Visitors should see a beautiful green landscape, colourful translucent bubbles floating naturally across the screen, a functional macOS-inspired menu bar and interactive project windows.

The experience should feel nostalgic, lively and carefully engineered.

**Build a genuinely interactive desktop environment, not a static recreation or a generic AI-generated portfolio.**
