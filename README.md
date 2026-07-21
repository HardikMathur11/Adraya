# 👑 ADRAYA — Indian Luxury Heritage Atelier

<p align="center">
  <img src="Frontend/public/assets/adraya-showcase/1.jpg" alt="Adraya Luxury Heritage Silk" width="100%" style="border-radius: 8px;" />
</p>

<p align="center">
  <strong>Direct Pit Loom Handloom Atelier • GI-Certified Heritage Provenance • Grok AI Engine • Interactive 3D Canvas</strong>
</p>

<p align="center">
  <a href="#-tech-stack-matrix"><img src="https://img.shields.io/badge/Stack-React%2018%20%7C%20Vite%205%20%7C%20Three.js-gold?style=for-the-badge" alt="Stack" /></a>
  <a href="#-system-architecture"><img src="https://img.shields.io/badge/Backend-Express%20%7C%20Node.js%20%7C%20MongoDB%20Atlas-emerald?style=for-the-badge" alt="Backend" /></a>
  <a href="#-grok-ai-engine-integration"><img src="https://img.shields.io/badge/AI-Grok%20xAI%20Engine-burgundy?style=for-the-badge" alt="AI" /></a>
</p>

---

## 🌟 Executive Summary

**Adraya** is an end-to-end direct-from-loom luxury handloom platform designed to preserve and scale India’s living textile heritage. By directly connecting rural master weavers (*Shilp Guru and National Award recipients*) with global textile connoisseurs and commercial luxury buyers, Adraya eliminates exploitative middleman networks, ensuring **82%+ direct bank payouts** to weaving families.

Built with a high-performance **React + Vite 5** frontend, **Three.js 3D WebGL rendering**, **Node.js Express backend**, **MongoDB Atlas**, and an integrated **xAI Grok Intelligence Service**, Adraya combines luxury aesthetic craftsmanship with modern digital commerce engineering.

---

## 🛠️ Tech Stack Matrix

| Architecture Layer | Core Technology | Key Modules & Libraries | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React.js 18** | TypeScript, Vite 5, React Router v6 | Single Page Application (SPA) with fast HMR and client-side routing |
| **3D Rendering & Animation** | **Three.js / WebGL** | `@react-three/fiber`, `@react-three/drei` | Real-time interactive 3D silk thread spool and WebAR room placement |
| **UI & Styling System** | **Tailwind CSS** | Framer Motion, Lucide Icons | Custom luxury design system with gold zari accents and smooth transitions |
| **State Management** | **Zustand** | `useCartStore`, `useSessionStore` | Transient cart management and dual-role session mode switching |
| **Backend API Server** | **Node.js / Express** | Express 4, TypeScript, Cors, Dotenv | RESTful microservice API handling auth, products, visits, and AI |
| **Database & ORM** | **MongoDB Atlas** | Mongoose 8 ORM | Cloud MongoDB document storage for users, drapes, and loom visits |
| **AI Intelligence Engine** | **xAI Grok API** | Native HTTP Client / OpenAI SDK Specs | 24/7 Heritage Chatbot, Weaver Story Engine, and Form Auto-Fill |
| **Authentication** | **JWT & Bcrypt** | `jsonwebtoken`, `bcryptjs` | Role-based authentication (`customer` vs `weaver`) |

---

## 🏗️ System Architecture

The system operates on a decoupled client-server architecture with cloud database persistence and AI coprocessor integration:

