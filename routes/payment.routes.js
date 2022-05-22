const express = require('express')
const router = express.Router()
const { stripeAPI, getClientSecret } = require('../controllers/stripe')

// stripe checkout
router.post('/create-payment-intent', stripeAPI)
router.get('/secret', getClientSecret)

module.exports = router