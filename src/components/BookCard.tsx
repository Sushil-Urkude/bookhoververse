
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Author {
  name: string;
  image: string;
  bio: string;
}

interface BookProps {
  id: string;
  title: string;
  author: Author;
  coverImage: string;
  spineColor: string;
  genre: string;
}

const BookCard = ({ id, title, author, coverImage, spineColor, genre }: BookProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div 
      className="book-card group relative w-full h-[400px] cursor-pointer"
      onMouseEnter={() => setShowAuthor(true)}
      onMouseLeave={() => setShowAuthor(false)}
      onClick={handleBookClick}
    >
      {/* Book spine */}
      <div 
        className="book-spine absolute inset-0 flex items-center justify-center rounded-md shadow-book"
        style={{ backgroundColor: spineColor }}
      >
        <div className="transform -rotate-90 whitespace-nowrap px-4">
          <h3 className="font-serif text-lg font-medium text-white">{title}</h3>
        </div>
      </div>
      
      {/* Book cover */}
      <div className="book-cover w-full h-full">
        <div className="relative w-full h-full overflow-hidden rounded-md shadow-hover">
          {!showAuthor ? (
            <>
              <div className={`absolute inset-0 bg-gray-200 animate-soft-pulse ${isLoaded ? 'hidden' : 'block'}`}></div>
              <img 
                src={coverImage} 
                alt={title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/80 to-transparent">
                <h4 className="text-white font-medium text-lg">{title}</h4>
              </div>
            </>
          ) : (
            <div className="author-info absolute inset-0 bg-darknavy flex flex-col items-center justify-center p-6 text-center">
              <img 
                src={author.image} 
                alt={author.name} 
                className="w-24 h-24 rounded-full object-cover border-2 border-white mb-4"
              />
              <h4 className="text-white font-medium text-lg">{author.name}</h4>
              <p className="text-white/80 text-sm mt-2">{author.bio}</p>
              <div className="mt-4 bg-accent1 text-white px-4 py-2 rounded-full text-sm font-medium">
                Read Review
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
