
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample data - in a real app, this would come from an API
const BOOKS = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: {
      name: 'Matt Haig',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Matt Haig is a British author and journalist.'
    },
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    spineColor: '#345995',
    genre: 'Fiction',
    review: "The Midnight Library is a thought-provoking novel that explores the concept of life's infinite possibilities. Nora Seed finds herself in a library between life and death, where each book represents a different version of her life. It's a profound exploration of regret, hope, and the power of our choices. Matt Haig masterfully blends philosophical questions with compelling storytelling, creating a book that's both comforting and challenging.",
    rating: 4.5,
    publishedDate: '2020-08-13'
  },
  {
    id: '2',
    title: 'Dune',
    author: {
      name: 'Frank Herbert',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Frank Herbert was an American science fiction writer.'
    },
    coverImage: 'https://images.unsplash.com/photo-1531709510760-186d5bfe58a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    spineColor: '#EE6C4D',
    genre: 'Sci-Fi',
    review: "Dune is a masterpiece of science fiction that remains as relevant today as when it was published in 1965. Set on the desert planet Arrakis, it tells the story of Paul Atreides, whose family accepts the stewardship of the planet. The narrative explores politics, religion, ecology, and human emotion in a complex interstellar society. Herbert's world-building is unparalleled, creating a universe with its own coherent history, cultures, and technologies.",
    rating: 5.0,
    publishedDate: '1965-08-01'
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: {
      name: 'F. Scott Fitzgerald',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'F. Scott Fitzgerald was an American novelist.'
    },
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    spineColor: '#5CBEDF',
    genre: 'Fiction',
    review: "The Great Gatsby is a tragic love story set in the glittering Jazz Age of 1920s America. Fitzgerald's novel provides a critical social history of America during the Roaring Twenties. The narrative follows the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan. Through this story, Fitzgerald explores themes of decadence, idealism, social upheaval, resistance to change, and excess.",
    rating: 4.8,
    publishedDate: '1925-04-10'
  },
  {
    id: '4',
    title: 'Murder on the Orient Express',
    author: {
      name: 'Agatha Christie',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Agatha Christie was an English writer known for her mystery novels.'
    },
    coverImage: 'https://images.unsplash.com/photo-1587876931567-564ce588bfbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    spineColor: '#540D6E',
    genre: 'Mystery',
    review: "Murder on the Orient Express is one of Agatha Christie's most famous detective novels featuring the brilliant Hercule Poirot. When the Orient Express is stopped by snowdrifts, a passenger is found murdered. Isolated by the snow, Poirot must find the killer among the passengers. Christie's ingenious plot and surprising conclusion have made this one of the most popular murder mysteries ever written.",
    rating: 4.7,
    publishedDate: '1934-01-01'
  },
  {
    id: '5',
    title: 'Pride and Prejudice',
    author: {
      name: 'Jane Austen',
      image: 'https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Jane Austen was an English novelist known for social commentary.'
    },
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    spineColor: '#FF69B4',
    genre: 'Romance',
    review: "Pride and Prejudice is a romantic novel of manners that follows the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness. Austen's wit and social observations make this novel a timeless classic that explores themes of pride, prejudice, marriage, and social status in early 19th-century England.",
    rating: 4.9,
    publishedDate: '1813-01-28'
  },
  {
    id: '6',
    title: 'Steve Jobs',
    author: {
      name: 'Walter Isaacson',
      image: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Walter Isaacson is an American author, journalist, and professor.'
    },
    coverImage: 'https://images.unsplash.com/photo-1529158062015-cad636e205a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    spineColor: '#3E66B1',
    genre: 'Biography',
    review: "Walter Isaacson's biography of Steve Jobs is a candid portrait of the entrepreneur and Apple co-founder. Based on more than forty interviews with Jobs conducted over two years, as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues, this book chronicles the roller-coaster life and intense personality of a creative entrepreneur whose passion for perfection revolutionized six industries.",
    rating: 4.6,
    publishedDate: '2011-10-24'
  },
  {
    id: '7',
    title: 'Outliers',
    author: {
      name: 'Malcolm Gladwell',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Malcolm Gladwell is a Canadian journalist and author.'
    },
    coverImage: 'https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    spineColor: '#2A9D8F',
    genre: 'Biography',
    review: "In Outliers, Malcolm Gladwell examines the factors that contribute to high levels of success. Challenging the notion that success is simply the result of talent and hard work, Gladwell explores how factors like birthdate, cultural background, and unique opportunities contribute to extraordinary success. Through case studies ranging from The Beatles to Bill Gates, Gladwell presents a compelling argument that success is often influenced by external factors beyond individual control.",
    rating: 4.4,
    publishedDate: '2008-11-18'
  },
  {
    id: '8',
    title: 'The Hobbit',
    author: {
      name: 'J.R.R. Tolkien',
      image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'J.R.R. Tolkien was an English writer, poet, and professor.'
    },
    coverImage: 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    spineColor: '#6A4C93',
    genre: 'Fantasy',
    review: "The Hobbit is a classic fantasy novel that follows the journey of Bilbo Baggins, a comfort-loving hobbit who is reluctantly swept into an epic quest. Under the guidance of the wizard Gandalf, Bilbo joins a group of dwarves to reclaim their mountain home from the dragon Smaug. Along the way, Bilbo encounters trolls, goblins, elves, and the mysterious creature Gollum. Tolkien's masterful world-building and engaging storytelling have made this a beloved classic for generations.",
    rating: 5.0,
    publishedDate: '1937-09-21'
  }
];

const BookReview = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundBook = BOOKS.find(book => book.id === id);
    
    // Simulate API delay
    setTimeout(() => {
      setBook(foundBook || null);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
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

  if (!book) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-serif text-navy mb-4">Book Not Found</h2>
          <p className="mb-6">The book you're looking for doesn't exist or has been removed.</p>
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
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <Link to="/" className="inline-flex items-center text-navy hover:text-accent1 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Book Cover */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[300px] aspect-[2/3] rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: book.spineColor }}>
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Book Info */}
          <div className="md:col-span-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-3">{book.title}</h1>
            
            <div className="flex items-center mb-6">
              <img 
                src={book.author.image} 
                alt={book.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-subtle mr-4" 
              />
              <div>
                <h3 className="font-medium text-lg">{book.author.name}</h3>
                <p className="text-sm text-charcoal/70">{book.author.bio}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-navy/10 text-navy rounded-full text-sm">
                {book.genre}
              </span>
              <span className="px-3 py-1 bg-navy/10 text-navy rounded-full text-sm">
                {book.rating}/5 Rating
              </span>
              <span className="px-3 py-1 bg-navy/10 text-navy rounded-full text-sm">
                Published: {book.publishedDate}
              </span>
            </div>
            
            <h2 className="text-xl font-serif font-semibold text-navy mb-4">Review</h2>
            <p className="text-lg leading-relaxed text-charcoal mb-8">
              {book.review}
            </p>
          </div>
        </div>
        
        <div className="border-t border-softgray pt-8">
          <h2 className="text-2xl font-serif font-semibold text-navy mb-6">Similar Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {BOOKS.filter(b => b.genre === book.genre && b.id !== book.id)
              .slice(0, 4)
              .map(similarBook => (
                <Link to={`/book/${similarBook.id}`} key={similarBook.id} className="group">
                  <div className="relative h-60 rounded-md overflow-hidden shadow-subtle">
                    <img 
                      src={similarBook.coverImage}
                      alt={similarBook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end">
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
      </div>
      
      <Footer />
    </div>
  );
};

export default BookReview;
