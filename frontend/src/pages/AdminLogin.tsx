import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple hardcoded password check
    if (password === 'admin123') {
      setTimeout(() => {
        setIsLoading(false);
        navigate('/admin/dashboard');
      }, 500); // Small delay to show loading state
    } else {
      setIsLoading(false);
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm px-6 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-navy">Hey, Welcome Admin!</h1>
          <p className="mt-2 text-gray-500 text-sm">Please enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border-b border-gray-200 
                focus:border-navy focus:outline-none transition-all placeholder-gray-400"
              placeholder="Enter password"
              required
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 px-4 py-3 text-white bg-navy rounded-full
              transition-all duration-200 hover:bg-navy/90
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a 
            href="/"
            className="text-sm text-gray-400 hover:text-navy transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 