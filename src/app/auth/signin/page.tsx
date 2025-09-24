"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// Define TypeScript interface for login form data
interface LoginForm {
    email: string;
    password: string;
    rememberMe: boolean;
}

// Main LoginPage component
const LoginPage: React.FC = () => {
    // Initialize the Next.js router
    const router = useRouter();

    // State for login form data
    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: "",
        rememberMe: false,
    });

    // State for showing/hiding password
    const [showPassword, setShowPassword] = useState(false);

    // State for loading status
    const [isLoading, setIsLoading] = useState(false);

    // State for error messages
    const [error, setError] = useState("");

    // Handle input changes in the login form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        // Update form state based on input type
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        // Clear any previous errors when user starts typing
        if (error) setError("");
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Validation
            if (!formData.email || !formData.password) {
                throw new Error("Please fill in all fields");
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error("Please enter a valid email address");
            }

            // Attempt to sign in using NextAuth
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            if (result?.ok) {
                // Get session to check user data
                // const session = await getSession();

                // Redirect to dashboard or home page
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            // Set error message for display
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred during login"
            );
        } finally {
            // Reset loading state
            setIsLoading(false);
        }
    };

    // Handle "Forgot Password" click
    const handleForgotPassword = () => {
        // Navigate to the forgot password page
        router.push("/auth/forgot-password");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white px-4">
            <div className="grid md:grid-cols-2 w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden bg-[#0b1120]/80 backdrop-blur-lg">
                {/* Left Side - Welcome Message */}
                <div className="hidden md:flex flex-col items-center justify-center bg-transparent p-10">
                    <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
                    <p className="text-gray-400 text-center">
                        Sign in to your account and continue your skill-swapping
                        journey with us.
                    </p>
                    <div className="mt-8 w-24 h-1 bg-blue-500 rounded-full"></div>
                </div>

                {/* Right Side (Form) */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold">
                        Sign in to your account
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        Welcome back! Please enter your details.
                    </p>

                    {/* Error Message Display */}
                    {error && (
                        <div className="mt-4 rounded-md bg-red-900/20 p-3 border border-red-700">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 text-red-400 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
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

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 transition-all"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 transition-all pr-12"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                disabled={isLoading}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    className="accent-blue-500"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className="text-gray-400"
                                >
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                disabled={isLoading}
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{" "}
                            <Link
                                href="/auth/signup"
                                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                            >
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the component
export default LoginPage;
