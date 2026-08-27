# SwiftRide AI - Design System & Color Tokens (design.md)

## 1. Core Brand Colors
- **Primary Brand (Royal Electric Blue):** `#3563E9`
- **Primary Dark (Navy Accent):** `#1E3A8A` / `#274CC0` / `#0B132A`
- **Warm Accent (Active Nav & Highlights):** `#FA8231` / `#FF8A00` / `#FF9F43`
- **Dark Slate Text & Headings:** `#0B132A` / `#1A202C` / `#1A2F55`
- **Muted Body Text:** `#596780` / `#64748B`
- **Light Canvas Background:** `#F6F7F9`
- **Pure White Cards:** `#FFFFFF`

---

## 2. Strict Border-Radius Tokens & Uniformity Rules (MANDATORY)
> [!IMPORTANT]
> **Zero Excessive Border-Radius Policy**: Never use large curved radiuses (`rounded-[16px]`, `rounded-[18px]`, `rounded-[20px]`, `rounded-[22px]`, `rounded-2xl`, `rounded-3xl` etc.) on cards, sections, or boxes. Every card, button, and widget across the entire application MUST strictly follow the exact values below:

- **Buttons (All CTAs, Filter Buttons, Search, Rent Now, Submit):** strictly `rounded-[5px]` (never higher).
- **All Section Cards (Fleet Deals, Promo Banners, Why Choose Us, Testimonials, Admin Panels):** strictly `rounded-[10px]`.
- **Small Badges & Squircle Icon Containers:** strictly `rounded-[8px]`.
- **Input Fields & Modal Dialogs:** strictly `rounded-[5px]` to `rounded-[10px]`.
- **Circular Indicators & Avatars ONLY:** `rounded-full` (exclusively for profile avatars, status indicators, and slider dots).

---

## 3. Strict Section Headings Typography
- **All Section `<h2>` Headings:** `text-[#0B132A] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-3 sm:mb-4`.
- **All Section Subtitles `<p>`:** `text-[#596780] font-normal text-sm sm:text-base md:text-lg max-w-[540px] mx-auto leading-relaxed`.
- **Zero Forced Uppercase Policy:** Never use CSS `uppercase` on headings or navigation items.

---

## 4. Strict Spacing & Density Directives
- **Dashboard Outer Canvas:** `p-4 sm:p-5 lg:p-6` (Avoid oversized padding).
- **Dashboard Card Internal Padding:** `p-4` to `p-5` maximum.
- **Table & List Items:** Compact `py-2.5 px-3.5` for high data density and clean readability.
