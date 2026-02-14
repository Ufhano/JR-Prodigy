# JR Prodigy → MERN Stack Migration (Step by Step)

## Current state
- **Frontend:** React + Vite (port 3000)
- **Data:** All hardcoded in components (stats, meters, alerts, readings, charts)
- **Auth:** None

## Target: MERN + real data + authentication

| Step | What we do |
|------|------------|
| **Step 1** | Add Node + Express backend, MongoDB connection, and API folder structure |
| **Step 2** | Define MongoDB models (Meter, Reading, Alert, User) and seed real data; create REST endpoints |
| **Step 3** | Connect React app to backend (env, fetch/axios, replace hardcoded data with API calls) |
| **Step 4** | Add authentication (register/login, JWT, protected routes, auth context) |

---

## Step 1 (current): Backend foundation
- `server/` with Express + MongoDB
- Health check and placeholder API routes
- Run: `cd server && npm install && npm run dev` (backend on port 5000)

## Step 2: Models & real data ✅
- Mongoose models: User, Meter, Reading, Alert
- Seed script: `npm run seed` in `server/`
- APIs: GET /api/stats, /api/meters, /api/readings, /api/alerts, /api/charts/daily, /api/charts/zones

## Step 3: Frontend → API ✅
- `VITE_API_URL=http://localhost:5000` in `.env` (see `.env.example`)
- `src/lib/api.ts` – API client; dashboard components fetch real data
- StatsCards, MeterStatus, AlertsList, RecentReadings, UsageCharts use API + loading/error states

## Step 4: Authentication ✅
- **Backend:** POST /api/auth/register, POST /api/auth/login, GET /api/auth/google, GET /api/auth/google/callback, GET /api/auth/me. JWT in Authorization header. Dashboard API (stats, meters, readings, alerts, charts) requires auth.
- **Frontend:** Login & Register pages (email + password + “Sign in with Google”). Auth context, protected dashboard, logout in header.
- **Google OAuth:** Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in server/.env (see server/.env.example). Create OAuth 2.0 credentials at https://console.cloud.google.com/apis/credentials and set redirect URI to `http://localhost:5000/api/auth/google/callback` (or your API_URL + path).

After each step, we can test and then move to the next.
