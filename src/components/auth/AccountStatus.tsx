"use client";

import React, { useState, useEffect } from "react";
import { useAccountLockout } from "@/hooks/useAccountLockout";

interface AccountStatusProps {
    email: string;
    showFullStatus?: boolean;
}

export const AccountStatus: React.FC<AccountStatusProps> = ({
    email,
    showFullStatus = false,
}) => {
    const { checkAccountStatus, formatRemainingTime, isLoading, error } =
        useAccountLockout();
    const [accountData, setAccountData] = useState<any>(null);
    const [refreshInterval, setRefreshInterval] =
        useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            const status = await checkAccountStatus(email);
            setAccountData(status);
        };

        fetchStatus();

        // Set up auto-refresh for locked accounts
        if (accountData?.lockoutInfo?.isLocked) {
            const interval = setInterval(fetchStatus, 60000); // Refresh every minute
            setRefreshInterval(interval);
        }

        return () => {
            if (refreshInterval) {
                clearInterval(refreshInterval);
            }
        };
    }, [email, checkAccountStatus]);

    if (isLoading) {
        return (
            <div className="flex items-center space-x-2 text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm">Checking account status...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
                <div className="flex items-center">
                    <svg
                        className="h-4 w-4 text-red-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="text-red-300 text-sm">{error}</span>
                </div>
            </div>
        );
    }

    if (!accountData) return null;

    const { lockoutInfo, loginAttempts, totalFailedAttempts, lockoutConfig } =
        accountData;

    // Show lockout warning
    if (lockoutInfo.isLocked) {
        return (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <div className="flex items-start">
                    <svg
                        className="h-5 w-5 text-red-400 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m0 0v2m0-2h2m-2 0H8m9-10V7a3 3 0 11-6 0v4h6z"
                        />
                    </svg>
                    <div>
                        <h3 className="text-red-300 font-medium mb-1">
                            Account Temporarily Locked
                        </h3>
                        <p className="text-red-200 text-sm mb-2">
                            {lockoutInfo.reason}
                        </p>
                        {lockoutInfo.remainingTime && (
                            <p className="text-red-200 text-sm">
                                Time remaining:{" "}
                                {formatRemainingTime(lockoutInfo.remainingTime)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Show warning if close to lockout
    if (loginAttempts > 0 && loginAttempts < lockoutConfig.maxAttempts) {
        const remaining = lockoutConfig.maxAttempts - loginAttempts;
        return (
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                <div className="flex items-start">
                    <svg
                        className="h-5 w-5 text-yellow-400 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div>
                        <h3 className="text-yellow-300 font-medium mb-1">
                            Login Attempt Warning
                        </h3>
                        <p className="text-yellow-200 text-sm">
                            {remaining} attempt{remaining !== 1 ? "s" : ""}{" "}
                            remaining before account lockout.
                        </p>
                        <p className="text-yellow-200 text-xs mt-1">
                            Account will be locked for{" "}
                            {lockoutConfig.lockoutDuration} minutes after{" "}
                            {lockoutConfig.maxAttempts} failed attempts.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Show full status if requested and there are any failed attempts
    if (showFullStatus && totalFailedAttempts > 0) {
        return (
            <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                <h3 className="text-gray-300 font-medium mb-2">
                    Account Security Status
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-400">
                            Current Failed Attempts:
                        </span>
                        <span className="text-white ml-2">{loginAttempts}</span>
                    </div>
                    <div>
                        <span className="text-gray-400">
                            Total Failed Attempts:
                        </span>
                        <span className="text-white ml-2">
                            {totalFailedAttempts}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-400">Max Attempts:</span>
                        <span className="text-white ml-2">
                            {lockoutConfig.maxAttempts}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-400">Lockout Duration:</span>
                        <span className="text-white ml-2">
                            {lockoutConfig.lockoutDuration} min
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default AccountStatus;
