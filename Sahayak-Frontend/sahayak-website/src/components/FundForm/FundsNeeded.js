import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ProgressTracker from './ProgressTracker';

const FundsNeeded = ({ formData, updateFormData, nextStep, prevStep }) => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: formData
    });

    useEffect(() => {
        // Set form values from parent component
        for (const key in formData) {
            if (formData[key] !== null) {
                setValue(key, formData[key]);
            }
        }
    }, [formData, setValue]);

    const onSubmit = (data) => {
        updateFormData(data);
        nextStep(); // This will trigger form submission in FundForm.js
    };

    return (
        <div className="space-y-[45px]">
            <h1 className="text-[24px] font-semibold leading-[32.68px] text-center">
                Step 4: Fundraising Details
            </h1>
            <ProgressTracker step={3} />

            <form onSubmit={handleSubmit(onSubmit)} className="fundraising-form-container flex flex-col gap-5">
                {/* Amount Required */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Amount Required (INR)
                    </label>
                    <input
                        type="number"
                        {...register("totalAmount", { 
                            required: "Amount is required",
                            min: { value: 1, message: "Amount must be at least ₹1" }
                        })}
                        className="form-input"
                    />
                    {errors.totalAmount && (
                        <p className="text-red-500 text-sm mt-1">{errors.totalAmount.message}</p>
                    )}
                </div>

                {/* End Date to Raise Funds */}
                <div>
                    <label className="block text-[#0D42CA] font-medium text-[18px] mb-2">
                        Fundraising Deadline
                    </label>
                    <input
                        type="date"
                        {...register("endDate", { 
                            required: "End date is required",
                            validate: value => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const selectedDate = new Date(value);
                                return selectedDate >= today || "Date must be in the future";
                            }
                        })}
                        className="form-input"
                    />
                    {errors.endDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
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
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FundsNeeded;