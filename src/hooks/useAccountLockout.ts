import { useState, useCallback } from "react";

interface LockoutInfo {
    isLocked: boolean;
    remainingTime?: number;
    reason?: string;
}

interface AccountStatus {
    email: string;
    loginAttempts: number;
    totalFailedAttempts: number;
    lastLoginAttempt?: string;
    lockoutInfo: LockoutInfo;
    lockoutConfig: {
        maxAttempts: number;
        lockoutDuration: number;
        escalationAttempts: number;
        extendedLockoutDuration: number;
    };
}

export function useAccountLockout() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkAccountStatus = useCallback(
        async (email: string): Promise<AccountStatus | null> => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/api/auth/account-lockout?email=${encodeURIComponent(
                        email
                    )}`
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to check account status"
                    );
                }

                return data as AccountStatus;
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "An error occurred";
                setError(errorMessage);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const unlockAccount = useCallback(
        async (email: string): Promise<boolean> => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch("/api/auth/account-lockout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, action: "unlock" }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to unlock account");
                }

                return data.success;
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "An error occurred";
                setError(errorMessage);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const resetLoginAttempts = useCallback(
        async (email: string): Promise<boolean> => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch("/api/auth/account-lockout", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to reset login attempts"
                    );
                }

                return data.success;
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "An error occurred";
                setError(errorMessage);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const formatRemainingTime = useCallback((minutes: number): string => {
        if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMins = minutes % 60;
            return `${hours} hour${hours !== 1 ? "s" : ""}${
                remainingMins > 0
                    ? ` and ${remainingMins} minute${
                          remainingMins !== 1 ? "s" : ""
                      }`
                    : ""
            }`;
        }
    }, []);

    return {
        checkAccountStatus,
        unlockAccount,
        resetLoginAttempts,
        formatRemainingTime,
        isLoading,
        error,
    };
}
