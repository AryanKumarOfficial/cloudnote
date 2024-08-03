"use client";
import React, {useEffect} from "react";
import axios from "axios";
import Link from "next/link";

const VerifyPage = () => {
    const [token, setToken] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [error, setError] = React.useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", {token})
            if (response.status === 200) {
                setVerified(true);
                setError(false);
            }
        } catch (error: any) {
            setError(true);
            console.log(error.response);
        }
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token) {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <main className={"flex flex-col items-center justify-center min-h-screen py-2"}>
            <h1 className={"text-4xl font-bold"}>Verify Email</h1>
            <h2 className={"text-2xl font-bold"}>{token ? `${token}` : "no token"}</h2>
            {verified && <>
                <h2 className={"text-green-500 text-2xl"}>Email verified successfully</h2>
                <Link href={"/login"} className={"text-blue-500"}>Login
                </Link>
            </>
            }
            {error && <p className={"text-red-500 text-2xl"}>Email verification failed</p>}
        </main>
    );
}
export default VerifyPage;