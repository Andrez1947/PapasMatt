const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor ingrese su nombre."],
    maxLength: [30, "El nombre no puede exceder los 30 caracteres."],
  },
  email: {
    type: String,
    required: [true, "Por favor ingrese su email."],
    unique: true,
    validate: [
      validator.isEmail,
      "Por favor ingrese una dirección de correo válida.",
    ],
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese su contraseña"],
    minLength: [6, "La contraseña debe ser mayor a 6 dígitos"],
    select: false,
  },  
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPassworExpire: Date,
  });

// Encrypting password before saving user.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//Compare user Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

//Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//--------Recovery password---------//
// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  //Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  //Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  //Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);