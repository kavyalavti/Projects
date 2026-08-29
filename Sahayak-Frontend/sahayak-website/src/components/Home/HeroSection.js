import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import Hero1 from '../../assets/hero-1.svg';
import Hero2 from '../../assets/hero-2.svg';
import People1 from '../../assets/people1.svg';
import People2 from '../../assets/people2.svg';
import People3 from '../../assets/people3.svg';
import People4 from '../../assets/people4.svg';

const HeroSection = ({ onLoginClick, userId }) => {
  return (
    <section className="relative rounded-[50px] bg-gradient-to-b from-[#DEF0FF] to-[#8BB0CE] pt-[93px] pb-[145px] px-4">
      
      {/* Invisible support div */}
      <div className="hidden min-h-[350px] max-w-full overflow-x-hidden" />

      {/* Main Content */}
      <div className="flex flex-col gap-5 ml-[70px]">
        <h1 className="text-[#06306F] font-semibold text-3xl leading-[43px]">
          Need Funds For Your Medical Treatment?
        </h1>

        <p className="text-[#2D2D2D] font-semibold text-[22px] leading-[30px] max-w-[800px]">
          When lives are on the line, every small act of generosity counts. 
          Become a part of Sahayak and help families overcome the financial burdens of medical crises.
        </p>

        <h4 className="text-[#06306F] font-semibold text-[26px] leading-[35px]">
          Don't worry, you have come to the right platform
        </h4>

        {userId ? (
          <Link to="/dashboard">
            <button className="bg-[#3D9580] text-white text-[24px] font-semibold leading-[32px] rounded-[10px] w-[392px] h-[53px] shadow-custom-light">
              Go to Dashboard
            </button>
          </Link>
        ) : (
          <button
            className="bg-[#3D9580] text-white text-[24px] font-semibold leading-[32px] rounded-[10px] w-[392px] h-[53px] shadow-custom-light"
            onClick={onLoginClick}
          >
            Start Your Fundraiser
          </button>
        )}
      </div>

      {/* Right side images */}
      <div>
        <img src={Hero1} alt="Hero Illustration 1" className="absolute top-[44px] right-[318px]" />
        <img src={Hero2} alt="Hero Illustration 2" className="absolute top-[110px] right-[73px]" />

        <div className="absolute top-[274px] right-[345px] z-10 bg-white rounded-[20px] flex flex-col items-center py-4 px-7 shadow-custom-light">
          <h4 className="text-black font-bold text-[40px] leading-[54px]">200+</h4>
          <p className="text-center text-[18px] leading-[24px]">
            People connected & contributed <br /> through our application
          </p>
          <div className="flex gap-3 mt-3 z-20">
            <img src={People1} alt="Contributor 1" />
            <img src={People2} alt="Contributor 2" />
            <img src={People3} alt="Contributor 3" />
            <img src={People4} alt="Contributor 4" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
