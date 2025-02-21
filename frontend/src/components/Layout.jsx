import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-[#0F172A]">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
            <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
            </Suspense>
        </main>
    </div>
  )
}

export default Layout