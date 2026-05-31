---
version: "5.0"
name: "Precision Glass"
description: "Light glass-morphism dashboard. Equal-card Bento Grid, WCAG AA compliant, responsive clamp() typography and spacing."
---

colors:
  primary: "#4f46e5"
  primary-hover: "#4338ca"
  primary-soft: "rgba(79, 70, 229, 0.08)"
  ink: "#18181b"
  ink-muted: "#52525b"
  ink-subtle: "#71717a"
  canvas: "#fafafa"
  surface: "#ffffff"
  surface-2: "#f5f5f5"
  border: "#d4d4d8"
  border-light: "#e8e8ec"
  success: "#15803d"
  warning: "#b45309"
  danger: "#b91c1c"
  info: "#0369a1"

typography:
  display: "Plus Jakarta Sans"
  body: "IBM Plex Sans"
  mono: "JetBrains Mono"
  scale:
    stat-value: "clamp(24px, 2.2vw, 36px)"
    stat-label: "clamp(11px, 0.9vw, 13px)"
    hero: "clamp(22px, 2vw, 30px)"
    page-title: "clamp(20px, 1.7vw, 28px)"
    card-title: "clamp(13px, 1vw, 16px)"
    section: "clamp(16px, 1.3vw, 24px)"

layout:
  style: "Equal-card Bento Grid + Glass Sidebar"
  sidebar: "clamp(200px, 15vw, 260px), sticky top, auto-collapse"
  content: "flex: 1, no max-width, fills remaining space"
  gap:
    layout: "clamp(16px, 1.6vw, 28px)"
    grid: "clamp(14px, 1.2vw, 22px)"
    compact: "clamp(10px, 0.8vw, 14px)"
  spacing:
    card-pad: "clamp(16px, 1.4vw, 24px)"
    section-gap: "clamp(20px, 1.8vw, 28px)"
    block-gap: "clamp(14px, 1.2vw, 22px)"

accessibility:
  - "Semantic colors all WCAG AA 4.5:1+ on white"
  - "ink-subtle: 4.8:1 (was 2.6:1)"
  - "border: 1.4:1 on canvas"

effects:
  - backdrop-blur glass panels
  - particle field background (Canvas)
  - micro-interactions on hover
  - staggered fade-in animations

rules:
  - NO dark mode
  - CSS variables only
  - ALL font/spacing use clamp()
  - ALL text colors pass WCAG AA
  - npm run build must pass
