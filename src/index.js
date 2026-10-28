const express = require('express') 
const cors = require('cors') 
require('dotenv').config() 

const { connectDB, connection } = require('./connector')

const app = express() 
const PORT = process.env.PORT || 8080 

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors()) 
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


// returning the most recently created booking
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

// validating a submitted booking and saving in db
app.post('/api/booking', async (req, res) => {
  const { movie, seats, slot } = req.body
  const seatTypes = ['A1', 'A2', 'A3', 'A4', 'D1', 'D2']

  //requires the movie, time slot and a non-negative integer count for every seat type
  if( !movie || !slot || !seats || !seatTypes.every(seat => 
    Number.isInteger(Number(seats[seat])) && Number(seats[seat]) >= 0 ))
    return  res.status(400).json({ message: 'movie, slot and seat counts are required'})

  try{
    const booking = await connection.create({
      movie,
      slot,
      seats: seatTypes.reduce( (allSeats, seat) => {
        allSeats[seat] = Number(seats[seat])
        return  allSeats  
      }, {} )
    })
    return res.status(200).json(booking)
  } catch(err){
    console.log('error while creating booking', err)
    return res.status(500).json({ message: 'could not create booking'})
  }
})



app.listen(PORT, async () => {
  await connectDB() // because we dont want server request before connection starts
  console.log(`Backend running at http://localhost:${PORT}`) 
}) 