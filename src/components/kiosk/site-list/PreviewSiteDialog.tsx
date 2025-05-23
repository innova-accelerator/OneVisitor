
import { KioskSite } from "@/models/kiosk";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Site Preview: {site.name}</DialogTitle>
          <DialogDescription>
            This is how your check-in site will appear to visitors at <strong>
              {site.tenantId}.onevisitor.app/{getSitePath(site)}
            </strong>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div 
            className="border rounded-md overflow-hidden"
            style={{height: "600px"}}
          >
            <div 
              className="w-full p-4"
              style={{
                backgroundColor: site.branding.primaryColor,
                color: "white"
              }}
            >
              <div className="flex items-center space-x-4">
                {site.branding.logo && (
                  <img 
                    src={site.branding.logo}
                    alt={site.name}
                    className="h-8"
                  />
                )}
                <h2 className="text-xl font-semibold">
                  {site.name} Check-in
                </h2>
              </div>
            </div>
            <div className="p-6 bg-white">
              <div className="prose">
                <h3>Welcome</h3>
                <p>{site.welcomeMessage || "Welcome to our check-in system."}</p>
                
                <div className="mt-8">
                  <h4>I am here for:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {site.visitorTypes.map(type => (
                      <div 
                        key={type.id}
                        className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-50"
                        style={{
                          borderColor: site.branding.secondaryColor
                        }}
                      >
                        <span className="text-lg font-medium">{type.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
