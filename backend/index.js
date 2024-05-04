const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
// const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });




const dirname = path.resolve();
const app = express();

app.use(express.static(path.join(dirname,'/frontend/dist')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(dirname,'frontend','dist','index.html'));
})

app.use(express.json());
app.use(cookieParser());
app.listen(8000, () => {
  console.log("Running...");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
