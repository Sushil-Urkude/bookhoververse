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
    coverImage: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
      bio: 'Performance engineer at a major tech company. Specializes in web vitals, performance budgeting, and creating lightning-fast user experiences.'
    },
    coverImage: 'https://images.unsplash.com/photo-1553034545-32d4cd2168f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'See how we improved a client site performance by 300%. This detailed case study covers our process, tools, and the measurable impact of our optimizations.',
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
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <Hero 
        title="My Blogger Space"
        subtitle="Personal thoughts & stories"
        description="Welcome to my personal blog where I share insights on technology, development, and design."
      />
      
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content area */}
          <main className="lg:col-span-8">
            {isLoading ? (
              // Loading skeletons
              <div className="space-y-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-4">
                    <div className="h-48 bg-gray-200 rounded-md"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Featured Posts in list format */}
                <section className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">Featured Posts</h2>
                    <Link to="/category/all" className="text-accent1 hover:text-accent1/80 font-medium transition-colors">
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-8">
                    {featuredPosts.map(post => (
                      <div key={post.id} className="border-b border-gray-200 pb-8">
                        <Link to={`/post/${post.id}`}>
                          <h3 className="text-xl md:text-2xl font-serif font-bold text-navy hover:text-accent1 transition-colors mb-3">
                            {post.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <img 
                            src={post.author.image} 
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span>{post.author.name}</span>
                          <span>•</span>
                          <span>{new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                          <span>•</span>
                          <span className="text-accent1">{post.category}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="md:col-span-1">
                            <img 
                              src={post.coverImage} 
                              alt={post.title}
                              className="w-full h-48 object-cover rounded"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-charcoal/80 mb-4">{post.excerpt}</p>
                            <Link to={`/post/${post.id}`} className="inline-block px-4 py-2 bg-accent1 text-white rounded hover:bg-accent1/80 transition-colors">
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </main>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              {/* About widget */}
              <div className="bg-cream p-6 rounded-md mb-8">
                <h3 className="text-xl font-serif font-bold text-navy mb-4">About Me</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80"
                    alt="Blog Author"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-navy">Sarah Johnson</h4>
                    <p className="text-sm text-charcoal/80">Blogger & Developer</p>
                  </div>
                </div>
                <p className="text-charcoal/80 text-sm">
                  I write about technology, development, and design. Join me as I explore the ever-changing world of web development.
                </p>
              </div>
              
              {/* Categories widget */}
              <div className="bg-cream p-6 rounded-md mb-8">
                <h3 className="text-xl font-serif font-bold text-navy mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/category/development" className="flex justify-between items-center text-charcoal hover:text-accent1 transition-colors">
                      <span>Development</span>
                      <span className="bg-navy text-white text-xs px-2 py-1 rounded-full">12</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/design" className="flex justify-between items-center text-charcoal hover:text-accent1 transition-colors">
                      <span>Design</span>
                      <span className="bg-navy text-white text-xs px-2 py-1 rounded-full">8</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/cloud" className="flex justify-between items-center text-charcoal hover:text-accent1 transition-colors">
                      <span>Cloud</span>
                      <span className="bg-navy text-white text-xs px-2 py-1 rounded-full">5</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/performance" className="flex justify-between items-center text-charcoal hover:text-accent1 transition-colors">
                      <span>Performance</span>
                      <span className="bg-navy text-white text-xs px-2 py-1 rounded-full">3</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/accessibility" className="flex justify-between items-center text-charcoal hover:text-accent1 transition-colors">
                      <span>Accessibility</span>
                      <span className="bg-navy text-white text-xs px-2 py-1 rounded-full">2</span>
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Recent posts widget */}
              <div className="bg-cream p-6 rounded-md">
                <h3 className="text-xl font-serif font-bold text-navy mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex gap-3">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                      />
                      <div>
                        <Link to={`/post/${post.id}`}>
                          <h4 className="text-navy hover:text-accent1 transition-colors font-medium text-sm leading-tight">
                            {post.title}
                          </h4>
                        </Link>
                        <div className="text-xs text-gray-600 mt-1">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
