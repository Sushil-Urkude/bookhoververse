import axios from 'axios';

export const API_BASE_URL = 'http://127.0.0.1:8002/api';
export const STATIC_URL = 'http://127.0.0.1:8002/static';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export interface Author {
  id: number;
  name: string;
  bio: string;
  image_path: string | null;
}

export interface Book {
  id: number;
  title: string;
  published_date: string;
  rating: number;
  review: string;
  cover_image_path: string | null;
  genre: string;
  author: Author;
}

export const apiService = {
  // Auth
  login: async (password: string) => {
    const response = await api.post('/admin/login', { password });
    return response.data;
  },

  // Books
  getBooks: async (): Promise<Book[]> => {
    const response = await api.get('/get_books');
    return response.data;
  },

  getBook: async (id: number): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  createBook: async (formData: FormData): Promise<Book> => {
    const response = await api.post('/add_books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateBook: async (id: number, bookData: Partial<Book>): Promise<Book> => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },

  // Authors
  getAuthors: async (): Promise<Author[]> => {
    const response = await api.get('/authors');
    return response.data;
  },

  getAuthor: async (id: number): Promise<Author> => {
    const response = await api.get(`/authors/${id}`);
    return response.data;
  },
};

// Helper function for authenticated fetch requests
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('adminToken');
  
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }

  return response;
}

export default api;