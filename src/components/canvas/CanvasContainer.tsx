import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import ShootingStar from './ShootingStar';
import ScrollParallax from './ScrollParallax';
interface CanvasContainerProps {
    children: React.ReactNode;
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({ children }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-void-black">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 75 }}
                dpr={[1, 2]} // Optimize for high DPI screens
                gl={{ antialias: true, alpha: false }}
            >
                <Suspense fallback={null}>
                    {children}
                    <Preload all />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.5} height={300} />
                        <Noise opacity={0.02} />
                        <Vignette eskil={false} offset={0.05} darkness={1.1} />
                    </EffectComposer>
                    <ShootingStar />
                    <ShootingStar />
                    <ShootingStar />
                    <ScrollParallax />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default CanvasContainer;
