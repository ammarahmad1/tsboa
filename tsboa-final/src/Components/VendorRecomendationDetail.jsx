import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import headervendor from './Images/Headervendor.jpg';
import servicepic from './Images/servicepic.jpg';
import StarRating from './StarRating'; 
import vendorthumbnail from './Images/vendorthumbnail.jpg';
import vendorthumbnail2 from './Images/vendorthumbnail2.jpg';
import vendorthumbnail3 from './Images/vendorthumbnail3.jpg';


const VendorRecomendationDetail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='py-4 px-4'>
      <img src={headervendor} alt="" />
      <div>
        <div className='flex justify-between items-center py-4'>
      <h1 className=' text-3xl font-semibold  text-36 leading-44 tracking-tight text-left'>Mandila Furniture</h1>
      <div className='min-w-[250px] h-6 flex items-center' ><CiLocationOn /> <p>Carlton VIC</p> <span className='ml-2'>
              <StarRating rating={4.7} />
            </span>
            <span className='ml-1'>({4.7})</span> </div>
      
      </div>
      <p className='text-left'>
      Turpis quis eget ultrices pharetra felis in diam id. Blandit aliquet cum proin cum orci. Praesent phasellus ipsum ut pharetra lobortis suscipit. Aliquet rhoncus consequat rhoncus parturient gravida massa nunc eu. Mauris eget massa semper neque nulla. At tellus nisi ultricies sit eget tincidunt. Amet accumsan est ut mi amet fusce. Neque nisl tellus velit sagittis et eget nunc fermentum lobortis. Pharetra id aliquet feugiat habitasse. Nunc dui adipiscing lobortis eu elementum id malesuada condimentum sed. Posuere turpis nulla ornare at dictum lacus.
<br></br> <br></br> Non phasellus elit lectus non. Consequat et porttitor elit in tellus velit tellus. Ut rutrum hac at commodo ut at a. Neque sit enim lectus lectus mi. Neque imperdiet enim augue nunc commodo.
<br></br> <br></br> Eleifend consequat tellus scelerisque lobortis amet volutpat. In congue sed aliquam vulputate turpis leo malesuada. A feugiat vivamus sem et amet viverra.
      </p>
      </div>
      <div>
        <h2 className='text-4xl py-6 font-semibold font-inter leading-15 tracking-tighter text-left'>Services</h2>
      </div>
     
     {/* Service Cards */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     <div className="max-w-[653px] min-h-[176px] p-2 border border-gray-300 rounded-lg flex gap-2">
      {/* Image */}
      <div className="w-[200px] h-[144px] rounded-8"> <img src={vendorthumbnail} alt="" /> </div>

      {/* Content */}
      <div className="max-w-[401px] min-h-[138px]  text-left  flex flex-col gap-2">
        <h2 className="text-md font-semibold">Beds</h2>
        <p className="text-md font-normal">Custom Queen Size bed designs</p>
        <div className="flex items-center">
         <StarRating rating={4.7} />
          <span className="ml-1">({4.7})</span>
        </div>
        <p className="text-md font-normal">$490 AUD total</p>
      </div>
    </div>

    <div className="max-w-[653px] min-h-[176px] p-2 border border-gray-300 rounded-lg flex gap-2">
      {/* Image */}
      <div className="w-[200px] h-[144px] rounded-8"> <img src={vendorthumbnail2} alt="" /> </div>

      {/* Content */}
      <div className="max-w-[401px] min-h-[138px]  text-left  flex flex-col gap-2">
        <h2 className="text-md font-semibold">Beds</h2>
        <p className="text-md font-normal">Custom Queen Size bed designs</p>
        <div className="flex items-center">
         <StarRating rating={4.7} />
          <span className="ml-1">({4.7})</span>
        </div>
        <p className="text-md font-normal">$490 AUD total</p>
      </div>
    </div>

    <div className="max-w-[653px] min-h-[176px] p-2 border border-gray-300 rounded-lg flex gap-2">
      {/* Image */}
      <div className="w-[200px] h-[144px] rounded-8"> <img src={vendorthumbnail3} alt="" /> </div>

      {/* Content */}
      <div className="max-w-[401px] min-h-[138px]  text-left  flex flex-col gap-2">
        <h2 className="text-md font-semibold">Beds</h2>
        <p className="text-md font-normal">Custom Queen Size bed designs</p>
        <div className="flex items-center">
         <StarRating rating={4.7} />
          <span className="ml-1">({4.7})</span>
        </div>
        <p className="text-md font-normal">$490 AUD total</p>
      </div>
    </div>

     <div className="max-w-[653px] min-h-[176px] p-2 border border-gray-300 rounded-lg flex gap-2">
      {/* Image */}
      <div className="w-[200px] h-[144px] rounded-8"> <img src={vendorthumbnail} alt="" /> </div>

      {/* Content */}
      <div className="max-w-[401px] min-h-[138px]  text-left  flex flex-col gap-2">
        <h2 className="text-md font-semibold">Beds</h2>
        <p className="text-md font-normal">Custom Queen Size bed designs</p>
        <div className="flex items-center">
         <StarRating rating={4.7} />
          <span className="ml-1">({4.7})</span>
        </div>
        <p className="text-md font-normal">$490 AUD total</p>
      </div>
    </div>

    <div className="max-w-[653px] min-h-[176px] p-2 border border-gray-300 rounded-lg flex gap-2">
      {/* Image */}
      <div className="w-[200px] h-[144px] rounded-8"> <img src={vendorthumbnail} alt="" /> </div>

      {/* Content */}
      <div className="max-w-[401px] min-h-[138px]  text-left  flex flex-col gap-2">
        <h2 className="text-md font-semibold">Beds</h2>
        <p className="text-md font-normal">Custom Queen Size bed designs</p>
        <div className="flex items-center">
         <StarRating rating={4.7} />
          <span className="ml-1">({4.7})</span>
        </div>
        <p className="text-md font-normal">$490 AUD total</p>
      </div>
    </div>

    <div className="max-w-[653px] min-h-[176px] p-2 border border-gray-300 rounded-lg flex gap-2">
      {/* Image */}
      <div className="w-[200px] h-[144px] rounded-8"> <img src={vendorthumbnail} alt="" /> </div>

      {/* Content */}
      <div className="max-w-[401px] min-h-[138px]  text-left  flex flex-col gap-2">
        <h2 className="text-md font-semibold">Beds</h2>
        <p className="text-md font-normal">Custom Queen Size bed designs</p>
        <div className="flex items-center">
         <StarRating rating={4.7} />
          <span className="ml-1">({4.7})</span>
        </div>
        <p className="text-md font-normal">$490 AUD total</p>
      </div>
    </div>

    </div>
    </div>
  )
}

export default VendorRecomendationDetail
