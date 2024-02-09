import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/api';

interface User {
  username: string; 
  role:string;
}

interface UserContextValue {
  user: User | null;
  loading: boolean;
  initialLoading: boolean;
  error: string | null;
  fetchCurrentUser: () => Promise<void>;
  login: (credentials: { username: string, password: string }) => Promise<void>;
  register: (userData: { username: string, password: string }) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    console.log(user?.role)
  },[user])

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/current-user`,{ withCredentials: true });

      const data = response.data;
      console.log(response)
      setUser(data || null);
      setError(null);
    } finally {
      setError(null);
      setInitialLoading(false);
    }
  };

  const login = async (credentials: { username: string, password: string }) => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/users/login`, credentials,{ withCredentials: true }).then(()=>{
        fetchCurrentUser()
      }).catch((error)=>{
        
        setError(error.response.data.message)
      });

    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (userData: { username: string, password: string }) => {
    setLoading(true);
    try {
      
      const response = await axios.post(`${BASE_URL}/users/register`, userData);
      const data = response.data;

      setUser(data.user || null);
      setError(null);
    } catch (err) {
      setError('Error registering user');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
     setLoading(true);
    try {
      await axios.get(`${BASE_URL}/users/logout`,{ withCredentials: true }).then(()=>{
        setUser(null)
      });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, fetchCurrentUser, login, register, logout ,initialLoading}}>
      {children}
    </UserContext.Provider>
  );
};
