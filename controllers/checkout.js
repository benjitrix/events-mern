const asyncWrapper = require('../middleware/async')
const stripe = require('./stripe')

const createCheckoutSession = asyncWrapper(async (req, res, next) => {
  const domainURL = process.env.WEB_APP_URL
  
})