const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: "TEST-7701858746848762-052918-3b71568d296b39295a9fc860e3caf173-1386004902"
  
});

// Procesar pagos con Mercado Pago => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const { amount } = req.body;

  const preference = {
    items: [
      {
        title: "Producto",
        unit_price: 1000,
        quantity: 1,
      },
    ],
  };

  const response = await mercadopago.preferences.create(preference);
  const { id, init_point } = response.body;
  
  res.status(200).json({
    success: true,
    payment_id: id,
    payment_url: init_point,    
  });
  console.log(response);  
});

// Send mercadopago API Key => /api/v1/mercadopagoapi
exports.sendMercadopagoApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    mercadopagoApiKey: "TEST-4919554833544510-052817-4dd143726a4c7bc50ad514da03a53441-827318745",
  });
});