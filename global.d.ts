// global.d.ts

declare module '*.tsx' {
    import { JSXElementConstructor, ReactElement } from 'react';
    const value: ReactElement<any, string | JSXElementConstructor<any>>;
    export default value;
}

declare module "three-stdlib/types/three-and-stdlib" {
    import { /* Import necessary types here */ } from "three";
  
    // Adjust the type definition based on the actual structure
    type GLTF = /*unresolved*/ any;
  
    export { GLTF };
  }
  