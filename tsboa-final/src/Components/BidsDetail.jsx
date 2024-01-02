  import React, { useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { Swiper, SwiperSlide } from 'swiper/react';
  import SwiperCore from 'swiper';
  import 'swiper/css/bundle';
  import { Navigation } from 'swiper/modules';
  import headervendor from './Images/Headervendor.jpg';
  import { useState } from 'react';
  import { useParams } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  import axios from 'axios';

  const BidsDetail = () => {
    SwiperCore.use([Navigation]);
    const [posting, setPosting] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
      // Scroll to the top when the component mounts
      window.scrollTo(0, 0);
    }, []);
    

    useEffect(() => {
      const fetchPosting = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/posting/get/${params.postingId}`);
          console.log(response)
          const data = response.data;
          console.log(data)
          if (data.success === false) {
            console.log(data.message);
            setError(true);
            setLoading(false);
            return;
          }
          setPosting(data);
          setLoading(false);
          setError(false);
        }catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      fetchPosting();
    }, [params.postingId]);

    const calculateNextOffer = () => {
      // Assuming posting.offer is the current offer
      if (posting && posting.offer) {
        return posting.offer + 500;
      }
  
      // Default offer if no valid offer is available
      return 500;
    };


    return (
      
      <div className='py-4 px-4'>
       {posting && posting.imageUrls && (
  <Swiper navigation>
    {posting.imageUrls.map((url) => (
      <SwiperSlide key={url}>
        <div
          className='h-[550px] rounded-lg md:max-h-[300px] lg:max-h-[400px] xl:max-h-[500px]'
          style={{
            background: `url(${url}) center no-repeat`,
            backgroundSize: 'cover',
          }}
        ></div>
      </SwiperSlide>
    ))}
  </Swiper>
)}

    
        <div>
          <div className='flex justify-between items-center py-4'>
            <h1 className='text-3xl font-semibold text-36 leading-44 tracking-tight text-left'>
            {posting && posting.bidTitle}
            </h1>
          </div>
          <p className='text-left'>
            {/* Your existing text content */}
          </p>
        </div>
        <div className='max-w-[1334px] mt-6 min-h-[361px] p-4 gap-3 rounded-lg border'>
          <div className='flex justify-between items-center'>
            <p className='text-lg  text-left font-bold leading-7'>
            {posting && posting.description}
            </p>
            <div className='flex'>
              <p className='mr-6'>Total Bids: 4</p>
              <p className='mr-3'>Total Bidders: 5</p>
            </div>
          </div>

          <div className='flex gap-8'>
            <label
              className='w-[624px] m-2 text-left h-[52px] p-4 border-2 border-gray-300 rounded-lg'
              htmlFor='question1'
            >
              <input type='radio' id='question1' name='question' value='A' />
              ${posting && posting.offer}
            </label>

           <label
            className='w-[624px] m-2 text-left h-[52px] p-4 border-2 border-gray-300 rounded-lg'
            htmlFor='question2'
          >
            <input type='radio' id='question2' name='question' value='B' />
            ${calculateNextOffer()}
          </label>
          </div>

         
          <button
            className='md:min-w-[213px] max-h-[48px] items-left p-2 sm:my-4 border bg-[#0E214B] text-white rounded-md'
          >
            Place Bid Now
          </button>
        </div>
      </div>
     
    );
   
  };

  export default BidsDetail;
