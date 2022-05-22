const express = require('express')
const router = express.Router()
const { getCategories, getEventTypes, getQueriedEvents } = require('../controllers/query')

// query routes
router.get('/categories', getCategories)
router.get('/event-types', getEventTypes)
router.post('/queries', getQueriedEvents)

module.exports = router