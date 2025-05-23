
import { KioskSite } from "@/models/kiosk";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface DeleteSiteDialogProps {
  site: KioskSite | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export const DeleteSiteDialog = ({
  site,
  open,
  onOpenChange,
  onConfirmDelete
}: DeleteSiteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Site</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the site "{site?.name}"? 
            This action cannot be undone and all configuration will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirmDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
