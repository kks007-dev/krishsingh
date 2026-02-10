'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SecretPage() {
    const [pin, setPin] = useState('');
    const [unlocked, setUnlocked] = useState(false);
    const router = useRouter();

    const handlePress = (num: string) => {
        if (unlocked) return;
        const newPin = pin + num;
        setPin(newPin);

        if (newPin === '0515') {
            setUnlocked(true);
        } else if (newPin.length >= 4) {
            // Wrong pin, reset
            setTimeout(() => setPin(''), 300);
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background stars effect could go here */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

            {!unlocked ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 w-full max-w-sm flex flex-col items-center gap-8"
                >
                    <div className="text-2xl font-bold font-headline tracking-widest text-center mb-4">
                        ENTER PASSCODE
                    </div>

                    <div className="flex gap-4 justify-center mb-4 h-4">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-4 h-4 rounded-full border border-white/50 transition-all duration-300 ${pin.length > i ? 'bg-white scale-110 shadow-[0_0_10px_white]' : 'bg-transparent'}`}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-6 w-full px-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button
                                key={num}
                                onClick={() => handlePress(num.toString())}
                                className="aspect-square rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/10 text-2xl font-medium transition-all duration-200 flex items-center justify-center"
                            >
                                {num}
                            </button>
                        ))}
                        <div />
                        <button
                            onClick={() => handlePress('0')}
                            className="aspect-square rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/10 text-2xl font-medium transition-all duration-200 flex items-center justify-center"
                        >
                            0
                        </button>
                        <button
                            onClick={handleDelete}
                            className="aspect-square rounded-full bg-transparent hover:bg-white/5 active:bg-white/10 text-sm font-medium transition-all duration-200 flex items-center justify-center uppercase tracking-wide"
                        >
                            Delete
                        </button>
                    </div>

                    <Button
                        variant="ghost"
                        className="mt-8 text-white/50 hover:text-white"
                        onClick={() => router.push('/')}
                    >
                        Cancel
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="z-10 text-center space-y-8"
                >
                    <h1 className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-dancing-script p-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" style={{ fontFamily: 'cursive' }}>
                        I couldn't have done it without u :)
                    </h1>

                    <Link href="/" className="inline-block mt-8 text-white/50 hover:text-white transition-colors">
                        Return Home
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
