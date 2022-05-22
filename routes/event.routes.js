const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { getAllEvents, registerEvent, updateEvent, getEvent, getUserEvents, deleteEvent } = require('../controllers/event')

// event routes
router.get('/all', getAllEvents)
router.post('/register-event', upload.array('images', 12), registerEvent)
router.put('/update-event/:id', upload.array('images', 12), updateEvent)
router.get('/:id', getEvent)
router.get('/events/user', getUserEvents)
router.delete('/delete-event/:id', deleteEvent)

module.exports = router