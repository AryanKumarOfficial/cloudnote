import Link from 'next/link'
import React, { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    document.title = "Home | CloudNote"
  }, [])

  return (
    <main className='min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-semibold font-mono'>
        Welcome to Cloud Note
      </h1>
      <Link
        href='/notes/add'
        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-lg cursor-pointer hover:animate-pulse active:animate-ping transition duration-300 ease-in-out'
      >
        Go to Notes
      </Link>
    </main>
  )
}

export default Home