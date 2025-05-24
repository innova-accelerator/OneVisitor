
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";

interface VisitorFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  host: string;
  purpose: string;
  expectedDuration: string;
  signature: boolean;
  photo: boolean;
  visitorType: string;
}

interface ReviewConfirmProps {
  formData: VisitorFormData;
  visitorTypes: Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
  }>;
  onEdit: (step: number) => void;
  photo: File | null;
}

export const ReviewConfirm = ({ formData, visitorTypes, onEdit, photo }: ReviewConfirmProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h2>
        <p className="text-gray-600">Please verify your information</p>
      </div>
      
      {/* Photo preview if available */}
      {photo && (
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 overflow-hidden rounded-md">
            <img
              src={URL.createObjectURL(photo)}
              alt="Visitor photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <Card className="overflow-hidden">
          <CardHeader className="py-3 px-4 bg-gray-50 flex justify-between items-center">
            <div>
              <CardTitle className="text-base font-medium">Personal Details</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              className="h-8 text-xs"
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Name:</dt>
                <dd>{formData.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Email:</dt>
                <dd>{formData.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Company:</dt>
                <dd>{formData.company || "—"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="py-3 px-4 bg-gray-50 flex justify-between items-center">
            <div>
              <CardTitle className="text-base font-medium">Visit Details</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              className="h-8 text-xs"
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Visitor Type:</dt>
                <dd>{visitorTypes.find(t => t.id === formData.visitorType)?.name || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Host:</dt>
                <dd>{formData.host}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Purpose:</dt>
                <dd>{formData.purpose || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Duration:</dt>
                <dd>{formData.expectedDuration || "—"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <div className="flex justify-center pt-4">
          <Badge
            variant="outline"
            className="px-3 py-1 text-sm flex items-center gap-1 bg-green-50 text-green-700 border-green-200"
          >
            <Camera className="h-3 w-3" />
            {photo ? "Photo captured" : "No photo captured"}
          </Badge>
        </div>
        
        <div className="text-center text-sm text-gray-500 italic">
          By checking in, you agree to our visitor terms and conditions.
        </div>
      </div>
    </div>
  );
};
