import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/app/components/Navbar";
import {Toaster} from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "CloudNote",
    description: "track your important notes from everywhere",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Navbar/>
        <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={5}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            zIndex={1600}
            showAtBottom={false}

        />
        <Toaster
            position='top-center'
            reverseOrder={false}
        />
        {children}
        </body>
        </html>
    );
}
