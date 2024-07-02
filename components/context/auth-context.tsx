import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {Spinner} from "@nextui-org/spinner";

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

interface LoadingContextType {
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://api.screwltd.com/v3/xsolla/user', {
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
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
          setLoading(false);
        });
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const response = await fetch(
        'https://api.screwltd.com/v3/xsolla/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
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

        const userResponse = await fetch('https://api.screwltd.com/v3/xsolla/user', {
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
      <LoadingContext.Provider value={{ loading }}>
        {loading ? (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            zIndex: 9999
          }}>
            <Spinner color="secondary"/>
          </div>
        ) : (
          children
        )}
      </LoadingContext.Provider>
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

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within an AuthProvider');
  }
  return context;
};
