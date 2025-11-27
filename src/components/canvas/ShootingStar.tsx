import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

const ShootingStar = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    // Random starting position and velocity
    const [startPos] = useState(() => new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    ));

    const [velocity] = useState(() => new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
    ));

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.add(velocity);

            // Reset if out of bounds (simple check)
            if (meshRef.current.position.length() > 10) {
                meshRef.current.position.copy(startPos);
                // Randomize velocity slightly on reset
                velocity.set(
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2
                );
            }
        }
    });

    return (
        <Trail
            width={2} // Width of the trail
            length={8} // Length of the trail
            color={new THREE.Color(0, 1, 1)} // Cyan
            attenuation={(t) => t * t}
        >
            <mesh ref={meshRef} position={startPos}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color="#00ffff" />
            </mesh>
        </Trail>
    );
};

export default ShootingStar;
