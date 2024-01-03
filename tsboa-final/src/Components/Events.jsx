import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Events = () => {

  const [randomEvents, setRandomEvents] = useState([]);

  useEffect(() => {
    const fetchRandomEvents = async () => {
      try {
        const response = await axios.get('/api/events/get');
        const data = response.data;
        console.log(data);
        if (data.success === false) {
          console.log(data.message);
          // Handle error if needed
          return;
        }

        setRandomEvents(data || []); // Ensure that randomEvents is an array or default to an empty array
      } catch (error) {
        console.error('Error fetching random events:', error);
        // Handle error if needed
      }
    };

    // Call the fetchRandomEvents function
    fetchRandomEvents();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4 justify-center items-center">
      {randomEvents.map((event, index) => (
        <Link to="/events" key={index}>
          <div
            className="relative bg-cover bg-center h-[298px] sm:h-[370px] sm:w-full w-full rounded-md overflow-hidden"
            style={{ backgroundImage: `url(${event.imageUrls[0]})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <h2 className="text-white text-lg sm:text-xl font-bold">{event.eventName}</h2>
              <p className="text-white text-sm sm:text-base text-left">
                Location: {event.location} <br />
                Date: {new Date(event.date).toLocaleDateString()} <br />
                Speaker: {event.speaker}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Events;