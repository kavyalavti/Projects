import React from 'react';
import Plus from '../../assets/PlusIcon.svg';
import Minus from '../../assets/MinusIcon.svg';
import { useState, useEffect } from 'react';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
    const [trim, setTrim] = useState(false);
  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 590) {
        setTrim(true);
      } else {
        setTrim(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="py-[105px] bg-gray-50">
      <div className="w-[90%] sm:w-[70%] md:w-[60%] mx-auto space-y-[33px] faq-main-container">
        <h1 className="font-bold text-[36px] text-[#003199] text-center leading-tight">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {/* FAQ 1 */}
          <div
            onClick={() => handleToggle(0)}
            className="cursor-pointer rounded-[10px] flex justify-between bg-white p-6 shadow-md transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <p className="font-bold text-[24px] text-[#3b5998]">
              What is Crowdfunding for Medical Causes?
            </p>
            <img
              src={activeIndex === 0 ? Minus : Plus}
              alt="Toggle Icon"
              width="20.48px"
              height="18.84px"
            />
          </div>
          {activeIndex === 0 && (
            <div className="bg-white p-4 rounded-b-[10px] shadow-md">
              <p className="font-normal text-[18px] text-gray-700 leading-[1.6]">
                Crowdfunding for medical causes allows individuals to raise
                funds for urgent medical treatments, surgeries, or health-related
                emergencies. It provides a platform where people can contribute
                towards a person’s medical expenses, easing the financial burden on
                patients and their families.
              </p>
            </div>
          )}

          {/* FAQ 2 */}
          <div
            onClick={() => handleToggle(1)}
            className="cursor-pointer rounded-[10px] flex justify-between bg-white p-6 shadow-md transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <p className="font-bold text-[24px] text-[#3b5998]">
              Is Crowdfunding Legal in India?
            </p>
            <img
              src={activeIndex === 1 ? Minus : Plus}
              alt="Toggle Icon"
              width="20.48px"
              height="18.84px"
            />
          </div>
          {activeIndex === 1 && (
            <div className="bg-white p-4 rounded-b-[10px] shadow-md">
              <p className="font-normal text-[18px] text-gray-700 leading-[1.6]">
                Yes, online donation-based crowdfunding for social, medical, and
                personal causes is completely legal in India. The Securities and
                Exchange Board of India (SEBI) considers all forms of crowdfunding
                legal in India except for equity crowdfunding. Some crowdfunding
                organizations are even registered under the Income Tax Act as
                charitable trusts, and contributions are eligible for tax deductions
                under Section 80G.
              </p>
            </div>
          )}

          {/* FAQ 3 */}
          <div
            onClick={() => handleToggle(2)}
            className="cursor-pointer rounded-[10px] flex justify-between bg-white p-6 shadow-md transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <p className="font-bold text-[24px] text-[#3b5998]">
              How Do I Create a Fundraiser for Medical Treatment?
            </p>
            <img
              src={activeIndex === 2 ? Minus : Plus}
              alt="Toggle Icon"
              width="20.48px"
              height="18.84px"
            />
          </div>
          {activeIndex === 2 && (
            <div className="bg-white p-4 rounded-b-[10px] shadow-md">
              <p className="font-normal text-[18px] text-gray-700 leading-[1.6]">
                To create a fundraiser, you need to sign up on our platform,
                provide details about the medical condition, treatment requirements,
                and the amount needed. After creating the campaign, you can share
                the fundraiser with friends, family, and supporters through social
                media and email to gather contributions.
              </p>
            </div>
          )}

          {/* FAQ 4 */}
          <div
            onClick={() => handleToggle(3)}
            className="cursor-pointer rounded-[10px] flex justify-between bg-white p-6 shadow-md transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <p className="font-bold text-[24px] text-[#3b5998]">
              Is My Donation Tax-Deductible?
            </p>
            <img
              src={activeIndex === 3 ? Minus : Plus}
              alt="Toggle Icon"
              width="20.48px"
              height="18.84px"
            />
          </div>
          {activeIndex === 3 && (
            <div className="bg-white p-4 rounded-b-[10px] shadow-md">
              <p className="font-normal text-[18px] text-gray-700 leading-[1.6]">
                Yes, donations made to registered medical crowdfunding platforms
                in India are eligible for tax deductions under Section 80G of the
                Income Tax Act, provided the platform is a registered charitable
                trust. Please check with the respective crowdfunding platform for
                details on tax exemptions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
