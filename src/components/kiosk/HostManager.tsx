
// No TODOs found in this file

import { useState } from "react";
import { Host } from "@/models/kiosk";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Trash2, Upload, Search } from "lucide-react";

interface HostManagerProps {
  siteId: string;
  hosts: Host[];
}

export const HostManager = ({
  siteId,
  hosts: initialHosts
}: HostManagerProps) => {
  const [hosts, setHosts] = useState<Host[]>(initialHosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentHost, setCurrentHost] = useState<Host | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const [csvContent, setCsvContent] = useState("");

  const handleOpenDialog = (host?: Host) => {
    if (host) {
      setCurrentHost({...host});
    } else {
      setCurrentHost({
        id: "",
        name: "",
        email: "",
        phone: "",
        department: ""
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentHost(null);
  };

  const handleSaveHost = () => {
    if (!currentHost || !currentHost.name || !currentHost.email) return;

    // Create a valid ID if not present
    const hostId = currentHost.id || `host-${Date.now()}`;
    
    const updatedHost = {
      ...currentHost,
      id: hostId
    };

    if (hosts.some(h => h.id === updatedHost.id)) {
      // Update existing host
      setHosts(hosts.map(h => h.id === updatedHost.id ? updatedHost : h));
    } else {
      // Add new host
      setHosts([...hosts, updatedHost]);
    }
    
    handleCloseDialog();
  };

  const handleDeleteHost = (id: string) => {
    setHosts(hosts.filter(h => h.id !== id));
  };

  const handleImportCSV = () => {
    // Basic CSV parsing
    try {
      const lines = csvContent.trim().split('\n');
      if (lines.length === 0) return;
      
      // Get headers
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const nameIndex = headers.indexOf('name');
      const emailIndex = headers.indexOf('email');
      const phoneIndex = headers.indexOf('phone');
      const departmentIndex = headers.indexOf('department');
      
      if (nameIndex === -1 || emailIndex === -1) {
        alert('CSV must have name and email columns');
        return;
      }
      
      // Parse rows
      const newHosts: Host[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        
        if (values.length < 2) continue; // Skip empty lines
        
        const host: Host = {
          id: `host-${Date.now()}-${i}`,
          name: values[nameIndex] || '',
          email: values[emailIndex] || '',
          phone: phoneIndex > -1 ? values[phoneIndex] || '' : '',
          department: departmentIndex > -1 ? values[departmentIndex] || '' : ''
        };
        
        if (host.name && host.email) {
          newHosts.push(host);
        }
      }
      
      // Add new hosts
      setHosts([...hosts, ...newHosts]);
      setCsvDialogOpen(false);
      setCsvContent("");
    } catch (error) {
      console.error('Error parsing CSV', error);
      alert('Error parsing CSV. Please check the format.');
    }
  };

  const filteredHosts = hosts.filter(host => {
    const query = searchQuery.toLowerCase();
    return (
      host.name.toLowerCase().includes(query) ||
      host.email.toLowerCase().includes(query) ||
      host.department?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Hosts</h2>
          <p className="text-sm text-gray-500">
            Manage the available hosts for visitors to select
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setCsvDialogOpen(true)} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Host
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search hosts by name, email or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    {hosts.length === 0 
                      ? "No hosts added yet. Add hosts individually or import from CSV."
                      : "No hosts match your search query."
                    }
                  </TableCell>
                </TableRow>
              ) : (
                filteredHosts.map((host) => (
                  <TableRow key={host.id}>
                    <TableCell className="font-medium">{host.name}</TableCell>
                    <TableCell>{host.email}</TableCell>
                    <TableCell>{host.phone || "-"}</TableCell>
                    <TableCell>{host.department || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleOpenDialog(host)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-600"
                          onClick={() => handleDeleteHost(host.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Host Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentHost?.id ? "Edit Host" : "Add Host"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="host-name">Name</Label>
              <Input
                id="host-name"
                value={currentHost?.name || ""}
                onChange={(e) => setCurrentHost(prev => prev ? {...prev, name: e.target.value} : null)}
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <Label htmlFor="host-email">Email</Label>
              <Input
                id="host-email"
                type="email"
                value={currentHost?.email || ""}
                onChange={(e) => setCurrentHost(prev => prev ? {...prev, email: e.target.value} : null)}
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="host-phone">Phone (Optional)</Label>
              <Input
                id="host-phone"
                type="tel"
                value={currentHost?.phone || ""}
                onChange={(e) => setCurrentHost(prev => prev ? {...prev, phone: e.target.value} : null)}
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div>
              <Label htmlFor="host-department">Department (Optional)</Label>
              <Input
                id="host-department"
                value={currentHost?.department || ""}
                onChange={(e) => setCurrentHost(prev => prev ? {...prev, department: e.target.value} : null)}
                placeholder="Engineering, Sales, etc."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSaveHost}>
              {currentHost?.id ? "Update Host" : "Add Host"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CSV Import Dialog */}
      <Dialog open={csvDialogOpen} onOpenChange={setCsvDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Hosts from CSV</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Paste your CSV data below. The first row should contain headers.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Required columns: <strong>name, email</strong><br />
                Optional columns: <strong>phone, department</strong>
              </p>
              <textarea
                className="w-full h-40 p-2 border rounded-md font-mono text-sm"
                placeholder="name,email,phone,department
John Doe,john@example.com,555-123-4567,Engineering
Jane Smith,jane@example.com,555-987-6543,Marketing"
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCsvDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImportCSV}>
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
