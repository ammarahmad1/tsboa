import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postingRouter from './routes/posting.route.js';
import adminRouter from './routes/admin.route.js'; 
import businessRouter from './routes/business.route.js'; 
import endorsmentRouter from './routes/endorsment.route.js'; 
import vendorRouter from './routes/vendor.route.js'; 
import newsRouter from './routes/news.route.js'; 
import cookieParser from 'cookie-parser';
import path from 'path';
import eventRouter from './routes/event.route.js';
import homepageRouter from './routes/homepage.route.js';
import stripePackage from 'stripe';

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();

const app = express();
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

app.use(cookieParser());

// Use cors middleware to enable CORS
app.use(cors());

app.listen(5000, () => {
  console.log('Server is running on port 5000!!');
});

app.post('/api/buymembership', async (req, res) => {
  const amount = 1000; // Amount in cents (10 dollars)
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: 'Error creating payment intent' });
  }
});


app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posting', postingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/business', businessRouter);
app.use('/api/news', newsRouter);
app.use('/api/endorsment', endorsmentRouter);
app.use('/api/vendor', vendorRouter);
app.use('/api/events', eventRouter);
app.use('/api/homepage', homepageRouter);
app.use(express.static(path.join(__dirname, '../tsboa-final/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'tsboa-final', 'public', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

