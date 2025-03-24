
import { Heart, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-12 mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">BookHoverVerse</h3>
            <p className="text-white/80 max-w-md">
              A curated collection of book reviews and recommendations for literary enthusiasts. 
              Discover your next favorite read through our immersive experience.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Books</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
            <p className="text-white/80 text-sm">
              Subscribe to our newsletter for the latest book reviews and literary news.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} BookHoverVerse. All rights reserved.
          </p>
          <p className="text-white/60 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-accent1" /> for book lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
