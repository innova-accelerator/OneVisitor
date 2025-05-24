
// No TODOs found in this file

import { FormField, VisitorType } from "@/models/kiosk";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { FieldLibrary } from "./form-builder/FieldLibrary";
import { FieldList } from "./form-builder/FieldList";
import { FieldDialog } from "./form-builder/FieldDialog";
import { useFormFields } from "./form-builder/useFormFields";

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
  const {
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
    handleReorderFields,
    handleAddDefaultField
  } = useFormFields(formFields, onChange);

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
          <FieldList 
            formFields={formFields}
            onEdit={handleOpenDialog}
            onToggleRequired={handleToggleRequired}
            onDelete={handleDeleteField}
            onReorder={handleReorderFields}
          />
        </div>

        <div>
          <FieldLibrary
            defaultFieldOptions={defaultFieldOptions}
            formFields={formFields}
            onAddDefaultField={handleAddDefaultField}
          />
        </div>
      </div>

      <FieldDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentField={currentField}
        setCurrentField={setCurrentField}
        visitorTypes={visitorTypes}
        onSave={handleSaveField}
        onClose={handleCloseDialog}
      />
    </>
  );
};
