import React, { useEffect, useState } from 'react';
import closeIcon from '../assets/CloseIcon.png';
import profile from '../assets/profile.svg';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const EditProfile = ({ userData, setEditMode, onSave }) => {
    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        name: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userData) {
            setFormData({
                email: userData.email || '',
                name: userData.name || '',
                phoneNumber: userData.phoneNumber || '',
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `${API_BASE_URL}/users/${userId}`,
                {
                    name: formData.name, // Only allow updating name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert('Profile updated successfully!');
            onSave(response.data);
        } catch (err) {
            console.error(err);
            alert('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 md:p-12 overflow-y-auto max-h-[90vh]">
                <img
                    src={closeIcon}
                    className="absolute top-4 right-4 cursor-pointer w-6 h-6"
                    onClick={() => setEditMode(false)}
                    alt="Close"
                />

                <div className="flex flex-col items-center">
                    <img src={profile} alt="Profile" className="w-20 h-20" />
                    <h1 className='font-semibold text-xl md:text-2xl text-[#3B5998] mt-4 text-center'>
                        {userData?.name || 'Edit Profile'}
                    </h1>

                    <form onSubmit={handleSubmit} className='w-full space-y-5 mt-6'>
                        <div>
                            <label htmlFor="email" className="block text-[#0D42CA] font-medium mb-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                readOnly
                                className="bg-gray-100 w-full px-4 h-10 rounded-lg border-[2px] text-base font-medium text-gray-500 border-[#0D42CA] cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-[#0D42CA] font-medium mb-1">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-[#F3F7FF] w-full px-4 h-10 rounded-lg border-[2px] text-base font-medium text-[#686868] border-[#0D42CA] focus:outline-none focus:ring-1 focus:ring-[#0D42CA]"
                            />
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-[#0D42CA] font-medium mb-1">Mobile Number</label>
                            <input
                                id="phoneNumber"
                                type="text"
                                value={formData.phoneNumber}
                                readOnly
                                className="bg-gray-100 w-full px-4 h-10 rounded-lg border-[2px] text-base font-medium text-gray-500 border-[#0D42CA] cursor-not-allowed"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full md:w-1/2 h-12 rounded-xl font-bold text-white shadow-md mx-auto block transition duration-200
                            ${loading ? 'bg-[#6FB6A4] cursor-not-allowed' : 'bg-[#3D9580] hover:bg-[#368a73]'}`}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
