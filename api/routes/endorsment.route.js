import express from 'express';
import { createEndorsment, getEndorsment, getEndorsmentDetails, deleteEndorsment } from '../controllers/endorsment.controller.js';

const router = express.Router();

router.post('/create',  createEndorsment); 
router.get('/get', getEndorsment);
router.get('/get/:id', getEndorsmentDetails);
router.delete('/delete/:id',  deleteEndorsment);

export default router;
