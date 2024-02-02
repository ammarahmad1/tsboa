import Business from '../models/business.model.js';


export const createBusiness = async (req, res, next) => {
    try {
        const business = await Business.create(req.body);
        return res.status(201).json(business);
      } catch (error) {
        next(error);
      }
  };

  export const getBusinessDetails = async (req, res, next) => {
    try {
      const businessId = req.params.id;
      const business = await Business.findById(businessId);
  
      if (!business) {
        return res.status(404).json({
          success: false,
          message: 'business not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        data: business,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getBusiness = async (req, res, next) => {
    try {
      const businessList = await Business.find();
      res.status(200).json(businessList);
    } catch (error) {
      next(error);
    }
  };
  

  export const deleteBusiness = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const deletedBusiness = await Business.findByIdAndDelete(id);
  
      if (!deletedBusiness) {
        return next(errorHandler(404, 'Event not found'));
      }
  
      res.status(200).json({ success: true, message: 'Business deleted successfully' });
    } catch (error) {
      next(error);
    }
  };