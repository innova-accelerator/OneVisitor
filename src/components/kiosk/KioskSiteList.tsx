
import { KioskSite } from "@/models/kiosk";
import { useState } from "react";
import { SitesTable } from "./site-list/SitesTable";
import { DeleteSiteDialog } from "./site-list/DeleteSiteDialog";
import { PreviewSiteDialog } from "./site-list/PreviewSiteDialog";

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
      <SitesTable 
        sites={sites}
        onEdit={onEdit}
        onDelete={setDeletingSite}
        onPreview={setPreviewSite}
        onTogglePublish={onTogglePublish}
        formatDate={formatDate}
        getSitePath={getSitePath}
      />

      <DeleteSiteDialog 
        site={deletingSite}
        open={!!deletingSite}
        onOpenChange={(open) => !open && setDeletingSite(null)}
        onConfirmDelete={handleDeleteSite}
      />

      <PreviewSiteDialog
        site={previewSite}
        open={!!previewSite}
        onOpenChange={(open) => !open && setPreviewSite(null)}
        getSitePath={getSitePath}
      />
    </>
  );
};
