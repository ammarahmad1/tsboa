import express from 'express';
import { createBusiness, getBusiness, getBusinessDetails, deleteBusiness } from '../controllers/business.controller.js';

const router = express.Router();

router.post('/create',  createBusiness); 
router.get('/get', getBusiness);
router.get('/get/:id', getBusinessDetails);
router.delete('/delete/:id',  deleteBusiness);

export default router;
