
import { FormField as KioskFormField } from "@/models/kiosk";
import { DraggableField } from "./DraggableField";

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

export const FormField = (props: FormFieldProps) => {
  return <DraggableField {...props} />;
};
