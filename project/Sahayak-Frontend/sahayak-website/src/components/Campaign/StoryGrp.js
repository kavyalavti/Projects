import React, { useState } from 'react';
import { FaMedkit, FaUser, FaHospital, FaCalendarAlt, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StoryGrp = ({ campaign }) => {
  const {
    id,
    patientName,
    disease,
    totalAmount,
    amountRaised = 0,
    relation,
    patientAge,
    patientAddress,
    state,
    city,
    hospital,
    doctor,
    startDate,
    duration,
    endDate,
    description,
    status,
    totalMedicalCost
  } = campaign;

  const [showDetails, setShowDetails] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const progress = Math.min((amountRaised / totalAmount) * 100, 100);

  const closeModal = (e) => {
    if (e.target.classList.contains('overlay')) {
      setShowDetails(false);
    }
  };

  const handleShare = async () => {
    const campaignUrl = `${window.location.origin}/campaign/public/${campaign.campaignUrl}`;
    try {
      await navigator.clipboard.writeText(campaignUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const isPending = !status || status === 'UNDER_VERIFICATION';
  const isRejected = status === 'REJECTED';

  return (
    <div className="relative shadow-lg rounded-xl overflow-hidden w-full max-w-[320px] bg-white p-4 flex flex-col gap-4 cursor-pointer">
      
      {showCopied && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
          Link Copied!
        </div>
      )}

      {showDetails && (
        <div
          className="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 flex justify-center items-center"
          onClick={closeModal}
        >
          <div className="modal-content bg-white p-6 rounded-xl shadow-xl w-full max-w-[700px] overflow-y-auto transition-all duration-300 transform scale-105">
            <div className="modal-header bg-blue-600 text-white p-4 rounded-t-xl">
              <h3 className="text-2xl font-bold">{patientName}'s Campaign</h3>
            </div>

            <div className="modal-body p-6">
              {isPending ? (
                <p className="text-gray-800 text-lg">
                  Thank you for your patience. Your campaign is currently under verification.
                </p>
              ) : isRejected ? (
                <p className="text-red-700 text-lg">
                  We're sorry, but your campaign has been <strong>rejected</strong>. Please contact our support team for further clarification.
                </p>
              ) : (
                <div className="space-y-6">
                  <div className="info-section">
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">
                      <FaUser className="inline mr-2" /> Patient Info
                    </h4>
                    <p><strong>Relation:</strong> {relation}</p>
                    <p><strong>Age:</strong> {patientAge}</p>
                    <p><strong>Disease:</strong> {disease}</p>
                    <p><strong>Description:</strong> {description}</p>
                  </div>

                  <div className="info-section">
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">
                      <FaMedkit className="inline mr-2" /> Medical Info
                    </h4>
                    <p><strong>Hospital:</strong> {hospital}</p>
                    <p><strong>Doctor:</strong> {doctor}</p>
                    <p><strong>Start Date:</strong> {startDate}</p>
                    <p><strong>End Date:</strong> {endDate}</p>
                    <p><strong>Duration:</strong> {duration} days</p>
                    <p><strong>Status:</strong> {status}</p>
                  </div>

                  <div className="info-section">
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">
                      <FaMapMarkerAlt className="inline mr-2" /> Location
                    </h4>
                    <p><strong>Address:</strong> {patientAddress}, {city}, {state}</p>
                  </div>

                  <div className="info-section">
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">
                      <FaClipboardList className="inline mr-2" /> Fund Details
                    </h4>
                    <p><strong>Total Medical Cost:</strong> ₹{Number(totalMedicalCost).toLocaleString()}</p>
                    <p><strong>Amount Raised:</strong> ₹{Number(amountRaised).toLocaleString()} / ₹{Number(totalAmount).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer p-4">
              <button
                onClick={() => setShowDetails(false)}
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-800">{patientName}</h3>
      <p className="text-sm text-gray-600">Disease: {disease}</p>

      <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-teal-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm font-medium text-gray-700 mt-2">
        ₹{amountRaised?.toLocaleString()} raised of ₹{totalAmount?.toLocaleString()}
      </p>

      {isPending && (
        <div className="text-yellow-600 text-sm font-medium">
          Campaign is pending approval.
        </div>
      )}

      {isRejected && (
        <div className="text-red-600 text-sm font-medium">
          Campaign has been rejected. Please contact support.
        </div>
      )}

      <button
        onClick={() => setShowDetails(true)}
        className="mt-3 text-sm text-white bg-gradient-to-r from-blue-500 to-teal-500 px-6 py-2 rounded-full font-medium hover:bg-gradient-to-l hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
      >
        View Full Details
      </button>

      {/* Hide Share button for pending or rejected */}
      {!isPending && !isRejected && (
        <button
          onClick={handleShare}
          className="mt-2 text-sm text-white bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full font-medium hover:bg-gradient-to-l hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          Share
        </button>
      )}
    </div>
  );
};

export default StoryGrp;
