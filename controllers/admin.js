const Admin = require('../models/Admin.model')
const Category = require('../models/Category.model')
const EventType = require('../models/EventType.model')
const asyncWrapper = require('../middleware/async')
const { BadRequestError } = require('../errors')

// add category type
const defineCategory = asyncWrapper(async (req, res, next) => {
  const { category } = req.body

  const newCategory = new Category({
    name: category
  })
  const createdCategory = await Category.create(newCategory)

  res.status(200).json({message: {
    msgBody: `New category type -${createdCategory.name}- created`,
    msgError: false,
    createdCategory
  }})
})

// add event type
const defineEventType = asyncWrapper(async(req, res, next) => {
  const { name, eventType } = req.body
  
  const category = await Category.findOne({name})
  if (!category) {
    throw new BadRequestError('Category not found')
  }

  category.eventType.push({name: eventType})
  await category.save()

  res.status(200).json({message: {
    msgBody: `New event type -${eventType}- created`,
    msgError: false,
  }})
})

module.exports = { defineCategory, defineEventType }