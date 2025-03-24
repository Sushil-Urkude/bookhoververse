
import { Link } from 'react-router-dom';

const Hero = ({ title, subtitle, description }) => {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto py-8 md:py-12 px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-navy mb-4">
            {title}
          </h1>
          {subtitle && (
            <div className="text-lg md:text-xl text-accent1 mb-3 font-serif italic">
              {subtitle}
            </div>
          )}
          {description && (
            <p className="text-charcoal/80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/category/development" className="px-4 py-2 bg-navy text-white rounded hover:bg-navy/80 transition-colors">
              Development
            </Link>
            <Link to="/category/design" className="px-4 py-2 bg-accent1 text-white rounded hover:bg-accent1/80 transition-colors">
              Design
            </Link>
            <Link to="/category/cloud" className="px-4 py-2 bg-charcoal text-white rounded hover:bg-charcoal/80 transition-colors">
              Cloud
            </Link>
            <Link to="/category/performance" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">
              Performance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
