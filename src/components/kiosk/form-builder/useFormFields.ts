
import { useState } from "react";
import { FormField } from "@/models/kiosk";

export const useFormFields = (initialFields: FormField[], onFieldsChange: (fields: FormField[]) => void) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState<FormField | null>(null);

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

    if (initialFields.some(f => f.id === updatedField.id)) {
      // Update existing field
      onFieldsChange(initialFields.map(f => f.id === updatedField.id ? updatedField : f));
    } else {
      // Add new field
      onFieldsChange([...initialFields, updatedField]);
    }
    
    handleCloseDialog();
  };

  const handleToggleRequired = (id: string, required: boolean) => {
    onFieldsChange(initialFields.map(field => 
      field.id === id ? {...field, required} : field
    ));
  };

  const handleDeleteField = (id: string) => {
    onFieldsChange(initialFields.filter(f => f.id !== id));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newFields = [...initialFields];
    const draggedField = newFields[draggedIndex];
    
    // Remove the dragged item
    newFields.splice(draggedIndex, 1);
    // Insert it at the new position
    newFields.splice(index, 0, draggedField);
    
    onFieldsChange(newFields);
    setDraggedIndex(index);
  };

  const handleAddDefaultField = (field: any) => {
    // Check if field already exists
    if (initialFields.some(f => f.id === field.id)) {
      return; // Field already exists
    }
    
    onFieldsChange([...initialFields, {
      ...field,
      required: field.id === "name", // Make "name" required by default
    }]);
  };

  return {
    draggedIndex,
    setDraggedIndex,
    isDialogOpen,
    setIsDialogOpen,
    currentField,
    setCurrentField,
    defaultFieldOptions,
    handleOpenDialog,
    handleCloseDialog,
    handleSaveField,
    handleToggleRequired,
    handleDeleteField,
    handleDragOver,
    handleAddDefaultField
  };
};
