import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    LayoutDashboard,
    ShoppingBag,
    FileEdit,
    Wallet,
    MessageSquare,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="w-60 h-full bg-[#0f172a] border-r border-gray-800 flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#14b8a6] flex items-center justify-center">
                    <img
                        src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <nav className="flex-1 py-6 px-3">
                <ul className="space-y-1">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <Home size={20} />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/my-orders"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <ShoppingBag size={20} />
                            <span>My Orders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/create-order"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <FileEdit size={20} />
                            <span>Create Order</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/wallet"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <Wallet size={20} />
                            <span>Wallet</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/messages"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <div className="relative">
                                <MessageSquare size={20} />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                    0
                                </span>
                            </div>
                            <span>Messages</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="p-3 mt-auto">
                <button className="nav-link w-full justify-start">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
