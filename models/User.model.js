const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const CartSchema = new Schema({
  eventItem: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
})

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
    minLength: 3,
    maxLength: 20
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide email'],
    unique: true
  }, 
  password: {
    type: String,
    required: [true, 'Please provide password'],
    trim: true,
    minLength: 6
  }, 
  role: {
    type: String,
    default: 'user'
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  cart: [CartSchema]
  // unreviewedEvents: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'UnreviewedEvent'
  // }]
}, {timestamps: true})

// hash password
UserSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
})

// compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

// create json web token
UserSchema.methods.createJWT = function() {
  return jwt.sign(
    {userId: this._id, name: this.name, role: this.role},
    `${process.env.JWT_SECRET}`,
    {expiresIn: `${process.env.JWT_LIFETIME}`}
  )
}

module.exports = mongoose.model('User', UserSchema)