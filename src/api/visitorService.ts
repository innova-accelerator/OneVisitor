
// TODO: Integration Points
// - Backend must handle multipart upload

/**
 * Visitor API service
 * Handles check-in and other visitor-related operations
 */

/**
 * Submits a visitor check-in
 * @param sitePath - The site path identifier 
 * @param formData - Form data including visitor details and photo
 * @returns Promise with the fetch response
 */
export function checkIn(sitePath: string, formData: FormData) {
  return fetch(`/api/sites/${sitePath}/visitors`, {
    method: 'POST',
    body: formData,
  });
}

/**
 * Gets visitor information
 * @param sitePath - The site path identifier
 * @param visitorId - The visitor ID
 * @returns Promise with visitor data
 */
export function getVisitor(sitePath: string, visitorId: string) {
  return fetch(`/api/sites/${sitePath}/visitors/${visitorId}`)
    .then(response => response.json());
}
