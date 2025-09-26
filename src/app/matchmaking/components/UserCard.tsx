"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile, User } from "./UserProfile";
import { UserActions } from "./UserActions";
import { Zap } from "lucide-react";

interface UserCardProps {
    user: User;
    onPass: () => void;
    onLike: () => void;
    isAnimating: boolean;
    likedUsers: number[];
}

export const UserCard: React.FC<UserCardProps> = ({
    user,
    onPass,
    onLike,
    isAnimating,
    likedUsers,
}) => {
    return (
        <motion.div
            key={user.id}
            initial={{ x: 300, opacity: 0, rotateY: 90 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            exit={{
                x: isAnimating
                    ? likedUsers.includes(user.id)
                        ? 300
                        : -300
                    : 0,
                opacity: 0,
                rotateY: isAnimating ? 90 : 0,
                scale: isAnimating ? 0.8 : 1,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(e, info) => {
                if (Math.abs(info.offset.x) > 100) {
                    if (info.offset.x > 0) {
                        onLike();
                    } else {
                        onPass();
                    }
                }
            }}
            whileDrag={{ scale: 0.95 }}
            className="relative cursor-grab active:cursor-grabbing"
        >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden">
                {/* Match Percentage Badge */}
                <motion.div
                    className="absolute top-6 right-6 z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                        <Zap className="w-4 h-4 mr-1" />
                        {user.matchPercentage}% Match
                    </div>
                </motion.div>

                <CardContent className="p-0">
                    <UserProfile user={user} />
                    <UserActions
                        onPass={onPass}
                        onLike={onLike}
                        isAnimating={isAnimating}
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
};
