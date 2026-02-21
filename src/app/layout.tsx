import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Prof. Urvish Soni | National Award-Winning Educator & Innovator",
    description: "Official portfolio of Prof. Urvish Soni — National Award-Winning Educator, Instrumentation Engineer, and Startup Mentor.",
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
            <body className="antialiased bg-background text-foreground">
                <CustomCursor />
                {children}
            </body>
        </html>
    );
}
