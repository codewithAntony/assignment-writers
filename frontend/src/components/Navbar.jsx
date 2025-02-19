import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleSignupClick = () => {
        navigate('/signup')
    }

    return (
        <div className="bg-[#28251F]">
            <div className="mx-auto max-w-6xl">
                <div className="flex justify-between items-center p-4">
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

                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:flex gap-8">
                        <Link to="/" smooth>
                            <span className="text-white text-lg hover:text-[#FAA41A]">
                                Home
                            </span>
                        </Link>
                        <Link to="/" smooth>
                            <span className="text-white text-lg hover:text-[#FAA41A]">
                                Services
                            </span>
                        </Link>
                        <Link to="/" smooth>
                            <span className="text-white text-lg hover:text-[#FAA41A]">
                                About Us
                            </span>
                        </Link>
                        <Link to="/" smooth>
                            <span className="text-white text-lg hover:text-[#FAA41A]">
                                Contacts
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex gap-3">
                        <button
                            className="text-white border border-white rounded-lg px-5 py-2"
                            onClick={handleLoginClick}
                        >
                            Log In
                        </button>
                        <button className="text-white border border-white rounded-lg px-5 py-2">
                            Sign Up
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden p-4">
                        <div className="flex flex-col gap-4">
                            <Link to="/" smooth>
                                <span className="text-white text-lg hover:text-[#FAA41A]">
                                    Home
                                </span>
                            </Link>
                            <Link to="/" smooth>
                                <span className="text-white text-lg hover:text-[#FAA41A]">
                                    Services
                                </span>
                            </Link>
                            <Link to="/" smooth>
                                <span className="text-white text-lg hover:text-[#FAA41A]">
                                    About Us
                                </span>
                            </Link>
                            <Link to="/" smooth>
                                <span className="text-white text-lg hover:text-[#FAA41A]">
                                    Contacts
                                </span>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3 mt-4">
                            <button
                                className="text-white"
                                onClick={handleLoginClick}
                            >
                                Log In
                            </button>
                            <button className="text-white"
                            onClick={handleSignupClick}>Sign Up</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
