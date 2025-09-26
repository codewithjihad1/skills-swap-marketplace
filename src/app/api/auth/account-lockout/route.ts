import { NextRequest, NextResponse } from "next/server";
import User, { LOCKOUT_CONFIG } from "@/models/User";
import mongoose from "mongoose";

// Connect to MongoDB
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI!);
}

// GET - Check account lockout status
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { error: "Email parameter is required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const lockoutInfo = user.getLockoutInfo();

        return NextResponse.json({
            email: user.email,
            loginAttempts: user.loginAttempts,
            totalFailedAttempts: user.totalFailedAttempts,
            lastLoginAttempt: user.lastLoginAttempt,
            lockoutInfo,
            lockoutConfig: {
                maxAttempts: LOCKOUT_CONFIG.MAX_LOGIN_ATTEMPTS,
                lockoutDuration: LOCKOUT_CONFIG.LOCKOUT_DURATION / (1000 * 60), // in minutes
                escalationAttempts: LOCKOUT_CONFIG.ESCALATION_ATTEMPTS,
                extendedLockoutDuration:
                    LOCKOUT_CONFIG.EXTENDED_LOCKOUT_DURATION / (1000 * 60 * 60), // in hours
            },
        });
    } catch (error) {
        console.error("Account status check error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// POST - Unlock account (admin function)
export async function POST(req: NextRequest) {
    try {
        const { email, action } = await req.json();

        if (!email || !action) {
            return NextResponse.json(
                { error: "Email and action are required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (action === "unlock") {
            await user.unlockAccount();

            console.log(`Admin action: Account unlocked for ${email}`);

            return NextResponse.json({
                success: true,
                message: "Account has been unlocked successfully",
                email: user.email,
            });
        } else {
            return NextResponse.json(
                { error: "Invalid action. Use 'unlock'" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Account management error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// PUT - Reset failed login attempts
export async function PUT(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        await user.updateOne({
            $set: {
                loginAttempts: 0,
                totalFailedAttempts: 0,
            },
            $unset: { lockUntil: 1 },
        });

        console.log(`Admin action: Login attempts reset for ${email}`);

        return NextResponse.json({
            success: true,
            message: "Login attempts have been reset successfully",
            email: user.email,
        });
    } catch (error) {
        console.error("Reset attempts error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
