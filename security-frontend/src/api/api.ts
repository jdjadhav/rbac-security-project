const BASE_URL = 'http://localhost:8080/api';

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // We will handle routing via state instead of window.location later,
    // but a reload will clear state and reset to default route.
    window.location.reload();
  }

  const data = await response.json().catch(() => ({}));
  
  if (!response.ok) {
    const error: any = new Error(data.message || 'API Error');
    error.response = { status: response.status, data };
    throw error;
  }
  
  return { data };
}

const api = {
  get: (endpoint: string) => apiFetch(endpoint, { method: 'GET' }),
  post: (endpoint: string, data: any) => apiFetch(endpoint, { method: 'POST', body: JSON.stringify(data) }),
};

export default api;
