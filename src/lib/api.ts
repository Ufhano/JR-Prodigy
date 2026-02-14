const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const TOKEN_KEY = "jr_prodigy_token";

async function fetchApi<T>(path: string): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { headers });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export interface StatsResponse {
  stats: StatItem[];
}

export interface MeterItem {
  id: string;
  location: string;
  status: "active" | "warning" | "offline";
  lastReading: string;
  consumption: number;
}

export interface ReadingItem {
  meterId: string;
  location: string;
  timestamp: string;
  consumption: number;
  flowRate: number;
}

export interface AlertItem {
  id: string;
  type: "critical" | "warning" | "info";
  message: string;
  meter: string;
  time: string;
}

export interface DailyChartPoint {
  date: string;
  consumption: number;
  target: number;
}

export interface ZoneChartPoint {
  zone: string;
  consumption: number;
  meters: number;
}

export const api = {
  getStats: () => fetchApi<StatsResponse>("/api/stats"),
  getMeters: () => fetchApi<MeterItem[]>("/api/meters"),
  getReadings: (limit = 20) => fetchApi<ReadingItem[]>(`/api/readings?limit=${limit}`),
  getAlerts: (limit = 50) => fetchApi<AlertItem[]>(`/api/alerts?limit=${limit}`),
  getChartsDaily: (days = 7) => fetchApi<DailyChartPoint[]>(`/api/charts/daily?days=${days}`),
  getChartsZones: () => fetchApi<ZoneChartPoint[]>("/api/charts/zones"),
};
