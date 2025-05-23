
import { FormField, VisitorType } from "@/models/kiosk";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface FieldDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  currentField: FormField | null;
  setCurrentField: (field: FormField | null) => void;
  visitorTypes: VisitorType[];
  onSave: () => void;
  onClose: () => void;
}

export const FieldDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  currentField,
  setCurrentField,
  visitorTypes,
  onSave,
  onClose
}: FieldDialogProps) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentField?.id ? "Edit Form Field" : "Add Custom Field"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="field-label">Field Label</Label>
            <Input
              id="field-label"
              value={currentField?.label || ""}
              onChange={(e) => setCurrentField(prev => prev ? {...prev, label: e.target.value} : null)}
              placeholder="e.g. Full Name, Email, etc."
            />
          </div>
          
          <div>
            <Label htmlFor="field-type">Field Type</Label>
            <select
              id="field-type"
              value={currentField?.type || "text"}
              onChange={(e) => setCurrentField(prev => prev ? {...prev, type: e.target.value} : null)}
              className="w-full p-2 border rounded-md"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="tel">Phone</option>
              <option value="select">Dropdown</option>
              <option value="checkbox">Checkbox</option>
              <option value="date">Date</option>
              <option value="signature">Signature</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="required-switch"
              checked={currentField?.required || false}
              onCheckedChange={(checked) => 
                setCurrentField(prev => prev ? {...prev, required: checked} : null)
              }
            />
            <Label htmlFor="required-switch">Required Field</Label>
          </div>

          {visitorTypes.length > 1 && (
            <div>
              <Label>Show for Visitor Types:</Label>
              <div className="mt-2 space-y-2">
                {visitorTypes.map(type => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`type-${type.id}`}
                      checked={!currentField?.visitorTypeIds || 
                        !currentField.visitorTypeIds.length || 
                        currentField.visitorTypeIds.includes(type.id)}
                      onChange={(e) => {
                        if (!currentField) return;
                        
                        let visitorTypeIds = currentField.visitorTypeIds || [];
                        if (e.target.checked) {
                          if (!visitorTypeIds.includes(type.id)) {
                            visitorTypeIds = [...visitorTypeIds, type.id];
                          }
                        } else {
                          visitorTypeIds = visitorTypeIds.filter(id => id !== type.id);
                        }
                        
                        setCurrentField({
                          ...currentField,
                          visitorTypeIds
                        });
                      }}
                    />
                    <Label htmlFor={`type-${type.id}`}>{type.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {currentField?.id ? "Update Field" : "Add Field"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
