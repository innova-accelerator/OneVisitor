
import { Shield } from "lucide-react";

interface VisitorType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface VisitorTypeSelectionProps {
  visitorTypes: VisitorType[];
  onSelect: (type: string) => void;
}

export const VisitorTypeSelection = ({ visitorTypes, onSelect }: VisitorTypeSelectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Select Visitor Type</h2>
        <p className="text-gray-600">What brings you here today?</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visitorTypes.map(type => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className="flex items-center p-4 border rounded-lg hover:shadow-md transition-all"
            style={{ 
              backgroundColor: `${type.color}20`, 
              borderColor: type.color 
            }}
          >
            <div className="rounded-full p-2 mr-3" style={{ backgroundColor: type.color }}>
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-medium">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
