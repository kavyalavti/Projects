import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import closeIcon from '../assets/CloseIcon.png';
import { useDialog } from "../DialogContext";
import { API_BASE_URL } from '../config';

const SignUp = ({ signupWindow, setSignupWindow }) => {
    const { closeLoginDialog } = useDialog();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        otp: ''
    });

    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async () => {
        if (formData.phoneNumber) {
            try {
                const response = await fetch(`${API_BASE_URL}/otp/send-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userName: formData.name,
                        phoneNumber: formData.phoneNumber,
                    }),
                });

                const data = await response.json();

                if (response.ok && data.otpStatus === 'DELIVERED') {
                    setIsOtpSent(true);
                    alert('✅ OTP sent successfully!');
                } else {
                    console.error("Failed to send OTP:", data);
                    alert(data.message || "❌ Failed to send OTP");
                }
            } catch (error) {
                console.error("Error sending OTP:", error);
                alert("⚠️ Something went wrong. Please try again.");
            }
        } else {
            alert("Please enter your phone number.");
        }
    };

    const handleVerifyOtp = async () => {
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/otp/validate-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userName: formData.name,
                    phoneNumber: formData.phoneNumber,
                    otpNumber: formData.otp,
                }),
            });

            const data = await res.json();

            if (res.ok && data.otpValidationStatus === 'SUCCESS') {
                setOtpVerified(true);
                alert("✅ OTP verified successfully!");
            } else {
                setOtpVerified(false);
                setError(data.message || "❌ Verification failed");
            }
        } catch (err) {
            setError("⚠️ Server error. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otpVerified) {
            alert("Please verify OTP first.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Registration successful!');
                navigate('/');
            } else {
                alert(data.message || '❌ Registration failed.');
            }
        } catch (err) {
            console.error("Error during registration:", err);
            alert("⚠️ Server error. Please try again.");
        }
    };

    return (
        <div className="absolute top-40 left-64 flex flex-col justify-center items-center bg-white w-[944px] h-[auto] py-10 rounded-[60px] mx-auto">
            <img src={closeIcon} className="absolute top-[49.22px] right-[63.12px] cursor-pointer" onClick={closeLoginDialog} />

            <h1 className="text-[24px] leading-[32.68px] font-semibold text-[#041B4A] mb-4">
                Sign up to manage fundraisers, donations & more
            </h1>

            <form onSubmit={handleSubmit} className="w-[577px] space-y-4">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
                    className="w-full h-[44px] border-b-[2.5px] border-[#0D42CA] bg-[#DFE9FF] pl-[13px]" required />

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                    className="w-full h-[44px] border-b-[2.5px] border-[#0D42CA] bg-[#DFE9FF] pl-[13px]" required />

                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                    className="w-full h-[44px] border-b-[2.5px] border-[#0D42CA] bg-[#DFE9FF] pl-[13px]" required />

                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange}
                    className="w-full h-[44px] border-b-[2.5px] border-[#0D42CA] bg-[#DFE9FF] pl-[13px]" required />

                <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange}
                    className="w-full h-[44px] border-b-[2.5px] border-[#0D42CA] bg-[#DFE9FF] pl-[13px]" required />

                {isOtpSent && !otpVerified && (
                    <>
                        <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange}
                            className="w-full h-[44px] border-b-[2.5px] border-[#0D42CA] bg-[#DFE9FF] pl-[13px]" required />

                        <button type="button" onClick={handleVerifyOtp}
                            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                            Verify OTP
                        </button>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    </>
                )}

                {!isOtpSent && (
                    <button type="button" onClick={handleSendOtp}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Send OTP
                    </button>
                )}

                <button type="submit" className="w-full bg-[#3D9580] text-white py-2 rounded hover:bg-[#2b6d5f]">
                    Register
                </button>
            </form>

            <p className="text-[18px] text-center font-semibold mt-6">
                Already signed up with Sahayak?{' '}
                <span className="text-[#F44545] cursor-pointer" onClick={() => setSignupWindow(!signupWindow)}>
                    Log in
                </span>
            </p>
        </div>
    );
};

export default SignUp;
