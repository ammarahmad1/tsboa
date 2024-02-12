import Endorsment from '../models/endorsment.model.js';


export const createEndorsment = async (req, res, next) => {
    try {
        const endorsment = await Endorsment.create(req.body);
        return res.status(201).json(endorsment);
      } catch (error) {
        next(error);
      }
  };

  export const getEndorsmentDetails = async (req, res, next) => {
    try {
      const endorsmentId = req.params.id;
      const endorsment = await Endorsment.findById(endorsmentId);
  
      if (!endorsment) {
        return res.status(404).json({
          success: false,
          message: 'Endorsment not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        data: endorsment,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getEndorsment = async (req, res, next) => {
    try {
      const endorsmentList = await Endorsment.find();
      res.status(200).json(endorsmentList);
    } catch (error) {
      next(error);
    }
  };
  

  export const deleteEndorsment = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const deletedEndorsment = await Endorsment.findByIdAndDelete(id);
  
      if (!deletedEndorsment) {
        return next(errorHandler(404, 'Endorsment not found'));
      }
  
      res.status(200).json({ success: true, message: 'Endorsment deleted successfully' });
    } catch (error) {
      next(error);
    }
  };