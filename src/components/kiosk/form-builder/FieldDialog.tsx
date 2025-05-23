
import { useState, useEffect } from "react";
import { FormField, VisitorType } from "@/models/kiosk";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FieldDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentField: FormField | null;
  setCurrentField: (field: FormField | null) => void;
  visitorTypes: VisitorType[];
  onSave: (field: FormField) => void;
  onClose: () => void;
}

export const FieldDialog = ({ 
  isOpen, 
  onOpenChange,
  currentField, 
  setCurrentField,
  visitorTypes,
  onSave, 
  onClose 
}: FieldDialogProps) => {
  const isEditing = !!currentField && !!currentField.id;
  const [formData, setFormData] = useState<FormField>({
    id: "",
    label: "",
    type: "text",
    required: false
  });

  useEffect(() => {
    if (currentField) {
      setFormData({ ...currentField });
    } else {
      setFormData({
        id: crypto.randomUUID(),
        label: "",
        type: "text",
        required: false
      });
    }
  }, [currentField]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTypeChange = (type: string) => {
    setFormData((prevData) => ({
      ...prevData,
      type
    }));
  };

  const handleRequiredChange = (required: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      required
    }));
  };

  const handleSave = () => {
    // Generate an ID if not already present
    const newField: FormField = {
      ...formData,
      id: formData.id || crypto.randomUUID()
    };
    onSave(newField);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Field" : "Add Custom Field"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Modify the properties of this form field." 
              : "Create a new custom form field for your check-in form."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="label">Field Label</Label>
            <Input 
              id="label"
              name="label"
              value={formData.label} 
              onChange={handleChange} 
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="type">Field Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={handleTypeChange}
            >
              <SelectTrigger id="type" className="mt-1">
                <SelectValue placeholder="Select a field type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="select">Dropdown</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="time">Time</SelectItem>
                <SelectItem value="textarea">Text Area</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="required">Required</Label>
            <Switch 
              id="required"
              name="required"
              checked={formData.required}
              onCheckedChange={handleRequiredChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? "Update Field" : "Add Field"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
