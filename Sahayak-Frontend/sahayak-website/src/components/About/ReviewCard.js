import React from 'react'
import profile from '../../assets/reviewCard.svg'

const ReviewCard = () => {
    return (
        <div className="pt-[36px] pb-[36px] px-[22px] bg-white rounded-[5px] shadow-custom-light space-y-[19px]">
            {/* Profile Section */}
            <div className="flex items-center gap-[12px]">
                <img src={profile}/>
                <div>
                    <h3 className="text-[18px] leading-[24.51px] font-semibold text-[rgb(0,49,152,1)]">
                        Sreeja's Mother
                    </h3>
                    <p className="text-[14px] leading-[19.07px] font-semibold text-[rgb(93,109,143,1)]">Campaigner</p>
                </div>
            </div>

            {/* Testimonial Content */}
            <p className="text-[18px] leading-[24.51px] font-normal text-[rgb(72,72,72,1)] max-w-[302px]">
                It was positively overwhelming to see so many strangers and well
                wishers come to help us through the platform, and thus it’s possible to
                cure my child’s health condition.
            </p>
        </div>
    );
};

export default ReviewCard
