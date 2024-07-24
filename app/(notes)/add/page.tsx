"use client";
import React, {useState} from "react";
import styles from "@/app/styles/Add.module.css";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

const AddNote: React.FC = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        category: "personal",
        content: "",
        attachmentType: "none",
        image: null,
        hours: "",
        minutes: "",
        seconds: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value, type} = e.target;

        if (type === "file" && e.target instanceof HTMLInputElement && e.target.files) {
            setForm({
                ...form,
                [name]: e.target.files[0]
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('category', form.category);
        formData.append('content', form.content);
        formData.append('attachmentType', form.attachmentType);

        if (form.attachmentType === "image" && form.image) {
            formData.append('file', form.image);
        } else if (form.attachmentType === "time") {
            formData.append('hours', form.hours);
            formData.append('minutes', form.minutes);
            formData.append('seconds', form.seconds);
        }

        const response = await fetch('/add/api', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Handle successful response
            toast.success('Note added successfully', {duration: 3000});
            setForm({
                title: "",
                category: "personal",
                content: "",
                attachmentType: "none",
                image: null,
                hours: "",
                minutes: "",
                seconds: ""
            });
            setTimeout(() => {
                router.push('/all');
            }, 3000);
        } else {
            // Handle error response
            toast.error('Failed to add note', {duration: 3000});
        }
    };

    return (
        <main className={styles.main}>
            <h1>Add Note</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} type="text" name="title" id="title" value={form.title}/>

                <label htmlFor="category">Category</label>
                <select onChange={handleChange} name="category" id="category" value={form.category}>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="content">Content</label>
                <textarea onChange={handleChange} name="content" id="content" value={form.content}></textarea>

                <label htmlFor="attachmentType">Attachment Type</label>
                <select onChange={handleChange} name="attachmentType" id="attachmentType" value={form.attachmentType}>
                    <option value="none">Select an attachment Type</option>
                    <option value="image">Image</option>
                    <option value="time">Time</option>
                </select>

                {form.attachmentType === "image" && (
                    <>
                        <input accept="image/*" onChange={handleChange} type="file" name="image" id="image"/>
                        <label htmlFor="image">Image</label>
                        {form.image && (
                            <label htmlFor="image">
                                <img className={
                                    styles.image
                                } src={URL.createObjectURL(form.image)} alt="Preview"/>
                            </label>
                        )}
                    </>
                )}

                {form.attachmentType === "time" && (
                    <div>
                        <div className={styles.time}>
                            <input onChange={handleChange} type="number" name="hours" id="hours" value={form.hours}
                                   placeholder="00"/>
                            <span>:</span>
                            <input onChange={handleChange} type="number" name="minutes" id="minutes"
                                   value={form.minutes} placeholder="00"/>
                            <span>:</span>
                            <input onChange={handleChange} type="number" name="seconds" id="seconds"
                                   value={form.seconds} placeholder="00"/>
                        </div>
                        {(form.hours || form.minutes || form.seconds) && (
                            <p>{`${form.hours || 0} Hours, ${form.minutes || 0} Minutes, and ${form.seconds || 0} seconds`}</p>
                        )}
                    </div>
                )}

                <button type="submit">Add Note</button>
            </form>
        </main>
    );
};

export default AddNote;
