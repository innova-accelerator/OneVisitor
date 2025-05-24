
import { KioskSite } from "@/models/kiosk";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CheckIn from "@/pages/CheckIn";

interface PreviewSiteDialogProps {
  site: KioskSite | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  getSitePath: (site: KioskSite) => string;
}

export const PreviewSiteDialog = ({
  site,
  open,
  onOpenChange,
  getSitePath
}: PreviewSiteDialogProps) => {
  if (!site) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Site Preview: {site.name}</DialogTitle>
          <DialogDescription>
            This is how your check-in site will appear to visitors at <strong>
              {site.tenantId}.onevisitor.app/{getSitePath(site)}
            </strong>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-center">
          <div 
            className="border rounded-md overflow-hidden bg-white"
            style={{
              width: "375px",
              height: "600px",
              transform: "scale(0.85)",
              transformOrigin: "top center"
            }}
          >
            <CheckIn 
              siteConfig={site}
              isPreview={true}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
