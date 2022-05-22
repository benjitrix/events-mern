const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventTypeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide event type']
  }
})

module.exports = mongoose.model('EventType', EventTypeSchema)