import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

type CharacterModelViewerProps = {
  modelPath: string;
  cameraPosition?: [number, number, number];
  modelScale?: number;
};

function CameraSetup({ cameraPosition }: { cameraPosition?: [number, number, number] }) {
  const { camera } = useThree();

  const [x, y, z] = cameraPosition ?? [0, 1.2, 6.5];
  camera.position.set(x, y, z);
  camera.lookAt(0, 1.1, 0);

  return null;
}

function Model({ modelPath, modelScale }: CharacterModelViewerProps) {
  const gltf = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.006;
    }
  });

  return (
    <Center>
      <group
        ref={modelRef}
        scale={modelScale ?? 0.85}
        position={[0, -1.05, 0]}
        rotation={[0, 0, 0]}
      >
        <primitive object={gltf.scene} />
      </group>
    </Center>
  );
}

export default function CharacterModelViewer({
  modelPath,
  cameraPosition,
  modelScale,
}: CharacterModelViewerProps) {
  return (
    <Canvas
      camera={{ position: cameraPosition ?? [2, 1.8, 5], fov: 32 }}
      gl={{
        alpha: true,
        antialias: true,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <CameraSetup cameraPosition={cameraPosition} />

      <ambientLight intensity={1.4} />
      <hemisphereLight intensity={1.2} groundColor="#111827" />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-3, 2, 2]} intensity={0.9} />

      <Suspense fallback={null}>
        <Model modelPath={modelPath} modelScale={modelScale} />
      </Suspense>
    </Canvas>
  );
}