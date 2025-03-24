
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
  const [hoverState, setHoverState] = useState<'initial' | 'cover' | 'author'>('initial');
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div 
      className="book-card group relative w-full h-[400px] cursor-pointer"
      onMouseEnter={() => setHoverState('cover')}
      onMouseLeave={() => setHoverState('initial')}
      onClick={handleBookClick}
    >
      {/* Book spine */}
      <div 
        className="book-spine absolute inset-0 flex items-center justify-center rounded-md shadow-book"
        style={{ backgroundColor: spineColor }}
      >
        <div className="transform -rotate-90 whitespace-nowrap px-4">
          {/* Title removed from spine view as requested */}
        </div>
      </div>
      
      {/* Book cover */}
      <div className="book-cover w-full h-full">
        <div className="relative w-full h-full overflow-hidden rounded-md shadow-hover">
          {/* Cover image */}
          <div 
            className={`absolute inset-0 transition-opacity duration-300 ${
              hoverState === 'initial' || hoverState === 'cover' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 bg-gray-200 animate-soft-pulse ${isLoaded ? 'hidden' : 'block'}`}></div>
            <img 
              src={coverImage} 
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsLoaded(true)}
            />
            {/* Removed the title display from the bottom of the cover */}
          </div>
          
          {/* Author info - shows on second level hover */}
          <div 
            className={`author-info absolute inset-0 bg-darknavy flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 ${
              hoverState === 'cover' ? 'opacity-0' : 'opacity-100'
            }`}
            onMouseEnter={() => setHoverState('author')}
          >
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
        </div>
      </div>
    </div>
  );
};

export default BookCard;
