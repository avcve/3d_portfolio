import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Canvasloader from "../Loader";

// Sanitize geometry to prevent NaN vertices
const sanitizeGeometry = (obj) => {
  obj.traverse((child) => {
    if (child.isMesh && child.geometry?.attributes?.position) {
      const posAttr = child.geometry.attributes.position;
      const pos = posAttr.array;

      let hasValidVertex = false;
      for (let i = 0; i < pos.length; i++) {
        if (!isFinite(pos[i])) pos[i] = 0; // Replace NaN / Infinity
        else hasValidVertex = true;
      }
      posAttr.needsUpdate = true;

      if (hasValidVertex) {
        try {
          child.geometry.computeBoundingSphere();
        } catch {
          child.geometry.boundingSphere = { center: [0, 0, 0], radius: 1 };
        }
      } else {
        child.geometry.boundingSphere = { center: [0, 0, 0], radius: 1 };
      }
    }
  });
};

const Earth = ({ isMobile }) => {
  const earth = useGLTF("./planet/scene.gltf");
  const ref = useRef();

  // Rotate Earth slowly
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * (isMobile ? 0.2 : 0.4);
    }
  });

  // Sanitize geometry after model loads
  useEffect(() => {
    if (earth.scene) sanitizeGeometry(earth.scene);
  }, [earth]);

  return (
    <group ref={ref} scale={isMobile ? 2 : 2.5} position={[0, 0, 0]}>
      <primitive object={earth.scene} />

      {/* Minimal lighting for mobile */}
      <ambientLight intensity={0.6} />

      {!isMobile && (
        <>
          <pointLight intensity={2} position={[5, 5, 5]} />
          <pointLight intensity={2} position={[-5, -5, -5]} />
        </>
      )}
    </group>
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        frameloop="demand"
        dpr={[1, isMobile ? 1.3 : 2]}
        shadows={!isMobile}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: isMobile ? [-3, 2, 5] : [-4, 3, 6],
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={<Canvasloader />}>
          <OrbitControls
            autoRotate={!isMobile}
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />

          <Earth isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

// Preload GLTF model for faster loading
useGLTF.preload("./planet/scene.gltf");

export default EarthCanvas;
