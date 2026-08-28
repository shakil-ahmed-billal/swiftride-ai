# SwiftRide AI — Luxury & Smart Car Rental Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-3.6_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://swiftride-ai.vercel.app/)

> **SwiftRide AI** is an enterprise-grade car rental platform engineered with Next.js 16 App Router, React 19, TypeScript, and Supabase. It features an autonomous AI Concierge Assistant with automated lead capture, real-time database updates via WebSockets, and strict server-side proxy security.

---

## Live Application & Repository

- **Live Deployment:** [https://swiftride-ai.vercel.app/](https://swiftride-ai.vercel.app/)
- **GitHub Repository:** [https://github.com/shakil-ahmed-billal/swiftride-ai](https://github.com/shakil-ahmed-billal/swiftride-ai)
- **Product Requirements Document:** [PRD.md](file:///Users/shakilahmedbillal/Desktop/experiment/swiftride-ai/PRD.md)

---

## Demo Access Credentials

| Role | Email | Password | Access Portal |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@swiftride.com` | `admin123` | `/admin/dashboard` |
| **Verified Driver** | `user@swiftride.com` | `user123` | `/user/dashboard` |

---

## Key Features

### 1. Autonomous AI Concierge Assistant
- **Three-Tier Fallback Architecture:** Google Gemini AI (Tier 1) -> OpenRouter Multi-LLM Fallback (Tier 2) -> Smart Local Conversational Engine (Tier 3).
- **Contextual In-Chat Car Booking:** When discussing any vehicle (such as the Range Rover Velar), requesting a booking (e.g. *"I want to book this car, please provide the reservation form"*) automatically activates the interactive reservation form within the chat stream.
- **Dynamic Fleet Display:** Retrieves and displays active vehicles from live inventory on demand, adjusting vehicle counts dynamically based on user prompts.
- **Markdown Image Rendering:** Visual vehicle previews are rendered natively within chat messages.
- **Automated Discord Lead Dispatcher:** Parses customer contact details from conversations and dispatches real-time alerts to designated Discord sales webhooks.

### 2. Real-Time User & Admin Portals
- **Supabase Realtime WebSockets:** Live bookings immediately appear in the user dashboard without requiring manual page reloads.
- **Verified Email Locking:** Auto-populates and locks the driver's verified account email during the booking flow.
- **Rental Agreements & Digital Receipts:** Itemized reservation summaries with digital receipt download support.
- **Admin Operations Hub:** Comprehensive revenue statistics, point-of-sale management, inventory controls, and regional growth metrics.

### 3. Next.js 16 Proxy Security (`src/proxy.ts`)
- **Airtight Route Protection:** Restricts unauthenticated users from accessing `/user/*` or `/admin/*`, redirecting them to `/login`.
- **Role Isolation:** Prevents standard users from accessing `/admin/*` operations routes.
- **Auth Page Redirection:** Automatically routes authenticated users away from `/login` or `/register` to their respective dashboards.

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 16.3.3 (App Router + Turbopack) & React 19.2.8 |
| **State Management** | Zustand 5.0.15 |
| **Styling & Icons** | Tailwind CSS v4 & Lucide React |
| **Backend & DB** | Supabase (PostgreSQL, Realtime WebSockets, Row-Level Security) |
| **Artificial Intelligence** | Google Generative AI (Gemini 3.6/Flash) & OpenRouter API |
| **Package Manager** | `pnpm` (v11+) |

---

## Quick Start Guide

### Prerequisites
- Node.js (v20+ recommended)
- pnpm (`npm install -g pnpm`)

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
Create a `.env.local` file in the root directory and configure credentials:

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
Initialize vehicle inventory and administrative credentials:
```bash
pnpm db:reset
pnpm db:seed
pnpm db:seed:admin
```

### 5. Launch Development Server
```bash
pnpm dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## Project Directory Structure

```text
swiftride-ai/
├── public/                     # Static vehicle assets and icons
│   ├── car-image/              # High-resolution vehicle photographs
│   └── admin-dashboard/        # Operations hub icons and charts
├── src/
│   ├── app/
│   │   ├── (auth)/             # Authentication routes (login, register)
│   │   ├── (dashboard)/
│   │   │   ├── admin/          # Administrator operations portal
│   │   │   └── user/           # User dashboard and reservation history
│   │   ├── api/
│   │   │   └── ai/chat/        # AI Concierge assistant route handler
│   │   ├── layout.tsx          # Root application layout
│   │   └── page.tsx            # Landing page and fleet catalog
│   ├── components/
│   │   ├── admin/              # Admin dashboard widgets
│   │   ├── ai-assistant/       # ChatWidget and inline booking modal
│   │   ├── user/               # User dashboard components
│   │   ├── Hero.tsx            # Hero banner and search overlay
│   │   ├── Navbar.tsx          # Navigation header with auth controls
│   │   └── PopularCars.tsx     # Fleet catalog and reservation drawer
│   ├── lib/
│   │   └── supabase.ts         # Supabase client and cookie synchronization
│   ├── store/
│   │   └── useChatStore.ts     # Zustand store for AI assistant state
│   └── proxy.ts                # Next.js 16 Proxy security engine
├── scripts/                    # Database seeding and migration scripts
├── PRD.md                      # Product Requirements Document
├── README.md                   # Project documentation
└── package.json                # Project dependencies and scripts
```

---

## Available PNPM Scripts

- `pnpm dev` — Starts the local Next.js development server with Turbopack.
- `pnpm lint` — Executes ESLint code quality checks.
- `pnpm db:seed` — Seeds inventory into the Supabase `cars` table.
- `pnpm db:seed:admin` — Seeds administrative user credentials.
- `pnpm db:reset` — Resets database tables and schema state.

---

## Author & Contributions

- **Developer:** Shakil Ahmed Billal ([@shakil-ahmed-billal](https://github.com/shakil-ahmed-billal))
- **Live Deployment:** [https://swiftride-ai.vercel.app/](https://swiftride-ai.vercel.app/)
- **License:** MIT License
