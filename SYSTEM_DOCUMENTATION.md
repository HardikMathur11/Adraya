# WeaveHeritage Lux — System Architecture & Feature Documentation

This document provides a comprehensive architectural breakdown of the **WeaveHeritage Lux** digital atelier marketplace frontend, role permissions, endpoints, and data schemas.

---

## 1. System Roles & Access Matrix

| Role | Access Scope | Key Pages & Features |
|---|---|---|
| **Platform Admin** | Platform-wide ops & GI governance | Moderation Queue (`/admin`), GI Passport Issuance/Revocation (`/admin`), Audit Logs (`/admin`), Platform GMV Analytics (`/analytics`) |
| **Cluster Admin** | Guild cooperative management | Cluster Member Allocation (`/b2b/cluster/[orderId]`), Onboarding on Behalf (`/cluster-admin`), Course Assignment (`/cluster-admin`), Capacity Tracking (`/b2b`) |
| **Weaver** | Personal artisan shop & onboarding | Low-bandwidth Onboarding (`/onboard`), AI Story Assistant (`/assistant`), Personal Sales & Payout Analytics (`/analytics`), Artisan Profile (`/weaver/[id]`) |
| **B2B Buyer** | Institutional & wholesale sourcing | B2B Sourcing Directory (`/b2b`), Cluster Comparison Table (`/b2b`), Wholesale RFQ Submission (`/b2b`), Order Tracking (`/b2b/cluster/[orderId]`) |
| **Retail Buyer** | Luxury consumer shopping | Atelier Collections (`/collections/[mood]`), 3D Garment Viewer & Parallax (`/product/[slug]`), Passport QR Scan (`/passport/[qrId]`), Fair-Trade Checkout (`/checkout`) |
| **Guest** | Unauthenticated browsing | Homepage (`/`), Mood Collections (`/collections/[mood]`), Experience Residencies (`/visits`), Education Hub (`/learn`) |

---

## 2. Dynamic Role Switcher & Low-Bandwidth Mode

- **Role Switcher**: Pinned in the top utility header (`components/ui/Navbar.tsx`). Allows developers and users to switch active system simulation roles on the fly.
- **Low-Bandwidth Mode**: Toggleable 2G/3G simulation mode restricting high-payload network calls and providing offline-draft form state capabilities for rural weaver connectivity.

---

## 3. Page Routes & API Client Specifications

### 3.1 Homepage (`/`)
- **Access**: Public
- **Features**: Live full-bleed video hero background loop (`/loom-artisan-video.mp4`), horizontal scrollable Mood Collections snap row, asymmetric Curated Product Grid, Shilp Guru Artisans showcase, Visit banner, 3-column Trust Strip.
- **APIs**: `GET /api/catalog/featured`, `GET /api/collections/preview`, `GET /api/weavers/featured`

### 3.2 Product Detail (`/product/[slug]`)
- **Access**: Public (Acquire requires Retail Buyer auth)
- **Features**: View mode switcher (3D Garment Viewer plane + procedural normal map vs Live Loom Video Stream), thumbnail filmstrip, weaver byline with 80%+ fair share percentage, universal size guide chart, GSAP ScrollTrigger multi-layered parallax narrative, Wavesurfer.js audio waveform player, Framer Motion 3D swinging passport unfold card, cross-sell row.
- **APIs**: `GET /api/product/{slug}`, `GET /api/product/{slug}/passport-summary`, `POST /api/cart/add`, `POST /api/b2b/inquiry`

### 3.3 Authenticity Passport QR Landing (`/passport/[qrId]`)
- **Access**: Public (QR code landing, no login required)
- **Features**: Fullscreen mobile QR landing with auto-unfolding parchment card, emerald GI stamp, monospace ledger reference ID, version audit history.
- **APIs**: `GET /api/passport/{qrId}`

### 3.4 Platform Admin Operations (`/admin`)
- **Access**: Platform Admin
- **Features**: AI Content Moderation Queue (review stories, captions, and price claims before first publish), GI Authenticity Passport Issuance & Revocation with versioning history, System Audit Logs.
- **APIs**: `GET /api/admin/moderation`, `POST /api/admin/moderation/approve`, `GET /api/admin/passports`, `POST /api/admin/passports/issue`, `POST /api/admin/passports/revoke`, `GET /api/admin/audit-logs`

