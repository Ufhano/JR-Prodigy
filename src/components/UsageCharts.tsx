import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
} from 'recharts';

const dailyData = [
  { date: 'Oct 5', consumption: 42000, target: 45000 },
  { date: 'Oct 6', consumption: 38000, target: 45000 },
  { date: 'Oct 7', consumption: 44000, target: 45000 },
  { date: 'Oct 8', consumption: 41000, target: 45000 },
  { date: 'Oct 9', consumption: 39000, target: 45000 },
  { date: 'Oct 10', consumption: 43000, target: 45000 },
  { date: 'Oct 11', consumption: 40000, target: 45000 },
];

const zoneData = [
  { zone: 'Zone A', consumption: 125000, meters: 342 },
  { zone: 'Zone B', consumption: 98000, meters: 287 },
  { zone: 'Zone C', consumption: 156000, meters: 421 },
  { zone: 'Zone D', consumption: 108000, meters: 197 },
];

export function UsageCharts() {
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
