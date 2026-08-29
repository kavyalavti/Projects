import React, { useState, useEffect, useRef } from 'react';
import StoryGrp from './StoryGrp';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CARD_WIDTH = 320; // 300px card + 20px margin

const StorySection = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [translateX, setTranslateX] = useState(0);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/campaign/public/get_top_campaigns`);
                setCampaigns(response.data.campaigns || []);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };
        fetchCampaigns();
    }, []);

    useEffect(() => {
        startAutoSlide();
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [campaigns]);

    const startAutoSlide = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            moveRight();
        }, 3000);
    };

    const moveLeft = () => {
        if (!sliderRef.current) return;
        sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
        setTranslateX((prev) => prev + CARD_WIDTH);
    };

    const moveRight = () => {
        if (!sliderRef.current) return;
        sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
        setTranslateX((prev) => prev - CARD_WIDTH);
    };

    const handleTransitionEnd = () => {
        if (!sliderRef.current) return;
        const totalSlides = campaigns.length;
        const totalWidth = totalSlides * CARD_WIDTH;

        // If moving left from first, reset to last instantly (no transition)
        if (translateX > 0) {
            sliderRef.current.style.transition = 'none';
            setTranslateX(-totalWidth);
        }

        // If moving right from last duplicate, reset to first instantly (no transition)
        if (translateX <= -totalWidth) {
            sliderRef.current.style.transition = 'none';
            setTranslateX(0);
        }
    };

    const renderCampaigns = () => {
        // Duplicate campaigns at end and start for infinite effect
        return [...campaigns, ...campaigns].map((campaign, index) => (
            <div
                key={index}
                className="flex-shrink-0 w-[300px] h-[400px] bg-white rounded-[10px] mx-2 shadow-lg overflow-hidden cursor-pointer"
                onClick={() => window.open(`/campaign/${campaign.id}`, '_blank')}
            >
                <StoryGrp campaign={campaign} />
            </div>
        ));
    };

    return (
        <div className="pb-24 story-wrapper">
            <div className="max-w-[1400px] mx-auto rounded-[10px] flex flex-col bg-[rgba(34,34,34,1)] mt-[111px] relative story-main-content p-8 overflow-hidden">
                
                {/* Top Content */}
                <div className="flex flex-col items-center text-center">
                    <h1 className="font-bold leading-[54.47px] text-[40px] text-[rgb(195,219,255,1)]">
                        From Crisis to Comeback
                    </h1>
                    <p className="text-[18px] font-normal leading-[24.51px] text-[rgb(195,219,255,1)] w-[90%] md:w-[481px] mt-[4px]">
                        Read the Heartfelt Stories of Patients Whose Lives Were Changed Thanks to You...
                    </p>
                    <button className="font-semibold text-[24px] leading-[32.68px] text-center text-[rgb(34,34,34,1)] bg-[rgb(145,181,210,1)] rounded-[10px] py-[10px] px-[22px] mt-[22px]">
                        View More Stories
                    </button>
                </div>

                {/* Slider Content */}
                <div className="relative mt-16">
                    {/* Left Arrow */}
                    <button 
                        onClick={moveLeft} 
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full z-10 opacity-80 hover:opacity-100 shadow-md"
                    >
                        <ChevronLeft />
                    </button>

                    {/* Right Arrow */}
                    <button 
                        onClick={moveRight} 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full z-10 opacity-80 hover:opacity-100 shadow-md"
                    >
                        <ChevronRight />
                    </button>

                    {/* Campaigns sliding container */}
                    <div className="overflow-hidden px-12">
                        <div
                            ref={sliderRef}
                            onTransitionEnd={handleTransitionEnd}
                            className="flex items-center"
                            style={{
                                transform: `translateX(${translateX}px)`,
                                width: `${campaigns.length * 2 * CARD_WIDTH}px`, // x2 because duplicated
                            }}
                        >
                            {renderCampaigns()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StorySection;
