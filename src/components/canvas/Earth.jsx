import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"
import Canvasloader from "../Loader"

const Earth = ({ isMobile }) => {
  const earth = useGLTF("./planet/scene.gltf")

  return (
    <primitive
      object={earth.scene}
      scale={isMobile ? 2 : 2.5}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)")
    setIsMobile(mediaQuery.matches)

    const handleChange = (e) => setIsMobile(e.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <Canvas
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
          minPolarAngle={Math.PI / 2}
        />

        <Earth isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

useGLTF.preload("./planet/scene.gltf")

export default EarthCanvas
