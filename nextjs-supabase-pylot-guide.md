# Next.js & Supabase Technical Integration Blueprint
**Project Name:** PylotDrive AI (Car Rental Platform & Admin Dashboard)  
**Author:** Shakil Ahmed Billal (Full-Stack Developer & Team Leader)  
**Target:** Digital Pylot Technical Assessment  

This document provides a highly detailed, production-ready blueprint for implementing a pixel-perfect, AI-driven Car-Rental Website and Admin Dashboard using **Next.js (App Router)** and **Supabase (PostgreSQL with Prisma)**. It addresses architectural details, schema designs, API integration, AI prompt engineering, automation, and specific solutions for Supabase connection pooling and Row-Level Security (RLS).

---

## 1. Complete Architecture & Folder Structure

We use the Next.js App Router for server-side optimization, fast routing, and serverless API endpoints. Global state management for filters is handled by **Zustand**, and **Prisma ORM** manages database migrations and client queries to Supabase.

```text
pylot-drive-ai/
├── prisma/
│   ├── schema.prisma            # Prisma Relational Schema
│   └── seed.ts                  # Seeding script for Car Fleet data
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Global Layout (Navbar, Footer, Toast Provider)
│   │   ├── page.tsx             # Customer Landing Page (Car Grid, Hero, Filters)
│   │   ├── admin/
│   │   │   └── page.tsx         # Admin Dashboard (Recharts, Statistics, Booking Table)
│   │   └── api/
│   │       ├── ai/
│   │       │   └── recommend/
│   │       │       └── route.ts # AI Recommendation Chatbot API (Gemini-powered)
│   │       └── booking/
│   │           └── route.ts     # Booking Handler with Email & Discord Webhook Automations
│   ├── components/
│   │   ├── ui/                  # Shadcn UI basic components (Button, Card, Input)
│   │   ├── admin/
│   │   │   ├── Sidebar.tsx      # Sidebar navigation (including dummy inactive items)
│   │   │   ├── MetricCards.tsx  # KPI Cards for Revenue, Bookings, Conversion
│   │   │   └── Analytics.tsx    # Recharts Line/Bar Chart Components
│   │   ├── customer/
│   │   │   ├── CarCard.tsx      # Reusable vehicle card component
│   │   │   ├── BookingModal.tsx # Booking submission modal
│   │   │   └── FilterBar.tsx    # Dynamic search/filter bar powered by Zustand
│   │   └── ai-chatbot/
│   │       └── ChatbotWidget.tsx# Floating UI widget for AI recommendation
│   ├── hooks/
│   │   └── use-toast.ts         # User notification hook (Shadcn UI)
│   ├── lib/
│   │   ├── prisma.ts            # Prisma client singleton (connection-safe)
│   │   ├── supabase.ts          # Supabase Client configuration
│   │   └── gemini.ts            # Google Gemini AI connection
│   └── store/
│       ├── useCarStore.ts       # Zustand store for car filters
│       └── useChatStore.ts      # Zustand store for AI chatbot state
├── .env.local                   # Environment Variables (Secrets)
├── tailwind.config.ts           # Tailwind Styling & theme configurations
└── package.json
```

---

## 2. Database Schema (Prisma & Supabase PostgreSQL)

To manage users, vehicle inventory, and customer bookings seamlessly, we set up a relational PostgreSQL schema in Supabase using Prisma.

