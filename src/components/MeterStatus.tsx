import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Droplets } from "lucide-react";

interface Meter {
  id: string;
  location: string;
  status: "active" | "warning" | "offline";
  lastReading: string;
  consumption: number;
}

const meters: Meter[] = [
  {
    id: "WM-1001",
    location: "Building A - Floor 3",
    status: "active",
    lastReading: "2 min ago",
    consumption: 1245,
  },
  {
    id: "WM-1002",
    location: "Building B - Floor 1",
    status: "active",
    lastReading: "5 min ago",
    consumption: 987,
  },
  {
    id: "WM-1003",
    location: "Building C - Floor 2",
    status: "warning",
    lastReading: "1 hour ago",
    consumption: 2134,
  },
  {
    id: "WM-1004",
    location: "Building A - Floor 1",
    status: "active",
    lastReading: "3 min ago",
    consumption: 765,
  },
  {
    id: "WM-1005",
    location: "Building D - Floor 4",
    status: "offline",
    lastReading: "2 days ago",
    consumption: 0,
  },
  {
    id: "WM-1006",
    location: "Building B - Floor 3",
    status: "active",
    lastReading: "1 min ago",
    consumption: 1543,
  },
  {
    id: "WM-1007",
    location: "Building C - Floor 1",
    status: "warning",
    lastReading: "45 min ago",
    consumption: 3241,
  },
  {
    id: "WM-1008",
    location: "Building E - Floor 2",
    status: "active",
    lastReading: "4 min ago",
    consumption: 892,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
    case "warning":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>;
    case "offline":
      return <Badge className="bg-red-500 hover:bg-red-600">Offline</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
}

export function MeterStatus() {
  return (
    <Card className="p-6">
      <h3 className="mb-6">Water Meter Status</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {meters.map((meter) => (
            <div
              key={meter.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-background rounded">
                  <Droplets className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{meter.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {meter.location}
                  </p>
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="font-medium">{meter.consumption} L</p>
                  <p className="text-sm text-muted-foreground">
                    {meter.lastReading}
                  </p>
                </div>
                {getStatusBadge(meter.status)}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
