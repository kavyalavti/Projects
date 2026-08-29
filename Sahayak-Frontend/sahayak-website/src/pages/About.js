import React from 'react'
import HeroSection from '../components/About/HeroSection'
import StartFundRaising from '../components/About/StartFundRaising'
import MedicalCategories from '../components/About/MedicalCategories'
import Review from '../components/About/Review'
import Follow from '../components/About/Follow'

const About = () => {
    return (
        <div>
            <HeroSection />
            <StartFundRaising />

            <button className='my-[73px] text-white text-[32px] font-semibold leading[43.58px] px-[115px] py-5 bg-[rgb(61,149,128,1)] shadow-custom-light rounded-[20px] mx-auto block'>
                Start A Fundraiser For Free Now
            </button>

            <MedicalCategories/>
            <Review/>
            <Follow/>
        </div>
    )
}

export default About