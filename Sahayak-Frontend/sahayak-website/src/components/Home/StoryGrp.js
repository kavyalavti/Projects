import React from 'react';

const StoryGrp = ({ campaign }) => {
    const progressPercentage = campaign.totalAmount
        ? Math.min((campaign.amountRaised / campaign.totalAmount) * 100, 100)
        : 0;

    return (
        <div
            className="bg-[rgba(238,247,255,1)] rounded-[5px] min-h-[300px] cursor-pointer"
            onClick={() => window.open(`campaign/public/${campaign.campaignUrl}`, '_blank')}
        >
            <div className="p-6 pb-4">
                <img
                    src={campaign.coverImagePath || '/path/to/default/image.svg'}
                    className="rounded-[10px] w-full h-[200px] object-cover"
                    alt={campaign.patientName || 'Campaign Image'}
                />
            </div>

            <div className="px-4 pb-5 space-y-4 -mt-2">
                <h2 className="text-[16px] leading-[22px] font-semibold text-[rgb(43,43,43,1)]">
                    {campaign.description || 'Support the cause'}
                </h2>

                <div className="grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-8 text-[10px] leading-[14px] text-gray-700">
                    <p>
                        <span className="font-semibold">{campaign.amountRaised || 0}</span> of {campaign.totalAmount || 0}
                    </p>

                    <p>
                        <span className="font-semibold">Created On:</span> {campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString() : 'N/A'}
                    </p>

                    <div className="col-span-2">
                        <p>Donation Progress</p>
                        <div className="bg-gray-300 rounded-full w-full h-2.5">
                            <div
                                className="bg-green-500 h-2.5 rounded-full"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryGrp;