```
                                  +---------------------------------------+
                                  |         ADRAYA PLATFORM USERS         |
                                  +---------------------------------------+
                                        /                           \
                                       /                             \
                       +------------------------------+   +------------------------------+
                       |     Customer Storefront      |   |       Weaver Workspace       |
                       | (Atelier, Try-On, 3D WebAR)  |   | (Analytics, Auto-Fill, Listings) |
                       +------------------------------+   +------------------------------+
                                       \                             /
                                        \                           /
                                         v                         v
                                  +---------------------------------------+
                                  |      React 18 + Vite 5 Frontend       |
                                  |     (Three.js, Zustand, Tailwind)     |
                                  +---------------------------------------+
                                                     |
                                            HTTPS / JSON REST API
                                                     |
                                                     v
                                  +---------------------------------------+
                                  |     Node.js + Express API Backend     |
                                  |     (Port 5001 / CORS / JWT Auth)     |
                                  +---------------------------------------+
                                        /                            \
                                       /                              \
                                      v                                v
                       +------------------------------+   +------------------------------+
                       |    MongoDB Atlas Cloud DB    |   |     xAI Grok AI Service      |
                       |  (Users, Products, Visits)   |   |   (Chatbot, Provenance Story) |
                       +------------------------------+   +------------------------------+
```

---

## 🔄 Core Workflows & Business Logic

### 1. Weaver Listing & Grok AI Automation Workflow

```
[Master Weaver] ---> (Upload Loom Photos & Specs)
                          |
                          v
                 [Backend API Server]
                          |
                          v
               [xAI Grok AI Service] 
                          |
   (Generates Title, GI Weave Story & Price Calculation)
                          |
                          v
            [MongoDB Atlas Database Storage]
                          |
                          v
      [Instant Real-time Broadcast to All Customers]
```

### 2. Direct Payout & Transparent Pricing Breakdown

For every transaction executed on Adraya:
- **82% - 85%**: Transferred directly to the Master Weaver’s verified bank account via automated payment splits.
- **10%**: Allocated to community raw material banks (pure mulberry silk yarn & natural dyes).
- **5% - 8%**: Platform maintenance and GI tag verification logistics.

---

## 🚀 Repository Directory Structure

```
Adraya/
├── 🎨 Frontend/
│   ├── public/assets/         # High-resolution drape photos, 3D textures, showcase images
│   ├── src/
│   │   ├── components/        # Three.js 3D canvases, Navbar, Footer, Drawers
│   │   ├── lib/api/           # REST API client services
│   │   ├── pages/             # Atelier Storefront, Moods, Weavers, B2B, Dashboard
│   │   └── store/             # Zustand Cart and Dual-Role Session stores
│   ├── package.json
│   └── vercel.json            # Production SPA routing configuration
│
├── ⚙️ Backend/
│   ├── src/
│   │   ├── models/            # Mongoose Schemas (User, Product, Visit)
│   │   ├── routes/            # Express Routes (Auth, Products, Visits, AI)
│   │   ├── services/          # Grok AI Service integration layer
│   │   ├── seed.ts            # Database seeding script (12 Master Accounts)
│   │   └── server.ts          # Express Application Entry Point with port fallback
│   ├── .env.example           # Template environment variable configuration
│   └── package.json
│
├── 📜 README.md               # Enterprise system documentation
└── 📄 .gitignore              # Environment secrets and build exclusion rules
```

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher

### 1. Backend Service Setup
```bash
# Navigate to Backend directory
cd Backend

# Install dependencies
npm install

# Seed initial database (Populates 12 master accounts & handloom products in MongoDB Atlas)
npm run seed

# Launch Backend Server (http://localhost:5001)
npm run dev
```

### 2. Frontend Storefront Setup
```bash
# Open a new terminal and navigate to Frontend directory
cd Frontend

# Install dependencies
npm install

# Launch Vite Development Server (http://localhost:5173)
npm run dev
```

---

## 🌐 Production Deployment Guide

- **Frontend Deployment (Vercel / Netlify)**: Set root directory to `Frontend`, build command to `npm run build`, and output folder to `dist`. The included `Frontend/vercel.json` ensures full SPA client-side routing compatibility.
- **Backend Deployment (Render / Railway / Cloud)**: Set root directory to `Backend`, environment variables for `MONGO_URI` and `GROK_API_KEY`, and launch command to `npm start`.

---

<p align="center">
  Crafted with precision for India's Living Handloom Heritage.
</p>
