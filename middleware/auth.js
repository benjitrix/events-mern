const jwt = require('jsonwebtoken')
const { UnAuthenticatedError } = require('../errors')

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]
  console.log("Event Token:", token);
  
  try {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}`)

    // attach user object tp routes
    req.user = { userId: payload.userId, name: payload.name, role: payload.role}
    console.log('Req User: ', req.user);
    next()
  } catch (error) {
    return new UnAuthenticatedError('No authorization to access this route')
  }
}

module.exports = authenticateUser