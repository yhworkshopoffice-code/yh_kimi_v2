// API helper with retry logic
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // If successful, return response
      if (response.ok) {
        return response;
      }
      
      // If 401 Unauthorized, don't retry
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      
      // For other errors, retry
      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      // Don't retry on network errors if it's the last attempt
      if (attempt === maxRetries - 1) {
        break;
      }
    }
    
    // Wait before retrying (exponential backoff)
    if (attempt < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
}

export { fetchWithRetry };
