# PROJECTS.md — Interactive Portfolio Project Directory

## Objective

Redesign and implement the **Projects** section of my personal portfolio website.

The Projects section should showcase my work in software engineering, biomedical technology, embedded systems, hardware restoration, and product development.

It must feel like an interactive application rather than a conventional portfolio grid.

**IMPORTANT:** Preserve the existing website's Frutiger Aero, Wii U, Windows Vista, and macOS-inspired design language. Do not rebuild the entire website or introduce an unrelated design system.

The goal is a polished, nostalgic, playful, yet professional engineering portfolio.

---

## 1. Project Directory Structure

Create two primary categories:

- **Software**
- **Hardware**

These should be presented as interactive directories resembling folders in macOS Finder or the Wii U interface.

When someone opens the Projects page, show two visually distinct directories with their own icons, preview thumbnails, and item counts.

### Directory interactions

- Clicking a directory opens its contents with a smooth animated transition.
- Each directory contains project cards arranged in an adaptive grid.
- Clicking a project opens a detailed project window.
- Every project window must support closing and returning to the directory.
- Maintain consistent navigation with the existing macOS-inspired website menu.
- Support keyboard navigation, Escape to close, and accessible focus management.

Use soft shadows, translucent panels, rounded corners, subtle reflections, and skeuomorphic iconography.

Avoid generic AI-generated dashboard aesthetics, emoji-based project icons, and repetitive purple-gradient cards.

---

## 2. Software Directory

### Project 1 — NeuroSight

**Name:** NeuroSight  
**Category:** Biomedical Software / Machine Learning  
**Status:** Hackathon Project

**Links:**
- https://devpost.com/software/nuerosight?ref_content=user-portfolio&ref_feature=in_progress
- https://writeontime.ink/

**Description:**

NeuroSight is a health intelligence platform designed to improve monitoring and understanding of Amyotrophic Lateral Sclerosis (ALS), bridging the gaps between infrequent clinical appointments through accessible digital assessments and AI-assisted medical record analysis.

**Key Features:**

1. At-home motor assessments: Interactive shape-tracing exercises with regression-based analysis measuring path deviations to track motor performance.
2. Speech assessments: Repeated "pa-ta-ka" exercises with time-series analysis for tracking changes in speech patterns.
3. AI-powered medical record analysis: Retrieval-Augmented Generation (RAG) extracts and organises information from uploaded medical records.
4. Longitudinal monitoring: A time-series database supports tracking changes in assessment results over time.

**Implementation instructions:**

- Review the Devpost and research website for verified technical details, screenshots, demo videos, and project results.
- Use verified technologies rather than guessing the stack.
- Include a dedicated section explaining the machine learning and data-analysis components.
- Highlight the clinical problem, engineering solution, and technical architecture.
- Show a sequence of visuals demonstrating motor assessment, speech assessment, and medical records.
- Include clear links to Devpost and the project website.
- Mark the project as a hackathon project, without inventing award names or clinical validation claims.

### Project 2 — ClinTempo

**Name:** ClinTempo  
**Category:** Healthcare / AI / Chrome Extension  
**Status:** Completed prototype / Continuing Development

**Project image:**

https://github.com/user-attachments/assets/ea62af5a-eaba-4b1b-8018-8d5d29b5cc4c

**Description:**

ClinTempo is an AI-powered clinical documentation assistant designed to streamline medical note-taking through real-time transcription, automated note generation, and reusable documentation templates.

The project aims to reduce repetitive administrative tasks so healthcare professionals can spend more time with patients.

**Reported impact:** 45% reduction in typing time. Present this as a project-reported result, not an independently verified clinical outcome.

**Tech Stack:**

React, TypeScript, Node.js, Express.js, Corti AI API, Chrome Extension APIs.

**Architecture:**

- React frontend for clinical documentation workflows.
- Express.js REST API backend for processing requests.
- Corti AI integration for transcription and structured medical note generation.
- Editable AI-generated notes.
- Reusable clinical documentation templates.
- Chrome extension with browser-based local storage.
- Planned cloud synchronisation.

