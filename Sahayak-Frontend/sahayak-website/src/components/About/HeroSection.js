import React from 'react'
import aboutBg from '../../assets/aboutBg.svg'
import { Link } from 'react-router-dom'


const HeroSection = () => {
    return (
        <div className='relative'>
            <img src={aboutBg} className='object-cover inset-0 w-full h-full scale-x-[-1]' />

            <div className='absolute space-y-4 top-[178px] left-[65px]'>
                <h1 className='font-bold text-[46px] leading-[62.64px] max-w-[410px]' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Lend the helping hand and get involved</h1>

                <Link to="/register">
                    <button className="bg-[rgb(61,149,128,1)] text-[rgb(249,249,249,1)] shadow-custom-light text-[16px] font-semibold leading-[21.79px] rounded-[10px] px-12 py-[10px]">
                        Start Your Fundraiser
                    </button>
                </Link>
            </div>

            <p className='font-normal text-[24px] leading-[50px] text-center max-w-[1182px] mx-auto my-[88px]'>
                At Sahayak, we believe that no one should face the uncertainty of a health crisis alone. Our mission is to
                provide a platform where compassionate individuals can come together to support those in urgent need
                of healthcare funding. Whether it's an unexpected surgery, ongoing treatments, or emergency medical
                care, Sahayak connects people who care with people who need help the most.
            </p>
        </div>
    )
}

export default HeroSection
