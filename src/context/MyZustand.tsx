import { create } from 'zustand';
import * as THREE from "three";

interface VisibleState {
  nCubes:number;
  visibleLetters: string[];
  interactionStarted: boolean[];
  updatecurrentletter: (index: number, letter: string) => Promise<void>;
  getVisibleLetters: () => string[]; // Getter method for visibleLetters
  setInteractionStarted: (index: number, value: boolean) => void;
  // cameraPositions: Array<THREE.Vector3>;
  // setCameraPositions: (index: number, position: THREE.Vector3) => void;
}

export const useVisibleStore = create<VisibleState>((set, get) => ({
    nCubes:get()?.nCubes || 6,
    visibleLetters: Array.from({ length: get()?.nCubes || 6, }, () => ''),
    interactionStarted: Array.from({ length: get()?.nCubes || 3 }, () => false),
    updatecurrentletter: async (index, letter) => {
      set((state) => ({
          visibleLetters: state.visibleLetters.map((prevLetter, i) => (i === index ? letter : prevLetter)),
      }));
    },
    getVisibleLetters: () => {
    // Read-only getter method for visibleLetters
    return get().visibleLetters;
    },
    setInteractionStarted: async(index, value) => {
      set((state) => ({
        interactionStarted: state.interactionStarted.map((prevValue, i) => (i === index ? value : prevValue)),
      }));
    },
    // cameraPositions: Array.from({ length: get()?.nCubes || 6, }, () => new THREE.Vector3(0, 0, 0)),
    // setCameraPositions: (index, position) => {
    //   set((state) => ({
    //     cameraPositions: state.cameraPositions.map((prevPosition, i) => (i === index ? position : prevPosition)),
    //   }));
    // },
}));