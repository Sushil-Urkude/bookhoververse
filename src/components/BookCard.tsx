
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";

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
      className="book-card relative w-full cursor-pointer rounded-md overflow-hidden shadow-lg transition-all duration-500 hover:scale-105 md:h-[400px] h-[320px] hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleBookClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Loading placeholder */}
      <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ display: isLoaded ? 'none' : 'block' }}></div>
      
      {/* Book cover image with 3D hover effect */}
      <div 
        className="w-full h-full transition-all duration-500"
        style={{ 
          transform: isHovered ? 'rotateY(10deg) translateZ(20px)' : 'rotateY(0) translateZ(0)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-500"
          style={{ 
            opacity: isLoaded ? 1 : 0,
            filter: isHovered ? 'brightness(0.8)' : 'brightness(1)'
          }}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      
      {/* Title that appears at the bottom on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/90 to-transparent p-4 transition-all duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: 'none'
        }}
      >
        <h3 className="text-white font-medium text-lg mb-1">{title}</h3>
        <p className="text-white/80 text-sm">{genre}</p>
      </div>
      
      {/* Author info that slides in from the top */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center"
        style={{ 
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(-30px)',
          pointerEvents: isHovered ? 'auto' : 'none',
          backgroundColor: 'rgba(19, 33, 59, 0.9)',
          transition: 'opacity 0.5s ease, transform 0.5s ease'
        }}
      >
        <img 
          src={author.image} 
          alt={author.name} 
          className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border-2 border-white mb-2 md:mb-4 shadow-lg transition-all duration-500 hover:scale-110"
        />
        <h4 className="text-white font-medium text-base md:text-lg mb-1">{author.name}</h4>
        <p className="text-white/80 text-xs md:text-sm mb-2 md:mb-4 line-clamp-3 md:line-clamp-none">{author.bio}</p>
        <div className="mt-2 bg-accent1 hover:bg-accent1/80 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
          Read Review
        </div>
      </div>
      
      {/* Colored spine effect on the left side */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 md:w-2 transition-all duration-500"
        style={{ 
          backgroundColor: spineColor,
          transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
        }}
      />
    </div>
  );
};

export default BookCard;
