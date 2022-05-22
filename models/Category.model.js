const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventTypeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide event type']
  }
})


const CategorySchema = new Schema({
name: {
  type: String,
  required: [true, 'Please provide category']
},
eventType: [EventTypeSchema]
})

module.exports = mongoose.model('Category', CategorySchema)