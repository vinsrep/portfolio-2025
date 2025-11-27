import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactTerminal: React.FC = () => {
    const [step, setStep] = useState<'init' | 'name' | 'email' | 'message' | 'sending' | 'sent'>('init');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const addToHistory = (text: string, type: 'system' | 'user' = 'system') => {
        setHistory(prev => [...prev, type === 'user' ? `> ${text}` : text]);
    };

    useEffect(() => {
        if (step === 'init') {
            setTimeout(() => {
                addToHistory('Initializing secure connection...', 'system');
                setTimeout(() => {
                    addToHistory('Connection established.', 'system');
                    addToHistory('Please identify yourself.', 'system');
                    setStep('name');
                }, 800);
            }, 500);
        }
    }, [step]);

    useEffect(() => {
        // Auto-focus input
        if (inputRef.current && ['name', 'email', 'message'].includes(step)) {
            inputRef.current.focus();
        }
    }, [step, history]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        addToHistory(input, 'user');
        (window as any).playHoverSound?.(); // Play sound on enter

        if (step === 'name') {
            setFormData({ ...formData, name: input });
            setInput('');
            setTimeout(() => {
                addToHistory(`Welcome, ${input}.`, 'system');
                addToHistory('Enter communication frequency (Email):', 'system');
                setStep('email');
            }, 500);
        } else if (step === 'email') {
            setFormData({ ...formData, email: input });
            setInput('');
            setTimeout(() => {
                addToHistory('Frequency locked.', 'system');
                addToHistory('Enter transmission message:', 'system');
                setStep('message');
            }, 500);
        } else if (step === 'message') {
            const finalMessage = input;
            setFormData({ ...formData, message: finalMessage });
            setInput('');
            setStep('sending');

            addToHistory('Encrypting data...', 'system');

            try {
                // Prepare template params
                const templateParams = {
                    from_name: formData.name,
                    from_email: formData.email,
                    reply_to: formData.email,
                    to_email: 'msvincentius@gmail.com',
                    message: finalMessage,
                    to_name: 'Vincensius Marcel',
                };

                console.log('Sending EmailJS with params:', templateParams);
                console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID);
                console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
                console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    templateParams,
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                );

                setTimeout(() => {
                    addToHistory('Transmitting to deep space...', 'system');
                    setTimeout(() => {
                        setStep('sent');
                        addToHistory('Transmission successful. Stand by for response.', 'system');
                    }, 1500);
                }, 800);

            } catch (error) {
                console.error('EmailJS Error:', error);
                setTimeout(() => {
                    addToHistory('CRITICAL ERROR: Transmission failed.', 'system');
                    addToHistory('Check secure keys or try again later.', 'system');
                    setStep('message'); // Allow retry
                }, 1000);
            }
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-black/80 backdrop-blur-md border border-electric-cyan/30 rounded-lg overflow-hidden font-mono text-sm md:text-base shadow-[0_0_20px_rgba(0,243,255,0.1)]">
            {/* Terminal Header */}
            <div className="bg-electric-cyan/10 border-b border-electric-cyan/30 p-2 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-electric-cyan/50 text-xs">COMMS_UPLINK_V2.0</div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 h-[400px] overflow-y-auto flex flex-col" onClick={() => inputRef.current?.focus()}>
                <div className="flex-1 space-y-2">
                    {history.map((line, i) => (
                        <div key={i} className={`${line.startsWith('>') ? 'text-white' : 'text-electric-cyan'}`}>
                            {line}
                        </div>
                    ))}

                    {['name', 'email', 'message'].includes(step) && (
                        <form onSubmit={handleSubmit} className="flex items-center gap-2 text-white">
                            <span className="text-electric-cyan">{'>'}</span>
                            <input
                                ref={inputRef}
                                type={step === 'email' ? 'email' : 'text'}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/20"
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                            />
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-electric-cyan inline-block"
                            />
                        </form>
                    )}

                    {step === 'sent' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 p-4 border border-green-500/30 bg-green-500/10 text-green-400 rounded"
                        >
                            SESSION TERMINATED.
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactTerminal;
