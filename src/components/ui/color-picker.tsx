
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClickOutside } from '@/hooks';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  id?: string;
  className?: string;
  colors?: string[];
}

export function ColorPicker({
  value,
  onChange,
  label,
  id,
  className = '',
  colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7',
    '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
    '#009688', '#4caf50', '#8bc34a', '#cddc39',
    '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
    '#795548', '#9e9e9e', '#607d8b', '#000000'
  ]
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const uniqueId = id || `color-picker-${Math.random().toString(36).substring(7)}`;

  useClickOutside(pickerRef, () => setIsOpen(false));

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handlePresetClick = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {label && <Label htmlFor={uniqueId}>{label}</Label>}
      
      <div className="flex items-center mt-1.5 space-x-2">
        <div 
          className="w-10 h-10 rounded border cursor-pointer flex-shrink-0"
          style={{ backgroundColor: value || '#ffffff' }}
          onClick={() => setIsOpen(!isOpen)}
        />
        
        <Input
          id={uniqueId}
          type="text"
          value={value}
          onChange={handleColorChange}
          className="flex-grow"
          placeholder="#FFFFFF"
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 p-2 bg-white border rounded-md shadow-lg">
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <div
                key={color}
                className="w-6 h-6 rounded cursor-pointer hover:scale-110 transition-transform border"
                style={{ backgroundColor: color }}
                onClick={() => handlePresetClick(color)}
              />
            ))}
          </div>
          
          <input
            type="color"
            value={value}
            onChange={handleColorChange}
            className="w-full h-8 mt-2 cursor-pointer p-0 border rounded"
          />
        </div>
      )}
    </div>
  );
}
