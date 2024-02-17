import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { app } from '../firebase';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const Homepagecontentupload = () => {
    const handleHomepageChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
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
        firstimageUrls:[],
        secondimageUrls:[],
        thirdimageUrls:[],
        fourthimageUrls:[],
      });

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
      const handleImageSubmit = (e, section) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
          const promises = [];
    
          for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i], section));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                [`${section}imageUrls`]: prevFormData[`${section}imageUrls`].concat(urls),
              }));
            })
            .catch((err) => {
              console.error('Error uploading images:', err);
            });
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



  return (
    <div>
      <form onSubmit={handlehomepageSubmit} className="max-w-lg mx-auto">
  {/* First Section */}
  <div className="mb-4">
    <label htmlFor="firstsectionHeading" className="block font-semibold">First Section Heading:</label>
    <input
      type="text"
      id="firstsectionHeading"
      name="firstsectionHeading"
      value={formData.firstsectionHeading}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="firstsectiontext" className="block font-semibold">First Section Text:</label>
    <input
      type="text"
      id="firstsectiontext"
      name="firstsectiontext"
      value={formData.firstsectiontext}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="firstsectionlink" className="block font-semibold">First Section Link:</label>
    <input
      type="text"
      id="firstsectionlink"
      name="firstsectionlink"
      value={formData.firstsectionlink}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
    <input
          onChange={(e) => handleImageSubmit(e, 'first')}
          className='p-3 border border-gray-300 rounded w-full'
          type='file'
          id='images'
          accept='image/*'
          multiple
        />
  {/* Second Section */}
  <div className="mb-4">
    <label htmlFor="secondsectionHeading" className="block font-semibold">Second Section Heading:</label>
    <input
      type="text"
      id="secondsectionHeading"
      name="secondsectionHeading"
      value={formData.secondsectionHeading}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="secondsectiontext" className="block font-semibold">Second Section Text:</label>
    <input
      type="text"
      id="secondsectiontext"
      name="secondsectiontext"
      value={formData.secondsectiontext}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="secondsectionlink" className="block font-semibold">Second Section Link:</label>
    <input
      type="text"
      id="secondsectionlink"
      name="secondsectionlink"
      value={formData.secondsectionlink}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <input
          onChange={(e) => handleImageSubmit(e, 'second')}
          className='p-3 border border-gray-300 rounded w-full'
          type='file'
          id='images'
          accept='image/*'
          multiple
        />
  <div className="mb-4">
    <label htmlFor="thirdsectionHeading" className="block font-semibold">Third Section Heading:</label>
    <input
      type="text"
      id="thirdsectionHeading"
      name="thirdsectionHeading"
      value={formData.thirdsectionHeading}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="thirdsectiontext" className="block font-semibold">Third Section Text:</label>
    <input
      type="text"
      id="thirdsectiontext"
      name="thirdsectiontext"
      value={formData.thirdsectiontext}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="thirdsectionlink" className="block font-semibold">Third Section Link:</label>
    <input
      type="text"
      id="thirdsectionlink"
      name="thirdsectionlink"
      value={formData.thirdsectionlink}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <input
          onChange={(e) => handleImageSubmit(e, 'third')}
          className='p-3 border border-gray-300 rounded w-full'
          type='file'
          id='images'
          accept='image/*'
          multiple
        />
  {/* Fourth Section */}
  <div className="mb-4">
    <label htmlFor="fourthsectionHeading" className="block font-semibold">Fourth Section Heading:</label>
    <input
      type="text"
      id="fourthsectionHeading"
      name="fourthsectionHeading"
      value={formData.fourthsectionHeading}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="fourthsectiontext" className="block font-semibold">Fourth Section Text:</label>
    <input
      type="text"
      id="fourthsectiontext"
      name="fourthsectiontext"
      value={formData.fourthsectiontext}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="fourthsectionlink" className="block font-semibold">Fourth Section Link:</label>
    <input
      type="text"
      id="fourthsectionlink"
      name="fourthsectionlink"
      value={formData.fourthsectionlink}
      onChange={handleHomepageChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
  <input
          onChange={(e) => handleImageSubmit(e, 'fourth')}
          className='p-3 border border-gray-300 rounded w-full'
          type='file'
          id='images'
          accept='image/*'
          multiple
        />
  <button
    type="submit"
    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    Update Homepage
  </button>
</form>
    </div>
  )
}

export default Homepagecontentupload
