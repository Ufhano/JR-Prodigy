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

## Step 4: Authentication
- Register / login endpoints; JWT in HTTP-only cookie or Authorization header
- Auth context in React; protect dashboard routes; show Login/Register UI

After each step, we can test and then move to the next.
