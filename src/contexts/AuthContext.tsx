import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the auth context
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  userToken: string | null;
  user: any | null;
  storeUser: (token: string, userData?: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: any) => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  userToken: null,
  user: null,
  storeUser: async () => {},
  logout: async () => {},
  updateUser: () => {},
});

// Storage keys
export const TOKEN_KEY = 'userToken';
export const USER_KEY = 'userData';

// Auth Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const userData = await AsyncStorage.getItem(USER_KEY);
      
      if (token) {
        setUserToken(token);
        setIsLoggedIn(true);
        
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } else {
        setIsLoggedIn(false);
        setUserToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
      setUserToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const storeUser = async (token: string, userData?: any) => {
    try {
      // Save token to storage
      await AsyncStorage.setItem(TOKEN_KEY, token);
      
      // Save user data if provided
      if (userData) {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
        setUser(userData);
      }
      
      // Update state
      setUserToken(token);
      setIsLoggedIn(true);
      
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Remove tokens and user data from storage
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      
      // Update state
      setUserToken(null);
      setIsLoggedIn(false);
      setUser(null);
      
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const updateUser = (userData: any) => {
    try {
      setUser(userData);
      AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Context value
  const value: AuthContextType = {
    isLoggedIn,
    isLoading,
    userToken,
    user,
    storeUser,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;