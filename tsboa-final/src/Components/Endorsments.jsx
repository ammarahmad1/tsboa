import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";

import axios from 'axios';

const Endorsments = () => {
  const [endorsements, setEndorsements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchEndorsements = async () => {
      try {
        const response = await axios.get('/api/endorsment/get');
        const data = response.data;
        if (data.success === false) {
          console.log(data.message);
          // Handle error if needed
          return;
        }
        setEndorsements(data || []);
      } catch (error) {
        console.error('Error fetching endorsements:', error);
        // Handle error if needed
      }
    };

    // Call the fetchEndorsements function
    fetchEndorsements();
  }, []);

  return (
    <div className=' py-8'>
        <div className='max-w-[1512px] min-h-[306px] bg-[#F2F4F7] flex items-center justify-center px-0 gap-12'>
        <h1 className='text-4xl font-semibold font-inter text-center leading-10 tracking-tighter'>Endorsements</h1>

        
      </div>
      <div className='mt-4 px-4 items-left  '>
      <label htmlFor="email-address" className="sr-only">
      <CiSearch />filter by zip code
        </label>
        <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-w-[300px] flex-auto rounded-md border-2 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:py-1  sm:leading-6 @media(min-width:300px){py-2}"
            placeholder=" filter by zip code"
        />
        <button
            type="submit"
            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm sm:mt-4 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
            Search
        </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 px-4 gap-8 mt-10">
  {endorsements.map((endorsement, index) => (
    <Link to={`/endorsmentdetail/${endorsement._id}`} key={index} className="w-full bg-white p-3 border border-gray flex-none rounded-lg overflow-hidden">
      {/* Event Image */}
      <div className="w-full h-[240px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${endorsement.imageUrls})` }}>
      </div>
      {/* Event Details */}
      <div className="py-2 gap-4 text-left">
        {/* Endorsement Name */}
        <h2 className="text-lg font-semibold">{endorsement.endorsmentName}</h2>
        <p className="text-sm py-1">
          {endorsement.designation}
        </p>
        {/* Endorsement Feedback */}
        <p className="text-sm font-semibold py-1">
          "{endorsement.feedback}"
        </p>
        {/* Endorsement for */}
        <h3 className="text-lg font-semibold">Endorsement for:</h3>
        <div className='flex items-center'>
          <img src={endorsement.logo} className='w-[48px] h-[48px]' alt="" />
          <p className='font-inter text-md font-semibold leading-6 text-left ml-2'>{endorsement.endorsmentFor}</p>
        </div>
      </div>
    </Link>
  ))}      
        </div>
   
    </div>
  )
}

export default Endorsments
