import React from 'react'
import HighlightImg from '../../assets/highlightImg.svg'
import Ecllipse from '../../assets/Ellipse.svg'

const HighLightSection = () => {
    return (
        <div className='flex gap-[103px] justify-center items-center mx-auto mt-[114px] higlight-container'>
            
            {/* blue */}
            <div className='flex gap-2 items-center'>
                <div className={`w-[90px] h-[81px] rounded-[20px] bg-gradient-to-b from-[#4E9FFC] to-[#1A6FEE] relative higlight-image-container`}>
                    <img src={HighlightImg} className='z-10 relative' />
                    <img src={Ecllipse} className='absolute top-[50px] left-[5px] opacity-[0.84]' />
                </div>

                <div className='flex flex-col gap-1'>
                    <h1 className='font-bold text-[18px] leading-[24.51px]'>Become A Fundraiser</h1>
                    <p className={`font-medium text-[12px] leading-[16.34px] w-[185px]`}>Faster review and approval in less than 24 hour</p>
                </div>
            </div>

            {/* yellow */}
            <div className='flex gap-2 items-center'>
                <div className={`w-[90px] h-[81px] rounded-[20px] bg-gradient-to-b from-[#FCD34E] to-[#B77700] relative higlight-image-container`}>
                    <img src={HighlightImg} className='z-10 relative' />
                    <img src={Ecllipse} className='absolute top-[50px] left-[5px] opacity-[0.56]' />
                </div>

                <div className='flex flex-col gap-1'>
                    <h1 className='font-bold text-[18px] leading-[24.51px]'>Quick Fundraising</h1>
                    <p className={`font-medium text-[12px] leading-[16.34px] w-[157px]`}>Faster review and approval in less than 24 hour</p>
                </div>
            </div>

            {/* green */}
            <div className='flex gap-2 items-center'>
                <div className={`w-[90px] h-[81px] rounded-[20px] bg-gradient-to-b from-[#00BB3E] to-[#05951F] relative higlight-image-container`}>
                    <img src={HighlightImg} className='z-10 relative' />
                    <img src={Ecllipse} className='absolute top-[50px] left-[5px] opacity-[0.28]' />
                </div>

                <div className='flex flex-col gap-1'>
                    <h1 className='font-bold text-[18px] leading-[24.51px]'>Start Donating</h1>
                    <p className={`font-medium text-[12px] leading-[16.34px] w-[142px]`}>Faster review & approval in less than 24 hour</p>
                </div>
            </div>

        </div>
    )
}

export default HighLightSection