```prisma
// prisma/schema.prisma

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")   // Transaction pool connection string (port 6543)
  directUrl = env("DIRECT_URL")     // Direct connection string for migrations (port 5432)
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String    @id @default(uuid())
  email     String    @unique
  name      String?
  role      Role      @default(CUSTOMER)
  bookings  Booking[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Car {
  id            String    @id @default(uuid())
  name          String    // e.g., Tesla Model 3
  brand         String    // e.g., Tesla, Toyota, Nissan
  type          String    // e.g., SUV, Sedan, Electric
  transmission  String    // e.g., Automatic, Manual
  fuelType      String    // e.g., Electric, Hybrid, Octane
  seats         Int       // e.g., 5, 7
  pricePerDay   Float     // Booking cost per day
  image         String    // High-quality vehicle image URL
  available     Boolean   @default(true)
  bookings      Booking[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Booking {
  id          String        @id @default(uuid())
  userId      String
  user        User          @relation(fields: [userId], references: [id])
  carId       String
  car         Car           @relation(fields: [carId], references: [id])
  startDate   DateTime
  endDate     DateTime
  totalAmount Float
  status      BookingStatus @default(PENDING)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

enum Role {
  CUSTOMER
  ADMIN
}

enum BookingStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}
```

### Essential: Resolving Connection Pooling (PGBouncer)
Since Next.js Serverless API routes scale dynamically, they can quickly exhaust database connection limits on Supabase's free tier. 
* To prevent this, use **Supabase Connection Pooler (port 6543)**.
* Append `?pgbouncer=true` to your `DATABASE_URL` transaction connection string.
* Define `DIRECT_URL` pointing directly to port `5432` for running migrations (`npx prisma db push` or `npx prisma migrate dev`).

---

## 3. Database Seeding Script (`prisma/seed.ts`)

