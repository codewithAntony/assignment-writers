import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    LayoutDashboard,
    Wallet,
    ShoppingCart,
    PlusSquare,
    MessageSquare,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const links = [
        { icon: Home, text: 'Home', path: '/' },
        { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
        { icon: Wallet, text: 'Wallet', path: '/wallet' },
        { icon: ShoppingCart, text: 'My Orders', path: '/orders' },
        { icon: PlusSquare, text: 'Create Order', path: '/orders/create' },
        { icon: MessageSquare, text: 'Messages', path: '/messages' }
    ];

    return (
        <div className="w-64 min-h-screen bg-[#0f172A] p-4 flex flex-col">
            <div className="mb-8">
                <img src="/placeholder.svg" alt="Logo" className="h-12" />
            </div>
            <nav className="flex-1 space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
                    >
                        <link.icon size={20} />
                        <span>{link.text}</span>
                    </Link>
                ))}
            </nav>
            <button className="sidebar-link mt-auto">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;
