import React from 'react';

const ProgressTracker = ({ step }) => {
    const steps = [
        { number: 1, label: 'Patient Details' },
        { number: 2, label: 'Treatment Details' },
        { number: 3, label: 'Fundraising' }
    ];

    return (
        <div className="w-full flex justify-between items-center relative">
            {/* Progress line */}
            <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0">
                <div 
                    className="h-1 bg-blue-600 transition-all duration-300" 
                    style={{ 
                        width: `${((step - 1) / (steps.length - 1)) * 100}%` 
                    }}
                ></div>
            </div>
            
            {steps.map((item) => (
                <div key={item.number} className="flex flex-col items-center z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                        ${step >= item.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {item.number}
                    </div>
                    <span className={`text-xs mt-2 ${step >= item.number ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ProgressTracker;