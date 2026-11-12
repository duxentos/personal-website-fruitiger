# Codex Constraints — Frutiger Aero Personal Portfolio

## 1. Project Objective

Build a fully functional, visually distinctive personal portfolio website showcasing my software, hardware, AI/ML, biomedical engineering, and hackathon projects.

The website should resemble a futuristic personal desktop from 2006–2012, combining **Frutiger Aero, Windows Vista/7 Aero Glass, early Apple Aqua, Wii, and Y2K digital optimism**.

The result must be a professional engineering portfolio, not a generic React landing page.

**Core principle: Nostalgic aesthetics, modern engineering.**

## 2. Technology Constraints

- Use React, TypeScript, and Vite.
- Use Tailwind CSS for styling.
- Use Framer Motion or Motion for React for animations.
- Use Lucide React for interface icons where appropriate.
- Use CSS for glassmorphism, reflections, gradients, and glossy effects.
- Prefer lightweight, reusable components.
- Website must be deployable to Vercel's free tier.
- Do not require a paid API, database, or subscription.
- Avoid unnecessary dependencies.
- All code must be typed using TypeScript.
- Do not use `any` unless absolutely necessary.
- Use functional components and React hooks.
- Use semantic HTML and accessible UI controls.

## 3. Visual Design Constraints

### Aesthetic

Strictly follow the Frutiger Aero design language.

Include:

- Glossy glass panels with realistic highlights.
- Translucent blue and cyan interface elements.
- Aqua-green accents.
- Soft white gradients.
- Rounded, reflective buttons.
- Subtle bloom effects.
- Layered glass windows.
- Water-inspired visuals and floating bubbles.
- Soft shadows and luminous borders.
- Skeuomorphic interface details.
- Windows Vista/7-inspired navigation.
- A futuristic but nostalgic digital atmosphere.
- lowercase only.

### Colour Palette

Primary colours:

- Sky blue: `#49BFFF`
- Aqua: `#00D9E8`
- Light cyan: `#B7F5FF`
- Glass white: `#F1FCFF`
- Grass green: `#72CF65`
- Deep ocean blue: `#176EA3`

Avoid excessive black, flat grey backgrounds, and modern brutalist design.

### Typography

- Use a clean, readable sans-serif.
- Prefer Segoe UI-inspired typography.
- Maintain clear visual hierarchy.
- Avoid excessively futuristic or illegible fonts.

## 4. Layout Constraints

The homepage should resemble an interactive operating system desktop, while remaining intuitive to navigate.

### Navigation

Implement a glossy floating navigation dock with:

- Home
- Projects
- About
- Experience
- Skills
- GitHub
- Contact

Dock icons should enlarge slightly on hover and display tooltips.

### Homepage

Include:

- A cinematic Frutiger Aero hero section.
- My name and "Computer Engineering @ University of Waterloo".
- A brief engineering-focused introduction.
- Floating desktop-style project icons.
- A prominent "Explore Projects" action.
- An animated but subtle background.
- A small status widget displaying what I am currently building.

### Project Explorer

Display my projects in a Windows Explorer-inspired interface.

Each project must include:

- Project name.
- Project category.
- Short description.
- Tech stack.
- Project image or preview.
- GitHub repository link.
- Live demonstration link, if available.
- Technical challenges.
- Engineering decisions.
- Key features.
- Current project status.

Provide category filters for:

- Software Engineering
- AI / Machine Learning
- Biomedical Engineering
- Embedded Systems
- Hardware
- Hackathons

Project cards should resemble glossy desktop windows rather than generic SaaS cards.

### Project Detail Pages

Each project should have a dedicated route with:

- Hero preview.
- Project overview.
- Problem statement.
- Technical architecture.
- Technology stack.
- Implementation details.
- Engineering trade-offs.
- Challenges and solutions.
- Screenshots or demos.
- GitHub and deployment links.

Never invent project achievements, metrics, functionality, or technical details.

## 5. Animation Constraints

Animations should feel like Windows Aero and early Apple interfaces.

Implement:

- Smooth window opening and closing.
- Subtle icon magnification.
- Glass shimmer on hover.
- Gentle bubble movement.
- Soft page transitions.
- Floating background elements.
- Responsive button feedback.
- Optional desktop-window dragging.

Avoid:

- Excessive bouncing.
- Aggressive parallax.
- Constant large-scale animations.
- Long loading transitions.
- Motion that interferes with reading.

Respect `prefers-reduced-motion`.

Maintain smooth interactions on ordinary laptops.

## 6. Functionality Constraints

- All navigation links must work.
- No dead buttons.
- No fake loading states.
- No placeholder GitHub links.
- Support direct navigation to project URLs.
- Support browser back/forward navigation.
- Provide mobile navigation.
- Make every interface usable via keyboard.
- Provide visible focus indicators.
- Ensure sufficient text contrast over glass panels.
- External links must open safely.
- Include a functional contact option using an actual configured address or link.

If information is missing, use clearly identified editable placeholders in the data files rather than inventing personal information.

## 7. Architecture Constraints

Use a clean, maintainable structure:

```text
src/
├── components/
│   ├── Dock.tsx
│   ├── GlassWindow.tsx
│   ├── DesktopIcon.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectExplorer.tsx
│   └── StatusWidget.tsx
├── pages/
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── data/
│   ├── projects.ts
│   └── profile.ts
├── hooks/
├── styles/
├── assets/
└── App.tsx
```

All project content must be data-driven.

Adding a new project should require updating a data file, not rewriting components.

Use reusable components for repeated elements.

## 8. Performance Constraints

