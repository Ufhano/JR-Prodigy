import { StatsCards } from "./StatsCards";
import { UsageCharts } from "./UsageCharts";
import { MeterStatus } from "./MeterStatus";
import { AlertsList } from "./AlertsList";
import { RecentReadings } from "./RecentReadings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <section>
        <StatsCards />
      </section>

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="meters">Meters</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts */}
          <section>
            <UsageCharts />
          </section>

          {/* Recent Readings */}
          <section>
            <RecentReadings />
          </section>
        </TabsContent>

        <TabsContent value="meters" className="space-y-6">
          <MeterStatus />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <AlertsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
