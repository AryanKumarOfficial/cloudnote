// Import necessary modules and components
"use client";
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import styles from '../styles/Login.module.css';
import toast from 'react-hot-toast';
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

// Define types for state
interface FormState {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const router: AppRouterInstance = useRouter();
    const [form, setForm] = useState<FormState>({
        email: '',
        password: ''
    });

    useEffect(() => {
        document.title = 'Login | CloudNote';
    }, []);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const req: Response = await fetch("/login/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            const res = await req.json();
            const {token} = res;
            if (token) {
                // Set cookie with token
                document.cookie = `token=${token}; path=/; expires=${new Date(Date.now() + 259200000).toUTCString()};`
                toast.success(res.message, {
                    duration: 3000,
                });
                // Redirect to home page after successful login
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            } else {
                // Handle error scenario
                toast.error(res.error, {
                    duration: 3000,
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Failed to login. Please try again later.', {
                duration: 3000,
            });
        }
        // Reset form fields after submission
        setForm({
            email: '',
            password: ''
        });
    };

    return (
        <main className='min-h-screen flex justify-center items-center' style={{background: '#edf2f7'}}>
            <div className='w-96 p-6 bg-white rounded-lg shadow-lg'>
                <h1 className='text-3xl font-semibold text-center'>Login</h1>
                <form className='space-y-4 mt-6' onSubmit={handleSubmit}>
                    <div className='space-y-1'>
                        <label htmlFor='email' className='text-sm font-medium'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className='w-full p-2 border border-gray-300 rounded-md'
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor='password' className='text-sm font-medium'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='w-full p-2 border border-gray-300 rounded-md'
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-end items-center'>
                        <Link href='/forget' className={`text-sm text-right text-blue-600 ${styles.link}`}>
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        type='submit'
                        className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-300'
                    >
                        Login
                    </button>
                    <div className='flex justify-center items-center space-x-2'>
                        <span>Don't have an account?</span>
                        <Link href='/register' className={`text-blue-600 ${styles.link}`}>Register
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
        ;
};

export default Login;
