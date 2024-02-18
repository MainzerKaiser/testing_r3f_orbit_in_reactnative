// MyContext.tsx

import React, { createContext, useContext } from 'react';
import { atom, useAtom } from 'jotai';



const hoveredLettersState = atom<string[]>(Array.from({ length: 1 }, () => ''));
const nLettersState = atom<number>(1);
const updateHoveredLettersAtom = atom(null, async (get, set, payload: { index: number; letter: string }) => {
  const hoveredLetters = get(hoveredLettersState);
  hoveredLetters[payload.index] = payload.letter;
  set(hoveredLettersState, hoveredLetters);
});

interface MyContextProps {
  hoveredLettersState: [string[], (value: React.SetStateAction<string[]>) => void];
  nLettersState: [number, (value: React.SetStateAction<number>) => void];
  updateHoveredLetters: (index: number, letter: string) => Promise<void>;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hoveredLetters, setHoveredLetters] = useAtom(hoveredLettersState);
  const [nCubes, setNCubes] = useAtom(nLettersState);
  const updateHoveredLetters: MyContextProps['updateHoveredLetters'] = async (index, letter) => {
    // Your asynchronous logic here
    // For example, you can use an API call or perform other async operations
    // ...

    // After completing the async logic, update the state
    // setHoveredLetters((prevLetters) => {
    //   const updatedLetters = [...prevLetters];
    //   updatedLetters[index] = letter;
    //   return updatedLetters;
    // });
  };

  const contextValue: MyContextProps = {
    hoveredLettersState: [hoveredLetters, setHoveredLetters],
    nLettersState: [nCubes, setNCubes],
    updateHoveredLetters,
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
