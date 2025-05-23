
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DataTableExportProps {
  onExport: () => void;
  fileName?: string;
}

export function DataTableExport({ onExport, fileName }: DataTableExportProps) {
  return (
    <Button variant="outline" size="sm" onClick={onExport}>
      <Download className="mr-2 h-4 w-4" />
      Export
      {fileName && ` ${fileName}`}
    </Button>
  );
}
