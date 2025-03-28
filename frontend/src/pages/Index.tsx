import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import { apiService, Book } from '../lib/api';

const GENRES = ['Fiction', 'Fantasy', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'History'];

const Index = () => {
  const [activeGenre, setActiveGenre] = useState('all');
  const [visibleBooks, setVisibleBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const books = await apiService.getBooks();
        setVisibleBooks(books);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        console.error('Error fetching books:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);
  
  useEffect(() => {
    const fetchBooksByGenre = async () => {
      if (activeGenre === 'all') {
        try {
          setIsLoading(true);
          const books = await apiService.getBooks();
          setVisibleBooks(books);
        } catch (err) {
          setError('Failed to fetch books. Please try again later.');
          console.error('Error fetching books:', err);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          setIsLoading(true);
          const books = await apiService.getBooksByGenre(activeGenre);
          setVisibleBooks(books);
        } catch (err) {
          setError('Failed to fetch books. Please try again later.');
          console.error('Error fetching books:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBooksByGenre();
  }, [activeGenre]);
  
  const handleGenreSelect = (genre: string) => {
    setActiveGenre(genre);
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        genres={GENRES} 
        onGenreSelect={handleGenreSelect}
      />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        {error ? (
          <div className="text-center text-red-500 py-8">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {isLoading ? (
              // Skeleton loading state
              Array(8).fill(0).map((_, index) => (
                <div key={index} className="h-[400px] bg-softgray animate-pulse rounded-md"></div>
              ))
            ) : (
              visibleBooks.map(book => (
                <div key={book.id} className="transition-all duration-300">
                  <BookCard 
                    id='{book.id}'
                    title={book.title}
                    author={{
                      name: book.author.name,
                      image: book.author.image_path ? `/static${book.author.image_path}` : undefined,
                      bio: book.author.bio || undefined
                    }}
                    coverImage={book.cover_image_path ? `/static${book.cover_image_path}` : undefined}
                    spineColor={book.spine_color || undefined}
                    genre={book.genre}
                  />
                </div>
              ))
            )}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-navy text-white font-medium rounded-full hover:bg-darknavy transition-all duration-300 shadow-subtle">
            Load More Books
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
