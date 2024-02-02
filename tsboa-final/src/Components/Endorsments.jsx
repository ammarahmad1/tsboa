import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import companylogo from './Images/companylogo.jpg';
import companylogo2 from './Images/companylogo2.jpg';
import companylogo3 from './Images/companylogo3.jpg';
import endorsmentthumbnail1 from './Images/endorsmentthumbnail.jpg';
import endorsmentthumbnail2 from './Images/endorsmentthumbnail1.jpg';
import endorsmentthumbnail3 from './Images/endorsmentthumbnail2.jpg';
import endorsmentthumbnail4 from './Images/endorsmentthumbnail3.jpg';


const Endorsments = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
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
        <Link to="/newsdetail" className="w-full bg-white p-3 border border-gray flex-none rounded-lg overflow-hidden">
        {/* Event Image */}
        <div className="w-full h-[240px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${endorsmentthumbnail1})` }}>
          
        </div>
        {/* Event Details */}
        <div className="py-2 gap-4 text-left">
          {/* Event Name */}
          <h2 className="text-lg font-semibold">— Odio orci vulputate sit arcu</h2>
          <p className="text-sm py-1">
            Head of Design, Layers
          </p>
          
          {/* Event Information */}
          <p className="text-sm font-semibold py-1">
            “Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.”   
          </p>
          <h3 className="text-lg font-semibold"> Endorsement for: </h3>
          <div className='flex items-center'>
            <img src={companylogo} className='w-[48px] h-[48px]' alt="" />
            <p className='font-inter text-md font-semibold leading-6 text-left ml-2'>Furniture service</p>
          </div>
        </div>
      </Link>
        {/*News Card2 */}
        <Link to="/endorsmentdetail" className="w-full bg-white p-3 border border-gray flex-none rounded-lg overflow-hidden " >
          {/* Event Image */}
          <div className="w-full h-[240px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${endorsmentthumbnail2})` }}>
            
          </div>
          {/* Event Details */}
          <div className="py-2 gap-4 text-left">
            {/* Event Name */}
            <h2 className="text-lg font-semibold">— Odio orci vulputate sit arcu</h2>
            <p className="text-sm py-1">
            Head of Design, Layers
            </p>
            
            {/* Event Information */}
            <p className="text-sm font-semibold py-1">
            “Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.”   
            </p>
            <h3 className="text-lg font-semibold"> Endorsment for: </h3>
            <div className='flex items-center'>
            <img src={companylogo2} className='w-[48px] h-[48px]' alt="" />
            <p className='font-inter text-md font-semibold leading-6 text-left ml-2'>Furniture service</p>
          </div>
          </div>
        
        </Link>

        {/*News Card3 */}
        <Link to="/endorsmentdetail" className="w-full bg-white p-3 border border-gray flex-none rounded-lg overflow-hidden " >
          {/* Event Image */}
          <div className="w-full h-[240px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${endorsmentthumbnail3})` }}>
            
          </div>
          {/* Event Details */}
          <div className="py-2 gap-4 text-left">
            {/* Event Name */}
            <h2 className="text-lg font-semibold">— Odio orci vulputate sit arcu</h2>
            <p className="text-sm py-1">
            Head of Design, Layers
            </p>
            
            {/* Event Information */}
            <p className="text-sm font-semibold py-1">
            “Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.”   
            </p>
            <h3 className="text-lg font-semibold"> Endorsment for: </h3>
            <div className='flex items-center'>
            <img src={companylogo3} className='w-[48px] h-[48px]' alt="" />
            <p className='font-inter text-md font-semibold leading-6 text-left ml-2'>Furniture service</p>
          </div>
          </div>
        
        </Link>

        {/*News Card4 */}
        <Link to="/endorsmentdetail" className="w-full bg-white p-3 border border-gray flex-none rounded-lg overflow-hidden " >
          {/* Event Image */}
          <div className="w-full h-[240px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${endorsmentthumbnail4})` }}>
            
          </div>
          {/* Event Details */}
          <div className="py-2 gap-4 text-left">
            {/* Event Name */}
            <h2 className="text-lg font-semibold">— Odio orci vulputate sit arcu</h2>
            <p className="text-sm py-1">
            Head of Design, Layers
            </p>
            
            {/* Event Information */}
            <p className="text-sm font-semibold py-1">
            “Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.”   
            </p>
            <h3 className="text-lg font-semibold"> Endorsment for: </h3>
            <div className='flex items-center'>
            <img src={companylogo2} className='w-[48px] h-[48px]' alt="" />
            <p className='font-inter text-md font-semibold leading-6 text-left ml-2'>Furniture service</p>
          </div>
          </div>
        
        </Link>

        {/*News Card5 */}
        <Link to="/endorsmentdetail" className="w-full bg-white p-3 border border-gray flex-none rounded-lg overflow-hidden " >
          {/* Event Image */}
          <div className="w-full h-[240px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${endorsmentthumbnail3})` }}>
            
          </div>
          {/* Event Details */}
          <div className="py-2 gap-4 text-left">
            {/* Event Name */}
            <h2 className="text-lg font-semibold">— Odio orci vulputate sit arcu</h2>
            <p className="text-sm py-1">
            Head of Design, Layers
            </p>
            
            {/* Event Information */}
            <p className="text-sm font-semibold py-1">
            “Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.”   
            </p>
            <h3 className="text-lg font-semibold"> Endorsment for: </h3>
            <div className='flex items-center'>
            <img src={companylogo} className='w-[48px] h-[48px]' alt="" />
            <p className='font-inter text-md font-semibold leading-6 text-left ml-2'>Furniture service</p>
          </div>
          </div>
        
        </Link>

        {/*News Card6 */}
        <Link to="/endorsmentdetail" className="w-full bg-white p-3 border border-gray flex-none rounded-lg overflow-hidden " >
          {/* Event Image */}
          <div className="w-full h-[240px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${endorsmentthumbnail2})` }}>
            
          </div>
          {/* Event Details */}
          <div className="py-2 gap-4 text-left">
            {/* Event Name */}
            <h2 className="text-lg font-semibold">— Odio orci vulputate sit arcu</h2>
            <p className="text-sm py-1">
            Head of Design, Layers
            </p>
            
            {/* Event Information */}
            <p className="text-sm font-semibold py-1">
            “Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.”   
            </p>
            <h3 className="text-lg font-semibold"> Endorsment for: </h3>
            <div className='flex items-center'>
            <img src={companylogo3} className='w-[48px] h-[48px]' alt="" />
            <p className='font-inter text-md font-semibold leading-6 text-left ml-2'>Furniture service</p>
          </div>
          </div>
        
        </Link>
        
        </div>
        <button
        className=" md:min-w-[213px] max-h-[48px] items-center p-2 sm:my-4 border border-[#0E214B] bg-white text-[#344054] rounded-md"
      >
        See more features
      </button>
    </div>
  )
}

export default Endorsments
