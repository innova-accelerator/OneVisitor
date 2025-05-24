
import { KioskSite } from "@/models/kiosk";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Globe, Power } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/helpers";

interface SitesTableProps {
  sites: KioskSite[];
  onEdit: (site: KioskSite) => void;
  onDelete: (site: KioskSite) => void;
  onPreview: (site: KioskSite) => void;
  onTogglePublish: (siteId: string, published: boolean) => void;
  getSitePath: (site: KioskSite) => string;
  formatDate: (dateString: string | null) => string;
}

export const SitesTable = ({
  sites,
  onEdit,
  onDelete,
  onPreview,
  onTogglePublish,
  formatDate,
  getSitePath
}: SitesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSites = sites.filter((site) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      site.name.toLowerCase().includes(searchLower) ||
      site.welcomeMessage?.toLowerCase().includes(searchLower) ||
      getSitePath(site).toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <Input
            placeholder="Search sites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Last Published</TableHead>
              <TableHead className="text-center">Visitors</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSites.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  {sites.length === 0
                    ? "No sites have been created yet"
                    : "No sites match your search criteria"}
                </TableCell>
              </TableRow>
            ) : (
              filteredSites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="flex mr-3">
                        <span
                          className="inline-block w-3 h-6 rounded-l border"
                          style={{ backgroundColor: site.branding?.primaryColor || '#2563eb' }}
                        />
                        <span
                          className="inline-block w-3 h-6 rounded-r border"
                          style={{ backgroundColor: site.branding?.secondaryColor || '#1d4ed8' }}
                        />
                      </div>
                      <span>{site.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 text-sm">/{getSitePath(site)}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={site.published || false}
                        onCheckedChange={(checked) => onTogglePublish(site.id, checked)}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {site.published ? (
                      <span className="text-sm text-gray-600">{formatDate(site.lastPublished)}</span>
                    ) : (
                      <Badge variant="outline" className="font-normal">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">{site.visitorCount || 0}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => onPreview(site)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onEdit(site)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => onDelete(site)}
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
      </div>
    </div>
  );
};
