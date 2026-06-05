Wesley Abdoul — Portfolio
A personal portfolio website built with React and TypeScript. Dark-themed, animation-heavy single-page application showcasing projects, tech stack, and contact information.

Live content: custom cursor, scroll-reveal animations, parallax hero, 3D hover effects on project cards, and active section tracking in the navigation — all built on native browser APIs with no animation library dependency.

Tech Stack
Layer	Technology
UI Library	React 18
Language	TypeScript 5
Build Tool	Vite 5
Styling	Vanilla CSS (CSS custom properties, no preprocessor)
Fonts	Cormorant Garamond · DM Sans · Space Mono (Google Fonts)
Animations	IntersectionObserver API · requestAnimationFrame · CSS keyframes
Deployment	GitHub Pages compatible (configurable base URL)
Prerequisites
Node.js ≥ 18
npm ≥ 9 (comes with Node.js)
Installation
# 1. Clone the repository
git clone https://github.com/Wesley971/portfoliowesleyabdoul.git
cd portfoliowesleyabdoul

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
The dev server starts at http://localhost:5173 by default.

Available Scripts
Script	Command	Description
Dev server	npm run dev	Starts Vite dev server with HMR
Build	npm run build	Type-checks with tsc, then bundles with Vite
Preview	npm run preview	Serves the production build locally
Project Structure
portfoliowesleyabdoul/
├── public/
│   └── photo.jpg              # Profile photo
├── src/
│   ├── components/
│   │   ├── About.tsx          # Bio, photo, chips, career timeline
│   │   ├── Contact.tsx        # Email copy-to-clipboard, GitHub & LinkedIn links
│   │   ├── Cursor.tsx         # Custom animated cursor (replaces native)
│   │   ├── Footer.tsx         # Copyright footer
│   │   ├── Hero.tsx           # Landing section with parallax scroll
│   │   ├── Nav.tsx            # Fixed navigation with active section tracking
│   │   ├── Projects.tsx       # Project cards grid with 3D hover effect
│   │   └── Stack.tsx          # Tech stack icon grid
│   ├── App.tsx                # Root component — composes all sections, scroll reveal
│   ├── global.d.ts            # TypeScript ambient declarations
│   ├── index.css              # All styles — design tokens, layouts, animations
│   └── main.tsx               # React entry point
├── index.html                 # HTML shell — Google Fonts, meta, root div
├── vite.config.ts             # Vite config with configurable base URL
├── tsconfig.json              # TypeScript config (strict, ES2020, react-jsx)
└── tsconfig.node.json         # TypeScript config for Vite config file
Environment Variables
The project supports one optional environment variable:

Variable	Default	Description
VITE_BASE_URL	/	Base path for asset URLs — set to the repository name when deploying to GitHub Pages (e.g. /portfoliowesleyabdoul/)
Create a .env.local file at the root to override it locally:

VITE_BASE_URL=/portfoliowesleyabdoul/
Features
Custom cursor — gold dot that expands to a ring over interactive elements, animated with requestAnimationFrame
Scroll reveal — sections and cards fade/rise in using IntersectionObserver with staggered delays
Parallax hero — title and availability card move at different speeds on scroll
3D project cards — perspective transform driven by mousemove coordinates
Active nav — current section highlighted in the navigation via IntersectionObserver
Copy email — one-click clipboard copy with visual feedback
Author
Wesley Abdoul — Full-Stack Developer
GitHub: github.com/Wesley971
LinkedIn: linkedin.com/in/wesley-abdoul
Email: Abdoulwes@gmail.com
