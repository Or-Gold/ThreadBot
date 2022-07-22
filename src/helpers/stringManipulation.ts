/*
 * Basically some functions I steal from stack overflow for text validation and formatting
 */
export function capitalizeFirst(word: string) {
    return word.charAt(0).toUpperCase().concat(word.slice(1))
}

export function isValidHttpUrl(test_url: string) {
  let url;
  try {
    url = new URL(test_url);
  } catch (_) {
    return false;  
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
