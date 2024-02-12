
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    serviceImageUrls:{
        type: Array,
        required: true,
    },
    price: {
      type: Number,
      required: true
    }
  });
  

const vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  services: [serviceSchema]
}, { timestamps: true });

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