### 3.5 Cluster Admin Console (`/cluster-admin`)
- **Access**: Cluster Admin
- **Features**: Onboard member artisans on their behalf, cluster capacity tracking, assign learning paths to weavers.
- **APIs**: `GET /api/cluster/members`, `POST /api/cluster/onboard-member`, `POST /api/cluster/assign-course`

### 3.6 Cluster Fulfillment Dashboard (`/b2b/cluster/[orderId]`)
- **Access**: Cluster Admin, B2B Buyer, Platform Admin
- **Features**: Large woven thread-fill batch completion bar, live loom webcam video broadcast feed (`/loom-artisan-video.mp4`), batch milestone stepper timeline, weaver allocation progress table with custom status badges (taupe/gold/emerald).
- **APIs**: `GET /api/orders/{orderId}`, `PATCH /api/orders/{orderId}/allocation/{weaverId}`, `POST /api/orders/{orderId}/milestone`

### 3.7 B2B Sourcing Portal (`/b2b`)
- **Access**: B2B Buyer, Cluster Admin
- **Features**: Cluster directory with woven capacity indicator bars, side-by-side cluster comparison table modal (up to 3 clusters), persistent wholesale RFQ submission drawer.
- **APIs**: `GET /api/clusters`, `POST /api/rfq`, `POST /api/sample-request`

### 3.8 Weaver Onboarding Flow (`/onboard`)
- **Access**: Weaver, Cluster Admin (on behalf)
- **Features**: Pinned language toggle (Hindi, Assamese, Bengali, Tamil, English), 3-step touch wizard, native camera upload & voice note recording simulation, AI story card preview.
- **APIs**: `POST /api/weaver/register`, `POST /api/media/upload`, `POST /api/ai/generate-profile`

### 3.9 AI Brand Assistant (`/assistant`)
- **Access**: Weaver, Cluster Admin
- **Features**: Chat console with suggestion chips, live side-by-side listing preview panel with multilingual translation tabs.
- **APIs**: `POST /api/ai/chat`, `POST /api/ai/generate-listing`, `POST /api/ai/translate`

### 3.10 Role-Scoped Analytics (`/analytics`)
- **Access**: Role-scoped (privacy enforced)
- **Features**: Weaver view (personal sales, direct payout, loom hours), Cluster Admin view (cooperative capacity, fulfillment velocity), Platform Admin view (platform GMV, average 80%+ direct weaver payout share, issued GI passports).
- **APIs**: `GET /api/analytics/{role}`

### 3.11 Visits & Experiences (`/visits`)
- **Access**: Public
- **Features**: Golden-hour hero, experience cards, custom gold calendar date picker, booking confirmation modal.
- **APIs**: `GET /api/experiences`, `POST /api/bookings`

### 3.12 Craft Education Hub (`/learn`)
- **Access**: Weaver, Cluster Admin
- **Features**: Digital library course cards, animated SVG loom progress tracker.
- **APIs**: `GET /api/courses`, `POST /api/courses/{id}/complete-lesson`

### 3.13 Direct Fair-Trade Checkout (`/checkout`)
- **Access**: Retail Buyer
- **Features**: Single-column calm layout, react-hook-form + zod validation, transparent weaver fair-share payout breakdown card (no urgency tickers or countdown modals).
- **APIs**: `GET /api/cart`, `POST /api/orders`, `POST /api/payments/charge`

---

## 4. Frontend & Mock Data Architecture

```
/app                      → App Router Pages & Layouts
/components
  /ui/                    → Navbar, Footer, Button, Card, Badge, GoldLabel, CartDrawer, LuxuryVideoPlayer
  /three/                 → ProductViewer3D (R3F Canvas + normal map relief), ThreadLoader
  /storytelling/          → ParallaxSection (GSAP ScrollTrigger multi-layer scrub)
  /audio/                 → LoomWaveformPlayer (Wavesurfer.js canvas player)
  /passport/              → PassportUnfold (Framer Motion 3D swinging parchment card)
/store
  /useCartStore.ts        → Shopping cart & Weaver fair-share payout calculation
  /useSessionStore.ts     → Active role switcher, language locale, low-bandwidth mode
/lib
  /data.ts                → Complete 14-entity mock database & schemas
  /api.ts                 → Mock API client simulating backend endpoints
```
