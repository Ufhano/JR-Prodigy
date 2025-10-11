import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  message: string;
  meter: string;
  time: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    message: "Abnormal flow rate detected",
    meter: "WM-1005",
    time: "5 min ago",
  },
  {
    id: "2",
    type: "warning",
    message: "High consumption threshold reached",
    meter: "WM-1007",
    time: "15 min ago",
  },
  {
    id: "3",
    type: "info",
    message: "Scheduled maintenance required",
    meter: "WM-1003",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "critical",
    message: "Connection lost",
    meter: "WM-1005",
    time: "2 hours ago",
  },
  {
    id: "5",
    type: "warning",
    message: "Battery low",
    meter: "WM-1012",
    time: "3 hours ago",
  },
  {
    id: "6",
    type: "info",
    message: "Firmware update available",
    meter: "WM-1001",
    time: "5 hours ago",
  },
];

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
