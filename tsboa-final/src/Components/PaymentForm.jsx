// PaymentForm.js

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice'; 
const PaymentForm = () => {
  const [paymentError, setPaymentError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: name,
        email: email
      }
    });

    if (result.error) {
      setPaymentError(result.error.message);
    } else {
      
      const response = await fetch('/api/buymembership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          paymentMethod: result.paymentMethod,
          name: name,
          email: email
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Payment successful, dispatch action to update isLoggedIn state
        dispatch(signInSuccess()); // Dispatch the signInSuccess action
      } else {
        // Payment failed, show error message
        setPaymentError(responseData.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <CardElement className="border rounded p-2" />
      </div>
      {paymentError && <div className="text-red-500 mb-4">{paymentError}</div>}
      <button type="submit" disabled={!stripe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
