"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Code, Palette, Camera, Music } from "lucide-react";

interface FiltersSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
    isOpen,
    onClose,
    searchQuery,
    onSearchChange,
}) => {
    const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
    const categories = [
        { name: "Development", icon: Code },
        { name: "Design", icon: Palette },
        { name: "Photography", icon: Camera },
        { name: "Music", icon: Music },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        exit={{ x: 400 }}
                        className="fixed right-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-lg border-l border-white/20 z-50 p-6 overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">
                                Filters
                            </h3>
                            <Button
                                onClick={onClose}
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="space-y-6">
                            {/* Search Skills */}
                            <div>
                                <Label className="text-white mb-2 block">
                                    Search Skills
                                </Label>
                                <Input
                                    placeholder="e.g. React, Python, Design..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        onSearchChange(e.target.value)
                                    }
                                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                />
                            </div>

                            {/* Experience Level */}
                            <div>
                                <Label className="text-white mb-3 block">
                                    Experience Level
                                </Label>
                                <div className="space-y-2">
                                    {experienceLevels.map((level) => (
                                        <label
                                            key={level}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800"
                                            />
                                            <span className="text-gray-300">
                                                {level}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <Label className="text-white mb-3 block">
                                    Categories
                                </Label>
                                <div className="space-y-2">
                                    {categories.map(({ name, icon: Icon }) => (
                                        <label
                                            key={name}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800"
                                            />
                                            <Icon className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-300">
                                                {name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                Apply Filters
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
