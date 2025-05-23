
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Users, 
  Shield, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  FileText,
  Calendar,
  Home,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const todayStats = {
    checkedIn: 47,
    preRegistered: 23,
    onSite: 15,
    expired: 8
  };

  const recentVisitors = [
    { name: "Sarah Johnson", company: "Tech Corp", host: "John Smith", time: "2:30 PM", status: "On Site" },
    { name: "Michael Chen", company: "Design Co", host: "Emily Davis", time: "1:45 PM", status: "Checked Out" },
    { name: "Anna Williams", company: "Consulting LLC", host: "David Wilson", time: "11:20 AM", status: "On Site" },
    { name: "Robert Brown", company: "Finance Group", host: "Lisa Anderson", time: "10:15 AM", status: "On Site" }
  ];

  const alerts = [
    { type: "warning", message: "3 visitors have exceeded their scheduled time", time: "5 min ago" },
    { type: "info", message: "Badge printer #2 needs paper refill", time: "15 min ago" },
    { type: "success", message: "Weekly security report generated", time: "1 hour ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">VisitorOS</span>
            </Link>
            <div className="flex space-x-4">
              <Link to="/">
                <Button variant="ghost">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/checkin">
                <Button variant="ghost">Check In</Button>
              </Link>
              <Link to="/muster">
                <Button variant="ghost">Emergency</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor visitor activity and manage your facility</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Checked In Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.checkedIn}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">+12% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Currently On Site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.onSite}</div>
              <div className="flex items-center mt-1">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">Active visitors</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Pre-Registered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.preRegistered}</div>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">Upcoming visits</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Expired Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.expired}</div>
              <div className="flex items-center mt-1">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">Need attention</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="visitors" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="visitors">Recent Visitors</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="visitors">
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Recent Visitor Activity</CardTitle>
                <CardDescription>Latest check-ins and current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentVisitors.map((visitor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{visitor.name}</div>
                        <div className="text-sm text-gray-600">{visitor.company} • Host: {visitor.host}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{visitor.time}</div>
                        <Badge 
                          variant={visitor.status === "On Site" ? "default" : "secondary"}
                          className={visitor.status === "On Site" ? "bg-green-100 text-green-800" : ""}
                        >
                          {visitor.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important notifications and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                        alert.type === 'warning' ? 'text-orange-500' : 
                        alert.type === 'info' ? 'text-blue-500' : 'text-green-500'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">{alert.message}</div>
                        <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                  <CardDescription>Busiest times of the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">9:00 - 10:00 AM</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-sm text-gray-600">17 visitors</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1:00 - 2:00 PM</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
                        </div>
                        <span className="text-sm text-gray-600">14 visitors</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">3:00 - 4:00 PM</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                        </div>
                        <span className="text-sm text-gray-600">12 visitors</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Daily Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Bulk Pre-Register Visitors
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Badge Templates
                  </Button>
                  <Link to="/muster">
                    <Button className="w-full justify-start bg-red-600 hover:bg-red-700 text-white">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Emergency Muster
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
