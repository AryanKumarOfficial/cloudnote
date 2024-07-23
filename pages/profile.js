import React, { useEffect } from 'react'

const Profile = () => {
    useEffect(() => {
        document.title = "Profile | CloudNote"
    }, [])

    return (
        <main className='min-h-screen flex justify-center items-center'>Profile</main>
    )
}

export default Profile