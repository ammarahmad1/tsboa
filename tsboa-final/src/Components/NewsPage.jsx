import newsthumbnail1 from './Images/newsthumbnail1.jpg';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading'; 

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news/get');
        const data = response.data;
        console.log(data)
        if (data.success === false) {
          console.log(data.message);
          // Handle error if needed
          return;
        }

        setNews(data || []); // Ensure that news is an array or default to an empty array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Handle error if needed
      }
    };

    // Call the fetchNews function
    fetchNews();
  }, []);

  return (
    <div className='px-20 py-8 sm:px-4'>
      <div className='max-w-[1512px] max-h-[206px] align-middle top-[96px]   gap-64'>
        <h2 className='text-lg font-semibold font-inter text-center leading-10 tracking-tighter'>News</h2>
      </div>

      {loading ? (
        <Loading /> // Show loading component while waiting for data
      ) : (

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10">
        {news.map((news) => (
          <Link to={`/newsdetail/${news._id}`} key={news._id} className="w-full bg-white flex-none rounded-lg overflow-hidden">
            {/* News Image */}
            <div className="w-full h-[240px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${newsthumbnail1})` }}></div>

            {/* News Details */}
            <div className="py-4 gap-4 text-left">
              {/* News Metadata */}
              <p className="text-sm">{`${news.author} • ${new Date(news.date).toLocaleDateString()}`}</p>

              {/* News Title */}
              <h2 className="text-lg font-semibold">{news.newsName}</h2>

              {/* News Description */}
              <p className="text-sm">{news.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsPage;