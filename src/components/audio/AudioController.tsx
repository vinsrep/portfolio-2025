import React, { useEffect, useRef, useState } from 'react';
import spaceSound from '../../assets/audio/space.mp3';

const AudioController: React.FC = () => {
    const [muted, setMuted] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    const initAudio = async () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

            try {
                const response = await fetch(spaceSound);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

                const source = audioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.loop = true;

                const gain = audioContextRef.current.createGain();
                // Start muted
                gain.gain.setValueAtTime(0, audioContextRef.current.currentTime);

                source.connect(gain);
                gain.connect(audioContextRef.current.destination);

                source.start();

                sourceNodeRef.current = source;
                gainNodeRef.current = gain;
            } catch (error) {
                console.error("Error loading audio:", error);
            }
        }
    };

    const toggleMute = async () => {
        if (!audioContextRef.current) {
            await initAudio();
        }

        if (muted) {
            // Unmute: Fade in
            const ctx = audioContextRef.current!;
            if (gainNodeRef.current) {
                gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
                gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
                gainNodeRef.current.gain.linearRampToValueAtTime(0.1, ctx.currentTime); // 0.1 volume for background
            }
            setMuted(false);
        } else {
            // Mute: Fade out
            const ctx = audioContextRef.current!;
            if (gainNodeRef.current) {
                gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
                gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
                gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
            }
            setMuted(true);
        }

        // Resume context if suspended
        if (audioContextRef.current?.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    // UI Sound Effect (Beep)
    const playHoverSound = () => {
        if (muted || !audioContextRef.current) return;

        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioContextRef.current.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, audioContextRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);

        osc.start();
        osc.stop(audioContextRef.current.currentTime + 0.1);
    };

    // Expose playHoverSound to window for other components to use (simple event bus)
    useEffect(() => {
        (window as any).playHoverSound = playHoverSound;
        return () => {
            delete (window as any).playHoverSound;
        };
    });

    return (
        <button
            onClick={toggleMute}
            className="cursor-target cursor-none fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-electric-cyan hover:bg-white/20 transition-all cursor-pointer"
            aria-label={muted ? "Unmute Audio" : "Mute Audio"}
        >
            {muted ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
            ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            )}
        </button>
    );
};

export default AudioController;
