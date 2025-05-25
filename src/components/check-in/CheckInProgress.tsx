
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TenantBranding } from "@/models/tenant";

interface CheckInProgressProps {
  step: number;
  tenantBranding: TenantBranding | null;
  children: React.ReactNode;
  onPrevious: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  showNavigation?: boolean;
  nextButtonText?: string;
}

export const CheckInProgress = ({ 
  step, 
  tenantBranding, 
  children, 
  onPrevious, 
  onNext, 
  isNextDisabled = false,
  showNavigation = true,
  nextButtonText = "Next" 
}: CheckInProgressProps) => {
  return (
    <>
      {/* Progress Steps - only show for steps 1-3 */}
      {step < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNumber <= step
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
                style={stepNumber <= step ? { 
                  backgroundColor: tenantBranding?.primaryColor || '#3B82F6'
                } : {}}
              >
                {stepNumber}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Step {step} of 3
          </div>
        </div>
      )}
      
      {/* Step Content */}
      {children}
      
      {/* Navigation Buttons */}
      {showNavigation && step > 1 && step < 4 && (
        <div className="flex justify-between mt-8">
          <Button
            variant="ghost"
            onClick={onPrevious}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            style={{ 
              backgroundColor: tenantBranding?.primaryColor || "#3498db",
              color: "#ffffff"
            }}
          >
            {nextButtonText}
          </Button>
        </div>
      )}
    </>
  );
};
