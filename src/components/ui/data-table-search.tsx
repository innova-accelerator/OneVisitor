
import React from "react";
import { Input } from "@/components/ui/input";

interface DataTableSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function DataTableSearch({ value, onChange }: DataTableSearchProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full sm:w-72">
      <Input
        placeholder="Search..."
        value={value}
        onChange={handleSearchChange}
        className="pl-10"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 absolute left-3 top-3 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
