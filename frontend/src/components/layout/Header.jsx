import React from 'react';
import { Moon, Menu, Bell } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
    return (
        <header className="h-16 bg-[#0f172a] border-b border-gray-800 flex items-center justify-between px-4">
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-800 lg:hidden"
            >
                <Menu size={24} />
            </button>
            <div className="flex items-center space-x-4 ml-auto">
                <button className="p-2 rounded-full hover:bg-gray-800">
                    <Bell size={20} />
                </button>

                <button className="p-2 rounded-full hover:bg-gray-800">
                    <Moon size={20} />
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                    <img
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="User profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