**UI requirements:**

- Show the provided screenshot prominently.
- Use a subtle animated medical pulse motif as a project-specific visual element.
- Include an interactive architecture diagram that reveals the frontend, backend, and AI service relationships.
- Present the reported typing-time improvement as a concise metric.
- Clearly distinguish implemented features from planned functionality.

Do not invent HIPAA/PHIPA compliance certification, medical accuracy statistics, or production deployment.

### Project 3 — GOOSE

**Name:** GOOSE  
**Category:** Desktop Software / Productivity / AI  
**Status:** In Development

**Images:**

https://github.com/user-attachments/assets/1bdc9c41-bfc3-494f-9095-a23b29677e66

https://github.com/user-attachments/assets/a23e3ed2-5485-455e-80f5-3f27dd26ce80

**Description:**

GOOSE is an AI-powered macOS productivity companion inspired by the Dynamic Island, designed to help students manage academic deadlines, calendars, productivity sessions, and notifications from one interactive desktop interface.

It combines practical productivity tools with a playful animated virtual goose.

**Tech Stack:**

React, TypeScript, Tauri, Rust, PixiJS, SQLite, macOS Native APIs.

**Architecture:**

- React frontend for the application interface.
- Rust-powered Tauri backend for desktop functionality.
- SQLite for local persistence.
- PixiJS for virtual goose animations.
- Native macOS APIs for window management and system-level behaviours.
- Modular integration architecture designed for Google Calendar, Waterloo LEARN, Discord, and Spotify.

**Planned or developing features:**

- Dynamic Island-inspired expanding macOS notch.
- Animated virtual goose.
- Pomodoro timer and study mode.
- Academic deadline aggregation.
- AI-powered task summaries.
- Google Calendar integration.
- Waterloo LEARN integration.
- Discord and Spotify integrations.
- Desktop notifications and contextual widgets.

**UI requirements:**

- Feature the supplied images in a horizontal gallery.
- Create an animated mini-preview of the notch using lightweight CSS or existing project assets.
- Demonstrate the difference between the collapsed and expanded notch states.
- Show relevant architectural components.
- Make the project feel playful without detracting from the technical engineering work.

Do not claim integrations are complete unless the repository confirms they are implemented.

---

## 3. Hardware Directory

### Project 4 — ECE 198 Rehabilitation Device

**Name:** ECE 198 Rehabilitation Device  
**Category:** Biomedical Engineering / Hardware / Embedded Systems  
**Status:** In Progress

**Content source:**

Locate my latest resume in the repository or other available project files.

Extract the relevant details about my ECE 198 rehabilitation device, including:

- The rehabilitation problem being addressed.
- My personal engineering contributions.
- Hardware components and sensors.
- Microcontrollers and embedded software, where applicable.
- Circuit design and prototyping.
- Mechanical or electrical integration.
- Testing, validation, and development progress.

  # projects.md — Additional Projects

Add the following three projects to my existing portfolio's **Hardware** directory.

Do not remove, replace, or rewrite any existing projects. Preserve the current website's Frutiger Aero, Wii U, and macOS-inspired aesthetics.

## 1. Biotron — Assistive Robotic Exoskeleton

**Category:** Robotics / Embedded Systems / Electrical Engineering  
**Status:** In Progress  
**Date:** September 2026 – Present

**Tech Stack:** STM32H753, Embedded C, FreeRTOS, STM32CubeIDE, Altium Designer, PCB Design.

### Description

Contributing to the University of Waterloo BioMechatronics Design Team's assistive robotic exoskeleton through embedded firmware development, circuit design, and hardware–software integration.

### Engineering Contributions

- Developed and debugged STM32H753 firmware using Embedded C.
- Worked with FreeRTOS configurations and STM32CubeIDE.
- Designed battery-pack and motor-control circuit concepts using Altium Designer.
- Supported PCB assembly, soldering, and electrical wiring.
- Collaborated across electrical, software, and mechanical subteams.
- Troubleshot hardware–software integration issues.

