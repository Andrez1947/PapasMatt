const express = require('express');
const router = express.Router();

const { 
    processPayment,
    sendMercadopagoApi
 } = require('../controllers/paymentController');

const {isAuthenticatedUser} = require('../middlewares/auth');

// Create payment => /api/v1/order/new
router.route('/payment/process').post(isAuthenticatedUser, (req, res, next) => {
    // Agrega las backurls a la respuesta
    const successUrl = '/payment/success';
    const failureUrl = "'/payment/failure'";
    const pendingUrl = "'/payment/pending'";

    processPayment(req, res, next, successUrl, failureUrl, pendingUrl);
});

// Send api by frontend
router.route('/mercadopagoapi').get(isAuthenticatedUser, sendMercadopagoApi);

module.exports = router;
