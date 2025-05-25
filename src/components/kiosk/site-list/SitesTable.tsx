
import React from 'react';
import { KioskSite } from "@/models/kiosk";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: { row: { original: KioskSite } }) => (
        <div className="flex items-center">
          <div className="flex mr-3">
            <span
              className="inline-block w-3 h-6 rounded-l border"
              style={{ backgroundColor: row.original.branding?.primaryColor || '#2563eb' }}
            />
            <span
              className="inline-block w-3 h-6 rounded-r border"
              style={{ backgroundColor: row.original.branding?.secondaryColor || '#1d4ed8' }}
            />
          </div>
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "url",
      header: "URL",
      cell: ({ row }: { row: { original: KioskSite } }) => (
        <span className="text-gray-600 text-sm">/{getSitePath(row.original)}</span>
      ),
    },
    {
      accessorKey: "published",
      header: "Status",
      cell: ({ row }: { row: { original: KioskSite } }) => (
        <div className="flex justify-center">
          <Switch
            checked={row.original.published || false}
            onCheckedChange={(checked) => onTogglePublish(row.original.id, checked)}
          />
        </div>
      ),
    },
    {
      accessorKey: "lastPublished",
      header: "Last Published",
      cell: ({ row }: { row: { original: KioskSite } }) => (
        row.original.published ? (
          <span className="text-sm text-gray-600">{formatDate(row.original.lastPublished)}</span>
        ) : (
          <Badge variant="outline" className="font-normal">Draft</Badge>
        )
      ),
    },
    {
      accessorKey: "visitorCount",
      header: "Visitors",
      cell: ({ row }: { row: { original: KioskSite } }) => (
        <span className="text-sm">{row.original.visitorCount || 0}</span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: KioskSite } }) => (
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => onPreview(row.original)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onEdit(row.original)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-600"
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

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
        <DataTable 
          columns={columns}
          data={filteredSites}
          noDataMessage={
            sites.length === 0
              ? "No sites have been created yet"
              : "No sites match your search criteria"
          }
        />
      </div>
    </div>
  );
};
