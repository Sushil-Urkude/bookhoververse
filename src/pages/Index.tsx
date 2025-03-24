
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import GenreTabs from '../components/GenreTabs';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';

// Sample data - in a real app, this would come from an API
const GENRES = ['Fiction', 'Fantasy', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'History'];

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
    genre: 'Fiction'
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
    genre: 'Sci-Fi'
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
    genre: 'Fiction'
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
    genre: 'Mystery'
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
    genre: 'Romance'
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
    genre: 'Biography'
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
    genre: 'Biography'
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
    genre: 'Fantasy'
  }
];

const Index = () => {
  const [activeGenre, setActiveGenre] = useState('all');
  const [visibleBooks, setVisibleBooks] = useState(BOOKS);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (activeGenre === 'all') {
      setVisibleBooks(BOOKS);
    } else {
      setVisibleBooks(BOOKS.filter(book => book.genre === activeGenre));
    }
  }, [activeGenre]);
  
  const handleGenreChange = (genre: string) => {
    setActiveGenre(genre);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <main id="books-section" className="container mx-auto px-4 md:px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Featured Books</h2>
          <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
            Browse our curated collection of exceptional books across various genres. 
            Hover over any book to discover more about its author.
          </p>
        </div>
        
        <GenreTabs 
          genres={GENRES}
          activeGenre={activeGenre}
          onGenreChange={handleGenreChange}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mt-8">
          {isLoading ? (
            // Skeleton loading state
            Array(8).fill(0).map((_, index) => (
              <div key={index} className="h-[400px] bg-softgray animate-pulse rounded-md"></div>
            ))
          ) : (
            visibleBooks.map(book => (
              <div key={book.id} className="transition-all duration-300">
                <BookCard {...book} />
              </div>
            ))
          )}
        </div>
        
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
