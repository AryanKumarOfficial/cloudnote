import React, { useState } from 'react';
import styles from '@/styles/Add.module.css'
const Add = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        attachmentType: '',
        user: '',
    });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('attachmentType', formData.attachmentType);
        data.append('user', formData.user);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: data,
        });

        const result = await res.json();
        if (result.success) {
            setMessage('File uploaded successfully');
            setFormData({
                title: '',
                content: '',
                attachmentType: '',
                user: '',
            });
            setFile(null);
        } else {
            setMessage('Error uploading file: ' + result.message);
        }
    };

    return (
        <main className='min-h-screen flex justify-center items-center'>
            {/* card */}
            <div className={`${styles.card}`}>
                <h1>Upload Note with Attachment</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="attachmentType">Attachment Type</label>
                        <input
                            type="text"
                            id="attachmentType"
                            name="attachmentType"
                            value={formData.attachmentType}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="user">User</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <button type="submit">Upload</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </main>
    );
}

export default Add;
