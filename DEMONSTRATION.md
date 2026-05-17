# 🍽️ Food Waste Management System — Step-by-Step Demonstration Guide

> **Project:** Food Waste Management System  
> **Tech Stack:** Next.js 15, MongoDB, NextAuth, Genkit AI, Google Maps  
> **Port:** 9002

---

## 📋 Table of Contents

1. [Start the Application](#step-1--start-the-application)
2. [Open in Browser](#step-2--open-in-browser)
3. [Explore the Landing Page](#step-3--explore-the-landing-page)
4. [Sign Up (Create Account)](#step-4--sign-up-create-account)
5. [Login](#step-5--login)
6. [Dashboard Overview](#step-6--dashboard-overview)
7. [Add Food Donation](#step-7--add-food-donation)
8. [Browse Available Donations](#step-8--browse-available-donations)
9. [Claim Food](#step-9--claim-food)
10. [Pickup Food (Volunteer)](#step-10--pickup-food-volunteer)
11. [View My Pickups](#step-11--view-my-pickups)
12. [View My Claims](#step-12--view-my-claims)
13. [View My Donations](#step-13--view-my-donations)
14. [View Rewards & Badges](#step-14--view-rewards--badges)
15. [Community Feed](#step-15--community-feed)

---

## Step 1 — Start the Application

1. Open a **new terminal** (Command Prompt / PowerShell / VS Code Terminal).
2. Navigate to the project directory:
   ```
   cd "d:\project 2026\Waste2Worth\Waste2Worth"
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Wait for the server to start. You will see output like:
   ```
   ▲ Next.js 15.3.6 (Turbopack)
   - Local:   http://localhost:9002
   ```
5. The application is now running on **port 9002**.

---

## Step 2 — Open in Browser

1. Open any web browser (Google Chrome recommended).
2. In the address bar, type:
   ```
   http://localhost:9002
   ```
3. Press **Enter**.
4. The **landing page** of the Food Waste Management System will load.

---

## Step 3 — Explore the Landing Page

On the landing page, you will see:

- **Header Navigation** — Links to Home, About, Testimonials, Help, and a Login button.
- **Hero Section** — Title "Food Waste Management System" with the tagline _"Turn Surplus Into Hope."_ and a **"Donate Food"** call-to-action button.
- **How It Works Section** — 5 steps showing the workflow:
  1. 🍎 **Add Food** — Donors list surplus food with details and photos.
  2. 🔍 **Browse** — Receivers browse available donations near them.
  3. 🍽️ **Claim** — Receivers claim the food they can use.
  4. 🚚 **Pickup** — Volunteers pick up and deliver the donations.
  5. 🤝 **Make Impact** — Everyone contributes to reducing waste.
- **Impact Tiers Section** — Shows how AI categorizes donations:
  - ❤️ **Edible** — Safe for human consumption → goes to shelters, food banks.
  - 🐾 **Usable** — Not for humans but perfect for animals → supports farms, animal shelters.
  - ♻️ **Compost** — Biodegradable scraps → turned into compost for gardens.
- **Footer** — Project information and links.

Click the **"Donate Food"** button or the **"Login"** button in the navigation to proceed.

---

## Step 4 — Sign Up (Create Account)

1. On the **Login page** (`http://localhost:9002/login`), you will see the login form.
2. At the bottom, click **"Sign up"** to switch to the registration mode.
3. Fill in the **Sign Up form**:

   | Field        | What to Enter                        |
   |-------------|--------------------------------------|
   | **Email**    | Your email address (e.g., `donor@example.com`) |
   | **Password** | A password with at least 6 characters (e.g., `password123`) |

4. **Choose your role** — Select one of the three options:

   | Role                         | Description                                      |
   |------------------------------|--------------------------------------------------|
   | 🤲 **Donor / Contributor**    | Individuals or restaurants who donate food.       |
   | 🏢 **Organization / Receiver** | NGOs, shelters, and food banks who receive food.  |
   | 🚚 **Volunteer / Transporter** | People who help move/deliver the food.           |

5. Click the **"Sign Up"** button.
6. On success, you will see a toast notification: _"Welcome! Your account has been created."_
7. You will be automatically redirected to the **Dashboard**.

> **💡 Tip:** To test the full workflow, create three separate accounts — one for each role (Donor, Organization, Volunteer).

---

## Step 5 — Login

If you already have an account:

1. Go to `http://localhost:9002/login`.
2. Make sure you are in **Login mode** (not Sign Up).
3. Enter your **Email** and **Password**.
4. Click the **"Login"** button.
5. On success, you will see a toast: _"Welcome back!"_
6. You will be redirected to the **Dashboard**.

---

## Step 6 — Dashboard Overview

After logging in, you land on the **Dashboard** page (`/dashboard`).

**Left Sidebar Navigation:**
| Menu Item       | Description                                |
|----------------|--------------------------------------------|
| 📊 Dashboard    | Main view — browse donations (List & Map)  |
| 👥 Community    | Community feed with posts                   |
| 📦 My Donations | Track your food donations (Donor role)     |
| ✅ My Claims    | Track claimed donations (Organization role) |
| 🚚 My Pickups   | Track your pickups (Volunteer role)        |
| 🏅 Rewards      | Your XP, level, and earned badges          |

**Dashboard Main Area:**
- **Tabs** to switch between:
  - 📋 **List View** — Shows available donations as a list with details.
  - 🗺️ **Map View** — Shows donations on a Google Map.
- **"Add Donation"** button (visible only for Donor role) — Opens the donation form.

---

## Step 7 — Add Food Donation

> **Required Role:** Donor / Contributor

1. On the Dashboard, click the **"+ Add Donation"** button (top right).
2. A dialog/modal will open: **"Create a New Donation"**.
3. Fill in the donation form:

   | Field                  | What to Enter                                     | Required |
   |------------------------|---------------------------------------------------|----------|
   | **Donation Title**      | A descriptive name (e.g., _"Leftover rice from event"_) | ✅ Yes   |
   | **Food Type**           | Select from dropdown:                             | ✅ Yes   |
   |                        | • Fresh cooked                                    |          |
   |                        | • Bulk leftover                                   |          |
   |                        | • Raw items                                       |          |
   |                        | • Packaged food                                   |          |
   |                        | • Food waste for composting                       |          |
   | **Date Cooked**         | Pick a date using the calendar (if applicable)    | ❌ No    |
   | **Quantity**            | Enter amount (e.g., _"2 boxes"_, _"5 kg"_, _"20 cans"_) | ✅ Yes   |
   | **Storage Condition**   | Select from dropdown:                             | ✅ Yes   |
   |                        | • Refrigerated                                    |          |
   |                        | • Frozen                                          |          |
   |                        | • Dry                                             |          |
   |                        | • Uncooked                                        |          |
   |                        | • Room Temp                                       |          |
   | **Pickup Window Start** | Pick the earliest pickup date                     | ❌ No    |
   | **Pickup Window End**   | Pick the latest pickup deadline                   | ❌ No    |
   | **Additional Details**  | Extra info (e.g., _"Contains nuts"_, _"Best before Friday"_) | ❌ No |
   | **Photo of Donation**   | Upload a photo of the food (click or drag & drop) | ✅ Yes   |

4. Click the **"✨ Categorize & Add Donation"** button.
5. Wait while the AI processes — you'll see _"Categorizing..."_ with a spinner.
6. On success, you will see:
   - ✅ **"AI Categorization Complete!"** alert
   - The AI-assigned category with a badge:
     - 🟢 **Edible** — Safe for human consumption.
     - 🟠 **Usable** — Suitable for animals.
     - 🟡 **Compost** — For composting.
   - **AI Reasoning** — An explanation of why the food was categorized that way.
7. Click **"🔄 Make Another Donation"** to add more, or close the dialog.

---

## Step 8 — Browse Available Donations

1. On the Dashboard, use the tabs to switch views:
   - **📋 List View** — Shows donation cards with details (food type, category, quantity, photo).
   - **🗺️ Map View** — Shows donation locations on Google Maps with markers.
2. Each donation card shows:
   - Food type and title
   - AI-assigned category (Edible / Usable / Compost)
   - Quantity and storage condition
   - Pickup window
   - Photo of the food
3. Action buttons are available on each donation depending on your role.

---

## Step 9 — Claim Food

> **Required Role:** Organization / Receiver

1. Go to the **Dashboard** (`/dashboard`).
2. Browse available donations in the **List View**.
3. Find a donation you want to claim and click the **"Claim"** button.
4. A **Claim Dialog** will appear.
5. Enter your **delivery address** (where the food should be delivered).
6. Click **"Confirm Claim"**.
7. On success, you will see a toast: _"Donation Claimed! You have successfully claimed [Food Type]."_
8. The donation will be removed from the available list.
9. You can track your claims under **"My Claims"** in the sidebar.

---

## Step 10 — Pickup Food (Volunteer)

> **Required Role:** Volunteer / Transporter

1. Go to the **Dashboard** (`/dashboard`).
2. Browse donations that have been claimed and need pickup.
3. Find a donation and click the **"Schedule Pickup"** button.
4. A **Pickup Dialog** will appear with donation details.
5. Confirm the pickup by clicking the confirm button.
6. On success, you will see a toast: _"Pickup Scheduled! You have successfully picked up [Food Type]."_
7. The donation status changes to **"completed"**.
8. You can track your pickups under **"My Pickups"** in the sidebar.

---

## Step 11 — View My Pickups

> **Path:** Dashboard → Sidebar → **My Pickups** (`/dashboard/my-pickups`)

1. Click **"My Pickups"** (🚚) in the left sidebar.
2. You will see:

   **Summary Cards (Top):**
   | Card                     | Description                        |
   |--------------------------|------------------------------------|
   | 🚚 **Total Pickups**      | Number of deliveries completed     |
   | 🗺️ **Distance Covered**   | Estimated distance traveled (km)   |
   | 👥 **Communities Connected** | Number of unique routes covered  |

   **Pickups Table:**
   | Column           | Description                          |
   |------------------|--------------------------------------|
   | Food Name        | Name/title of the food               |
   | Food Type        | Type of food donated                 |
   | From (Donor)     | The donor who listed the food        |
   | To (Organization)| The organization that claimed it     |
   | Date Completed   | When the pickup was completed        |
   | Status           | Current status (completed / pending) |
   | Actions          | **"View Details"** button            |

3. Click **"View Details"** on any row to see:
   - Food photo
   - Route information (From → To)
   - Donation details (Category, Quantity, Storage, Pickup Window, Status)
   - Pickup location on a map
   - **"Get Directions"** button — Opens Google Maps with directions

---

## Step 12 — View My Claims

> **Path:** Dashboard → Sidebar → **My Claims** (`/dashboard/my-claims`)

1. Click **"My Claims"** (✅) in the left sidebar.
2. You will see:

   **Summary Cards (Top):**
   | Card                    | Description                          |
   |-------------------------|--------------------------------------|
   | ✅ **Total Claims**      | Number of donations claimed          |
   | ❤️ **Meals Received**    | Estimated meals provided (~15/claim) |
   | 👥 **Donors Supported**  | Number of different donors connected |

   **Claims Table:**
   | Column       | Description                              |
   |-------------|------------------------------------------|
   | Food Name    | Name/title of the food                   |
   | Food Type    | Type of food donated                     |
   | Donor        | Who donated the food                     |
   | Date Claimed | When you claimed the donation            |
   | Status       | _"Awaiting Pickup"_ or _"completed"_     |
   | Actions      | **"View Details"** button                |

3. Click **"View Details"** on any row to see:
   - Food photo
   - Donor information
   - Donation details (Category, Quantity, Storage, Pickup Window, Status)
   - Pickup location on a map
   - **"Get Directions"** button — Opens Google Maps for navigation

---

## Step 13 — View My Donations

> **Path:** Dashboard → Sidebar → **My Donations** (`/dashboard/my-donations`)  
> **Required Role:** Donor / Contributor

1. Click **"My Donations"** (📦) in the left sidebar.
2. You will see:

   **Summary Cards (Top):**
   | Card                      | Description                         |
   |---------------------------|-------------------------------------|
   | 📦 **Total Donations**     | Total number of items you listed    |
   | 🌿 **Edible Donations**    | How many were safe for consumption  |
   | ❤️ **Meals Provided (est.)** | Estimated lives impacted (~12/donation) |

   **Donation History Table:**
   | Column       | Description                            |
   |-------------|----------------------------------------|
   | Food Name    | Title or name of the food              |
   | Food Type    | Type of food donated                   |
   | Date Listed  | When you created the donation          |
   | Category     | AI-assigned category (badge)           |
   | Status       | _available_ / _claimed_ / _completed_ |
   | Claimed By   | Name of the organization (or "N/A")    |

---

## Step 14 — View Rewards & Badges

> **Path:** Dashboard → Sidebar → **Rewards** (`/dashboard/rewards`)

1. Click **"Rewards"** (🏅) in the left sidebar.
2. You will see:

   **Your Progress Card:**
   - Your current **Level** (1–5 or Max)
   - A **progress bar** showing XP towards the next level
   - Your total **XP** points

   **How XP is Earned:**
   | Action             | XP Earned |
   |--------------------|-----------|
   | Making a donation  | +10 XP    |
   | Completing a pickup| +20 XP    |
   | Claiming food      | +5 XP     |
   | Community post     | +5 XP     |

   **Level Thresholds:**
   | Level | XP Required |
   |-------|-------------|
   | 1     | 0 XP        |
   | 2     | 50 XP       |
   | 3     | 150 XP      |
   | 4     | 300 XP      |
   | 5     | 500 XP      |
   | Max   | 1000 XP     |

   **Your Badges Section:**
   - **Unlocked badges** — Shown in full color with a primary border
   - **Locked badges** — Shown faded/greyed out with a dashed border
   - Hover over any badge to see its description

   **Available Badges:**
   | Badge            | How to Unlock                           |
   |------------------|-----------------------------------------|
   | 🌱 First Donation | Make your first food donation           |
   | ⭐ Popular Post   | Get 10+ likes on a community post       |
   | 🚚 First Pickup   | Complete your first volunteer pickup     |
   | 🏆 Super Donor    | Make 5+ donations or earn 150+ XP       |

---

## Step 15 — Community Feed

> **Path:** Dashboard → Sidebar → **Community** (`/dashboard/community`)

1. Click **"Community"** (👥) in the left sidebar.
2. You can:
   - **View posts** from other community members.
   - **Create a new post** to share your experience.
   - **Like posts** from other users.
3. Community posts contribute to your **XP** and can help you earn the **Popular Post** badge.

---

## 🔄 Full Workflow Demo (End-to-End)

To demonstrate the complete flow of the application, follow these steps in order:

### 1️⃣ Donor Flow
1. Sign up as **Donor** (e.g., `donor@test.com`)
2. Log in → Go to Dashboard
3. Click **"+ Add Donation"** → Fill form → Submit
4. See AI categorization result
5. Go to **My Donations** → Verify your listing appears

### 2️⃣ Organization Flow
1. Log out → Sign up as **Organization** (e.g., `org@test.com`)
2. Log in → Go to Dashboard
3. Browse available donations
4. Click **"Claim"** on a donation → Enter address → Confirm
5. Go to **My Claims** → Verify your claim appears with status _"Awaiting Pickup"_

### 3️⃣ Volunteer Flow
1. Log out → Sign up as **Volunteer** (e.g., `volunteer@test.com`)
2. Log in → Go to Dashboard
3. Find a claimed donation needing pickup
4. Click **"Schedule Pickup"** → Confirm
5. Go to **My Pickups** → Verify the pickup appears as _"completed"_

### 4️⃣ Check Impact
1. Log in to any account
2. Go to **Rewards** → Check your XP and earned badges
3. Go to **Community** → Share your experience

---

## ⚙️ Prerequisites / Environment Setup

Before running the application, ensure the following:

1. **Node.js** — Version 18 or higher installed.
2. **MongoDB** — A running MongoDB instance (local or Atlas cloud). Configure the connection string in the `.env` file.
3. **Environment Variables** — The `.env` file should contain:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   NEXTAUTH_SECRET=<your-secret-key>
   NEXTAUTH_URL=http://localhost:9002
   GOOGLE_GENAI_API_KEY=<your-google-ai-api-key>
   ```
4. **Install Dependencies** — On first setup, run:
   ```
   npm install
   ```

---

## 🛑 Stopping the Application

To stop the development server:
1. Go to the terminal where the server is running.
2. Press **Ctrl + C** to stop the server.

---

> **📌 Note:** This demonstration guide covers all major features of the Food Waste Management System. The application uses AI (Google Genkit) for intelligent food categorization and Google Maps for location-based features.
