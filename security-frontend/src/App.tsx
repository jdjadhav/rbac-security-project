import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RouteProvider, useRoute } from './context/RouteContext';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Unauthorized } from './pages/Unauthorized';

const RouterComponent: React.FC = () => {
  const { currentRoute } = useRoute();
  const { isAuthenticated } = useAuth();

  const renderRoute = () => {
    switch (currentRoute) {
      case 'login':
        return isAuthenticated ? <Dashboard /> : <Login />;
      case 'register':
        return isAuthenticated ? <Dashboard /> : <Register />;
      case 'unauthorized':
        return <Unauthorized />;
      case 'dashboard':
        return isAuthenticated ? <Dashboard /> : <Login />;
      default:
        return isAuthenticated ? <Dashboard /> : <Login />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {renderRoute()}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouteProvider>
        <RouterComponent />
      </RouteProvider>
    </AuthProvider>
  );
};

export default App;
