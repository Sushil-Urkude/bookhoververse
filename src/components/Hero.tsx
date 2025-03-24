
import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

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
        className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-softgray opacity-80 z-0"
      />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in [animation-delay:200ms]">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-navy mb-6 tracking-tight">
            Discover<span className="text-accent1">.</span> Read<span className="text-accent1">.</span> Review<span className="text-accent1">.</span>
          </h1>
        </div>
        
        <div className="animate-fade-in [animation-delay:400ms]">
          <p className="text-lg md:text-xl text-charcoal max-w-3xl mx-auto mb-10">
            Explore a curated collection of book reviews where every story comes to life with immersive 3D interactions.
          </p>
        </div>
        
        <div className="animate-fade-in [animation-delay:600ms]">
          <button className="px-8 py-3 bg-navy text-white font-medium rounded-full hover:bg-darknavy transition-all duration-300 shadow-subtle">
            Explore Books
          </button>
        </div>
        
        <div 
          className="absolute bottom-10 animate-bounce cursor-pointer"
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
