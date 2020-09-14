const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "TEST-1520402290814953-090914-18169d3f7907c87c07bef291193e3511-199025745",
      },
    };

    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
    // declaramos la url en el constructor para poder accederla a lo largo de toda la class
  }

  async createPaymentMercadoPago(
    productName,
    productDescription,
    price,
    unit,
    firstName,
    lastName,
    email
  ) {
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;

    const items = [
      {
        title: productName,
        description: productDescription,
        picture_url: "https://elo-boost.net/_nuxt/img/silver_4.b1dd678.png",
        quantity: parseInt(unit),
        currency_id: "ARS",
        unit_price: parseFloat(price),
      },
    ];

    const preferences = {
      items,
      // el array de objetos, items que declaramos más arriba
      external_reference: "referencia del negocio",
      // referencia para identificar la preferenciaç
      payer: {
        // información del comprador, si estan en producción tienen que traerlos del request
        //(al igual que hicimos con el precio del item)
        name: firstName,
        surname: lastName,
        email: email,
        // si estan en sandbox, aca tienen que poner el email de SU usuario de prueba si estan
        //en producción, deberian completar esta información
        //de la misma manera que lo hicimos con items, units, y price

        phone: {
          area_code: "11",
          number: "22223333",
        },
        address: {
          zip_code: "1111",
          street_name: "False",
          street_number: "123",
        },
      },
      payment_methods: {
        // declaramos el método de pago y sus restricciones
        excluded_payment_methods: [
          // aca podemos excluir metodos de pagos, tengan en cuenta que es un array de objetos
          // donde el id de cada objeto es la exclusión
          {
            id: "amex",
            // acá estamos excluyendo el uso de la tarjeta American Express
          },
        ],
        excluded_payment_types: [{ id: "atm" }],
        // aca podemos excluir TIPOS de pagos, es un array de objetos
        // Por ejemplo, aca estamos excluyendo pago por cajero
        installments: 6,
        // mayor cantidad de cuotas permitidas
        default_installments: 6,
        // la cantidad de cuotas que van a aparecer por defecto
      },
      back_urls: {
        // declaramos las urls de redireccionamiento
        success:
          "https://latin-eloboost-api.herokuapp.com/api/redirect/success",
        // url a la que va a redireccionar si sale todo bien
        pending:
          "https://latin-eloboost-api.herokuapp.com/api/redirect/pending",
        // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
        failure:
          "https://latin-eloboost-api.herokuapp.com/api/redirect/failure",
        // url a la que va a redireccionar si falla el pago
      },
      notification_url:
        "https://latin-eloboost-api.herokuapp.com/api/mercadopago/webhook",
      // declaramos nuestra url donde recibiremos las notificaciones
      // es la misma ruta que declaramos en app.js
      auto_return: "approved",
      // si la compra es exitosa automaticamente redirige a "success" de back_urls
    };

    try {
      const request = await axios.post(url, preferences, {
        // hacemos el POST a la url que declaramos arriba, con las preferencias
        headers: {
          // y el header, que contiene content-Type
          "Content-Type": "application/json",
        },
      });

      return request.data;
      // devolvemos la data que devuelve el POST
    } catch (e) {
      console.log(e);
      // mostramos error en caso de que falle el POST
    }
  }
}

//NOTA: TODAS las URLS que usemos tienen que ser reales,
// si prueban con localhost, va a fallar

module.exports = PaymentService;
