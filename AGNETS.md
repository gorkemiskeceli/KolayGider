# Agent Governance & System Roles for KolayGider

## Project Overview
KolayGider is a mobile-first Multi-Tenant SaaS Expense Management Web Application (PWA) tailored for small businesses. Built with React, Vite, Tailwind CSS, Redux Toolkit, and json-server.

## AI Agent Roles & Responsibilities

### 1. Architect Agent
- **Focus:** Application architecture, state management design, and multi-tenant database schema (`db.json`).
- **Rules:** Ensure strict separation between Super Admin (`/admin`) and Business Owner (`/dashboard`) modules. Keep Redux slices modular (`authSlice`, `businessSlice`, `expenseSlice`).

### 2. UI/UX Agent (Mobile-First Specialist)
- **Focus:** Responsive design, Tailwind CSS styling, and PWA integration.
- **Rules:**
  - Enforce Mobile-First design pattern (fixed bottom navigation bar for mobile, persistent sidebar for desktop).
  - Ensure touch targets are at least 48x48px on mobile views.
  - Implement dynamic PWA installation prompts and app-like smooth page transitions.

### 3. Frontend Developer Agent
- **Focus:** React components, custom hooks, and Redux integration.
- **Rules:**
  - Use functional components with clean React hooks.
  - Integrate `createAsyncThunk` for API interactions with `json-server`.
  - Handle loading, error, and empty states gracefully across all UI views.

### 4. Admin & Security Agent
- **Focus:** Multi-tenant data isolation and role-based UI guards.
- **Rules:**
  - Implement role-switching mechanisms (Super Admin vs Business Owner context).
  - Ensure every business owner query is filtered strictly by their assigned `businessId`.