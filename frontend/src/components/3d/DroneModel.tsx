// components/3d/DroneModel.tsx
import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const DroneModel = () => {
  const droneRef = useRef(null);
  const { scene } = useGLTF("/models/FlyingDrone_.glb"); // Adjust path as needed

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

const DroneModelWithSuspense = () => (
  <Suspense
    fallback={
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    }
  >
    <DroneModel />
  </Suspense>
);

export default DroneModelWithSuspense;

useGLTF.preload("/models/FlyingDrone_.glb");
