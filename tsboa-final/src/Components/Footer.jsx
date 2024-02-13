import React from 'react';
import logo from './Images/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0E214B] text-white min-h-329px py-10 w-full px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-41 w-113 mb-6 lg:mb-0" />

        {/* Newsletter Subscription */}
        <div className="flex flex-col lg:flex-row max-w-md gap-y-4 lg:gap-x-4 lg:ml-auto">
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mb-4 lg:mb-0"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/endorsments" className="hover:text-gray-300">Endorsements</Link>
        <Link to="/newspage" className="hover:text-gray-300">Information</Link>
        <Link to="/" className="hover:text-gray-300">Business-Directory</Link>
        <Link to="/events" className="hover:text-gray-300">Events</Link>
      </nav>

      {/* Copyright and Links */}
      <div className="mt-6 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:ml-auto text-sm">
        <div>© 2023 TSBOA. All rights reserved.</div>
        <div className="flex space-x-2">
          <a href="#" className="hover:text-gray-300">Terms</a>
          <span>|</span>
          <a href="#" className="hover:text-gray-300">Privacy</a>
          <span>|</span>
          <a href="#" className="hover:text-gray-300">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
