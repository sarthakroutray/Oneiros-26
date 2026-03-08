<div align="center">

# 🌌 ONEIROS

### Annual Cultural Festival — Manipal University Jaipur

*Where Dreams Meet the Cosmos*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r183-000000?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## ✨ Features

### 🎆 Immersive 3D Galaxy Background
- **Star Field** — 3,000 animated stars distributed in a sphere with slow rotation
- **Spiral Nebula** — 4,000-particle galaxy with 3-arm structure and interactive cursor repulsion
- **Shooting Stars** — Periodic streaks across the canvas

### 🌀 Cosmic Preloader
- Triple orbiting rings (purple, pink, blue) with glowing dots
- Pulsing center glow with animated progress bar
- Smooth fade-out transition into the main site

### 📖 Scroll-Based Storytelling
- **Constellation Chapters** — 4 unique SVG constellations that draw themselves as you scroll
- **Progress Trail** — Glowing purple-to-pink trail on the left edge tracking scroll position
- **Parallax Hero** — Title scales and fades on scroll, revealing chapter interludes (desktop only)

### 🎨 Design System
- **Glassmorphism** — Frosted glass cards with layered backdrop blur
- **Liquid Glass Navbar** — Floating rounded pill with multi-layered glass effect
- **Cosmic Cursor** — Custom glowing cursor with stardust particle trail
- **Cosmic Palette** — Deep space blues, purples, and pinks

### 📱 Mobile Responsive
- **Full-Screen Mobile Menu** — Hamburger → X animated toggle with overlay navigation
- **Optimized Hero** — Static rendering without animations for better mobile performance
- **Compact Spacing** — Reduced padding, margins, and gaps across all sections
- **Body Scroll Lock** — Prevents background scrolling when mobile menu is open

### 🖼️ Sections
| Section | Description |
|---------|-------------|
| **Hero** | Full-viewport title with gradient animation and parallax zoom (desktop) / static (mobile) |
| **About** | Festival details, orbiting cosmic emblem, statistics grid |
| **Events** | 9 event cards with hover glow effects |
| **Timeline** | 3-day schedule with alternating cards and pulsing nodes |
| **Gallery** | Pinterest-style masonry grid with cosmic gradient cards |
| **Footer** | Oneiros logo, SVG social icons, navigation links with hover glow |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Vite + React + TypeScript** | Build system & UI framework |
| **Three.js** (`@react-three/fiber`, `@react-three/drei`) | 3D galaxy background |
| **Framer Motion** | Scroll animations, transitions, and micro-interactions |
| **Vanilla CSS** | Custom design system with CSS custom properties |
| **Google Fonts** | Orbitron + Inter typography |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Ronitdoes/Onerios-MUJ.git

# Navigate to the project
cd Onerios-MUJ

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── assets/
│   ├── ono.jpg                 # Festival photo
│   ├── onoL.png                # Oneiros logo
│   └── onoWhite.png            # White variant logo
├── components/
│   ├── Galaxy/
│   │   ├── CosmosCanvas.tsx    # Three.js canvas wrapper
│   │   ├── StarField.tsx       # Animated star particles
│   │   ├── Nebula.tsx          # Interactive spiral nebula
│   │   └── ShootingStars.tsx   # Periodic shooting stars
│   ├── Navbar.tsx              # Floating glass pill navbar + mobile menu
│   ├── Hero.tsx                # Parallax hero section (responsive)
│   ├── About.tsx               # Festival info + cosmic emblem + stats
│   ├── Events.tsx              # Event cards grid
│   ├── Timeline.tsx            # 3-day schedule
│   ├── Gallery.tsx             # Pinterest masonry gallery
│   ├── Footer.tsx              # Logo, social links + credits
│   ├── Preloader.tsx           # Cosmic loading animation
│   ├── ScrollProgress.tsx      # Scroll progress trail
│   ├── StoryInterlude.tsx      # Constellation storytelling
│   └── CosmicCursor.tsx        # Custom cursor effect
├── App.tsx                     # Main app composition
├── main.tsx                    # Entry point
└── index.css                   # Cosmic design system
```

---

## 🎯 Key Interactions

- **Move your cursor** over the nebula to see particles repel away like a magnetic field
- **Scroll slowly** through the page to watch constellations draw themselves between sections
- **Hover** over event cards and social icons for glow and lift effects
- **Watch** the scroll progress trail light up as you navigate
- **On mobile** — tap the hamburger menu for a full-screen animated navigation overlay

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with 💜 for Oneiros — MUJ Cultural Fest**

</div>
