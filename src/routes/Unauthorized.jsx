import React from 'react'
import { Link } from 'react-router-dom'

export const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 shadow-lg rounded-2xl max-w-md">
            <h1 className="text-7xl font-bold text-red-500 mb-4">401</h1>
            <h2 className="text-2xl font-semibold text-gray-400 mb-2">Unauthorized</h2>
            <p className="text-gray-500 mb-6">
            You don’t have permission to access this page.
            </p>
            <div className="flex gap-4 justify-center">
                <Link to="/signup">
                    <p className='text-green-500 hover:text-green-400 transition'>Sign Up</p>
                </Link>
                <Link to="/signin">
                    <p className='text-gray-500 hover:text-gray-400 transition'>Sign In</p>
                </Link>
            </div>
        </div>
    </div>

  )
}
