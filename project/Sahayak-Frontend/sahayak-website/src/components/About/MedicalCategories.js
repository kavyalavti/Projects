import React from 'react'
import emergency from '../../assets/emergency.svg'
import arthritis from '../../assets/arthritis.svg'
import surgery from '../../assets/surgery.svg'
import cancer from '../../assets/cancer.svg'
import asthma from '../../assets/asthma.svg'

const MedicalCategories = () => {
    return (
        <div className='bg-white pt-[88px] flex flex-col items-center gap-[7px] pb-[42px]'>
            <h1 className='font-bold text-[36px] leading-[49.03px] text-[rgb(0,49,152,1)]'>
                Our Medical Fundraising Categories
            </h1>
            <p className='font-normal text-[24px] leading-[32.68px] text-[rgb(26,36,80,1)] max-w-[922px] text-center'>
                Be it for a personal need, social cause or a creative idea - you can count on us for the project that you want to raise funds for.
            </p>

            <div className='flex gap-[100px] items-center py-[43px]'>
                <div className='space-y-3'>
                    <div className='h-[123.16px] w-[193px] rounded-[10px] bg-[rgb(222,240,255,1)] shadow-custom-light flex justify-center items-center'>
                        <img src={emergency} className='-mt-4'/>
                    </div>
                    <h2 className='font-semibold text-[24px] leading-[32.68px] text-[rgb(4,27,74,1)] text-center flex justify-center items-center'>Accident <br/> Emergency</h2>
                </div>

                <div className='space-y-3'>
                    <div className='h-[123.16px] w-[193px] rounded-[10px] bg-[rgb(222,240,255,1)] shadow-custom-light flex justify-center items-center'>
                        <img src={surgery} />
                    </div>
                    <h2 className='font-semibold text-[24px] leading-[32.68px] text-[rgb(4,27,74,1)] text-center'>Amputee <br/> Surgery</h2>
                </div>

                <div className='space-y-3'>
                    <div className='h-[123.16px] w-[193px] rounded-[10px] bg-[rgb(222,240,255,1)] shadow-custom-light  flex justify-center items-center'>
                        <img src={arthritis} />
                    </div>
                    <h2 className='font-semibold text-[24px] leading-[32.68px] text-[rgb(4,27,74,1)] text-center'>Arthritis</h2>
                </div>

                <div className='space-y-3'>
                    <div className='h-[123.16px] w-[193px] rounded-[10px] bg-[rgb(222,240,255,1)] shadow-custom-light  flex justify-center items-center'>
                        <img src={asthma} />
                    </div>
                    <h2 className='font-semibold text-[24px] leading-[32.68px] text-[rgb(4,27,74,1)] text-center'>Asthma</h2>
                </div>

                <div className='space-y-3'>
                    <div className='h-[123.16px] w-[193px] rounded-[10px] bg-[rgb(222,240,255,1)] shadow-custom-light flex justify-center items-center'>
                        <img src={cancer} />
                    </div>
                    <h2 className='font-semibold text-[24px] leading-[32.68px] text-[rgb(4,27,74,1)] text-center'>Blood Cancer</h2>
                </div>
            </div>
        </div>
    )
}

export default MedicalCategories