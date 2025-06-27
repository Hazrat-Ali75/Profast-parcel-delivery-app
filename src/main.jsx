import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AuthProvider from './provider/AuthProvider.jsx'
const queryClient = new QueryClient
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-gray-100 font-font-def'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
)
