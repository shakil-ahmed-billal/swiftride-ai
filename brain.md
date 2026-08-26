# SwiftRide AI - Architecture & Context Log (brain.md)

## 1. Project Overview & Context
SwiftRide AI is a car rental web platform engineered with Next.js 16 (App Router), TypeScript, and Tailwind CSS. The app features:
- **Unified Hero + Floating Search Booking Widget:** Tailored to fit 100vh on initial viewport load with a 50% bottom overlap.
- **Fleet Catalog & Filtering:** Interactive category switching, car specs (fuel capacity, transmission, passenger capacity), pricing per day, and favorite wishlisting.
- **Trust & Value Architecture:** 3-step 'How It Works' guide, 'Why Choose Us' feature highlights, promo deal cards, and customer testimonial carousels.

---

## 2. Component Map & Responsibilities
| Component | Path | Functionality |
| :--- | :--- | :--- |
| **Navbar** | `src/components/Navbar.tsx` | Sticky brand header, navigation anchors, auth CTAs, responsive mobile menu |
| **Hero** | `src/components/Hero.tsx` | Viewport-height hero showcase with headline, CTA links, visual badge, and 50% overlapping search card |
| **HowItWorks** | `src/components/HowItWorks.tsx` | 3-step visual booking roadmap with custom SVG iconography |
| **PopularCars** | `src/components/PopularCars.tsx` | Dynamic fleet grid, category filter tabs, interactive heart wishlist, specs badges |
| **WhyChooseUs** | `src/components/WhyChooseUs.tsx` | Highlighting 24/7 customer support, price guarantee, and global locations |
| **PromoBanners** | `src/components/PromoBanners.tsx` | Dual promotional gradient CTA banners for quick rental conversion |
| **Testimonials** | `src/components/Testimonials.tsx` | Social proof customer reviews with star ratings and interactive navigation controls |
| **Footer** | `src/components/Footer.tsx` | Complete site links, company vision statement, social media badges, and copyright/legal bar |

---

## 3. Key Design Decisions & Layout Principles
- **Viewport Height Constraint:** The Hero Section and Search Bar are synchronized to display in `100dvh` without unwanted scroll gaps.
- **Vibrant Color Palette:** Upgraded from wireframe grayscale to high-converting Royal Blue (`#3563E9`), Deep Slate (`#0B132A`), Coral Wishlist (`#FF4423`), and Amber Star Ratings (`#FBBF24`).
