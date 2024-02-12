import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import companylogo from './Images/companylogo.jpg';
import companylogo2 from './Images/companylogo2.jpg';
import companylogo3 from './Images/companylogo3.jpg';
import homepagebg from './Images/homepagebg.jpg';

const Homepagesignin = () => {
  const [vendors, setVendors] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      const fetchVendors = async () => {
        try {
          const response = await axios.get('/api/vendor/get/');
          setVendors(response.data);
          console.log(vendors)
        } catch (error) {
          console.error('Error fetching businesses:', error);
        }
      };
  
      fetchVendors();
    }, []);
  
    useEffect(() => {
      // Scroll to the top when the component mounts
      window.scrollTo(0, 0);
    }, []);
    return (
      <div className='py-2'>
      <div className='max-w-[1512px] min-h-[306px] flex items-center justify-center px-0 ' style={{backgroundImage: `url(${homepagebg})`, backgroundSize: 'cover'}}>
          <h1 className='text-4xl font-semibold text-white font-inter text-center leading-10 tracking-tighter'>Home</h1>
      </div>


        <div className="bg-white border-gray-300 border">
        <div className='flex lg:flex-row sm:flex-col ml-4 space-y-4 sm:space-y-0 sm:space-x-4 sm:w-[138px]'>
        <div className='lg:w-[211px] sm:w-[186px]'>
          <div className='h-[40px] mt-4 bg-[#D0D5DD] rounded-lg flex items-center p-4 sm:w-min'>
            <p className='border-gray-200 text-left text-sm font-semibold leading-5 tracking-normal whitespace-nowrap'>
              Vendor Recommendation
            </p>
          </div>
        </div>
  
        <Link to="../bids" className='lg:w-[180px] sm:w-[180px] sm:ml-0 m:w-min'>
          <div className='h-[40px] mt-4 bg-[#D0D5DD] rounded-lg flex items-center p-4 text-left sm:ml-0'>
            <p className='border-gray-200 text-left text-sm font-semibold leading-5 tracking-normal whitespace-nowrap'>
              Bids and Opportunities
            </p>
          </div>
        </Link>
      </div>
   <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200  sm:mt-16  lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {vendors.map((vendors) => (
              <article className="flex max-w-xl border-gray-300 border rounded-md p-4 flex-col items-start justify-between">
                <div className="group relative">
           
                <Link to={`/vendorrecomendationdetail/${vendors._id}`}>
                  <div className='flex'>
                    <h3 className="mt-3 text-lg text-left font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href="#">
                        <span className="flex inset-0 text-left"></span>
                        {vendors.vendorName}
                      </a>
                    </h3>
                  </div>
  
                  <p className="mt-5 line-clamp-3 text-left text-sm leading-7 text-gray-600" style={{ lineHeight: '1.6' }}>
                  {vendors.description}
                  </p>
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-[#0E214B] w-full mt-4 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Explore services
                  </button>
                  </Link>
                    
                </div>
              </article>
                ))}
            </div>
          </div>
        </div>
        <button
          className=" md:min-w-[213px] max-h-[48px] items-center p-2 sm:my-4 border border-[#0E214B] bg-white text-[#344054] rounded-md"
        >
          See more features
        </button>
      </div>
    );
  };
  
export default Homepagesignin;

