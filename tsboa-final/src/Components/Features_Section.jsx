import React from 'react'
import keyfeatures from './Images/key_features.jpg';
import market_insights from './Images/market_insights.jpg';
import { Link } from 'react-router-dom';
import policy_updates from './Images/policy_updates.jpg';

const Features_Section = () => {
  return (
    <section className=''>
    <div className="max-w-[1512px]  mx-auto relative mt-800px py-8 md:h-min-[3000px] gap-96 p-[25px]">
       <section >
      <div className="max-w-[1280px] min-h-[124px] mx-auto  ">
        <div className="max-w-[1216px] min-h-[124px]  mx-auto">
          <div className="max-w-[768px] min-h-[124px] gap-10 mx-auto flex flex-col items-center">
            <h2 className="text-3xl font-semibold ">Key Features</h2>
            <p className="text-xl font-normal text-center sm:text-left">
              Dolor sed varius sem posuere massa. Fames urna eget amet ullamcorper vel tortor euismod
              nascetur nullam. Elementum integer proin sed scelerisque.
            </p>
          </div>
        </div>
      </div>
      
    </section>
    <section className="min-h-[400px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 py-10  mt-400px ">
    
    <div className="flex flex-col justify-center text-left gap-4 p-10 sm:p-0 md:text-left md:py-2">
    
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
      Discover Endorsements in Your Area
      </h2>
      <p className="text-base sm:text-lg lg:text-xl">
      Viverra faucibus id id nunc nisl. Feugiat quis egestas id maecenas nibh enim at elit neque. Posuere proin adipiscing donec pellentesque nunc faucibus. Molestie pellentesque vestibulum quis nam nibh. Sollicitudin sit massa platea sit sit donec. Egestas urna in tortor eu.
      </p>
      <Link
      to="/endorsments"
     
    >     <button className="w-[128px] min-h-[48px] p-[12px, 18px, 12px, 18px] mt-4 border border-[#0E214B] bg-[#0E214B] text-white rounded-md">
        Learn more
      </button>
      </Link>
    </div>

    {/* Right Picture */}
    <div className="w-full h-full gap-4 p-8 sm:p-0">
    
      <img
        src={keyfeatures}
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
          src={market_insights}
          alt="Discover Image"
          className="object-cover rounded-md  sm:p-0 sm:h-[400px] sm:w-[full]"
        />
      </div>

      {/* Right Column */}
      <div className="flex flex-col justify-center text-left gap-4 sm:p-0 p-8 md:text-left md:py-10">
        <h2 className="text-xl sm:text-2xl md:px´l md:text-3xl lg:text-4xl font-semibold">
          Stay Informed with Market Insights
        </h2>
        <p className="text-base sm:text-lg lg:text-xl">
        Et condimentum in eu tellus purus aliquet molestie. Quam fames consequat sit lorem eget mattis suspendisse scelerisque. Pretium sit aliquet fermentum urna at dignissim. Justo sed id a sodales sapien.
        </p>
        <button className="w-[128px] min-h-[48px] p-[12px, 18px, 12px, 18px] mt-4 border border-[#0E214B] bg-[#0E214B] text-white rounded-md">
          Learn more
        </button>
      </div>
    </section>
    <section className="min-h-[400px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-0 md:py-10 mt-400px">
 
    <div className="flex flex-col justify-center text-left gap-4 p-10  md:text-left sm:p-0">
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
      Get the Latest Policy Updates
      </h2>
      <p className="text-base sm:text-lg lg:text-xl">
       Malesuada tortor augue lectus nulla rhoncus senectus phasellus. Enim a vulputate viverra aliquam. Eget tellus nunc tellus sit at.
      </p>
      <button className="w-[128px] min-h-[48px] p-[12px, 18px, 12px, 18px] mt-4 border border-[#0E214B] bg-[#0E214B] text-white rounded-md">
        Learn more
      </button>
    </div>

    {/* Right Picture */}
    <div className=" gap-4 p-8 sm:p-0 ">
    
      <img
        src={policy_updates}
        alt="Discover Image"
        className="object-cover rounded-md  sm:p-0 sm:h-[400px] sm:w-[full] "
      />
    </div>
  </section> 


  <button
        className="w-100% md:min-w-[213px] min-h-[48px] p-4 sm:my-4 border border-[#0E214B] bg-white text-[#344054] rounded-md"
      >
        See more key features
      </button>
     </div>
     </section>
  )
}

export default Features_Section