### Portfolio Features

Include a firmware architecture diagram, electrical subsystem overview, and PCB gallery when actual project assets are available.

Keep this project separate from ECE 198.

---

## 2. ESP32 Washing Machine Notifier

**Category:** IoT / Embedded Systems / Home Automation  
**Status:** Completed  
**Date:** August 2026

**Tech Stack:** ESP32, C++, Arduino IDE, Accelerometer, ntfy API.

### Description

Designed and developed an ESP32-based motion-monitoring system that detects when a washing machine completes its cycle and automatically sends a notification to a smartphone.

### Engineering Contributions

- Designed an accelerometer-based monitoring circuit.
- Developed C++ firmware to process motion measurements.
- Implemented washing-cycle completion detection.
- Integrated the ntfy API for smartphone notifications.

### Architecture

Accelerometer → ESP32 → Motion Processing → Cycle Completion Detection → ntfy → Smartphone

### Portfolio Features

Include an interactive architecture diagram illustrating sensor data processing and smartphone notification delivery.

---

## 3. Vernier Calipers Holder

**Category:** Mechanical Engineering / CAD / Additive Manufacturing  
**Status:** CAD Design Completed  
**Date:** December 2025

**Tech Stack:** SolidWorks, CAD/CAM, DXF, STL, G-code, PLA.

### Description

Designed a custom vernier calipers holder using CAD modelling and additive-manufacturing workflows, converting 2D geometry into a 3D model prepared for PLA printing.

### Engineering Contributions

- Prepared a CAM template.
- Imported DXF geometry into SolidWorks.
- Developed the 3D CAD model.
- Exported STL files for manufacturing preparation.
- Generated G-code for PLA 3D printing.

### Portfolio Features

Include a CAD model preview when available and an interactive manufacturing workflow:

DXF → SolidWorks → STL → G-code → 3D Print Preparation

Do not claim that physical printing was completed unless verified.

---

## Implementation Instructions

1. Add these three projects to the existing Hardware directory.
2. Preserve all original five projects.
3. Reuse existing project cards, windows, animations, and styling.
4. Update the Hardware directory project count from 2 to 5.
5. Update the total project count from 5 to 8.
6. Add technology tags and development statuses.
7. Do not invent images, metrics, repositories, or technical achievements.
8. Make all three projects fully responsive.
9. Verify that the existing website continues to function.

**Final instruction:** Only add these three projects. Do not redesign the existing Projects page.


**Critical requirements:**

Do not confuse this project with unrelated projects or assume that my Biotron exoskeleton team work is the same project.

Use only details verified by my resume or project documentation.

If technical details cannot be found, insert clearly labelled TODO placeholders in the project data instead of inventing them.

**UI requirements:**

- Display a schematic-inspired project icon.
- Provide sections for hardware architecture, design process, personal contributions, and development progress.
- Support images of circuits, CAD models, PCBs, and prototypes when those assets are available.
- Include a subtle visual circuit-trace animation.
- Mark the project as actively under development.

### Project 5 — iPhone 4 Restoration

**Name:** iPhone 4 Restoration  
**Category:** Hardware Restoration / Reverse Engineering / Legacy Systems  
**Status:** Completed

**Project images:**

1. https://github.com/user-attachments/assets/48096204-503b-4560-a07e-66aced9e1a2d
2. https://github.com/user-attachments/assets/217d435e-0529-4d48-b4ae-a4149221552e
3. https://github.com/user-attachments/assets/68d340f4-4d8b-44f5-984a-6a9403d2981a
4. https://github.com/user-attachments/assets/d8bd5871-7d42-4861-887a-504ae4c58cf5
5. https://github.com/user-attachments/assets/5565fea4-7364-4733-a1aa-d2df88cf4799
6. https://github.com/user-attachments/assets/a5f61bca-88e1-4b00-b8dd-4f23d45ca3c0

**Personal story:**

