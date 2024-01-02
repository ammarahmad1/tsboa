// event.controller.js
import Event from '../models/event.model.js';
import { errorHandler } from '../utils/error.js';

export const createEvent = async (req, res, next) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};
export const getEventDetails = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};
// event.controller.js
export const getEvents = async (req, res, next) => {
    try {
      const eventList = await Event.find();
      res.status(200).json(eventList);
    } catch (error) {
      next(error);
    }
  };
  

// event.controller.js
export const deleteEvent = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const deletedEvent = await Event.findByIdAndDelete(id);
  
      if (!deletedEvent) {
        return next(errorHandler(404, 'Event not found'));
      }
  
      res.status(200).json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
  