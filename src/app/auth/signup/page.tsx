"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/app/actions/auth/registerUser";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Handle signup form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                throw new Error("All fields are required");
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Please enter a valid email address");
            }

            const result = await registerUser({ name, email, password });

            if (!result.success) {
                throw new Error(result.error || "Registration failed");
            }

            setSuccess(
                "Registration successful! You can now sign in to your account."
            );

            // Clear form
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // Redirect to signin after a delay
            setTimeout(() => {
                router.push("/auth/signin");
            }, 2000);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Registration failed"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e293b] px-4">
            <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-[#0b1120]/90 backdrop-blur-lg border-gray-700">
                {/* Header */}
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-white">
                        Create your account
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Join our skill-swapping community today
                    </CardDescription>
                </CardHeader>

                {/* Form */}
                <CardContent>
                    {/* Success Message */}
                    {success && (
                        <div className="mb-4 rounded-md bg-green-900/20 p-3 border border-green-700">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 text-green-400 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-green-300 text-sm">
                                    {success}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 rounded-md bg-red-900/20 p-3 border border-red-700">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 text-red-400 mr-2"
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
                                <span className="text-red-300 text-sm">
                                    {error}
                                </span>
                            </div>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {/* Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-gray-300">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                                className="bg-[#1e293b] border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-gray-300">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="bg-[#1e293b] border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2 relative">
                            <Label htmlFor="password" className="text-gray-300">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password (min. 6 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="bg-[#1e293b] border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 pr-12"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-8 text-gray-400 hover:text-gray-300"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="grid gap-2 relative">
                            <Label
                                htmlFor="confirmPassword"
                                className="text-gray-300"
                            >
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                disabled={isLoading}
                                className="bg-[#1e293b] border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 pr-12"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-8 text-gray-400 hover:text-gray-300"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>

                    {/* Already have account */}
                    <p className="text-sm text-gray-400 mt-4 text-center">
                        Already have an account?{" "}
                        <Link
                            href="/auth/signin"
                            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;
