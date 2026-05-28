import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

export const Dashboard: React.FC = () => {
  const { user, logout, hasRole } = useAuth();
  
  const [userContent, setUserContent] = useState<string>('Loading User Content...');
  const [adminContent, setAdminContent] = useState<string>('Loading Admin Content...');
  const [adminError, setAdminError] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch User Content (Accessible to both USER and ADMIN)
    api.get('/user/content')
      .then((res) => {
        setUserContent(res.data.message || res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch user content:', err);
        setUserError('Access Denied (403): You cannot read User API data.');
        setUserContent('');
      });

    // 2. Fetch Admin Content (Accessible ONLY to ADMIN)
    if (hasRole('ADMIN')) {
      api.get('/admin/content')
        .then((res) => {
          setAdminContent(res.data.message || res.data);
        })
        .catch((err) => {
          console.error('Failed to fetch admin content:', err);
          setAdminError('Access Denied (403): You are unauthorized to read Admin API data.');
          setAdminContent('');
        });
    } else {
      setAdminContent('Admin content is restricted to ADMIN users only.');
    }
  }, [hasRole]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white border border-gray-300 rounded p-6 mb-6 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Logged in email: <span className="font-semibold">{user?.email}</span></p>
          <div className="mt-2 inline-block bg-blue-100 border border-blue-300 text-blue-800 text-xs font-bold px-3 py-1 rounded">
            ROLE: {user?.role}
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded text-sm transition self-start md:self-center"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-300 rounded shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">👤</span>
            <h3 className="text-xl font-bold text-gray-800">User Dashboard Card</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            This card is rendered on the client because your role grants access to standard User features.
          </p>
          
          <div className="bg-gray-100 border border-gray-200 rounded p-3 text-xs font-mono min-h-[60px]">
            <p className="font-bold text-gray-500 mb-1">Backend response (GET /api/user/content):</p>
            {userError ? (
              <span className="text-red-600 font-semibold">{userError}</span>
            ) : (
              <span className="text-green-700">{userContent}</span>
            )}
          </div>
        </div>

        {hasRole('ADMIN') ? (
          <div className="bg-white border border-yellow-300 bg-yellow-50/20 rounded shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🔑</span>
              <h3 className="text-xl font-bold text-yellow-800">Admin Control Card</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              This card is conditionally rendered on the frontend because you possess the <strong className="text-yellow-800 font-semibold">ADMIN</strong> role.
            </p>

            <div className="bg-gray-100 border border-gray-200 rounded p-3 text-xs font-mono min-h-[60px]">
              <p className="font-bold text-gray-500 mb-1">Backend response (GET /api/admin/content):</p>
              {adminError ? (
                <span className="text-red-600 font-semibold">{adminError}</span>
              ) : (
                <span className="text-green-700">{adminContent}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gray-200 border border-gray-300 rounded shadow-sm p-6 flex flex-col justify-center items-center text-center opacity-70">
            <span className="text-2xl mb-2">🔒</span>
            <h3 className="text-lg font-bold text-gray-500">Admin Panel Locked</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-[250px]">
              Only users authenticated with the ADMIN role can view the control dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
