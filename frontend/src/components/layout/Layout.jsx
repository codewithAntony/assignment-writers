import { Outdent, Sidebar } from 'lucide-react';
import React, { useState } from 'react';
import Header from './Header';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-[#0f172a] text-white">
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={toggleSidebar}
                    ></div>
                    <div className="fixed inset-y-0 left-0 z-50 w-60 bg-[#0f172a]">
                        <Sidebar />
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-y-auto bg-[#0f172a]">
                    <Outdent />
                </main>
            </div>
        </div>
    );
};

export default Layout;
