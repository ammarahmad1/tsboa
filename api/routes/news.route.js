// news.route.js
import express from 'express';
import { createNews, getNews, deleteNews, getNewsDetail } from '../controllers/news.controller.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/create',  createNews);
router.get('/get', getNews);
router.get('/get/:id', getNewsDetail);
router.delete('/delete/:id', deleteNews);

export default router;
