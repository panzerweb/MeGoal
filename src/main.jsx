import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <h1 className='text-center font-semibold italic'>
      <span className='text-yellow-500'>Me</span>
      <span className='text-green-500'>Goal</span>
    </h1>
    <p className='text-center text-gray-300'>List your goals, move your life</p>

    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
    
  </StrictMode>,
)
