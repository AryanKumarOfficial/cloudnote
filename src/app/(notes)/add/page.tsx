import React from "react";

const AddNotePage: React.FC = () => {
    return <main className={
        "container mx-auto p-4"
    }>
        <h1 className={
            "text-3xl font-bold"
        }>Add Note</h1>
        <form className={
            "mt-4"
        }>
            <div className={
                "mb-4"
            }>
                <label htmlFor={
                    "title"
                } className={
                    "block text-sm font-medium text-gray-700"
                }>Title</label>
                <input type={
                    "text"
                } id={
                    "title"
                } name={
                    "title"
                } className={
                    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                }/>
            </div>
            <div className={
                "mb-4"
            }>
                <label htmlFor={
                    "content"
                } className={
                    "block text-sm font-medium text-gray-700"
                }>Content</label>
                <textarea id={
                    "content"
                } name={
                    "content"
                } rows={
                    3
                } className={
                    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                }></textarea>
            </div>
            <button type={
                "submit"
            } className={
                "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }>Submit
            </button>
        </form>
    </main>;
}

export default AddNotePage;