"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    FloatingElement,
    PulseRing,
    GlowEffect,
} from "@/components/ui/animations";
import { Target, Users, Filter, Settings } from "lucide-react";

interface MatchmakingHeaderProps {
    remainingUsers: number;
    showFilters: boolean;
    onToggleFilters: () => void;
}

export const MatchmakingHeader: React.FC<MatchmakingHeaderProps> = ({
    remainingUsers,
    showFilters,
    onToggleFilters,
}) => {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 p-6"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo and Title */}
                <div className="flex items-center space-x-4">
                    <motion.div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Target className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Skill Matchmaking
                        </h1>
                        <p className="text-purple-200">
                            Find your perfect learning partner
                        </p>
                    </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center space-x-4">
                    <FloatingElement delay={0.5}>
                        <motion.div
                            className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Users className="w-4 h-4 text-purple-300" />
                            <span className="text-white text-sm">
                                {remainingUsers} matches left
                            </span>
                        </motion.div>
                    </FloatingElement>

                    <GlowEffect intensity="medium">
                        <Button
                            onClick={onToggleFilters}
                            variant="outline"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                        </Button>
                    </GlowEffect>

                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="outline"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                        >
                            <Settings className="w-4 h-4" />
                        </Button>
                        <PulseRing className="border-purple-400" delay={1} />
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
};
