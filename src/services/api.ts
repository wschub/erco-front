// src/services/api.ts

const BASE_URL = import.meta.env.VITE_URL_SERVICE;

function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

function getHeaders(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Error ${response.status}: ${response.statusText} - ${errorBody}`
    );
  }

  return response.json();
}
