import { useEffect, useRef, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
    children: React.ReactNode;
}

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const reqIdRef = useRef<number | null>(null);

    useEffect(() => {
        const newLenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        setLenis(newLenis);

        const raf = (time: number) => {
            newLenis.raf(time);
            reqIdRef.current = requestAnimationFrame(raf);
        };

        reqIdRef.current = requestAnimationFrame(raf);

        return () => {
            newLenis.destroy();
            if (reqIdRef.current) {
                cancelAnimationFrame(reqIdRef.current);
            }
        };
    }, []);

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
};

export default SmoothScroll;
