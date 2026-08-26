# Development Rules & Coding Conventions (rules.md)

## 1. Tech Stack & Standards
- **Next.js Version:** 16 (App Router with `src/app`)
- **React Version:** 19
- **Styling:** Tailwind CSS v4 + Global CSS tokens in `src/app/globals.css`
- **Fonts:** Next.js Google Fonts (`Plus_Jakarta_Sans` & `Rubik`)

---

## 2. Directory Layout Rules
```
swiftride-ai/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Google font configs & SEO
│   │   ├── page.tsx           # Home page assembling section components
│   │   └── globals.css        # Core tokens, Tailwind directives & animations
│   ├── components/            # Modular UI components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── SearchWidget.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── PopularCars.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── PromoBanners.tsx
│   │   ├── Testimonials.tsx
│   │   └── Footer.tsx
│   └── types/                 # Shared TypeScript interfaces
├── public/                    # Static assets & SVG icons
├── design.md                  # Design system specification
├── agents.md                  # AI agent rules
├── rules.md                   # Development rules & standards
└── brain.md                   # Architecture & memory log
```

---

## 3. Implementation Rules
1. **Interactive Elements:**
   - Any component containing interactive hooks (`useState`, `useEffect`, `onClick`) must begin with `"use client";`.
2. **Accessibility & Semantics:**
   - Use semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<button>`, `<h1>`-`<h3>`).
   - Add descriptive `aria-label` for all icon buttons.
3. **Responsiveness:**
   - Mobile-first approach: Ensure smooth scaling across mobile (`<640px`), tablet (`640px-1024px`), desktop (`1024px-1440px`), and ultra-wide screens (`>1440px`).
