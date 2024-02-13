import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm'; // You'll create this component next

const stripePromise = loadStripe('pk_test_51OUJdxCFlgfWWpdtaOR8AxFt2qcE7nUtaFloECOq1dYNab32lx06rZKCkqrNxbSrf6i1RkcsPOqNJkQPKmXrDWfI00bCrYMnsJ'); // Replace with your Stripe public key

const BuyMembership = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default BuyMembership;
