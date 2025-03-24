
import { useState, useEffect } from 'react';
import { Search, Menu, X, Edit, User, Bell } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/70 backdrop-blur-md shadow-subtle' : 'py-5 bg-transparent'}`}>
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-serif font-bold text-navy tracking-tight">
            Thoughtful Blogger
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="font-medium text-charcoal hover:text-navy transition-colors">Home</a>
            <a href="#" className="font-medium text-charcoal hover:text-navy transition-colors">Categories</a>
            <a href="#" className="font-medium text-charcoal hover:text-navy transition-colors">Popular</a>
            <a href="#" className="font-medium text-charcoal hover:text-navy transition-colors">About</a>
            <a href="#" className="font-medium text-charcoal hover:text-navy transition-colors">Contact</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-navy hover:text-accent1 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-navy hover:text-accent1 transition-colors hidden md:flex">
              <Bell size={20} />
            </button>
            <button className="hidden md:flex px-4 py-2 bg-accent1 hover:bg-accent1/80 text-white rounded-full text-sm font-medium transition-colors flex items-center">
              <Edit size={16} className="mr-2" />
              Write
            </button>
            <button className="hidden md:flex p-2 text-navy hover:text-accent1 transition-colors">
              <User size={20} />
            </button>
            <button 
              className="p-2 text-navy md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4 pb-4 pt-2 bg-white/70 backdrop-blur-md">
          <div className="flex flex-col space-y-3">
            <a href="/" className="font-medium text-charcoal hover:text-navy transition-colors py-2">Home</a>
            <a href="#" className="font-medium text-charcoal hover:text-navy transition-colors py-2">Categories</a>
            <a href="#" className="font-medium text-charcoal hover:text-navy transition-colors py-2">Popular</a>
            <a href="#" className="font-medium text-charcoal hover:text-navy transition-colors py-2">About</a>
            <a href="#" className="font-medium text-charcoal hover:text-navy transition-colors py-2">Contact</a>
            <a href="#" className="font-medium text-charcoal hover:text-navy transition-colors py-2">Write</a>
            <a href="#" className="font-medium text-charcoal hover:text-navy transition-colors py-2">Profile</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
