
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  ticketwebsite: {
    type: String,
    required: true,
  },
  speaker: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  imageUrls:{
    type: Array,
    required: true,
  },
  offer: {
    type: Number,
    required: true,
  },
  vipoffer: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
