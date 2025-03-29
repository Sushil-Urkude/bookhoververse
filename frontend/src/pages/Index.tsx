import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import { apiService, Book } from '../lib/api';
import { Loader2 } from 'lucide-react';

const GENRES = ['Fiction', 'Fantasy', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'History'];
const BOOKS_PER_PAGE = 12;

const Index = () => {
  const [activeGenre, setActiveGenre] = useState('all');
  const [visibleBooks, setVisibleBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const books = await apiService.getBooks(0, BOOKS_PER_PAGE + 1); // Fetch one extra to check if there are more
        setVisibleBooks(books.slice(0, BOOKS_PER_PAGE));
        setHasMore(books.length > BOOKS_PER_PAGE);
        setPage(1);
      } catch (err) {
        setError('Failed to fetch books');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);
  
  useEffect(() => {
    if (activeGenre === 'all') return;
    
    const fetchBooksByGenre = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const books = await apiService.getBooksByGenre(activeGenre, 0, BOOKS_PER_PAGE + 1); // Fetch one extra
        setVisibleBooks(books.slice(0, BOOKS_PER_PAGE));
        setHasMore(books.length > BOOKS_PER_PAGE);
        setPage(1);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        console.error('Error fetching books:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooksByGenre();
  }, [activeGenre]);

  const loadMore = async () => {
    if (!hasMore || isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      setError(null);
      const skip = page * BOOKS_PER_PAGE;
      const newBooks = activeGenre === 'all'
        ? await apiService.getBooks(skip, BOOKS_PER_PAGE + 1)
        : await apiService.getBooksByGenre(activeGenre, skip, BOOKS_PER_PAGE + 1);

      if (newBooks.length > 0) {
        setVisibleBooks(prev => [...prev, ...newBooks.slice(0, BOOKS_PER_PAGE)]);
        setPage(prev => prev + 1);
        setHasMore(newBooks.length > BOOKS_PER_PAGE);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more books:', err);
      setError('Failed to load more books');
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  const handleGenreSelect = (genre: string) => {
    setActiveGenre(genre);
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        genres={GENRES} 
        onGenreSelect={handleGenreSelect}
      />
      
      <main className="container mx-auto px-4 md:px-6 py-12 mt-8 md:mt-12">
        {error ? (
          <div className="text-center text-red-500 py-8">
            {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {isLoading ? (
                // Skeleton loading state
                Array(8).fill(0).map((_, index) => (
                  <div key={index} className="h-[400px] bg-gray-200 animate-pulse rounded-md"></div>
                ))
              ) : (
                visibleBooks.map(book => (
                  <div key={book.id} className="transition-all duration-300">
                    <BookCard 
                      id={book.id.toString()}
                      title={book.title}
                      author={{
                        name: book.author.name,
                        image: book.author.image_path ? `/static${book.author.image_path}` : undefined,
                        bio: book.author.bio || undefined
                      }}
                      coverImage={book.cover_image_path ? `/static${book.cover_image_path}` : undefined}
                      genre={book.genre}
                      rating={book.rating}
                    />
                  </div>
                ))
              )}
            </div>

            {!isLoading && visibleBooks.length > 0 && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore || !hasMore}
                  className={`
                    px-6 py-3 bg-navy text-white rounded-full
                    hover:bg-darknavy transition-all duration-300
                    flex items-center space-x-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Loading more books...</span>
                    </>
                  ) : hasMore ? (
                    <span>Load More Books</span>
                  ) : (
                    <span>No More Books</span>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
