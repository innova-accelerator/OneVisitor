
import React from 'react';

interface ImageUploaderProps {
  photo: File | null;
  onPhotoChange: (file: File | null) => void;
}

export function ImageUploader({ photo, onPhotoChange }: ImageUploaderProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload Photo
      </label>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={e => {
          const file = e.target.files?.[0] || null;
          onPhotoChange(file);
        }}
        className="block w-full text-sm text-gray-600"
      />
      {photo && (
        <img
          src={URL.createObjectURL(photo)}
          alt="Preview"
          className="mt-2 h-32 w-32 object-cover rounded-md"
        />
      )}
    </div>
  );
}
