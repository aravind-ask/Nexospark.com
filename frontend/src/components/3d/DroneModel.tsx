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
      // Gentle floating effect
      logoRef.current.position.y = Math.sin(time * 1) * 0.1;
      // Pulsing scale effect
      logoRef.current.scale.setScalar(1 + 0.05 * Math.sin(time * 1.5));
      // Update shader time uniform for glow animation
      logoRef.current.material.uniforms.uTime.value = time;
    }
  });

  // Custom shader for glowing effect
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      // Calculate distance from center for glow
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      // Dynamic glow effect
      float glow = 0.1 + 0.05 * sin(uTime * 2.0);
      float glowStrength = smoothstep(0.4, 0.6, dist) * glow;
      vec3 glowColor = vec3(0.3, 0.2, 0.8); // Purple glow to match logo
      vec3 finalColor = texColor.rgb + glowColor * glowStrength * texColor.a;
      gl_FragColor = vec4(finalColor, texColor.a);
    }
  `;

  const uniforms = {
    uTexture: { value: logoTexture },
    uTime: { value: 0.0 },
  };

  return (
    <mesh ref={logoRef} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
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
