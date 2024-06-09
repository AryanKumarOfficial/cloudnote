import React, { useEffect, useMemo } from 'react'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { TiThMenu } from 'react-icons/ti'
import { GrClose } from 'react-icons/gr'
import { useRouter } from 'next/router'
const Navbar = () => {
    const router = useRouter()
    const token = useMemo(() => {
        if (typeof window !== 'undefined') {
            return document?.cookie?.split(';')?.find(c => c?.trim()?.startsWith('token='))?.split('=')[1] ?? null
        }
    }, [router])
    useEffect(() => {
        console.log(token, 'token');
    }, [])
    const handleSideMenu = () => {
        const overlay = document.querySelector(`.${styles.overlay}`)
        console.log(overlay, 'overlay');
        overlay.classList.toggle(`${styles.active}`)
    }

    const handleLogout = (e) => {
        e.preventDefault();
        console.log('logout');
        // remove token from cookies
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // redirect to login page
        router.push('/login')
    }
    return (
        <header className={`shadow-md w-screen ${styles.header}`}>
            <TiThMenu onClick={handleSideMenu} className={`text-2xl cursor-pointer ${styles.icon}`} />
            <div className={`${styles.overlay}`}>
                <GrClose onClick={handleSideMenu} className={`text-2xl cursor-pointer ${styles.close}`} />
                <Link onClick={handleSideMenu} href='/' className='p-4'>Home</Link>
                <Link onClick={handleSideMenu} href='/about' className='p-4'>About</Link>
                <Link onClick={handleSideMenu} href='/services' className='p-4'>Services</Link>
                <Link onClick={handleSideMenu} href='/contact' className='p-4'>Contact</Link>
            </div>
            <nav className='container flex flex-row  justify-between items-center flex-wrap py-4'>
                <Link href={'/'} className={`text-4xl font-bold ${styles.logo}`}>Cloud Note</Link>
                <div className={`${styles.links}`}>
                    <Link href='/' className='p-4 text-xl font-semibold'>Home</Link>
                    <Link href='/about' className='p-4 text-xl font-semibold'>About</Link>
                    <Link href='/services' className='p-4 text-xl font-semibold'>Services</Link>
                    <Link href='/contact' className='p-4 text-xl font-semibold'>Contact</Link>
                    {token ? <>
                        <Link href='/profile' className='p-4 text-xl font-semibold'>Profile</Link>
                        <button onClick={handleLogout} className='p-4 text-2xl font-semibold'>Logout</button>
                    </>
                        :
                        <>
                            <Link href='/register' className='p-4 text-xl font-semibold'>Reister</Link>
                            <Link href='/login' className='p-4 text-xl font-semibold'>Login</Link>
                        </>
                    }

                </div>
            </nav>
        </header>
    )
}

export default Navbar