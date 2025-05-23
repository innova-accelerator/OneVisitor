
import React from 'react';

export function MockDisclaimer() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm">
      <p className="font-medium text-yellow-800">⚠️ Frontend Mockup Only</p>
      <p className="text-yellow-700 mt-1">
        This is a mockup with in-memory data. All changes will be lost on page refresh. 
        In a real implementation, this would be connected to backend APIs.
      </p>
    </div>
  );
}
