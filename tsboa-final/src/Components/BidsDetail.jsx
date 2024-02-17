import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BidsDetail = () => {
  SwiperCore.use([Navigation]);
  const [posting, setPosting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [subBid, setSubBid] = useState({
    name: '',
    price: '',
    description: '',
    email: '',
    bidtype: '',
  });
  const [wholeBid, setWholeBid] = useState({
    name: '',
    price: '',
    description: '',
    email: '',
    bidtype: '',
  });
  const [bids, setBids] = useState([]); // State to hold all bids
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
        const response = await axios.get(`/api/posting/get/${params.postingId}`);
        const data = response.data;
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setPosting(data);
        setLoading(false);
        setError(false);
        if (data.bid) {
          setBids(data.bid); // Set initial bids if available
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPosting();
  }, [params.postingId]);

  const handleSubBidChange = (e) => {
    setSubBid({ ...subBid, [e.target.name]: e.target.value });
  };

  const handleWholeBidChange = (e) => {
    setWholeBid({ ...wholeBid, [e.target.name]: e.target.value });
  };

  const submitSubBid = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/posting/update/${params.postingId}`, {
        bid: {
          name: subBid.name,
          description: subBid.description,
          price: subBid.price,
          bidtype: subBid.bidtype,
          email: subBid.email,
        },
      });
      setSubBid({
        name: '',
        description: '',
        price: '',
        bidtype: '',
        email: '',
      });
      // Add the new bid to the existing list of bids
      setBids([...bids, subBid]);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const submitWholeBid = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/posting/update/${params.postingId}`, {
        bid: {
          name: wholeBid.name,
          description: wholeBid.description,
          price: wholeBid.price, 
          bidtype: wholeBid.bidtype,
          email: wholeBid.email
        },
      });
      setWholeBid({
        name: '',
        description: '',
        price: '',
        bidtype: '',
        email: '',
      });
      // Add the new bid to the existing list of bids
      setBids([...bids, wholeBid]);
      // Handle success
    } catch (error) {
      // Handle error
    }
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
        <p className='text-left'>{/* Your existing text content */}</p>
      </div>
      <div className='max-w-[1334px] mt-6 min-h-[361px] p-4 gap-3 rounded-lg border'>
        <div className='flex justify-between items-center'>
          <p className='text-lg mb-2 text-left font-bold leading-7'>
            {posting && posting.description}
          </p>
        </div>

        <div className='flex gap-8 mt-3 '>
          <div className='w-1/2'>
            <form className='bg-gray-100 p-4 rounded-lg' onSubmit={submitSubBid}>
              <h2 className='text-lg font-semibold mb-2'>Sub bid</h2>
              <div className='mb-4'>
                <label htmlFor='subBidName' className='block font-semibold'>
                  Name:
                </label>
                  <input
                    type='text'
                    id='subBidName'
                    name='name' 
                    className='w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    value={subBid.name}
                    onChange={handleSubBidChange}
                  />
              </div>
              <div className='mb-4'>
              <label htmlFor='subBidPrice' className='block font-semibold'>
                Price:
              </label>
              <input
                type='text'
                id='subBidPrice'
                name='price' 
                className='w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                value={subBid.price}
                onChange={handleSubBidChange}
              />
            </div>
              <div className='mb-4'>
                <label htmlFor='subBidDescription' className='block font-semibold'>
                  Description:
                </label>
                <input
                  type='text'
                  id='subBidDescription'
                  name='description' 
                  className='w-full  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                  value={subBid.description}
                  onChange={handleSubBidChange} 
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='subBidType' className='block font-semibold'>
                  Bid type: Whole or Sub
                </label>
                <input
                  type='text'
                  id='subBidType'
                  name='bidtype' 
                  className='w-full  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                  value={subBid.bidtype}
                  onChange={handleSubBidChange} 
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='subBidEmail' className='block font-semibold'>
                  Email:
                </label>
                <input
                  type='text'
                  id='subBidEmail'
                  name='email' 
                  className='w-full  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                  value={subBid.email}
                  onChange={handleSubBidChange} 
                />
              </div>
              <button
                type='submit'
                className='bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                Submit Sub bid
              </button>
            </form>
          </div>
          <div className='w-1/2'>
          <form className='bg-gray-100 p-4 rounded-lg' onSubmit={submitWholeBid}>
              <h2 className='text-lg font-semibold mb-2'>Whole bid</h2>
              <div className='mb-4'>
                <label htmlFor='wholeBidName' className='block font-semibold'>
                  Name:
                </label>
                  <input
                    type='text'
                    id='wholeBidName'
                    name='name' 
                    className='w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    value={wholeBid.name}
                    onChange={handleWholeBidChange}
                  />
              </div>
              <div className='mb-4'>
              <label htmlFor='wholeBidPrice' className='block font-semibold'>
                Price:
              </label>
              <input
                type='text'
                id='wholeBidPrice'
                name='price' // Change name attribute to 'price'
                className='w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                value={wholeBid.price}
                onChange={handleWholeBidChange} // Add onChange handler
              />
            </div>
              <div className='mb-4'>
                <label htmlFor='wholeBidDescription' className='block font-semibold'>
                  Description:
                </label>
                  <input
                  type='text'
                  id='wholeBidDescription'
                  name='description' // Change name attribute to 'price'
                  className='w-full  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                  value={wholeBid.description}
                  onChange={handleWholeBidChange} // Add onChange handler
                />
                </div>
                <div className='mb-4'>
                <label htmlFor='wholeBidType' className='block font-semibold'>
                Bid type: Whole or Sub
                </label>
                  <input
                  type='text'
                  id='wholeBidType'
                  name='bidtype' // Change name attribute to 'price'
                  className='w-full  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                  value={wholeBid.bidtype}
                  onChange={handleWholeBidChange} // Add onChange handler
                />
                </div>
                <div className='mb-4'>
                <label htmlFor='wholeBidEmail' className='block font-semibold'>
                  Email:
                </label>
                  <input
                  type='text'
                  id='wholeBidEmail'
                  name='email' // Change name attribute to 'price'
                  className='w-full  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                  value={wholeBid.email}
                  onChange={handleWholeBidChange} // Add onChange handler
                />
                </div>
              <button
                type='submit'
                className='bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                Submit Whole bid
              </button>
            </form>
          </div>
        </div>
      </div>
      <h2 className='text-lg font-semibold mb-2'>Bids</h2>
    <div className="bg-gray-100 p-4 text-left rounded-lg">
      {/* Check if bids array has any bids */}
      {bids.length > 0 ? (
        // If yes, map over the bids and render their details
        bids.map((bid, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold mb-1">Bid {index + 1}</h3>
            <p><strong>Name:</strong> {bid.name}</p>
            <p><strong>Description:</strong> {bid.description}</p>
            <p><strong>Price:</strong> {bid.price}</p>
            <p><strong>Bid type:</strong> {bid.bidtype}</p>
            <p><strong>Email:</strong> {bid.email}</p>
          </div>
        ))
      ) : (
        // If there are no bids available, display a message
        <p>No bids available. Fill the form above to place bid.</p>
      )}
    </div>
  </div>
);
};

export default BidsDetail;
