'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const UserContext = createContext();

export const  UserProvider = ({ children }) => {

  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
          setUserData(session);
      }
  }, [session]);

  return (
    <UserContext.Provider value={ { userData  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
