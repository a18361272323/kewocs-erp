---
version: "4.0"
name: "Precision Glass"
description: "Light, glass-morphism dashboard with particle background. Minimal, tech-forward, product-grade. Bento Grid layout, subtle indigo accent, frosted glass panels."
---

colors:
  primary: "#4f46e5"
  primary-hover: "#4338ca"
  primary-soft: "rgba(79, 70, 229, 0.08)"
  ink: "#18181b"
  ink-muted: "#52525b"
  ink-subtle: "#a1a1aa"
  canvas: "#fafafa"
  surface: "#ffffff"
  surface-2: "#f5f5f5"
  border: "#e4e4e7"
  border-light: "#f4f4f5"
  success: "#16a34a"
  warning: "#d97706"
  danger: "#dc2626"
  info: "#0ea5e9"

typography:
  display: "Plus Jakarta Sans"
  body: "IBM Plex Sans"
  mono: "JetBrains Mono"

layout:
  style: "Bento Grid + Glass Sidebar"
  sidebar: "240px fixed, glass blur, auto-collapse"
  content: "max-w-[1400px] centered"

effects:
  - backdrop-blur glass panels
  - subtle particle field background (Canvas)
  - micro-interactions on hover
  - staggered fade-in animations
  - noise-texture on glass surfaces

rules:
  - NO dark mode
  - NO theme toggle
  - CSS variables only
  - Tailwind utility classes preferred
  - push-check: npm run build must pass