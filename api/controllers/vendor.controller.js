import Vendor from '../models/vendor.model.js';


export const createVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.create(req.body);
        return res.status(201).json(vendor);
      } catch (error) {
        next(error);
      }
  };

  export const getVendorDetails = async (req, res, next) => {
    try {
      const vendorId = req.params.id;
      const vendor = await Vendor.findById(vendorId);
  
      if (!vendor) {
        return res.status(404).json({
          success: false,
          message: 'Vendor not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        data: vendor,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getVendor = async (req, res, next) => {
    try {
      const vendorList = await Vendor.find();
      res.status(200).json(vendorList);
    } catch (error) {
      next(error);
    }
  };
  

  export const deleteVendor = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const deletedVendor = await Vendor.findByIdAndDelete(id);
  
      if (!deletedVendor) {
        return next(errorHandler(404, 'Vendor not found'));
      }
  
      res.status(200).json({ success: true, message: 'Vendor deleted successfully' });
    } catch (error) {
      next(error);
    }
  };