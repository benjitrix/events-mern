const express = require('express')
const router = express.Router()
const { defineCategory, defineEventType } = require('../controllers/admin')

// admin routes
router.post('/define/category', defineCategory)
router.post('/define/event-type', defineEventType)

module.exports = router