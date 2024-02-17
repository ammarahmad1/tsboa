import React, { useState, useEffect } from 'react';
import Homepagecontentupload from './Homepagecontentupload';
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
  const [endorsements, setEndorsements] = useState([]);
  const [vendors, setVendors] =useState(null);

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
    const fetchEndorsements = async () => {
      try {
        const response = await axios.get('/api/endorsment/get');
        const data = response.data;
        setEndorsements(data);
        console.log(endorsements)
      } catch (error) {
        console.error('Error fetching endorsment:', error);
      }
    };

    fetchEndorsements();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('/api/vendor/get');
        const data = response.data;
        setVendors(data);
        console.log(vendors)
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
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
        if (!currentUser) {
          // currentUser is not available, show error message and redirect
          alert('Failed to fetch user data. You cannot access the admin page.');
          navigate('/');
          return;
        }

        // Check if the user has admin privileges based on email or ID
        const hasAdminPrivileges =
          currentUser &&
          (currentUser.email === 'tsboaa@gmail.com' || currentUser._id === '658eb5cf48d721a2cf795fad');

        // If user is not an admin, redirect or show a message
        if (!hasAdminPrivileges) {
          // Redirect or show a message (modify this part according to your application)
          alert('You cannot access the admin page');
          navigate('/');
        }
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

  const handleEndorsmentDelete  = async (endorsmentId) => {
    try {
      const response = await axios.delete(`/api/endorsment/delete/${endorsmentId}`);
      const data = response.data;
    
      if (data.success === false) {
        console.log(data.message);
        return;
      }
    
      setNews((prev) => prev.filter((endorsment) => endorsment._id !== endorsmentId));
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

  const handleVendorsDelete = async (vendorId) => {
    try {
      const response = await axios.delete(`/api/vendor/delete/${vendorId}`);
      const data = response.data;
    
      if (data.success === false) {
        console.log(data.message);
        return;
      }
    
      setVendors((prev) => prev.filter((vendors) => vendors._id !== vendorId));
    } 
    catch (error) {
      console.log(error.message);
    }
  }




  const handleLogoSubmit = (e, formDataSetter) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      setImageUploadError(false);
      
      storeImage(file)
        .then((url) => {
          formDataSetter((prevFormData) => ({
            ...prevFormData,
            logo: url, 
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Logo upload failed (2 MB max)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload images');
      setUploading(false);
    }
  };
  
  const handleImageSubmit = (e, formDataSetter) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          formDataSetter((prevFormData) => ({
            ...prevFormData,
            imageUrls: prevFormData.imageUrls.concat(urls),
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload images');
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


  
  // State for handling form data
  const [eventFormData, setEventFormData] = useState({
    eventName: '',
    location: '',
    description: '',
    speaker: '',
    date: '',
    ticketwebsite: '',
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
    imageUrls: [],
  });
  
  const [vendorData, setVendorData] = useState({
    vendorName: '',
    location: '',
    description: '',
    imageUrls: [],
    logo: [],
    services: [],
  });

  const [businessFormData, setBusinessFormData] = useState({
    businessName: '',
    location: '',
    description: '',
    email: '',
    phoneNumber: '',
    imageUrls: [],
  });

  const [endorsmentFormData, setEndorsmentFormData] = useState({

   "endorsmentName":"",
   "location":"",
   "feedback":"",
   "description":"",
   "designation":"",
   "endorsmentFor":"",
   "twitter":"",
   "linkedin":"",
   "insta":"",
   "website":"",
   "speaker":"",
   "phone":"",
   "date":"",
   "offer":"",
   "logo":[],
   "imageUrls":[]

   });
  
   const [formData, setFormData] = useState({
    firstsectionHeading: '',
    firstsectiontext: '',
    firstsectionlink: '',
    secondsectionHeading: '',
    secondsectiontext: '',
    secondsectionlink: '',
    thirdsectionHeading: '',
    thirdsectiontext: '',
    thirdsectionlink: '',
    fourthsectionHeading: '',
    fourthsectiontext: '',
    fourthsectionlink: '',
  });
   

  // Function to handle event form submission
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to create event
      const response = await axios.post('/api/events/create', eventFormData);
      console.log('Event created:', response.data);
      // Clear form data
      setSuccessMessage('Event created successfully!');
      // Clear form data
    } catch (error) {
      console.error('Error creating event:', error.response?.data || error.message);
    }
  };

  const handlehomepageSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/homepage/update/65cb33a7f01e5e2ecacbd6cc', formData);
      // Handle successful update
      console.log('Homepage updated successfully');
    } catch (error) {
      // Handle error
      console.error('Error updating homepage:', error);
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
      // Clear form data
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
      // Clear form data 
    } catch (error) {
      console.error('Error adding business:', error.response?.data || error.message);
    }
  };


  const handleEndorsmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/endorsment/create', endorsmentFormData);
      console.log('Endorsment created:', response.data);
      setSuccessMessage('Endorsment created successfully!');
      // Clear form data
    } catch (error) {
      console.error('Error adding Endorsment:', error.response?.data || error.message);
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

  const handleHomepageChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEndorsmentChange = (e) => {
    setEndorsmentFormData({ ...endorsmentFormData, [e.target.name]: e.target.value });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...vendorData.services];
    updatedServices[index][name] = value;
    setVendorData({ ...vendorData, services: updatedServices });
  };

  const addServiceField = () => {
    setVendorData({
      ...vendorData,
      services: [...vendorData.services, { name: '', description: '', serviceImageUrls: [], price: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/vendor/create', vendorData);
      console.log(response.data);
      // You can handle success here
    } catch (error) {
      console.error('Error creating vendor:', error);
      // You can handle error here
    }
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
            <label className="block text-sm text-gray-600">Ticket website</label>
            <input
              type="text"
              name="ticketwebsite"
              value={eventFormData.ticketwebsite}
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
          <p>Upload images</p>
          <input
            onChange={(e) => handleImageSubmit(e, setEventFormData)}
            className="p-3 border border-gray-300 rounded w-full"
            type="file"
            id="images"
            accept="image/*"
            multiple
          />
          {eventFormData.imageUrls.map((url, index) => (
            <div key={url}>
              <img src={url} className='h-[100px] w-[100px]' alt="Uploaded" />
              
            </div>
          ))}
        <p className='text-gray-600'>Picture should be of size 2160 x 1259 pixels</p>
        
      </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
         
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
              to={`../admin`}
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
          <p>Upload picture</p>
          <input
          onChange={(e) => handleImageSubmit(e, setNewsFormData)}
          className='p-3 border border-gray-300 rounded w-full'
          type='file'
          id='images'
          accept='image/*'
          multiple
        />
        
        {newsFormData.imageUrls.map((url, index) => (
          <div key={url}>
            <img src={url} alt='Uploaded' />

          </div>
        ))}
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
              <Link to={`../admin`} key={news._id} className='w-full bg-white flex-none rounded-lg overflow-hidden'>
             
                <div
                  className='w-full h-[144px] bg-cover bg-center rounded-t-lg'
                  style={{ backgroundImage: `url(${news.imageUrls[0]})` }}
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

      {/* Endorsment */}
      <form onSubmit={handleEndorsmentSubmit} className="p-6 mb-8 bg-white rounded-md shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Add Endorsment</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600">Endorsment Name</label>
          <input
            type="text"
            name="endorsmentName"
            value={endorsmentFormData.endorsmentName}
            onChange={handleEndorsmentChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Location</label>
          <input
            type="text"
            name="location"
            value={endorsmentFormData.location}
            onChange={handleEndorsmentChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm text-gray-600">Feedback</label>
        <textarea
          name="feedback"
          value={endorsmentFormData.feedback}
          onChange={handleEndorsmentChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm text-gray-600">Description</label>
        <textarea
          name="description"
          value={endorsmentFormData.description}
          onChange={handleEndorsmentChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm text-gray-600">Designation</label>
          <input
            type="text"
            name="designation"
            value={endorsmentFormData.designation}
            onChange={handleEndorsmentChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Endorsment For</label>
          <input
            type="text"
            name="endorsmentFor"
            value={endorsmentFormData.endorsmentFor}
            onChange={handleEndorsmentChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <label className="block text-sm text-gray-600">Twitter</label>
        <input
          type="text"
          name="twitter"
          value={endorsmentFormData.twitter}
          onChange={handleEndorsmentChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600">LinkedIn</label>
        <input
          type="text"
          name="linkedin"
          value={endorsmentFormData.linkedin}
          onChange={handleEndorsmentChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <label className="block text-sm text-gray-600">Instagram</label>
        <input
          type="text"
          name="insta"
          value={endorsmentFormData.insta}
          onChange={handleEndorsmentChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600">Website</label>
        <input
          type="text"
          name="website"
          value={endorsmentFormData.website}
          onChange={handleEndorsmentChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <label className="block text-sm text-gray-600">Phone</label>
        <input
          type="text"
          name="phone"
          value={endorsmentFormData.phone}
          onChange={handleEndorsmentChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <label className="block text-sm text-gray-600">Date</label>
        <input
          type="date"
          name="date"
          value={endorsmentFormData.date}
          onChange={handleEndorsmentChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>

    <div className="mt-4">
        <label className="block text-sm text-gray-600">Logo</label>
        <input
          onChange={(e) => handleLogoSubmit(e, setEndorsmentFormData)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          type="file"
          id="logo"
          accept="image/*"
          multiple={false}
        />
        {endorsmentFormData.logo && (
          <div>
            <img src={endorsmentFormData.logo} alt="Logo Preview" />
          </div>
        )}
      </div>

      <p>Upload images</p>
      <input
        onChange={(e) => handleImageSubmit(e, setEndorsmentFormData)}
        className="p-3 border border-gray-300 rounded w-full"
        type="file"
        id="images"
        accept="image/*"
        multiple
      />
      {endorsmentFormData.imageUrls.map((url, index) => (
        <div key={url}>
          <img src={url} className='h-[100px] w-[100px]' alt="Uploaded" />

        </div>
      ))}
      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
      >
        Create Endorsment
      </button>
    </form>
    <div className="mr-4 max-w-7xl px-6 lg:px-8">
  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-gray-200">
    {endorsements.map((endorsement, index) => (
      <div key={index} className="bg-white p-3 border border-gray-300 rounded-lg overflow-hidden">
        <div className="h-40 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${endorsement.imageUrls})` }}></div>
        <div className="py-4 text-left">
          {/* Endorsement Name */}
          <h2 className="text-lg font-semibold">{endorsement.endorsmentName}</h2>
          <p className="text-sm py-1">{endorsement.designation}</p>
          {/* Endorsement Feedback */}
          <p className="text-sm font-semibold py-1">"{endorsement.feedback}"</p>
          {/* Endorsement for */}
          <h3 className="text-lg font-semibold">Endorsement for:</h3>
          <div className='flex items-center'>
            <img src={endorsement.logo} className='w-12 h-12' alt="" />
            <p className='font-inter text-md font-semibold leading-6 text-left ml-2'>{endorsement.endorsmentFor}</p>
          </div>
        </div>
        <button onClick={() => handleEndorsmentDelete(endorsement._id)} className="text-red-500">
          <MdDelete />
        </button>
      </div>
    ))}
  </div>
</div>
       
      {/* Vendor */}
      <div className=" mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Vendor</h2>
      <form onSubmit={handleSubmit} className="p-6 mb-8 bg-white rounded-md shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="vendorName" className="block text-sm text-gray-600 font-semibold">Vendor Name</label>
            <input type="text" id="vendorName" name="vendorName" value={vendorData.vendorName} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm text-gray-600 font-semibold">Location</label>
            <input type="text" id="location" name="location" value={vendorData.location} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" required />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm text-gray-600 font-semibold">Description</label>
          <textarea id="description" name="description" value={vendorData.description} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <p>Upload Picture</p>
          <input
            onChange={(e) => handleImageSubmit(e, setVendorData)}
            className="p-3 border border-gray-300 rounded w-full"
            type="file"
            id="images"
            accept="image/*"
            multiple
          />
          {eventFormData.imageUrls.map((url, index) => (
            <div key={url}>
              <img src={url} className='h-[100px] w-[100px]' alt="Uploaded" />

            </div>
          ))}
        <p className='text-gray-600'>Picture should be of size 2160 x 1259 pixels</p>
        
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          {vendorData.services.map((service, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label htmlFor={`serviceName${index}`} className="block text-sm text-gray-600 font-semibold">Service Name</label>
                <input type="text" id={`serviceName${index}`} name="name" value={service.name} onChange={(e) => handleServiceChange(index, e)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor={`serviceDescription${index}`} className="block text-sm text-gray-600 font-semibold">Service Description</label>
                <textarea id={`serviceDescription${index}`} name="description" value={service.description} onChange={(e) => handleServiceChange(index, e)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" required />
              </div>
            </div>
          ))}
          <button type="button" onClick={addServiceField} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">Add Service</button>
        </div>

        <button type="submit" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">Create Vendor</button>
      </form>
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200  sm:mt-16  lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {vendors && vendors.map((vendor) => (
            <article key={vendor._id} className="flex max-w-xl border-gray-300 border rounded-md p-4 flex-col items-start justify-between">
              <div className="group relative mb-4">
                <Link to={`./`}>
                  <div className='flex'>
                    <h3 className="mt-3 text-lg text-left font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href="#">
                        <span className="flex inset-0 text-left"></span>
                        {vendor.vendorName}
                      </a>
                    </h3>
                  </div>
                  <p className="mt-5 line-clamp-3 text-left text-sm leading-7 text-gray-600" style={{ lineHeight: '1.6' }}>
                    {vendor.description}
                  </p>
                  <button onClick={() => handleVendorsDelete(vendor._id)} className="text-red-500">
                    <MdDelete />
                </button>

                </Link>
              </div>
            </article>
          ))}

            </div>
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

        <input
          onChange={(e) => handleImageSubmit(e, setBusinessFormData)}
          className='p-3 border border-gray-300 rounded w-full'
          type='file'
          id='images'
          accept='image/*'
          multiple
        />
       
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
            <Link to={`../admin`} key={business._id} className='w-full bg-white flex-none rounded-lg overflow-hidden'>
              {/* Business Image */}
              <div
                className='w-full h-[144px] bg-cover bg-center rounded-t-lg'
                style={{
                  backgroundImage: `url(${business.imageUrls})`,
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
    </div>
    <h3 className="text-xl font-bold mb-4 text-gray-700">Add contents in Homepage</h3>
    <Homepagecontentupload />

    </div>  
  );
};

export default Admin;
