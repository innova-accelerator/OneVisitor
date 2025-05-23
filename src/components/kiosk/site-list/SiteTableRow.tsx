
import { KioskSite } from "@/models/kiosk";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Eye, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface SiteTableRowProps {
  site: KioskSite;
  onEdit: (site: KioskSite) => void;
  onDelete: (site: KioskSite) => void;
  onPreview: (site: KioskSite) => void;
  onTogglePublish: (siteId: string, published: boolean) => void;
  formatDate: (dateString: string | null) => string;
  getSitePath: (site: KioskSite) => string;
}

export const SiteTableRow = ({
  site,
  onEdit,
  onDelete,
  onPreview,
  onTogglePublish,
  formatDate,
  getSitePath
}: SiteTableRowProps) => {
  return (
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
            onClick={() => onPreview(site)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(site)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
