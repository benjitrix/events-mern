const User = require('../models/User.model')
const { createCustomError } = require('../errors/custom-error')
const { UnAuthenticatedError } = require('../errors')

// user register
const register = async (req, res, next) => {
  const email = req.body.email
  const userExists = await User.findOne({email})
  if (userExists) {
    return next(createCustomError('User already exists', 404))
  }

  try {
    const user = await User.create({...req.body})
    res.status(201).json({message: {
      msgBody: `New user -${user.name}- registered`, 
      msgError: false
    }})
  } catch (error) {
    res.status(500).json({message: {
      msgBody: 'User name, email or password incorrect', 
      msgError: true
    }})
  }
}

// user login
const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    // check for user in DB
    const user = await User.findOne({email})
    if (!user) {
      return next(createCustomError(`User -${email}- not found in DB`, 404, true))
    }

    // compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      return next(createCustomError('Password incorrect', 404, true))
    }

    const token = user.createJWT()
    res.status(200).json({message: {
      msgBody: `User -${user.name}- logged in`, 
      msgError: false, 
      user: user.name, 
      isAuthenticated: true, 
      role: user.role, 
      token
    }})
  } catch (error) {
    res.status(500).json({message: { 
      msgBody: 'User not found or password incorrect', 
      msgError: true
    }})
  }
}

const logout = (req, res, next) => {

}

// authenticate user
const authenticate = (req, res, next) => {
  const { userId, name, role } = req.user
  console.log('Authenticate:', req.user);
  if (!req.user) {
    throw new UnAuthenticatedError('Authentication not valid')
  }

  try {
    res.status(200).json({message: {
      msgBody: 'Authentication valid',
      msgError: false,
      isAuthenticated: true,
      user: name,
      role
    }})
  } catch (error) {
    res.status(401).json({message: {
      msgBody: 'No authorization for this request',
      msgError: true,
      isAuthenticated: false,
    }})
  }
}

module.exports = { register, login, logout, authenticate }