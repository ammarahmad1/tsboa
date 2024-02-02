import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
    {
        businessName:{
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
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String, 
            required: true,
        },
        imageUrls:{
            type: Array,
            required: true,
        },
    }, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);

export default Business;
    