Run this script to automatically populate your database with premium car entries containing real high-resolution Unsplash car images. This ensures your dashboard and front-end have rich content immediately.

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing records
  await prisma.booking.deleteMany({});
  await prisma.car.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seeding Database...');

  // Create Cars with Real Unsplash Images
  const cars = await prisma.car.createMany({
    data: [
      {
        name: 'Tesla Model Y',
        brand: 'Tesla',
        type: 'Electric',
        transmission: 'Automatic',
        fuelType: 'Electric',
        seats: 5,
        pricePerDay: 120.00,
        image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800',
        available: true,
      },
      {
        name: 'Range Rover Sport',
        brand: 'Land Rover',
        type: 'SUV',
        transmission: 'Automatic',
        fuelType: 'Octane',
        seats: 7,
        pricePerDay: 180.00,
        image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800',
        available: true,
      },
      {
        name: 'Toyota Camry Hybrid',
        brand: 'Toyota',
        type: 'Sedan',
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        seats: 5,
        pricePerDay: 65.00,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
        available: true,
      },
      {
        name: 'Ford Mustang GT',
        brand: 'Ford',
        type: 'Sports',
        transmission: 'Manual',
        fuelType: 'Octane',
        seats: 4,
        pricePerDay: 150.00,
        image: 'https://images.unsplash.com/photo-1584345604482-89568f219198?auto=format&fit=crop&q=80&w=800',
        available: true,
      },
    ],
  });

  console.log(`Successfully seeded ${cars.count} vehicles!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

To run this seed, add the following to your `package.json`:
```json
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```
Then execute: `npx prisma db seed`.

---

## 4. Singletons and Clients Setup

### A. Prisma Client Singleton (`src/lib/prisma.ts`)
Avoid creating multiple Prisma client connections on server reload in development:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### B. Supabase Client Init (`src/lib/supabase.ts`)
To perform custom actions (like real-time event listening) on the client, initialize Supabase:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### C. Supabase RLS (Row-Level Security) Handling
By default, newly created tables in Supabase block all client read/write queries unless RLS policies are set up. To avoid spending valuable hours in setting up complex RLS policies for an assessment submission, you can choose **one of two approaches**:
1. **Disable RLS:** Go to your **Supabase Dashboard** -> **Database** -> **Tables** and toggle off RLS for `Car`, `User`, and `Booking`. *Recommended for speed and simplicity during technical trials.*
2. **Server-Side Bypass:** When querying via your API routes, use Prisma (which connects directly using the PostgreSQL connection string, completely bypassing RLS). If using the client-side Supabase client, use the `service_role` private key on server-side requests to bypass RLS restrictions safely.

---

## 5. Next.js API Routes (Backend Core)

### A. AI recommendation Chatbot Route (`src/app/api/ai/recommend/route.ts`)
Using the **Gemini API** (or OpenAI), this route fetches available vehicles from Supabase, injects them into the LLM context, and provides users with smart recommendations.

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { GoogleGenAI } from '@google/generative-ai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. Fetch available fleet data from Supabase PostgreSQL
    const availableCars = await prisma.car.findMany({
      where: { available: true },
      select: {
        id: true,
        name: true,
        brand: true,
        type: true,
        seats: true,
        fuelType: true,
        pricePerDay: true,
      },
    });

    // 2. Build context
    const carContext = JSON.stringify(availableCars);

    const systemPrompt = `
You are the official AI Smart Assistant for PylotDrive AI (a premium car rental agency).
Your task is to help users find their ideal rental car based on their trip type, budget, passenger count, and transmission preferences.

Here is the list of currently available cars in our real database:
${carContext}

Strict Guidelines:
1. ONLY recommend vehicles listed in the available vehicles context above. Do not hallucinate or make up cars.
2. If a user asks for something we don't have, politely explain we don't carry that model, and recommend our closest available option.
3. Keep pricing clear and explain why your recommendation fits their query (e.g. "Since you are planning a family camping trip, our Range Rover Sport offers 7 seats and plenty of luggage space").
4. Keep the tone warm, professional, and friendly.
    `;

    // 3. Connect with Gemini-1.5-Pro Model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const fullPrompt = `${systemPrompt}\n\nUser Message: ${message}\nAI Response:`;

    const result = await model.generateContent(fullPrompt);
    const textResponse = result.response.text();

    return NextResponse.json({ response: textResponse });
  } catch (error: any) {
    console.error('AI API Error:', error);
    return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
  }
}
```

### B. Booking & Automation Workflow (`src/app/api/booking/route.ts`)
When a customer rents a car, this API route:
1. Registers the customer in the database.
2. Saves the booking entry.
3. **Email Automation:** Sends a beautifully structured confirmation invoice to the customer using **Resend**.
4. **Instant Notification:** Fires a webhook payload to **Discord** to alert the admin panel in real-time.

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(req: Request) {
  try {
    const { name, email, carId, startDate, endDate, totalAmount } = await req.json();

    if (!email || !carId || !startDate || !endDate || !totalAmount) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // 1. Database Transaction: Insert user (if new) and record booking safely
    const booking = await prisma.$transaction(async (tx) => {
      let user = await tx.user.findUnique({ where: { email } });
      if (!user) {
        user = await tx.user.create({
          data: { email, name: name || 'Valued Customer', role: 'CUSTOMER' },
        });
      }

      // Mark the car as temporarily unavailable (optional booking rule)
      await tx.car.update({
        where: { id: carId },
        data: { available: false },
      });

      return await tx.booking.create({
        data: {
          userId: user.id,
          carId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          totalAmount: parseFloat(totalAmount),
          status: 'PENDING',
        },
        include: { car: true },
      });
    });

    // 2. Trigger Automation A: Confirm via beautiful Resend Email
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'PylotDrive AI <bookings@yourdomain.com>',
        to: email,
        subject: `🚗 Booking Confirmed: ${booking.car.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #2563eb;">Booking Confirmation - PylotDrive AI</h2>
            <p>Dear ${name || 'Customer'},</p>
            <p>Your booking request for the <strong>${booking.car.name}</strong> has been secured successfully.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Reservation Details:</strong></p>
            <ul>
              <li><strong>Vehicle:</strong> ${booking.car.brand} ${booking.car.name}</li>
              <li><strong>Pickup Date:</strong> ${new Date(startDate).toLocaleDateString()}</li>
              <li><strong>Return Date:</strong> ${new Date(endDate).toLocaleDateString()}</li>
              <li><strong>Total Price:</strong> $${totalAmount}</li>
            </ul>
            <p>Thank you for driving with PylotDrive AI!</p>
          </div>
        `,
      });
    }

    // 3. Trigger Automation B: Send Discord Notification to Admin Channel
    if (DISCORD_WEBHOOK_URL) {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: '🚗 New Car Booking Registered!',
              color: 2424235, // Indigo/Blue color
              fields: [
                { name: 'Customer Name', value: name || 'Guest', inline: true },
                { name: 'Customer Email', value: email, inline: true },
                { name: 'Rented Vehicle', value: booking.car.name, inline: true },
                { name: 'Total Revenue', value: `$${totalAmount}`, inline: true },
                {
                  name: 'Rental Period',
                  value: `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`,
                  inline: false,
                },
              ],
              footer: { text: 'PylotDrive AI Automation Systems' },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    }

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error: any) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Failed to process booking workflow' }, { status: 500 });
  }
}
```

---

## 6. Zustand Store for Search Filters (`src/store/useCarStore.ts`)

Keep your front-end filters and car list state sync fluid without prop-drilling.

```typescript
import { create } from 'zustand';

