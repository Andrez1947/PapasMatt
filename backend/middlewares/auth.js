const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

//Check if user is authenticated or not
exports. isAuthenticatedUser = catchAsyncErrors( async (req,res,next) => {

    const { token } = req.cookies

    if(!token) {
        return next(new ErrorHandler('Por favor ingrese para acceder a este recurso.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next();
});

//Handling user roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
   
    if(!roles.includes(req.user.role)) {
return next(
    new ErrorHandler(`El rol (${req.user.role}) no tiene permisos de acceso a este recurso`, 403));
  }
  next();
}
};
