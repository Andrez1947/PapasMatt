const express = require('express');
const router = express.Router();

const { 
    processPayment,
    sendMercadopagoApi
 } = require('../controllers/paymentController');

const {isAuthenticatedUser} = require('../middlewares/auth');

//Create payment => /api/v1/order/new
router.route('/payment/process').post(isAuthenticatedUser, processPayment);

//Send api by frontend
router.route('/mercadopagoapi').get(isAuthenticatedUser, sendMercadopagoApi);



module.exports = router;
