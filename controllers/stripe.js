const asyncWrapper = require("../middleware/async");
const Event = require('../models/Event.model')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// stripe API
const stripeAPIOriginal = asyncWrapper(async (req, res, next) => {    
  console.log('stripeAPI');

  const calculateOrderAmount = async () => {
    // let sum = 0
    // req.body.forEach(async (item, i) => {
    //   const { id, quantity } = item
    //   const eventItem = await Event.findById({_id: id})
    //   const cost = Number(eventItem.entryFee * quantity)
    //   sum = sum + cost
    //   console.log(sum);
    // })
    // return sum;
    return 1400
  };

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1500,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });
  console.log(paymentIntent);

  res.json({ 
    clientSecret: paymentIntent.client_secret 
  });
})

// get client secret
const getClientSecret = asyncWrapper(async (req, res, next) => {
  const clientKey = `${process.env.STRIPE_SECRET_KEY}`

  const intent = await stripe.paymentIntents.create({
    amount: 1599,
    currency: "usd",
    automatic_payment_methods: {enabled: true},
  });
  console.log(intent);

  res.json({ 
    clientSecret: intent.client_secret 
  });
})

// callback test
const stripeAPICallback = asyncWrapper(async (req, res, next) => {    
  console.log('stripeAPI');
  const calculateOrderAmount = async (qtyPrice) => {   
    let sum = 0
      const amt = await req.body.forEach(async (item, i) =>   {
        const { id, quantity } = item
        Event.findById({_id: id})
          .then(event => {
          sum += event.entryFee * quantity
          console.log(sum);
        })
      })

      // Promise.all(amt).then(productList => {
        // productList.forEach((item, i) => 
        // console.log(item));
      //   console.log(productList);
      // })
    }

  calculateOrderAmount()

  // Create a PaymentIntent with the order amount and currency
  const getPaymentIntent = async () => {
    // console.log('total in intent: ', total);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: sum,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    console.log(paymentIntent);

    res.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  }
  
  // calculateOrderAmount(req.body, getPaymentIntent)
})

// Promise test
const stripeAPI = asyncWrapper(async (req, res, next) => {    
  console.log('stripeAPI');

  const calculateOrderAmount =  async (callback) => {
      let sum = 0
      for (const item of req.body) {
        const { id, quantity } = item
        await Event.findById({_id: id})
          .then(event => {
            sum += Number(event.entryFee * quantity)
            console.log(sum);
          }) 
      }
      console.log('total: ', sum);
      callback(sum)
  };

  // Create a PaymentIntent with the order amount and currency
  const getPaymentIntent = async (sum) => {
  console.log('total in intent: ', sum);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: sum,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    console.log(paymentIntent);

    res.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  }
  
  calculateOrderAmount(getPaymentIntent)
})

module.exports = { stripeAPI, getClientSecret }