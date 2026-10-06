# SharePal - Gaming Gadgets on Rent (Bangalore)

A high-fidelity, production-ready frontend recreation of SharePal's [Gaming Gadgets on Rent in Bangalore](https://sharepal.in/bangalore/gaming-gadgets-on-rent) web page.

This project was built to match the original SharePal visual design system, typography, interactive states, dynamic rental tenure calculations, and the official 23-gadget catalog dataset.

---

## 🔗 Project & Submission Links

- **Target Reference Page**: [SharePal Gaming Gadgets on Rent (Bangalore)](https://sharepal.in/bangalore/gaming-gadgets-on-rent)
- **GitHub Repository**: *(Add your repository URL here)*
- **Live Deployed URL**: *(Add your Vercel deployment URL here)*

---

## 💻 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Utilities**: [date-fns](https://date-fns.org/)
- **Deployment Target**: [Vercel](https://vercel.com/) (Static Single Page Application, Zero-backend required)

---

## ✨ Features & Implementation Details

1. **Official Product Catalog Integration (`product-list.json`)**
   - 23 gaming gadgets with official SharePal WebP images, real IDs, ratings, booking counts, tags, and stock statuses.
   - Products include PS5 consoles, multi-controller combos, EA Play & FC25/FC26 combos, digital game editions, racing wheels, and Meta Quest VR headsets.
   - Support for multiple card states: "Trending", "New", "Sold Out" (with restock notification trigger), and "Vote to Launch" (with interactive voting counter).

2. **Interactive Dual-Month Date Picker Modal**
   - Responsive calendar supporting dual-month desktop view and single-month mobile view.
   - Dynamic calculation of total rental tenure and **Chargeable Period** (delivery and return days are not charged).
   - "Save more with us!" promotional card detailing discounts for longer tenures.
   - Date range highlight connectors with active start and end indicators.
   - Prevents selecting past dates or pickup dates prior to delivery date.

3. **Sticky Purple Navigation Header (`#4B1D8F`)**
   - Authentic SharePal wordmark branding with `#00D1FF` badge.
   - Interactive cluster: Delivery City selector (Bangalore default with dropdown), Delivery Date, Pickup Date, and "Select / Edit" action pill.
   - Real-time search filter for instantly searching gaming consoles and gear.
   - Wishlist counter and slide-out Cart drawer trigger with live badge counts.

4. **Dynamic Tenure-Based Pricing**
   - Real-time transparent pricing on product cards: when dates are chosen, cards display both daily rate and total tenure price (e.g. `₹600 for 3 days` alongside `₹200/day`).
   - Adding products directly calculates the multiplied tenure sum.
   - Fast date selection prompt pill appears dynamically when scrolling without dates selected.

5. **Slide-Out Cart Drawer**
   - Line items with product thumbnail, per-day rent multiplied by selected tenure, and quantity steppers (`+` / `-`).
   - Free doorstep pickup & drop guarantee and zero security deposit indicator.
   - Subtotal breakdown with responsive checkout confirmation flow.

6. **Promotional Banners Interleaved in Grid**
   - **Asset Partner Banner**: "Become an Asset Partner. Earn Monthly." with benefits breakdown and call to action.
   - **Gear Rental Banner**: "Rent Out Your Gear on SharePal" for peer equipment monetization.

7. **Social Proof, FAQs & Impact Metrics**
   - **FAQs**: Accordion with expandable questions and "View more FAQs" toggle.
   - **Testimonials**: Google Reviews carousel with verified star ratings and scroll navigation buttons.
   - **Impact Metrics**: Animated impact counters (`250Cr+ Saved Together`, `4.5M Kg CO2E`, `100K+ Products in Circulation`).

8. **Footer & SEO Information**
   - 8-column category directory matching the official SharePal architecture.
   - Expandable SEO city description with toggle ("Read More / Read Less").
   - Corporate information, terms, privacy, and support contact details.

---

## 📁 Project Structure

```
├── product-list.json           # Canonical 23-product dataset
├── src/
│   ├── components/
│   │   ├── Breadcrumb.tsx      # Bangalore > Gaming gadgets navigation
│   │   ├── CartDrawer.tsx      # Slide-out shopping cart drawer
│   │   ├── CategoryTabs.tsx    # Sub-category navigation tabs
│   │   ├── ChatButton.tsx      # Floating WhatsApp support trigger
│   │   ├── DateModal.tsx       # Dual-month date range picker modal
│   │   ├── FAQ.tsx             # Expandable FAQ accordion
│   │   ├── FilterBar.tsx       # Sort controls, tags & in-stock switch
│   │   ├── FloatingDatePill.tsx# Scroll-triggered date selection pill
│   │   ├── Footer.tsx          # 8-column directory & SEO details
│   │   ├── GearBanner.tsx      # Interleaved gear rental banner
│   │   ├── Header.tsx          # Sticky purple header with pill cluster
│   │   ├── HeroBanner.tsx      # Gaming consoles hero section
│   │   ├── PartnerBanner.tsx   # Interleaved asset partner banner
│   │   ├── ProductCard.tsx     # Product card with dynamic pricing & states
│   │   ├── ProductGrid.tsx     # Responsive product grid with banners
│   │   ├── Sidebar.tsx         # Vertical category filter sidebar
│   │   ├── Stats.tsx           # Environmental & savings metrics
│   │   ├── Testimonials.tsx    # Customer reviews carousel
│   │   └── ToastNotification.tsx# Feedback alerts
│   ├── context/
│   │   └── RentalContext.tsx   # Central state management & localStorage
│   ├── data/
│   │   ├── product-list.json   # Product catalog
│   │   └── staticContent.ts    # Testimonials and FAQ content
│   ├── hooks/
│   │   └── useScrollPosition.ts# Scroll detection hook
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   └── dateUtils.ts        # Date calculation helpers
│   ├── App.tsx                 # Root layout & page composition
│   ├── index.css               # Tailwind CSS imports
│   └── main.tsx                # Entry point
├── index.html                  # HTML entry point with fonts & meta tags
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js version 18 or higher (Node 20+ recommended)
- npm or yarn

### Steps

1. **Clone the repository:**
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd sharepal-gaming-gadgets-on-rent-in-bangalore
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port shown in terminal).

4. **Verify TypeScript type safety:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deploying to Vercel

This application is built as a pure client-side Single Page Application (SPA). **No backend server or database is required** (no need to deploy to Render or AWS), making it 100% free and instantaneous to deploy on Vercel.

### Method 1: Deploy via Vercel Web Dashboard (Recommended)

1. Push your code to a new repository on **GitHub**.
2. Go to [vercel.com](https://vercel.com/) and log in (with your GitHub account).
3. Click **"Add New..."** > **"Project"**.
4. Import your newly created GitHub repository.
5. In the project configuration:
   - **Framework Preset**: Vite (detected automatically)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Vercel will build the project and provide your live URL (e.g., `https://sharepal-gaming-gadgets.vercel.app`).

### Method 2: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Deploy to production
vercel --prod
```
