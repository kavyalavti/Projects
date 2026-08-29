import React from 'react'
import mobile from '../../assets/mobile.svg'
import playStore from '../../assets/googlePlay.svg'
import appStore from '../../assets/appStore.svg'
import tick from '../../assets/tick.svg'


const MobileApp = () => {
    return (
        <div className='p-[63px] bg-white mobile-app-container'>
            <div className='bg-[rgb(222,240,255,1)] flex pt-[63px] items-center gap-[48px] mx-auto shadow-custom-light relative'>
                
                {/* mobile img */}
                <img src={mobile} className=''/>

                {/* right part */}
                <div className='space-y-[60px]'>
                    <h1 className='font-bold text-[28px] leading-[38.13px]'>Now you can download our App and manage your<br/>fundraisers on the go</h1>

                    {/* 6 points */}
                    <div className='grid grid-rows-3 grid-cols-2 gap-x-[84px] gap-y-[27px]'>
                        <div className='flex gap-[21px]'>
                            <img src={tick} height={"20px"} width={"20px"}/>
                            <p className='font-semibold text-[18px] leading-[24.51px] max-w-[213px]'>Access a personalized dashboard</p>
                        </div>

                        <div className='flex gap-[21px]'>
                            <img src={tick} height={"20px"} width={"20px"}/>
                            <p className='font-semibold text-[18px] leading-[24.51px] max-w-[213px]'>Start fundraisers within seconds</p>
                        </div>

                        <div className='flex gap-[21px]'>
                            <img src={tick} height={"20px"} width={"20px"}/>
                            <p className='font-semibold text-[18px] leading-[24.51px] max-w-[213px]'>Keep track of all your donations received</p>
                        </div>

                        <div className='flex gap-[21px]'>
                            <img src={tick} height={"20px"} width={"20px"}/>
                            <p className='font-semibold text-[18px] leading-[24.51px] max-w-[213px]'>Get real time updates and notification </p>
                        </div>

                        <div className='flex gap-[21px]'>
                            <img src={tick} height={"20px"} width={"20px"}/>
                            <p className='font-semibold text-[18px] leading-[24.51px] max-w-[213px]'>Withdraw your funds faster</p>
                        </div>

                        <div className='flex gap-[21px]'>
                            <img src={tick} height={"20px"} width={"20px"}/>
                            <p className='font-semibold text-[18px] leading-[24.51px] max-w-[236px]'>Share among your friends and family</p>
                        </div>

                    </div>

                    {/* play and app store buttons */}
                    <div className='flex gap-16'>
                        <img src={playStore} className=' cursor-pointer'/>
                        <img src={appStore} className=' cursor-pointer'/>
                    </div>
                </div>
                <div className='h-[37px] w-full absolute bottom-0 bg-[#DEF0FF]'></div>
            </div>

        </div>
    )
}

export default MobileApp