import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import busdir from './Images/busdir.jpg';
import imagebusiness from './Images/imagebusiness.jpg';
import businessdirlogo from './Images/businessdirlogo.png';
import businessdirlogo2 from './Images/businessdirlogo2.png';
import businessdirlogo3 from './Images/businessdirlogo3.png';

const BusinessDirectoryDetails = () => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        setLoading(true);

        // Fetch business details using Axios or your preferred method
        const response = await axios.get(`/api/business/get/${params.businessId}`);
        const data = response.data;

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setBusiness(data); // Assuming business is the key containing your business details

        setLoading(false);
      } catch (error) {
        console.error('Error fetching business details:', error);
        setError(true);
        setLoading(false);
      }
    };

    // Call the fetchBusinessDetails function
    fetchBusinessDetails();

    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, [params.businessId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading business details</p>;
  }

  if (!business) {
    return <p>No business found</p>;
  }

  return (
    <div className='lg:px-0 lg:py-0 sm:px-2'>
      <div className='max-w-[1340px] h-[320px] overflow-hidden mx-auto relative'>
        {/* Background Image */}
        {business && business.data.imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Business Image ${index}`} className='w-full h-[800px] object-cover rounded-3xl' />
        ))}
      </div>
      <div className=' p-6 text-white text-left sm:min-h-[274px]'>
        <h1 className='text-lg text-black lg:w-[1308px] sm:w-[243px] font-semibold font-inter text-left tracking-tighter '>
          {business && business.data.businessName}
        </h1>
        <p className='text-black mt-4'>
          {business && business.data.description}
        </p>
      </div>
      <div className='py-6 px-3 bg-[#F2F4F7]'>
        <div className='items-center '>
          <button className='p-2 min-w-50  h-10 border border-[#0E214B] bg-[#F9F5FF] font-normal rounded-lg'>Contact Us</button>
          <h2 className='text-xl font-bold p-4'>We’d love to hear from you</h2>
          <p className='pt-2'>Chat to our friendly team.</p>
        </div>
        <div className='p-6'>
          {business && business.data.imageUrls.length > 1 && (
            <img src={business.data.imageUrls[1]} alt={`Second Business Image`} className='w-[1216px] h-[480px] rounded-3xl' />
          )}
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 sm:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article className="flex max-w-xl border-gray-300 border rounded-md p-4 flex-col items-start justify-between">
            <div className="group relative">
              <div className='flex'>
                <h3 className="mt-3 text-lg text-left font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="flex inset-0 text-left"></span>
                    <img src={businessdirlogo} alt="" className="mr-2 pb-6"/> Chat to sales
                  </a>
                </h3>
              </div>
              <p className="mt-5 line-clamp-3 text-left text-sm leading-7 text-gray-600" style={{ lineHeight: '1.6' }}>
                Speak to our friendly team.
              </p>
              <p className='line-clamp-3 text-left text-sm leading-7 text-black font-semibold'>
                {business && business.data.email}
              </p>
            </div>
          </article>

          <article className="flex max-w-xl border-gray-300 border rounded-md p-4 flex-col items-start justify-between">
            <div className="group relative">
              <div className='flex'>
                <h3 className="mt-3 text-lg text-left font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="/vendorrecomendationdetail">
                    <span className="flex inset-0 text-left"></span>
                    <img src={businessdirlogo2} alt="" className="mr-2 pb-6" /> Visit us
                  </a>
                </h3>
              </div>
              <p className="mt-5 line-clamp-3 text-left text-sm leading-7 text-gray-600" style={{ lineHeight: '1.6' }}>
                Visit our office HQ.
              </p>
              <p className='line-clamp-3 text-left text-sm leading-7 text-black font-semibold'>
                {business && business.data.location}
              </p>
            </div>
          </article>
          <article className="flex max-w-xl border-gray-300 border rounded-md p-4 flex-col items-start justify-between">
            <div className="group relative">
              <div className='flex'>
                <h3 className="mt-3 text-lg text-left font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="flex inset-0 text-left"></span>
                    <img src={businessdirlogo3} alt="" className="mr-2 pb-6" /> Call us
                  </a>
                </h3>
              </div>
              <p className="mt-5 line-clamp-3 text-left text-sm leading-7 text-gray-600" style={{ lineHeight: '1.6' }}>
                Mon-Fri from 8am to 5pm.
              </p>
              <p className='line-clamp-3 text-left text-sm leading-7 text-black font-semibold'>
                {business && business.data.phoneNumber}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default BusinessDirectoryDetails;
