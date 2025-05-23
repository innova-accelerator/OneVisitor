
import { FormField as FormFieldType } from "@/models/kiosk";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "./FormField";
import { useDraggableList } from "@/hooks/useDraggableList";

interface FieldListProps {
  formFields: FormFieldType[];
  onEdit: (field: FormFieldType) => void;
  onToggleRequired: (id: string, required: boolean) => void;
  onDelete: (id: string) => void;
  onReorder: (fields: FormFieldType[]) => void;
}

export const FieldList = ({
  formFields,
  onEdit,
  onToggleRequired,
  onDelete,
  onReorder
}: FieldListProps) => {
  const {
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useDraggableList(formFields, onReorder);

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
              <FormField
                key={field.id}
                field={field}
                index={index}
                onEdit={onEdit}
                onToggleRequired={onToggleRequired}
                onDelete={onDelete}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
