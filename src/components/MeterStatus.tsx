import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Droplets } from "lucide-react";
import { api, type MeterItem } from "@/lib/api";

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
  const [meters, setMeters] = useState<MeterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getMeters()
      .then(setMeters)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="mb-6">Water Meter Status</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-destructive">
        <p>Failed to load meters: {error}</p>
      </Card>
    );
  }

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
