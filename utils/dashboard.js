export function getDashboardURL(endpoint) {
  return `${
    "https://dashboard.renci.org/api/webinfo/"
  }${endpoint}`;
}

// Helper to make GET requests to Dashboard
export async function fetchFromDashboard(endpoint, options = {}) {
  const defaultOptions = {
    headers: {
      accept: "application/json",
    },
  };
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  const requestUrl = getDashboardURL(endpoint);
  
  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`uh oh.. no data was received`);
  }
  const data = await response.json();
  return data;
}
