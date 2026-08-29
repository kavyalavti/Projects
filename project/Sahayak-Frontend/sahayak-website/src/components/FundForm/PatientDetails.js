import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ProgressTracker from './ProgressTracker';

const statesWithCities = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
    Delhi: ['New Delhi', 'Dwarka', 'Rohini'],
    TamilNadu: ['Chennai', 'Coimbatore', 'Madurai'],
};

const PatientDetails = ({ formData, updateFormData, nextStep }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        getValues
    } = useForm({
        defaultValues: formData,
    });

    const selectedState = watch('state');
    const selectedCity = watch('city');
    const [cities, setCities] = useState([]);

    // Initialize form with formData and setup city list
    useEffect(() => {
        Object.entries(formData).forEach(([key, value]) => {
            setValue(key, value);
        });

        if (formData.state) {
            const availableCities = statesWithCities[formData.state] || [];
            setCities(availableCities);

            if (!availableCities.includes(formData.city)) {
                setValue('city', '');
            }
        }
    }, [formData, setValue]);

    // Update cities when state changes
    useEffect(() => {
        const updatedCities = statesWithCities[selectedState] || [];
        setCities(updatedCities);

        const currentCity = getValues('city');
        if (!updatedCities.includes(currentCity)) {
            setValue('city', '');
        }
    }, [selectedState, getValues, setValue]);

    const onSubmit = (data) => {
        updateFormData({ ...formData, ...data });
        nextStep();
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName, file);
            // Combine with existing form data
            const currentData = getValues();
            updateFormData({ ...currentData, [fieldName]: file });
        }
    };

    return (
        <div className="space-y-[45px]">
            <h1 className="text-[24px] font-semibold leading-[32.68px] text-center">
                Step 2: Patient Details
            </h1>
            <ProgressTracker step={1} />

            <form onSubmit={handleSubmit(onSubmit)} className="fundraising-form-container flex flex-col gap-5">
                {/* Patient Name */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Patient Name
                    </label>
                    <input
                        {...register('patientName', { required: 'Patient name is required' })}
                        className="form-input"
                    />
                    {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName.message}</p>}
                </div>

                {/* Aadhar Upload */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Upload Cover Photo (Image)
                    </label>
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'coverImagePath')}
                        className="form-input"
                    />
                    {formData.coverImagePath && (
                        <p className="text-green-500 text-sm mt-1">
                            File selected: {formData.coverImagePath.name}
                        </p>
                    )}
                </div>

                {/* Relation */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Relation to Patient
                    </label>
                    <input
                        {...register('relation', { required: 'Relation is required' })}
                        className="form-input"
                    />
                    {errors.relation && <p className="text-red-500 text-sm mt-1">{errors.relation.message}</p>}
                </div>

                {/* Age */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Patient Age
                    </label>
                    <input
                        type="number"
                        {...register('patientAge', {
                            required: 'Age is required',
                            min: { value: 0, message: 'Age must be positive' }
                        })}
                        className="form-input"
                    />
                    {errors.patientAge && <p className="text-red-500 text-sm mt-1">{errors.patientAge.message}</p>}
                </div>

                {/* Address */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Address
                    </label>
                    <input
                        {...register('patientAddress', { required: 'Address is required' })}
                        className="form-input"
                    />
                    {errors.patientAddress && <p className="text-red-500 text-sm mt-1">{errors.patientAddress.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Description
                    </label>
                    <input
                        {...register('description', { required: 'Description is required' })}
                        className="form-input"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* State */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        State
                    </label>
                    <select
                        {...register('state', { required: 'State is required' })}
                        className="w-full form-input"
                    >
                        <option value="">Select State</option>
                        {Object.keys(statesWithCities).map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>

                {/* City */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        City
                    </label>
                    <select
                        {...register('city', { required: 'City is required' })}
                        className="w-full form-input"
                        disabled={!selectedState}
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>

                {/* Aadhar Upload */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Upload Aadhar (PDF/Image)
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'aadhaarPath')}
                        className="form-input"
                    />
                    {formData.aadhaarPath && (
                        <p className="text-green-500 text-sm mt-1">
                            File selected: {formData.aadhaarPath.name}
                        </p>
                    )}
                </div>

                {/* PAN Upload */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Upload PAN (PDF/Image)
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'panPath')}
                        className="form-input"
                    />
                    {formData.panPath && (
                        <p className="text-green-500 text-sm mt-1">
                            File selected: {formData.panPath.name}
                        </p>
                    )}
                </div>

                {/* Navigation Button */}
                <div className="flex justify-end mt-6">
                    <button type="submit" className="btn-primary w-full">
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientDetails;
