const express = require('express');
const router = express.Router();

const { newOrder, getSimpleOrder, myOrders, updateOrder, allOrders, deleteOrder } = require('../controllers/orderController');

const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//Create order => /api/v1/order/new
router.route('/order/new').post(isAuthenticatedUser, newOrder);

//Get single order => /api/v1/order/:id
router.route('/order/:id').get(isAuthenticatedUser, getSimpleOrder);

//Get logged in user orders => /api/v1/order/me
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

//Update / Process order => /api/v1/admin/order/:id
router.route('/admin/order/:id').get(isAuthenticatedUser,authorizeRoles("admin"), updateOrder);

//Get all orders => /api/v1/admin/orders/
router.route('/admin/orders/').get(isAuthenticatedUser,authorizeRoles("admin"), allOrders);

//Delete order => /api/v1/order/:id
router.route('/order/:id').delete(isAuthenticatedUser,authorizeRoles("admin"), deleteOrder);

module.exports = router;
