import News from '../models/news.model.js';
import { errorHandler } from '../utils/error.js';

export const createNews = async (req, res, next) => {
  try {
    const newNews = new News(req.body);
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    next(error);
  }
};

export const getNewsDetail = async (req, res, next) => {
  const { id } = req.params;

  try {
    const newsDetail = await News.findById(id);

    if (!newsDetail) {
      return next(errorHandler(404, 'News not found'));
    }

    res.status(200).json(newsDetail);
  } catch (error) {
    next(error);
  }
};

export const getNews = async (req, res, next) => {
    try {
      const newsList = await News.find();
      res.status(200).json(newsList);
    } catch (error) {
      next(error);
    }
  };
  
// news.controller.js
export const deleteNews = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const deletedNews = await News.findByIdAndDelete(id);
  
      if (!deletedNews) {
        return next(errorHandler(404, 'News not found'));
      }
  
      res.status(200).json({ success: true, message: 'News deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
  