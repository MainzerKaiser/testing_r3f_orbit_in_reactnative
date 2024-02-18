import React from 'react';
// import { MyContextProvider } from './src/context/MyContext';
import Game from './game';
// import Sodaviews from './sodaviews'


// import ReactNativeFeatureFlags from 'react-native/Libraries/ReactNative/ReactNativeFeatureFlags';

// // enable the JS-side of the w3c PointerEvent implementation
// ReactNativeFeatureFlags.shouldEmitW3CPointerEvents = () => true;

// // enable hover events in Pressibility to be backed by the PointerEvent implementation
// ReactNativeFeatureFlags.shouldPressibilityUseW3CPointerEventsForHover =
//   () => true;

const App = () => {
  // const Game =lazy(()=>import ('./game'));

  return (
      // <Suspense fallback={null}>
      // <MyContextProvider>
      <Game />
        // <Sodaviews />
      // </MyContextProvider>
      // </Suspense> 
  );
};

export default App; 