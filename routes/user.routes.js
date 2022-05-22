const express = require('express')
const router = express.Router()
const { register, login, logout, authenticate } = require('../controllers/user')
const authenticateUser = require('../middleware/auth')


// user routes
router.post('/register', register)
router.post('/login', login)
router.post('/logout', authenticateUser, logout)
router.get('/authenticate', authenticateUser, authenticate)

module.exports = router