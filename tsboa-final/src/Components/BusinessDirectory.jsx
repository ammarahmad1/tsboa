import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import businessdir from './Images/businessdir.jpg'
import axios from 'axios'; 

const BusinessDirectory = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('/api/business/get');
        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  }, []);
  return (
    <div className='py-2'>
      <div className='max-w-[1512px] min-h-[306px] bg-[#F2F4F7] flex items-center justify-center px-0  '>
        <h1 className='text-4xl font-semibold font-inter text-center leading-10 tracking-tighter'>Business Directory</h1>
      </div>
      <div className='py-2 px-4'>
        <label htmlFor="search-input" className="sr-only">
          Search for Businesses
        </label>
        <div className="flex items-center space-x-2">
          <input
            id="search-input"
            name="searchQuery"
            type="text"
            autoComplete="off"
            className="flex-auto max-w-[300px] rounded-md border-2 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Search for events/venue/artists"
          />
          <button
            type="submit"
            className="flex-none min-w-[64px] rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Search
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10'>
        {businesses.map((business) => (
          <Link to={`/businessdirectorydetails/${business._id}`} key={business._id} className='w-full bg-white flex-none rounded-lg overflow-hidden'>
            {/* Business Image */}
            <div
              className='w-full h-[144px] bg-cover bg-center rounded-t-lg'
              style={{
                backgroundImage: `url(${businessdir})`,
                width: '388px',
                height: '144px',
                borderRadius: '8px',
              }}
            ></div>

            <div className='p-4 gap-4 text-left'>
              <h2 className='text-lg font-semibold'>{business.businessName}</h2>
              <p className='text-lg'>{business.description}</p>

              <p className='text-sm py-2'>
                <div className='flex'><CiLocationOn /> Location: {business.location}</div>
                <div className='flex'><MdOutlineEmail /> Email: {business.email}</div>
                <div className='flex'><IoIosCall /> Number: {business.number}</div>
              </p>
            </div>
          </Link>
        ))}
      </div>
        </div>
    </div>
  )
}

export default BusinessDirectory
