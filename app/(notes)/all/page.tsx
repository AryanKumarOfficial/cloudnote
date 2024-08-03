"use client";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import Link from "next/link";

interface Note {
    _id: number;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    attachmentType: string;
    attachment: string;
}

const AllNotes: React.FC = () => {
    const router = useRouter();
    const [notes, setNotes] = useState<Note[]>([]);

    const fetchNotes = async () => {
        try {
            const response = await fetch("/all/api", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log("Fetched notes:", data.notes);
                return data.notes;
            } else {
                console.error("Failed to fetch notes:", response.status);
                return [];
            }
        } catch (error) {
            console.error("An error occurred while fetching notes:", error);
            return [];
        }
    };

    useEffect(() => {
        fetchNotes().then((fetchedNotes) => setNotes(fetchedNotes));
    }, []);

    const deleteNote = async (id: number) => {
        try {
            const response = await fetch(`/all/api/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log("Note deleted successfully");
                const updatedNotes = notes.filter((note) => note._id !== id);
                setNotes(updatedNotes);
                toast.success("Note deleted successfully");
            } else {
                console.error("Failed to delete note:", response.status);
                toast.error("Failed to delete note");
            }
        } catch (error) {
            console.error("An error occurred while deleting note:", error);
            toast.error("An error occurred while deleting note");
        }
    }

    return (
        <main className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50">
            <h1 className="text-4xl font-bold mb-8">All Notes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {notes.length > 0 && notes.map((note: Note) => (
                    <div key={note._id}
                         className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-2">{note.title}</h2>
                        <p className="text-gray-700 mb-4">{note.content}</p>
                        <p className="text-gray-500 mb-2"><strong>Category:</strong> {note.category}</p>
                        <p className="text-gray-500 mb-2"><strong>Created
                            At:</strong> {new Date(note.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-500 mb-2"><strong>Attachment Type:</strong> {note.attachmentType}
                        </p>
                        <p className="text-gray-500"><strong>Attachment:</strong> {note.attachment}</p>
                        {note.attachmentType === "image" && (
                            <div className="w-full h-48 bg-cover bg-center mt-4"
                                 style={{backgroundImage: `url(${note.attachment})`}}/>
                        )}
                        <div className="controls mt-4 flex justify-between items-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded transition-all duration-300">
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white w-full font-bold py-2 px-4 rounded transition-all duration-300 ml-2"
                                onClick={deleteNote.bind(null, note._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {notes.length === 0 && (
                <p className="text-2xl text-center font-semibold text-gray-500">No notes found</p>
            )}
            {/*    add note button*/}
            <Link
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8 transition-all duration-300"
                href="/add"
            >
                Add Note
            </Link>
        </main>
    );
};

export default AllNotes;
