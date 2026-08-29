import React from 'react';
import profile from '../assets/profile.svg';

const ProfileDetails = ({ user, onEdit }) => {
    return (
        <div className='flex flex-col lg:flex-row bg-white justify-center items-center px-4 py-[40px] gap-12 lg:gap-24'>

            {/* Left Side: Profile Picture and Name */}
            <div className='flex flex-col items-center gap-4 w-full lg:w-auto'>
                <img src={profile} className='w-[180px] md:w-[240px] lg:w-[300px]' alt="Profile" />

                <div className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-[#0D42CA] text-center">
                    {user.name || "No Name Provided"}
                </div>

                <button
                    className="bg-[#3D9580] text-white shadow-custom-light text-[18px] md:text-[20px] lg:text-[24px] font-semibold rounded-[10px] w-[160px] md:w-[180px] lg:w-[192px] h-[44px] md:h-[48px] lg:h-[53px]"
                    onClick={onEdit}
                >
                    Edit Profile
                </button>
            </div>

            {/* Right Side: User Details */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 md:gap-x-10 md:gap-y-10 w-full lg:w-auto max-w-4xl'>

                {/* Each field */}
                {[
                    { label: 'Email id', id: 'email', value: user.email, type: 'email' },
                    { label: 'Mobile Number', id: 'phone', value: user.phoneNumber }
                ].map(({ label, id, value, type = 'text' }) => (
                    <div className="relative" key={id}>
                        <label htmlFor={id} className="block text-[#0D42CA] font-semibold mb-[6px] text-[16px] md:text-[18px] leading-[24px]">
                            {label}
                        </label>
                        <input
                            id={id}
                            type={type}
                            value={value || ""}
                            disabled
                            className="bg-[#F3F7FF] w-full pl-[16px] h-[44px] rounded-[10px] border-[2.5px] text-[16px] md:text-[18px] font-semibold border-[#0D42CA]"
                        />
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ProfileDetails;
