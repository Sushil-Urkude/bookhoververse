import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('Search');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchHints = ['Search by genre...', 'Search by book title...', 'Search by author...'];
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isExpanded && searchQuery === '') {
      interval = setInterval(() => {
        setCurrentHintIndex((prev) => (prev + 1) % searchHints.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isExpanded, searchQuery]);

  useEffect(() => {
    if (isExpanded && searchQuery === '') {
      setPlaceholder(searchHints[currentHintIndex]);
    } else {
      setPlaceholder('Search');
    }
  }, [currentHintIndex, isExpanded, searchQuery]);

  const handleSearchClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery('');
    onSearch('');
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative flex items-center">
      <div
        className={`flex items-center bg-cream rounded-full border border-navy/20 shadow-subtle transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-full md:w-[400px]' : 'w-10 h-10'
        }`}
      >
        <button
          onClick={handleSearchClick}
          className={`flex items-center justify-center transition-all duration-300 ${
            isExpanded ? 'ml-4' : 'w-10 h-10'
          }`}
          aria-label="Search"
        >
          <Search className={`w-5 h-5 text-navy transition-transform duration-300 ${
            isExpanded ? 'transform -translate-x-1' : ''
          }`} />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearchInput}
          placeholder={placeholder}
          className={`w-full px-4 py-2 text-navy placeholder-navy/50 bg-transparent outline-none transition-all duration-300 font-medium ${
            isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible w-0'
          }`}
        />
        {isExpanded && (
          <button
            onClick={handleClose}
            className={`flex items-center justify-center w-10 h-10 mr-1 transition-opacity duration-200 ${
              searchQuery ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-navy hover:text-darknavy transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 