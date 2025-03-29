import api from '@/lib/api';
import { Book } from '@/types';

export const bookService = {
  getBooks: () => api.get('/get_books').then(res => res.data),
  
  getBook: (id: number) => api.get(`/books/${id}`).then(res => res.data),
  
  createBook: (formData: FormData) => 
    api.post('/add_books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data),
  
  updateBook: (id: number, data: Partial<Book>) => 
    api.put(`/books/${id}`, data).then(res => res.data),
  
  deleteBook: (id: number) => 
    api.delete(`/books/${id}`).then(res => res.data),
}; 