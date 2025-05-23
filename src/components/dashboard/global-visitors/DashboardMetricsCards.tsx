
import { Card, CardContent } from "@/components/ui/card";
import { SiteVisitor } from "@/models/kiosk";

interface DashboardMetricsCardsProps {
  visitors: SiteVisitor[];
  sites: any[];
}

export const DashboardMetricsCards = ({ visitors, sites }: DashboardMetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{visitors.length}</div>
          <div className="text-sm text-gray-500">Total Visitors Today</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{visitors.filter(v => v.status === "active").length}</div>
          <div className="text-sm text-gray-500">Currently Active</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{sites.length}</div>
          <div className="text-sm text-gray-500">Active Sites</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">
            {Math.round(visitors.filter(v => v.status === "active").length / sites.length)}
          </div>
          <div className="text-sm text-gray-500">Avg Visitors per Site</div>
        </CardContent>
      </Card>
    </div>
  );
};
