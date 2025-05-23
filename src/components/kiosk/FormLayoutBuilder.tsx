
import { useState } from "react";
import { FormField, VisitorType } from "@/models/kiosk";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Edit, GripVertical, Plus, Save, Trash2 } from "lucide-react";

interface FormLayoutBuilderProps {
  formFields: FormField[];
  visitorTypes: VisitorType[];
  onChange: (formFields: FormField[]) => void;
}

export const FormLayoutBuilder = ({
  formFields,
  visitorTypes,
  onChange
}: FormLayoutBuilderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState<FormField | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const defaultFieldOptions = [
    { id: "name", label: "Full Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "phone", label: "Phone Number", type: "tel" },
    { id: "company", label: "Company", type: "text" },
    { id: "host", label: "Host", type: "select" },
    { id: "purpose", label: "Purpose of Visit", type: "text" },
    { id: "nda", label: "NDA Signature", type: "signature" },
    { id: "health", label: "Health Questions", type: "checkbox" }
  ];

  const handleOpenDialog = (field?: FormField) => {
    if (field) {
      setCurrentField({...field});
    } else {
      setCurrentField({
        id: "",
        label: "",
        type: "text",
        required: false
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentField(null);
  };

  const handleSaveField = () => {
    if (!currentField || !currentField.label) return;

    // Create a valid ID if not present
    const fieldId = currentField.id || currentField.label.toLowerCase().replace(/[^a-z0-9]/g, "-");
    
    const updatedField = {
      ...currentField,
      id: fieldId
    };

    if (formFields.some(f => f.id === updatedField.id)) {
      // Update existing field
      onChange(formFields.map(f => f.id === updatedField.id ? updatedField : f));
    } else {
      // Add new field
      onChange([...formFields, updatedField]);
    }
    
    handleCloseDialog();
  };

  const handleToggleRequired = (id: string, required: boolean) => {
    onChange(formFields.map(field => 
      field.id === id ? {...field, required} : field
    ));
  };

  const handleDeleteField = (id: string) => {
    onChange(formFields.filter(f => f.id !== id));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newFields = [...formFields];
    const draggedField = newFields[draggedIndex];
    
    // Remove the dragged item
    newFields.splice(draggedIndex, 1);
    // Insert it at the new position
    newFields.splice(index, 0, draggedField);
    
    onChange(newFields);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleAddDefaultField = (field: any) => {
    // Check if field already exists
    if (formFields.some(f => f.id === field.id)) {
      return; // Field already exists
    }
    
    onChange([...formFields, {
      ...field,
      required: field.id === "name", // Make "name" required by default
    }]);
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Form Layout</h2>
          <p className="text-sm text-gray-500">
            Customize the fields that appear on your check-in form
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Custom Field
          </Button>
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save as Default
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Form Fields</h3>
              
              {formFields.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No form fields defined. Add fields from the library or create custom fields.
                </div>
              ) : (
                <div className="space-y-2">
                  {formFields.map((field, index) => (
                    <div
                      key={field.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className="flex items-center justify-between p-3 bg-white border rounded-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="cursor-move text-gray-400">
                          <GripVertical className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-medium">{field.label}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({field.type})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Required</span>
                          <Switch
                            checked={field.required}
                            onCheckedChange={(checked) => handleToggleRequired(field.id, checked)}
                          />
                        </div>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleOpenDialog(field)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-600"
                            onClick={() => handleDeleteField(field.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Field Library</h3>
              <div className="space-y-2">
                {defaultFieldOptions.map(field => (
                  <div
                    key={field.id}
                    className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md"
                  >
                    <div>
                      <span>{field.label}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({field.type})
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleAddDefaultField(field)}
                      disabled={formFields.some(f => f.id === field.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSaveField}>
              {currentField?.id ? "Update Field" : "Add Field"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
