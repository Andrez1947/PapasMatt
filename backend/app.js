const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const cloudinary = require('cloudinary');


const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

app.use(cookieParser());

//Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

//Default route (It'll go after all routes that I create)
app.use('/api/v1', products);
//Default route  by create user
app.use('/api/v1', auth)
//Default route  by create order
app.use('/api/v1', order)

//Middleware to handle errors
app.use(errorMiddleware);



module.exports = app;