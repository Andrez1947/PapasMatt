const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, updateUser } = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

//Login user => api/v1/register
router.route('/register').post(registerUser);
//Login user => api/v1/login
router.route('/login').post(loginUser);

//Recovery password => api/v1/password/forgot
router.route('/password/forgot').post(forgotPassword);

//Logout user => api/v1/logout
router.route('/logout').get(logout);

//Reset password
router.route('/password/reset/:token').put(resetPassword);

// Give profiles User information
router.route('/me').get(isAuthenticatedUser, getUserProfile);

// Change or update password
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

// Change or update profile information
router.route('/me/update')
.put(isAuthenticatedUser, updateProfile);

//Handling route allUsers
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles ('admin'), allUsers);

//Handling route by user id
router.route("/admin/users")
.get(isAuthenticatedUser, authorizeRoles ('admin'), getUserDetails)
.put(isAuthenticatedUser, authorizeRoles ('admin'), updateUser)

module.exports = router;