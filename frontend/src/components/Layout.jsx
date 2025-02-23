import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    Square3Stack3DIcon,
    WalletIcon,
    ShoppingCartIcon,
    DocumentPlusIcon,
    EnvelopeIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

function Layout() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = [
        { path: '/', icon: HomeIcon, label: 'Home' },
        { path: '/dashboard', icon: Square3Stack3DIcon, label: 'Dashboard' },
        { path: '/dashboard/wallet', icon: WalletIcon, label: 'Wallet' },
        {
            path: '/dashboard/my-orders',
            icon: ShoppingCartIcon,
            label: 'My Orders'
        },
        {
            path: '/dashboard/create-order',
            icon: DocumentPlusIcon,
            label: 'Create Order'
        },
        {
            path: '/dashboard/messages',
            icon: EnvelopeIcon,
            label: 'Messages',
            badge: '0'
        }
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
        fixed top-0 left-0 z-30 w-64 h-screen bg-gray-900 transform transition-transform duration-200 ease-in-out overflow-y-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:fixed
      `}
            >
                <div className="h-full flex flex-col p-4">
                    <div className="flex items-center justify-between mb-8">
                        <button
                            className="text-gray-400 hover:text-white lg:hidden"
                            onClick={toggleSidebar}
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="space-y-2 flex-grow">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                                    isActive(item.path)
                                        ? 'bg-emerald-500 text-white'
                                        : 'text-gray-400 hover:bg-gray-800'
                                }`}
                            >
                                <item.icon className="h-6 w-6" />
                                <span>{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    <button
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-800 rounded-lg mt-auto"
                        onClick={handleLogout}
                    >
                        <ArrowRightOnRectangleIcon className="h-6 w-6" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
                    <div className="flex justify-between items-center p-4">
                        <button
                            className="text-gray-400 hover:text-white lg:hidden"
                            onClick={toggleSidebar}
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <Link to="/" smooth>
                                    <img
                                        src="/images/Logo.png"
                                        alt="Logo"
                                        width="70"
                                        height="40"
                                    />
                                </Link>
                                <div className="flex gap-2 items-center ml-2">
                                    <span className="text-[#FAA41A] sm:text-lg">
                                        Assignment
                                    </span>
                                    <span className="text-[#A6A8AB] sm:text-lg">
                                        Writers
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
