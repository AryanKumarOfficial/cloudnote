import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Register.module.css'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const Register = () => {
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        cPassword: '',
    })
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password !== form.cPassword) {
            setError('Passwords do not match')
            return
        }
        setError('')
        const { name, email, password } = form
        const req = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        const res = await req.json()
        if (res.success) {
            toast.success(res.message, {
                duration: 3000,
            })
            setTimeout(() => {
                router.push('/login')
            }, 3000);
        }
        else {
            toast.error(res.message, {
                duration: 3000,
            })
        }
        setForm({
            name: '',
            email: '',
            password: '',
            cPassword: '',
        })
    }

    return (
        <main className='min-h-screen flex justify-center items-center'
            style={{
                background: '#edf2f7',
            }}
        >

            {/* Register card */}
            <div className='w-96 p-6 bg-white rounded-lg shadow-lg'>
                <h1 className='text-3xl font-semibold text-center'>Register</h1>
                <form
                    className='space-y-4 mt-6'
                    onSubmit={handleSubmit}
                >
                    <div className='space-y-1'>
                        <label htmlFor='name' className='text-sm font-medium'>Full Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            className='w-full p-2 border border-gray-300 rounded-md'
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
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
                    <div className='space-y-1'>
                        <label htmlFor='cpassword' className='text-sm font-medium'>Confirm Password</label>
                        <input
                            type='password'
                            id='cpassword'
                            name='cPassword'
                            className='w-full p-2 border border-gray-300 rounded-md'
                            value={form.cPassword}
                            onChange={handleChange}
                        />
                    </div>
                    {
                        error && <div className='text-red-500 text-sm'>{error}</div>
                    }
                    <button
                        type='submit'
                        className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
                        disabled={form.name === '' || form.email === '' || form.password === '' || form.cPassword === '' || form.password !== form.cPassword}
                    >
                        Register
                    </button>
                    <div className='flex justify-center items-center space-x-2'>
                        <span>
                            Already have an account?
                        </span>
                        <Link href='/login' className={`text-blue-600 ${styles.link}`}>Login</Link>
                    </div>
                </form>
            </div>
        </main >
    )
}

export default Register

export async function getServerSideProps(context) {
    const { req } = context
    const token = req.cookies.token
    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}
