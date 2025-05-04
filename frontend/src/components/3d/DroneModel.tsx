import { useRef, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const DroneModel = () => {
  const droneRef = useRef(null);
  const { scene } = useGLTF("/models/FlyingDrone_.glb");

  useFrame((state) => {
    if (droneRef.current) {
      const time = state.clock.getElapsedTime();
      droneRef.current.position.y = Math.sin(time * 1.5) * 0.05;
      droneRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      ref={droneRef}
      object={scene}
      scale={[15, 15, 15]}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
};

const LoadingSpinner = () => {
  const logoRef = useRef(null);
  const logoTexture = useLoader(
    THREE.TextureLoader,
    "/nexospark-purple-logo.png"
  );

  useFrame((state) => {
    if (logoRef.current) {
      const time = state.clock.getElapsedTime();
      logoRef.current.rotation.z += 0.03; // Gentle rotation
      logoRef.current.scale.setScalar(1 + 0.1 * Math.sin(time * 2)); // Subtle scale pulse
    }
  });

  return (
    <mesh ref={logoRef} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={logoTexture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const DroneModelWithSuspense = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <DroneModel />
  </Suspense>
);

export default DroneModelWithSuspense;

useGLTF.preload("/models/FlyingDrone_.glb");
