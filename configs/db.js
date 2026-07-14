import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || ''

  if (MONGO_URI) {
    try {
      await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 })
      console.log('MongoDB connected successfully.')
      return
    } catch (error) {
      console.warn('MongoDB connection failed:', error.message)
      console.log('Falling back to in-memory MongoDB.') 
    }
  } else {
    console.log('No MONGO_URI provided — starting in-memory MongoDB.')
  }

  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  await mongoose.connect(uri)
  console.log('Connected to in-memory MongoDB.')
}

export default connectDB
