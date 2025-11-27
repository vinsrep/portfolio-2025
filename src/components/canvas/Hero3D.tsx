import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const Hero3D = () => {
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Rotate the mesh
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
            <group ref={meshRef} position={[2, -1, 0]} rotation={[0.4, 0, 0.2]}>
                {/* Saturn Planet */}
                <mesh>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshStandardMaterial
                        color="#bc13fe"
                        emissive="#bc13fe"
                        emissiveIntensity={0.5}
                        roughness={0.2}
                        metalness={0.6}
                        wireframe
                    />
                </mesh>

                {/* Saturn Rings */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.8, 0.3, 2, 64]} />
                    <meshStandardMaterial
                        color="#00f3ff"
                        emissive="#00f3ff"
                        emissiveIntensity={0.8}
                        transparent
                        opacity={0.8}
                        roughness={0.2}
                        metalness={0.8}
                        wireframe
                    />
                </mesh>
            </group>
        </Float>
    );
};

export default Hero3D;
