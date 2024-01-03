import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

const MyBids = () => {
  const [showPostingsError, setShowPostingsError] = useState(false);
  const [userPostings, setUserPostings] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Automatically show postings when the component mounts
    handleShowPostings();
  }, []);

  const handleShowPostings = async () => {
    try {
      setShowPostingsError(false);
      const response = await axios.get(`/api/user/postings/${currentUser._id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.log(data);
      if (data.success === false) {
        setShowPostingsError(true);
        return;
      }

      setUserPostings(data);
    } catch (error) {
      setShowPostingsError(true);
      console.error('Error fetching postings:', error);
    }
  };

  const handlePostingDelete  = async (postingId) => {
    try {
      const response = await axios.delete(`/api/posting/delete/${postingId}`);
      const data = response.data;
    
      if (data.success === false) {
        console.log(data.message);
        return;
      }
    
      setUserPostings((prev) => prev.filter((posting) => posting._id !== postingId));
    } 
    catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="py-2 px-4">
      <div className="max-w-[1512px] min-h-[306px] bg-[#F2F4F7] flex items-center justify-center px-0 ">
        <h1 className="text-4xl font-semibold font-inter text-center leading-10 tracking-tighter">Hi, Phillips</h1>
      </div>

      <div className="flex lg:flex-row sm:flex-col ml-4 space-y-4 sm:space-y-0 sm:space-x-4 sm:w-[138px]">
        <div className="lg:w-[211px] sm:w-[186px]">
          <Link to="../vendorrecomendation">
            <div className="h-[40px] mt-4 bg-[#D0D5DD] rounded-lg flex items-center p-4 sm:w-min">
              <p className="border-gray-200 text-left text-sm font-semibold leading-5 tracking-normal whitespace-nowrap">
                Vendor Recommendation
              </p>
            </div>
          </Link>
        </div>

        <div className="lg:w-[180px] sm:w-[180px] sm:ml-0 m:w-min">
          <div className="h-[40px] mt-4 bg-[#D0D5DD] rounded-lg flex items-center p-4 text-left sm:ml-0">
            <p className="border-gray-200 text-left text-sm font-semibold leading-5 tracking-normal whitespace-nowrap">
              Bids and Opportunities
            </p>
          </div>
        </div>

        <div className="ml-auto">
          <Link to="../createposting">
            <button className="md:min-w-[100px] max-h-[40px] items-left p-2 sm:my-4 border bg-[#0E214B] text-white rounded-md">
              Post bid
            </button>
          </Link>
        </div>
      </div>

      <div className="flex lg:flex-row sm:flex-col ml-4 space-y-4 sm:space-y-0 sm:space-x-4 sm:w-[138px]">
        <div className="lg:w-[211px] sm:w-[186px]">
          <Link to="/bids">
            <div className="h-[40px] mt-4 bg-white rounded-lg flex items-center p-4 sm:w-min">
              <p className="border-gray-200 text-left text-sm font-semibold leading-5 tracking-normal whitespace-nowrap">
                Bids for me
              </p>
            </div>
          </Link>
        </div>

        <div className="lg:w-[80px]  sm:w-[180px] sm:ml-0 m:w-min">
          <div className="h-[40px] underline mt-4 bg-white rounded-lg flex items-center p-4 text-left sm:ml-0">
            <p className="border-gray-200 text-left text-sm font-semibold leading-5 tracking-normal whitespace-nowrap">
              My Bids
            </p>
          </div>
        </div>
      </div>
      <p className="text-red-700 mt-5">{showPostingsError ? 'Error showing Postings' : ''}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-6">
        
        {userPostings &&
          userPostings.length > 0 &&
          userPostings.map((posting) => (
            <div key={posting._id} className="max-w-[653px] min-h-[150px] p-2 border border-gray-300 rounded-lg flex items-center gap-2">
              <div className="w-[206px] h-[120px]  rounded-8">
                <Link>
                  <img className="w-[206px] h-[120px]  rounded-lg" src={posting.imageUrls[0]} alt="Biding image" />
                </Link>
              </div>
              <Link to={`/bidsdetail/${posting._id}`}>
              <div className="max-w-[401px] min-h-[100px] text-left flex flex-col gap-2 flex-grow">
                <h2 className="text-md font-semibold">{posting.bidTitle}</h2>
                <p className="text-md font-normal">{posting.description}</p>
                <p className="text-md font-normal mt-auto">${posting.offer} USD </p>

                <div className="flex items-end gap-2">
                <Link to={`/updateposting/${posting._id}`}>
                  <button className="text-blue-500">
                    <CiEdit />
                  </button>
                  </Link>
                  <Link>
                  <button onClick={() => handlePostingDelete(posting._id)} className="text-red-500">
                    <MdDelete />
                  </button>
                  </Link>
                </div>
              </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyBids;
