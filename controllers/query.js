const asyncWrapper = require('../middleware/async')
const Category = require('../models/Category.model')
const EventType = require('../models/EventType.model')
const Event = require('../models/Event.model')
const { BadRequestError } = require('../errors')

// fill category dropdown menu
const getCategories = asyncWrapper(async (req, res, next) => {
  const categories = await Category.find({})
  if (!categories) {
    throw new BadRequestError('No categories found')
  }
  res.status(200).json({message: { 
    msgBody: categories,
    msgError: false,
    categories 
  }})
})

// fill event type dropdown menu
const getEventTypes = asyncWrapper(async ( req, res, next) => {
  const { category } = req.body
  const eventTypes = await Category.findOne({name: category})
  if (!category) {
    throw new BadRequestError('Category not found')
  }

  res.status(200).json({message: {
    msgBody: eventTypes.eventType,
    msgError: false,
    eventTypes
  }})
})

 // get query request
  const getQueriedEvents = asyncWrapper(async (req, res, next) => {
    const { category } = req.body
    console.log('Category: ', category);

    const queriedEvents = await Event.find({category: category})
    res.status(200).json({message: {
      queriedEvents
    }})
  })

module.exports = { getCategories, getEventTypes, getQueriedEvents }