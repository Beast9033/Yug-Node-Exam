import express from 'express'
import 'dotenv/config'
import router from './routers/index.js'
import connectDB from './configs/db.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' }) 
})

app.use('/api', router)

const start = async () => {
  try {
    await connectDB()
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message)
    process.exit(1)
  }

  app.listen(PORT, err => {
    if (err) {
      console.error('Error starting server:', err)
    } else {
      console.log(`Server is running on port ${PORT}`)
      console.log(`http://localhost:${PORT}`)
    }
  })
}

start()
