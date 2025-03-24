
import { useState } from 'react';

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

  return (
    <div className="book-card group relative w-full h-[400px] cursor-pointer">
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
          <div className={`absolute inset-0 bg-gray-200 animate-soft-pulse ${isLoaded ? 'hidden' : 'block'}`}></div>
          <img 
            src={coverImage} 
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Author info overlay */}
          <div className="author-info absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/80 to-transparent">
            <div className="flex items-center space-x-3">
              <img 
                src={author.image} 
                alt={author.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h4 className="text-white font-medium">{author.name}</h4>
                <p className="text-white/80 text-sm line-clamp-1">{author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
