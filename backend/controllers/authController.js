//Import User
const User = require("../models/user");

//Import Error Handler
const ErrorHandler = require("../utils/errorHandler");

//Import catchAsyncErrors file
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//Import sendToken by cookie jwt token
const sendToken = require('../utils/jwtToken');

//Import sendEmail to recovery password
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');

//const cloudinary = require('cloudinary');

//register a user => api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => { 

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,    
  });

  //It's by sendjwt token by Cookie
  sendToken(user, 200, res);
  console.log(user);
});


//Login User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password is entered by user.
  if (!email || !password) {
    return next(
      new ErrorHandler("Por favor ingrese un correo y contraseña", 400)
    );
  }

  //Finding user in database
  const user = await User.findOne({ email }).select("+ password"); //it is into a breaks cause in user model, password the selection is false

  if (!user) {
    return next(new ErrorHandler("Correo o contraseña inválidos", 401));
  }

  //Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Correo o contraseña inválidos", 401));
  }

  //It's by sendjwt token by Cookie
  sendToken(user, 200, res);
  console.log(user);  
});

//Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors ( async (req, res, next) => {

  const user = await User.findOne({email: req.body.email});

  if(!user) {
      return next(new ErrorHandler('Usuario no encontrado con este correo', 404));
  }

  //Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({validateBeforeSave: false});

  //Create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  //It will be body email message that user will receive
    const message = `Tu token de reseteo de contraseña es el siguiente:\n\n${resetUrl}\n\n Si no has solicitado dicho reseteo, por favor ignora este mensaje.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Recuperación de contraseña, Papas Matt',
            message
        })

        res.status(200).json({
            success: true,
            message: `Correo enviado a: ${user.email}`

        })
       
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false})

        return next(new ErrorHandler(error.message, 500));
    }
});

//Logout user => /api/v1/logout
exports.logout = catchAsyncErrors ( async (req, res, next) => {
  res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true
  });

  res.status(200).json({
      success: true,
      message: 'Logged out'
  });

});

//Reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors ( async (req, res, next) => {

  //Hash URL Token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
  })

  if(!user) {
      return next(new ErrorHandler('El token de restauración es invalido o ha expirado.'))
  }

  if(req.body.password !== req.body.confirmPassword) {
      return (new ErrorHandler('La contraseña no coincide', 400))
  }

  //Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors( async (req, res, next) => {
  const user= await User.findById(req.user.id); //This parameter was created by indentify user logged token.

  res.status(200).json({
    success: true,
    user
  });
});

// Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors ( async (req, res, next) => {
  const user= await User.findById(req.user.id).select('password');

  //Check previus user password
  const isMatched = await user.comparePassword(req.body.oldPassword)
  if(!isMatched) {
    return next(new ErrorHandler('Tu contraseña anterior no es correcta', 400));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res)
});

//Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  }

  // Update avatar: TODO
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

 	res.status(200).json({
    		success: true
  })

});

//Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors ( async(req, res,next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  })
});

//Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors ( async(req, res,next) => {
  const users = await User.findById(req.params.id);

  if(!user) {
    return next(new ErrorHandler(`Usuario no encontrado con Id: ${req.params.id}`))
  }

  res.status(200).json({
    success: true,
    user
  })
});

//Update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
