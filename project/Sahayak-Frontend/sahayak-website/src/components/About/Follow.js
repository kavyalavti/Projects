import React from 'react'
import linkedin from '../../assets/lnkdin.svg'
import insta from '../../assets/insta.svg'
import facebook from '../../assets/fb.svg'
import whatsapp from '../../assets/wa.svg'

const Follow = () => {
    return (
        <div className='bg-white rounded-t-[90px] py-[43px]'>
            <div className='flex gap-[204px] mx-auto max-w-max'>
                <div className='space-y-[27px]'>
                    <h1 className='font-bold text-[40px] leading-[54.47px]'>Join Our Impact Community</h1>

                    <div className='flex gap-[9px]'>
                        <input className='min-w-[260.74px] h-[46px] border-2 rounded-lg shadow-custom-light border-[rgb(4,27,74,1)] placeholder:text-[12px] placeholder:italic placeholder:leading-[16.34px] placeholder:font-normal placeholder:pl-[10px] placeholder:text-black pl-1' placeholder='Please enter your mail id'/>

                        <button className='bg-[#003198] rounded-[10px] text-[18px] leading-[24.51px] font-semibold text-white py-[10px] px-[16px]'>Subscribe Now</button>
                    </div>
                </div>

                <div className='space-y-[27px]'>
                    <h1 className='font-bold text-[40px] leading-[54.47px]'>
                        Follow Us On
                    </h1>

                    <div className='flex gap-[26px] justify-center'>
                        <img src={linkedin}/>
                        <img src={insta}/>
                        <img src={facebook}/>
                        <img src={whatsapp}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Follow