interface FilterState {
  searchQuery: string;
  selectedBrand: string;
  selectedType: string;
  maxPrice: number;
  setSearchQuery: (query: string) => void;
  setSelectedBrand: (brand: string) => void;
  setSelectedType: (type: string) => void;
  setMaxPrice: (price: number) => void;
  resetFilters: () => void;
}

export const useCarStore = create<FilterState>((set) => ({
  searchQuery: '',
  selectedBrand: 'All',
  selectedType: 'All',
  maxPrice: 300,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),
  setSelectedType: (type) => set({ selectedType: type }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedBrand: 'All',
      selectedType: 'All',
      maxPrice: 300,
    }),
}));
```

---

## 7. Environment Variables Template (`.env.local`)

Store these variables securely in your `.env.local` for local execution, and inject them into Vercel settings for production deployment.

```env
# Supabase Database Settings (Transaction Pooler - Port 6543)
DATABASE_URL="postgres://postgres.[YOUR_PROJECT_ID]:[YOUR_PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase Database Direct Settings (Direct Pooler - Port 5432)
DIRECT_URL="postgres://postgres.[YOUR_PROJECT_ID]:[YOUR_PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# Supabase Client Settings (For real-time functionality on frontend)
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_PROJECT_ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"

# AI Configuration (Gemini API Credentials)
GEMINI_API_KEY="your-gemini-api-key"

# Automation Configurations (Resend Email & Discord)
RESEND_API_KEY="re_yourResendApiKeyHere"
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/your-webhook-id-here"
```

---

## 8. 48-Hour Implementation Quick Steps

### Step 1: Clone & Inits
```bash
npx create-next-app@latest pylot-drive-ai --typescript --tailwind --app
cd pylot-drive-ai
npm install prisma @prisma/client @supabase/supabase-js @google/generative-ai resend zustand lucide-react recharts
npx prisma init
```

### Step 2: Database Creation & Migration
1. Copy the **Prisma Schema** from Section 2 into `prisma/schema.prisma`.
2. Grab connection keys from Supabase and paste them into `.env.local`.
3. Push schema to Supabase:
   ```bash
   npx prisma db push
   ```

### Step 3: Seed Database
1. Paste the **Seeding Script** code into `prisma/seed.ts`.
2. Add the script configs to `package.json`.
3. Run the seeder to populate dynamic entries:
   ```bash
   npx prisma db seed
   ```

### Step 4: Build Interfaces & Run Dev
Configure client stores, layouts, endpoints, and components. Run the local development instance to test:
```bash
npm run dev
```

---

*This blueprint aligns completely with the technical requirements specified by **Digital Pylot** and utilizes your exact technical strengths for maximum execution speed, quality, and grading points.*
