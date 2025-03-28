import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-navy">Admin Dashboard</h1>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm text-gray-600 hover:text-navy transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Book Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-navy mb-4">Add New Book</h2>
            <p className="text-gray-600 mb-4">Add a new book to the collection</p>
            <button 
              onClick={() => navigate('/admin/add-book')}
              className="text-navy hover:text-accent1 transition-colors"
            >
              Manage Books →
            </button>
          </div>

          {/* Manage Reviews Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-navy mb-4">Manage Reviews</h2>
            <p className="text-gray-600 mb-4">View and moderate book reviews</p>
            <button 
              onClick={() => navigate('/admin/reviews')}
              className="text-navy hover:text-accent1 transition-colors"
            >
              View Reviews →
            </button>
          </div>

          {/* User Management Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-navy mb-4">User Management</h2>
            <p className="text-gray-600 mb-4">Manage user accounts and permissions</p>
            <button 
              onClick={() => navigate('/admin/users')}
              className="text-navy hover:text-accent1 transition-colors"
            >
              Manage Users →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 