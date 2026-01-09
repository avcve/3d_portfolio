import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Decal,
  Preload,
  useTexture,
} from "@react-three/drei";

// Helper to sanitize geometry
const sanitizeGeometry = (mesh) => {
  if (mesh.geometry?.attributes?.position) {
    const pos = mesh.geometry.attributes.position.array;
    let hasValid = false;
    for (let i = 0; i < pos.length; i++) {
      if (!isFinite(pos[i])) pos[i] = 0;
      else hasValid = true;
    }
    mesh.geometry.attributes.position.needsUpdate = true;
    if (hasValid) {
      try {
        mesh.geometry.computeBoundingSphere();
      } catch {
        mesh.geometry.boundingSphere = { center: [0, 0, 0], radius: 1 };
      }
    } else {
      mesh.geometry.boundingSphere = { center: [0, 0, 0], radius: 1 };
    }
  }
};

const Ball = ({ imgUrl, isMobile }) => {
  const [decal] = useTexture([imgUrl]);
  const ref = useRef();

  // Rotate ball slowly
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * (isMobile ? 0.2 : 0.4);
      ref.current.rotation.x += delta * (isMobile ? 0.1 : 0.2);
    }
  });

  return (
    <Float
      ref={ref}
      speed={isMobile ? 1 : 1.75}
      rotationIntensity={isMobile ? 0.6 : 1}
      floatIntensity={isMobile ? 1 : 2}
    >
      <mesh
        scale={isMobile ? 1.05 : 1.2}
        ref={(mesh) => mesh && sanitizeGeometry(mesh)}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 500px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, isMobile ? 1.25 : 2]}
      camera={{ position: [0, 0, 5], fov: isMobile ? 45 : 50 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        {!isMobile && <directionalLight position={[5, 5, 5]} intensity={0.8} />}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={isMobile ? 0.6 : 1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />

        <Ball imgUrl={icon} isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
