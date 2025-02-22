import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    Square3Stack3DIcon,
    WalletIcon,
    ShoppingCartIcon,
    DocumentPlusIcon,
    EnvelopeIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    InformationCircleIcon,
    MoonIcon
} from '@heroicons/react/24/outline';

function Layout() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: '/', icon: HomeIcon, label: 'Home' },
        { path: '/dashboard', icon: Square3Stack3DIcon, label: 'Dashboard' },
        { path: '/dashboard/wallet', icon: WalletIcon, label: 'Wallet' },
        { path: '/dashboard/my-orders', icon: ShoppingCartIcon, label: 'My Orders' },
        {
            path: '/dashboard/create-order',
            icon: DocumentPlusIcon,
            label: 'Create Order'
        },
        { path: '/dashboard/messages', icon: EnvelopeIcon, label: 'Messages', badge: '0' }
    ];


    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="flex">
                <aside className="w-64 bg-gray-900 min-h-screen p-4">
                    <div className="flex items-center justify-between mb-8">
                        <img src="/logo.png" alt="Logo" className="h-8" />
                        <button className="text-gray-400 hover:text-white">
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path + item.label}
                                to={item.path}
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

                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-800 rounded-lg">
                            <ArrowRightOnRectangleIcon className="h-6 w-6" />
                            <span>Logout</span>
                        </button>
                    </nav>
                </aside>

                <main className="flex-1 p-8">
                    <div className="flex justify-end items-center space-x-4 mb-8">
                        <button className="text-gray-400 hover:text-white">
                            <InformationCircleIcon className="h-6 w-6" />
                        </button>
                        <button className="text-gray-400 hover:text-white">
                            <MoonIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
