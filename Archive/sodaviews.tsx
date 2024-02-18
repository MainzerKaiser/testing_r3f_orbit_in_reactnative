import React, { useRef, RefObject } from 'react';
import { Canvas } from '@react-three/fiber'
import {
  View,
  Bounds,
  OrthographicCamera,
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ArcballControls,
  PivotControls,
  Html,
  Center
} from '@react-three/drei'
// import { Soda } from './src/components/soda'
import Chair from './src/components/chair';
import './style.css'

function Lights({ preset }: { preset: "apartment" | "city" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse" | undefined }) {
    return (
      <>
        <ambientLight intensity={1} />
        <pointLight position={[20, 30, 10]} />
        <pointLight position={[-10, -10, -10]} color="blue" />
        <Environment preset={preset} />
      </>
    );
  }

const Sodaviews: React.FC = () => {

// export function sodaviews() {
    const ref = useRef<HTMLDivElement>(null);
    const viewRefs: RefObject<HTMLDivElement>[] = [
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
      ];
    return (
    <div ref={ref} className="container">
      {viewRefs.map((viewRef, index) => (
        <div key={index} ref={viewRef} style={{ position: 'relative', overflow: 'hidden' }} />
      ))}
      <Canvas className="canvas">
        <View index={1} track={viewRefs[0] as React.MutableRefObject<HTMLElement>}>
            <color attach="background" args={['#fed200']} />
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <Lights preset="lobby" />
            <Chair />
          <OrbitControls makeDefault />
        </View>
        <View index={2} track={viewRefs[1] as React.MutableRefObject<HTMLElement>}>
          <color attach="background" args={['#feabda']} />
          <Lights preset="city" />
          <OrthographicCamera makeDefault position={[0, 0, 4]} zoom={100} />
          <Bounds fit clip observe>
            <Chair />
          </Bounds>
          <ArcballControls makeDefault />
        </View>
        <View index={3} track={viewRefs[2]as React.MutableRefObject<HTMLElement>}>
          <color attach="background" args={['#bbfeeb']} />
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <Lights preset="dawn" />
            <Chair />
          <Html>
            <p style={{ color: '#fed200' }}>this is html</p>
          </Html>
          <OrbitControls makeDefault />
        </View>
        <View index={4} track={viewRefs[3]as React.MutableRefObject<HTMLElement>}>
          <color attach="background" args={['#d6edf3']} />
          <PerspectiveCamera makeDefault position={[-1, 1, 1]} fov={25} />
          <Lights preset="warehouse" />
          <OrbitControls makeDefault />
          <PivotControls depthTest={false} scale={0.15} anchor={[0, 0, 0]}>
            <Center>
                <Chair />
            </Center>
          </PivotControls>
        </View>
      </Canvas>
    </div>
  )
}


export default Sodaviews;



  