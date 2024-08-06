"use client";
import React, {useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        _id: "000000000000000",
        username: "john_doe",
        email: "@john_doe",

    });
    const [loading, setLoading] = React.useState(false);

    async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message || "Failed to logout");
        }
    }

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/users/me');
            setUser(res.data.data);

        } catch (error: any) {
            console.log(error);
            toast.error(error.message || "Failed to get user details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <main className="flex bg-[#f9f9f9] flex-col justify-center items-center min-h-screen py-2 gap-10">
            <h1 className={"text-4xl font-bold"}>Profile</h1>

            <section className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">{loading ? "Fetching Data..." : user.username}</h2>
                        <p className="text-gray-500">
                            <span className="font-bold">Email:</span>
                            {loading ? "Fetching Data..." :
                                <span> {user.email}</span>}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold">Username:</span>
                            {loading ? "Fetching Data..." : <span> {user.username}</span>}
                        </p>
                    </div>
                </div>
                <hr className={
                    "border-t-4 border-gray-300 w-96"
                }/>
                {/*{user?._id && <Link href={`/profile/${user._id}`} className={*/}
                {/*    "bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-center"*/}
                {/*}>*/}
                {/*    Edit Profile*/}
                {/*</Link>}*/}
                <button
                    className="bg-blue-500  hover:bg-blue-700 hover:shadow-modern transition-all duration-500 text-white font-bold py-2 px-4 rounded-md"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <Link
                    href={"/notes"}
                    className="bg-blue-500  text-center hover:bg-blue-700 hover:shadow-modern transition-all duration-500 text-white font-bold py-2 px-4 rounded-md"
                >
                    GO TO NOTES
                </Link>
            </section>
        </main>
    );
};
