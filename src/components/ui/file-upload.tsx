
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, File, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onClear?: () => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
  buttonText?: string;
  dropzoneText?: string;
  selectedFile?: File | null;
  previewUrl?: string | null;
  multiple?: boolean;
}

export function FileUpload({
  onFileSelect,
  onClear,
  accept = '*',
  maxSizeMB = 5,
  className = '',
  buttonText = 'Select File',
  dropzoneText = 'or drag and drop',
  selectedFile = null,
  previewUrl = null,
  multiple = false
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileSelection = (file: File) => {
    // Check file size
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds the ${maxSizeMB}MB limit`);
      return;
    }

    // Check file type if accept is specified
    if (accept !== '*') {
      const fileType = file.type;
      const acceptTypes = accept.split(',').map(type => type.trim());
      
      // Check if the file type matches any of the accepted types
      const isAccepted = acceptTypes.some(type => {
        if (type.includes('/*')) {
          // Handle wildcard types like image/*
          const category = type.split('/')[0];
          return fileType.startsWith(`${category}/`);
        }
        return type === fileType;
      });

      if (!isAccepted) {
        setError(`File type not accepted. Please upload: ${accept}`);
        return;
      }
    }

    setError(null);
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onClear) {
      onClear();
    }
    setError(null);
  };

  const isImage = selectedFile?.type.startsWith('image/') || 
                 (previewUrl && (previewUrl.endsWith('.png') || 
                                previewUrl.endsWith('.jpg') || 
                                previewUrl.endsWith('.jpeg') || 
                                previewUrl.endsWith('.gif') || 
                                previewUrl.endsWith('.webp')));

  return (
    <div className={cn('space-y-2', className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        className="hidden"
        multiple={multiple}
      />

      {!selectedFile && !previewUrl ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors',
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400',
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <div className="text-sm text-center">
            <Button type="button" variant="ghost" className="px-4">
              {buttonText}
            </Button>
            <p className="text-xs text-gray-500 mt-1">{dropzoneText}</p>
            <p className="text-xs text-gray-500 mt-1">
              Max size: {maxSizeMB}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Selected File</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {isImage && previewUrl ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="object-cover w-full h-full" 
              />
            </div>
          ) : (
            <div className="flex items-center">
              {isImage ? <Image className="h-5 w-5 mr-2" /> : <File className="h-5 w-5 mr-2" />}
              <span className="text-sm text-gray-700 truncate">
                {selectedFile?.name || previewUrl?.split('/').pop() || 'File'}
              </span>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
