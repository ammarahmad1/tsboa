import React from 'react';
import profilepic from './Images/endorsmentthumbnail.jpg';
import companylogo from './Images/companylogo.jpg';
import linkedinicon from './Images/linkedin.png';
import instaicon from './Images/instagram.png';
import twittericon from './Images/twitter.png';
import { CiLocationOn, CiGlobe } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";

const EndorsementsDetail = () => {
  return (
    <div className='px-20 py-8'>
      <div className='flex'>
        <img src={profilepic} className='w-[228px] h-[200px]' alt="" />
        <div className='min-w-[870px] text-left min-h-[56px] pl-4 flex flex-col'>
          <div>
            <h2 className='text-lg font-semibold font-inter text-left leading-7'>John Doe</h2>
            <p>CEO Dilithei</p>
          </div>
          <div className='flex items-center space-x-4 mt-3'>
            <img src={linkedinicon} alt="" />
            <img src={instaicon} alt="" />
            <img src={twittericon} alt="" />
          </div>
          <p className='text-base font-normal font-inter text-left leading-6'>
            Amet velit venenatis a viverra consequat lectus massa venenatis erat. Sed feugiat urna accumsan ultrices
            dui amet. Elit praesent in lorem diam congue. Sem nunc dolor sed sapien iaculis sem eget nisi in. Tempus
            ornare interdum dictum ridiculus fermentum mauris lectus consectetur. Mi ultricies nunc diam donec id
            curabitur bibendum elit semper. Quis nulla nibh in nulla ridiculus feugiat eget in turpis. Sit urna quam
            at aliquet sit. Ullamcorper cras lorem neque in sit.
          </p>
        </div>
      </div>

      <div className='my-3 py-3 p-3 border border-gray rounded-lg '>
        <h3 className="text-lg font-semibold text-left"> Endorsement for: </h3>
        <div className='flex items-center'>
          <img src={companylogo} className='w-[48px] h-[48px]' alt="" />
          <p className='font-inter text-md font-semibold leading-6 text-left ml-2'>Furniture service</p>
        </div>
        <p className='py-5 text-base font-normal font-inter text-left leading-6'>
          Amet velit venenatis a viverra consequat lectus massa venenatis erat. Sed feugiat urna accumsan ultrices
          dui amet. Elit praesent in lorem diam congue. Sem nunc dolor sed sapien iaculis sem eget nisi in. Tempus
          ornare interdum dictum ridiculus fermentum mauris lectus consectetur. Mi ultricies nunc diam donec id
          curabitur bibendum elit semper. Quis nulla nibh in nulla ridiculus feugiat eget in turpis. Sit urna quam
          at aliquet sit. Ullamcorper cras lorem neque in sit.
        </p>
        <p className=' text-base font-normal font-inter text-left leading-6'>Contact info:</p>

        <div className="flex justify-between p-4">
          <div className='flex items-center'>
            <CiGlobe />sales.com
          </div>
          <div className="text-center flex">
            <CiLocationOn />Posuere ut magna a id dui amet sit risus.
          </div>
          <div className='flex items-center'>
            <IoIosCall />+1 90xx033x9
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndorsementsDetail;
