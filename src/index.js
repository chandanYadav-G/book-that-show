const express = require('express') 
const cors = require('cors') 
require('dotenv').config() 

const { connectDB, connection } = require('./connector')

const app = express() 
const PORT = process.env.PORT || 8080 

app.use(cors()) 
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


// Returning the most recently created booking
app.get('/api/booking', async (req, res) => {
  try{
    const booking = await connection.findOne().sort({ _id: -1 })
    if(!booking)    
      return res.status(200).json({ message: 'no previous booking found' })
    return  res.status(200).json(booking)
  } catch(err){
    console.log('error while getting booknig', err)
    return res.status(500).json({ message: 'could not get booking '})
  }
})

app.listen(PORT, async () => {
  await connectDB() // because we dont want server request before connection starts
  console.log(`Backend running at http://localhost:${PORT}`) 
}) 