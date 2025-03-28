import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Admin = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add New Book Review */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-navy">Add Book Review</h2>
            <p className="text-gray-600 mb-4">Add new books and their reviews to the platform</p>
            <button className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-darknavy transition-colors">
              Add New Review
            </button>
          </div>

          {/* Manage Books */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-navy">Manage Books</h2>
            <p className="text-gray-600 mb-4">Edit or update existing book details and reviews</p>
            <button className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-darknavy transition-colors">
              Manage Books
            </button>
          </div>

          {/* Website Analytics */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-navy">Analytics</h2>
            <p className="text-gray-600 mb-4">View website traffic and user engagement metrics</p>
            <button className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-darknavy transition-colors">
              View Analytics
            </button>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-navy">User Management</h2>
            <p className="text-gray-600 mb-4">Manage user roles and permissions</p>
            <button className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-darknavy transition-colors">
              Manage Users
            </button>
          </div>

          {/* Content Moderation */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-navy">Content Moderation</h2>
            <p className="text-gray-600 mb-4">Moderate user comments and reviews</p>
            <button className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-darknavy transition-colors">
              Moderate Content
            </button>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-navy">Settings</h2>
            <p className="text-gray-600 mb-4">Configure website settings and preferences</p>
            <button className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-darknavy transition-colors">
              View Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 