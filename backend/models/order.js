const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      nombre: String,
      precio: Number,
      imagen: String,
      quantity: Number,
    },
  ],
  shippingInfo: {
    type: Object,
    
  },
  itemsPrice: {
    type: Number,
    
  },
  taxPrice: {
    type: Number,
    
  },
  shippingPrice: {
    type: Number,
    
  },
  totalPrice: {
    type: Number,
   
  },
  payment: {
    paymentId: {
      type: String,      
    },
    status: {
      type: String,
      
    }
  },
  paidAt: {
    type: Date,
    
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
});

module.exports = mongoose.model('Order', orderSchema);
