
import { FormField } from "@/models/kiosk";
import { Card, CardContent } from "@/components/ui/card";
import { FormField as FormFieldComponent } from "./FormField";

interface FieldListProps {
  formFields: FormField[];
  onEdit: (field: FormField) => void;
  onToggleRequired: (id: string, required: boolean) => void;
  onDelete: (id: string) => void;
  draggedIndex: number | null;
  setDraggedIndex: (index: number | null) => void;
  handleDragOver: (e: React.DragEvent, index: number) => void;
}

export const FieldList = ({
  formFields,
  onEdit,
  onToggleRequired,
  onDelete,
  draggedIndex,
  setDraggedIndex,
  handleDragOver
}: FieldListProps) => {
  return (
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
              <FormFieldComponent
                key={field.id}
                field={field}
                index={index}
                onEdit={onEdit}
                onToggleRequired={onToggleRequired}
                onDelete={onDelete}
                onDragStart={setDraggedIndex}
                onDragOver={handleDragOver}
                onDragEnd={() => setDraggedIndex(null)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
