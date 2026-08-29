import React from 'react'
import people from '../../assets/people-bg.svg'
import reverse from '../../assets/reverseIcon.svg'
import forward from '../../assets/forwardIcon.svg'
import ReviewCard from './ReviewCard'
import { Link } from 'react-router-dom'

const Review = () => {
    return (
        <div className="h-[608px] bg-[rgb(1,54,17,0.71)] bg-cover bg-center my-[93px] py-[60px] space-y-[60px]" style={{ backgroundImage: `url(${people})`,
                backgroundBlendMode: "overlay",}}>

            <h1 className='text-center font-bold text-[36px] leading-[49.03px] text-white'>
                What people are saying about us
            </h1>

            <div className='flex items-center gap-[50px] justify-center'>
                <img src={reverse}/>
                <ReviewCard/>
                <ReviewCard/>
                <ReviewCard/>
                <img src={forward}/>
            </div>

            <Link className='text-[18px] leading-[24.51px] font-normal text-white underline text-center block'>See all reviews</Link>
        </div>
    )
}

export default Review