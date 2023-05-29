const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const errorMiddleware = require('./middlewares/errors');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Setting up cloudinary configuration


//Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');

//Default route (It'll go after all routes that I create)
app.use('/api/v1', products);
//Default route  by create user
app.use('/api/v1', auth);
//Default route  by create a payment
app.use('/api/v1', payment)
//Default route  by create order
app.use('/api/v1', order)

//Middleware to handle errors
app.use(errorMiddleware);



module.exports = app;