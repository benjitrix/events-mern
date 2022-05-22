const Event = require('../models/Event.model')
const User = require('../models/User.model')
const asyncWrapper = require('../middleware/async')
const { BadRequestError } = require('../errors')
const cloudinary = require('../middleware/cloudinary')
const fs = require('fs')
const { CustomAPIError } = require('../errors')

// retrieve all events
const getAllEvents = asyncWrapper(async (req, res, next) => {
  const { pageNumber, nPerPage } = req.body
  const events = await Event.find({})
  if (!events) {
    throw new BadRequestError('Events could not be retrieved')
  }
  // paginate
  const page = await Event.find({})
    .limit(nPerPage)
    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
  
  res.status(200).json({message: {
    msgBody: 'All events retrieved',
    msgError: 'false',
    events,
    page
  }})
})

// create event
const registerEvent = asyncWrapper(async (req, res, next) => {
  const { title, category, eventType, description, venue, time, entryFee, contact } = req.body
  console.log('Req.body: ', req.body)
  console.log('Req.user: ', req.user)
  console.log('Req.files: ', req.files)

  // check for undefined properties
  Object.keys(req.body).forEach((key, i) => {
    if (!`${req.body[key]}`) {
      throw new BadRequestError(`Please provide event ${key} property`)
    }
  })

  const uploader = async (path) => await cloudinary.uploads(path, 'Images')

  const images = req.files
  if (images.length < 1) {
    throw new BadRequestError('Please provide event images')
  }

  // set up cloudinary url paths in array of strings
  const urls = []
  for (const image of images) {
    const imagePath = image.path
    const imageURL = await uploader(imagePath)
    urls.push(imageURL.url)
    fs.unlinkSync(imagePath)
  }

  // new event object
  const newEvent = new Event({
    title: title,
    category: category,
    eventType: eventType,
    description: description,
    venue: venue,
    time: time,
    entryFee: entryFee,
    contact: contact,
    images: urls,
    createdBy: req.user.name
  })

  // create, save event
  const event = await Event.create(newEvent)
  const user = await User.findOne({_id: req.user.userId})
  if (!user) {
    throw new CustomAPIError('User not found', 404, true)
  }
  await user.events.push(event)
  await user.save()

  res.status(201).json({message: {
    msgBody: `Event -${event.title}- created`,
    msgError: false,
    isAuthenticated: true
  }})
})

// update event
const updateEvent = asyncWrapper(async (req, res, next) => {
  const { id: eventID } = req.params

  const uploader = async (path) => await cloudinary.uploads(path, 'Images')
  const images = req.files

  // transform req.body to key, value pairs object
  let eventObj = {}
  const updateEvent = req.body
  for (const key in updateEvent) {
    eventObj[key] = updateEvent[key]
  }

  // check if new images are uploaded or existing one(s) unchanged, add to eventObj object
  if (images.length < 1 && eventObj['images'] !== []) {
    console.log('No images to update')
  } else {
    const urls = []
    for (const image of images) {
      const imagePath = image.path
      const imageURL = await uploader(imagePath)
      urls.push(imageURL.url)
      fs.unlinkSync(imagePath)
    }
    eventObj['images'] = urls
  }

  // update call
  const event = await Event.findOneAndUpdate({_id: eventID}, eventObj, { new: true, runValidators: true})

  res.status(200).json({message: {
    msgBody: `Event -${event.title}- updated`,
    msgError: false,
    isAuthenticated: true
  }})
})

// get event
const getEvent = asyncWrapper(async (req, res, next) => {
  const id = req.params.id
  console.log('get event: ', id);
  const event = await Event.findOne({_id: id})
  
  if (!event) {
    throw new BadRequestError('Event not found')
  }

  res.status(200).json({message: {
    msgBody: `Event -${event.title}- retrieved`,
    msgError: false,
    event
  }})
})

// get user events
const getUserEvents = asyncWrapper (async (req, res, next) => {
  const _id = req.user.userId
  const events = await User.findOne({_id}).populate(
    {
      path: 'events',
      select: 'title category eventType venue time description entryFee contact images createdAt updatedAt'
    }
  )
  if (!events) {
    throw new BadRequestError('Events not found')
  }
  res.status(200).json({message: {
    msgBody: `${(events.events).length} user events retrieved`, 
    msgError: false, 
    events: events.events 
  }})
})

// delete event
const deleteEvent = asyncWrapper(async (req, res, next) => {
  const id = req.params.id
  console.log('Event to delete: ', id);
  const eventToDelete = await Event.findOne({_id: id})
  const event = await Event.deleteOne({_id: id})

  // remove deleted event references in user documents
  const user = await User.findOne({_id: req.user.userId})
  const index = user.events.indexOf(id)
  user.events.splice(index, 1)
  user.save()

  if (!eventToDelete) {
    throw new BadRequestError('Event to delete not found')
  }

  res.status(200).json({message: {
    msgBody: `Event -${eventToDelete.title} deleted`,
    msgError: false,
    isAuthenticated: true
  }})
})

module.exports = { getAllEvents, registerEvent, updateEvent, getEvent, getUserEvents, deleteEvent }