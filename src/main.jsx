import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'

import AuthProvider from './context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { router } from './router/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
        <Toaster position="top-right" />
     <RouterProvider router={router}>
 
    </RouterProvider>
 </AuthProvider>
  </StrictMode>,
)
