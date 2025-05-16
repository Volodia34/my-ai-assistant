import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
    title: "My AI Assistant",
    description: "AI Assistant built with Next.js and Gemini API",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-[#171727] text-[#e0e0e0] overflow-hidden`}>
        <ChatProvider>
            {children}
        </ChatProvider>
        </body>
        </html>
    );
}
