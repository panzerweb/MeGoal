import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
// import { GoalsContextProvider } from './context/GoalsContext.jsx'

// Custom theme for MUI
import { ThemeProvider } from '@mui/material'
import theme from './Theme.js'


// Wrap RouterProvider in contexts if you want to add more context

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      {/* <GoalsContextProvider> */}
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      {/* </GoalsContextProvider> */}
    </AuthContextProvider>
  </StrictMode>,
)
