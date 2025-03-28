import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { BookOpen, Star } from "lucide-react";

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
  spineColor?: string;
  genre: string;
  rating: number;
}

const BookCard = ({ id, title, author, coverImage, spineColor = '#2b4c7e', genre, rating }: BookProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${id}`);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div 
      className="book-card relative w-full cursor-pointer rounded-md overflow-hidden shadow-lg transition-all duration-500 hover:scale-105 md:h-[400px] h-[320px] hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            transform: isHovered ? 'rotateY(-170deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            zIndex: 20,
            boxShadow: isHovered ? '5px 5px 15px rgba(0, 0, 0, 0.3)' : 'none',
            borderRight: isHovered ? '1px solid rgba(0,0,0,0.05)' : 'none'
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
          
          {/* Book spine */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 md:w-2"
            style={{ 
              backgroundColor: spineColor,
              transform: 'translateX(-50%)',
              zIndex: 30
            }}
          />
        </div>
        
        {/* First page with author details and book info */}
        <div 
          className="absolute inset-0 w-full h-full transition-all duration-700 origin-left border-r border-gray-200"
          style={{ 
            transform: isHovered ? 'rotateY(-165deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            zIndex: 15,
            backgroundColor: '#f9f7f1',
            boxShadow: isHovered ? 'inset 5px 0 10px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <div className="p-4 md:p-6 flex flex-col justify-between items-center h-full text-center">
            <div className="flex flex-col items-center">
              <Avatar className="w-16 h-16 md:w-24 md:h-24 border-2 border-gray-300/50 shadow-md mb-3">
                <AvatarImage src={author.image} alt={author.name} className="object-cover" />
                <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <h4 className="text-navy font-medium text-base md:text-lg">{author.name}</h4>
              <div className="mt-2 w-12 h-0.5 bg-accent1/50 rounded-full"></div>
            </div>
            
            <div className="my-3">
              <h3 className="text-navy font-medium text-base md:text-lg mb-1">{title}</h3>
              <span className="inline-block px-3 py-1 bg-navy/10 text-navy text-xs rounded-full">{genre}</span>
              <div className="flex justify-center mt-2">
                {renderStars(rating)}
              </div>
              <p className="text-charcoal/70 text-xs md:text-sm mt-3 line-clamp-2">{author.bio}</p>
            </div>
            
            <Button 
              onClick={handleBookClick}
              className="bg-accent1 hover:bg-accent1/80 text-white rounded-full transition-all duration-300 transform hover:scale-105"
              size="sm"
            >
              <BookOpen className="mr-1 h-4 w-4" />
              Read Review
            </Button>
          </div>
        </div>
        
        {/* Inside page/content */}
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
            
            <div className="flex justify-center mb-4">
              {renderStars(rating)}
            </div>
            
            <div className="mt-4 md:mt-6">
              <button
                onClick={handleBookClick}
                className="bg-accent1 hover:bg-accent1/80 text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 transform"
              >
                Read Review
              </button>
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
