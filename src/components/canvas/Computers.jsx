import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from "../Loader";

const Character = ({ isMobile }) => {
  const model = useGLTF("./ace/model.gltf");
  const ref = useRef();

  // Rotate the character in place
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5; // spin speed
    }
  });

  return (
    <group
      ref={ref}
      scale={isMobile ? 1.2 : 1.5}
      position={isMobile ? [0, -2, 0] : [0, -2.5, 0]}
      rotation={[0, 0, 0]}
    >
      <primitive object={model.scene} />

      {/* Point light above the head */}
      <pointLight
        color="white"
        intensity={10}
        position={[0, 3, 0]} // x, y, z relative to the model
      />

      {/* Front light shining at the model */}
      <pointLight
        color="white"
        intensity={100}
        position={[0, 1, 5]} // x, y, z relative to model
      />


      {/* Rim light behind the character */}
      <pointLight
        color="#ff00ff"
        intensity={10}
        position={[0, 1, -5]}
      />

      {/* Optional: subtle fill light */}
      <pointLight
        color="#00ffff"
        intensity={10}
        position={[-2, 1, 2]}
      />

    </group>
  );
};

const CharacterCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [0, 1, 5], fov: 25 }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          enableZoom={false} // user can orbit around the character
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
          autoRotate // ✅ camera will orbit automatically 
          autoRotateSpeed={2}
        />

        <hemisphereLight intensity={0.15} groundColor="black" />
        <pointLight intensity={1} />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <Character isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default CharacterCanvas;
