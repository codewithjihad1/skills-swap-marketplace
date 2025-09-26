import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["images.unsplash.com"],
        // Or use the newer remotePatterns (recommended):
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            }
        ],
    },
    plugins: {
        "@tailwindcss/postcss": {},
    },
};

export default nextConfig;
