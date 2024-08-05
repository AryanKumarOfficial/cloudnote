import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Home",
    description: "A simple note-taking app",
};

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-10">
            <h1 className={"text-4xl font-bold sm:text-xl lg:text-4xl md:text-2xl"}>Home</h1>
            <Link href={"/notes"} className={"bg-indigo-500 text-white p-4 rounded hover:bg-indigo-700 transition-all duration-500 hover:shadow-modern"}>
                GO TO NOTES
            </Link>
        </main>
    );
}
