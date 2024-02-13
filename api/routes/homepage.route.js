import express from "express";
import { createHomepage, getHomepage, deleteHomepage, updateHomepage } from "../controllers/homepage.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',  createHomepage);
router.get('/get/:id', getHomepage);
router.delete('/delete/:id', deleteHomepage)
router.post('/update/:id', updateHomepage);
router.get('/get', getHomepage);

export default router;