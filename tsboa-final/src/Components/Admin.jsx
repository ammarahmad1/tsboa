import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { app } from '../firebase';
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
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser._id)
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      
      try {
        // Fetch user information or get it from your authentication context
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
  

  // Function to handle event form submission
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to create event
      const response = await axios.post('http://localhost:5000/api/events/create', eventFormData);
      console.log('Event created:', response.data);
      
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
      const response = await axios.post('http://localhost:5000/api/news/create', newsFormData);
      console.log('News created:', response.data);
      // Clear form data or perform any other actions
    } catch (error) {
      console.error('Error creating news:', error.response?.data || error.message);
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

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h2>

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

      {/* News creation form */}
      <form onSubmit={handleNewsSubmit} className="p-6 bg-white rounded-md shadow-md">
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
    </div>
  );
};

export default Admin;
