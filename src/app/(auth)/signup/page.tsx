"use client";
import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = async () => {
        // Handle signup logic here
    };

    return (
        <main className="flex bg-[#f9f9f9] flex-col justify-center items-center min-h-screen py-2 gap-10">
            <h1 className={"text-4xl font-bold"}>Sign up</h1>
            <form
                onSubmit={onSignup}
                style={{
                    boxShadow: "12px 12px 12px rgba(0,0,0,0.1), -10px -10px 10px white",
                    padding: "20px",
                    borderRadius: "10px"
                }}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="Username"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="Email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="Password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button
                    type={"submit"}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Sign up Here
                </button>
                <span className="mt-4 flex justify-center">
        Visit
        <Link href="/login" className="text-blue-600 hover:text-blue-800 mx-2">
             Login
        </Link>
        page
      </span>
            </form>

        </main>
    )
        ;
}
