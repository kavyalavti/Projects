import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import campaignBg from '../../assets/campaign-bg.svg';
import { API_BASE_URL } from '../../config';

const HeroSection = ({ userId }) => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const userId = localStorage.getItem('userId');
        const res = await fetch(`${API_BASE_URL}/campaign/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCampaigns(data.campaigns);
      } catch (err) {
        console.error('Failed to load campaigns', err);
      }
    };
  
    fetchCampaigns();
  }, [userId]);

  if (campaigns.length > 0) return null;

  return (
    <div
      className="bg-[rgb(48,45,45,0.56)] bg-cover bg-center pt-[344px] pb-[64px] -mt-[40px] rounded-xl"
      style={{
        backgroundImage: `url(${campaignBg})`,
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="text-white flex flex-col items-center justify-evenly gap-[20px]">
        <h1 className="font-bold text-[46px] leading-[62.64px]">
          No Campaign Created Yet !!
        </h1>
        <p className="font-normal text-[28px] leading-[38.13px]">
          Every second is important when it comes to getting financial help at the right time.
        </p>
        <button
          onClick={() => navigate('/raisefund')}
          className="bg-[rgb(61,149,128,1)] text-white shadow-custom-light text-[32px] font-semibold leading-[43.58px] rounded-[10px] px-[182px] py-[20px]"
        >
          Start Your Fundraiser
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