This iPhone 4 was my father's first iPhone and my first hands-on experience with a smartphone.

Its industrial design and engineering sparked my early interest in technology.

Years later, I decided to restore the device, combining a personal connection with practical hardware troubleshooting and an exploration of legacy Apple software.

The restored device now serves as a compact digital camera and a distraction-free alternative to modern smartphones.

**Technical work:**

**Developer Environment**
- Used macOS Terminal, Git, and Homebrew to set up and manage restoration utilities.

**Legacy Software**
- Explored device jailbreaking, Cydia, legacy software compatibility, and custom themes.
- Used command-line tools during device recovery and restoration.
- Worked with the original iOS 4 firmware environment.

**Network Troubleshooting**
- Investigated Wi-Fi/Bluetooth antenna placement.
- Tested wireless connectivity over a 2.4 GHz network.
- Inspected hardware connections to troubleshoot network performance.

**Hardware Teardown**
- Disassembled the device.
- Inspected the logic board, screen, battery, and internal hardware.
- Studied the component layout and physical integration.

**Repair**
- Replaced the screen.
- Reassembled the iPhone.
- Restored the device to a functional condition.

**What I Learned:**

- Hardware troubleshooting
- Consumer electronics repair
- System restoration
- Legacy operating systems
- Component integration
- Terminal-based debugging
- Iterative testing

**UI requirements:**

This project should feel like an interactive restoration diary.

Create a chronological image gallery that documents the restoration process, using the supplied photos.

Include an optional before/after comparison when suitable photos are identified.

Use a nostalgic iOS 4-inspired visual language inside the project detail view: glass-like panels, classic Apple iconography, and subtle skeuomorphic controls.

Preserve the accuracy of the technical and personal story. Do not invent teardown stages or claim photos depict a particular repair step unless that can be verified.

---

## 4. Project Card Design

Every project should have a unified card structure.

**Default card content:**

- Project name
- Project thumbnail or custom icon
- Short description, maximum two lines
- Category
- Development status
- Three to five primary technology tags

**Hover interactions:**

- Slight upward movement
- Subtle reflection or highlight shift
- Soft shadow expansion
- Thumbnail parallax
- Smooth transition into the project detail window

Use different accent colours for each project while maintaining a consistent site-wide design language.

Suggested accents:

- NeuroSight: teal / cyan
- ClinTempo: medical blue / mint
- GOOSE: soft gold / sky blue
- ECE 198: warm amber / muted purple
- iPhone 4: brushed silver / classic iOS blue

These are accent suggestions, not large flat background fills.

---

## 5. Project Detail Windows

Selecting a project opens a dedicated window inspired by classic macOS application windows.

### Window layout

**Header:**
- Project icon
- Project title
- Status
- Close button
- External links when available

**Content:**
1. Hero image or preview
2. Overview
3. Problem and motivation
4. My contributions
5. Technical implementation
6. Architecture
7. Challenges and lessons learned
8. Image gallery
9. Project links

Only render sections supported by available project data.

### Visual architecture

For software projects, display a simplified architecture diagram showing the relationships between major components.

For hardware projects, show component relationships or subsystem blocks when enough data exists.

Architecture diagrams should be generated from structured project data, not invented as decorative visuals.

---

## 6. Interactive Design Features

### Interactive directory navigation

Use animated folder transitions inspired by Finder and the Wii U.

The user should always know which directory they are currently browsing.

Include breadcrumb navigation:

Projects / Software / GOOSE

### Project filters

Provide lightweight filtering for:

- All
- Software
- Hardware
- Completed
- In Progress

Filters must work on mobile and desktop.

### Image galleries

- Support previous/next controls.
- Support fullscreen viewing.
- Use lazy loading.
- Preserve image aspect ratios.
- Support image captions where verified.
- Avoid cropping important hardware components.

### Timeline component

Use a timeline for projects with meaningful development or restoration stages.

The iPhone 4 restoration should be the primary example.

### Microinteractions

Include subtle:

- Window opening animations
- Folder hover effects
- Icon bounce on selection
- Translucent background blur
- Pointer-responsive highlights

