
import { KioskSite } from "@/models/kiosk";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SiteTableRow } from "./SiteTableRow";

interface SitesTableProps {
  sites: KioskSite[];
  onEdit: (site: KioskSite) => void;
  onDelete: (site: KioskSite) => void;
  onPreview: (site: KioskSite) => void;
  onTogglePublish: (siteId: string, published: boolean) => void;
  formatDate: (dateString: string | null) => string;
  getSitePath: (site: KioskSite) => string;
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
  return (
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
              <SiteTableRow
                key={site.id}
                site={site}
                onEdit={onEdit}
                onDelete={onDelete}
                onPreview={onPreview}
                onTogglePublish={onTogglePublish}
                formatDate={formatDate}
                getSitePath={getSitePath}
              />
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
  );
};
