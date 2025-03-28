import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Author {
  id: number;
  name: string;
  bio: string | null;
  image_path: string | null;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: number;
  title: string;
  genre: string;
  cover_image_path: string | null;
  spine_color: string | null;
  review: string | null;
  rating: number | null;
  published_date: string | null;
  author_id: number;
  created_at: string;
  updated_at: string;
  author: Author;
}

export const apiService = {
  // Books
  getBooks: async (): Promise<Book[]> => {
    const response = await api.get('/books/');
    return response.data;
  },

  getBook: async (id: number): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  getBooksByGenre: async (genre: string): Promise<Book[]> => {
    const response = await api.get(`/books/genre/${genre}`);
    return response.data;
  },

  createBook: async (bookData: Omit<Book, 'id' | 'created_at' | 'updated_at'>): Promise<Book> => {
    const response = await api.post('/books/', bookData);
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
    const response = await api.get('/authors/');
    return response.data;
  },

  getAuthor: async (id: number): Promise<Author> => {
    const response = await api.get(`/authors/${id}`);
    return response.data;
  },

  createAuthor: async (authorData: Omit<Author, 'id' | 'created_at' | 'updated_at'>): Promise<Author> => {
    const response = await api.post('/authors/', authorData);
    return response.data;
  },

  updateAuthor: async (id: number, authorData: Partial<Author>): Promise<Author> => {
    const response = await api.put(`/authors/${id}`, authorData);
    return response.data;
  },

  deleteAuthor: async (id: number): Promise<void> => {
    await api.delete(`/authors/${id}`);
  },
}; 