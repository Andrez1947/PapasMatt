const Order = require('../models/order');
const Product = require('../models/product');


const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {

  const { orderItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentMethod } = req.body;

  try {
    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      payment: {
        paymentMethod,
        paymentId: null,  // Set paymentId to null initially
        status: "pendiente", // Set status to "pendiente" initially
      },
      paidAt: new Date(),
      user: req.user._id
    });

    console.log('¡Orden creada con éxito!', order);
    // Aquí puedes realizar cualquier otra acción necesaria después de crear la orden

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    // Aquí puedes manejar el error de alguna manera apropiada
    next(error);
  }
});



//Get single order => /api/v1/order/:id
exports.getSimpleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    
    if(!order) {
      return next(new ErrorHandler('No se encontró una orden con este Id'))
    }  
  
    res.status(200).json({
      success: true,
      order
    })
  });  
  
  //Get logged in user orders => /api/v1/order/me
  exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({user: req.user.id})
    
    res.status(200).json({
      success: true,
      order
    })
  });

  //Update / Process order => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    
    //Calculate total amount of all orders
    let totalAmount = 0;
    orders.forEach(order => {
      totalAmount += order.totalPrice
    })
    
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });

  //Get all orders => /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    
    if(order.orderStatus === 'Delivered') {
      return next(new ErrorHandler("Ya has entregado esta orden", 400));
    }
    
    //It serves for await that stock function does its work.
    order.orderItems.forEach(async item => {
      await updateStock(item.product, item.quantity)
    });
    
    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()
    
    await order.save()
    
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });
    
  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    
    product.stock = product.stock - quantity;
    
    await product.save;
  };

//Delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No se encontró una orden con este Id", 400));
  }

  await order.remove()

  res.status(200).json({
    success: true,    
  });
});

  
  
  
