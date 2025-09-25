"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface FloatingParticlesProps {
    count?: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
    count = 20,
}) => {
    const particles = Array.from({ length: count }, (_, i) => i);

    return (
        <div className="absolute inset-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle}
                    className="absolute w-2 h-2 bg-white/20 rounded-full"
                    initial={{
                        x:
                            typeof window !== "undefined"
                                ? Math.random() * window.innerWidth
                                : 0,
                        y:
                            typeof window !== "undefined"
                                ? Math.random() * window.innerHeight
                                : 0,
                    }}
                    animate={{
                        x:
                            typeof window !== "undefined"
                                ? Math.random() * window.innerWidth
                                : 0,
                        y:
                            typeof window !== "undefined"
                                ? Math.random() * window.innerHeight
                                : 0,
                    }}
                    transition={{
                        duration: Math.random() * 10 + 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

interface KeyboardHintsProps {
    className?: string;
}

export const KeyboardHints: React.FC<KeyboardHintsProps> = ({
    className = "",
}) => {
    const shortcuts = [
        { key: "←", action: "Pass" },
        { key: "→", action: "Connect" },
        { key: "↑", action: "Filters" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className={`hidden md:block text-center mb-4 ${className}`}
        >
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-purple-200 text-sm inline-block">
                {shortcuts.map((shortcut, index) => (
                    <span
                        key={shortcut.key}
                        className="inline-flex items-center"
                    >
                        <span className="font-mono bg-white/20 px-2 py-1 rounded text-xs mr-2">
                            {shortcut.key}
                        </span>
                        {shortcut.action}
                        {index < shortcuts.length - 1 && (
                            <span className="mx-3">•</span>
                        )}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};
