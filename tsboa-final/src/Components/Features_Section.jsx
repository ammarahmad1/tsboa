import React, { useEffect, useState } from 'react';
import keyfeatures from './Images/key_features.jpg';
import market_insights from './Images/market_insights.jpg';
import { Link } from 'react-router-dom';
import policy_updates from './Images/policy_updates.jpg';
import Loading from './Loading';
import heroImage from './Images/hero-image.jpg';
import axios from 'axios';

const Features_Section = () => {
  const [loading, setLoading] = useState(true);
  const [homepage, setHomepage] = useState([]);

  useEffect(() => {
     window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const response = await axios.get('/api/homepage/get');
        console.log(response)
        const data = response.data;
        if (data.success === false) {
          console.log(data.message);
          return;
        }

        setHomepage(data || []);
      
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchHomepage();
  }, []);

  return (
    <section className=''>
    {homepage.map((homepage, index) => (
    <div className="max-w-[1512px]  mx-auto relative mt-800px py-8 md:h-min-[3000px] gap-96 p-[25px]">

    <div className="overflow-hidden mb-4 bg-[#F9FAFB]">
      <div className="mx-auto max-w-[1512px] lg:px-8">
        {/* Mobile View */}
        <div className="lg:hidden px-4">
          <div className="text-left my-20">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">{homepage.firstsectionHeading} </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">{homepage.firstsectiontext}</p>
          
            <div className="flex w-full h-[48px] gap-4 mt-3">
              <Link to={homepage.firstsectionlink}>
              <button
                className="flex-1 p-[12px, 18px, 12px, 18px] border  border-[#0E214B] bg-[#0E214B] text-white rounded-md"
              >
                Join Now
              </button>
              </Link>
            </div>
          </div>
          <img src={homepage.firstimageUrls} alt="meeting-picture" className="w-full h-96 object-cover mt-6 rounded-xl shadow-xl ring-1 ring-gray-400/10" />
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:gap-y-20">
        
          <div className="flex flex-col justify-center items-center lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg text-left">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{homepage.firstsectionHeading}</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">{homepage.firstsectiontext}</p>
          
              <div className="flex w-[480px] h-[48px] gap-16">
              <Link to={homepage.firstsectionlink}>
                <button
                  className="flex-1 p-[12px, 18px, 12px, 18px] border h-[35px] w-[150px]  border-[#0E214B] bg-[#0E214B] text-white rounded-md"
                >
                  Join Now
                </button>
              </Link>
              </div>
            </div>
          </div>
      
          <img src={homepage.firstimageUrls} alt="meeting-picture" className="w-full h-720px max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 object-cover" />
        </div>
      </div>
    </div>
    
    <section className="min-h-[400px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 py-10  mt-400px ">
    
    <div className="flex flex-col justify-center text-left gap-4 p-10 sm:p-0 md:text-left md:py-2">
    
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
      {homepage.secondsectionHeading}
      </h2>
      <p className="text-base sm:text-lg lg:text-xl">
      {homepage.secondsectiontext}
      </p>
      <Link
      to={homepage.secondsectionlink}
     
    >     <button className="w-[128px] min-h-[48px] p-[12px, 18px, 12px, 18px] mt-4 border border-[#0E214B] bg-[#0E214B] text-white rounded-md">
        Learn more
      </button>
      </Link>
    </div>

    {/* Right Picture */}
    <div className="w-full h-full gap-4 p-8 sm:p-0">
    
      <img
        src={homepage.secondimageUrls} 
        alt="Discover Image"
        className="w-full h-full object-cover rounded-md sm:p-0 sm:h-[400px] sm:w-[full]"
      />
    </div>
  </section> 
    <section className="min-h-[400px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 py-10 mt-400px">
      {/* Left Picture */}
      <div className=" gap-4 p-8 sm:p-0">
        {/* Replace 'your-image-path.jpg' with the actual path of your image */}
        <img
          src={homepage.thirdimageUrls} 
          alt="Discover Image"
          className="object-cover rounded-md  sm:p-0 sm:h-[400px] sm:w-[full]"
        />
      </div>

      {/* Right Column */}
      <div className="flex flex-col justify-center text-left gap-4 sm:p-0 p-8 md:text-left md:py-10">
        <h2 className="text-xl sm:text-2xl md:px´l md:text-3xl lg:text-4xl font-semibold">
           {homepage.thirdsectionHeading}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl">
        {homepage.thirdsectiontext}
        </p>
        <Link
      to={homepage.thirdsectionlink}
     
    >     <button className="w-[128px] min-h-[48px] p-[12px, 18px, 12px, 18px] mt-4 border border-[#0E214B] bg-[#0E214B] text-white rounded-md">
        Learn more
      </button>
      </Link>
      </div>
    </section>
    <section className="min-h-[400px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-0 md:py-10 mt-400px">
 
    <div className="flex flex-col justify-center text-left gap-4 p-10  md:text-left sm:p-0">
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
    {homepage.fourthsectionHeading}
      </h2>
      <p className="text-base sm:text-lg lg:text-xl">
      {homepage.fourthsectiontext}
      </p>
      <Link
      to={homepage.fourthsectionlink}
     
    >     <button className="w-[128px] min-h-[48px] p-[12px, 18px, 12px, 18px] mt-4 border border-[#0E214B] bg-[#0E214B] text-white rounded-md">
        Learn more
      </button>
      </Link>
    </div>

    {/* Right Picture */}
    <div className=" gap-4 p-8 sm:p-0 ">
    
      <img
        src={homepage.fourthimageUrls} 
        alt="Discover Image"
        className="object-cover rounded-md  sm:p-0 sm:h-[400px] sm:w-[full] "
      />
    </div>
  </section> 



     </div>
      ))}
     </section>
  )
}

export default Features_Section
