import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      console.error('Login error:', token);
      if (token) {
        axios
          .get('https://login.xsolla.com/api/users/me', {
            headers: { Authorization: token },
          })
          .then((response) => {
            setUser(response.data);
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
        const response = await axios.post(
          'https://login.xsolla.com/api/login?projectId=41fc3f33-4047-44a9-8868-476848f9d438',
          { username: email, password: password }
        );
        const token = new URL(response.data.login_url).searchParams.get('token');
        if (rememberMe) {
          localStorage.setItem('token', token);
        }
        const userResponse = await axios.get('https://login.xsolla.com/api/users/me', {
          headers: { Authorization: token },
        });
        setUser(userResponse.data);
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
