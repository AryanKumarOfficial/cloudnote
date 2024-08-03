"use client"
import React, {FormEvent, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

const AddNotePage: React.FC = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        content: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleAddNote = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)
            toast.promise(
                fetch("/api/notes/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }).then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        return Promise.reject(data.error);
                    }
                    return data;
                }), {
                    loading: "Adding note...",
                    success: "Note added successfully!",
                    error: "Unable to add note"
                }).then(() => router.push("/notes"))
        } catch (error: any) {
            console.log(error)
            toast.error("Unable to add note. Please Try again")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const token = document.cookie.split(";");
        console.log(token);
    }, []);

    return <main className={"container mx-auto p-4"}>
        <h1 className={"text-3xl font-bold"}>Add Note</h1>
        <form onSubmit={handleAddNote} className={"mt-4"}>
            <div className={"mb-4"}>
                <label htmlFor={"title"} className={"block text-sm font-medium text-gray-700"}>Title</label>
                <input
                    type={"text"}
                    id={"title"}
                    name={"title"}
                    onChange={handleChange}
                    value={form.title}
                    className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}/>
            </div>
            <div className={"mb-4"}>
                <label htmlFor={"content"} className={"block text-sm font-medium text-gray-700"}>Content</label>
                <textarea
                    id={"content"}
                    name={"content"}
                    rows={3}
                    onChange={handleChange}
                    value={form.content}
                    className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}/>
            </div>
            <button type={"submit"}
                    className={"inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}>
                {
                    loading ? "Adding..." : "Add"
                }
            </button>
        </form>
    </main>;
}

export default AddNotePage;