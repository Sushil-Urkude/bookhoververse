import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiService, STATIC_URL } from "../lib/api";
import type { Book } from "../lib/api";

const GENRES = ['Fiction', 'Fantasy', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'History'];

const BookReview = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBookAndSimilar = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the current book
        const bookData = await apiService.getBook(Number(id));
        setBook(bookData);
        
        // Fetch similar books by genre
        const books = await apiService.getBooksByGenre(bookData.genre, 0, 5);
        setSimilarBooks(books.filter(b => b.id !== bookData.id).slice(0, 4));
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load the book. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookAndSimilar();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar genres={GENRES} onGenreSelect={() => {}} />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="w-full max-w-4xl animate-pulse">
            <div className="h-8 bg-softgray rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-softgray rounded mb-8"></div>
            <div className="h-4 bg-softgray rounded w-full mb-2"></div>
            <div className="h-4 bg-softgray rounded w-full mb-2"></div>
            <div className="h-4 bg-softgray rounded w-5/6 mb-6"></div>
            <div className="h-4 bg-softgray rounded w-full mb-2"></div>
            <div className="h-4 bg-softgray rounded w-full mb-2"></div>
            <div className="h-4 bg-softgray rounded w-4/6"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar genres={GENRES} onGenreSelect={() => {}} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-serif text-navy mb-4">Book Not Found</h2>
          <p className="mb-6">{error || "The book you're looking for doesn't exist or has been removed."}</p>
          <Link to="/" className="px-6 py-2 bg-navy text-white rounded-full hover:bg-darknavy transition-colors">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar genres={GENRES} onGenreSelect={() => {}} />
      
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center text-navy hover:text-accent1 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reviews
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Book Cover */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-full h-[450px] max-w-[300px] rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={book.cover_image_path ? `${STATIC_URL}${book.cover_image_path}` : undefined}
                  alt={book.title} 
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            </div>
            
            {/* Book Info */}
            <div className="md:col-span-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">{book.title}</h1>
              
              <div className="flex items-center mb-6">
                <img 
                  src={book.author.image_path ? `${STATIC_URL}${book.author.image_path}` : undefined}
                  alt={book.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md mr-4" 
                />
                <div>
                  <h3 className="font-medium text-lg">{book.author.name}</h3>
                  <p className="text-sm text-charcoal/70">{book.author.bio}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-1 bg-navy/10 text-navy rounded-full text-sm font-medium">
                  {book.genre}
                </span>
                <span className="px-4 py-1 bg-navy/10 text-navy rounded-full text-sm font-medium">
                  {book.rating}/5 ★
                </span>
                <span className="px-4 py-1 bg-navy/10 text-navy rounded-full text-sm font-medium">
                  Published: {book.published_date}
                </span>
              </div>
              
              <div className="bg-white/50 rounded-lg p-6 shadow-md mb-8">
                <h2 className="text-2xl font-serif font-semibold text-navy mb-4">Review</h2>
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed text-charcoal">
                    {book.review}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {similarBooks.length > 0 && (
            <div className="border-t border-softgray pt-8">
              <h2 className="text-2xl font-serif font-semibold text-navy mb-6">Similar Books You Might Enjoy</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {similarBooks.map(similarBook => (
                  <Link to={`/book/${similarBook.id}`} key={similarBook.id} className="group">
                    <div className="relative h-60 rounded-md overflow-hidden shadow-lg">
                      <img 
                        src={similarBook.cover_image_path ? `${STATIC_URL}${similarBook.cover_image_path}` : undefined}
                        alt={similarBook.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent flex items-end">
                        <div className="p-4">
                          <h3 className="text-white font-medium">{similarBook.title}</h3>
                          <p className="text-white/80 text-sm">{similarBook.author.name}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookReview;
