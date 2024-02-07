import React, { useState, useEffect } from 'react';
import businessdir from './Images/businessdir.jpg'
import newsthumbnail1 from './Images/newsthumbnail1.jpg';
import axios from 'axios';
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { app } from '../firebase';
import { MdDelete } from 'react-icons/md';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser._id)
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('/api/business/get');
        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  }, []);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news/get');
        const data = response.data;
        console.log(data)
        if (data.success === false) {
          console.log(data.message);
         
          return;
        }
        setNews(data || []);
      
      } catch (error) {
        console.error('Error fetching news:', error);
     
      }
    };

    // Call the fetchNews function
    fetchNews();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events/get');
        const data = response.data;
        if (data.success === false) {
          console.log(data.message);
          return;
        }

        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      
      try {
       
        // const user = /* Fetch user information or from context */;
        const user = currentUser; // Assuming currentUser is the user object from Redux
  
        // Check if the user has admin privileges based on email or ID
        const hasAdminPrivileges =
          user &&
          (user.email === 'tsboaa@gmail.com' || user._id === '658eb5cf48d721a2cf795fad');
          console.log(user)
        // If user is not an admin, redirect or show a message
        if (!hasAdminPrivileges) {
          // Redirect or show a message (modify this part according to your application)
          alert('You can not access admin page');
          navigate('/')
        }
  
        setIsAdmin(hasAdminPrivileges);
      } catch (error) {
        // Handle error
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [currentUser]);

  const handleNewsDelete  = async (newsId) => {
    try {
      const response = await axios.delete(`/api/news/delete/${newsId}`);
      const data = response.data;
    
      if (data.success === false) {
        console.log(data.message);
        return;
      }
    
      setNews((prev) => prev.filter((news) => news._id !== newsId));
    } 
    catch (error) {
      console.log(error.message);
    }
  }
  
  const handleEventDelete  = async (eventId) => {
    try {
      const response = await axios.delete(`/api/events/delete/${eventId}`);
      const data = response.data;
    
      if (data.success === false) {
        console.log(data.message);
        return;
      }
    
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
    } 
    catch (error) {
      console.log(error.message);
    }
  }
  const handleBusinessDelete  = async (businessId) => {
    try {
      const response = await axios.delete(`/api/business/delete/${businessId}`);
      const data = response.data;
    
      if (data.success === false) {
        console.log(data.message);
        return;
      }
    
      setBusinesses((prev) => prev.filter((business) => business._id !== businessId));
    } 
    catch (error) {
      console.log(error.message);
    }
  }

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + eventFormData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setEventFormData({
            ...eventFormData,
            imageUrls: eventFormData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per Posting');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
  
      if (file.size <= 5 * 1024 * 1024) {
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      } else {
        // Reject the promise if the file size exceeds 5MB
        reject(new Error('File size exceeds the limit of 5MB.'));
      }
    });
  };


  const handleRemoveImage = (index) => {
    setEventFormData({
      ...eventFormData,
      imageUrls: eventFormData.imageUrls.filter((_, i) => i !== index),
    });
  };
  
  // State for handling form data
  const [eventFormData, setEventFormData] = useState({
    eventName: '',
    location: '',
    description: '',
    speaker: '',
    date: '',
    offer: '',
    vipoffer: '',
    imageUrls: [],
  });

  const [newsFormData, setNewsFormData] = useState({
    newsName: '',
    location: '',
    description: '',
    author: '',
    date: '',
  });
  

  const [businessFormData, setBusinessFormData] = useState({
    businessName: '',
    location: '',
    description: '',
    email: '',
    phoneNumber: '',
    imageUrls: [],
  });
  

  // Function to handle event form submission
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to create event
      const response = await axios.post('/api/events/create', eventFormData);
      console.log('Event created:', response.data);
      // Clear form data or perform any other actions
      setSuccessMessage('Event created successfully!');
      // Clear form data or perform any other actions
    } catch (error) {
      console.error('Error creating event:', error.response?.data || error.message);
    }
  };

  // Function to handle news form submission
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to create news
      const response = await axios.post('/api/news/create', newsFormData);
      console.log('News created:', response.data);
      setSuccessMessage('News created successfully!');
      // Clear form data or perform any other actions
    } catch (error) {
      console.error('Error creating news:', error.response?.data || error.message);
    }
  };

  const handleBusinessSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/business/create', businessFormData);
      console.log('Business created:', response.data);
      setSuccessMessage('Business created successfully!');
      // Clear form data or perform any other actions
    } catch (error) {
      console.error('Error adding business:', error.response?.data || error.message);
    }
  };


  // Function to update form data for events
  const handleEventChange = (e) => {
    setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
  };

  // Function to update form data for news
  const handleNewsChange = (e) => {
    setNewsFormData({ ...newsFormData, [e.target.name]: e.target.value });
  };

  const handleBusinessChange = (e) => {
    setBusinessFormData({ ...businessFormData, [e.target.name]: e.target.value });
  };
  

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h2>
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Success:</p>
          <p>{successMessage}</p>
        </div>
      )}
      {/* Event creation form */}
      <form onSubmit={handleEventSubmit} className="mb-8 p-6 bg-white rounded-md shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Create Event</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={eventFormData.eventName}
              onChange={handleEventChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Location</label>
            <input
              type="text"
              name="location"
              value={eventFormData.location}
              onChange={handleEventChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm text-gray-600">Description</label>
          <textarea
            name="description"
            value={eventFormData.description}
            onChange={handleEventChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm text-gray-600">Speaker</label>
            <input
              type="text"
              name="speaker"
              value={eventFormData.speaker}
              onChange={handleEventChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Offer</label>
            <input
              type="text"
              name="offer"
              value={eventFormData.offer}
              onChange={handleEventChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Vip Offer</label>
            <input
              type="text"
              name="vipoffer"
              value={eventFormData.vipoffer}
              onChange={handleEventChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Date</label>
            <input
              type="datetime-local"
              name="date"
              value={eventFormData.date}
              onChange={handleEventChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className='flex gap-4'>
        <input
          onChange={(e) => setFiles(e.target.files)}
          className='p-3 border border-gray-300 rounded w-full'
          type='file'
          id='images'
          accept='image/*'
          multiple
        />
        <p className='text-gray-600'>Picture should be of size 2160 x 1259 pixels</p>
        <button
          type="button"
          disabled={uploading}
          onClick={handleImageSubmit}
          className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {eventFormData.imageUrls.length > 0 &&
            eventFormData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='Posting image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
                </div>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        >
          Create Event
        </button>
      </form>
      <div className="overflow-x-auto">
      <div className="flex flex-wrap">
        {events.map((event) => (
          <div key={event._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 mb-4">
            <Link
              to={`/eventdetail/${event._id}`}
              className="block bg-white rounded-lg overflow-hidden shadow-md mr-4"
            >
              {/* Event Image */}
              <div
                className="w-[388px] h-[275px] bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${event.imageUrls[0]})` }}
              >
                {/* Price Tag */}
                <div className="absolute text-center ml-4 mt-4 w-[74px] h-[41px] justify-center bg-white text-black flex items-center rounded-lg">
                  <span>{event.offer}</span>
                </div>
              </div>
              {/* Event Details */}
              <div className="p-4 gap-4 text-left">
                {/* Event Name */}
                <h2 className="text-lg font-semibold">{event.eventName}</h2>
                {/* Event Information */}
                <p className="text-sm">
                  Location: {event.location}<br />
                  Date: {new Date(event.date).toLocaleDateString()}<br />
                  <span className='font-semibold'> {event.speaker} </span>
                </p>
              </div>
              <button onClick={() => handleEventDelete(event._id)} className="text-red-500">
                    <MdDelete />
              </button>
            </Link>
            
          </div>
        ))}
      </div>
      </div>

      {/* News creation form */}
      <form onSubmit={handleNewsSubmit} className="p-6 mb-8 bg-white rounded-md shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Create News</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">News Name</label>
            <input
              type="text"
              name="newsName"
              value={newsFormData.newsName}
              onChange={handleNewsChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Location</label>
            <input
              type="text"
              name="location"
              value={newsFormData.location}
              onChange={handleNewsChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm text-gray-600">Description</label>
          <textarea
            name="description"
            value={newsFormData.description}
            onChange={handleNewsChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm text-gray-600">Author</label>
            <input
              type="text"
              name="author"
              value={newsFormData.author}
              onChange={handleNewsChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Date</label>
            <input
              type="datetime-local"
              name="date"
              value={newsFormData.date}
              onChange={handleNewsChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        >
          Create News
        </button>
      </form>
        <div className='flex items-center'>
        <div className='overflow-x-auto flex-1'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10 mb-4 flex'>
            {news.map((news) => (
              <Link to={`/newsdetail/${news._id}`} key={news._id} className='w-full bg-white flex-none rounded-lg overflow-hidden'>
                {/* Business Image */}
                <div
                  className='w-full h-[144px] bg-cover bg-center rounded-t-lg'
                  style={{ backgroundImage: `url(${newsthumbnail1})` }}
                ></div>

              <div className="py-4 px-4 gap-4 text-left">
              {/* News Metadata */}
              <p className="text-sm">{`${news.author} • ${new Date(news.date).toLocaleDateString()}`}</p>

              {/* News Title */}
              <h2 className="text-lg font-semibold">{news.newsName}</h2>

              {/* News Description */}
              <p className="text-sm">{news.description}</p>
              </div>
              <button onClick={() => handleNewsDelete(news._id)} className="text-red-500">
                    <MdDelete />
              </button>
              </Link>
            ))}
          </div>
        </div>
        <div className='ml-4'>
          <FaArrowAltCircleRight className='text-3xl text-gray-600 cursor-pointer' />
        </div>
      </div>
      {/* Business Directory */}
      <form onSubmit={handleBusinessSubmit} className="p-6 mb-8 bg-white rounded-md shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Add Business in Business Directory</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={businessFormData.businessName}
              onChange={handleBusinessChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Location</label>
            <input
              type="text"
              name="location"
              value={businessFormData.location}
              onChange={handleBusinessChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm text-gray-600">Description</label>
          <textarea
            name="description"
            value={businessFormData.description}
            onChange={handleBusinessChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="text"
              name="email"
              value={businessFormData.email}
              onChange={handleBusinessChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={businessFormData.phoneNumber}
              onChange={handleBusinessChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        >
          Create Business
        </button>
      </form>
      <div className='flex items-center'>
      <div className='overflow-x-auto flex-1'>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10 flex'>
          {businesses.map((business) => (
            <Link to={`/businessdirectorydetails/${business._id}`} key={business._id} className='w-full bg-white flex-none rounded-lg overflow-hidden'>
              {/* Business Image */}
              <div
                className='w-full h-[144px] bg-cover bg-center rounded-t-lg'
                style={{
                  backgroundImage: `url(${businessdir})`,
                  width: '388px',
                  height: '144px',
                  borderRadius: '8px',
                }}
              ></div>

              <div className='p-4 gap-4 text-left'>
                <h2 className='text-lg font-semibold'>{business.businessName}</h2>
                <p className='text-lg'>{business.description}</p>

                <p className='text-sm py-2'>
                  <div className='flex mr-2'><CiLocationOn /> Location: {business.location}</div>
                  <div className='flex'><MdOutlineEmail /> Email: {business.email}</div>
                  <div className='flex'><IoIosCall /> Number: {business.phoneNumber}</div>
                </p>
                <button onClick={() => handleBusinessDelete(business._id)} className="text-red-500">
                    <MdDelete />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='ml-4'>
        <FaArrowAltCircleRight className='text-3xl text-gray-600 cursor-pointer' />
      </div>
    </div>
    </div>
  );
};

export default Admin;
