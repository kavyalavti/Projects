import React from 'react';
import paytm from '../assets/paytm.svg'
import mastercard from '../assets/mastercard.svg'
import americanExpress from '../assets/americanExpress.svg'
import visa from '../assets/VisaIcon.svg'
import Whatsapp from '../assets/whatsappIcon.svg'
import Facebook from '../assets/FacebookIcon.svg'
import Linkedin from '../assets/LinkedInIcon.svg'
import Instagram from '../assets/InstaIcon.svg'
import playStore from '../assets/goolePlay-white.svg'
import appStore from '../assets/appStore-white.svg'
import dot from '../assets/dot.svg'

const Footer = () => {
    return (
        <>
            <footer className="bg-black py-10 overflow-x-hidden">
                <div className="ml-[54px] flex gap-[90px] footer-main-container overflow-x-hidden">

                    {/* Left Section */}
                    <div className='footer-left-container'>
                        <div className='text-[rgb(249,249,249,1)] footer-list'>
                            <h2 className="text-[18px] font-semibold mb-2">Sahayak</h2>
                            <ul className="font-normal text-[14px] leading-[30px]">
                                <li>About us</li>
                                <li>Press and media</li>
                                <li>Team</li>
                                <li>Careers</li>
                                <li>Contact</li>
                                <li>Thank you</li>
                                <li>Resources</li>
                            </ul>
                        </div>

                        {/* Middle Section */}
                        <div className='max-w-[405px] text-[rgb(249,249,249,1)]'>
                            <h2 className="font-semibold text-[18px] leading-[40px]">Indian office address</h2>

                            <p className="font-normal text-[14px] leading-[30px]">
                                Milaap Social Ventures India Pvt. Ltd.<br />
                                Nextcoworks JP Nagar - Coworking Space JP Nagar Alankar Plaza, Bk circle, Nayak Layout, 8th Phase,<br /> J. P. Nagar, Bangalore, Karnataka, India 560078
                            </p>

                            <div className="flex space-x-2 mt-2 items-center">
                                <p className="font-semibold text-[18px] leading-[40px] text-[rgb(249,249,249,1)] mr-4 supported-by-text">Supported By :</p>
                                <img src={paytm} width={"38px"} height={"12px"} />
                                <img src={americanExpress} width={"51px"} height={"17px"} />
                                <img src={mastercard} width={"28px"} height={"17px"} />
                                <img src={visa} width={"53px"} height={"16px"} />

                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className='footer-right-container'>
                        
                    <div className="flex flex-col space-y-4">

                        <button className="bg-[rgb(61,149,128,1)] text-white shadow-custom-light text-[18px] font-semibold leading-[24.51px] rounded-[10px] px-10 py-2 footer-button-1">
                            Start Your Fundraiser
                        </button>

                        <div className='flex gap-6 font-semibold text-[16px] leading-[40px] text-[rgb(249,249,249,1)]'>
                            <p>Pricing</p>
                            <p>Reviews</p>
                            <p>FAQs and tips</p>
                        </div>

                        <div className="flex space-x-4 items-center">
                            <p className="text-[rgb(249,249,249,1)] text-[16px] leading-[40px] font-semibold">Find us on :</p>
                            <img src={Linkedin} className='w-[25px] h-[25px]'/>
                            <img src={Instagram} className='w-[25px] h-[25px]'/>
                            <img src={Facebook} className='w-[25px] h-[25px]'/>
                            <img src={Whatsapp} className='w-[25px] h-[25px]'/>
                        </div>
                        </div>

                        <div className='space-y-3'>
                        <p className="text-[14px] leading-[20px] font-normal text-[rgb(249,249,249,1)]">
                            Set up, manage and promote your fundraiser <br /> with Milaap app
                        </p>
                        <p className='text-[rgb(249,249,249,1)] text-[14px] leading-[20px] font-semibold'>Download Now!</p>

                        <div className="space-y-4">
                            <img src={playStore} />
                            <img src={appStore} />
                        </div>
                        </div>

                    </div>
                </div>
            </footer>

            <div className='px-[54px] py-4 mx-auto flex justify-between items-center footer-bottom-container'>
                    <p className='text-[16px] leading-[19.53px] font-normal text-[rgb(0,17,53,1)] footer-rights-section'>©2024 STAPEL IT. All rights reserved</p>

                    <div className="flex space-x-3 text-[16px] leading-[19.53px] font-normal text-[rgb(0,17,53,1)] items-baseline footer-bottom-content footer-bottom-list-content">
                        <a href="#" className="hover:underline">Privacy</a>
                        <img src={dot} width={"5px"} height={"5px"}/>
                        <a href="#" className="hover:underline">Terms & Conditions</a>
                        <img src={dot} width={"5px"} height={"5px"}/>
                        <a href="#" className="hover:underline">Review us</a>
                    </div>
            </div>
        </>
    );
};

export default Footer;

