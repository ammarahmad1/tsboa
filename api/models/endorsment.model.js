
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
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  insta: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
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
}, { timestamps: true });

const Endorsment = mongoose.model('Endorsment', endorsmentSchema);

export default Endorsment;
