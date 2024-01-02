import express from "express";
import { createPosting, getPosting, deletePosting, getPostings, updatePosting } from "../controllers/posting.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',  createPosting);
router.get('/get/:id', getPosting);
router.delete('/delete/:id', deletePosting)
router.post('/update/:id', updatePosting);
router.get('/get', getPostings);
export default router;