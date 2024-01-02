// admin.route.js
import express from 'express';
import { createEvent } from '../controllers/event.controller.js';
import { createNews } from '../controllers/news.controller.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { adminDashboard } from '../controllers/auth.controller.js';

const router = express.Router();

// Create endpoint for admins to add events
router.post('/events', verifyAdmin, createEvent);
router.get('/dashboard', verifyAdmin, adminDashboard);
// Create endpoint for admins to add news
router.post('/news', verifyAdmin, createNews);

export default router;
