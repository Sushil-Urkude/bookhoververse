import { Navigate, useLocation } from 'react-router-dom';

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

export function AuthMiddleware({ children }: AuthMiddlewareProps) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('adminToken');

  if (!isAuthenticated) {
    // Redirect to login page while saving the attempted URL
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 