
import { useState } from "react";
import { VisitorType } from "@/models/kiosk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Plus, Trash2, GripVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface VisitorTypeEditorProps {
  visitorTypes: VisitorType[];
  onChange: (visitorTypes: VisitorType[]) => void;
}

export const VisitorTypeEditor = ({
  visitorTypes,
  onChange
}: VisitorTypeEditorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentType, setCurrentType] = useState<VisitorType | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleOpenDialog = (type?: VisitorType) => {
    if (type) {
      setCurrentType({...type});
    } else {
      setCurrentType({
        id: "",
        name: "",
        icon: ""
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentType(null);
  };

  const handleSaveType = () => {
    if (!currentType || !currentType.name) return;

    // Create a valid ID if not present
    const typeId = currentType.id || currentType.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    
    const updatedType = {
      ...currentType,
      id: typeId
    };

    if (visitorTypes.some(t => t.id === updatedType.id)) {
      // Update existing type
      onChange(visitorTypes.map(t => t.id === updatedType.id ? updatedType : t));
    } else {
      // Add new type
      onChange([...visitorTypes, updatedType]);
    }
    
    handleCloseDialog();
  };

  const handleDeleteType = (id: string) => {
    onChange(visitorTypes.filter(t => t.id !== id));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newTypes = [...visitorTypes];
    const draggedType = newTypes[draggedIndex];
    
    // Remove the dragged item
    newTypes.splice(draggedIndex, 1);
    // Insert it at the new position
    newTypes.splice(index, 0, draggedType);
    
    onChange(newTypes);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Visitor Types</h2>
          <p className="text-sm text-gray-500">
            Define different types of visitors and their check-in processes
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Type
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          {visitorTypes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No visitor types defined. Click "Add Type" to create your first visitor type.
            </div>
          ) : (
            <div className="space-y-2">
              {visitorTypes.map((type, index) => (
                <div
                  key={type.id}
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
                      <span className="font-medium">{type.name}</span>
                      {type.icon && (
                        <span className="text-xs text-gray-500 ml-2">
                          Icon: {type.icon}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleOpenDialog(type)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-600"
                      onClick={() => handleDeleteType(type.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentType?.id ? "Edit Visitor Type" : "Add Visitor Type"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="type-name">Type Name</Label>
              <Input
                id="type-name"
                value={currentType?.name || ""}
                onChange={(e) => setCurrentType(prev => prev ? {...prev, name: e.target.value} : null)}
                placeholder="Visitor, Contractor, Interview, etc."
              />
            </div>
            
            <div>
              <Label htmlFor="type-icon">Icon (optional)</Label>
              <Input
                id="type-icon"
                value={currentType?.icon || ""}
                onChange={(e) => setCurrentType(prev => prev ? {...prev, icon: e.target.value} : null)}
                placeholder="Icon name (e.g. User, Package, Briefcase)"
              />
              <div className="text-xs text-gray-500 mt-1">
                Enter a Lucide icon name. Common options: User, Briefcase, Package, Clipboard, Id, BadgeCheck
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSaveType}>
              {currentType?.id ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
