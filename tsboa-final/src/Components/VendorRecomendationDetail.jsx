import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

const VendorRecomendationDetail = () => {
  
  const navigate = useNavigate();
  const params = useParams();
  const [vendors, setVendors] =useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchVendorsDetails = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`/api/vendor/get/${params.vendorsId}`);
        const data = response.data;

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setVendors(data); 

        setLoading(false);
      } catch (error) {
        console.error('Error fetching business details:', error);
        setError(true);
        setLoading(false);
      }
    };
    fetchVendorsDetails();
    window.scrollTo(0, 0);
  }, [params.vendorsId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading vendor details</p>;
  }

  if (!vendors) {
    return <p>No vendor found</p>;
  }


  return (
    <div className='py-4 px-4'>

      {vendors && vendors.data.imageUrls.length > 0 && (
      <img 
        src={vendors.data.imageUrls[0]} 
        alt={`Business Image`} 
        className='w-full h-[400px] object-cover rounded-3xl' 
      />
    )}

      <div>
        <div className='flex justify-between items-center py-4'>
      <h1 className=' text-3xl font-semibold  text-36 leading-44 tracking-tight text-left'>{vendors && vendors.data.vendorName} </h1>
      <div className='min-w-[250px] h-6 flex items-center' ><CiLocationOn /> <p>{vendors && vendors.data.location}</p> <span className='ml-2'>
             
            </span>
            </div>
      
      </div>
      <p className='text-left'>
      {vendors && vendors.data.description}
      </p>
      </div>
      <div>
        <h2 className='text-4xl py-6 font-semibold font-inter leading-15 tracking-tighter text-left'>Services</h2>
      </div>
     
     {/* Service Cards */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.data.services.map((service, index) => (
          <div key={index} className="max-w-[653px] min-h-[176px] p-2 border border-gray-300 rounded-lg flex gap-2">
            {/* Image */}
            <div className="w-[200px] h-[144px] rounded-8"> <img src={service.serviceImageUrls[0]} alt="" /> </div>

            {/* Content */}
            <div className="max-w-[401px] min-h-[138px] text-left flex flex-col gap-2">
              <h2 className="text-md font-semibold">{service.name}</h2>
              <p className="text-md font-normal">{service.description}</p>
              <div className="flex items-center">
                {/* Render your star rating component here */}
                <span className="ml-1">${service.price}</span>
              </div>
              {/* Render additional service information as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VendorRecomendationDetail
