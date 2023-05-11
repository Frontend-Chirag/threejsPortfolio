import { Suspense, useEffect ,useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, SpotLight, useGLTF } from "@react-three/drei";

import CanvasLoader from '../Loader';

const DesktopModel = ({ isMoblie }) => {
  // rendering the deskstop computer model
  const computer = useGLTF("./deskstop/scene.gltf");

  return (
    <mesh>
        <hemisphereLight intensity={1} groundColor={"black"} />
        <pointLight intensity={1} /> 
        <spotLight 
        position={[-20,50,10]}
        angle={0.12}
        penumbra={1}
        intensity={3}
        castShadow
        shadow-mapSize={1024}

        />
        <primitive object={computer.scene}
        scale={isMoblie ? 0.5 : 0.65}
        position={isMoblie ? [0,-2.70 ,-1] : [0,-2.70,-1.5]}
        rotation={[-0.01,-0.2,-0.1]}

        />
    </mesh>
  )
}

const DesktopScene = () => {
    // for mobile device 
    const [ isMoblie, setIsMobile ] = useState(false);
  
    useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 500px)');
  
      setIsMobile(mediaQuery.matches);
  
      const handleMediaQuerychange =  (event) => {
        setIsMobile(event.matches);
      }
      
      mediaQuery.addEventListener('change',handleMediaQuerychange);
      
      return () => {
        mediaQuery.removeEventListener('change',handleMediaQuerychange);
      }
    
  
    }, []);
  
    
    return (
        <Canvas frameloop="demand" shadows 
        camera={{position:[20,3,5], fov:25}}
         gl={{preserveDrawingBuffer:true}}>

          <Suspense fallback={<CanvasLoader/>}>
            <OrbitControls enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            />
            <DesktopModel isMoblie={isMoblie}/>
          </Suspense>     

          <Preload all />
        </Canvas>
    )
}

export default DesktopScene;
