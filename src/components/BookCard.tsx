
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
      
      {/* Book with 3D opening effect */}
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* Front cover with opening animation */}
        <div 
          className="absolute inset-0 w-full h-full transition-all duration-700 origin-left"
          style={{ 
            transform: isHovered ? 'rotateY(-65deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            zIndex: 20,
            boxShadow: isHovered ? '5px 5px 15px rgba(0, 0, 0, 0.3)' : 'none'
          }}
        >
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover transition-all duration-500"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              filter: isHovered ? 'brightness(0.95)' : 'brightness(1)'
            }}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Book spine edge */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 md:w-2"
            style={{ 
              backgroundColor: spineColor,
              transform: 'translateX(-50%)',
              zIndex: 30
            }}
          />
          
          {/* Cover thickness edge - top */}
          <div 
            className="absolute left-0 right-0 top-0 h-1"
            style={{ 
              backgroundColor: spineColor,
              transform: 'translateY(-50%) rotateX(90deg)',
              transformOrigin: 'top',
              opacity: isHovered ? 1 : 0,
            }}
          />
          
          {/* Cover thickness edge - right */}
          <div 
            className="absolute top-0 bottom-0 right-0 w-1"
            style={{ 
              backgroundColor: spineColor,
              transform: 'translateX(50%) rotateY(90deg)',
              transformOrigin: 'right',
              opacity: isHovered ? 1 : 0,
            }}
          />
          
          {/* Cover thickness edge - bottom */}
          <div 
            className="absolute left-0 right-0 bottom-0 h-1"
            style={{ 
              backgroundColor: spineColor,
              transform: 'translateY(50%) rotateX(-90deg)',
              transformOrigin: 'bottom',
              opacity: isHovered ? 1 : 0,
            }}
          />
        </div>
        
        {/* Inside pages */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            transformStyle: 'preserve-3d',
            zIndex: 15,
          }}
        >
          {/* Page stack effect - multiple layers */}
          {[...Array(5)].map((_, index) => (
            <div 
              key={index}
              className="absolute inset-0 bg-cream"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: isHovered ? `rotateY(-${65 - (index * 3)}deg)` : 'rotateY(0deg)',
                zIndex: 15 - index,
                opacity: 0.9 - (index * 0.15),
                transition: `transform ${0.7 + (index * 0.1)}s ease-out`,
                boxShadow: isHovered ? 'inset 20px 0 20px rgba(0, 0, 0, 0.05)' : 'none'
              }}
            />
          ))}
        </div>
        
        {/* Inside content page */}
        <div 
          className="absolute inset-0 w-full h-full bg-cream"
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            zIndex: 10,
            backgroundImage: 'linear-gradient(to right, #f0e9e0, #fff)',
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="p-4 md:p-6 flex flex-col justify-center items-center h-full text-center">
            <h3 className="text-navy font-medium text-lg md:text-xl mb-2">{title}</h3>
            <p className="text-charcoal/80 text-sm">{genre}</p>
            
            <div className="my-4 border-t border-b border-navy/20 w-16"></div>
            
            <div className="flex flex-col items-center mt-2">
              <img 
                src={author.image} 
                alt={author.name} 
                className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border border-navy/30 mb-2 md:mb-3 shadow-sm"
              />
              <p className="font-serif text-navy text-sm md:text-base">{author.name}</p>
              <p className="text-charcoal/70 text-xs md:text-sm mt-3 line-clamp-3 md:line-clamp-4">{author.bio}</p>
            </div>
            
            <div className="mt-4 md:mt-6">
              <div className="bg-accent1 hover:bg-accent1/80 text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 transform">
                Read Review
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Title overlay at bottom - only visible on mobile or when book is closed */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/90 to-transparent p-4 md:hidden transition-all duration-300"
        style={{
          opacity: !isHovered ? 1 : 0,
          transform: !isHovered ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: 'none',
          zIndex: 40
        }}
      >
        <h3 className="text-white font-medium text-lg mb-1">{title}</h3>
        <p className="text-white/80 text-sm">{genre}</p>
      </div>
    </div>
  );
};

export default BookCard;
