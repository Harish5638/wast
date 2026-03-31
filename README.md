# Food Waste Management System - Project Documentation

![Hero Banner](public/hero-banner.png)

## 🌟 Executive Summary (Abstract)

**The Food Waste Management System** (formerly Waste2Worth) is a state-of-the-art, AI-powered platform designed to bridge the gap between food surplus and community need. By connecting **Donors** (restaurants, individuals), **Organizations** (NGOs, shelters), and **Volunteers** (transporters), the system creates a high-efficiency circular economy. Leveraging **Google Gemini AI** for intelligent food categorization and **Google Maps** for real-time tracking, this application transforms surplus food into hope, reducing environmental impact while nourishing the community.

---

## 🛠️ Advanced Tech Stack & Architectural Overview

The project is built on a **modern, type-safe full-stack architecture** (Next.js 15) ensuring high performance, security, and scalability.

### Core Technologies
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Database**: [MongoDB](https://www.mongodb.com/) (ORM: [Mongoose](https://mongoosejs.com/))
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (JWT-based Credentials Provisoner)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **State Management**: [React 18](https://react.dev/) Hooks (useState, usePathname, etc.)

### AI & API Implementations
- **AI Engine**: [Google Genkit](https://firebase.google.com/docs/genkit) powered by `google-genai` (**Gemini Flash/Vision**)
- **Maps API**: [Google Maps JavaScript API](https://developers.google.com/maps) (via `@vis.gl/react-google-maps`)
- **Cloud Assets**: [Firebase](https://firebase.google.com/) for additional ecosystem integrations.

---

## 🚀 Key Functional Modules

### 1. AI-Powered Smart Categorization
Integrated with **Google Gemini**, the system analyzes uploaded food photos and descriptions to automatically categorize donations into three distinct tiers:
- 🍱 **Edible**: High-quality surplus for human consumption (Shelters, Kitchens).
- 🐾 **Usable**: Non-food grade, suitable for animal feed or livestock.
- ♻️ **Compost**: Organic waste for community gardens and local agriculture.

### 2. Role-Based Dynamic Dashboards
Secure, customized experiences for three distinct user roles:
- **Donor**: Add donations, track listing status, view individual impact.
- **Organization**: Claim available donations, manage claimed items, verify delivery.
- **Volunteer**: Browse claimed donations, schedule pickups, earn XP and rewards.

### 3. Real-Time Interactive Tracking
An integrated **Google Map** view that visualizes available food donations, allowing Organizations to find nearby resources and Volunteers to optimize their pickup routes.

### 4. Gamified Rewards & XP System
Built-in mechanics to drive engagement:
- **XP (Experience Points)**: Awarded for active participation (donating, claiming, transporting).
- **Levels**: Milestone-based level-up system (Level 1 to Max Level).
- **Badges**: Unlockable achievements (e.g., *First Donation*, *Eco-Warrior*, *Helping Hand*).

---

## 💎 Design Standards & Best Practices

The codebase adheres to industry-standard clean code principles:
- **Server-Side Excellence**: Extensive use of **Next.js Server Actions** for database mutations to minimize client-side bundle size.
- **Zod-Powered Validation**: Hardened AI flows and form inputs using **Zod schema validation**.
- **Component Composition**: Modular UI primitives built on Radix UI for accessibility (A11y) and premium polish.
- **Micro-Animations**: Smooth transitions using Tailwind CSS and Radix animations for a premium user experience.
- **Glassmorphic UI**: Modern aesthetic with frosted glass headers and elegant card-based layouts.

---

## 🧪 Comprehensive Test Case Report

To ensure system reliability, the following end-to-end flows are used for verification:

### **TC-01: AI Vision & Categorization Flow**
- **Objective**: Verify AI correctly identifies food type from a photo.
- **Role**: Donor
- **Steps**:
    1. Navigate to `/dashboard/donate`.
    2. Upload a clear photo of "Fresh Vegetables".
    3. Enter description and submit.
- **Expected Result**: System returns "Edible" category with a valid technical reasoning.

### **TC-02: Organization Claims Management**
- **Objective**: Verify NGOs can discover and claim nearby food.
- **Role**: Organization
- **Steps**:
    1. Browse the Interactive Map on the Dashboard.
    2. Select an "Available" card.
    3. Click "Claim donation".
- **Expected Result**: System updates donation status to "claimed" and moves it to the "My Claims" list.

### **TC-03: Volunteer Logistics & XP Awarding**
- **Objective**: Verify volunteers can complete deliveries and earn rewards.
- **Role**: Volunteer
- **Steps**:
    1. View "Claimed" items awaiting pickup.
    2. Click "Schedule Pickup & Complete".
- **Expected Result**: Status changes to "completed", 50 XP is added to the user profile, and Level Progress fills up.

---

## 🛠️ Installation & Setup Guide

### 1. Prerequisites
- **Node.js**: v18.x or later
- **MongoDB**: Local instance or MongoDB Atlas
- **API Keys**: Google Cloud (Maps API) & Google AI Studio (Gemini API)

### 2. Environment Configuration
Create a `.env` file in the root directory and populate it:
```env
# Google AI Studio
GEMINI_API_KEY=your_gemini_api_key

# Google Cloud Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key

# MongoDB
MONGODB_URI=mongodb://localhost:27017/FoodWasteManagementSystem

# NextAuth
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:9002
```

### 3. Run Locally
```bash
# Install dependencies
npm install

# Run in Development mode
npm run dev -p 9002
```
*The app will be available at [http://localhost:9002](http://localhost:9002)*

---

## 📜 License & Acknowledgments
Distributed under the **MIT License**. This project was created with a vision for zero food waste and a hunger-free community.

---
*Developed by the Food Waste Management Team. Transform Surplus Into Hope.*
