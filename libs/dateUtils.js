// lib/dateUtils.js

/**
 * Converts an ISO date string to a human-readable format.
 * @param {string} isoDate - The ISO date string to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(isoDate) {
    const date = new Date(isoDate);
  
    // Format the date and time
    const readableDate = date.toLocaleDateString('en-US', {
      month: 'long', // e.g., 'September'
      day: 'numeric', // e.g., '13'
      year: 'numeric', // e.g., '2024'
    });
    const readableTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric', // e.g., '6'
      minute: 'numeric', // e.g., '20'
      hour12: true, // 12-hour format
    });
  
    return `${readableDate}, ${readableTime}`;
  }
  