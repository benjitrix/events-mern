const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title']
  },
  category: {
    type: String,
    required: [true, 'Please provide category']
  },
  eventType: {
    type: String,
    required: [true, 'Please provide event type']
  },
  description: {
    type: String,
    required: [true, 'Please provide category']
  },
  venue: {
    type: String,
    required: [true, 'Please provide venue']
  },
  time: {
    type: String,
    required: [true, 'Please provide time']
  },
  entryFee: {
    type: String,
    required: [true, 'Please provide entry fee'],
    default: 'none'
  },
  contact: {
    type: String,
    required: [true, 'Please provide contact'],
  },
  images: {
    type: [String],
    required: [true, 'Please provide image paths']
  },
  createdBy: {
    type: String,
    required: true
  },
}, {timestamps: true})

module.exports = mongoose.model('Event', EventSchema)