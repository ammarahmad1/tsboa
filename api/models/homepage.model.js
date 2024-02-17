
import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema({
  firstsectionHeading: {
    type: String,
    required: true,
  },
  firstsectiontext: {
    type: String,
    required: true,
  },
  firstsectionlink: {
    type: String,
    required: true,
  },
  firstsectionimageUrls:{
    type: Array,
    required: true,
  },
  secondsectionHeading: {
    type: String,
    required: true,
  },
  secondsectiontext: {
    type: String,
    required: true,
  },
  secondsectionlink: {
    type: String,
    required: true,
  },
  secondsectionimageUrls:{
    type: Array,
    required: true,
  },
  thirdsectionHeading: {
    type: String,
    required: true,
  },
  thirdsectiontext: {
    type: String,
    required: true,
  },
  thirdsectionlink: {
    type: String,
    required: true,
  },
  thirdsectionimageUrls:{
    type: Array,
    required: true,
  },
  fourthsectionHeading: {
    type: String,
    required: true,
  },
  fourthsectiontext: {
    type: String,
    required: true,
  },
  fourthsectionlink: {
    type: String,
    required: true,
  },
  fourthsectionimageUrls:{
    type: Array,
    required: true,
  },
  firstimageUrls:{
    type: Array,
    required: true,
  },
  secondimageUrls:{
    type: Array,
    required: true,
  },
  thirdimageUrls:{
    type: Array,
    required: true,
  },
  fourthimageUrls:{
    type: Array,
    required: true,
  },
  }, { timestamps: true });

const Homepage = mongoose.model('Homepage', homepageSchema);

export default Homepage;
