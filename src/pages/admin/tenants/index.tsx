
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { mockTenants } from "./mockTenants";
import { AddOrganizationModal } from "@/components/admin/AddOrganizationModal";

const TenantsIndexPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tenants, setTenants] = useState(mockTenants);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTenants = tenants.filter(
    tenant =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.shortname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organization Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Organization</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Organizations</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization Name</TableHead>
                <TableHead>Shortname</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.shortname}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tenant.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>{tenant.userCount}</TableCell>
                  <TableCell>{tenant.subscriptionPlan}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/admin/tenants/${tenant.shortname}`}>
                        Manage
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTenants.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No organizations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddOrganizationModal
        isOpen={isAddModalOpen}
        onSave={(newOrg) => {
          // Generate a new ID for the mock tenant
          const newId = (Math.max(...tenants.map(t => parseInt(t.id))) + 1).toString();
          
          // Create a new tenant object with the form values and default values for other fields
          const newTenant = {
            id: newId,
            name: newOrg.name,
            shortname: newOrg.shortname,
            logo: null,
            primaryColor: "#3b82f6",
            status: newOrg.status,
            userCount: 0,
            subscriptionPlan: newOrg.subscriptionPlan,
            primaryContact: "",
            primaryAdminId: "",
            resourceLimits: {
              maxSites: 3,
              maxKiosks: 5,
              maxUsers: 10,
              maxVisitorsPerMonth: 500
            }
          };
          
          // TODO: POST /api/admin/tenants with newOrg
          console.log("Creating new organization:", newTenant);
          
          setTenants(prev => [...prev, newTenant]);
          setIsAddModalOpen(false);
        }}
        onCancel={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default TenantsIndexPage;
