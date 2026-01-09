import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from "../Loader";

// Sanitize geometry to fix NaN vertices and bounding spheres
const sanitizeGeometry = (obj) => {
  obj.traverse((child) => {
    if (child.isMesh && child.geometry?.attributes?.position) {
      const posAttr = child.geometry.attributes.position;
      const pos = posAttr.array;

      let hasValidVertex = false;

      for (let i = 0; i < pos.length; i++) {
        if (!isFinite(pos[i])) {
          pos[i] = 0; // Replace NaN/Infinity
        } else {
          hasValidVertex = true;
        }
      }

      posAttr.needsUpdate = true;

      // Compute bounding sphere safely
      if (hasValidVertex) {
        try {
          child.geometry.computeBoundingSphere();
        } catch {
          child.geometry.boundingSphere = { center: [0, 0, 0], radius: 1 };
        }
      } else {
        // Default bounding sphere if no valid vertices
        child.geometry.boundingSphere = { center: [0, 0, 0], radius: 1 };
      }
    }
  });
};

const Character = ({ isMobile }) => {
  const model = useGLTF("/ace/model.gltf");
  const ref = useRef();

  // Rotate character
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * (isMobile ? 0.3 : 0.5);
    }
  });

  // Sanitize geometry after model loads
  useEffect(() => {
    if (model.scene) sanitizeGeometry(model.scene);
  }, [model]);

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
        height: "100vh", // full viewport height
        overflow: "hidden",
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
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

// Preload the GLTF model for faster loading
useGLTF.preload("/ace/model.gltf");

export default CharacterCanvas;
