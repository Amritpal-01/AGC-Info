/** @format */

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

// 1. Define your context value type (you can extend this later)
export interface AuthContextType {
    session : Session | null,
    isLoading : boolean | null

}

// 2. Create context with proper type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Define props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// 4. Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {data : session} = useSession()
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();

  const getUser = async () => {
    
  }

  useEffect(() => {
    if(!session === null) return;
    if(!session && pathname !== "/") redirect("/")

    getUser();

    return () => {
      getUser();
    } 
  },[session])
  
  if(!session && pathname !== "/") return <></>

  return (
    <AuthContext.Provider value={{session, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
