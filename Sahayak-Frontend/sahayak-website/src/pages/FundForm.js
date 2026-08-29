import React, { useState } from 'react';
import formImg from '../assets/fundform.svg';
import PatientDetails from '../components/FundForm/PatientDetails';
import TreatmentDetails from '../components/FundForm/TreatmentDetails';
import FundsNeeded from '../components/FundForm/FundsNeeded';
import Confirmation from '../components/FundForm/Confirmation';
import { API_BASE_URL } from '../config';
import { useAuth } from '../components/AuthContext';

const FundForm = () => {
    const { token, userId } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        patientName: '',
        relation: '',
        patientAge: '',
        coverImagePath: '',
        patientAddress: '',
        state: '',
        city: '',
        aadhaarPath: null,
        panPath: null,
        description: '',
        disease: '',
        hospital: '',
        doctor: '',
        duration: '',
        totalMedicalCost: '',
        medicalReportPath: null,
        totalAmount: '',
        endDate: ''
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const submitForm = async () => {
        try {
            const formDataToSend = new FormData();

            const jsonFields = {};
            if (formData.aadhaarPath) formDataToSend.append("aadhaarPath", formData.aadhaarPath);
            if (formData.panPath) formDataToSend.append("panPath", formData.panPath);
            if (formData.medicalReportPath) formDataToSend.append("medicalReportPath", formData.medicalReportPath);
            if (formData.coverImagePath) formDataToSend.append("coverImagePath", formData.coverImagePath);

            for (const key in formData) {
                if (!["aadhaarPath", "panPath", "medicalReportPath", "coverImagePath"].includes(key)) {
                    jsonFields[key] = formData[key];
                }
            }

            formDataToSend.append("data", new Blob([JSON.stringify(jsonFields)], { type: "application/json" }));

            const response = await fetch(`${API_BASE_URL}/campaign/${userId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Submission failed');
            }

            const result = await response.json();
            console.log('Success:', result);
            nextStep(); // Go to final confirmation page
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <>
            {step <= 4 ? (
                <div className='flex justify-center items-center gap-[43px] my-[78px]'>
                    <div className='space-y-[6px] max-w-[463px]'>
                        <img src={formImg} alt="Form Visual" />
                        <p className='font-normal text-[32px] leading-[43.68px]'>
                            Thousands Are Raising Funds Online On Sahayak
                        </p>
                        <h2 className='font-bold text-[32px] leading-[43.68px]'>
                            You Can Too!
                        </h2>
                    </div>

                    {step === 1 && (
                        <PatientDetails
                            formData={formData}
                            updateFormData={updateFormData}
                            nextStep={nextStep}
                        />
                    )}
                    {step === 2 && (
                        <TreatmentDetails
                            formData={formData}
                            updateFormData={updateFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}
                    {step === 3 && (
                        <FundsNeeded
                            formData={formData}
                            updateFormData={updateFormData}
                            nextStep={nextStep} // now leads to confirmation screen
                            prevStep={prevStep}
                        />
                    )}
                    {step === 4 && (
                        <div className="w-full max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
                            <h2 className="text-2xl font-bold text-center">Review Your Details</h2>

                            <div>
                                <h3 className="font-semibold text-lg">Patient Details</h3>
                                <p><strong>Name:</strong> {formData.patientName}</p>
                                <p><strong>Relation:</strong> {formData.relation}</p>
                                <p><strong>Age:</strong> {formData.patientAge}</p>
                                <p><strong>Address:</strong> {formData.patientAddress}, {formData.city}, {formData.state}</p>
                                <p><strong>Description:</strong> {formData.description}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">Treatment Details</h3>
                                <p><strong>Disease:</strong> {formData.disease}</p>
                                <p><strong>Hospital:</strong> {formData.hospital}</p>
                                <p><strong>Doctor:</strong> {formData.doctor}</p>
                                <p><strong>Duration:</strong> {formData.duration}</p>
                                <p><strong>Cost:</strong> ₹{formData.totalMedicalCost}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">Fundraising</h3>
                                <p><strong>Target Amount:</strong> ₹{formData.totalAmount}</p>
                                <p><strong>End Date:</strong> {formData.endDate}</p>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button onClick={prevStep} className="bg-gray-200 px-4 py-2 rounded">Back</button>
                                <button onClick={submitForm} className="bg-green-600 text-white px-4 py-2 rounded">Confirm & Submit</button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Confirmation formData={formData} />
            )}
        </>
    );
};

export default FundForm;
