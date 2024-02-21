
import mongoose from "mongoose";

const endorsmentSchema = new mongoose.Schema({
  endorsmentName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  endorsmentFor: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  insta: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  imageUrls:{
    type: Array,
    required: true,
  },
  imageUrls:{
    type: Array,
    required: true,
  },
  logo:{
    type: Array,
    required: true,
  },
  hashtags: [{ type: String }],
}, { timestamps: true });

const Endorsment = mongoose.model('Endorsment', endorsmentSchema);

export default Endorsment;
