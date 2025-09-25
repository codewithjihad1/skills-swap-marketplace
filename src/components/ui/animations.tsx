import { motion } from "framer-motion";

interface FloatingElementProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
    children,
    delay = 0,
    duration = 3,
    className = "",
}) => {
    return (
        <motion.div
            className={className}
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
        >
            {children}
        </motion.div>
    );
};

interface PulseRingProps {
    delay?: number;
    className?: string;
}

export const PulseRing: React.FC<PulseRingProps> = ({
    delay = 0,
    className = "",
}) => {
    return (
        <motion.div
            className={`absolute inset-0 rounded-full border-2 border-purple-400 ${className}`}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
                duration: 2,
                repeat: Infinity,
                delay,
            }}
        />
    );
};

interface GlowEffectProps {
    children: React.ReactNode;
    className?: string;
    intensity?: "low" | "medium" | "high";
}

export const GlowEffect: React.FC<GlowEffectProps> = ({
    children,
    className = "",
    intensity = "medium",
}) => {
    const glowIntensity = {
        low: "drop-shadow-lg",
        medium: "drop-shadow-xl",
        high: "drop-shadow-2xl",
    };

    return (
        <motion.div
            className={`${glowIntensity[intensity]} ${className}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};
