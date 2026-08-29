import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from 'lucide-react'; // You can install 'lucide-react' for better icons
import ProfileIcon from '../../assets/ProfileIcon.svg';

const ProfileDropdown = ({ username }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setIsOpen(false);
        window.location.href = '/';
    };

    return (
        <div className="relative inline-block text-left">
            <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img
                    src={ProfileIcon}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-white shadow-md group-hover:opacity-90 transition"
                />
                <div className="flex items-center space-x-1">
                    <span className="text-white font-semibold capitalize">{username}</span>
                    <ChevronDownIcon
                        size={20}
                        className={`text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden z-50 animate-fade-in-up">
                    <Link
                        to="/profile"
                        className="block px-5 py-3 text-gray-700 text-sm hover:bg-gray-100 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        👤 My Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 text-gray-700 text-sm hover:bg-gray-100 transition"
                    >
                        🚪 Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
