import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  MessageCircle, 
  Share, 
  BookmarkPlus, 
  ThumbsUp, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link as LinkIcon, 
  ArrowLeft 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

// Sample blog posts data - in a real app, this would come from an API
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
    content: `
      <p>Artificial intelligence is rapidly transforming how we interact with technology in our daily lives. From smart assistants to predictive text, AI applications are becoming more prevalent and sophisticated.</p>
      
      <h2>The Rise of Consumer AI</h2>
      <p>In recent years, we've seen an explosion of AI-powered consumer products. Smart speakers like Amazon Echo and Google Home have become household staples, while AI features in smartphones can now recognize objects in photos, translate languages in real-time, and even predict what you'll type next.</p>
      
      <p>These technologies represent just the beginning of how AI will integrate into our daily routines. As algorithms become more advanced and processing power increases, we can expect AI to become even more seamlessly woven into the fabric of our technological experiences.</p>
      
      <h2>Personalization at Scale</h2>
      <p>One of the most significant impacts of AI is its ability to deliver personalized experiences at an unprecedented scale. Streaming services recommend content based on your viewing habits, news feeds prioritize stories you're likely to engage with, and shopping platforms suggest products tailored to your preferences.</p>
      
      <p>This level of personalization was impossible before AI, as it would have required enormous human teams analyzing individual behavior patterns. Now, machine learning algorithms can process vast amounts of data to create experiences that feel uniquely tailored to each user.</p>
      
      <h2>The Ethical Considerations</h2>
      <p>As AI becomes more integrated into our everyday technology, important ethical questions arise. Issues of privacy, bias in algorithms, and the environmental impact of training large AI models all deserve careful consideration.</p>
      
      <p>The technology industry is beginning to address these concerns, with many companies establishing AI ethics committees and research initiatives focused on responsible AI development. As consumers, staying informed about these issues will be increasingly important.</p>
      
      <h2>Looking Forward</h2>
      <p>In the coming years, we can expect AI to become even more capable and ubiquitous. Technologies like augmented reality glasses, autonomous vehicles, and smart home systems will all leverage AI to create more intuitive, efficient user experiences.</p>
      
      <p>The key to maximizing the benefits of these advancements will lie in balancing innovation with thoughtful consideration of how these technologies should integrate into our lives. By approaching AI with both enthusiasm and critical thinking, we can help shape a future where technology truly enhances human experience.</p>
    `,
    category: 'Technology',
    date: '2023-10-15',
    readTime: '6 min read',
    comments: 24,
    likes: 157
  },
  // Other blog posts would be defined here...
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundPost = BLOG_POSTS.find(post => post.id === id);
      setPost(foundPost);
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container max-w-4xl mx-auto px-4 md:px-6 pt-32 pb-16">
          <div className="w-full h-64 bg-softgray animate-pulse rounded-md mb-8"></div>
          <div className="w-3/4 h-10 bg-softgray animate-pulse rounded-md mb-4"></div>
          <div className="w-1/2 h-6 bg-softgray animate-pulse rounded-md mb-8"></div>
          <div className="space-y-4">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="w-full h-4 bg-softgray animate-pulse rounded-md"></div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 md:px-6 pt-32 pb-16 text-center">
          <h1 className="text-2xl md:text-3xl font-serif text-navy mb-4">Blog Post Not Found</h1>
          <p className="text-charcoal/80 mb-6">The post you're looking for doesn't exist or has been moved.</p>
          <button 
            onClick={handleGoBack}
            className="px-6 py-2 bg-navy text-white rounded-full hover:bg-darknavy transition-all duration-300 flex items-center mx-auto"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container max-w-4xl mx-auto px-4 md:px-6 pt-32 pb-16">
        <button 
          onClick={handleGoBack}
          className="mb-6 flex items-center text-charcoal/60 hover:text-navy transition-colors text-sm"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>
        
        <div className="mb-8">
          <div className="inline-block bg-accent1/10 text-accent1 px-3 py-1 rounded-full text-xs font-medium mb-4">
            {post.category}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-8">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-navy">{post.author.name}</div>
              <div className="flex items-center text-xs text-charcoal/60 space-x-4">
                <span className="flex items-center">
                  <Calendar size={12} className="mr-1" />
                  {formattedDate}
                </span>
                <span className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden mb-10">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Social sharing sidebar */}
          <div className="md:w-16 flex md:flex-col items-center md:sticky md:top-32 h-fit">
            <div className="flex md:flex-col items-center gap-3 md:gap-4 py-2 md:py-0">
              <button className="p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-charcoal/70">
                <ThumbsUp size={18} />
              </button>
              <button className="p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-charcoal/70">
                <MessageCircle size={18} />
              </button>
              <button className="p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-charcoal/70">
                <BookmarkPlus size={18} />
              </button>
              <div className="h-px w-8 md:h-8 md:w-px bg-gray-200 mx-2 md:mx-0 md:my-2"></div>
              <button className="p-2 md:p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors text-blue-500">
                <Twitter size={18} />
              </button>
              <button className="p-2 md:p-3 rounded-full bg-blue-900/10 hover:bg-blue-900/20 transition-colors text-blue-900">
                <Facebook size={18} />
              </button>
              <button className="p-2 md:p-3 rounded-full bg-blue-600/10 hover:bg-blue-600/20 transition-colors text-blue-600">
                <Linkedin size={18} />
              </button>
              <button className="p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-charcoal/70">
                <LinkIcon size={18} />
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <article className="prose prose-lg max-w-none 
              prose-headings:font-serif prose-headings:text-navy prose-headings:font-bold 
              prose-p:text-charcoal/80 prose-p:leading-relaxed
              prose-a:text-accent1 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-navy prose-strong:font-semibold
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
            >
            </article>
            
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="text-sm text-charcoal/60 mr-2">Tags:</span>
              <a href="#" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-charcoal/70 transition-colors">
                Artificial Intelligence
              </a>
              <a href="#" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-charcoal/70 transition-colors">
                Technology
              </a>
              <a href="#" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-charcoal/70 transition-colors">
                Future
              </a>
              <a href="#" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-charcoal/70 transition-colors">
                Digital Life
              </a>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-serif font-bold text-navy mb-4">About the Author</h3>
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16 border border-gray-200">
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-navy text-lg">{post.author.name}</div>
                  <p className="text-charcoal/70 text-sm mt-1">{post.author.bio}</p>
                  <div className="mt-3">
                    <button className="text-xs font-medium bg-navy text-white px-4 py-2 rounded-full hover:bg-darknavy transition-colors">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-serif font-bold text-navy mb-6">Comments ({post.comments})</h3>
              <div className="mb-8">
                <textarea 
                  placeholder="Share your thoughts..." 
                  className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1/50 focus:border-accent1 transition-all text-sm"
                  rows={4}
                />
                <div className="mt-2 flex justify-end">
                  <button className="px-6 py-2 bg-accent1 hover:bg-accent1/80 text-white rounded-full text-sm font-medium transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>
              
              {/* Sample comments */}
              <div className="space-y-6">
                <Card className="border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" />
                        <AvatarFallback>RD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-navy">Ryan Davis</div>
                          <div className="text-xs text-charcoal/50">2 days ago</div>
                        </div>
                        <p className="text-sm text-charcoal/80 mt-2">
                          This is such an important topic. I think the ethical considerations around AI are often overlooked in the excitement for new features. Thanks for highlighting them!
                        </p>
                        <div className="mt-3 flex items-center space-x-4">
                          <button className="text-xs text-charcoal/60 hover:text-navy flex items-center">
                            <ThumbsUp size={14} className="mr-1" />
                            12
                          </button>
                          <button className="text-xs text-charcoal/60 hover:text-navy">Reply</button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-navy">Sarah Johnson</div>
                          <div className="text-xs text-charcoal/50">3 days ago</div>
                        </div>
                        <p className="text-sm text-charcoal/80 mt-2">
                          I've been using more AI tools in my daily life, and it's remarkable how quickly they've improved. Looking forward to seeing what's next in this space!
                        </p>
                        <div className="mt-3 flex items-center space-x-4">
                          <button className="text-xs text-charcoal/60 hover:text-navy flex items-center">
                            <ThumbsUp size={14} className="mr-1" />
                            8
                          </button>
                          <button className="text-xs text-charcoal/60 hover:text-navy">Reply</button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
