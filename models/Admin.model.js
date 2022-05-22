const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AdminSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
    minLength: 6,
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
    default: 'admin',
  },
  unreviewedEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'UnreviewedEvent'
  }]
}, {timestamps: true})

// hash password
AdminSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
})

// compare password
AdminSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

// create json web token
AdminSchema.methods.createJWT = async function() {
  return jwt.sign(
    {userId: this.userId, name: this.name, role: this.role},
    `${process.env.JWT_SECRET}`,
    {expiresIn: `${process.env.JWT_LIFETIME}`}
  )
}

module.exports = mongoose.model('Admin', AdminSchema)