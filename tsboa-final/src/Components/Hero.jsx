import React from 'react';
import heroImage from './Images/hero-image.jpg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="overflow-hidden bg-[#F9FAFB]">
      <div className="mx-auto max-w-[1512px] lg:px-8">
        {/* Mobile View */}
        <div className="lg:hidden px-4">
          <div className="text-left my-20">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">Empowering Business Owners in the Political </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">Your Gateway to Informed Decision-Making and Active Participation.</p>
          
            <div className="flex w-full h-[48px] gap-4 mt-3">
              <Link to="/membership">
              <button
                className="flex-1 p-[12px, 18px, 12px, 18px] border  border-[#0E214B] bg-[#0E214B] text-white rounded-md"
              >
                Join Now
              </button>
              </Link>
            </div>
          </div>
          <img src={heroImage} alt="meeting-picture" className="w-full h-96 object-cover mt-6 rounded-xl shadow-xl ring-1 ring-gray-400/10" />
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:gap-y-20">
          <div className="flex flex-col justify-center items-center lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg text-left">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Empowering Business Owners in the Political Arena </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">Your Gateway to Informed Decision-Making and Active Participation.</p>
          
              <div className="flex w-[480px] h-[48px] gap-16">
                <button
                  className="w-[112px] max-h-[48px] p-[12px, 18px, 12px, 18px] mt-4 border border-[#0E214B] bg-[#0E214B] text-white rounded-md"
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
          <img src={heroImage} alt="meeting-picture" className="w-full h-720px max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 object-cover" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
