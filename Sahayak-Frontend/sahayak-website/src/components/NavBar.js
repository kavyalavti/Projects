import React, { useState, useEffect } from 'react';
import './NavBar.css';
import Logo from '../assets/Logo.svg';
import Notification from '../assets/notification.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileDropdown from './Home/ProfileDropdown';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { useDialog } from '../DialogContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const NavBar = () => {
    const { openLoginDialog, openNotifDialog } = useDialog();
    const location = useLocation();
    const navigate = useNavigate();
    const [hamburgerClicked, setHamburgerClicked] = useState(false);
    const [showNavItems, setShowNavItems] = useState(false);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedUsername = localStorage.getItem('username');
        const storedToken = localStorage.getItem('token');
        if (storedUserId) setUserId(storedUserId);
        if (storedUsername) setUsername(storedUsername);
        if (storedToken) setToken(storedToken);
    }, []);

    useEffect(() => {
        if (userId && token) {
            axios.get(`${API_BASE_URL}/notifications/unread-count/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((res) => {
                setUnreadCount(res.data.count || 0);
            })
            .catch((err) => {
                console.error("Error fetching unread count", err);
            });
        }
    }, [userId, token]);

    const matchRoute = (route) => location.pathname.includes(route);

    return (
        <div>
            <nav className='navbar'>
                {/* logo */}
                <img src={Logo} className='logo' onClick={() => navigate("/")} alt="Sahayak Logo" />

                {/* hamburger */}
                <div className='hamburger-menu-icon-container hidden'>
                    {!hamburgerClicked ? (
                        <GiHamburgerMenu size={40} color='white' onClick={() => {
                            setHamburgerClicked(true);
                            setTimeout(() => setShowNavItems(true), 240);
                        }} />
                    ) : (
                        <IoMdClose size={40} color='white' onClick={() => {
                            setHamburgerClicked(false);
                            setShowNavItems(false);
                        }} />
                    )}
                </div>

                {/* nav links */}
                <div className='flex gap-24 justify-center items-center nav-items'>
                    <Link to='/' className={`text-[18px] font-bold leading-[24.51px] ${location.pathname === '/' ? 'text-[#9AD9FF]' : 'text-[#5E6064]'}`}>
                        Home
                    </Link>
                    <Link to='/about' className={`text-[18px] font-bold leading-[24.51px] ${matchRoute('about') ? 'text-[#9AD9FF]' : 'text-[#5E6064]'}`}>
                        About Us
                    </Link>
                    <Link to='/campaign' className={`text-[18px] font-bold leading-[24.51px] ${matchRoute('campaign') || matchRoute('raisefund') || matchRoute('profile') ? 'text-[#9AD9FF]' : 'text-[#5E6064]'}`}>
                        Campaign
                    </Link>
                    <Link className='raiseFund' to='raisefund'>
                        <p className='raiseFund-text'>Raise A Fund</p>
                    </Link>
                </div>

                {/* right section */}
                <div className='flex gap-10 justify-center items-center mt-3 nav-items-2'>
                {userId && token && (
                    <div className='relative cursor-pointer' onClick={openNotifDialog}>
                        <img
                            className={`notification transition duration-300`}
                            src={Notification}
                            alt="Notifications"
                        />
                        {unreadCount > 0 && (
                            <span className="notification-badge">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </div>
                )}


                    {userId ? (
                        <ProfileDropdown username={username} />
                    ) : (
                        <button className='login' onClick={openLoginDialog}>Log in</button>
                    )}
                </div>
            </nav>

            {/* mobile menu */}
            <div className={`w-[100vw] bg-blue-900 absolute z-20 ${!hamburgerClicked ? 'menu-before-click' : 'menu-after-click'}`}>
                <div className={`flex-col items-center justify-around h-[100%] ${showNavItems ? 'flex' : 'hidden'}`}>
                    <Link to='/' className={`text-[18px] font-bold leading-[24.51px] ${location.pathname === '/' ? 'text-[#9AD9FF]' : 'text-[#5E6064]'}`} onClick={() => setHamburgerClicked(false)}>Home</Link>
                    <Link to='/about' className={`text-[18px] font-bold leading-[24.51px] ${matchRoute('/about') ? 'text-[#9AD9FF]' : 'text-[#c9cbcf]'}`} onClick={() => setHamburgerClicked(false)}>About Us</Link>
                    <Link to='/campaign' className={`text-[18px] font-bold leading-[24.51px] ${matchRoute('/campaign') ? 'text-[#9AD9FF]' : 'text-[#d2d3d6]'}`} onClick={() => setHamburgerClicked(false)}>Campaign</Link>

                    <Link to='raisefund' className='raiseFund' onClick={() => setHamburgerClicked(false)}>
                        <p className='raiseFund-text'>Raise A Fund</p>
                    </Link>

                    {userId ? (
                        <ProfileDropdown username={username} />
                    ) : (
                        <>
                            <button className='login' onClick={() => {
                                openLoginDialog();
                                setHamburgerClicked(false);
                            }}>Log in</button>
                            <button className='login mb-[20px]'>Sign Up</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
