import Posting from '../models/posting.model.js';
import { errorHandler } from '../utils/error.js';

export const createPosting = async (req, res, next) => {
  try {
    const posting = await Posting.create(req.body);
    return res.status(201).json(posting);
  } catch (error) {
    next(error);
  }
};

export const getPosting = async (req, res, next) => {
  try {
    const posting = await Posting.findById(req.params.id);
    if (!posting) {
      return next(errorHandler(404, 'Posting not found!'));
    }
    res.status(200).json(posting);
  } catch (error) {
    next(error);
  }
};

export const getPostings = async (req, res, next) => {
  try {
    const postingList = await Posting.find();
    res.status(200).json(postingList);
  } catch (error) {
    next(error);
  }
};

export const deletePosting = async (req, res, next) => {
  const posting = await Posting.findById(req.params.id);

  if (!posting) {
    return next(errorHandler(404, 'posting not found!'));
  }
 {/* 
  if (req.user.id !== Posting.userRef) {
    return next(errorHandler(401, 'You can only delete your own postings!'));
  }
*/}
  try {
    await Posting.findByIdAndDelete(req.params.id);
    res.status(200).json('Posting has been deleted!');
  } catch (error) {
    next(error);
  }
};


export const updatePosting = async (req, res, next) => {
  const posting = await Posting.findById(req.params.id);
  if (!posting) {
    return next(errorHandler(404, 'Posting not found!'));
  }


  try {
    const updatedPosting = await Posting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPosting);
  } catch (error) {
    next(error);
  }
};


