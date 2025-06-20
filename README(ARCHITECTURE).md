# 🛠️ Project Architecture Description

This document explains how our project is organized behind the scenes to make it **easy to maintain, update, and scale** as it grows. It breaks down the purpose of each main folder and how they work together to deliver a robust, modular application.

---

## Project Structure Overview

### Components: Reusable Visual Elements

The `components/` folder holds **small, reusable UI parts** that appear all over the app. These focus purely on **how things look** and behave visually, without containing any business logic or data fetching.

- **Purpose:** Visual building blocks used in many places.
- **Examples:**
  - `Button.jsx` — a customizable button used everywhere
  - `Navbar.jsx` — the top navigation bar
  - `ProductCard.jsx` — shows product info in a list or grid

> **Note:** These components do NOT connect directly to data or include app-specific rules. They only display UI.

---

### Features: Domain-Specific Logic and UI

The `features/` folder organizes code around **specific parts of the app’s functionality**. Each feature is like a mini-app that manages its own UI, logic, and data interactions.

- **Purpose:** Handle everything related to one topic or domain.
- **Examples:**
  - `features/auth/` — user login, signup, logout, session management
  - `features/products/` — creating, viewing, and managing products
  - `features/cart/` — shopping cart UI and logic

Each feature typically includes:

- **Main view components** (e.g., `CartPage.jsx`)
- **Service files** that interact with backend or Firebase (e.g., `cartService.js`)
- **Custom hooks** to share reusable feature-specific logic (e.g., `useCart.js`)

> **Example:** In `features/auth/`, a hook like `useAuth.js` could handle checking if a user is logged in or not, and provide helper functions to components.

---

### Pages: Full Application Screens and Routes

The `pages/` folder contains files representing **full pages or routes** users visit, combining multiple features and components into a complete screen.

- **Purpose:** Assemble UI for each screen users see in the browser.
- **Examples:**
  - `HomePage.jsx` — the landing page combining featured products, banners, etc.
  - `ProductDetailPage.jsx` — detailed view for a specific product
  - `CartPage.jsx` — displays current cart items and checkout options

Pages bring features and components together and handle things like **routing and conditional rendering** (e.g., showing different UI for logged-in users vs guests).

---

### Services: Backend Setup and API Layer

The `services/` folder contains code responsible for **connecting the app to external systems**, like Firebase.

- **Purpose:** Handle technical details of data fetching and backend communication.
- **Examples:**
  - `firebase.js` — initializes Firebase, sets up authentication and database clients
  - `authService.js` — wraps Firebase Auth calls for registering, signing in, etc.
  - `productService.js` — handles Firestore calls to add, fetch, or update products

> **Important:** Services don’t include app-specific rules — they just provide **generic functions** for accessing data or APIs.

---

### Separation of Concerns: Features vs Services

- **Services** provide **low-level access** to APIs or databases.
- **Features** implement **business logic and workflows** — for example, validating user input, deciding what happens on a button click, or combining multiple service calls.

> **Example:**  
> In `features/auth/`, a function might check if the user typed the same password twice before calling the `register` function from `authService.js`.

---

### Hooks: Reusable Logic Functions Inside Features

**Custom React hooks** are reusable functions that handle common logic or data fetching inside features.

- **Purpose:** Keep feature-specific logic organized and reusable.
- **Examples:**
  - `useAuth.js` inside `features/auth/` to manage user session and provide auth helpers.
  - `useProducts.js` inside `features/products/` to fetch product lists and manage filters.

Hooks help keep components clean by moving complex logic out into reusable pieces.

---

### Contexts: Shared Global State Across the App

The `contexts/` folder contains React Context providers that share **global state** accessible by many parts of the app, avoiding “prop drilling” (passing data through many layers).

- **Purpose:** Share important data like logged-in user info or shopping cart contents app-wide.
- **Examples:**
  - `AuthContext.jsx` — provides current user data and auth status everywhere.
  - `CartContext.jsx` — manages cart items and totals across all pages.

> These contexts wrap your app in `main.jsx` so any component or feature can access or update shared data.

---

### App Entry Points

- **`App.jsx`**  
  Defines the main application structure, routes, and controls access (e.g., guest vs. signed-in views).

- **`main.jsx`**  
  The app’s starting point, which renders `App.jsx` wrapped inside all necessary context providers (like Auth and Cart contexts).

---

## Why This Architecture?

- **Clear Organization:** Each part of the code has a specific place, making it easy to understand and update.
- **Modular:** You can add, remove, or change features independently without breaking other parts.
- **Scalable:** The structure supports future growth and new features without becoming messy.
- **Readable:** Even new developers or those less familiar with React can quickly find what they need.

---

Feel free to ask for a detailed walkthrough or demo of how all these pieces work together!
