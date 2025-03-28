import { useState } from 'react';
import { useRouter } from 'next/router';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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