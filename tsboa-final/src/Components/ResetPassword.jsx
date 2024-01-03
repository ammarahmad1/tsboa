import React from 'react'
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { database } from "../firebase";

import { Navigate } from 'react-router-dom';
const ResetPassword = () => {
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const emailVal = e.target.email.value;
      await sendPasswordResetEmail(database.auth, emailVal);
      alert("Check your email for reset instructions");
      history("/");
    } catch (error) {
      alert(error.message); // Display the error message
    }
  };
  

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-900">
            Forgot Your Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
          No worries, we’ll send you reset instructions.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" action="#" method="POST">
            

            <div>
           
            <form  onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Enter your gmail Email address
              </label>
                <input name="email" className="block w-full px-4 py-2 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
 /><br/><br/>
                <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800">Reset</button>
            </form>
            </div>
          </form>

          <p className="mt-3 text-center text-sm leading-5 text-gray-600">
            <a href="./signin" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
