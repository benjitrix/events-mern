const express = require('express')
const router = express.Router()
const { addEventToCart, getEventsInCart, deleteEventInCart,  purchaseEventTicket, purchaseEventTickets, } = require('../controllers/purchase')

// purchase routes
router.post('/add-to-cart', addEventToCart)
router.post('/purchase-event-ticket', purchaseEventTicket)
router.post('/purchase-events-tickets', purchaseEventTickets)
router.get('/events-in-cart', getEventsInCart)
router.get('/delete-event/:id', deleteEventInCart)

module.exports = router;