import React from 'react'
import busdir from './Images/busdir.jpg'
import imagebusiness from './Images/imagebusiness.jpg'
import businessdirlogo from './Images/businessdirlogo.png'
import businessdirlogo2 from './Images/businessdirlogo2.png'
import businessdirlogo3 from './Images/businessdirlogo3.png'
const BusinessDirectoryDetails = () => {
  return (
    <div className='lg:px-0 lg:py-0 sm:px-2'>
         <div className='max-w-[1340px] h-[320px]  overflow-hidden mx-auto relative'>
              {/* Background Image */}
              <img src={busdir} alt={`Business `} className='w-full h-[720px] ' />
            </div>
            <div className=' p-6 text-white text-left  sm:min-h-[274px]'>
                <h1 className='text-lg text-black lg:w-[1308px] sm:w-[243px] font-semibold font-inter text-left tracking-tighter '>
                  Health monitor
                </h1>
                <p className='text-black'>
                Turpis quis eget ultrices pharetra felis in diam id. Blandit aliquet cum proin cum orci. Praesent phasellus ipsum ut pharetra lobortis suscipit. Aliquet rhoncus consequat rhoncus parturient gravida massa nunc eu. Mauris eget massa semper neque nulla. At tellus nisi ultricies sit eget tincidunt. Amet accumsan est ut mi amet fusce. Neque nisl tellus velit sagittis et eget nunc fermentum lobortis. Pharetra id aliquet feugiat habitasse. Nunc dui adipiscing lobortis eu elementum id malesuada condimentum sed. Posuere turpis nulla ornare at dictum lacus.
Non phasellus elit lectus non. Consequat et porttitor elit in tellus velit tellus. Ut rutrum hac at commodo ut at a. Neque sit enim lectus lectus mi. Neque imperdiet enim augue nunc commodo.
Eleifend consequat tellus scelerisque lobortis amet volutpat. In congue sed aliquam vulputate turpis leo malesuada. A feugiat vivamus sem et amet viverra.  
                </p>
              </div>
              <div className='py-6 px-3 bg-[#F2F4F7]'>
                <div className='items-center '>
                <button className='p-2 min-w-50  h-10 border border-[#0E214B] bg-[#F9F5FF] font-normal rounded-lg'>Contact Us</button>
                  <h2 className='text-xl font-bold p-4'>We’d love to hear from you</h2>
                  <p className='pt-2'>Chat to our friendly team.</p>  
                </div>
                <div className='p-6'>
                   <img src={imagebusiness} alt={`Business `} className='w-[1216px] h-[480px] ' />
                </div>


                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200  sm:mt-16  lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
                sales@untitledui.com
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
                100 Smith Street Collingwood VIC 3066 AU
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
                +1 (555) 000-0000
                </p>    
              </div>
            </article>
            </div>
              </div>
    </div>
  )
}

export default BusinessDirectoryDetails
