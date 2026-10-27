const mongoose = require('mongoose') 
const { bookMovieSchema } = require('./schema') 

const mongoURI =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/bookMovie' 

const collection_connection = mongoose.model(
  'bookmovietickets',
  bookMovieSchema
) 

async function connectDB() {
  await mongoose.connect(mongoURI) 
  console.log('MongoDB connected successfully') 
}

module.exports = {
  connectDB,
  connection: collection_connection,
} 
