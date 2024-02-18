// MyContext.tsx

import React, { createContext, useContext, useCallback } from 'react';
import create, { SetState } from 'zustand';

interface MyStore {
  hoveredLetters: string[];
  nCubes: number;
  updateHoveredLetters: (index: number, letter: string) => Promise<void>;
  // setNCubes: (value: number | ((state: number) => number)) => void;
}

const useMyStore = create<MyStore>((set) => ({
  nCubes: 1,
  hoveredLetters: Array.from({ length: 1 }, () => ''),
  updateHoveredLetters: async (index, letter) => {
    // Your asynchronous logic here
    // For example, you can use an API call or perform other async operations
    // ...

    // After completing the async logic, update the state
    // set((state) => ({
    //   hoveredLetters: state.hoveredLetters.map((prevLetter, i) => (i === index ? letter : prevLetter)),
    // }));
  },
  // setNCubes: (value) => set({ nCubes: typeof value === 'function' ? value : value }),
}));

interface MyContextProps {
  hoveredLettersState: [string[]];
  nLettersState: [number];
  updateHoveredLetters: MyStore['updateHoveredLetters'];
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hoveredLetters, setHoveredLetters] = useMyStore((state) => [state.hoveredLetters, state.updateHoveredLetters]);
  const [nCubes] = useMyStore((state) => [state.nCubes]);

  const contextValue: MyContextProps = {
    hoveredLettersState: [hoveredLetters],
    nLettersState: [nCubes],
    updateHoveredLetters: useMyStore.getState().updateHoveredLetters,
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
