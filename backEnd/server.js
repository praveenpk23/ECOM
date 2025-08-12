import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js'
dotenv.config();
const app = express();

// Middleware
const allowOrigin = ['http://localhost:5173']
app.use(cors({origin:(origin,callback)=>{
  if(!origin || allowOrigin.includes(origin)){
    callback(null,true)
  }else{
    callback(new Error("Invalid Origin"));
  }
}}));



app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });


// Routes
app.use('/api/products',productRoutes);
// app.use('/api/products/:id',productRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
