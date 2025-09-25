"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "../theme/toggle-theme";

interface User {
    id: string;
    name: string;
    avatar?: string;
    isLoggedIn: boolean;
}

interface HeaderProps {
    user?: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Explore Skills", href: "/explore-skills" },
        { name: "Post Skill", href: "/post-skill" },
        { name: "Matchmaking", href: "/matchmaking" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const isActiveLink = (href: string) => pathname === href;

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-700/30 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 group"
                        >
                            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                <span className="text-white font-bold text-lg">
                                    S
                                </span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-200">
                                SkillShare Hub
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                    isActiveLink(item.href)
                                        ? "text-primary bg-primary/10 dark:bg-primary/20 shadow-sm"
                                        : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                            >
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Theme Toggle */}
                    <ModeToggle />

                    {/* User Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {session?.user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleUserDropdown}
                                    className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                                >
                                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center border-2 border-transparent hover:border-primary/50 transition-all duration-200">
                                        {session.user?.image ? (
                                            <Image
                                                src={session?.user?.image}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full object-cover"
                                                width={32}
                                                height={32}
                                            />
                                        ) : (
                                            <span className="text-gray-600 dark:text-gray-300 font-medium">
                                                {session?.user?.name
                                                    ?.charAt(0)
                                                    .toUpperCase() || "U"}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        {session.user?.name}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                                            isUserDropdownOpen
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* User Dropdown */}
                                {isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 py-1 z-50 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-1 duration-200">
                                        <Link
                                            href="/profile"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary transition-all duration-200"
                                            onClick={() =>
                                                setIsUserDropdownOpen(false)
                                            }
                                        >
                                            <span className="mr-3">👤</span>
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary transition-all duration-200"
                                            onClick={() =>
                                                setIsUserDropdownOpen(false)
                                            }
                                        >
                                            <span className="mr-3">📊</span>
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary transition-all duration-200"
                                            onClick={() =>
                                                setIsUserDropdownOpen(false)
                                            }
                                        >
                                            <span className="mr-3">⚙️</span>
                                            Settings
                                        </Link>
                                        <hr className="my-1 border-gray-200 dark:border-gray-600" />
                                        <button onClick={() => signOut()} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200">
                                            <span className="mr-3">🚪</span>
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/auth/signin"
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden animate-in slide-in-from-top duration-200">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                                        isActiveLink(item.href)
                                            ? "text-primary bg-primary/10 dark:bg-primary/20 shadow-sm"
                                            : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span>{item.name}</span>
                                </Link>
                            ))}

                            {/* Mobile User Actions */}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                                {user?.isLoggedIn ? (
                                    <>
                                        <div className="flex items-center px-3 py-2 mb-2">
                                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3 border-2 border-primary/20">
                                                {user.avatar ? (
                                                    <Image
                                                        src={user.avatar}
                                                        alt="Profile"
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                {user.name}
                                            </span>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary transition-all duration-200 rounded-md mx-2"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <span className="mr-3">👤</span>
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary transition-all duration-200 rounded-md mx-2"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <span className="mr-3">📊</span>
                                            Dashboard
                                        </Link>
                                        <button className="flex items-center w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 rounded-md mx-2">
                                            <span className="mr-3">🚪</span>
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/auth/signin"
                                            className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary transition-all duration-200 rounded-md mx-2"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/auth/signup"
                                            className="block px-3 py-2 bg-primary text-white hover:bg-primary/90 rounded-md mx-3 mt-2 text-center font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
