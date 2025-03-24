
import { useEffect, useRef } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const parallaxFactor = 0.5;
        heroRef.current.style.transform = `translateY(${scrollY * parallaxFactor}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToBooks = () => {
    const booksSection = document.getElementById('books-section');
    if (booksSection) {
      booksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div 
        ref={heroRef}
        className="absolute inset-0 bg-gradient-to-br from-cream via-softgray to-cream opacity-90 z-0"
      />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in [animation-delay:200ms] mb-6">
          <BookOpen size={48} className="text-navy mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-navy mb-4 tracking-tight">
            BookCove
          </h1>
          <div className="w-24 h-1 bg-accent1 mx-auto mb-6"></div>
        </div>
        
        <div className="animate-fade-in [animation-delay:400ms] max-w-2xl">
          <p className="text-lg md:text-xl text-charcoal mb-10">
            Immerse yourself in a world of stories. Discover new books, read thoughtful reviews, and find your next literary adventure.
          </p>
        </div>
        
        <div className="animate-fade-in [animation-delay:600ms] flex gap-4">
          <button className="px-8 py-3 bg-navy text-white font-medium rounded-lg hover:bg-darknavy transition-all duration-300 shadow-subtle transform hover:-translate-y-1">
            Explore Reviews
          </button>
          <button className="px-8 py-3 border-2 border-navy text-navy font-medium rounded-lg hover:bg-navy hover:text-white transition-all duration-300 shadow-subtle transform hover:-translate-y-1">
            Discover Books
          </button>
        </div>
        
        <div 
          className="absolute bottom-10 animate-bounce cursor-pointer hover:text-accent1 transition-colors"
          onClick={scrollToBooks}
        >
          <ChevronDown className="text-navy" size={32} />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent z-10" />
    </div>
  );
};

export default Hero;
