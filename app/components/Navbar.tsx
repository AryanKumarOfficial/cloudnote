"use client";
import React, {useEffect, useMemo} from 'react';
import Link from 'next/link';
import styles from '../styles/Navnar.module.css';
import {TiThMenu} from 'react-icons/ti';
import {GrClose} from 'react-icons/gr';
import toast from 'react-hot-toast';
import {redirect, useParams, usePathname, useRouter} from "next/navigation";

const Navbar: React.FC = () => {
    const pathname: string = usePathname();
    const router = useRouter();
    const token = useMemo(() => {
        if (typeof window !== 'undefined') {
            return document?.cookie?.split(';')?.find(c => c?.trim()?.startsWith('token='))?.split('=')[1] ?? null;
        }
    }, [pathname]);

    useEffect(() => {
    }, []);

    const handleSideMenu = () => {
        const overlay = document.querySelector(`.${styles.overlay}`) as HTMLElement;
        overlay.classList.toggle(`${styles.active}`);
    };

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // remove token from cookies
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // redirect to login page
        toast.success('Logged out successfully', {duration: 4000});
        setTimeout(() => {
            router.push('/login');
        }, 3000);
    };

    return (
        <header className={`container shadow-md w-screen z-50 ${styles.header}`}>
            <TiThMenu onClick={handleSideMenu} className={`text-2xl cursor-pointer ${styles.icon}`}/>
            <div className={`${styles.overlay}`}>
                <GrClose onClick={handleSideMenu} className={`text-2xl cursor-pointer ${styles.close}`}/>
                <Link onClick={handleSideMenu} href='/' className='p-4'>Home</Link>
                <Link onClick={handleSideMenu} href='/about' className='p-4'>About</Link>
                <Link onClick={handleSideMenu} href='/services' className='p-4'>Services</Link>
                <Link onClick={handleSideMenu} href='/contact' className='p-4'>Contact</Link>
                {token && <>
                    <Link onClick={handleSideMenu} href='/profile' className='p-4'>Profile</Link>
                    <button onClick={(e) => {
                        handleLogout(e);
                        handleSideMenu();
                    }} className='p-4 text-4xl'>Logout
                    </button>
                </>}
                {!token && <>
                    <Link onClick={handleSideMenu} href='/register' className='p-4'>Register</Link>
                    <Link onClick={handleSideMenu} href='/login' className='p-4'>Login</Link>
                </>}
            </div>
            <nav className='container flex flex-row justify-between items-center flex-wrap py-4'>
                <Link href={'/'} className={`text-4xl font-bold ${styles.logo}`}>Cloud Note</Link>
                <div className={`${styles.links}`}>
                    <Link href='/' className='p-4 text-xl font-semibold'>Home</Link>
                    <Link href='/about' className='p-4 text-xl font-semibold'>About</Link>
                    <Link href='/services' className='p-4 text-xl font-semibold'>Services</Link>
                    <Link href='/contact' className='p-4 text-xl font-semibold'>Contact</Link>
                    {token && <>
                        <Link href='/profile' className='p-4 text-xl font-semibold'>Profile</Link>
                        <button onClick={handleLogout} className='p-4 text-2xl font-semibold'>Logout</button>
                    </>}
                    {!token && <>
                        <Link href='/register' className='p-4 text-xl font-semibold'>Register</Link>
                        <Link href='/login' className='p-4 text-xl font-semibold'>Login</Link>
                    </>}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
