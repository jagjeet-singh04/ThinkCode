import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('thinkcode_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('thinkcode_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('thinkcode_user');
    }
  }, [user]);


  // Always create a new object reference to force re-render
  const login = React.useCallback((userData) => setUser({ ...userData }), []);
  const logout = React.useCallback(() => setUser(null), []);

  // Listen for profileUpdated event to refresh user context
  useEffect(() => {
    const handleProfileUpdate = () => {
      if (user?.email) {
        fetch(`/api/auth/profile?email=${encodeURIComponent(user.email)}`)
          .then(res => res.json())
          .then(data => {
            if (data.user) login(data.user);
          });
      }
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, [user?.email, login]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
