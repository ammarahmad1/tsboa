
import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  newsName: {
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
  author: {
    type: String,
    required: true,
  },
  imageUrls:{
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // Add any other fields you need for newss
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);

export default News;
