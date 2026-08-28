# SwiftRide AI — Luxury & Smart Car Rental Platform 🚗✨

[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-3.6_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://swiftride-ai.vercel.app/)

> **SwiftRide AI** is an intelligent, high-performance luxury and accessible car rental web platform. It pairs a sleek automotive booking experience with an autonomous **AI Concierge Assistant**, real-time database reactivity via **Supabase PostgreSQL & WebSockets**, and strict **Next.js 16 Proxy Route Security**.

---

## 🌐 Live Application & Links

- **🚀 Live Deployment:** [https://swiftride-ai.vercel.app/](https://swiftride-ai.vercel.app/)
- **📦 GitHub Repository:** [https://github.com/shakil-ahmed-billal/swiftride-ai](https://github.com/shakil-ahmed-billal/swiftride-ai)
- **📄 Product Requirements Document:** [PRD.md](file:///Users/shakilahmedbillal/Desktop/experiment/swiftride-ai/PRD.md)

---

## 🔑 Demo Access Credentials

| Role | Email | Password | Access Portal |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@swiftride.com` | `admin123` | `/admin/dashboard` |
| **Verified Driver** | `user@swiftride.com` | `user123` | `/user/dashboard` |

---

## 🌟 Key Features

### 1. 🤖 Autonomous AI Concierge Assistant
- **3-Tier AI Reliability Engine:** Google Gemini AI (Tier 1) $\rightarrow$ OpenRouter Multi-LLM Fallback (Tier 2) $\rightarrow$ Offline Smart Local Engine (Tier 3).
- **Contextual In-Chat Car Booking:** Discuss any vehicle (e.g., *Range Rover Velar*) and say *"ok book korte chai form dew"* — the assistant instantly opens an interactive reservation card inside the chat stream.
- **Dynamic Fleet Display:** Recommends the entire active fleet (6 vehicles) on request, or adjusts dynamically (e.g. *"show just 1 car"*).
- **Markdown Image Rendering:** Visual vehicle photographs render natively inside chat bubbles.
- **Instant Discord Webhook Lead Alerts:** Automatically captures customer phone numbers, emails, and notes, dispatching hot leads straight to Discord sales channels.

### 2. ⚡ Real-Time User & Admin Portals
- **Supabase Realtime WebSockets:** Live booking updates pop up instantly on the user dashboard without requiring a manual page refresh.
- **Verified Email Locking:** Auto-populates and locks the driver's verified account email during the booking flow.
- **Rental Agreements & Digital Receipts:** View itemized transaction summaries and trigger PDF receipt downloads.
- **Admin Operations:** Comprehensive revenue metrics, POS interface, fleet status, and global sales growth analytics.

### 3. 🛡️ Next.js 16 Proxy Security (`src/proxy.ts`)
- **Airtight Route Protection:** Blocks unauthenticated guests from accessing `/user/*` or `/admin/*`, redirecting them to `/login`.
- **Role Isolation:** Prevents standard users from tampering with or viewing the `/admin/*` operations hub.
- **Auth Page Redirection:** Automatically routes logged-in members away from `/login` or `/register` to their respective dashboards.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 16.3.3 (App Router + Turbopack) & React 19.2.8 |
| **State Management** | Zustand 5.0.15 |
| **Styling & Icons** | Tailwind CSS v4 & Lucide React |
| **Backend & DB** | Supabase (PostgreSQL, Realtime WebSockets, Row-Level Security) |
| **Artificial Intelligence** | Google Generative AI (Gemini 3.6/Flash) & OpenRouter API |
| **Package Manager** | `pnpm` (v11+) |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### 1. Clone the Repository
```bash
git clone https://github.com/shakil-ahmed-billal/swiftride-ai.git
cd swiftride-ai
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# AI Concierge Keys
GEMINI_API_KEY="your-google-gemini-api-key"
OPENROUTER_API_KEY="your-openrouter-api-key"

# Lead Notifications (Optional)
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/your-webhook-url"
```

### 4. Seed Database
Initialize vehicle inventory and admin user credentials:
```bash
pnpm db:reset
pnpm db:seed
pnpm db:seed:admin
```

### 5. Launch Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to experience SwiftRide AI.

---

## 📁 Project Directory Structure

```text
swiftride-ai/
├── public/                     # Static car assets & icons
│   ├── car-image/              # High-resolution vehicle images
│   └── admin-dashboard/        # Operations hub icons & charts
├── src/
│   ├── app/
│   │   ├── (auth)/             # Login & Register routes
│   │   ├── (dashboard)/
│   │   │   ├── admin/          # Admin operations portal
│   │   │   └── user/           # User dashboard & booking history
│   │   ├── api/
│   │   │   └── ai/chat/        # AI Concierge fallback engine
│   │   ├── layout.tsx          # Root layout with data-scroll-behavior
│   │   └── page.tsx            # Main landing page & hero catalog
│   ├── components/
│   │   ├── admin/              # Admin dashboard widgets & headers
│   │   ├── ai-assistant/       # ChatWidget & inline reservation modal
│   │   ├── user/               # User dashboard components
│   │   ├── Hero.tsx            # Hero banner & overlapping search
│   │   ├── Navbar.tsx          # Navigation bar with auth state
│   │   └── PopularCars.tsx     # Fleet catalog & reservation drawer
│   ├── lib/
│   │   └── supabase.ts         # Supabase client & cookie sync engine
│   ├── store/
│   │   └── useChatStore.ts     # Zustand store for AI assistant
│   └── proxy.ts                # Next.js 16 Proxy security engine
├── scripts/                    # Supabase database seed scripts
├── PRD.md                      # Product Requirements Document
├── README.md                   # Project overview & documentation
└── package.json                # Project dependencies and scripts
```

---

## 📜 Available PNPM Scripts

- `pnpm dev` — Starts the Next.js local development server with Turbopack.
- `pnpm lint` — Runs ESLint code quality checks.
- `pnpm db:seed` — Seeds live vehicle fleet into Supabase `cars` table.
- `pnpm db:seed:admin` — Seeds administrative credentials into Supabase.
- `pnpm db:reset` — Cleans up and resets database tables.

---

## 👨‍💻 Author & Contributions

- **Developer:** Shakil Ahmed Billal ([@shakil-ahmed-billal](https://github.com/shakil-ahmed-billal))
- **Live Demo:** [https://swiftride-ai.vercel.app/](https://swiftride-ai.vercel.app/)
- **License:** MIT License — Free for commercial and educational use.
