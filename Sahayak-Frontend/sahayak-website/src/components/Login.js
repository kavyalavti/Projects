import React, { useState } from "react";
import logo from '../assets/loginLogo.svg';
import closeIcon from '../assets/CloseIcon.png';
import { Link } from "react-router-dom";
import facebook from '../assets/fb-gradient.svg';
import google from '../assets/google.svg';
import apple from '../assets/apple.svg';
import { useDialog } from "../DialogContext";
import SignUp from '../components/SignUp';
import { API_BASE_URL } from '../config';

const Login = ({ onLoginSuccess }) => {
    const { closeLoginDialog } = useDialog();
    const [signupWindow, setSignupWindow] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!userName || !password) {
            alert('Please enter both email and password');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('username', data.username || userName); // Store username

                if (onLoginSuccess) {
                    onLoginSuccess(data.userId, data.username || userName); // Pass username to parent
                }

                
                closeLoginDialog();

                // Reload to reflect state in UI (e.g., HeroSection updates)
                window.location.reload();
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!signupWindow ? (
                <div className="absolute top-24 left-64 flex flex-col justify-center items-center bg-white w-[944px] h-[845px] rounded-[60px] mx-auto">
                    <img src={closeIcon} className="absolute top-[62px] right-[76.25px] cursor-pointer" onClick={closeLoginDialog} />
                    <img src={logo} className="w-[265px] h-[61px]" />

                    <h1 className="text-[28px] font-semibold mt-[30px] text-[#041B4A]">
                        Welcome To Sahayak
                    </h1>

                    <form onSubmit={handleLogin} className="mt-[37px] w-[577px]">
                        <input
                            type="text"
                            placeholder="Mail Id / Mobile No"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full h-[44px] border-b-[2.5px] border-[#0D42CA] bg-[#DFE9FF] pl-[13px] font-semibold text-[16px] text-[#686868] focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-[26px] w-full h-[44px] border-b-[2.5px] border-[#0D42CA] bg-[#DFE9FF] pl-[13px] font-semibold text-[16px] text-[#686868] focus:outline-none"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-[254px] h-[37px] rounded-[20px] text-center ${loading ? 'bg-gray-400' : 'bg-[#3D9580]'} text-white font-semibold text-[18px] mx-auto block mt-[37px]`}
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>

                        <Link>
                            <p className="text-[#F44545] text-[16px] text-center font-semibold mt-[30px]">
                                Forgot Password ?
                            </p>
                        </Link>
                    </form>

                    <p className="font-semibold text-[18px] text-[#2B2B2C] text-center mt-[30px]">Or</p>

                    <div className="flex justify-center gap-[48px] mt-[22px]">
                        <img src={facebook} className="w-[40px] h-[40px]" />
                        <img src={google} className="w-[40px] h-[40px]" />
                        <img src={apple} className="w-[40px] h-[40px]" />
                    </div>

                    <p className="text-[18px] text-center font-semibold mt-[53px]">
                        Don't have an account?{' '}
                        <span className="text-[#F44545] cursor-pointer" onClick={() => setSignupWindow(true)}>
                            Sign Up
                        </span>
                    </p>
                </div>
            ) : (
                <SignUp
                    signupWindow={signupWindow}
                    setSignupWindow={setSignupWindow}
                />
            )}
        </>
    );
};

export default Login;