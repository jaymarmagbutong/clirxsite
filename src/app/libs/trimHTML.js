import DOMPurify from 'dompurify';
export function trimHtml(html, wordLimit) {
    const sanitizedHtml = DOMPurify.sanitize(html);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedHtml; // Create a temporary div to parse the HTML
    const textContent = tempDiv.textContent || tempDiv.innerText || ''; // Get plain text from HTML

    const words = textContent.split(' ');
    
    if (words.length <= wordLimit) return sanitizedHtml; // Return full sanitized HTML if within word limit

    // If the content is longer than the word limit, slice and join
    const trimmedText = words.slice(0, wordLimit).join(' ') + '...';

    // Create a new temporary div to construct trimmed HTML
    const trimmedDiv = document.createElement('div');
    trimmedDiv.innerText = trimmedText; // Set the trimmed text as inner text
    
    // Return trimmed HTML, still sanitized
    return DOMPurify.sanitize(trimmedDiv.innerHTML);
  };
