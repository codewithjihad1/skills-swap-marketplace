import { useEffect } from "react";

interface UseKeyboardControlsProps {
    onPass: () => void;
    onLike: () => void;
    onToggleFilters: () => void;
    onCloseFilters: () => void;
    currentUserIndex: number;
    totalUsers: number;
    isAnimating: boolean;
}

export const useKeyboardControls = ({
    onPass,
    onLike,
    onToggleFilters,
    onCloseFilters,
    currentUserIndex,
    totalUsers,
    isAnimating,
}: UseKeyboardControlsProps) => {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleKeyPress = (e: KeyboardEvent) => {
            if (currentUserIndex >= totalUsers || isAnimating) return;

            switch (e.key) {
                case "ArrowLeft":
                case "x":
                case "X":
                    onPass();
                    break;
                case "ArrowRight":
                case "Enter":
                case " ":
                    e.preventDefault(); // Prevent space from scrolling
                    onLike();
                    break;
                case "ArrowUp":
                    onToggleFilters();
                    break;
                case "Escape":
                    onCloseFilters();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [
        currentUserIndex,
        isAnimating,
        onPass,
        onLike,
        onToggleFilters,
        onCloseFilters,
        totalUsers,
    ]);
};
