
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
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div 
      className="book-card relative w-full h-[400px] cursor-pointer rounded-md overflow-hidden shadow-book transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleBookClick}
    >
      {/* Loading placeholder */}
      <div className="absolute inset-0 bg-gray-200 animate-soft-pulse" style={{ display: isLoaded ? 'none' : 'block' }}></div>
      
      {/* Book cover image */}
      <img 
        src={coverImage} 
        alt={title}
        className="w-full h-full object-cover transition-all duration-300"
        style={{ opacity: isLoaded ? 1 : 0 }}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Author info overlay - shows on hover with transition */}
      <div 
        className="absolute inset-0 bg-darknavy/90 flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ease-in-out"
        style={{ 
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          pointerEvents: isHovered ? 'auto' : 'none'
        }}
      >
        <img 
          src={author.image} 
          alt={author.name} 
          className="w-24 h-24 rounded-full object-cover border-2 border-white mb-4"
        />
        <h4 className="text-white font-medium text-lg">{author.name}</h4>
        <p className="text-white/80 text-sm mt-2">{author.bio}</p>
        <div className="mt-4 bg-accent1 hover:bg-accent1/80 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
          Read Review
        </div>
      </div>
    </div>
  );
};

export default BookCard;
