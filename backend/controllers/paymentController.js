const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-7701858746848762-052918-3b71568d296b39295a9fc860e3caf173-1386004902",
});

// Procesar pagos con Mercado Pago => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const { amount } = req.body;

  const preference = {
    items: [
      {
        title: "Producto",
        unit_price: parseInt(amount), // Usar el monto recibido desde el front-end
        quantity: 1,
      },
    ],
    payment_methods: {
      excluded_payment_types: [
        // Excluir métodos de pago que no deseas mostrar
        {
          id: "credit_card",
        },
      ],
      installments: 12, // Configurar el número máximo de cuotas permitidas
    },
    payment_type_ids: ["credit_card", "ticket", "bank_transfer"], // Incluir opciones de pago adicionales
    external_reference: "ID_DE_REFERENCIA_EXTERNA", // Puedes proporcionar una referencia externa personalizada para rastrear la transacción
  };

  const response = await mercadopago.preferences.create(preference);
  const { id, init_point } = response.body;

  res.status(200).json({
    success: true,
    payment_id: id,
    payment_url: init_point,
  });
});

// Send mercadopago API Key => /api/v1/mercadopagoapi
exports.sendMercadopagoApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    payment_id: id,
    payment_url: init_point,
  });
});
