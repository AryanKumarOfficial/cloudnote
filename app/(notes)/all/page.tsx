"use client";
import React, {useEffect, useState} from "react";

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
    const [notes, setNotes] = useState([]);

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

    return (
        <main className="flex flex-col justify-between items-center min-h-screen">
            <h1>All Notes</h1>
            <div className="flex flex-row gap-4">
                {notes.map((note: Note) => (
                    <div key={note._id} className="bg-gray-100 p-4 rounded-md">
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <p>{note.category}</p>
                        <p>{note.createdAt}</p>
                        <p>{note.attachmentType}</p>
                        <p>{note.attachment}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default AllNotes;
