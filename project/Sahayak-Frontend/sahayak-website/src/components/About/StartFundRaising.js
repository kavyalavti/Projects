import React from 'react'
import mobile from '../../assets/mobile-about.svg'
import start from '../../assets/start-about.svg'
import investment from '../../assets/investment.svg'
import withdraw from '../../assets/withdraw.svg'
import arrow from '../../assets/Arrow.svg'
import { Link } from 'react-router-dom'


const StartFundRaising = () => {
    return (
        <div className='bg-white'>
            <div className='mx-auto space-y-4 max-w-max py-[92px]'>
                <h1 className='font-bold text-[36px] leading-[50px] text-[rgb(0,49,152,1)] space-y-[36px]'>
                    Start a Fundraiser in three simple steps
                </h1>

                <div className='flex gap-[70px] items-center'>
                    <div className=''>

                        <div className='flex gap-3'>
                            <img src={start} />
                            <div>
                                <h1 className='text-[18px] font-semibold text-[rgb(0,49,152,1)]'>Start your fundraiser</h1>
                                <p className='text-[12px] leading-[20px] font-normal max-w-[224px]'>
                                    It'll take only 2 minutes. Just tell us a few details about you and the ones you are raising funds for.
                                </p>
                            </div>
                        </div>

                        <img src={arrow} className='ml-[28px]' />

                        <div className='flex gap-3'>
                            <img src={investment} />
                            <div>
                                <h1 className='text-[18px] font-semibold text-[rgb(0,49,152,1)]'>Share your fundraiser</h1>
                                <p className='text-[12px] leading-[20px] font-normal max-w-[224px]'>
                                    All you need to do is share the fundraiser with your friends and family. In no time, support will start pouring in.
                                </p>
                            </div>
                        </div>

                        <img src={arrow} className='ml-[28px]' />


                        <div className='flex gap-3'>
                            <img src={withdraw} />
                            <div>
                                <h1 className='text-[18px] font-semibold text-[rgb(0,49,152,1)]'>Withdraw Funds</h1>
                                <p className='text-[12px] leading-[20px] font-normal max-w-[224px]'>
                                    The funds raised can be withdrawn without any hassle directly to your bank account.
                                </p>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <Link
                                to="/register"
                                className="inline-block bg-[#003198] text-white px-6 py-2 rounded hover:bg-[#002070] transition"
                            >
                                Start Fundraising – Register Now
                            </Link>
                        </div>

                    </div>
                    <img src={mobile} />
                </div>
            </div>
        </div>
    )
}

export default StartFundRaising