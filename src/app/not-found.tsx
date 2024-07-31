// pages/404.tsx
import Link from 'next/link'
import {FC} from 'react'

const Custom404: FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Go Home
            </Link>
        </div>
    )
}

export default Custom404
