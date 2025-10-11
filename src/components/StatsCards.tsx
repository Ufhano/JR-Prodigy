import { Card } from "./ui/card";
import { Droplets, Activity, AlertTriangle, Users } from "lucide-react";

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

export function StatsCards() {
  const stats = [
    {
      title: "Total Water Meters",
      value: "1,247",
      change: "+12% from last month",
      icon: <Droplets className="w-6 h-6 text-primary" />,
      trend: "up" as const,
    },
    {
      title: "Active Connections",
      value: "1,189",
      change: "+8% from last month",
      icon: <Activity className="w-6 h-6 text-primary" />,
      trend: "up" as const,
    },
    {
      title: "Total Consumption",
      value: "487,234 L",
      change: "-3% from last month",
      icon: <Droplets className="w-6 h-6 text-primary" />,
      trend: "down" as const,
    },
    {
      title: "Active Alerts",
      value: "23",
      change: "+5 new today",
      icon: <AlertTriangle className="w-6 h-6 text-primary" />,
      trend: "up" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
