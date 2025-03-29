import { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  genres: string[];
  onGenreSelect?: (genre: string) => void;
}

const Navbar = ({ genres, onGenreSelect }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGenreClick = (genre: string) => {
    if (onGenreSelect) {
      onGenreSelect(genre);
      setShowGenres(false);
      setIsMenuOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 300);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Add your search logic here
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/70 backdrop-blur-md shadow-subtle' : 'py-5 bg-transparent'}`}>
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Left side - empty div for spacing */}
          <div className="w-20"> {/* Width to match the right side icons */}
          </div>

          {/* Center - Bookish Reviews */}
          <a href="/" className="text-2xl font-serif font-bold text-navy tracking-tight">
            Bookish Reviews
          </a>
          
          {/* Right side - Search and Menu */}
          <div className="flex items-center space-x-0 w-20"> {/* Fixed width to match left side */}
            <div className="relative flex items-center justify-end w-full">
              <div 
                className={`
                  flex items-center bg-cream/50 backdrop-blur-sm
                  transition-all duration-300 ease-in-out absolute right-0
                  ${isSearchOpen ? 'w-64 px-3 py-1' : 'w-10'}
                `}
              >
                <button 
                  className={`
                    text-navy hover:text-accent1 
                    transition-all duration-300 ease-in-out
                    ${isSearchOpen ? 'absolute left-2' : 'ml-2.5'}
                  `}
                  onClick={toggleSearch}
                >
                  <Search size={20} />
                </button>
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search for book, author, genre"
                  className={`
                    pl-8
                    bg-transparent
                    outline-none
                    text-navy
                    placeholder-gray-400/70
                    w-full
                    transition-all duration-300 ease-in-out
                    ${isSearchOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}
                  `}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      setIsSearchOpen(false);
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Menu Button */}
            <div className="relative">
              <button 
                className="p-2 text-navy hover:text-accent1 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  {/* Genre Section */}
                  <div className="relative">
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => setShowGenres(!showGenres)}
                    >
                      <span>Genres</span>
                      <ChevronRight size={16} className={`transform transition-transform ${showGenres ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {/* Genre Submenu */}
                    {showGenres && (
                      <div className="absolute left-full top-0 w-48 bg-white rounded-lg shadow-lg py-2">
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => handleGenreClick('all')}
                        >
                          All Books
                        </button>
                        {genres.map((genre) => (
                          <button
                            key={genre}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => handleGenreClick(genre)}
                          >
                            {genre}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-2"></div>

                  {/* Additional Pages */}
                  <a 
                    href="/about" 
                    className="block px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </a>
                  <a 
                    href="/contact" 
                    className="block px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </a>
                  <a 
                    href="/privacy" 
                    className="block px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Privacy
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
