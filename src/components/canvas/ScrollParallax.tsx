import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

const ScrollParallax = () => {
    const { camera } = useThree();
    const initialY = useRef(camera.position.y);

    useFrame(() => {
        // Calculate scroll progress (0 to 1)
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1);

        // Move camera down as we scroll (parallax effect)
        // Adjust the multiplier to control speed
        camera.position.y = initialY.current - progress * 5;

        // Optional: Rotate camera slightly
        // camera.rotation.x = -progress * 0.2;
    });

    return null;
};

export default ScrollParallax;
