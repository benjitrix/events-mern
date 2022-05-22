const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

const connectDB = require('./db/connect')
const userRouter = require('./routes/user.routes')
const eventRouter = require('./routes/event.routes')
const queryRouter = require('./routes/query.routes')
const purchaseRouter = require('./routes/purchase.routes')
const adminRouter = require('./routes/admin.routes')
const stripeRouter = require('./routes/payment.routes')
const authenticateUser = require('./middleware/auth')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// json middleware
app.use(express.json())
app.use(cors())

// routes middleware
app.use('/api/v1/user', userRouter)
app.use('/api/v1/event', authenticateUser, eventRouter)
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/query/events', queryRouter)
app.use('/api/v1/event/purchase', authenticateUser, purchaseRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/stripe', authenticateUser, stripeRouter)

// test routes
app.get('/', (req, res) => {
  res. send('Bye bye')
})
app.get('/greeting', (req, res) => {
  res.json({ greeting: 'hello' })
})

// route not-found, error handler middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

// start server, db
const port = process.env.PORT || 8080
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(console.log('Connected to DB: EVENTS API...'))
    app.listen(port, () => {
      console.log( `Events SERVER listening on port: ${port}`)
    })
  } catch (error) {
    console.log('Server unable to connect')
  }
}

start()