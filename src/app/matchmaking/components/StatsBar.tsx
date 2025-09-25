"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface StatsBarProps {
    likedUsers: number;
    passedUsers: number;
    remainingUsers: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({
    likedUsers,
    passedUsers,
    remainingUsers,
}) => {
    const stats = [
        {
            value: likedUsers,
            label: "Connections",
            color: "text-green-400",
        },
        {
            value: passedUsers,
            label: "Passed",
            color: "text-red-400",
        },
        {
            value: remainingUsers,
            label: "Remaining",
            color: "text-purple-400",
        },
    ];

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 grid grid-cols-3 gap-4"
        >
            {stats.map((stat, index) => (
                <Card
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-lg border-white/20"
                >
                    <CardContent className="p-4 text-center">
                        <motion.div
                            className={`text-2xl font-bold ${stat.color} mb-1`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                        >
                            {stat.value}
                        </motion.div>
                        <div className="text-sm text-gray-300">
                            {stat.label}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </motion.div>
    );
};
