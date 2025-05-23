import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Clock, CalendarClock, AlertTriangle } from "lucide-react";
import { TenantContext } from "@/App";

interface StatsCardsProps {
  siteId?: string;
}

export const StatsCards = ({ siteId }: StatsCardsProps = {}) => {
  const { tenantBranding } = useContext(TenantContext);
  const primaryColor = tenantBranding?.primaryColor || "#3B82F6";

  // Mock data - in a real app, this would come from an API
  // If siteId is provided, we would filter data for that specific site
  const stats = siteId ? 
    {
      // Site-specific mock data
      activeVisitors: 5, // Fewer active visitors for a specific site
      avgDuration: "28m", // Different average for the specific site
      scheduledToday: 8, // Fewer scheduled visits for a specific site
      emergencies: 0
    } : 
    {
      // Global mock data (all sites)
      activeVisitors: 14,
      avgDuration: "32m",
      scheduledToday: 26,
      emergencies: 0
    };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Active Visitors
          </CardTitle>
          <UserCheck className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold" style={{ color: primaryColor }}>
            {stats.activeVisitors}
          </div>
          <p className="text-xs text-gray-500">{siteId ? "On-site now" : "On-site right now"}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Avg. Visit Duration
          </CardTitle>
          <Clock className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold" style={{ color: primaryColor }}>
            {stats.avgDuration}
          </div>
          <p className="text-xs text-gray-500">Today's average</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Scheduled Today
          </CardTitle>
          <CalendarClock className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold" style={{ color: primaryColor }}>
            {stats.scheduledToday}
          </div>
          <p className="text-xs text-gray-500">Upcoming appointments</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Emergency Alerts
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-500">
            {stats.emergencies}
          </div>
          <p className="text-xs text-gray-500">No active emergencies</p>
        </CardContent>
      </Card>
    </div>
  );
};
