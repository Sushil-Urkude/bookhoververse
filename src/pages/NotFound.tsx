
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BookX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-32">
        <BookX size={64} className="text-navy mb-6" />
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-navy">
          Page Not Found
        </h1>
        <p className="text-lg text-charcoal/80 max-w-md text-center mb-8">
          The book you're looking for seems to be missing from our shelves. 
          Let's take you back to our collection.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-navy text-white font-medium rounded-full hover:bg-darknavy transition-all duration-300 shadow-subtle"
        >
          Return to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
