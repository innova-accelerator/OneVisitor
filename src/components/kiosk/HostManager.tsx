// No TODOs found in this file

import { useState, useRef } from "react";
import { Host } from "@/models/kiosk";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Trash2, Upload, Search } from "lucide-react";
import { read, utils } from 'xlsx';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);

      // Define the type for row data
      interface ImportRow {
        name?: string;
        Name?: string;
        NAME?: string;
        email?: string;
        Email?: string;
        EMAIL?: string;
        phone?: string;
        Phone?: string;
        PHONE?: string;
        department?: string;
        Department?: string;
        DEPARTMENT?: string;
        [key: string]: string | undefined;
      }

      // Validate and transform the data
      const newHosts: Host[] = jsonData.map((row: ImportRow) => {
        const name = row.name || row.Name || row.NAME;
        const email = row.email || row.Email || row.EMAIL;
        const phone = row.phone || row.Phone || row.PHONE || '';
        const department = row.department || row.Department || row.DEPARTMENT || '';

        if (!name || !email) {
          throw new Error('Name and email are required fields');
        }

        return {
          id: `host-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: String(name),
          email: String(email),
          phone: String(phone),
          department: String(department)
        };
      });

      // Add new hosts
      setHosts([...hosts, ...newHosts]);
      setCsvDialogOpen(false);
    } catch (error) {
      console.error('Error parsing file:', error);
      alert('Error parsing file. Please make sure it has the required columns (name, email) and is in a valid format.');
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
          <Button onClick={() => fileInputRef.current?.click()} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Hosts
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
          />
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
                      ? "No hosts added yet. Add hosts individually or import from a file."
                      : "No hosts match your search query."
                    }
                  </TableCell>
                </TableRow>
              ) : (
                filteredHosts.map(host => (
                  <TableRow key={host.id}>
                    <TableCell className="font-medium">{host.name}</TableCell>
                    <TableCell>{host.email}</TableCell>
                    <TableCell>{host.phone}</TableCell>
                    <TableCell>{host.department}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(host)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
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
              {currentHost?.id ? "Edit Host" : "Add New Host"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={currentHost?.name || ""}
                onChange={(e) => setCurrentHost(prev => prev ? {...prev, name: e.target.value} : null)}
                placeholder="Enter host name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={currentHost?.email || ""}
                onChange={(e) => setCurrentHost(prev => prev ? {...prev, email: e.target.value} : null)}
                placeholder="Enter host email"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={currentHost?.phone || ""}
                onChange={(e) => setCurrentHost(prev => prev ? {...prev, phone: e.target.value} : null)}
                placeholder="Enter host phone"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Input
                value={currentHost?.department || ""}
                onChange={(e) => setCurrentHost(prev => prev ? {...prev, department: e.target.value} : null)}
                placeholder="Enter host department"
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
    </>
  );
};
