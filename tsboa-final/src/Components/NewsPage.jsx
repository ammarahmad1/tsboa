import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading'; 

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news/get');
        const data = response.data;

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

  // Function to truncate description to a maximum of 15 words
  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 15) {
      return words.slice(0, 15).join(' ') + '...';
    }
    return description;
  };

  // Filter news based on search query
  const filteredNews = news.filter((newsItem) => {
    if (!searchQuery.trim()) return true; // If search query is empty, return true for all news items
    // Check if any of the hashtags in the news item match the search query
    return newsItem.hashtags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className='px-20 py-8 sm:px-4'>
      <section className="mt-6">
        <label htmlFor="search-input" className="sr-only">
          Search for News by Hashtags
        </label>
        <div className="flex justify-center">
          <input
            id="search-input"
            name="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
            className="flex-auto max-w-[300px] rounded-md border-2 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Search for hashtags"
          />
          <button
            type="submit"
            className="flex-none min-w-[64px] rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Search
          </button>
        </div>
      </section>
      
      <div className='max-w-full max-h-[206px] align-middle top-[96px]   gap-64'>
        <h2 className='text-lg font-semibold font-inter text-center leading-10 tracking-tighter'>News</h2>
      </div>

      {loading ? (
        <Loading /> // Show loading component while waiting for data
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10">
          {filteredNews.map((newsItem) => (
            <Link to={`/newsdetail/${newsItem._id}`} key={newsItem._id} className="w-full bg-white flex-none rounded-lg overflow-hidden">
              {/* News Image */}
              <div className="w-full h-[240px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${newsItem.imageUrls})` }}></div>

              {/* News Details */}
              <div className="py-4 gap-4 text-left">
                {/* News Metadata */}
                <p className="text-sm">{`${newsItem.author} • ${new Date(newsItem.date).toLocaleDateString()}`}</p>

                {/* News Title */}
                <h2 className="text-lg font-semibold">{newsItem.newsName}</h2>

                {/* News Description */}
                <p className="text-sm">{truncateDescription(newsItem.description)}</p>
                
                {/* News Hashtags */}
                {newsItem.hashtags && newsItem.hashtags.length > 0 && (
                  <span className="block text-gray-500">
                    {newsItem.hashtags.join(", ")}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsPage;
