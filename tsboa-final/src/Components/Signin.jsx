import React from 'react';
import {  useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import logo from './Images/logo.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from './OAuth';


const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    dispatch(signInStart());
  
    try {
      const response = await axios.post('/api/auth/signin', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response) {
        throw new Error('Response object is undefined.');
      }
  
      const data = response.data;
      console.log(data)
      if (data.success === false) {
        if (data.message === 'Invalid credentials') {
          dispatch(signInFailure('Wrong credentials'));
        } else {
          dispatch(signInFailure(data.message));
        }
        return;
      }
      
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error('Error during signin:', error);
  
      // Check if the error object has a response property and extract the message
      const errorMessage = error.response?.data?.message || 'An error occurred while signing in.';
      
      dispatch(signInFailure(errorMessage));
    }
  };
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Company logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm text-left font-medium leading-6 text-gray-900">
              
              Email address
              <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            </label>
           
          </div>

          <div>
            <div className="items-left justify-between">
            <label htmlFor="password" className="block text-left items-start text-sm font-medium leading-6 text-gray-900">
                  Password
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
              <div className="text-sm">
                <a  href="/resetpassword" className="font-semibold text-[] hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
             
            </div>
          </div>

          <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#0E214B] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
              <div className="mt-6">
          {error && (
            <div className="text-center text-sm text-red-500">
            {error.response.data.message || 'An error occurred while signing in.'}
          </div>
          )}
         </div> 
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-500">
              Or continue with:
            </p>
            <div className="mt-3 flex justify-center space-x-4">
             <OAuth /> 

              
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="./signup" className="font-semibold leading-6 text-[#0E214B] hover:text-indigo-500">
              Sign up
            </a>
          </p>
        </div>
        </div>
    
    </>
  );
}

export default Signin;