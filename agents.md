# AI Agent Guidelines & Project Instructions (agents.md)

## 1. Project Overview
- **Project Name:** SwiftRide AI
- **Framework:** Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **Package Manager:** `pnpm`
- **Core Domain:** High-performance, luxury and accessible car rental web platform.

---

## 2. Core Agent Directives
1. **Preserve Layout & Structure:**
   - Always protect the 100vh viewport hero alignment and the 50% overlapping bottom search filter.
   - Do not break established component hierarchy.
2. **Design First:**
   - Adhere strictly to the color tokens and typography defined in [design.md](file:///Users/shakilahmedbillal/Desktop/experiment/swiftride-ai/design.md).
   - Use vibrant, rich colors (Royal Blue `#3563E9`, Deep Slate `#0B132A`, clean white surfaces, subtle gradients).
   - Avoid bland grayscale or generic un-styled elements.
3. **Component Modularity:**
   - All page sections reside in `src/components/` with single-responsibility modular architecture.
   - Ensure clean TypeScript props and typing without `any`.
4. **Zero Build Warnings / Errors:**
   - Verify TypeScript correctness and bundle optimization without breaking directives.
5. **Never Hardcode API Keys or Secrets:**
   - Always read API keys and credentials strictly from environment variables (e.g., `process.env.OPENROUTER_API_KEY`, `process.env.GEMINI_API_KEY`).
   - Do NOT include plain-text API keys or secrets directly inside `.ts`, `.tsx`, or `.js` source files.

