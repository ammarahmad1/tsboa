// event.route.js
import express from 'express';
import { createEvent, getEvents, getEventDetails, deleteEvent } from '../controllers/event.controller.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/create',  createEvent); // New route for creating events
router.get('/get', getEvents);
router.delete('/delete/:id', deleteEvent);
router.get('/get/:id', getEventDetails);
export default router;
