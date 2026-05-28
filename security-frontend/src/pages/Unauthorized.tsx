import React from 'react';
import { useRoute } from '../context/RouteContext';

export const Unauthorized: React.FC = () => {
  const { navigate } = useRoute();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-white border border-red-200 rounded-lg shadow-sm max-w-md p-8">
        <span className="text-5xl">🚫</span>
        <h1 className="text-3xl font-extrabold text-red-600 mt-4">Access Denied</h1>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          You do not have the required role-based permissions (ADMIN privileges) to view the requested resource.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-3">
          <button
            onClick={() => navigate('dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded text-sm transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

