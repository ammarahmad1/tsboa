import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Components/Hero';
import Features_Section from './Components/Features_Section';
import Events from './Components/Events';
import Articles from './Components/Articles';
import Pricing from './Components/Pricing';


const HomePage = () => {
  const navigate = useNavigate();

        useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo(0, 0);
        }, []);

  return (
    <div>
      
      <Hero />
      <Features_Section />
      <Events />
      <Articles />
      <Pricing />

    </div>
  )
}

export default HomePage
