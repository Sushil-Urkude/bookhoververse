
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import BlogPostCard from '../components/BlogPostCard';

// Sample blog post data - in a real app, this would come from an API
const BLOG_POSTS = [
  {
    id: '1',
    title: 'Mastering React Hooks for State Management',
    author: {
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Senior Frontend Developer with 6+ years of experience building modern web applications. Passionate about React, TypeScript, and clean code.'
    },
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Learn how to effectively use React Hooks for state management in your applications. This comprehensive guide covers useState, useEffect, useContext, and custom hooks.',
    category: 'Development',
    date: '2023-05-12'
  },
  {
    id: '2',
    title: 'Building a Serverless API with AWS Lambda',
    author: {
      name: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Cloud solutions architect specializing in AWS services and serverless architecture. Regular speaker at tech conferences.'
    },
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover how to build scalable, cost-effective APIs using AWS Lambda and API Gateway. This tutorial walks through creating a fully functional serverless backend.',
    category: 'Cloud',
    date: '2023-06-24'
  },
  {
    id: '3',
    title: 'The Future of Web Design: Trends to Watch in 2024',
    author: {
      name: 'Emma Rodriguez',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'UX/UI designer with a background in psychology and a passion for creating beautiful, intuitive interfaces that delight users.'
    },
    coverImage: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Explore the emerging design trends that will define the web in 2024. From micro-animations to neomorphism, learn how these trends can elevate your projects.',
    category: 'Design',
    date: '2023-07-30'
  },
  {
    id: '4',
    title: 'Getting Started with TypeScript in 2023',
    author: {
      name: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Full-stack developer and technical writer focusing on JavaScript ecosystems. Creator of several popular open-source libraries.'
    },
    coverImage: 'https://images.unsplash.com/photo-1470723710355-95304d8aece4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'A beginner-friendly guide to TypeScript in 2023. Learn how to set up your project, understand the type system, and leverage TypeScript to write safer, more maintainable code.',
    category: 'Development',
    date: '2023-03-18'
  },
  {
    id: '5',
    title: 'Optimizing Web Performance: A Case Study',
    author: {
      name: 'Aisha Patel',
      image: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Performance engineer at a major tech company. Specializes in web vitals, performance budgeting, and creating lightning-fast user experiences.'
    },
    coverImage: 'https://images.unsplash.com/photo-1553034545-32d4cd2168f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'See how we improved a client's site performance by 300%. This detailed case study covers our process, tools, and the measurable impact of our optimizations.',
    category: 'Performance',
    date: '2023-08-05'
  },
  {
    id: '6',
    title: 'Building Accessible Web Applications',
    author: {
      name: 'David Kim',
      image: 'https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Accessibility advocate and frontend developer. Works on making the web more inclusive for everyone, regardless of abilities or disabilities.'
    },
    coverImage: 'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Learn the fundamentals of web accessibility and how to implement them in your projects. This guide covers ARIA, keyboard navigation, screen reader compatibility, and more.',
    category: 'Accessibility',
    date: '2023-02-27'
  },
  {
    id: '7',
    title: 'An Introduction to Web3 Development',
    author: {
      name: 'Olivia Taylor',
      image: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Blockchain developer and educator. Founder of a Web3 bootcamp helping developers transition into blockchain and decentralized app development.'
    },
    coverImage: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Dive into Web3 development with this beginner-friendly guide. Understand the key concepts, tools, and frameworks needed to start building decentralized applications.',
    category: 'Blockchain',
    date: '2023-09-14'
  },
  {
    id: '8',
    title: 'Machine Learning for Frontend Developers',
    author: {
      name: 'Ryan Martinez',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'AI researcher turned frontend developer. Passionate about bringing machine learning capabilities to the browser and creating intelligent user interfaces.'
    },
    coverImage: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Explore how frontend developers can leverage machine learning libraries like TensorFlow.js to create intelligent web applications with features like image recognition and natural language processing.',
    category: 'AI',
    date: '2023-04-22'
  }
];

const Index = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading delay
    setTimeout(() => {
      // Get first 3 posts for featured section
      setFeaturedPosts(BLOG_POSTS.slice(0, 3));
      
      // Get remaining posts for recent section, sorted by date
      const sorted = [...BLOG_POSTS.slice(3)].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setRecentPosts(sorted);
      
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <Hero 
        title="Thoughtful Blogger"
        subtitle="Insights. Ideas. Inspirations."
        description="Explore thought-provoking articles on development, design, and technology."
      />
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        {isLoading ? (
          // Loading skeletons
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse h-[380px] bg-gray-200 rounded-md"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Featured Posts */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">Featured Posts</h2>
                <Link to="/category/all" className="text-accent1 hover:text-accent1/80 font-medium transition-colors">
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredPosts.map(post => (
                  <BlogPostCard 
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.author}
                    coverImage={post.coverImage}
                    excerpt={post.excerpt}
                    category={post.category}
                    date={post.date}
                  />
                ))}
              </div>
            </section>
            
            {/* Recent Posts */}
            <section>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-8">Recent Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentPosts.map(post => (
                  <BlogPostCard 
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.author}
                    coverImage={post.coverImage}
                    excerpt={post.excerpt}
                    category={post.category}
                    date={post.date}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
