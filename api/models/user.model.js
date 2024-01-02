import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: false,
        unique: true,
    },
    phonenumber: {
        type: String, 
        required: false,
        unique: true,
    },
    avatar: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/141/425/png-clipart-user-profile-computer-icons-avatar-profile-s-free-angle-rectangle-thumbnail.png",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: false,
        unique: false, 
    },
    yearestablished: {
        type: String, 
        required: false,
        unique: false, 
    },
    industrytype: {
        type: String,
        required: false,
        unique: false,
    },
    password: {
        type: String,
        required: true,
        unique: false, 
    }, isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }
);


const User = mongoose.model('User', userSchema);

export default User;
