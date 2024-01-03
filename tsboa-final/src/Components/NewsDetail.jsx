import newsdetailmainimg from './Images/newsdetailmain.jpg';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTwitter } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { FaCopy } from "react-icons/fa";
import quoteauthor from './Images/authorquote.jpg';
import axios from 'axios';

const NewsDetail = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`/api/news/get/${params.newsId}`);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news details:', error);
      }
    };

    fetchNewsDetail();
  }, [[params.eventId]]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error('Error copying link to clipboard:', error);
    }
  };

  const shareOnSocialMedia = (platform) => {
    // You can customize the share URL based on the selected social media platform
    let shareUrl = window.location.href;
  
    switch (platform) {
      case 'facebook':
        // Encode the URL before sharing on Facebook
        const encodedUrl = encodeURIComponent(shareUrl);
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }
  
    window.open(shareUrl, '_blank');
  };

  if (!news) {
    // You can render a loading indicator here while fetching data
    return <div>Loading...</div>;
  }
  return (
    <div className='px-20 py-8 sm:px-4'>
      <h1 className='text-5xl font-semibold font-inter leading-15 tracking-tighter text-left'>{news.newsName}</h1>

      {/* Image */}
      <img
        src={newsdetailmainimg}
        alt="News Detail Image"
        className="w-full h-[640px] object-cover mt-8 rounded-md"
      />

      {/* Author and Published Info */}
      <div className="flex justify-between items-center mt-4 ">
        
        <div className='text-left'>
          <p className="text-lg font-medium font-inter">{news.author}</p>
          <p className="text-lg font-medium font-inter">{news.date} </p>
        </div>
  

        <div className="flex items-center">
          <button
            className="border-[#0E214B] flex bg-white text-[#344054] px-4 py-2 items-center rounded-md mr-4 border "
            onClick={copyLink}
          >
            <FaCopy/> Copy Link
          </button>
          <div className="flex space-x-4 text-[20px]">
            <FiFacebook onClick={() => shareOnSocialMedia('facebook')} />
            <FaLinkedin onClick={() => shareOnSocialMedia('linkedin')} />
            <FaTwitter onClick={() => shareOnSocialMedia('twitter')} />
          </div>
        </div>
      </div>
      <h1 className='text-4xl font-semibold font-inter leading-15 tracking-tighter text-left py-2 mt-8'>Introduction</h1>
      <p className='text-l font-normal font-inter leading-7 text-left py-4'>{news.description} </p>
     

  
    <p className='text-l font-normal font-inter leading-7 text-left py-4'> {news.description} </p>


    </div>
  );
}

export default NewsDetail;