- Target Lighthouse performance of 90+ on desktop.
- Avoid layout shifts.
- Lazy-load nonessential images.
- Optimise images using modern formats.
- Avoid unnecessary rerenders.
- Avoid expensive continuous blur animations.
- Prefer CSS transitions for simple effects.
- Ensure mobile devices can run the website smoothly.
- Provide fallbacks for unsupported visual effects.

## 9. Responsive Design

The website must support desktop, tablet, and mobile layouts.

Desktop: Full Aero desktop experience.

Tablet: Simplified window layout.

Mobile: Stacked panels with touch-friendly navigation.

Never allow windows or dock elements to overflow the viewport.

## 10. Content Constraints

Use my actual engineering projects, including relevant work such as:

- ClinTempo
- GOOSE / Dynamic Notch
- Biotron Exoskeleton
- Other verified GitHub projects

GitHub profile: https://github.com/duxentos

Do not claim that incomplete projects are finished.

Clearly distinguish completed, in-progress, and experimental projects.

Do not invent statistics, awards, employers, or accomplishments.

## 11. Development Workflow

Before writing code:

1. Inspect the existing repository.
2. Identify the current stack and reusable components.
3. Produce a concise implementation plan.
4. Establish a consistent visual design system.
5. Build the core layout and navigation.
6. Implement the project explorer.
7. Add animations and polish.
8. Test responsiveness and accessibility.
9. Run lint, type checking, and production build.
10. Fix all discovered errors.

Do not blindly overwrite existing functionality.

Do not make unnecessary changes outside the requested scope.

Do not introduce a backend unless there is a clear functional requirement.

## 12. Non-Negotiable Constraints

- NO generic SaaS portfolio templates.
- NO plain white backgrounds with basic cards.
- NO excessive purple gradients.
- NO unnecessary AI-generated marketing copy.
- NO emoji used as substitutes for interface icons.
- NO broken routes.
- NO fake project achievements.
- NO unnecessary authentication.
- NO paid infrastructure.
- NO excessively heavy animations.
- NO horizontal scrolling on mobile.
- NO unfinished TODOs in core functionality.

The final website should feel like **opening a beautifully designed Windows Vista-era computer from an optimistic vision of the future**, while presenting serious, technically credible engineering work.

Prioritise functionality, technical credibility, visual consistency, accessibility, and performance equally.
## 13. Expanded Colour System & Creative Freedom

Do NOT restrict the website to blue, cyan, and green. Frutiger Aero embraces vibrant, optimistic, glossy colours.

Use a diverse, cohesive palette inspired by Windows Vista, Windows Media Player, Apple Aqua, early iPod interfaces, and 2000s digital futurism.

### Primary Colours — Aqua & Sky

- Sky Blue: `#49BFFF`
- Electric Cyan: `#00D9FF`
- Ocean Blue: `#087CBF`
- Ice Blue: `#C7F4FF`
- Turquoise: `#00CDB8`
- Deep Teal: `#008E9B`

### Secondary Colours — Nature & Optimism

- Lime Green: `#A8F542`
- Fresh Grass: `#72CF65`
- Emerald: `#22C982`
- Mint: `#A5FFE1`
- Sunshine Yellow: `#FFE45C`
- Golden Yellow: `#FFCA28`

### Accent Colours — Playful Y2K

- Bubblegum Pink: `#FF85C8`
- Hot Pink: `#FF4FA3`
- Lavender: `#B49CFF`
- Electric Purple: `#956BFF`
- Coral: `#FF796B`
- Tangerine: `#FF9B42`
- Cherry Red: `#F44965`

### Atmospheric Colours

- Pearl White: `#F6FDFF`
- Frosted Silver: `#DCECF5`
- Cloud Grey: `#B6D2E0`
- Midnight Navy: `#163A65`
- Deep Indigo: `#303878`

### Creative Colour Rules

1. Experiment with multicoloured gradients rather than relying on blue everywhere.
2. Give different projects their own accent colours.
3. Use iridescent gradients that transition between cyan, pink, violet, and green.
4. Allow glossy buttons to feature colourful highlights and reflections.
5. Incorporate rainbow-like light refractions into glass panels.
6. Use warm colours to balance predominantly cool backgrounds.
7. Use luminous green, yellow, and orange for small UI indicators.
8. Experiment with translucent coloured window borders.
9. Use saturated colours selectively to maintain visual hierarchy.
10. Make the interface feel cheerful and futuristic, never flat or corporate.

### Suggested Gradient Combinations

- Aqua Dream: `#00D9FF → #A5FFE1 → #49BFFF`
- Digital Sunset: `#FF85C8 → #FFCA28 → #FF9B42`
- Holographic Glass: `#B49CFF → #00D9FF → #FF85C8`
- Nature OS: `#A8F542 → #72CF65 → #00CDB8`
- Candy Chrome: `#FF4FA3 → #956BFF → #49BFFF`
- Aurora: `#22C982 → #00D9FF → #956BFF`

### Dynamic Colour System

Implement a theme system using CSS custom properties so colours can be changed without modifying individual components.

Allow different pages or project windows to have distinct accent colours while maintaining a consistent overall design.

Optional: Add a small desktop-style theme selector with Aqua, Sunset, Aurora, Candy, and Nature themes.

Theme selection should persist between visits using localStorage.

### Important Design Principle

**The palette is a creative toolkit, not a rigid specification.**

Codex may introduce additional complementary colours and experiment with gradients, reflections, iridescence, and glass effects.

Do not use every colour simultaneously. Balance vivid accents with calm surfaces, clear typography, and readable content.

The objective is a colourful, nostalgic digital environment that feels like an optimistic vision of the internet in 2007–2012, not a conventional modern portfolio.
