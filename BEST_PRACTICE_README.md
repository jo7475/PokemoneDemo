# 🏗 Project Architecture & Best Practices Guide

This repository serves as a gold standard template for React Native projects (specifically utilizing **React Native Paper** and **NativeWind**). It embraces modularity, performance, clean architecture, and excellent UX.

---

## 📂 1. Directory & File Structure (Separation of Concerns)

Our architecture physically separates **UI presentation**, **styling**, **state logic**, and **data fetching**. This ensures that components remain feather-light, readable, and highly reusable.

### **The Atom Rule**
We strictly break down our UI into the smallest, most reusable pieces. Each component lives in its own dedicated directory and only concerns itself with one specific responsibility. 

Example (`src/components/badge/`):
- `index.ts`: The entry point that simply exports the component (keeps imports clean elsewhere).
- `main.tsx`: The pure UI logic and JSX structure. Offloads heavy state logic to custom hooks.
- `styles.ts` (or simply NativeWind `className`s): Contains the component's specific styling rules. 

*Rule of thumb: If a component is growing too large, it contains smaller UI atoms that should be extracted.*

---

## 🎨 2. UI Consistency & Theming 

We strictly stick to a centralized theme to enforce UI consistency across every screen, ensuring the user gets a seamless and premium feel.

- **React Native Paper:** Used for robust, accessible UI primitives (buttons, inputs, surface areas).
- **NativeWind:** We use utility classes to handle spacing, typography, and responsive variants. We strictly adhere to our tailwind configuration theme variables (e.g., `text-primary`, `bg-background`). 
- *We do not use ad-hoc hex codes or magic numbers scattered in the code.* Everything derives from the centralized design system.

---

## ⚡️ 3. Data Fetching, Caching, & State Management

Our data layer is completely decoupled from the UI.

- **RTK Query / API Services (`src/store/api/`):** All fetching operations are wrapped in services that automatically give us caching, polling, and background background updates.
- **Lightweight Components:** A component should never perform raw `fetch` or `axios` calls directly. It simply subscribes to a hook (e.g., `useSubscribeToMatchesQuery()`) and instantly gets `data`, `isLoading`, and `isError` descriptors.
- **Lazy Loading & Pagination:** For efficient memory usage, data is lazy-loaded using cursors as the user scrolls. Custom aggregator hooks (like `usePageAggregator`) manage cursor tracking and appending data safely, meaning we never over-fetch data unnecessarily.

---

## 🛡 4. UX: Loading, Success, & Error Handling

Communicating state smoothly to the user is vital for a good UX. 
By utilizing our data fetching hooks, we have standardized how we show UI states:

- **Loading:** We use global centralized loaders (like `TintedLoader`) or localized skeleton loaders. 
- **Error Handling:** Fallback error boundaries and toast messages clearly and safely communicate when something fails, offering graceful recoveries instead of blank screens.
- **Success:** Actions confirm with standard, non-intrusive UI feedback (snackbars/toasts).

This approach means users everywhere in the app receive the exact same feeling and communication mechanism.

---

## 🔒 5. Type Safety (TypeScript)

We treat `any` as an anti-pattern. Everything from the API payload (e.g., `Match`, `User`) down to the smallest component `Props` is strongly typed. 

- Enforcing deep typesafety prevents entire classes of runtime errors.
- We map our backend responses via transformation utilities before passing the entity structures down to the UI.

---

## 🔤 6. Clean Code & Naming Conventions

- **Variable / Function Names:** Must be extremely descriptive and self-explanatory (e.g. `transformToMatchedUser`, `toggleAllMatchesFetched`).
- **No Comments (Unless Critical):** We believe the code should read like plain English. Comments should almost **never** explain *what* the code is doing—the variable names and types should do that. Comments are strictly reserved for explaining *why* a particular piece of complex or unconventional business logic exists.
- **Hook Prefix:** All custom logic extraction is prefixed with `use-` (e.g., `use-current-user`).

---

## 🧪 7. Minor Testing Setup

Testing is an embedded safety net:
- Critical UI logic and hooks should have accompanying `.test.tsx` files.
- We mock our data stores appropriately and verify the exact behaviors in isolated environments before deployment.