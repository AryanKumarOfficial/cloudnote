"use client";
import React, {useEffect} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

const VerifyPasswordPage: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [token, setToken] = React.useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!formData.password || !formData.confirmPassword) {
                setError("Please enter password");
                return;
            }
            setLoading(true)
        } catch
            (error) {
            console.error(error);
            toast.error("An error occurred. Please try again later.");
        }

    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token) {
            setToken(token)
        }
    }, []);

    useEffect(() => {
        if (formData.password !== formData.confirmPassword && formData.confirmPassword.length > 0 && formData.password.length > 0) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    }, [formData]);

    useEffect(() => {
        if (loading && token) {
            toast.promise(
                fetch("/api/users/verifyreset", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify({
                        password: formData.password,
                        token: token
                    })
                }).then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        return Promise.reject(data.error);
                    }
                    return data;
                }),
                {
                    loading: "Changing password...",
                    success: "Password Changed",
                    error: "Failed to change Password"
                }
            ).then(r => {
                router.push("/login")

            })
            setLoading(false)
        }
    }, [token, loading])

    return (
        <main className={"flex flex-col items-center justify-center w-full h-screen bg-[#f9f9f9]"}>
            <form
                onSubmit={handleSubmit}
                className={"flex flex-col items-center justify-center w-1/2 h-2/3 bg-white rounded-lg shadow-lg space-y-10 relative"}>
                <h1 className={"text-2xl font-semibold"}>Verify Password</h1>
                <div className={"flex flex-col gap-2 w-1/2"}>
                    <label htmlFor={"password"}>Password</label>
                    <input
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        value={formData.password}
                        onChange={handleChange}
                        className={"p-2 border border-gray-300 rounded-lg"}
                    />
                </div>
                <div className={"flex flex-col gap-2 w-1/2"}>
                    <label htmlFor={"confirmPassword"}>Confirm Password</label>
                    <input
                        type={"password"}
                        name={"confirmPassword"}
                        id={"confirmPassword"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={"p-2 border border-gray-300 rounded-lg"}
                    />
                </div>
                {error && <p className={"text-red-500 absolute top-[62%]"}>{error}</p>}
                <button
                    type={"submit"}
                    className={"p-2 bg-blue-500 text-white rounded-lg w-1/2"}
                >
                    Change Password
                </button>
            </form>
        </main>
    )
}

export default VerifyPasswordPage;