import express from 'express';
import { createVendor, getVendor, deleteVendor, getVendorDetails } from '../controllers/vendor.controller.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/create',  createVendor);
router.get('/get', getVendor);
router.get('/get/:id', getVendorDetails);
router.delete('/delete/:id', deleteVendor);

export default router;
