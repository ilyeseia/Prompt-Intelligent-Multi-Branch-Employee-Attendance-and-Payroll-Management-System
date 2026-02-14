// ============================================
// API Client - Frontend Development Guidelines
// ============================================

import { toast } from 'sonner';

// Types
interface ApiError {
  status: number;
  message: string;
  details?: string[];
}

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  skipToast?: boolean;
}

// API Error class
export class ApiRequestError extends Error {
  status: number;
  details?: string[];

  constructor(status: number, message: string, details?: string[]) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.details = details;
  }
}

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

// Token management
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }
}

export function getAuthToken(): string | null {
  if (authToken) return authToken;
  if (typeof window !== 'undefined') {
    authToken = localStorage.getItem('auth_token');
  }
  return authToken;
}

// API Client class
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(path: string, params?: Record<string, unknown>): string {
    const url = new URL(`${this.baseUrl}${path}`, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private async handleResponse<T>(
    response: Response,
    skipToast: boolean = false
  ): Promise<T> {
    if (response.ok) {
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    }

    let error: ApiError;
    try {
      const json = await response.json();
      error = {
        status: response.status,
        message: json.message || 'An unexpected error occurred',
        details: json.details || json.errors,
      };
    } catch {
      error = {
        status: response.status,
        message: response.statusText || 'An unexpected error occurred',
      };
    }

    if (response.status === 401) {
      setAuthToken(null);
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    if (!skipToast) {
      toast.error(error.message);
    }

    throw new ApiRequestError(error.status, error.message, error.details);
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { params, skipToast, ...init } = options;
    const url = this.buildUrl(path, params);
    const token = getAuthToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...init.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, { ...init, headers });
      return this.handleResponse<T>(response, skipToast);
    } catch (error) {
      if (error instanceof ApiRequestError) {
        throw error;
      }
      const message = 'Network error. Please check your connection.';
      if (!skipToast) {
        toast.error(message);
      }
      throw new ApiRequestError(0, message);
    }
  }

  get<T>(
    path: string,
    params?: Record<string, unknown>,
    options?: Omit<RequestOptions, 'method' | 'params'>
  ): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET', params });
  }

  post<T>(
    path: string,
    body: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(
    path: string,
    body: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch<T>(
    path: string,
    body: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(path: string, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);

export type { PaginatedResponse, RequestOptions };
