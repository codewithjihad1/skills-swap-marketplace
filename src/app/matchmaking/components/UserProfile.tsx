"use client";

import { motion } from "framer-motion";
import { MapPin, Star, Clock, Award, BookOpen, Target } from "lucide-react";

export interface User {
    id: number;
    name: string;
    avatar: string;
    skills: string[];
    wantsToLearn: string[];
    rating: number;
    location: string;
    matchPercentage: number;
    experience: string;
    bio: string;
    online: boolean;
    verified: boolean;
}

interface UserProfileProps {
    user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    return (
        <>
            {/* Profile Header */}
            <div className="relative h-64 bg-gradient-to-r from-purple-600/50 to-pink-600/50 flex items-end">
                {/* Avatar */}
                <motion.div
                    className="absolute top-6 left-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </div>
                        {user.online && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                        {user.verified && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <Award className="w-3 h-3 text-white" />
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Name and Location */}
                <motion.div
                    className="p-6 w-full"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {user.name}
                    </h2>
                    <div className="flex items-center text-purple-200 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        {user.location}
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-yellow-400">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <span className="text-white">{user.rating}</span>
                        </div>
                        <div className="flex items-center text-purple-200">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-white">
                                {user.experience} experience
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bio */}
            <motion.div
                className="p-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <p className="text-gray-300 mb-6">{user.bio}</p>

                {/* Skills Section */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-green-400" />
                            Can teach:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {user.skills.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-blue-400" />
                            Wants to learn:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {user.wantsToLearn.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};
