import React, { useEffect, useState } from 'react';
import StoryGrp from './StoryGrp';
import { Link } from 'react-router-dom';
import ContactUs from '../../components/Home/ContactUs';
import { API_BASE_URL } from '../../config';

const StorySection = ({ userId }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE');
  const underVerificationCampaigns = campaigns.filter(c => !c.status || c.status === 'UNDER_VERIFICATION');
  const rejectedCampaigns = campaigns.filter(c => c.status === 'REJECTED');

  useEffect(() => {
    const fetchUserAndCampaigns = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const userRes = await fetch(`${API_BASE_URL}/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const userData = await userRes.json();
        setUserName(userData.name);

        const campaignRes = await fetch(`${API_BASE_URL}/campaign/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const campaignData = await campaignRes.json();
        setCampaigns(campaignData.campaigns || []);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data', err);
        setLoading(false);
      }
    };

    fetchUserAndCampaigns();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center pt-16 gap-12 bg-white px-4">
      <h1 className="font-semibold text-3xl leading-relaxed text-center text-blue-900">
        Hi {userName}, here are your campaigns and their progress!
      </h1>

      {campaigns.length === 0 ? (
        <div className="text-center bg-yellow-100 p-6 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800">
            It looks like you don't have any campaigns yet.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Start one today and make a difference!
          </p>
          <Link to="/start-campaign" className="bg-green-600 text-white font-semibold text-lg py-3 px-8 rounded-lg mt-6 inline-block shadow-lg hover:bg-green-700 transition-colors">
            Start Your Fundraiser
          </Link>
        </div>
      ) : (
        <div className="w-full flex justify-center px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl justify-items-center">
            {activeCampaigns.length > 0 && (
              <div className="w-full max-w-md bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 mx-auto">
                <h2 className="text-2xl font-bold text-green-800 mb-4 text-center border-b pb-2">🟢 Active Campaigns</h2>
                <div className="max-h-[420px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-green-300">
                  {activeCampaigns.map(c => <StoryGrp key={c.id} campaign={c} />)}
                </div>
              </div>
            )}

            {underVerificationCampaigns.length > 0 && (
              <div className="w-full max-w-md bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 mx-auto">
                <h2 className="text-2xl font-bold text-yellow-800 mb-4 text-center border-b pb-2">🟡 Under Verification</h2>
                <div className="max-h-[420px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-yellow-300">
                  {underVerificationCampaigns.map(c => <StoryGrp key={c.id} campaign={c} />)}
                </div>
              </div>
            )}

            {rejectedCampaigns.length > 0 && (
              <div className="w-full max-w-md bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 mx-auto">
                <h2 className="text-2xl font-bold text-red-800 mb-4 text-center border-b pb-2">🔴 Rejected Campaigns</h2>
                <div className="max-h-[420px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-red-300">
                  {rejectedCampaigns.map(c => <StoryGrp key={c.id} campaign={c} />)}
                </div>
              </div>
            )}
          </div>
        </div>



      )}

      <Link to="/campaigns" className="font-semibold text-lg text-center text-blue-600 underline mt-6">
        See more fundraisers
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-100 p-6 shadow-lg rounded-xl mt-12 w-full max-w-4xl">
        <p className="font-semibold text-xl text-center text-gray-800 sm:w-3/4">
          Do you want to raise funds for a medical emergency?
        </p>
        <Link to="/start-campaign">
          <button className="bg-green-600 text-white font-semibold text-lg py-3 px-8 rounded-lg mt-4 sm:mt-0 shadow-lg hover:bg-green-700 transition-colors">
            Start Your Fundraiser
          </button>
        </Link>
      </div>

      <ContactUs />
    </div>
  );
};

export default StorySection;
