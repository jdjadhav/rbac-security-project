import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRoute } from '../context/RouteContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { navigate } = useRoute();

  const handleLogout = () => {
    logout();
    navigate('login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={() => navigate(isAuthenticated ? 'dashboard' : 'login')} className="flex items-center space-x-2">
          <span className="text-2xl">🛡️</span>
          <span className="text-xl font-bold text-gray-800 tracking-tight">RBAC by JD</span>
        </button>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button onClick={() => navigate('dashboard')} className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition">
                Dashboard
              </button>
              <div className="h-4 w-[1px] bg-gray-300"></div>
              <span className="text-xs font-semibold bg-gray-100 border border-gray-300 text-gray-700 px-2 py-1 rounded">
                {user?.name} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-red-500 hover:text-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('login')} className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition">
                Login
              </button>
              <button
                onClick={() => navigate('register')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
