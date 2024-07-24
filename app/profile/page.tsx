"use client"
import React, {useEffect} from 'react'

const Profile: React.FC = () => {
    useEffect(() => {
        document.title = "Profile | CloudNote"
    }, [])

    return (
        <main className='min-h-screen flex justify-center items-center'>Profile</main>
    )
}

export default Profile