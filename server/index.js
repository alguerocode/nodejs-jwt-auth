const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/auth');


require('dotenv').config();
const app = express();

const PORT = process.env.PORT;

// middlewares

app.use(cors({
  credentials:true,
  origin:"*",
  allowedHeaders:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.listen(PORT,() =>{
  console.log(`app listening in port ${PORT}`)
})

// routes

app.use('/auth',authRoute);

// 404 route

app.use('*',(req, res) =>{
  res.status(404).send('route not found');
})