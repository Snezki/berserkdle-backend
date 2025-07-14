require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err)
  } else {
    console.log(`Server running on port ${PORT}`)
  }
})

const shutdown = () => {
  console.log('Shutting down gracefully...')
  server.close(() => {
    console.log('Server closed.')
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
