import mongoose from 'mongoose';
const bidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bidtype: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
});

const postingSchema = new mongoose.Schema(
    {
      bidTitle: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      offer: {
        type: Number,
        required: true,
      },
      imageUrls:{
        type: Array,
        required: true,
      },
      userRef: {
        type: String,
        required: true,
      },
      bid: [bidSchema]
    },
    { timestamps: true }
  );
  
  const Posting = mongoose.model('Posting', postingSchema);
  
  export default Posting;