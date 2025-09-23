import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Connect to MongoDB (if not already connected)
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI!);
}

export const authOptions: NextAuthOptions = {
    // adapter: MongoDBAdapter(clientPromise) as any,
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
                    placeholder: "john@doe.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                // Find user by email
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("No user found with this email");
                }

                // Check password
                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
