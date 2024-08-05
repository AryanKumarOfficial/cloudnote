"use client";
import React, {useEffect} from "react";
import toast from "react-hot-toast";
import {INote} from "@/models/Note";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function AllNotesPage() {
    const router = useRouter();
    const [notes, setNotes] = React.useState([]);
    const fetchNotes = async () => {
        const res = await fetch("/api/notes")
        const data = await res.json();
        console.log(data.notes)
        if (!res.ok) {
            return;
        }
        return data.notes;
    }
    useEffect(() => {
        fetchNotes().then((r) => {
            console.log("Note fetched!")
            setNotes(r);
        })
    }, [notes]);

    const deleteNote = async (noteId: string) => {
        try {
            const res = await fetch(`/api/notes/delete/${noteId}`, {
                method: "DELETE"
            })
            if (res.ok) {
                notes.filter((item: INote) => item.id !== noteId);
                toast.success("Note Deleted Successfully");
            } else {
                toast.error("Error Deleting Note")
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.message)
        }
    }
    return (


        <main className={"flex flex-col justify-center items-center min-h-screen gap-10"}>
            {notes.length === 0 && <h1 className={"text-2xl font-semibold text-center"}>Loading...</h1>}
            {notes.length > 0 && <>
                <h1 className={"text-4xl font-bold text-center"}>All Notes</h1>
                <section className={"flex flex-row justify-center items-center flex-wrap"}>
                    {notes.map((item: INote, index) => {
                        return (
                            <div key={index}
                                 className={"flex flex-col justify-evenly bg-[#f9f9f9] min-w-96 min-h-52 p-4 rounded-md gap-4"}
                                 style={{
                                     boxShadow: "12px 12px 12px rgba(0,0,0,0.1), -10px -10px 10px white"
                                 }}
                            >
                                <h2 className={"text-2xl font-semibold"}>{item.title}</h2>
                                <p className={"text-lg text-justify"}>
                                    {item.content}
                                </p>
                                <div className={"flex justify-between items-center gap-4"}>
                                    <button
                                        onClick={() => router.push(`/notes/update/${item._id.toString()}`)}
                                        className={"bg-blue-500 text-white  w-full border-none p-2 rounded-md hover:bg-blue-700 transition-all duration-300"}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteNote(item._id.toString())}
                                        className={"bg-red-500 text-white w-full border-none p-2 rounded-md transition-all duration-300 hover:bg-red-700"}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                </section>
                <Link href={"/notes/add"} id={"add-note"}
                      className={"bg-indigo-500 p-4 rounded text-white hover:bg-indigo-700 shadow-md hover:shadow-modern transition-all duration-500 font-bold"}>Add
                    Note</Link>
            </>
            }
        </main>
    )
}