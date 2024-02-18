// MyContext.tsx

import React, { createContext, useContext, useState } from 'react';

interface MyContextProps {
  hoveredLetters: string[];
  setHoveredLetters: React.Dispatch<React.SetStateAction<string[]>>;
  nCubes: number;
  updateHoveredLetters: (index: number, letter: string) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [nCubes, setNCubes] = useState<number>(5);
    const [hoveredLetters, setHoveredLetters] = useState<string[]>(Array.from({ length: nCubes }, () => ''));
    const updateHoveredLetters = (index: number, letter: string) => {
      console.log("index, letter: ", index, letter)
      setHoveredLetters((prevLetters) => {
        const updatedLetters = [...prevLetters];
        updatedLetters[index] = letter;
        return updatedLetters;
      });
    };


  const contextValue: MyContextProps = {
    hoveredLetters,
    setHoveredLetters,
    nCubes,
    updateHoveredLetters
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }

  return context;
};
