import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { api, type ReadingItem } from "@/lib/api";

export function RecentReadings() {
  const [readings, setReadings] = useState<ReadingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getReadings()
      .then(setReadings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="mb-6">Recent Meter Readings</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-muted/50 rounded animate-pulse" />
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-destructive">
        <p>Failed to load readings: {error}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="mb-6">Recent Meter Readings</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meter ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Consumption (L)</TableHead>
              <TableHead className="text-right">Flow Rate (L/min)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readings.map((reading) => (
              <TableRow key={reading.meterId + reading.timestamp}>
                <TableCell className="font-medium">{reading.meterId}</TableCell>
                <TableCell>{reading.location}</TableCell>
                <TableCell>{reading.timestamp}</TableCell>
                <TableCell className="text-right">
                  {reading.consumption.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">{reading.flowRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
