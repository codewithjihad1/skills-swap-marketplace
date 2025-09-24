import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Connect to MongoDB (if not already connected)
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI!);
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt" as const,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "john@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                try {
                    // Find user by email
                    const user = await User.findOne({
                        email: credentials.email,
                    });
                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    // Check if account is locked
                    if (user.isAccountLocked) {
                        const lockTime = Math.ceil(
                            (user.lockUntil!.getTime() - Date.now()) /
                                (1000 * 60)
                        );
                        throw new Error(
                            `Account locked. Try again in ${lockTime} minutes`
                        );
                    }

                    // Check password
                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isValid) {
                        // Increment failed login attempts
                        await user.incLoginAttempts();
                        throw new Error("Invalid password");
                    }

                    // Reset login attempts on successful login
                    if (user.loginAttempts > 0) {
                        await user.resetLoginAttempts();
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        isVerified: user.isVerified,
                    };
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw error;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isVerified = (user as { isVerified?: boolean }).isVerified;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                (session.user as any).isVerified = token.isVerified;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
