
/**
 * Format a date string into a human-readable format
 * @param dateString ISO date string or null
 * @param options Formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string | null, 
  options: { 
    includeTime?: boolean, 
    fallback?: string 
  } = { includeTime: true, fallback: "Not available" }
) => {
  if (!dateString) return options.fallback;
  
  const date = new Date(dateString);
  let formatted = date.toLocaleDateString();
  
  if (options.includeTime) {
    formatted += " " + date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  return formatted;
};

/**
 * Convert a string into a URL-friendly slug
 * @param text Input text
 * @returns URL-friendly slug
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')       // Trim hyphens from start
    .replace(/-+$/, '');      // Trim hyphens from end
};

/**
 * Download data as CSV
 * @param data Array of objects to export
 * @param filename Name of the file to download
 */
export const downloadCSV = (data: any[], filename: string) => {
  if (!data || !data.length) {
    console.warn('No data to export');
    return;
  }

  // Get headers from the first object's keys
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [
    // Header row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const cell = row[header] === null || row[header] === undefined ? '' : row[header];
        // Quote strings with commas
        return typeof cell === 'string' && cell.includes(',') 
          ? `"${cell}"` 
          : String(cell);
      }).join(',')
    )
  ];

  // Join rows with newlines
  const csvContent = csvRows.join('\n');
  
  // Create a Blob with the CSV data
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Set link attributes
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  // Add to DOM, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
