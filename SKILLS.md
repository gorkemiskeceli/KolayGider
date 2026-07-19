# Tech Stack & Implementation Guidelines for KolayGider

## Core Technologies
- **Framework:** React 18+, Vite
- **Styling:** Tailwind CSS (Mobile-First Utility Classes)
- **State Management:** Redux Toolkit (@reduxjs/toolkit, react-redux)
- **Icons:** Lucide React (`lucide-react`)
- **Backend Mock:** `json-server` (`db.json`)
- **PWA Tooling:** `vite-plugin-pwa`

## Coding Standards & Conventions

### 1. Multi-Tenant Data Isolation (CRITICAL)
- Store logged-in business's `businessId` in Redux `authSlice`.
- All HTTP requests for expenses MUST include `?businessId=${currentBusinessId}` parameter to prevent cross-tenant data leakage.
- Business owners MUST NOT have access to Super Admin routes (`/admin/*`).

### 2. Mobile-First Styling Rules
- Always style for screens `< 640px` first, then add `sm:`, `md:`, `lg:` breakpoints.
- Mobile view (`< 640px`) must display a fixed **Bottom Navigation Bar** (`fixed bottom-0`) and Floating Action Button (FAB) for fast entry.
- Desktop view (`>= 640px`) must toggle to a persistent **Sidebar Navigation**.

### 3. Redux State Architecture
- Avoid global mutable states. Use RTK slices with `createSlice`.
- Async operations MUST use `createAsyncThunk`.
- Slices needed:
  - `authSlice`: Manages current logged-in user context and role (`SUPER_ADMIN` vs `BUSINESS_OWNER`).
  - `businessSlice`: Super admin CRUD operations for business tenants.
  - `expenseSlice`: Tenant CRUD operations, filtering, and sorting for expenses.
  - `categorySlice`: Manages default and custom expense categories.

### 4. API Integration Standard
- Base API URL: `http://localhost:3000`
- Use RESTful endpoints provided by `json-server`.