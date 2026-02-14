import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Droplets, Activity, AlertTriangle } from "lucide-react";
import { api, type StatItem } from "@/lib/api";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground mb-2">{title}</p>
          <h3 className="mb-1">{value}</h3>
          <p
            className={`text-sm ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </p>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">{icon}</div>
      </div>
    </Card>
  );
}

const iconByTitle: Record<string, React.ReactNode> = {
  "Total Water Meters": <Droplets className="w-6 h-6 text-primary" />,
  "Active Connections": <Activity className="w-6 h-6 text-primary" />,
  "Total Consumption": <Droplets className="w-6 h-6 text-primary" />,
  "Active Alerts": <AlertTriangle className="w-6 h-6 text-primary" />,
};

export function StatsCards() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getStats()
      .then((data) => setStats(data.stats))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-muted rounded w-2/3 mb-2" />
            <div className="h-8 bg-muted rounded w-1/2 mb-1" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-destructive">
        <p>Failed to load stats: {error}</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          icon={iconByTitle[stat.title] ?? <Droplets className="w-6 h-6 text-primary" />}
        />
      ))}
    </div>
  );
}
