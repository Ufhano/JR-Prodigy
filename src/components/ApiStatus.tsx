import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function ApiStatus({
  children,
}: {
  children: React.ReactNode;
}) {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((r) => r.ok)
      .then(setOnline)
      .catch(() => setOnline(false));
  }, []);

  if (online === null) return <>{children}</>;
  if (online) return <>{children}</>;

  return (
    <Card className="p-6 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800">
      <div className="flex gap-3">
        <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-800 dark:text-amber-200">
            Can&apos;t connect to the API
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
            The dashboard needs the backend server and MongoDB to be running.
          </p>
          <ol className="text-sm text-amber-700 dark:text-amber-300 mt-3 list-decimal list-inside space-y-1">
            <li>Start MongoDB (or use Atlas and set <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">MONGO_URI</code> in <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">server/.env</code>).</li>
            <li>In <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">server/</code> run: <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">npm run seed</code> then <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">npm run dev</code>.</li>
          </ol>
        </div>
      </div>
    </Card>
  );
}
