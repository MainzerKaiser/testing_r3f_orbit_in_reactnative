import React, { Suspense, useRef, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View,} from 'react-native';

import Model from './src/components/cube_with_letters';
import Chair from './src/components/chair';

import { Canvas } from '@react-three/fiber/native';
import useControls from 'r3f-native-orbitcontrols';
import * as THREE from "three";

import { useVisibleStore } from './src/context/MyZustand';

import { Dimensions } from 'react-native';
import Trigger from './src/components/Trigger';
import Loader from './src/components/Loader';

import { fetchAndParseXLSX, XLSXData } from './src/api/fetchQA'; 



const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getRandomLetter = (usedLetters: Set<string>) => {
  let randomLetter;
  do {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomLetter = alphabet[randomIndex];
  } while (usedLetters.has(randomLetter));

  // Add the selected letter to the set of used letters
  usedLetters.add(randomLetter);

  return randomLetter;
};
  const generateLetters = (nCubes: number) => {
  return Array.from({ length: nCubes }, () => {
    const usedLettersForFace = new Set<string>();
    return Array.from({ length: 6 }, () => getRandomLetter(usedLettersForFace));
  });
};




const Game: React.FC = () => {
  const { width, height } = Dimensions.get('window');
  const isPortrait = height > width;

  const getVisibleLetters = useVisibleStore((state) => state.getVisibleLetters)
  const visibleLetters=getVisibleLetters()
  const nCubes= useVisibleStore((state) => state.nCubes)

  const { updatecurrentletter, interactionStarted, setInteractionStarted } = useVisibleStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [letters, setLetters] = useState<string[][]>([]);
  
  
  useEffect(() => {
    // Generate letters only when the component mounts
    const newLetters=generateLetters(nCubes)
    // console.log(newLetters)
    setLetters(newLetters);
    // console.log("ncubes changed: ", newLetters)
  }, [nCubes]);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fileName = './src/assets/QA.xlsx'; // Replace with your actual file name
        const data: XLSXData = await fetchAndParseXLSX(fileName);
        if (data) {
          console.log('Data received:', data);
        } else {
          console.log('Failed to fetch or parse XLSX.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  // const handleCameraChangeWrapper = (event: any, index: number, letters: string[][]) => () => {
  //   console.log("Wrapper")
  //   handleCameraChange(event, index, letters);
  // };




  function ModelCall({ index }: { index: number }) {
    return (
      <Model
        letters={letters[index]}
        cubeindex={index}
      />
    );
  }

  const handleCameraChange = useCallback((event: any, index: number, letters:string[][]) => {
    const { target } = event;
    // console.log("letters[index]: ",letters[index])
    // console.log("off we go")
    if (target) {
      // console.log("target, index: ", target.camera.position, index)
      const { x, y, z } = target.camera.position;
      const cameraTargetPosition = new THREE.Vector3(x, y, z);

      const faces = [
        new THREE.Vector3(0, 0, -1),  // Positive X
        new THREE.Vector3(0, 0, 1),  // Positive Y
        new THREE.Vector3(-1, 0, 0), // Negative X
        new THREE.Vector3(1, 0, 0),  // Positive Z
        new THREE.Vector3(0, -1, 0), // Negative Y
        new THREE.Vector3(0, 1, 0), // Negative Z
      ];
    const cameraDirection = cameraTargetPosition

    cameraDirection.normalize();
    const dotProducts = faces.map((faceDirection) => cameraDirection.dot(faceDirection));
    const mostVisibleFaceIndex = dotProducts.indexOf(Math.min(...dotProducts));
    updatecurrentletter(index,letters[index][mostVisibleFaceIndex])
    // console.log(index)

    // console.log("i, c, l, d, Dir: ", index, cameraTargetPosition, letters[index][mostVisibleFaceIndex], dotProducts, cameraDirection)
    }
  },[]);
  


// useEffect(()=>{
//   // console.log("interaction starte", interactionStarted)
// },[interactionStarted])
// console.log(interactionStarted)

  const controlsAndEvents = Array.from({ length: nCubes }, (_, index) => {
    const [OrbitControls, events] = useControls();
    const orbitControlsRef = useRef<typeof OrbitControls>();
    const canvasRef = useRef<any>(null); // Specify the type as View

    return { OrbitControls, events, orbitControlsRef, canvasRef, index, interactionStarted, setInteractionStarted };
  });
  

  
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.modelsContainer}>
        {loading && <Loader />}
          <View style={isPortrait ? styles.columnContainer : styles.rowContainer}>
            {controlsAndEvents.map(({ OrbitControls, events, orbitControlsRef, canvasRef, index, interactionStarted, setInteractionStarted }) => {
                return (
                  <View
                  key={index}
                  style={isPortrait ? styles.modelColumn : styles.modelRow}
                  {...events}
                >

                    <Canvas key={index} ref={canvasRef} >
                      <OrbitControls
                        // key leads to crypto error
                        key={index} 
                        // ref={orbitControlsRef}
                        // enabled={true}
                        // target={cameraPositions[index]}
                        enableZoom={false}
                        enablePan={false}
                        dampingFactor={0.75}
                        enableRotate={true}
                        rotateSpeed={0.45}
                        onChange={(event) => handleCameraChange(event, index, letters)} 
                        // onChange={(event) => {
                          // console.log("Interaction changed");
                          // setInteractionStarted(index, true);
                          // handleCameraChange(event, index, letters)} 
                        // }}
                        {...OrbitControls}
                      />
                      {/* <directionalLight position={[1, 1, 1]} intensity={5} args={["red", 10]} /> */}
                      <directionalLight position={[-1, 1, 1]} intensity={4} args={["white", 10]}  />
                      <directionalLight position={[1, -1, 1]} intensity={5} args={["blue", 10]}  />
                      <directionalLight position={[-1, -1, 1]} intensity={3} args={["orange", 10]}  />
                      <directionalLight position={[1, 1, -1]} intensity={5} args={["white", 10]}  />
                      {/* <directionalLight position={[-1, 1, -1]} intensity={2} args={["cyan", 10]}  /> */}
                      <directionalLight position={[1, -1, -1]} intensity={5} args={["yellow", 10]}  />
                      <directionalLight position={[-1, -1, -1]} intensity={7} args={["white", 10]}  />
                      <Suspense fallback={<Trigger setLoading={setLoading} />}>
                          <ModelCall index={index}/>
                        {/* <Chair /> */}
                      </Suspense>
                    </Canvas>
                    {/* </View> 
                    </Pressable>*/}
                </View> 
                )
              })}
          </View>
         </View>
        <View style={styles.bottomContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Your CubeWordle is: {visibleLetters.join('')}
            </Text>
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
  bottomContainer: {
      flex: 0.1,
      justifyContent: 'flex-end',  // Align the content to the bottom
      backgroundColor: '#5e2f00',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  },
  textContainer: {
    // position: 'absolute',
    flex:1,
    justifyContent: 'center',  // Center the content vertically
    alignItems: 'center',  // Center the content horizontally
    padding: 20,
    // backgroundColor: 'rgba(0, 0.5, 0, 0.5)',
  },
  text: {
    color: 'white',  // Specify the text color
    fontSize: 20,  // Adjust the font size as needed
    // fontFamily: 'Arial',  // Specify the font family
    // Add other text styles as needed
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
