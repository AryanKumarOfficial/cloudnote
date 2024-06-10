import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Login.module.css'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const Login = () => {
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const req = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        const res = await req.json()
        const { token } = res
        if (token) {
            // cookies
            document.cookie = `token=${token} path=/ expires=${new Date(Date.now() + 259200000).toUTCString()}`
            toast.success(res.message, {
                duration: 3000,
            })
        }

        console.log(res, 'response from the server');
        setForm({
            email: '',
            password: ''

        })
        setTimeout(() => {
            router.push('/')
        }, 3000);

    }


    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         router.push('/')
    //     }
    // }, [
    //     router
    // ])

    return (
        <main className='min-h-screen flex justify-center items-center'
            style={{
                background: '#edf2f7',
            }}
        >
            {/* login card */}
            <div className='w-96 p-6 bg-white rounded-lg shadow-lg'>
                <h1 className='text-3xl font-semibold text-center'>Login</h1>
                <form
                    className='space-y-4 mt-6'
                    onSubmit={handleSubmit}
                >
                    <div className='space-y-1'>
                        <label htmlFor='email' className='text-sm font-medium'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className='w-full p-2 border border-gray-300 rounded-md'
                            value={form?.email}
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
                            value={form?.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-end items-center'>
                        <Link href='/forget' className={`text-sm text-right w-fit text-blue-600 ${styles.link}`}>Forgot password?</Link>
                    </div>
                    <button type='submit' className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-300'>Login</button>
                    <div className='flex justify-center items-center space-x-2'>
                        <span>Don't have an account?</span>
                        <Link href='/register' className={`text-blue-600 ${styles.link}`}>Register</Link>
                    </div>
                </form>
            </div>
        </main >
    )
}

export default Login

export async function getServerSideProps(context) {
    const { req, res } = context
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