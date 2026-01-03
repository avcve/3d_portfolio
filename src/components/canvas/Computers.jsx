import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from "../Loader";

const Character = ({ isMobile }) => {
  // Load the model from /public for deployment compatibility
  const model = useGLTF("/ace/model.gltf");
  const ref = useRef();

  // Rotate the character continuously
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5; // rotation speed
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

      {/* Lights adjusted for mobile */}
      <pointLight
        color="white"
        intensity={isMobile ? 2 : 10} // reduced intensity on mobile
        position={[0, 3, 0]}
      />
      <pointLight
        color="white"
        intensity={isMobile ? 2 : 10}
        position={[0, 1, 5]}
      />
      <pointLight
        color="#ff00ff"
        intensity={isMobile ? 1 : 10}
        position={[0, 1, -5]}
      />
      <pointLight
        color="#00ffff"
        intensity={isMobile ? 1 : 10}
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
    <div
      className="canvas-container"
      style={{
        width: "100%",
        height: "100vh", // ensures full viewport height on mobile
        overflow: "hidden",
      }}
    >
      <Canvas
        shadows
        frameloop={isMobile ? "always" : "demand"} // always on mobile for stable rendering
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ position: [0, 1, 5], fov: isMobile ? 30 : 25 }}
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
            autoRotate
            autoRotateSpeed={2}
          />
          <hemisphereLight intensity={0.15} groundColor="black" />
          <spotLight
            position={[-20, 50, 10]}
            angle={0.12}
            penumbra={1}
            intensity={isMobile ? 0.8 : 1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <Character isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default CharacterCanvas;
