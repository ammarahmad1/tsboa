import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bidthumbnail from './Images/bidthumbnail.jpg'
import { useSelector } from 'react-redux';
import React from 'react';
import axios from 'axios';
import Loading from './Loading'; 

const Bids = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showPostingsError, setShowPostingsError] = useState(false);
  const [postings, setPostings] = useState([]);
  const [userPostings, setUserPostings] = useState([]);
  const [loadingPostings, setLoadingPostings] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const response = await axios.get('/api/posting/get');
        setPostings(response.data);
        setLoadingPostings(false);  
      } catch (error) {
        console.error('Error fetching postings:', error);
        setLoadingPostings(false);
      }
    };

    fetchPostings();
  }, []);


  const handleBidClick = (postingId) => {
    navigate(`/bidsdetail/${postingId}`);
  };
  

  const handleShowPostings = async () => {
    try {
      setShowPostingsError(false);
      const res = await fetch(`/api/user/posting/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowPostingsError(true);
        return;
      }
  
      setUserPostings(data);
  
      // Pass the data to MyBids component while navigating
      navigate('/mybids', { state: { userPostings: data } });
    } catch (error) {
      setShowPostingsError(true);
    }
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='py-2 px-4'>
    <div className='max-w-[1512px] min-h-[306px] bg-[#F2F4F7] flex items-center justify-center px-0 '>
      <h1 className='text-4xl font-semibold font-inter text-center leading-10 tracking-tighter'>Hello</h1>
    </div>
  
    <div className='flex lg:flex-row sm:flex-col ml-4 space-y-4 sm:space-y-0 sm:space-x-4 sm:w-[138px]'>
  <div className='lg:w-[211px] sm:w-[186px]'>
    <Link to="../">
      <div className='h-[40px] mt-4 bg-[#D0D5DD] rounded-lg flex items-center p-4 sm:w-min'>
        <p className='border-gray-200 text-left text-sm font-semibold leading-5 tracking-normal whitespace-nowrap'>
          Vendor Recommendation
        </p>
      </div>
    </Link>
  </div>

  <div className='lg:w-[180px] sm:w-[180px] sm:ml-0 m:w-min'>
    <div className='h-[40px] mt-4 bg-[#D0D5DD] rounded-lg flex items-center p-4 text-left sm:ml-0'>
      <p className='border-gray-200 text-left text-sm font-semibold leading-5 tracking-normal whitespace-nowrap'>
        Bids and Opportunities
      </p>
    </div>
  </div>

  <div className='ml-auto'> {/* This will push the button to the rightmost part */}
  <Link to="../createposting">
    <button className='md:min-w-[100px] max-h-[40px] items-left p-2 sm:my-4 border bg-[#0E214B] text-white rounded-md'>
      Post bid
    </button>
    </Link>
  </div>
</div>


    <div className='flex lg:flex-row sm:flex-col ml-4 space-y-4 sm:space-y-0 sm:space-x-4 sm:w-[138px]'>
      <div className='lg:w-[211px] sm:w-[186px]'>

      <div className='h-[40px] mt-4 underline bg-white rounded-lg flex items-center p-4 sm:w-min'>
        <p className='border-gray-200 text-left text-sm font-semibold leading-5 tracking-normal whitespace-nowrap'>
          Bids for me
        </p>
      </div>
   
      </div>
      <Link to="/mybids" > 
      <div className='lg:w-[80px]  sm:w-[180px] sm:ml-0 m:w-min'>
        <div className='h-[40px] mt-4 bg-white rounded-lg flex items-center p-4 text-left sm:ml-0'>
          <p onClick={handleShowPostings} className='border-gray-200 text-left text-sm font-semibold leading-5 tracking-normal whitespace-nowrap'>
            My Bids
          </p>
        </div>
        <p className='text-red-700 mt-5'>
        {showPostingsError ? 'Error showing postings' : ''}
         </p>
      </div>
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10">
        {loadingPostings ? (
          <Loading /> // Show loading component while waiting for data
        ) : (
          postings.map((posting) => (
            <div key={posting._id} className="w-full bg-white flex-none rounded-lg overflow-hidden">
              {/* Posting Image */}
              <div
                className="w-full h-[240px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${posting.imageUrls[0]})` }}
              ></div>
              {/* Posting Details */}
              <div className="py-4 gap-4 text-left">
                {/* Posting Title */}
                <div className='flex justify-between'>
                  <h2 className="text-lg font-semibold">{posting.bidTitle}</h2>
                  {/* Bid Now Button */}
                  <button
                    type="button"
                    onClick={() => handleBidClick(posting._id)}
                    className="flex-none rounded-md bg-[#0E214B] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Bid Now
                  </button>
                </div>
                {/* Posting Information */}
                <p className="text-sm pt-4">{posting.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        className="md:min-w-[213px] max-h-[48px] items-center p-2 sm:my-4 border border-[#0E214B] bg-white text-[#344054] rounded-md"
      >
        See more features
      </button>
    </div>
  );
};

export default Bids;