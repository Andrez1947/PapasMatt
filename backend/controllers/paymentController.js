const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-7701858746848762-052918-3b71568d296b39295a9fc860e3caf173-1386004902",
});

// Procesar pagos con Mercado Pago => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(
  async (req, res, next, successUrl, failureUrl, pendingUrl) => {
    const { amount } = req.body;

    const preference = {
      back_urls: {
        failure: "https://http://localhost:3000/api/v1/payment/failure",
        pending: "http://localhost:3000/api/v1/payment/pending",
        success: "https://http://localhost:3000/api/v1/payment/success",
      },
      items: [
        {
          title: "Pedido Papas Matt",
          unit_price: parseInt(amount),
          quantity: 1,
        },
      ],
      notification_url: `http://localhost:3000/api/v1/notificar`,
      payment_methods: {
        excluded_payment_types: [
          // Excluir métodos de pago que no deseas mostrar
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
      success_url: successUrl,
      failure_url: failureUrl,
      pending_url: pendingUrl,
    });
    console.log(response);
  }
);

// Send mercadopago API Key => /api/v1/mercadopagoapi
exports.sendMercadopagoApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    payment_id: id,
    payment_url: init_point,
  });
});
