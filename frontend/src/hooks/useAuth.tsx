import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin credentials - In a real app, this would be in the backend
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  id: '1',
  role: 'admin'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({
        id: ADMIN_CREDENTIALS.id,
        username: ADMIN_CREDENTIALS.username,
        role: ADMIN_CREDENTIALS.role
      });
      setIsAuthenticated(true);
    } else {
      logout();
    }
  };

  const login = async (username: string, password: string) => {
    // Simple credential check - In a real app, this would be an API call
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = btoa(username + ':' + password); // Simple token generation
      localStorage.setItem('token', token);
      setUser({
        id: ADMIN_CREDENTIALS.id,
        username: ADMIN_CREDENTIALS.username,
        role: ADMIN_CREDENTIALS.role
      });
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 