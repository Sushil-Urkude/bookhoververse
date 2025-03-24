
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GenreTabs from '../components/GenreTabs';
import BlogPostCard from '../components/BlogPostCard';
import Footer from '../components/Footer';

// Sample data - in a real app, this would come from an API
const CATEGORIES = ['All', 'Technology', 'Travel', 'Food', 'Lifestyle', 'Health', 'Business', 'Personal'];

const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Future of AI in Everyday Technology',
    author: {
      name: 'Alex Johnson',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Alex is a tech journalist and AI enthusiast with over 10 years of experience covering emerging technologies.'
    },
    coverImage: 'https://images.unsplash.com/photo-1596262940928-4b37db0a2c48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Artificial intelligence is rapidly transforming how we interact with technology in our daily lives. From smart assistants to predictive text, AI applications are becoming more prevalent and sophisticated.',
    category: 'Technology',
    date: '2023-10-15'
  },
  {
    id: '2',
    title: 'Hidden Gems: 5 Underrated Travel Destinations',
    author: {
      name: 'Emma Rodriguez',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Emma is a travel writer and photographer who has visited over 50 countries across six continents.'
    },
    coverImage: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Tired of overtourism? Discover these five incredible destinations that offer authentic experiences without the crowds. From coastal villages to mountain retreats, these hidden gems are waiting to be explored.',
    category: 'Travel',
    date: '2023-09-28'
  },
  {
    id: '3',
    title: 'The Art of Mindful Productivity',
    author: {
      name: 'Marcus Chen',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Marcus is a productivity coach and mindfulness practitioner who helps professionals find balance in their busy lives.'
    },
    coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Combining productivity techniques with mindfulness practices can transform how you work. Learn how to achieve more with less stress by working with your brain rather than against it.',
    category: 'Lifestyle',
    date: '2023-10-03'
  },
  {
    id: '4',
    title: 'Seasonal Cooking: Fall Harvest Recipes',
    author: {
      name: 'Sophia Lee',
      image: 'https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Sophia is a professional chef and food writer specializing in seasonal, farm-to-table cooking.'
    },
    coverImage: 'https://images.unsplash.com/photo-1535920527002-b35e96722969?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Embrace the flavors of autumn with these comforting recipes that showcase the best of fall produce. From butternut squash soup to apple cider donuts, these dishes will warm your kitchen and your soul.',
    category: 'Food',
    date: '2023-10-10'
  },
  {
    id: '5',
    title: 'Building a Sustainable Morning Routine',
    author: {
      name: 'David Wilson',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'David is a health coach and wellness advocate focused on helping people build sustainable healthy habits.'
    },
    coverImage: 'https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'The way you start your morning sets the tone for your entire day. Discover how to create a morning routine that energizes you and aligns with your personal goals and values.',
    category: 'Health',
    date: '2023-09-20'
  },
  {
    id: '6',
    title: 'Small Business Growth Strategies for 2023',
    author: {
      name: 'Natalie Kim',
      image: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Natalie is a business strategist and entrepreneur who has helped dozens of small businesses scale successfully.'
    },
    coverImage: 'https://images.unsplash.com/photo-1611095973763-414019e72400?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'In a changing economic landscape, small businesses need adaptive strategies to thrive. Explore these practical approaches to growth that work even with limited resources.',
    category: 'Business',
    date: '2023-10-08'
  },
  {
    id: '7',
    title: 'How Journaling Transformed My Perspective',
    author: {
      name: 'James Parker',
      image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'James is a writer and mindset coach who explores personal growth through storytelling and reflection.'
    },
    coverImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'A personal story of how daily journaling practice helped me overcome anxiety and find clarity during a challenging career transition. Includes practical tips to start your own journaling routine.',
    category: 'Personal',
    date: '2023-09-15'
  },
  {
    id: '8',
    title: 'The Science Behind Effective Learning',
    author: {
      name: 'Maya Thompson',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Maya is an educational psychologist and learning specialist who researches how we can optimize knowledge acquisition and retention.'
    },
    coverImage: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Recent cognitive science findings are changing what we know about how learning works. Discover evidence-based techniques to learn faster and remember more, whether you're a student or lifelong learner.',
    category: 'Technology',
    date: '2023-10-01'
  }
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(BLOG_POSTS);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (activeCategory === 'All') {
      setVisiblePosts(BLOG_POSTS);
    } else {
      setVisiblePosts(BLOG_POSTS.filter(post => post.category === activeCategory));
    }
  }, [activeCategory]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-6 md:pt-36 md:pb-8 bg-gradient-to-b from-navy/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-navy mb-3 md:mb-4">Thoughtful Blogger</h1>
          <p className="text-charcoal/80 max-w-2xl mx-auto text-sm md:text-base">
            Exploring ideas, sharing stories, and connecting perspectives through thoughtful writing
          </p>
        </div>
      </div>
      
      <GenreTabs 
        genres={CATEGORIES}
        activeGenre={activeCategory}
        onGenreChange={handleCategoryChange}
      />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array(8).fill(0).map((_, index) => (
              <div key={index} className="h-[400px] bg-softgray animate-pulse rounded-md"></div>
            ))
          ) : (
            visiblePosts.map(post => (
              <div key={post.id} className="transition-all duration-300">
                <BlogPostCard {...post} />
              </div>
            ))
          )}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-navy text-white font-medium rounded-full hover:bg-darknavy transition-all duration-300 shadow-subtle">
            Load More Posts
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
