import React, { createContext, useContext, useState } from 'react';

type Route = 'login' | 'register' | 'dashboard' | 'unauthorized';

interface RouteContextType {
  currentRoute: Route;
  navigate: (route: Route) => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<Route>('login');

  const navigate = (route: Route) => {
    setCurrentRoute(route);
  };

  return (
    <RouteContext.Provider value={{ currentRoute, navigate }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
};