Respect `prefers-reduced-motion`.

Do not use excessive animation or particle effects that make navigation slow.

---

## 7. Implementation Architecture

Use the existing React and TypeScript project setup.

Do not create another frontend framework or replace the current routing system.

Suggested component organization:

```text
src/
  components/
    projects/
      ProjectDirectory.tsx
      ProjectFolder.tsx
      ProjectCard.tsx
      ProjectWindow.tsx
      ProjectGallery.tsx
      ProjectArchitecture.tsx
      ProjectTimeline.tsx
      ProjectFilters.tsx
  data/
    projects.ts
  types/
    project.ts
```

Adapt this structure to match the actual repository.

### Data model

Create a strongly typed data-driven project system, with fields such as:

```ts
type Project = {
  id: string;
  name: string;
  category: "software" | "hardware";
  status: "completed" | "in-progress";
  description: string;
  technologies: string[];
  images: string[];
  links?: {
    label: string;
    url: string;
  }[];
  overview?: string;
  motivation?: string;
  contributions?: string[];
  architecture?: string;
  challenges?: string[];
  lessons?: string[];
};
```

Extend this type only where required.

Each project must be rendered from structured data rather than duplicating the UI for every entry.

---

## 8. Mobile Responsiveness

The Projects page must work across desktop, tablet, and mobile.

**Desktop:**
- Multi-column directory layout
- Resizable-looking project windows consistent with existing macOS UI
- Rich hover interactions
- Multi-image galleries

**Mobile:**
- Single-column or compact two-column card layout
- Fullscreen project detail panels
- Touch-friendly controls
- Smooth vertical scrolling
- No horizontal overflow
- No hover-dependent functionality

Maintain consistent typography, visual hierarchy, and accessibility.

---

## 9. Performance and Quality

- Optimise image loading.
- Use lazy loading for non-visible project images.
- Avoid downloading large images until necessary.
- Reuse existing animations and component libraries.
- Keep components modular.
- Support keyboard navigation.
- Use semantic markup.
- Provide meaningful image alt text.
- Avoid layout shifts.
- Use accessible contrast.
- Ensure all external project links work.
- Provide fallback UI for images that fail to load.

Do not introduce unnecessary dependencies.

---

## 10. Design Constraints

**DO NOT:**

- Remove existing website features.
- Replace my existing menu system.
- Alter unrelated pages.
- Introduce generic SaaS dashboard design.
- Use emojis as project thumbnails.
- Add excessive glassmorphism.
- Invent project achievements or engineering metrics.
- Misrepresent planned features as completed.
- Invent technology stacks.
- Replace supplied project images with AI-generated imagery.
- Add fake GitHub or demo links.

**DO:**

- Preserve the existing website identity.
- Use the supplied project images.
- Build an interactive software/hardware directory.
- Make the technical accomplishments easy to understand.
- Maintain an authentic engineering portfolio feel.
- Include my personal motivation for hardware projects.
- Make the website engaging to recruiters and engineering students.
- Keep project data easy to maintain and expand.

---

## 11. Acceptance Criteria

The implementation is complete when:

- The Projects page contains Software and Hardware directories.
- All five projects are represented.
- Each project opens an accessible detail window.
- All supplied links and images are integrated.
- The ECE 198 information is extracted from verified resume content or clearly marked for completion.
- Project statuses accurately distinguish finished and developing work.
- Images are responsive and gallery controls function.
- Filters and navigation work.
- The page matches the existing Frutiger Aero / Wii U / macOS design language.
- The implementation builds successfully without TypeScript errors.
- Existing portfolio functionality remains intact.

## Final Instruction to Codex

First inspect the repository, existing project components, styles, routing, and available resume files.

Reuse existing components wherever practical.

Then implement the Projects directory as a complete, production-ready feature, integrating it into the current website.

The final result should feel like a small interactive operating system containing my engineering projects — nostalgic and playful in presentation, but technically credible and professional in its content.
