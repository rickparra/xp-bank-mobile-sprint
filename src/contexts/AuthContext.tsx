import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  balance: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    password: '123456',
    cpf: '123.456.789-10',
    balance: 15750.50
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com', 
    password: '123456',
    cpf: '987.654.321-00',
    balance: 8320.75
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStoredUser();
  }, []);

  const checkStoredUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('bankUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        cpf: foundUser.cpf,
        balance: foundUser.balance
      };
      
      setUser(userData);
      try {
        await AsyncStorage.setItem('bankUser', JSON.stringify(userData));
      } catch (error) {
        console.error('Error saving user to storage:', error);
      }
      return true;
    }
    
    return false;
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('bankUser');
    } catch (error) {
      console.error('Error removing user from storage:', error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};