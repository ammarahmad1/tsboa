import React, { useState } from 'react';
import logo from './Images/logo.png';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';



const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyname: '',
    phonenumber: '',
    email: '',
    address: '',
    yearestablished: '',
    industrytype: '', 
    password: '',
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setLoading(true); 

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

      const userData = response.data;
      console.log('Signup successful:', userData);
      alert('Account was created successfully');
      navigate('/signin')
      // Redirect or perform other actions after successful signup
    } catch (error) {
      console.error('Error signing up:', error);
      console.error('Error response from server:', error.response.data);
      setError('Unable to sign up. Please check your input and try again.'); // Set error message
    } finally {
      setLoading(false); // Set loading back to false
    }
    // Clear form fields after submission
    setFormData({
      companyname: '',
      phonenumber: '',
      email: '',
      address: '',
      yearestablished: '',
      industrytype: '',
      password: '',
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src={logo}
        alt="Company logo"
      />
    
    </div>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Get started with these steps.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[1250px]">
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST" >
            {/* Company Name and Phone Number */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-left text-sm font-medium leading-5 text-gray-700">
                  Company Name
                </label>
                <input
                 id="companyname"
                 name="companyname"
                 type="text"
                 required
                 className="mt-1 p-2 border w-full rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                 onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm text-left font-medium leading-5 text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phonenumber"
                  name="phonenumber"
                  type="text"
                  required
                  className="mt-1 p-2 border w-full rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email and Address */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-left leading-5 text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 p-2 border w-full rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-left text-sm font-medium leading-5 text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="string"
                  required
                  className="mt-1 p-2 border w-full rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  onChange={handleChange}
               />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="yearEstablished" className="block text-left text-sm font-medium leading-5 text-gray-700">
                  Year Established
                </label>
                <input
                  id="yearestablished"
                  name="yearestablished"
                  type="string"
                  required
                  className="mt-1 p-2 border w-full rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  onChange={handleChange}
               />
              </div>
              <div>
                <label  className="block text-sm text-left font-medium leading-5 text-gray-700">
                  Industry Type
                </label>
                <input
                  id="industrytype"
                  name="industrytype"
                  type="string"
                  required
                  className="mt-1 p-2 border w-full rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  onChange={handleChange}
               />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                minLength="8"
                required
                pattern="^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$"
                className="mt-1 p-2 border w-full rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                onChange={handleChange} 
            />
              <p className="mt-2 text-sm text-gray-500">
                Must be at least 8 characters and contain one special character.
              </p>
            </div>

       
            <div>
            <button
              type="submit"
              className="flex w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0E214B] hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-blue-800"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
            </div>
            {error && (
            <div className="mt-4 text-center text-sm text-red-500">
              {error}
            </div>
          )}
          </form>

          {/* Sign Up with Google Button */}
          <div className="mt-6">
            <button
              type="button"
              className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FaGoogle className="mr-2" />
              Sign up with Google
            </button>
          </div>

          {/* Terms and Conditions */}
          <p className="mt-4 text-center text-sm text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="font-semibold leading-6 text-[#0E214B] hover:text-indigo-500">
              Terms and Conditions
            </a>
            .
          </p>

          <p className="mt-4 text-center text-sm text-gray-500">
           Already have an account? {' '}
            <a href="/signin" className="font-semibold leading-6 text-[#0E214B] hover:text-indigo-500">
              Sign in
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
