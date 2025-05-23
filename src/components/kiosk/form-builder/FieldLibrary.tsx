
import { FormField } from "@/models/kiosk";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FieldLibraryProps {
  defaultFieldOptions: {
    id: string;
    label: string;
    type: string;
  }[];
  formFields: FormField[];
  onAddDefaultField: (field: any) => void;
}

export const FieldLibrary = ({
  defaultFieldOptions,
  formFields,
  onAddDefaultField
}: FieldLibraryProps) => {
  return (
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
                onClick={() => onAddDefaultField(field)}
                disabled={formFields.some(f => f.id === field.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
