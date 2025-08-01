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
import { UserDataType } from "@/Types/types";
import { collectionType } from "@/app/collections/page";

// 1. Define your context value type (you can extend this later)
export interface AuthContextType {
  session: Session | null,
  userData: UserDataType | null,
  collections: collectionType[] | null,
  setUserCollections: (panel: collectionType[]) => void
}

// 2. Create context with proper type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Define props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// 4. Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session } = useSession()
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [collections, setUserCollections] = useState<collectionType[] | null>(null);

  const pathname = usePathname();

  const getUser = async () => {
    const responce = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ id: session?.user.id })
    })

    const profile = await responce.json();

    setUserCollections(profile.userData.collections)
    setUserData(profile.userData);
  }

  useEffect(() => {
    if (session === undefined) return;
    if (session === null && pathname !== "/") redirect("/")
    if (!session) return;
    getUser();

    return () => {
      getUser();
    }
  }, [session])

  if (session === undefined) return <></>

  if (!session && pathname !== "/") return <></>

  return (
    <AuthContext.Provider value={{ session, userData, collections, setUserCollections }}>
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
