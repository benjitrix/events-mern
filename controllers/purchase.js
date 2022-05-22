const asyncWrapper = require("../middleware/async")
const User = require('../models/User.model')
const Event = require('../models/Event.model')
const { BadRequestError } = require("../errors")
const { findByIdAndDelete } = require("../models/Event.model")

// add events to cart
const addEventToCart = asyncWrapper(async (req, res, next) => {
  const { quantity, id } = req.body

  const event = await Event.findOne({_id: id})
  const user = await User.findOne({_id: req.user.userId})
  if (!event || !user) {
    throw new BadRequestError('Event or user not found')
  }

  await user.cart.push({eventItem: event, quantity: quantity})
  await user.save()

  res.status(201).json({message: {
    msgBody: user.cart,
    msgError: false
  }})
})

// get events from cart
const getEventsInCart = asyncWrapper(async (req, res, next) => {
  const eventsInCart = await User.findOne({_id: req.user.userId}).populate(
    {
      path: 'cart.eventItem',
      select: 'title category eventType venue time description entryFee contact images createdAt updatedAt'
    }
  )
  if (!eventsInCart) {
    throw new BadRequestError('Events not found')
  }

  res.status(201).json({message: {
    msgBody: `${(eventsInCart.cart).length} events retrieved from cart`,
    msgError: false,
    events: eventsInCart.cart
  }})
})

// remove event from cart
const deleteEventInCart = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  const user = await User.findOne({_id: req.user.userId})
  if (user.cart === []) {
    throw new BadRequestError("User cart empty")
  }

  let eventIndex = 0
  await user.cart.forEach((item, index) => {
    if (item._id.valueOf() === id) {
      eventIndex = index
    }
  })

  const event = await Event.findOne({_id: id})
  await User.findOneAndUpdate(
    {_id: req.user.userId},
    { $pull: { cart: {_id: id} } }
    )

  await user.save()
  
  res.status(200).json({message: {
    msgBody: `Event removed from cart`,
    msgError: false,
    event: event
  }})
})

const purchaseEventTicket = asyncWrapper(async (req, res, next) => {

})

const purchaseEventTickets = asyncWrapper(async (req, res, next) => {

})

module.exports = { addEventToCart, getEventsInCart, deleteEventInCart, purchaseEventTicket, purchaseEventTickets, }