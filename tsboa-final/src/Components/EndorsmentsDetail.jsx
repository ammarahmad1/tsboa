import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import linkedinicon from './Images/linkedin.png'
import instaicon from './Images/instagram.png'
import twittericon from './Images/twitter.png'
import { CiGlobe } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";

const EndorsmentDetails = () => {
  const [endorsment, setEndorsment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchEndorsmentDetails = async () => {
      try {
        setLoading(true);
    
        const response = await axios.get(`/api/endorsment/get/${params.endorsmentId}`);
        console.log(response);
        const data = response.data.data; 
        console.log(data);
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
    
        setEndorsment(data);
    
        setLoading(false);
      } catch (error) {
        console.error('Error fetching endorsement details:', error);
        setError(true);
        setLoading(false);
      }
    };    
    fetchEndorsmentDetails();
  }, [params.endorsmentId]);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading endorsment details</p>;
  }

  if (!endorsment) {
    return <p>No endorsment found</p>;
  }

  return (
    <div className='px-20 py-8'>
      <div className='flex'>
        <img src={endorsment.imageUrls} className='w-[228px] h-[200px]' alt="" />
        <div className='min-w-[870px] text-left min-h-[56px] pl-4 flex flex-col'>
          <div>
            <h2 className='text-lg font-semibold font-inter text-left leading-7'>{endorsment.endorsmentName}</h2>
          </div>
          <div className='flex items-center space-x-4 mt-3'>
              {endorsment.linkedin && (
                <a href={endorsment.linkedin} target="_blank" rel="noopener noreferrer">
                  <img src={linkedinicon} alt="LinkedIn" />
                </a>
              )}
              {endorsment.insta && (
                <a href={endorsment.insta} target="_blank" rel="noopener noreferrer">
                  <img src={instaicon} alt="Instagram" />
                </a>
              )}
              {endorsment.twitter && (
                <a href={endorsment.twitter} target="_blank" rel="noopener noreferrer">
                  <img src={twittericon} alt="Twitter" />
                </a>
              )}
          </div>

          <p className='text-base font-normal font-inter text-left leading-6'>
                {endorsment.feedback}
          </p>
        </div>
      </div>

      <div className='my-3 py-3 p-3 border border-gray rounded-lg '>
        <h3 className="text-lg font-semibold text-left"> endorsment for: </h3>
        <div className='flex items-center'>
          <img src={endorsment.logo} className='w-[48px] h-[48px]' alt="" />
          <p className='font-inter text-md font-semibold leading-6 text-left ml-2'>{endorsment.endorsmentFor}</p>
        </div>
        <p className='py-5 text-base font-normal font-inter text-left leading-6'>
             {endorsment.description}
        </p>
        <p className=' text-base font-normal font-inter text-left leading-6'>Contact info:</p>

        <div className="flex justify-between p-4">
          <div className='flex items-center'>
            <CiGlobe /> {endorsment.website}
          </div>
          <div className="text-center flex">
            <CiLocationOn /> {endorsment.location}
          </div>
          <div className='flex items-center'>
            <IoIosCall /> {endorsment.phone}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndorsmentDetails;
