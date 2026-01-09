import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from "../Loader";

const Character = ({ isMobile }) => {
  const model = useGLTF("/ace/model.gltf");
  const ref = useRef();

  // Rotate character (safe on mobile)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * (isMobile ? 0.3 : 0.5);
    }
  });

  return (
    <group
      ref={ref}
      scale={isMobile ? 1.1 : 1.5}
      position={isMobile ? [0, -1.8, 0] : [0, -2.5, 0]}
    >
      <primitive object={model.scene} />

      {/* Minimal lighting for mobile */}
      <ambientLight intensity={0.6} />

      {!isMobile && (
        <>
          <pointLight intensity={5} position={[0, 3, 0]} />
          <pointLight intensity={5} position={[0, 1, 5]} />
        </>
      )}
    </group>
  );
};

const CharacterCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 500px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, isMobile ? 1.25 : 2]}
        shadows={!isMobile}
        camera={{
          position: isMobile ? [0, 1, 4.5] : [0, 1, 5],
          fov: isMobile ? 30 : 25,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={isMobile ? 1.2 : 2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />

          <Character isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/ace/model.gltf");

export default CharacterCanvas;
