const express = require('express') 
const cors = require('cors') 
require('dotenv').config() 

const { connectDB, connection } = require('./connector')

const app = express() 
const PORT = process.env.PORT || 8080 

app.use(cors()) 
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 



app.listen(PORT, async () => {
  await connectDB() // because we dont want server request before connection starts
  console.log(`Backend running at http://localhost:${PORT}`) 
}) 