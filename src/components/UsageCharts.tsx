import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { api, type DailyChartPoint, type ZoneChartPoint } from "@/lib/api";

export function UsageCharts() {
  const [dailyData, setDailyData] = useState<DailyChartPoint[]>([]);
  const [zoneData, setZoneData] = useState<ZoneChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.getChartsDaily(7), api.getChartsZones()])
      .then(([daily, zones]) => {
        setDailyData(daily);
        setZoneData(zones);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 h-[380px] animate-pulse" />
        <Card className="p-6 h-[380px] animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-destructive">
        <p>Failed to load charts: {error}</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="mb-6">Daily Water Consumption</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#220ca0ff"
              strokeWidth={2}
              name="Consumption (L)"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#717182"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target (L)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="mb-6">Consumption by Zone</h3>
        <ResponsiveContainer width="55%" height={300}>
          <BarChart data={zoneData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="zone" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="consumption" fill="#2563eb" name="Consumption (L)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
