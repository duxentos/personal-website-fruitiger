import type {Project} from './apps/projects/projectModel.ts';
export type {Project} from './apps/projects/projectModel.ts';
/** Facts and media from projects.md, the supplied résumé and linked author documentation. */
export const projects:Project[]=[
  {
    "id": "neurosight",
    "name": "NeuroSight",
    "directory": "software",
    "category": "Biomedical software / machine learning",
    "state": "completed",
    "status": "Hackathon project",
    "icon": "brain",
    "accent": "#39aeb7",
    "note": "Motor, speech and medical records in one place.",
    "description": "A health-intelligence prototype bringing ALS-related records, speech and movement assessments into one longitudinal view.",
    "motivation": "Make changes between infrequent appointments easier to examine.",
    "technologies": [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Tiger Data",
      "TimescaleDB",
      "Vultr"
    ],
    "features": [
      "At-home drawing and speech assessments",
      "Date-filtered RAG over reviewed medical records",
      "Longitudinal assessment trends"
    ],
    "screenshots": [
      {
        "id": "neuro-4",
        "src": "/assets/projects/neurosight/screen-4.jpg",
        "alt": "NeuroSight overview with a rabbit and pocket-watch illustration",
        "caption": "A clearer view across records and time",
        "width": 1400,
        "height": 879,
        "source": "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/818/519/datas/original.png"
      },
      {
        "id": "neuro-2",
        "src": "/assets/projects/neurosight/screen-2.jpg",
        "alt": "NeuroSight speech and figure-eight drawing assessment interface",
        "caption": "Motor and speech assessments",
        "width": 1400,
        "height": 879,
        "source": "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/818/516/datas/original.png"
      },
      {
        "id": "neuro-3",
        "src": "/assets/projects/neurosight/screen-3.jpg",
        "alt": "NeuroSight date-filtered questions with source references for reviewed records",
        "caption": "Evidence-grounded record questions",
        "width": 1400,
        "height": 879,
        "source": "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/818/517/datas/original.png"
      },
      {
        "id": "neuro-1",
        "src": "/assets/projects/neurosight/screen-1.jpg",
        "alt": "NeuroSight trends showing separate clinical and home-assessment measurements",
        "caption": "Longitudinal trends",
        "width": 1400,
        "height": 879,
        "source": "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/818/515/datas/original.png"
      }
    ],
    "sections": [
      {
        "title": "Machine learning & data analysis",
        "points": [
          "Drawing paths: deviation and completion-time measurements.",
          "Speech: pauses, syllable timing and phonation measurements.",
          "Research: gradient-boosted regression compared with baselines on held-out patient data."
        ]
      }
    ],
    "architecture": {
      "nodes": [
        {
          "id": "ui",
          "title": "Next.js interface",
          "detail": "Records, assessment tasks and trends."
        },
        {
          "id": "api",
          "title": "FastAPI / Python",
          "detail": "Document, speech and drawing processing."
        },
        {
          "id": "data",
          "title": "Tiger Data / TimescaleDB",
          "detail": "Timestamped evidence and assessments."
        },
        {
          "id": "rag",
          "title": "Temporal RAG",
          "detail": "Date-filtered retrieval with source references."
        }
      ],
      "edges": [
        {
          "from": "ui",
          "to": "api",
          "label": "Assessment requests"
        },
        {
          "from": "api",
          "to": "data",
          "label": "Timestamped results"
        },
        {
          "from": "api",
          "to": "rag",
          "label": "Reviewed evidence"
        }
      ]
    },
    "lessons": [
      "Preserve traceability and temporal consistency.",
      "Separate patients when evaluating models."
    ],
    "demo": "https://writeontime.ink/",
    "devpost": "https://devpost.com/software/nuerosight",
    "video": "https://www.youtube.com/watch?v=0Y7AWcXZXao",
    "sources": [
      "projects.md",
      "https://devpost.com/software/nuerosight",
      "https://writeontime.ink/"
    ]
  },
  {
    "id": "clintempo",
    "name": "ClinTempo",
    "directory": "software",
    "category": "Healthcare / AI / Chrome extension",
    "state": "in-progress",
    "status": "Prototype complete · continuing development",
    "icon": "pulse",
    "accent": "#4f9ed4",
    "note": "Less repetitive documentation, more time with patients.",
    "description": "An AI-assisted clinical documentation extension combining live transcription, editable notes and reusable templates.",
    "motivation": "Reduce repetitive administrative work in clinical documentation.",
    "technologies": [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Corti AI API",
      "Chrome Extension APIs"
    ],
    "features": [
      "Live clinical transcription",
      "Editable AI-generated notes",
      "Reusable EMR-ready templates",
      "Browser-based local storage"
    ],
    "planned": [
      "Cloud synchronisation"
    ],
    "metric": {
      "value": "45%",
      "label": "reduction in typing time",
      "qualifier": "Project-reported result"
    },
    "screenshots": [
      {
        "id": "clintempo-overview",
        "src": "/assets/projects/clintempo.png",
        "alt": "ClinTempo project overview describing its documentation workflow",
        "caption": "ClinTempo · project overview",
        "width": 1482,
        "height": 830,
        "source": "https://github.com/user-attachments/assets/ea62af5a-eaba-4b1b-8018-8d5d29b5cc4c"
      }
    ],
    "architecture": {
      "nodes": [
        {
          "id": "react",
          "title": "React interface",
          "detail": "Clinical templates and editable notes."
        },
        {
          "id": "express",
          "title": "Express REST API",
          "detail": "Requests between the interface and AI service."
        },
        {
          "id": "corti",
          "title": "Corti AI",
          "detail": "Transcription and structured note generation."
        },
        {
          "id": "local",
          "title": "Local storage",
          "detail": "Browser-based persistence in the extension."
        }
      ],
      "edges": [
        {
          "from": "react",
          "to": "express",
          "label": "Clinical requests"
        },
        {
          "from": "express",
          "to": "corti",
          "label": "Transcription / notes"
        },
        {
          "from": "react",
          "to": "local",
          "label": "Local persistence"
        }
      ]
    },
    "sources": [
      "projects.md"
    ]
  },
  {
    "id": "goose-dynamic-notch",
    "name": "GOOSE",
    "directory": "software",
    "category": "Desktop software / productivity / AI",
    "state": "in-progress",
    "status": "In development",
    "icon": "goose",
    "accent": "#d3ac48",
    "note": "A practical desktop companion with a playful goose.",
    "description": "A Dynamic Island-inspired macOS productivity companion for student deadlines, calendars, study sessions and notifications.",
    "motivation": "Bring everyday student tasks into one approachable desktop interface.",
    "technologies": [
      "React",
      "TypeScript",
      "Tauri",
      "Rust",
      "PixiJS",
      "SQLite",
      "macOS Native APIs"
    ],
    "features": [
      "An expanding notch interaction concept",
      "Animated virtual goose",
      "A modular desktop architecture"
    ],
    "planned": [
      "Pomodoro timer and study mode",
      "Academic deadline aggregation and AI task summaries",
      "Google Calendar and Waterloo LEARN integrations",
      "Discord and Spotify integrations",
      "Desktop notifications and contextual widgets"
    ],
    "screenshots": [
      {
        "id": "goose-icon",
        "src": "/assets/projects/goose-logo.png",
        "alt": "Black goose app icon on a soft yellow background",
        "caption": "GOOSE · app icon",
        "width": 1024,
        "height": 1024,
        "source": "https://github.com/user-attachments/assets/1bdc9c41-bfc3-494f-9095-a23b29677e66"
      },
      {
        "id": "goose-wordmark",
        "src": "/assets/projects/goose-preview.png",
        "alt": "GOOSE wordmark in white dot-matrix lettering",
        "caption": "GOOSE · wordmark",
        "width": 1000,
        "height": 320,
        "source": "https://github.com/user-attachments/assets/a23e3ed2-5485-455e-80f5-3f27dd26ce80"
      }
    ],
    "architecture": {
      "nodes": [
        {
          "id": "react",
          "title": "React interface",
          "detail": "Desktop controls and student workflows."
        },
        {
          "id": "rust",
          "title": "Tauri / Rust",
          "detail": "Event-driven desktop backend."
        },
        {
          "id": "sqlite",
          "title": "SQLite",
          "detail": "Local application persistence."
        },
        {
          "id": "pixi",
          "title": "PixiJS",
          "detail": "Virtual goose animation layer."
        },
        {
          "id": "native",
          "title": "macOS APIs",
          "detail": "Window management and system behaviour."
        },
        {
          "id": "integrations",
          "title": "Service integrations",
          "detail": "Google Calendar, LEARN, Discord and Spotify are planned/developing.",
          "planned": true
        }
      ],
      "edges": [
        {
          "from": "react",
          "to": "rust",
          "label": "Desktop events"
        },
        {
          "from": "rust",
          "to": "sqlite",
          "label": "Local data"
        },
        {
          "from": "react",
          "to": "pixi",
          "label": "Animation"
        },
        {
          "from": "rust",
          "to": "native",
          "label": "Native behaviour"
        },
        {
          "from": "rust",
          "to": "integrations",
          "label": "Planned adapters"
        }
      ]
    },
    "sources": [
      "projects.md"
    ]
  },
  {
    "id": "rehabilitation-device",
    "name": "ECE 198 Rehabilitation Device",
    "directory": "hardware",
    "category": "Biomedical engineering / embedded systems",
    "state": "in-progress",
    "status": "In progress",
    "icon": "circuit",
    "accent": "#c09548",
    "note": "Measuring physiology and exercise-related movement.",
    "description": "An ESP32-based rehabilitation prototype integrating a pulse oximeter and accelerometer for physiological and movement measurements.",
    "motivation": "Explore movement-based rehabilitation through the ECE 198 design project.",
    "technologies": [
      "ESP32",
      "Python",
      "Pulse oximeter",
      "Accelerometer",
      "Time-series analysis"
    ],
    "features": [
      "Physiological and movement sensing",
      "Gradient-based regression and deviation analysis",
      "Heart-rate comparisons against Apple Watch and Samsung Galaxy Watch readings"
    ],
    "contributions": [
      "Developing the ESP32-based rehabilitation prototype.",
      "Integrating pulse-oximeter and accelerometer measurements.",
      "Applying time-series and statistical analysis to compare heart-rate readings."
    ],
    "screenshots": [],
    "sections": [
      {
        "title": "Design process & progress",
        "body": "The device is actively under development. Sensor integration and comparison measurements form the current documented engineering work."
      }
    ],
    "architecture": {
      "nodes": [
        {
          "id": "pulse",
          "title": "Pulse oximeter",
          "detail": "Physiological measurements."
        },
        {
          "id": "motion",
          "title": "Accelerometer",
          "detail": "Exercise-related motion measurements."
        },
        {
          "id": "esp",
          "title": "ESP32 prototype",
          "detail": "Embedded sensor integration."
        },
        {
          "id": "analysis",
          "title": "Python analysis",
          "detail": "Time-series, regression and deviation comparisons."
        }
      ],
      "edges": [
        {
          "from": "pulse",
          "to": "esp",
          "label": "Measurements"
        },
        {
          "from": "motion",
          "to": "esp",
          "label": "Movement"
        },
        {
          "from": "esp",
          "to": "analysis",
          "label": "Comparison data"
        }
      ]
    },
    "sources": [
      "public/azaan-khan-resume.pdf",
      "projects.md"
    ],
    "todo": [
      "Add verified sensor models, circuit schematics and prototype/CAD photographs when supplied.",
      "Mechanical integration and detailed validation results have not been supplied."
    ]
  },
  {
    "id": "iphone-4-restoration",
    "name": "iPhone 4 Restoration",
    "directory": "hardware",
    "category": "Hardware restoration / legacy systems",
    "state": "completed",
    "status": "Completed",
    "icon": "phone",
    "accent": "#7ba6c6",
    "note": "My father’s first iPhone, brought back to life.",
    "description": "Restoring a personally meaningful iPhone 4 through screen replacement, hardware inspection, recovery utilities and exploration of legacy Apple software.",
    "motivation": "This was my father’s first iPhone and my first hands-on experience with a smartphone. Its industrial design sparked my early interest in technology. Today the restored phone is a compact camera and a distraction-free alternative.",
    "technologies": [
      "macOS Terminal",
      "Git",
      "Homebrew",
      "Legacy iOS",
      "Cydia"
    ],
    "features": [
      "Screen replacement and reassembly",
      "Logic-board, battery and connector inspection",
      "Wi-Fi/Bluetooth antenna and 2.4 GHz connectivity troubleshooting",
      "Command-line recovery utilities and legacy software exploration"
    ],
    "contributions": [
      "Set up restoration utilities using Terminal, Git and Homebrew.",
      "Disassembled the device and inspected its internal layout and connections.",
      "Replaced the screen, reassembled the phone and restored functionality.",
      "Explored jailbreaking, Cydia, themes and the original iOS 4 environment."
    ],
    "lessons": [
      "Iterative troubleshooting and testing",
      "Consumer electronics repair and component integration",
      "Legacy operating systems and command-line debugging"
    ],
    "screenshots": [
      {
        "id": "iphone-4",
        "src": "/assets/projects/iphone/photo-4.jpg",
        "alt": "An iPhone with a cracked display showing the Apple boot logo",
        "caption": "A damaged display",
        "width": 1084,
        "height": 1400,
        "source": "https://github.com/user-attachments/assets/d8bd5871-7d42-4861-887a-504ae4c58cf5"
      },
      {
        "id": "iphone-3",
        "src": "/assets/projects/iphone/photo-3.jpg",
        "alt": "An opened iPhone beside its rear panel, with battery and internals visible",
        "caption": "Inside the phone",
        "width": 1075,
        "height": 1400,
        "source": "https://github.com/user-attachments/assets/68d340f4-4d8b-44f5-984a-6a9403d2981a"
      },
      {
        "id": "iphone-5",
        "src": "/assets/projects/iphone/photo-5.jpg",
        "alt": "The glass rear panel and camera of an iPhone held above a desk",
        "caption": "Glass, steel and a familiar camera",
        "width": 1090,
        "height": 1400,
        "source": "https://github.com/user-attachments/assets/5565fea4-7364-4733-a1aa-d2df88cf4799"
      },
      {
        "id": "iphone-1",
        "src": "/assets/projects/iphone/photo-1.jpg",
        "alt": "An iPhone at the country and region setup screen",
        "caption": "At the setup screen",
        "width": 1083,
        "height": 1400,
        "source": "https://github.com/user-attachments/assets/48096204-503b-4560-a07e-66aced9e1a2d"
      },
      {
        "id": "iphone-2",
        "src": "/assets/projects/iphone/photo-2.jpg",
        "alt": "An intact iPhone showing the classic water-droplet lock screen",
        "caption": "The classic lock screen",
        "width": 801,
        "height": 1400,
        "source": "https://github.com/user-attachments/assets/217d435e-0529-4d48-b4ae-a4149221552e"
      },
      {
        "id": "iphone-6",
        "src": "/assets/projects/iphone/photo-6.jpg",
        "alt": "The supplied second copy of the opened iPhone and rear-panel photograph",
        "caption": "Internal view · second supplied copy",
        "width": 1075,
        "height": 1400,
        "source": "https://github.com/user-attachments/assets/a5f61bca-88e1-4b00-b8dd-4f23d45ca3c0"
      }
    ],
    "timeline": [
      {
        "title": "A familiar starting point",
        "body": "A family phone whose industrial design first drew me towards technology."
      },
      {
        "title": "Inspecting the hardware",
        "body": "Disassembly and inspection of the logic board, battery, display and physical connections.",
        "imageId": "iphone-3"
      },
      {
        "title": "Repair & recovery",
        "body": "Screen replacement, reassembly and command-line recovery work."
      },
      {
        "title": "Working with legacy software",
        "body": "Exploring the original iOS 4 environment, Cydia, software compatibility and custom themes."
      },
      {
        "title": "A second life",
        "body": "A functioning device, now used as a small camera and a distraction-free alternative.",
        "imageId": "iphone-2"
      }
    ],
    "sources": [
      "projects.md"
    ]
  },
  {
    "id": "biotron-exoskeleton",
    "name": "Biotron Exoskeleton",
    "directory": "hardware",
    "category": "Assistive robotics / electrical engineering",
    "state": "in-progress",
    "status": "In progress",
    "icon": "robot",
    "accent": "#86ae76",
    "note": "Software and electrical work with Waterloo Biomechatronics.",
    "description": "Contributing to an assistive robotic exoskeleton as a software and electrical member of Waterloo’s Biomechatronics design team. This is separate from the ECE 198 rehabilitation prototype.",
    "technologies": [
      "STM32H753",
      "Embedded C",
      "STM32CubeIDE",
      "FreeRTOS",
      "Altium Designer",
      "PCB design"
    ],
    "features": [
      "Embedded firmware development and debugging",
      "Battery-pack and motor-control circuit concepts",
      "PCB soldering, wiring and hardware/software integration"
    ],
    "contributions": [
      "Develop and debug STM32H753 firmware using Embedded C.",
      "Work with FreeRTOS configurations and STM32CubeIDE.",
      "Design battery-pack and motor-control circuit concepts in Altium Designer.",
      "Support PCB assembly, soldering and electrical wiring.",
      "Collaborate across electrical, software and mechanical subteams on integration and troubleshooting."
    ],
    "screenshots": [],
    "sources": [
      "projects.md",
      "public/azaan-khan-resume.pdf"
    ],
    "date": "September 2026 – present",
    "architecture": {
      "nodes": [
        {
          "id": "firmware",
          "title": "Embedded firmware",
          "detail": "STM32H753 firmware in Embedded C, with FreeRTOS configurations and STM32CubeIDE debugging."
        },
        {
          "id": "circuits",
          "title": "Electrical design",
          "detail": "Battery-pack and motor-control circuit concepts in Altium Designer."
        },
        {
          "id": "assembly",
          "title": "PCB assembly",
          "detail": "PCB assembly, soldering and electrical wiring."
        },
        {
          "id": "integration",
          "title": "System integration",
          "detail": "Cross-team hardware/software troubleshooting with electrical, software and mechanical subteams."
        }
      ],
      "edges": [
        {
          "from": "firmware",
          "to": "integration",
          "label": "Embedded integration"
        },
        {
          "from": "circuits",
          "to": "assembly",
          "label": "Electrical implementation"
        },
        {
          "from": "assembly",
          "to": "integration",
          "label": "Wiring and troubleshooting"
        }
      ]
    },
    "todo": [
      "Add actual PCB and firmware assets when supplied."
    ]
  },
  {
    "id": "washing-machine-notifier",
    "name": "ESP32 Washing Machine Notifier",
    "directory": "hardware",
    "category": "IoT / embedded systems / home automation",
    "state": "completed",
    "status": "Completed",
    "date": "August 2026",
    "icon": "laundry",
    "accent": "#529db7",
    "note": "Motion sensing that turns the end of a wash cycle into a phone notification.",
    "description": "An ESP32-based motion-monitoring system that detects when a washing machine finishes its cycle and sends a notification to a smartphone.",
    "motivation": "Make the end of a washing cycle easier to notice without repeatedly checking the machine.",
    "technologies": [
      "ESP32",
      "C++",
      "Arduino IDE",
      "Accelerometer",
      "ntfy API"
    ],
    "features": [
      "Accelerometer-based monitoring circuit",
      "C++ firmware processes motion measurements and detects cycle completion",
      "ntfy integration delivers a smartphone notification"
    ],
    "contributions": [
      "Designed the accelerometer-based monitoring circuit.",
      "Developed C++ firmware for motion processing and wash-cycle completion detection.",
      "Integrated the ntfy API for smartphone notifications."
    ],
    "screenshots": [],
    "architecture": {
      "nodes": [
        {
          "id": "sensor",
          "title": "Accelerometer",
          "detail": "Measures washing-machine motion."
        },
        {
          "id": "esp32",
          "title": "ESP32",
          "detail": "Runs the C++ firmware developed in Arduino IDE."
        },
        {
          "id": "motion",
          "title": "Motion processing",
          "detail": "Processes accelerometer measurements."
        },
        {
          "id": "completion",
          "title": "Cycle completion",
          "detail": "Detects the end of the washing cycle from processed motion."
        },
        {
          "id": "ntfy",
          "title": "ntfy API",
          "detail": "Sends the completion notification."
        },
        {
          "id": "phone",
          "title": "Smartphone",
          "detail": "Receives the washing-cycle notification."
        }
      ],
      "edges": [
        {
          "from": "sensor",
          "to": "esp32",
          "label": "Motion measurements"
        },
        {
          "from": "esp32",
          "to": "motion",
          "label": "C++ firmware"
        },
        {
          "from": "motion",
          "to": "completion",
          "label": "Processed motion"
        },
        {
          "from": "completion",
          "to": "ntfy",
          "label": "Cycle finished"
        },
        {
          "from": "ntfy",
          "to": "phone",
          "label": "Notification"
        }
      ]
    },
    "sources": [
      "projects.md"
    ],
    "todo": [
      "Add actual device or circuit photographs when supplied."
    ]
  },
  {
    "id": "vernier-calipers-holder",
    "name": "Vernier Calipers Holder",
    "directory": "hardware",
    "category": "Mechanical engineering / CAD / additive manufacturing",
    "state": "completed",
    "status": "CAD design completed",
    "date": "December 2025",
    "icon": "calipers",
    "accent": "#b68a50",
    "note": "A custom holder, from 2D geometry to a model prepared for PLA printing.",
    "description": "Designed a custom vernier calipers holder through a CAD and additive-manufacturing workflow, converting 2D geometry into a 3D model prepared for PLA printing.",
    "technologies": [
      "SolidWorks",
      "CAD/CAM",
      "DXF",
      "STL",
      "G-code",
      "PLA"
    ],
    "features": [
      "CAM template preparation and DXF geometry import",
      "3D CAD modelling in SolidWorks",
      "STL export and G-code generation for PLA print preparation"
    ],
    "contributions": [
      "Prepared a CAM template and imported DXF geometry into SolidWorks.",
      "Developed the 3D CAD model and exported STL files.",
      "Generated G-code for PLA 3D-print preparation."
    ],
    "sections": [
      {
        "title": "development status",
        "body": "The CAD design and print preparation are complete. Physical printing has not been verified."
      }
    ],
    "screenshots": [],
    "architecture": {
      "nodes": [
        {
          "id": "dxf",
          "title": "DXF geometry",
          "detail": "2D geometry forms the starting point."
        },
        {
          "id": "solidworks",
          "title": "SolidWorks",
          "detail": "The imported DXF is developed into the custom 3D holder model."
        },
        {
          "id": "stl",
          "title": "STL export",
          "detail": "The CAD model is exported for manufacturing preparation."
        },
        {
          "id": "gcode",
          "title": "G-code",
          "detail": "Toolpath instructions are prepared for PLA printing."
        },
        {
          "id": "preparation",
          "title": "Print preparation",
          "detail": "The workflow reaches PLA 3D-print preparation. A completed physical print is not claimed."
        }
      ],
      "edges": [
        {
          "from": "dxf",
          "to": "solidworks",
          "label": "Import and model"
        },
        {
          "from": "solidworks",
          "to": "stl",
          "label": "Export"
        },
        {
          "from": "stl",
          "to": "gcode",
          "label": "Manufacturing preparation"
        },
        {
          "from": "gcode",
          "to": "preparation",
          "label": "PLA workflow"
        }
      ]
    },
    "sources": [
      "projects.md"
    ],
    "todo": [
      "Add the actual CAD preview or model when supplied."
    ]
  }
];
