
import { KioskSite } from "@/models/kiosk";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Eye, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface KioskSiteListProps {
  sites: KioskSite[];
  onEdit: (site: KioskSite) => void;
  onDelete: (siteId: string) => void;
  onTogglePublish: (siteId: string, published: boolean) => void;
}

export const KioskSiteList = ({
  sites,
  onEdit,
  onDelete,
  onTogglePublish
}: KioskSiteListProps) => {
  const [deletingSite, setDeletingSite] = useState<KioskSite | null>(null);
  const [previewSite, setPreviewSite] = useState<KioskSite | null>(null);

  const handleDeleteSite = () => {
    if (deletingSite) {
      onDelete(deletingSite.id);
      setDeletingSite(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString() + " " + 
           new Date(dateString).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  const getSitePath = (site: KioskSite) => {
    // Convert site name to URL-friendly path if no custom path is defined
    const path = site.url || site.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return path;
  };

  return (
    <>
      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site Name</TableHead>
                <TableHead>URL Path</TableHead>
                <TableHead>Visitors Today</TableHead>
                <TableHead>Last Published</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {site.branding.logo && (
                        <img 
                          src={site.branding.logo} 
                          alt={site.name} 
                          className="h-6 w-auto mr-2"
                        />
                      )}
                      {site.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      /{getSitePath(site)}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 mr-2">
                        {site.visitorCount || 0}
                      </Badge>
                      <Link to={`/dashboard/kiosks/${site.id}/visitors`}>
                        <Button size="sm" variant="ghost">
                          <Users className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(site.lastPublished)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={site.published}
                        onCheckedChange={(checked) => onTogglePublish(site.id, checked)}
                      />
                      <Badge 
                        variant={site.published ? "default" : "outline"}
                        className={site.published 
                          ? "bg-green-100 hover:bg-green-100 text-green-800 border-green-200" 
                          : "bg-gray-100 hover:bg-gray-100 text-gray-800 border-gray-200"}
                      >
                        {site.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => onEdit(site)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setPreviewSite(site)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setDeletingSite(site)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {sites.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No sites created yet. Click "Add Site" to create your first check-in site.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingSite} onOpenChange={(open) => !open && setDeletingSite(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Site</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the site "{deletingSite?.name}"? 
              This action cannot be undone and all configuration will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteSite}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewSite} onOpenChange={(open) => !open && setPreviewSite(null)}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Site Preview: {previewSite?.name}</DialogTitle>
            <DialogDescription>
              This is how your check-in site will appear to visitors at <strong>
                {previewSite?.tenantId}.onevisitor.app/{getSitePath(previewSite as KioskSite)}
              </strong>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div 
              className="border rounded-md overflow-hidden"
              style={{height: "600px"}}
            >
              {previewSite && (
                <>
                  <div 
                    className="w-full p-4"
                    style={{
                      backgroundColor: previewSite.branding.primaryColor,
                      color: "white"
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      {previewSite.branding.logo && (
                        <img 
                          src={previewSite.branding.logo}
                          alt={previewSite.name}
                          className="h-8"
                        />
                      )}
                      <h2 className="text-xl font-semibold">
                        {previewSite.name} Check-in
                      </h2>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="prose">
                      <h3>Welcome</h3>
                      <p>{previewSite.welcomeMessage || "Welcome to our check-in system."}</p>
                      
                      <div className="mt-8">
                        <h4>I am here for:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {previewSite.visitorTypes.map(type => (
                            <div 
                              key={type.id}
                              className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-50"
                              style={{
                                borderColor: previewSite.branding.secondaryColor
                              }}
                            >
                              <span className="text-lg font-medium">{type.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewSite(null)}>
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
