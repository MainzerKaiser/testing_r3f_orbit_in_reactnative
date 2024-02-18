import { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from "three-stdlib";

interface SodaProps {
  // Add any other props if needed
}

type GLTFResult = GLTF & {
    nodes: {
      [nodeName: string]: THREE.Mesh;
    };
}
export function Soda({ ...props }: SodaProps) {
  const [hovered, spread] = useHover();
  const { nodes } = useGLTF(require('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/soda-bottle/model.gltf')) as GLTFResult;

  return (
    <group {...props} {...spread} dispose={null}>
      <mesh geometry={nodes.Mesh_sodaBottle.geometry}>
        <meshStandardMaterial color={hovered ? 'red' : 'green'} roughness={0} metalness={0.8} envMapIntensity={2} />
      </mesh>
      <mesh geometry={nodes.Mesh_sodaBottle_1.geometry}>
        <meshStandardMaterial color="black" envMapIntensity={0}  />
      </mesh>
    </group>
  );
}

interface HoverProps {
  onPointerOver: (e: any) => void;
  onPointerOut: () => void;
}

function useHover(): [boolean, HoverProps] {
  const [hovered, hover] = useState(false);

  return [hovered, { onPointerOver: (e: any) => hover(true), onPointerOut: () => hover(false) }];
}
