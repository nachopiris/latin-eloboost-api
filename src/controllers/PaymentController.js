class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async getMercadoPagoLink(req, res) {
    const {
      productName,
      productDescription,
      price,
      unit,
      firstName,
      lastName,
      email,
    } = req.body;
    try {
      const checkout = await this.paymentService.createPaymentMercadoPago(
        productName,
        productDescription,
        price,
        unit,
        firstName,
        lastName,
        email
      );

      return res.json({ url: checkout.init_point });
      //si es exitoso los llevamos a la url de Mercado Pago
    } catch (err) {
      // si falla devolvemos un status 500

      return res.status(500).json({
        error: true,
        msg: "Hubo un error con Mercado Pago",
      });
    }
  }

  webhook(req, res) {
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        console.log(body, "webhook response");
        res.end("ok");
      });
    }
    return res.status(200);
  }
}

module.exports = PaymentController;
