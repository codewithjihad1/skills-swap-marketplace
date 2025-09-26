"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useKeyboardControls } from "@/hooks/useKeyboardControls";
import { mockUsers } from "@/data/mockUsers";
import { FloatingParticles, KeyboardHints } from "./components/BackgroundElements";
import { MatchmakingHeader } from "./components/MatchmakingHeader";
import { NoMoreUsersCard } from "./components/NoMoreUsersCard";
import { UserCard } from "./components/UserCard";
import { StatsBar } from "./components/StatsBar";
import { FiltersSidebar } from "./components/FiltersSidebar";

const MatchmakingPage = () => {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [likedUsers, setLikedUsers] = useState<number[]>([]);
    const [passedUsers, setPassedUsers] = useState<number[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    const currentUser = mockUsers[currentUserIndex];
    const remainingUsers =
        mockUsers.length -
        currentUserIndex -
        likedUsers.length -
        passedUsers.length;

    const handleLike = () => {
        if (isAnimating || currentUserIndex >= mockUsers.length) return;
        setIsAnimating(true);
        setLikedUsers((prev) => [...prev, currentUser.id]);

        setTimeout(() => {
            setCurrentUserIndex((prev) => prev + 1);
            setIsAnimating(false);
        }, 300);
    };

    const handlePass = () => {
        if (isAnimating || currentUserIndex >= mockUsers.length) return;
        setIsAnimating(true);
        setPassedUsers((prev) => [...prev, currentUser.id]);

        setTimeout(() => {
            setCurrentUserIndex((prev) => prev + 1);
            setIsAnimating(false);
        }, 300);
    };

    const handleShuffle = () => {
        setCurrentUserIndex(0);
        setLikedUsers([]);
        setPassedUsers([]);
    };

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleCloseFilters = () => {
        setShowFilters(false);
    };

    // Keyboard controls
    useKeyboardControls({
        onPass: handlePass,
        onLike: handleLike,
        onToggleFilters: handleToggleFilters,
        onCloseFilters: handleCloseFilters,
        currentUserIndex,
        totalUsers: mockUsers.length,
        isAnimating,
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Floating Particles Background */}
            <FloatingParticles count={20} />

            {/* Header */}
            <MatchmakingHeader
                remainingUsers={remainingUsers}
                showFilters={showFilters}
                onToggleFilters={handleToggleFilters}
            />

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 pb-6">
                {/* Keyboard Shortcuts Hint */}
                <KeyboardHints />

                {currentUserIndex >= mockUsers.length ? (
                    <NoMoreUsersCard onShuffle={handleShuffle} />
                ) : (
                    <AnimatePresence mode="wait">
                        <UserCard
                            user={currentUser}
                            onPass={handlePass}
                            onLike={handleLike}
                            isAnimating={isAnimating}
                            likedUsers={likedUsers}
                        />
                    </AnimatePresence>
                )}

                {/* Stats Bar */}
                {currentUserIndex < mockUsers.length && (
                    <StatsBar
                        likedUsers={likedUsers.length}
                        passedUsers={passedUsers.length}
                        remainingUsers={remainingUsers}
                    />
                )}
            </div>

            {/* Filters Sidebar */}
            <FiltersSidebar
                isOpen={showFilters}
                onClose={handleCloseFilters}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
        </div>
    );
};

export default MatchmakingPage;
