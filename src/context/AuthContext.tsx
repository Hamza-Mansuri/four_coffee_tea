'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  uid: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData?: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const defaultUser: User = {
    firstName: 'Hamza',
    lastName: 'Mansuri',
    email: 'hamzamansuri7103@gmail.com',
    phone: '-',
    birthDate: '-',
    uid: '755450267320',
    address: '',
    city: '-',
    state: '',
    country: ''
  };

  useEffect(() => {
    const status = localStorage.getItem('gomzi_auth');
    if (status === 'true') {
      setIsLoggedIn(true);
      const savedUser = localStorage.getItem('gomzi_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          setUser(defaultUser);
        }
      } else {
        setUser(defaultUser);
      }
    }
    setIsLoaded(true);
  }, []);

  const login = (userData?: Partial<User>) => {
    setIsLoggedIn(true);

    const dbKey = 'gomzi_users_db';
    let usersDb: Record<string, User> = {};
    try {
      usersDb = JSON.parse(localStorage.getItem(dbKey) || '{}');
    } catch (e) {}

    const identifier = userData?.email && userData.email !== '-' ? userData.email : userData?.phone;
    let newUser: User;

    if (identifier && usersDb[identifier]) {
      newUser = { ...usersDb[identifier], ...userData, uid: usersDb[identifier].uid } as User;
    } else {
      newUser = { ...defaultUser, ...userData } as User;
      if (identifier) {
        usersDb[identifier] = newUser;
      }
    }

    localStorage.setItem(dbKey, JSON.stringify(usersDb));
    setUser(newUser);
    localStorage.setItem('gomzi_auth', 'true');
    localStorage.setItem('gomzi_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.setItem('gomzi_auth', 'false');
    localStorage.removeItem('gomzi_user');
  };

  if (!isLoaded) return null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
