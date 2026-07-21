# 👑 ADRAYA — Indian Luxury Heritage Atelier

<p align="center">
  <img src="Frontend/public/assets/adraya-showcase/1.jpg" alt="Adraya Luxury Heritage Silk" width="100%" style="border-radius: 8px;" />
</p>

<p align="center">
  <strong>Direct Pit Loom Handloom Atelier • GI-Certified Heritage Provenance • Grok AI Engine • Interactive 3D Canvas</strong>
</p>

<p align="center">
  <a href="#-key-features"><img src="https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Three.js-gold?style=for-the-badge" alt="Stack" /></a>
  <a href="#-backend--ai-architecture"><img src="https://img.shields.io/badge/Backend-Express%20%7C%20MongoDB%20Atlas-emerald?style=for-the-badge" alt="Backend" /></a>
  <a href="#-grok-ai-integration"><img src="https://img.shields.io/badge/AI-Grok%20xAI%20Engine-burgundy?style=for-the-badge" alt="AI" /></a>
</p>

---

## 🌟 Overview

**Adraya** is a direct-from-loom luxury handloom e-commerce atelier connecting rural Indian master weavers (*Shilp Guru awardees*) directly with global textile collectors and connoisseurs. 

Every drape features **Geographical Indication (GI) provenance certification**, **82%+ direct weaver bank payout tracking**, **interactive 3D silk thread animation**, **AI virtual try-on**, **3D WebAR room placement**, and **24/7 Grok AI heritage guidance**.

---

## ✨ Key Features

### 🛍️ Luxury Storefront (`/Frontend`)
- **Interactive 3D Gold Thread Spool**: Built with `@react-three/fiber` & `@react-three/drei` floating naturally over live loom broadcast streams.
- **4-Photo Texture & Drape Inspector**: High-resolution close-ups of pure zari borders, weave density, and macro silk fibers.
- **The Adraya Imperial Vault**: Museum-grade heritage craft showcase gallery highlighting rare Kanchipuram, Pochampally, Banarasi, Muga, Pashmina, and Paithani masterpieces.
- **AI Virtual Try-On & 3D WebAR**: Upload customer photos to preview drapes or place 3D loom models into any room.
- **B2B Bulk Wholesale & Cluster RFQ**: Custom order engine with sample requests, GST invoicing, and volume tiering.

### 🛠️ Weaver Workspace & Dashboard
- **82%+ Direct Payout Analytics**: Real-time earnings breakdown and direct bank transfer verification.
- **Real-Time Loom Visit Booking**: Customers book artisan village masterclasses directly synced to the Weaver Dashboard.
- **Grok AI Listing Auto-Fill**: Master weavers upload photos, and AI generates title, GI weave specs, yarn counts, and cultural stories.

---

## 🧠 Backend & AI Architecture (`/Backend`)

Powered by **Express.js**, **Mongoose (MongoDB Atlas)**, and **xAI / Grok AI API Engine**.

```
Adraya Architecture
│
├── 🎨 Frontend (React + Vite + Three.js + TailwindCSS)
│   ├── Component UI System & 3D Canvases
│   ├── Cart Drawer & Order Management
│   └── Mobile Responsive Menu Drawer
│
└── ⚙️ Backend (Express + Node.js + Mongoose)
    ├── 🗄️ MongoDB Atlas Database (adraya_luxury_heritage)
    ├── 🤖 Grok AI Service Engine (Chatbot, Auto-Fill, Provenance)
    └── 🔐 JWT Authentication & Seed Engine (12 Pre-seeded Users)
```

---

## 👥 Seeded Test Accounts (MongoDB Atlas)

The database includes **12 pre-configured accounts** for testing:

| User Name | Role | Email | Password | Craft Specialty / Location |
| :--- | :--- | :--- | :--- | :--- |
| **Radha Devi** | Master Weaver | `radha@adraya.in` | `AdrayaPass123` | Double-Ikat Silk (Pochampally, Telangana) |
| **Lakshmi Amma** | Master Weaver | `lakshmi@adraya.in` | `AdrayaPass123` | Korvai Temple Borders (Kanchipuram, TN) |
| **Bipul Das** | Master Weaver | `bipul@adraya.in` | `AdrayaPass123` | Wild Golden Muga Silk (Sualkuchi, Assam) |
| **Ghulam Nabi** | Master Weaver | `ghulam@adraya.in` | `AdrayaPass123` | Kani Needle Pashmina (Srinagar, Kashmir) |
| **Gurudev Varma** | Master Weaver | `gurudev@adraya.in` | `AdrayaPass123` | Real Gold Zari Kadwa (Varanasi, UP) |
| **Savita Kshirsagar** | Master Weaver | `savita@adraya.in` | `AdrayaPass123` | Yeola Paithani Peacock (Maharashtra) |
| **Ananya Sharma** | Customer | `ananya@gmail.com` | `AdrayaPass123` | Connoisseur Collector |
| **Priya Mehta** | Customer | `priya@boutiquesilk.com` | `AdrayaPass123` | Luxury Boutique Buyer |

---

## 🚀 Quick Start Guide

### 1. Run Backend Server
```bash
cd Backend
npm install
npm run seed  # Seeds 12 Users, Products & Visits into MongoDB Atlas
npm run dev   # Starts Express Server on http://localhost:5001
```

### 2. Run Frontend Storefront
```bash
cd Frontend
npm install
npm run dev   # Starts Vite Dev Server on http://localhost:5173
```

---

<p align="center">
  Crafted with ❤️ for India's Living Handloom Heritage Artisans.
</p>
