
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  Home,
  Download,
  Megaphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Muster = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [evacuationTime, setEvacuationTime] = useState<Date | null>(null);
  const { toast } = useToast();

  const onSitePersonnel = [
    { name: "Sarah Johnson", type: "Visitor", host: "John Smith", location: "Building A", status: "Safe", checkedOut: false },
    { name: "Michael Chen", type: "Visitor", host: "Emily Davis", location: "Building B", status: "Unknown", checkedOut: false },
    { name: "Anna Williams", type: "Visitor", host: "David Wilson", location: "Building A", status: "Safe", checkedOut: false },
    { name: "Robert Brown", type: "Visitor", host: "Lisa Anderson", location: "Building C", status: "Unknown", checkedOut: false },
    { name: "John Smith", type: "Employee", host: "-", location: "Building A", status: "Safe", checkedOut: false },
    { name: "Emily Davis", type: "Employee", host: "-", location: "Building B", status: "Safe", checkedOut: false },
    { name: "David Wilson", type: "Employee", host: "-", location: "Building A", status: "Safe", checkedOut: false },
    { name: "Lisa Anderson", type: "Employee", host: "-", location: "Building C", status: "Unknown", checkedOut: false }
  ];

  const stats = {
    totalOnSite: onSitePersonnel.length,
    visitors: onSitePersonnel.filter(p => p.type === "Visitor").length,
    employees: onSitePersonnel.filter(p => p.type === "Employee").length,
    safe: onSitePersonnel.filter(p => p.status === "Safe").length,
    unknown: onSitePersonnel.filter(p => p.status === "Unknown").length
  };

  const handleEmergencyActivation = () => {
    setEmergencyActive(true);
    setEvacuationTime(new Date());
    toast({
      title: "Emergency Activated",
      description: "Evacuation alert has been sent to all personnel",
      variant: "destructive",
    });
  };

  const handleExportMusterList = () => {
    toast({
      title: "Muster List Exported",
      description: "CSV file downloaded for first responders",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
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
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/checkin">
                <Button variant="ghost">Check In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Emergency Muster</h1>
          </div>
          <p className="text-gray-600">Real-time personnel tracking and evacuation management</p>
        </div>

        {/* Emergency Status Alert */}
        {emergencyActive && (
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>EMERGENCY EVACUATION ACTIVE</strong> - Activated at {evacuationTime?.toLocaleTimeString()}. 
              All personnel have been notified to evacuate immediately.
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total On Site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOnSite}</div>
              <div className="flex items-center mt-1">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">All personnel</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.visitors}</div>
              <div className="text-sm opacity-90">Guest personnel</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.employees}</div>
              <div className="text-sm opacity-90">Staff members</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Confirmed Safe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.safe}</div>
              <div className="flex items-center mt-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">Accounted for</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Unknown Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unknown}</div>
              <div className="flex items-center mt-1">
                <XCircle className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">Need update</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {!emergencyActive ? (
            <Button 
              onClick={handleEmergencyActivation}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="lg"
            >
              <Megaphone className="h-5 w-5 mr-2" />
              ACTIVATE EMERGENCY EVACUATION
            </Button>
          ) : (
            <Button 
              onClick={() => setEmergencyActive(false)}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              ALL CLEAR - Deactivate Emergency
            </Button>
          )}
          
          <Button 
            onClick={handleExportMusterList}
            variant="outline"
            size="lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Export Muster List
          </Button>
        </div>

        {/* Personnel List */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Personnel On Site</CardTitle>
            <CardDescription>
              Real-time status of all visitors and employees currently in the building
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Host/Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {onSitePersonnel.map((person, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{person.name}</td>
                      <td className="py-3 px-4">
                        <Badge variant={person.type === "Visitor" ? "secondary" : "default"}>
                          {person.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{person.host}</td>
                      <td className="py-3 px-4 text-gray-600">{person.location}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={person.status === "Safe" ? "default" : "destructive"}
                          className={person.status === "Safe" ? "bg-green-100 text-green-800" : ""}
                        >
                          {person.status === "Safe" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {person.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="outline">
                          Update Status
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                <span className="font-medium">Fire Department</span>
                <Badge className="bg-red-600">911</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="font-medium">Building Security</span>
                <Badge className="bg-blue-600">(555) 123-4567</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="font-medium">Facility Manager</span>
                <Badge className="bg-green-600">(555) 987-6543</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Evacuation Status</CardTitle>
            </CardHeader>
            <CardContent>
              {emergencyActive ? (
                <div className="space-y-3">
                  <div className="flex items-center text-red-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Evacuation time: {evacuationTime?.toLocaleTimeString()}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>✓ All personnel notified via SMS, email, and PA system</p>
                    <p>✓ Building access systems locked down</p>
                    <p>✓ Emergency services contacted</p>
                    <p>✓ Muster points activated</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No active emergency</p>
                  <p className="text-sm">All systems normal</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Muster;
