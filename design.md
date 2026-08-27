# SwiftRide AI - Design System & Color Tokens (design.md)

## 1. Core Brand Colors
- **Primary Brand (Royal Electric Blue):** `#3563E9`
- **Primary Dark (Navy Accent):** `#1E3A8A` / `#274CC0` / `#0B132A`
- **Warm Accent (Active Nav & Highlights):** `#FA8231` / `#FF8A00`
- **Active Nav Background Tint:** `#FFF5ED` / `#FFEAD8`
- **Dark Slate Text & Headings:** `#0B132A` / `#1A202C` / `#1A2F55`
- **Muted Body Text:** `#596780` / `#64748B`
- **Light Canvas Background:** `#F6F7F9`
- **Pure White Cards:** `#FFFFFF`

---

## 2. Strict Border-Radius Tokens & Uniformity Rules
> [!IMPORTANT]
> **No Excessive Border-Radius Policy**: Do NOT use oversized radiuses (like `rounded-2xl`, `rounded-3xl`, `rounded-full` on cards/boxes). All cards, widgets, and buttons must strictly adhere to the tight, crisp radii below for visual consistency across Home and Admin pages.

- **Standard Buttons (Action / Filter / Form):** `rounded-[5px]` / `rounded-md` (4px–6px)
- **Standard Cards & Dashboard Panels:** `rounded-[8px]` to `rounded-[10px]` maximum
- **Input Fields & Dropdown Pills:** `rounded-[6px]` to `rounded-[8px]`
- **Table Cells & List Item Hover States:** `rounded-[6px]`
- **Badge Indicators & Toggle Dots:** `rounded-full` (only for small circular status dots or icon buttons)
- **Hero Right Curved Shape (Home Specific):** `rounded-[63px_0px_0px_0px]`

---

## 3. Strict Padding & Spacing Directives
- **Dashboard Outer Canvas:** `p-4 sm:p-5 lg:p-6` (Avoid oversized `p-8` or `p-12`).
- **Dashboard Card Internal Padding:** `p-4` to `p-5` maximum.
- **Table & List Items:** Compact `py-2.5 px-3.5` for high data density and readability.
- **Section Gaps:** Consistent `gap-4` to `gap-5`.

---

## 4. Strict Typography Directives
- **Zero Uppercase Policy:** No CSS `uppercase` or forced caps anywhere on the site. All headlines, tags, buttons, and badges must use standard Title Case or Sentence Case.
- **Font Families:** `Plus Jakarta Sans` for headings & UI text, `Rubik` for testimonials.
