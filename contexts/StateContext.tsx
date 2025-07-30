/** @format */

"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";


// 1. Define your context value type (you can extend this later)
export interface StateContextType {
    collectionSearch : string, 
    setCollectionSearch : (pannel : string) => void
}

// 2. Create context with proper type
const StateContext = createContext<StateContextType | undefined>(undefined);

// 3. Define props type for StateProvider
interface StateProviderProps {
  children: ReactNode;
}

// 4. Create the StateProvider component
export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [collectionSearch, setCollectionSearch] = useState<string>("");

  return (
    <StateContext.Provider value={{ setCollectionSearch, collectionSearch}}>
      {children}
    </StateContext.Provider>
  );
};

// 5. Custom hook to use State context
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useState must be used within an StateProvider");
  }
  return context;
};
