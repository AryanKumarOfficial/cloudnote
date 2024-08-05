"use client"
import React, {FormEvent, useEffect} from "react";
import toast from "react-hot-toast";
import validateEmail from "@/helpers/validateEmail";

const ForgetPage: React.FC = () => {
    const [email, setEmail] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>("");

    const handleForget = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!email || !validateEmail(email)) {
                setError("Invalid email!");
                return;
            }
            setLoading(true);
        } catch (err: any) {
            setError(err.message);
        }
    }

    useEffect(() => {
        if (email && validateEmail(email)) {
            setError(null);
        }
        if (email && !validateEmail(email)) {
            setError("Invalid email!");
        } else if (!email) {
            setError("Email is required!");
        } else {
            setError("");
        }
    }, [email]);

    useEffect(() => {
            if (loading) {
                toast.promise(
                    fetch("/api/users/forget", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({email})
                    }).then(async (res) => {
                        const data = await res.json();
                        if (!res.ok) {
                            throw new Error(data.error);
                        }
                        return data;
                    }).then((data) => {
                        console.log(data.message);
                    }).catch((err) => {
                        setError(err.message);
                    }),
                    {
                        loading: "Sending...",
                        success: "Email sent!",
                        error: "Failed to send email!"
                    }
                ).then(() => {
                        setLoading(false)
                    }
                )
            }
        }
        ,
        [loading]
    )
    ;

    return (
        <main className={"flex flex-col justify-center items-center h-screen bg-gray-100"}>
            <form onSubmit={handleForget} className={"bg-white p-8 rounded-lg shadow-lg flex flex-col w-96"}>
                <h1 className={"text-2xl font-bold text-center"}>Forget Password</h1>
                <input
                    type={"email"}
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={"w-full mt-4 p-2 border border-gray-200 rounded-md"}
                />
                {error && <div className={"text-red-500"}>
                    <span className={'text-xs'}>
                    &#9432;&nbsp;
                    </span>
                    {error}
                </div>
                }
                <button
                    type={"submit"}
                    className={"w-full mt-4 p-2 bg-blue-500 text-white rounded-md"}
                >
                    Forget
                </button>
            </form>
        </main>
    );
}

export default ForgetPage;