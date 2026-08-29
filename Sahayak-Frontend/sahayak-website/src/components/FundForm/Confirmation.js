import React from 'react';

const Confirmation = ({ formData }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Application Submitted Successfully!</h1>
                
                <p className="text-lg text-gray-600 mb-6">
                    Thank you for submitting your fundraising application. Our team will review your details and get back to you shortly.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                    <h2 className="text-xl font-semibold mb-4">Application Summary</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-gray-700">Patient Details</h3>
                            <p className="text-gray-600">Name: {formData.patientName}</p>
                            <p className="text-gray-600">Age: {formData.patientAge}</p>
                            <p className="text-gray-600">Location: {formData.city}, {formData.state}</p>
                        </div>
                        
                        <div>
                            <h3 className="font-medium text-gray-700">Treatment Details</h3>
                            <p className="text-gray-600">Disease: {formData.disease}</p>
                            <p className="text-gray-600">Hospital: {formData.hospital}</p>
                            <p className="text-gray-600">Estimated Cost: ₹{formData.totalMedicalCost}</p>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <h3 className="font-medium text-gray-700">Fundraising Goal</h3>
                        <p className="text-gray-600">Amount Required: ₹{formData.totalAmount}</p>
                        <p className="text-gray-600">Fundraising Deadline: {new Date(formData.endDate).toLocaleDateString()}</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => window.location.href = '/'}
                    className="btn-primary px-6 py-3"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Confirmation;