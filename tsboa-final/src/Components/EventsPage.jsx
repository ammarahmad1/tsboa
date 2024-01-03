import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Eventpic from './Images/eventimage.jpg';
import filterIcon from './Images/Icondate.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Loading from './Loading';
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css';

const EventsPageprac = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); 

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
    window.scrollTo(0, 0);
  }, []);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date).toLocaleDateString();
    const searchMatch =
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.speaker.toLowerCase().includes(searchQuery.toLowerCase());

    const dateMatch = selectedDate ? eventDate === selectedDate : true;

    return searchMatch && dateMatch;
  });


  return (
    <div className='lg:px-16 lg:py-8 sm:px-2'>
      {/* Featured Article */}
      <div className="lg:max-w-[1340px] lg:h-[720px] border-radius-2 overflow-hidden  sm:h-[444px] mx-auto relative">
        {/* Background Image */}
        <FaArrowLeft className="hidden lg:flex absolute text-white text-4xl left-4 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        <img src={Eventpic} alt="Featured Article" className="lg:w-[1340px] lg:h-[720px] object-cover rounded-3xl sm:w-[375px] sm:h-[444px]" />
        {/* Right Arrow */}
        <FaArrowRight className="hidden lg:flex absolute text-white text-4xl right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        <div className="absolute lg:top-[496px] lg:w-[872px] bottom-0 left-0 z-50 p-6 text-white text-left sm:h-[256px] sm:w-[300px] sm:top-24 sm:pt-16 sm:px-0 sm:mx-0">
          <div className='sm:p-6 sm:pt-8 text-left'>
          <h3 className="text-2xl font-semibold font-inter">{events.length > 0 ? events[0].eventName : 'Featured event name goes here'}</h3>
          <p className="text-lg font-normal font-inter">
          {events.length > 0 ? events[0].description :  'Arcu quis interdum arcu hac justo. Id risus bibendum leo etiam eget pharetra elit massa. Neque in tortor et gravida amet. Pretium et semper semper nulla sed magnis.'}
          </p>
          </div>
        </div>
      </div>

      {/* Event section */}
      <section className="mt-6">
      <label htmlFor="search-input" className="sr-only">
          Search for Events, Venue, Artist
        </label>
        <div className="flex items-center space-x-2">
          <input
            id="search-input"
            name="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
            className="flex-auto max-w-[300px] rounded-md border-2 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Search for events/venue/artists"
          />
          <button
            type="submit"
            className="flex-none min-w-[64px] rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Search
          </button>
        </div>

        {/* Filter by date button */}
        <div className="flex items-center space-x-2 mt-4">
          <img src={filterIcon} alt="Filter Icon" className="w-5 h-5 mr-1" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a date"
            className="flex-auto max-w-[164px] rounded-md border-2 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </section>
      {/* Event Cards */}

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10">
          {filteredEvents.map((event) => (
            <Link to={`/eventdetail/${event._id}`} key={event._id} className="w-full bg-white flex-none rounded-lg overflow-hidden shadow-md">
          {/* Event Image */}
          <div className="w-full h-[275px] bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${event.imageUrls[0]})` }}>
            {/* Price Tag */}
            <div className="absolute text-center ml-4 mt-4 w-[74px] h-[41px] justify-center  bg-white text-black flex items-center rounded-lg">
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
          </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPageprac;