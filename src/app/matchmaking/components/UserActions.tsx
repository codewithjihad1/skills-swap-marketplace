"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/ui/animations";
import { X, Heart, MessageCircle, Sparkles } from "lucide-react";

interface UserActionsProps {
    onPass: () => void;
    onLike: () => void;
    isAnimating: boolean;
}

export const UserActions: React.FC<UserActionsProps> = ({
    onPass,
    onLike,
    isAnimating,
}) => {
    return (
        <motion.div
            className="p-6 pt-0"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
        >
            {/* Main Action Buttons */}
            <div className="flex space-x-4 mb-4">
                <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        onClick={onPass}
                        variant="outline"
                        disabled={isAnimating}
                        className="w-full bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-200 transition-all duration-200"
                    >
                        <X className="w-5 h-5 mr-2" />
                        Pass
                    </Button>
                </motion.div>

                <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <GlowEffect intensity="high">
                        <Button
                            onClick={onLike}
                            disabled={isAnimating}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg transition-all duration-200 relative overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                            />
                            <Heart className="w-5 h-5 mr-2 relative z-10" />
                            <span className="relative z-10">Connect</span>
                        </Button>
                    </GlowEffect>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center space-x-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                    aria-label="Send message"
                >
                    <MessageCircle className="w-4 h-4" />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                    aria-label="Super like"
                >
                    <Sparkles className="w-4 h-4" />
                </motion.button>
            </div>
        </motion.div>
    );
};
