const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "APP_USR-4919554833544510-052817-977ff19fba662bbac76ecef96ec83453-827318745",
});

// Procesar pagos con Mercado Pago => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(
  async (req, res, next, successUrl, failureUrl, pendingUrl) => {
    const { amount } = req.body;

    const preference = {
      back_urls: {
        failure: "https://e1dd-186-84-84-167.ngrok-free.app/api/v1/payment/failure",
        pending: "https://e1dd-186-84-84-167.ngrok-free.app/api/v1/payment/pending",
        success: "https://e1dd-186-84-84-167.ngrok-free.app/api/v1/payment/success",
      },
      items: [
        {
          title: "Pedido Papas Matt",
          unit_price: parseInt(amount),
          quantity: 1,
        },
      ],
      notification_url: `https://e1dd-186-84-84-167.ngrok-free.app/api/v1/notificar`,
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

// Recieve notification of mercadopago => /api/v1/notificar
exports.recieveWebhook = catchAsyncErrors(async (req, res, next) => {
  const { query } = req;
  const topic = query.topic || query.type;
  console.log({ topic });

  let body;
  let paymentStatus = null;

  switch (topic) {
    case 'payment':
      const paymentId = query.id || query['data.id'];
      console.log(topic, 'Obteniendo pago', paymentId);

      const paymentResponse = await mercadopago.payment.findById(paymentId);
      body = paymentResponse.body;
      
      // Obtener el estado del pago
      paymentStatus = body.status;
      break;

    case 'merchant_order':
      const orderId = query.id;
      console.log(topic, 'Obteniendo Merchant Order', orderId);

      const orderResponse = await mercadopago.merchant_orders.findById(orderId);
      body = orderResponse.body;
      break;

    default:
      console.log('Notificación no reconocida');
      break;
  }

  console.log(body);

  if (paymentStatus === 'approved') {
    console.log('El pago se aprobó');
    // Realizar acciones correspondientes al pago aprobado
  } else if (paymentStatus === 'rejected') {
    console.log('El pago fue rechazado');
    // Realizar acciones correspondientes al pago rechazado
  } else {
    console.log('El pago NO fue aprobado ni rechazado');
  }

  res.send();
});