import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Upload, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';
import { apiService } from '@/lib/api';

interface ReviewFormData {
  bookTitle: string;
  authorName: string;
  authorDetails: string;
  publishedDate: string;
  rating: number;
  review: string;
  bookCover: File | null;
  authorImage: File | null;
  genre: string;
}

const AddReview = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ReviewFormData>({
    bookTitle: '',
    authorName: '',
    authorDetails: '',
    publishedDate: '',
    rating: 0,
    review: '',
    bookCover: null,
    authorImage: null,
    genre: ''
  });
  const [bookCoverPreview, setBookCoverPreview] = useState<string>('');
  const [authorImagePreview, setAuthorImagePreview] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'bookCover' | 'authorImage') => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, [type]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'bookCover') {
          setBookCoverPreview(reader.result as string);
        } else {
          setAuthorImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.bookTitle || !formData.authorName || !formData.publishedDate || !formData.rating || !formData.review) {
      toast.error('Please fill in all required fields');
      return;
    }
    setShowPreview(true);
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      
      // Log the data being sent
      console.log('Sending data:', {
        title: formData.bookTitle,
        author_name: formData.authorName,
        author_bio: formData.authorDetails,
        published_date: formData.publishedDate,
        rating: formData.rating,
        review: formData.review
      });

      // Append form fields
      formDataToSend.append('title', formData.bookTitle);
      formDataToSend.append('published_date', formData.publishedDate);
      formDataToSend.append('rating', formData.rating.toString());
      formDataToSend.append('review', formData.review);
      formDataToSend.append('genre', formData.genre);

      // Author fields
      formDataToSend.append('author_name', formData.authorName);
      formDataToSend.append('author_bio', formData.authorDetails);

      // Append files with specific names matching the backend
      if (formData.bookCover) {
        formDataToSend.append('cover_image', formData.bookCover);
      }
      if (formData.authorImage) {
        formDataToSend.append('author_image', formData.authorImage);
      }

      // Log the request being made
      console.log('Making request to:', '/api/add_books');

      const response = await apiService.createBook(formDataToSend);

      // Log the response
      console.log('Response data:', response);

      toast.success('Review published successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error details:', error);
      toast.error(error.message || 'Failed to publish review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Preview Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-navy">Preview Review</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPreview(false)}
              className="hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Main Preview Content */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-gradient-to-b from-gray-900/70 to-gray-900/30">
              {bookCoverPreview && (
                <img 
                  src={bookCoverPreview} 
                  alt="Book cover"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              {/* Book Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">{formData.bookTitle}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-lg">By {formData.authorName}</span>
                </div>
                <p className="text-gray-200">Published: {formData.publishedDate}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-8 py-12 max-w-4xl mx-auto">
              {/* Author Section */}
              <div className="flex items-start space-x-6 mb-12 pb-12 border-b border-gray-200">
                {authorImagePreview && (
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden">
                      <img 
                        src={authorImagePreview} 
                        alt="Author"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Author</h2>
                  <p className="text-gray-600 leading-relaxed">{formData.authorDetails}</p>
                </div>
              </div>

              {/* Review Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {formData.review}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={handleEdit}
              className="px-6"
            >
              Edit Review
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isSubmitting}
              className="px-6"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Review'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-5xl mx-auto bg-white p-8">
          <h1 className="text-2xl font-bold text-navy mb-8">Add New Review</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Book and Author Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Title
                  </label>
                  <input
                    type="text"
                    name="bookTitle"
                    value={formData.bookTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genre
                  </label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none"
                    placeholder="e.g., Fiction, Non-Fiction, Science"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Published Date
                  </label>
                  <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Details
                  </label>
                  <textarea
                    name="authorDetails"
                    value={formData.authorDetails}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Uploads - New Compact Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Book Cover Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Cover
                </label>
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 relative rounded-full overflow-hidden bg-gray-50 border border-gray-200">
                    {bookCoverPreview ? (
                      <img
                        src={bookCoverPreview}
                        alt="Book cover preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(e, 'bookCover')}
                      className="hidden"
                      id="bookCover"
                      accept="image/*"
                      required
                    />
                    <label
                      htmlFor="bookCover"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 
                        rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white 
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-navy cursor-pointer"
                    >
                      Choose File
                    </label>
                    <p className="mt-2 text-xs text-gray-500">
                      Recommended: 400x400px <br />
                      Max size: 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Author Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Image
                </label>
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 relative rounded-full overflow-hidden bg-gray-50 border border-gray-200">
                    {authorImagePreview ? (
                      <img
                        src={authorImagePreview}
                        alt="Author preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(e, 'authorImage')}
                      className="hidden"
                      id="authorImage"
                      accept="image/*"
                      required
                    />
                    <label
                      htmlFor="authorImage"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 
                        rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white 
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-navy cursor-pointer"
                    >
                      Choose File
                    </label>
                    <p className="mt-2 text-xs text-gray-500">
                      Recommended: 400x400px <br />
                      Max size: 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review
              </label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                rows={8}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy/90 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Preview Review
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddReview; 