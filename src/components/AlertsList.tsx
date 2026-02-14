import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import { api, type AlertItem } from "@/lib/api";

function getAlertIcon(type: string) {
  switch (type) {
    case "critical":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case "info":
      return <Info className="w-5 h-5 text-blue-500" />;
    default:
      return <Info className="w-5 h-5" />;
  }
}

function getAlertBadge(type: string) {
  switch (type) {
    case "critical":
      return <Badge className="bg-red-500 hover:bg-red-600">Critical</Badge>;
    case "warning":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>;
    case "info":
      return <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
}

export function AlertsList() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getAlerts()
      .then(setAlerts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="mb-6">Recent Alerts</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 bg-muted/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-destructive">
        <p>Failed to load alerts: {error}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="mb-6">Recent Alerts</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg"
            >
              <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">{alert.message}</p>
                  {getAlertBadge(alert.type)}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-sm text-muted-foreground">
                    Meter: {alert.meter}
                  </p>
                  <p className="text-sm text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
