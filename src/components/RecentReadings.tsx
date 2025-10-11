import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Reading {
  meterId: string;
  location: string;
  timestamp: string;
  consumption: number;
  flowRate: number;
}

const readings: Reading[] = [
  {
    meterId: "WM-1001",
    location: "Building A - Floor 3",
    timestamp: "2025-10-11 09:45",
    consumption: 1245,
    flowRate: 12.5,
  },
  {
    meterId: "WM-1002",
    location: "Building B - Floor 1",
    timestamp: "2025-10-11 09:42",
    consumption: 987,
    flowRate: 9.8,
  },
  {
    meterId: "WM-1006",
    location: "Building B - Floor 3",
    timestamp: "2025-10-11 09:41",
    consumption: 1543,
    flowRate: 15.2,
  },
  {
    meterId: "WM-1004",
    location: "Building A - Floor 1",
    timestamp: "2025-10-11 09:38",
    consumption: 765,
    flowRate: 7.6,
  },
  {
    meterId: "WM-1008",
    location: "Building E - Floor 2",
    timestamp: "2025-10-11 09:35",
    consumption: 892,
    flowRate: 8.9,
  },
];

export function RecentReadings() {
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
