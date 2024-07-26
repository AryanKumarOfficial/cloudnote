"use client";
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import {TiThMenu} from 'react-icons/ti';
import {GrClose} from 'react-icons/gr';
import toast from 'react-hot-toast';
import {usePathname, useRouter} from "next/navigation";

const Navbar: React.FC = () => {
    const pathname: string = usePathname();
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] ?? null;
        setToken(token);
    }, [pathname]);

    const handleSideMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        toast.success('Logged out successfully', {duration: 4000});
        setTimeout(() => {
            router.push('/login');
        }, 3000);
    };

    const commonLinks = [
        {href: '/', label: 'Home'},
        {href: '/about', label: 'About'},
        {href: '/contact', label: 'Contact'},
    ];

    const privateLinks = [
        {href: '/all', label: 'Notes'},
        {href: '/profile', label: 'Profile'},
    ];

    const publicLinks = [
        {href: '/register', label: 'Register'},
        {href: '/login', label: 'Login'},
    ];

    return (
        <header className={`container shadow-md w-screen z-50 ${styles.header}`}>
            <TiThMenu
                onClick={handleSideMenu}
                className={`text-2xl cursor-pointer ${styles.icon}`}
                aria-label="Open menu"
            />
            <div className={`${isMenuOpen ? styles.active : ''} ${styles.overlay}`}>
                <GrClose
                    onClick={handleSideMenu}
                    className={`text-2xl cursor-pointer ${styles.close}`}
                    aria-label="Close menu"
                />
                {commonLinks.map(({href, label}) => (
                    <Link onClick={handleSideMenu} href={href} key={href} className='p-4'>{label}</Link>
                ))}
                {token ? (
                    <>
                        {privateLinks.map(({href, label}) => (
                            <Link onClick={handleSideMenu} href={href} key={href} className='p-4'>{label}</Link>
                        ))}
                        <button
                            onClick={(e) => {
                                handleLogout(e);
                                handleSideMenu();
                            }}
                            className='p-4 text-4xl'
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        {publicLinks.map(({href, label}) => (
                            <Link onClick={handleSideMenu} href={href} key={href} className='p-4'>{label}</Link>
                        ))}
                    </>
                )}
            </div>
            <nav className='container flex flex-row justify-between items-center flex-wrap py-4'>
                <Link href='/' className={`text-4xl font-bold ${styles.logo}`}>Cloud Note</Link>
                <div className={`${styles.links}`}>
                    {commonLinks.map(({href, label}) => (
                        <Link href={href} key={href} className='p-4 text-xl font-semibold'>{label}</Link>
                    ))}
                    {token ? (
                        <>
                            {privateLinks.map(({href, label}) => (
                                <Link href={href} key={href} className='p-4 text-xl font-semibold'>{label}</Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className='p-4 text-2xl font-semibold'
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {publicLinks.map(({href, label}) => (
                                <Link href={href} key={href} className='p-4 text-xl font-semibold'>{label}</Link>
                            ))}
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
