
import Homepage from '../models/homepage.model.js';
import { errorHandler } from '../utils/error.js';

export const createHomepage = async (req, res, next) => {
  try {
    const newHomepage = new Homepage(req.body);
    await newHomepage.save();
    res.status(201).json(newHomepage);
  } catch (error) {
    next(error);
  }
};
export const getHomepageDetails = async (req, res, next) => {
  try {
    const homepageId = req.params.id;
    const homepage = await Homepage.findById(homepageId);

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: homepage,
    });
  } catch (error) {
    next(error);
  }
};
export const getHomepage = async (req, res, next) => {
    try {
      const homepageList = await Homepage.find();
      res.status(200).json(homepageList);
    } catch (error) {
      next(error);
    }
  };
  


export const deleteHomepage = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const deletedHomepage = await Homepage.findByIdAndDelete(id);
  
      if (!deletedHomepage) {
        return next(errorHandler(404, 'content not found'));
      }
  
      res.status(200).json({ success: true, message: 'Content deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
  
  
export const updateHomepage = async (req, res, next) => {
    const homepage = await Homepage.findById(req.params.id);
    if (!homepage) {
      return next(errorHandler(404, 'Content not found!'));
    }
  
  
    try {
      const updatedHomepage = await Homepage.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedHomepage);
    } catch (error) {
      next(error);
    }
  };
  
  