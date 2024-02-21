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
            required: false,
        },
        phoneNumber: {
            type: String, 
            required: false,
        },
        imageUrls:{
            type: Array,
            required: true,
        },
        hashtags: [{ type: String }],
    }, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);

export default Business;
    