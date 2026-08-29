import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ProgressTracker from './ProgressTracker';

const TreatmentDetails = ({ formData, updateFormData, nextStep, prevStep }) => {
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     setValue,
    //     getValues
    // } = useForm({
    //     defaultValues: {
    //         ...formData,
    //         medicalReportPath: formData.medicalReportPath || null
    //     }
    // });
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

    // Load formData into the form on mount
    useEffect(() => {
        // Object.entries(formData).forEach(([key, value]) => {
        //     if (key !== 'medicalReportPath') {
        //         setValue(key, value);
        //     }
        // });
        Object.entries(formData).forEach(([key, value]) => {
            setValue(key, value);
        });
    }, [formData, setValue]);

    // const onSubmit = (data) => {
    //     const file = getValues("medicalReportPath");
    //     updateFormData({ ...data, medicalReportPath: file });
    //     nextStep();
    // };

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
                Step 3: Treatment Details
            </h1>
            <ProgressTracker step={2} />

            <form onSubmit={handleSubmit(onSubmit)} className="fundraising-form-container flex flex-col gap-5">
                {/* Disease Name */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Disease Name
                    </label>
                    <input
                        {...register("disease", { required: "Disease name is required" })}
                        className="form-input"
                    />
                    {errors.disease && (
                        <p className="text-red-500 text-sm mt-1">{errors.disease.message}</p>
                    )}
                </div>

                {/* Hospital Name */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Hospital Name
                    </label>
                    <input
                        {...register("hospital", { required: "Hospital name is required" })}
                        className="form-input"
                    />
                    {errors.hospital && (
                        <p className="text-red-500 text-sm mt-1">{errors.hospital.message}</p>
                    )}
                </div>

                {/* Doctor Name */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Doctor Name
                    </label>
                    <input
                        {...register("doctor", { required: "Doctor name is required" })}
                        className="form-input"
                    />
                    {errors.doctor && (
                        <p className="text-red-500 text-sm mt-1">{errors.doctor.message}</p>
                    )}
                </div>


                {/* Estimated Duration */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Estimated Duration (in weeks/months)
                    </label>
                    <input
                        {...register("duration", { required: "Duration is required" })}
                        className="form-input"
                    />
                    {errors.duration && (
                        <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                    )}
                </div>

                {/* Estimated Cost */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Estimated Cost of Treatment (INR)
                    </label>
                    <input
                        type="number"
                        {...register("totalMedicalCost", {
                            required: "Cost is required",
                            min: { value: 0, message: "Cost must be positive" }
                        })}
                        className="form-input"
                    />
                    {errors.totalMedicalCost && (
                        <p className="text-red-500 text-sm mt-1">{errors.totalMedicalCost.message}</p>
                    )}
                </div>

                {/* Medical Report Upload
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Upload Medical Report
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        {...register("medicalReportPath")}
                        className="form-input"
                    />
                    {formData.medicalReportPath && (
                        <p className="text-green-500 text-sm mt-1">
                            File selected: {formData.medicalReportPath.name}
                        </p>
                    )}
                </div> */}

                {/* Aadhar Upload */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                    Upload Medical Report
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'medicalReportPath')}
                        className="form-input"
                    />
                    {formData.medicalReportPath && (
                        <p className="text-green-500 text-sm mt-1">
                            File selected: {formData.medicalReportPath.name}
                        </p>
                    )}
                </div>


                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="btn-secondary flex-1"
                    >
                        Previous
                    </button>
                    <button
                        type="submit"
                        className="btn-primary flex-1"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TreatmentDetails;
