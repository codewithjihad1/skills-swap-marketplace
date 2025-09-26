"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Shuffle } from "lucide-react";

interface NoMoreUsersCardProps {
    onShuffle: () => void;
}

export const NoMoreUsersCard: React.FC<NoMoreUsersCardProps> = ({
    onShuffle,
}) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
        >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-12">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <Trophy className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        You've seen all matches!
                    </h2>
                    <p className="text-purple-200 mb-6">
                        Check back later for new skill-swapping opportunities,
                        or adjust your filters.
                    </p>
                    <Button
                        onClick={onShuffle}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                        <Shuffle className="w-4 h-4 mr-2" />
                        Start Over
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};
