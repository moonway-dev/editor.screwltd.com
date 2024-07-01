import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PROXY_URL = 'https://corsproxy.io/?';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${PROXY_URL}https://login.xsolla.com/api/users/me`, {
        headers: { Authorization: token },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }
          return response.json();
        })
        .then(data => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const response = await fetch(
        `${PROXY_URL}https://login.xsolla.com/api/login?projectId=41fc3f33-4047-44a9-8868-476848f9d438`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password: password }),
        }
      );
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      const token = new URL(data.login_url).searchParams.get('token');
      if (token) {
        if (rememberMe) {
          localStorage.setItem('token', token);
        }
        const userResponse = await fetch(`${PROXY_URL}https://login.xsolla.com/api/users/me`, {
          headers: { Authorization: token },
        });
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await userResponse.json();
        setUser(userData);
      } else {
        throw new Error('Token not found in the response');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
