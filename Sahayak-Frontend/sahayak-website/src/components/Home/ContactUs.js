import React from 'react'
import Phone from '../../assets/Phone.svg'

const ContactUs = () => {
    return (
        <div className='w-full h-[172px] bg-gradient-to-r from-[#3B5998] to-[#3B5998]  mb-[113px] flex flex-col justify-center items-center'>
            <div className = 'w-[67%] min-h-[100px] flex gap-8 bg-white items-center justify-center rounded-[10px] contact-us-container'>
 
                <p className='text-[24px] font-semibold leading-[32.68px] contact-us-para'>Need help to setup your free fundraiser?</p>

                <button className = 'flex gap-3 bg-gradient-to-r from-[#E1AF24] to-[#EB6E00] rounded-[30px] w-[284px] h-[51px] justify-center items-center contact-us-bottom'>
                    <img src={Phone}/>
                    <p className='font-semibold text-[18px] leading-[24.51px] text-[rgb(238,238,238,1)] button-para'>
                        Request a call
                    </p>
                </button>
            </div>
        </div>
    )
}


export default ContactUs