const express = require('express');
const mongoose = require('mongoose');
const userRoutes= require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err)
})

const app = express();

app.use(express.json());

app.listen(8000,()=>{
    console.log('Running...');
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);