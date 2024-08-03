import Image from "next/image";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "A simple note-taking app",
};

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1>Home</h1>
        </main>
    );
}
