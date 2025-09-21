import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './pages/Login'
import Paciente from './pages/Paciente'
import Cuidador from './pages/Cuidador'
import './styles/index.css'
const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/paciente', element: <Paciente /> },
  { path: '/cuidador', element: <Cuidador /> },
])

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)