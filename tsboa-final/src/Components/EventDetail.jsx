import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";

import { Navigation } from 'swiper/modules';
import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import axios from 'axios';




const EventDetail = () => {
  SwiperCore.use([Navigation]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);

        
        const response = await axios.get(`/api/events/get/${params.eventId}`);
        console.log(response)
        const data = response.data;

        if (data.success === false) {
          console.log(data.message);
          setError(true);
          setLoading(false);
          return;
        }

        setEvent(data); 

        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError(true);
        setLoading(false);
      }
    };

    // Call the fetchEventDetails function
    fetchEventDetails();

    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, [params.eventId]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading event details</p>;
  }

  if (!event) {
    return <p>No event found</p>;
  }

  const swiperParams = {
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  return (
    <div className='px-20 py-8 sm:px-4'>
    {/* Featured Article */}
    <div className="max-w-[1340px] max-h-[606px] border-radius-2 rounded-3xl overflow-hidden mx-auto relative">
  {/* Background Image */}
  <Swiper {...swiperParams}>
        {event.data.imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div className='max-w-[1340px] max-h-[606px] border-radius-2 rounded-3xl overflow-hidden mx-auto relative'>
              {/* Background Image */}
              <img src={imageUrl} alt={`Event Image ${index}`} className='w-full h-[720px] object-cover rounded-3xl' />
              <div className='absolute bottom-4 left-0 p-6 text-white text-left sm:w-[343px]'>
              <h1 className='text-2xl lg:w-[1308px] sm:w-[243px] font-semibold font-inter text-left tracking-tighter'>
                {event && event.data.eventName}
              </h1>

              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className='swiper-button-next' />
        <div className='swiper-button-prev' />
      </Swiper>
  <div className="absolute bottom-4 left-0 p-6 text-white text-left sm:w-[343px] sm:min-h-[274px]:">
        <h1 className="text-lg lg:w-[1308px] sm:w-[243px] font-semibold font-inter text-left  tracking-tighter ">{event && event.data.eventName}</h1>
      </div>
    </div>
    <div className='py-10'>
        <p className='py-5 text-base font-normal font-inter text-left leading-6'>{event && event.data.description}</p>
        <div className='max-w-[778px] max-h-[413px] gap-8'>
        <p className='py-2 flex text-base font-medium font-inter text-left leading-6 items-center gap-1'> <CiLocationOn /> {event && event.data.location} </p>
        <p className='py-2 flex text-base font-medium font-inter text-left leading-6 items-center gap-1'> <CiCalendarDate /> {event && event.data.date} </p>
        <p className='py-2 flex text-base font-medium font-inter text-left leading-6 items-center gap-1'> <CiTimer /> {event && event.data.date} </p>
        <p className='py-2 flex text-base font-medium font-inter text-left leading-6 items-center gap-1'> <IoTicketOutline />{event && event.data.ticketwebsite}</p>
        </div>
        <h2 className='text-xl font-semibold font-inter text-left leading-7 py-6'>Event Speakers</h2>
        <div class="flex items-center">
       
        <p class="ml-2 text-sm font-medium">{event && event.data.speaker}</p>
        </div>
        <div class="flex items-center py-4">
      
        </div>
        <div>
        <h2 className='text-xl font-semibold font-inter text-left leading-7 py-4'>Event Tickets</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-10'>
        {/* Event Ticket 1 */}
        <div class="w-full h-auto px-6 py-5 bg-[#F2F4F7] rounded-lg gap-6 md:gap-20">
        <div class="w-full h-auto flex flex-col justify-center items-center md:flex-row md:justify-between">
          <p class="text-xl font-semibold text-center font-inter text-black mb-4 md:mb-0">
            BASIC TICKET
          </p>
          <p class="text-xl font-semibold text-center font-inter text-black">
            $300
          </p>
        </div>
        <div class="w-full py-2 h-auto flex flex-col justify-center items-center md:flex-row md:justify-between mt-6">
          <p class="flex items-center text-lg font-medium text-black">
            <CiCalendarDate /> 25/11/2023
          </p>
          <button
            className="w-full md:w-[112px] max-h-[48px] border border-[#0E214B] bg-[#0E214B] text-white rounded-md mt-4 md:mt-0"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Event Ticket 2 */}
      <div class="w-full h-auto px-6 py-5 bg-[#F2F4F7] rounded-lg gap-6 md:gap-20 mt-6 sm:mt-0">
        <div class="w-full h-auto flex flex-col justify-center items-center md:flex-row md:justify-between">
          <p class="text-xl font-semibold text-center font-inter text-black mb-4 md:mb-0">
            VIP TICKET
          </p>
          <p class="text-xl font-semibold text-center font-inter text-black">
            $500
          </p>
        </div>
        <div class="w-full py-2 h-auto flex flex-col justify-center items-center md:flex-row md:justify-between mt-6">
          <p class="flex items-center text-lg font-medium text-black">
            <CiCalendarDate /> 25/11/2023
          </p>
          <button
            className="w-full md:w-[112px] max-h-[48px] border border-[#0E214B] bg-[#0E214B] text-white rounded-md mt-4 md:mt-0"
          >
            Buy Now
          </button>
        </div>
      </div>

        </div>

        </div>

          {/* Related Event */}
        
        </div>
    </div>

  )
}

export default EventDetail
