const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
      },
      nombre: String,
      precio: Number,
      imagen: String,
      quantity: Number,
    },       
  ],
  shippingInfo: {
    type: Object,
    required:true
    
  },
  itemsPrice: {
    type: Number,
    required:true
    
  },
  taxPrice: {
    type: Number,
    
  },
  shippingPrice: {
    type: Number,
    required:true
    
  },
  totalPrice: {
    type: Number,
    required:true
   
  },
  payment: {
    paymentMethod: {
      type: String,           
    },
    paymentId: {
      type: String,      
    },
    status: {
      type: String,
      default: "pendiente",
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required:true
    
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true    
  },
});

module.exports = mongoose.model('Order', orderSchema);
