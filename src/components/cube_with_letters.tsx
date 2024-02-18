
import * as THREE from "three";
import React from "react";
// import { GLTF } from "three-stdlib";
import { GLTF } from "three-stdlib";

import { useGLTF } from "@react-three/drei/native";
import { useVisibleStore } from '../context/MyZustand';


type GLTFResult = GLTF & {
  nodes: {
    [nodeName: string]: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
  nodes_letter: {
    [letter:string]:THREE.Mesh
  };
  materials_letter: {
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

const material_metal = new THREE.MeshStandardMaterial({
  color: 0x2194ce,
  metalness: 0.9,
  roughness: 0.2,
});

const material_letter = new THREE.MeshStandardMaterial({
  color: 'orange',
  transparent: false,
  opacity: 0.9,
});
const material_letter_green = new THREE.MeshStandardMaterial({
  color: 'green',
  transparent: false,
  opacity: 0.9,
  // wireframe:true,
});

interface ModelProps {
  letters: string[];
  // mycamera: PerspectiveCamera;
  // cameraPosition: THREE.Vector3;
  cubeindex:number;
  // hoveredLetters: string[];
  // setHoveredLetters: React.Dispatch<React.SetStateAction<string[]>>;
  // updateHoveredLetters: (index: number, letter: string) => void;
  // nodes: GLTFResult['nodes'];
  // materials: GLTFResult['materials'];
  // nodes_letter: GLTFResult['nodes_letter'];
  // materials_letter: GLTFResult['materials_letter'];
  // onUpdate?: (event: THREE.Event) => void
}

// const Model = memo((props: ModelProps & JSX.IntrinsicElements['group']) => {
export default function Model(props: ModelProps & JSX.IntrinsicElements['group']) {
  // const { letters, cameraPosition, cubeindex, nodes, materials, nodes_letter, materials_letter, ...otherProps } = props;
  const { letters, cubeindex, ...otherProps } = props;


  const { nodes, materials } = useGLTF(require('../assets/cube_with_bevel.glb')) as GLTFResult;
  const { nodes: nodes_letter, materials: materials_letter } = useGLTF(require('../assets/alphabet.gltf')) as GLTFResult;
  

  // const { nLettersState, hoveredLettersState,updateHoveredLetters  } = useMyContext();
  // const [nCubes, setNCubes] = nLettersState;
  // const [hoveredLetters, setHoveredLetters] = hoveredLettersState;
  // const {index, setIndex} =useState<number>(null)
  // const [localHoveredLetters, setLocalHoveredLetters] = useState<string[]>(Array.from({ length: nCubes }, () => ''));
  const letterPositions: [number, number, number][] = [
    [0, -0.035, 0.028],
    [0, -0.035, -0.028],
    [0.027, -0.035, 0],
    [-0.027, -0.035, 0],
    [0, 0.027, 0.035],
    [0, -0.027, -0.035],
  ];

  const letterRotations: [number, number, number][] = [
    [0, 0, 0],
    [0, 3.14, 0],
    [0, 1.57, 0],
    [0, -1.57, 0],
    [-1.57, 0, 0],
    [1.57, 0, 0],
  ];

  // const { updatecurrentletter, setInteractionStarted } = useVisibleStore();

  const getVisibleLetters = useVisibleStore((state) => state.getVisibleLetters)
  const visibleLetters=getVisibleLetters()



  return (
    <>
    <group {...props} scale={1.8} dispose={null} >
      <group {...props} dispose={null} scale={1}>
        <mesh
          key={cubeindex}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={material_metal}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
        <group scale={33} position={[0, 0, 0]} rotation={[0, 0, 0]} dispose={null}>
          {props.letters.map((letter, letterindex) => (
            <mesh
              
              key={letterindex}
              castShadow
              receiveShadow
              geometry={nodes_letter[letter].geometry}
              // material={material_letter_green}
              material={visibleLetters[props.cubeindex] === letter ? material_letter_green : material_letter}
              position={letterPositions[letterindex]}
              rotation={letterRotations[letterindex] || [0, 0, 0]}
            />
          ))}
        </group>

      </group>
    </group>
    </>
  );

}
// });

// export default Model;

useGLTF.preload(require('../assets/cube_with_bevel.glb'));
useGLTF.preload(require('../assets/alphabet.gltf'));