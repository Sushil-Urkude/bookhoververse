
import { Link } from 'react-router-dom';

const Hero = ({ title, subtitle, description }) => {
  return (
    <div className="w-full bg-cream border-b border-gray-200">
      <div className="container mx-auto py-10 md:py-16 px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-navy mb-4 animate-fade-in">
            {title}
          </h1>
          {subtitle && (
            <div className="text-lg md:text-xl text-accent1 mb-3 font-serif italic animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </div>
          )}
          {description && (
            <p className="text-charcoal/80 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {description}
            </p>
          )}
          
          <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/category/development" className="category-button bg-navy text-white rounded hover:bg-navy/80 transition-all duration-300 transform hover:scale-105 shadow-md px-4 py-2">
              Development
            </Link>
            <Link to="/category/design" className="category-button bg-accent1 text-white rounded hover:bg-accent1/80 transition-all duration-300 transform hover:scale-105 shadow-md px-4 py-2">
              Design
            </Link>
            <Link to="/category/cloud" className="category-button bg-charcoal text-white rounded hover:bg-charcoal/80 transition-all duration-300 transform hover:scale-105 shadow-md px-4 py-2">
              Cloud
            </Link>
            <Link to="/category/performance" className="category-button bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md px-4 py-2">
              Performance
            </Link>
            <Link to="/category/accessibility" className="category-button bg-purple-600 text-white rounded hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md px-4 py-2">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
