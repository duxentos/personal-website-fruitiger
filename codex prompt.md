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
