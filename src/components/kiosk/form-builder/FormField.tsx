
import { FormField as KioskFormField } from "@/models/kiosk";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, GripVertical, Trash2 } from "lucide-react";

interface FormFieldProps {
  field: KioskFormField;
  onEdit: (field: KioskFormField) => void;
  onToggleRequired: (id: string, required: boolean) => void;
  onDelete: (id: string) => void;
  onDragStart: (index: number) => void;
  index: number;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}

export const FormField = ({
  field,
  onEdit,
  onToggleRequired,
  onDelete,
  onDragStart,
  index,
  onDragOver,
  onDragEnd
}: FormFieldProps) => {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
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
            onCheckedChange={(checked) => onToggleRequired(field.id, checked)}
          />
        </div>
        <div className="flex space-x-1">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onEdit(field)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-red-600"
            onClick={() => onDelete(field.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
