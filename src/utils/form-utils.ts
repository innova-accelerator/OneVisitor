
/**
 * Converts a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Formats a date string according to locale preferences
 */
export function formatDate(dateString: string | null, includeTime = false): string {
  if (!dateString) return "Not available";
  
  const date = new Date(dateString);
  
  const dateOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  };
  
  if (includeTime) {
    return date.toLocaleDateString(undefined, {
      ...dateOptions,
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return date.toLocaleDateString(undefined, dateOptions);
}

/**
 * Downloads data as CSV
 */
export function downloadCsv(data: any[], filename: string): void {
  if (!data || !data.length) {
    console.warn("No data to export");
    return;
  }
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add rows
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header] || '';
      // Escape quotes and wrap in quotes if contains comma or quote
      const escaped = String(val).replace(/"/g, '""');
      return /[,"]/.test(escaped) ? `"${escaped}"` : escaped;
    });
    csvRows.push(values.join(','));
  }
  
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
