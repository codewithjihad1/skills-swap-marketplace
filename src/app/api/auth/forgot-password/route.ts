import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import mongoose from "mongoose";
import crypto from "crypto";
import { sendEmail } from "@/lib/nodemailerTransporter";
import resetEmailTemplate from "@/templates/resetEmailTemplate";

// Connect to MongoDB
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI!);
}

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            // Don't reveal whether user exists or not for security
            return NextResponse.json(
                {
                    message:
                        "If a user with that email exists, a password reset link has been sent.",
                },
                { status: 200 }
            );
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Save reset token to user
        await User.findByIdAndUpdate(user._id, {
            resetPasswordToken: resetToken,
            resetPasswordExpires: resetTokenExpiry,
        });

        // Send password reset email
        sendEmail(email, "Password Reset", resetEmailTemplate(`http://localhost:3000/auth/reset-password?token=${resetToken}`, user.firstName, resetTokenExpiry));

        return NextResponse.json(
            {
                message:
                    "Password reset link has been sent to your email address.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
