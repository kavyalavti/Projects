import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMedkit, FaUser, FaHospital, FaCalendarAlt, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';
import DonationPopup from '../components/PublicCampaignPage/DonatePopup';
import { API_BASE_URL } from '../config';
import  { IMAGE_BASE_URL } from '../config'; // Adjust the import path as necessary

const PublicCampaignPage = () => {
  const { campaignUrl } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/campaign/public/${campaignUrl}`);
        const data = await res.json();
        setCampaign(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching public campaign:', error);
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignUrl]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!campaign) {
    return <div className="text-center text-red-500 mt-10">Campaign not found.</div>;
  }

  const {
    patientName, disease, totalAmount, amountRaised = 0, relation, patientAge,
    patientAddress, state, city, hospital, doctor, startDate, endDate,
    duration, description, status, totalMedicalCost, coverImagePath
  } = campaign;

  const progress = Math.min((amountRaised / totalAmount) * 100, 100);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Cover Image */}
      {coverImagePath && (
      <div className="mb-8 flex justify-center">
          <img
            src={`${coverImagePath}`}
            alt={`${patientName}'s Campaign`}
            className="w-full max-w-2xl max-h-[500px] object-contain rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        Support {patientName}'s Medical Journey
      </h1>

      {/* Campaign Details */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8">

        {/* Patient Info */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
            <FaUser className="mr-2" /> Patient Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Relation:</strong> {relation}</p>
            <p><strong>Age:</strong> {patientAge}</p>
            <p><strong>Disease:</strong> {disease}</p>
            <p><strong>Description:</strong> {description}</p>
          </div>
        </section>

        {/* Medical Details */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
            <FaMedkit className="mr-2" /> Medical Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Hospital:</strong> {hospital}</p>
            <p><strong>Doctor:</strong> {doctor}</p>
            <p><strong>Start Date:</strong> {startDate}</p>
            <p><strong>End Date:</strong> {endDate}</p>
            <p><strong>Duration:</strong> {duration} days</p>
            <p><strong>Status:</strong> {status}</p>
          </div>
        </section>

        {/* Location */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Location
          </h2>
          <p><strong>Address:</strong> {patientAddress}, {city}, {state}</p>
        </section>

        {/* Fundraising Progress */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
            <FaClipboardList className="mr-2" /> Fundraising Progress
          </h2>
          <div className="space-y-2">
            <p><strong>Total Medical Cost:</strong> ₹{Number(totalMedicalCost).toLocaleString()}</p>
            <p><strong>Amount Raised:</strong> ₹{Number(amountRaised).toLocaleString()} / ₹{Number(totalAmount).toLocaleString()}</p>
          </div>
          <div className="w-full h-5 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </section>

        {/* Donate Button */}
        <section className="text-center mt-8">
          <h3 className="text-xl font-semibold mb-4">Contribute Now</h3>
          <button
            className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            onClick={() => setShowPopup(true)}
          >
            Donate to this Cause
          </button>
        </section>
      </div>

      {/* Donation Popup */}
      {showPopup && <DonationPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default PublicCampaignPage;
