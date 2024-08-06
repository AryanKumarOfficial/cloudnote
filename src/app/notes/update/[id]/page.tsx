"use client"
import React, {FormEvent, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import Link from "next/link";

const UpdateNotePage = ({params}: { params: { id: string } }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    })
    const [isInvalid, setIsInvalid] = useState(false);
    const [loader, setLoader] = useState(false);

    function handleUpdateNote(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setLoader(true)
            toast.promise(
                fetch(`/api/notes/update/${params.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify(formData)
                }).then(async (res) => {
                    const data = await res.json();
                    console.log(data)
                }).catch((err) => {
                    console.log(err.message)
                }), {
                    loading: "Updating Note...",
                    success: "Note Updated",
                    error: "Failed to Update Note"
                }
            ).then(() => {
                router.push("/notes")
            })

        } catch (error: any) {
            console.log(error)
            toast.error("Unable to update note")
        } finally {
            setLoader(false)
        }

    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({...formData, [e.target.name]: e.target.value.toUpperCase()})

    }

    useEffect(() => {
        (async () => {
            await fetch(`/api/notes/${params.id}`, {method: "GET"}).then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    setIsInvalid(true)
                } else {
                    setIsInvalid(false)
                    setFormData({
                        title: data.notes.title,
                        content: data.notes.content
                    })
                }
            })

        })()
    }, []);


    return (<>
            {isInvalid ? <>
                    <section
                        className={'flex flex-col justify-center items-center min-h-screen gap-10'}>
                        <h1 className={"text-red-600 font-bold text-5xl"}>
                            Invalid Note
                        </h1>
                        <Link href={"/notes"}
                              className={"bg-indigo-500 p-4 text-white rounded hover:bg-indigo-700 transition-all duration-500 hover:shadow-modern"}>
                            Go to Notes
                        </Link>
                    </section>

                </>
                : (
                    <main className={"container mx-auto p-4"}>
                        <h1 className={"text-3xl font-bold"}>Update Note</h1>
                        <form onSubmit={handleUpdateNote} className={"mt-4"}>
                            <div className={"mb-4"}>
                                <label htmlFor={"title"}
                                       className={"block text-sm font-medium text-gray-700"}>Title</label>
                                <input
                                    type={"text"}
                                    id={"title"}
                                    name={"title"}
                                    onChange={handleChange}
                                    value={formData.title}
                                    className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}/>
                            </div>
                            <div className={"mb-4"}>
                                <label htmlFor={"content"}
                                       className={"block text-sm font-medium text-gray-700"}>Content</label>
                                <textarea
                                    id={"content"}
                                    name={"content"}
                                    rows={3}
                                    onChange={handleChange}
                                    value={formData.content}
                                    className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}/>
                            </div>
                            <button type={"submit"}
                                    className={"inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}>
                                {
                                    loader ? "Updating..." : "Update"
                                }
                            </button>
                        </form>
                    </main>)
            }
        </>
    )
}

export default UpdateNotePage;