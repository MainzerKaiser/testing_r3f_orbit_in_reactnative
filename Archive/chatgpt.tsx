
import React, { Suspense, useRef, useMemo, useContext, useCallback, useEffect, useState, lazy } from 'react';
import Chair from './src/components/chair';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import useControls from 'r3f-native-orbitcontrols';
import * as THREE from "three";
import Trigger from './src/components/Trigger';
import Loader from './src/components/Loader';
import { useVisibleStore } from './src/context/MyZustand';
import { Dimensions } from 'react-native';


const Game: React.FC = () => {
  const { width, height } = Dimensions.get('window');
  const isPortrait = height > width;
  const nCubes= useVisibleStore((state) => state.nCubes)
  const [loading, setLoading] = useState<boolean>(false);

  const controlsAndEvents = Array.from({ length: nCubes }, (_, index) => {
    const [OrbitControls, events] = useControls();
    return { OrbitControls, events, index };
  });

return (
      <SafeAreaView style={styles.container}>
        <View style={styles.modelsContainer}>
        {loading && <Loader />}
          <View style={isPortrait ? styles.columnContainer : styles.rowContainer}>
            {controlsAndEvents.map(({ OrbitControls, events, index }) => (
              <View key={index} style={isPortrait ? styles.modelColumn : styles.modelRow}{...events}>
                  <Canvas key={index}>
                    <OrbitControls
                      key={index} 
                      enabled={true}
                      enableZoom={false}
                      enablePan={false}
                      dampingFactor={0.5}
                      enableRotate={true}
                      rotateSpeed={0.5} 
                      // onChange={(event) => handleCameraChange(event, index, letters)} 
                      {...OrbitControls}
                    />
                    <directionalLight position={[1, -1, -1]} intensity={5} args={["yellow", 10]}  />
                    <directionalLight position={[-1, -1, -1]} intensity={7} args={["white", 10]}  />
                    <Suspense fallback={<Trigger setLoading={setLoading} />}>
                      <Chair />
                    </Suspense>
                  </Canvas>
              </View> 
             ))}
          </View>
         </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey', // Add this line to set the background color to grey
  },
  modelsContainer: {
    flex: 0.9,
  },
   columnContainer: {
    // flexDirection: 'column',
    flex: 1,
  },
  rowContainer: {
    // flexDirection: 'row',
    flex: 1,
  },
  modelColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  modelRow: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Game;
