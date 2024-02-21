
import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  newsName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false
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
    required: false,
  },
  hashtags: [{ type: String }],
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);

export default News;
