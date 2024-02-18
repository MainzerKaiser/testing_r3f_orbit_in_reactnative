import { create } from 'zustand';
import * as THREE from "three";

interface VisibleState {
  interactionStarted: boolean[];
  setInteractionStarted: (index: number, value: boolean) => void;
  // cameraPositions: Array<THREE.Vector3>;
  // setCameraPositions: (index: number, position: THREE.Vector3) => void;
}

export const useVisibleStore = create<VisibleState>((set, get) => ({
    nCubes:get()?.nCubes || 6,
    visibleLetters: Array.from({ length: get()?.nCubes || 6, }, () => ''),
    interactionStarted: Array.from({ length: get()?.nCubes || 3 }, () => false),
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