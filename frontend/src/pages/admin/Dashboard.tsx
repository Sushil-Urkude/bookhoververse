import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/types';
import { bookService } from '@/services/bookService';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await bookService.getBooks();
      setBooks(data);
    } catch (error) {
      toast.error('Failed to load books');
      console.error('Error loading books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await bookService.deleteBook(id);
      toast.success('Review deleted successfully');
      loadBooks(); // Reload the list
    } catch (error) {
      toast.error('Failed to delete review');
      console.error('Error deleting review:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link
            to="/admin/add-review"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add New Review
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          {books.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No reviews yet. Add your first review!
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {books.map((book) => (
                <li key={book.id} className="p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{book.title}</h2>
                    <p className="text-gray-600">by {book.author_name}</p>
                    <p className="text-sm text-gray-500">Rating: {book.rating}/5</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 