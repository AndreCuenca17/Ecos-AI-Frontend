import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './pages/Login'
import Paciente from './pages/Paciente'
import Cuidador from './pages/Cuidador'
import './styles/index.css'
import RequireAuth from "./components/RequireAuth"
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/paciente", element: <RequireAuth><Paciente /></RequireAuth> },
  { path: "/cuidador", element: <RequireAuth><Cuidador /></RequireAuth> },
],
  {
    basename: import.meta.env.BASE_URL,
  })

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)