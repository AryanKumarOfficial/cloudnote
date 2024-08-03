import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import React from "react";
import Navbar from "@/app/components/Navbar";
import {cookies} from "next/headers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        default: "CloudNote",
        template: "%s | CloudNote",
    },
    description: "A simple note-taking app",

};


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    return (
        <html lang="en">
        <body className={inter.className}>
        <Navbar token={token}/>
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 5000,
                style: {
                    background: "#333",
                    color: "#fff",
                },
            }}
        />
        {children}
        </body>
        </html>
    );
}
