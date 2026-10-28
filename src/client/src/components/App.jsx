import { useEffect, useState } from 'react' 
import '../styles/App.css' 
import 'bootstrap/dist/css/bootstrap.min.css'
import { movies, slots, seats } from './data' 

const App = () => {
  // creating an initial zero-ticket count for every available seat category
  const makeEmptySeats = () => seats.reduce((seatCounts, seat) => {
    seatCounts[seat] = 0 
    return seatCounts 
  }, {}) 

  // restoring the previous selections from local storage when the app loads
  const [movie, setMovie] = useState(() => localStorage.getItem('movie') || '') 
  const [slot, setSlot] = useState(() => localStorage.getItem('slot') || '') 
  const [seatCounts, setSeatCounts] = useState(() => {
    const savedSeats = localStorage.getItem('seats') 
    return savedSeats ? { ...makeEmptySeats(), ...JSON.parse(savedSeats) } : makeEmptySeats() 
  }) 
  const [lastBooking, setLastBooking] = useState(null) 
  const [message, setMessage] = useState('') 

  // fetching the latest saved booking once the component mounts
  useEffect(() => {
    fetch('/api/booking')
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not get the last booking') 
        }
        return response.json() 
      })
      .then(booking => {
        if (booking.message === 'no previous booking found') {
          setLastBooking(null) 
        } else {
          setLastBooking(booking) 
        }
      })
      .catch(error => setMessage(error.message)) 
  }, []) 

  // updating the selected movie or time slot and persist the choice locally
  const selectMovie = selectedMovie => {
    setMovie(selectedMovie) 
    localStorage.setItem('movie', selectedMovie) 
  } 

  const selectSlot = selectedSlot => {
    setSlot(selectedSlot) 
    localStorage.setItem('slot', selectedSlot) 
  } 

  // persist ticket count for the chosen seat category
  const changeSeatCount = (seat, count) => {
    const updatedSeats = { ...seatCounts, [seat]: count } 
    setSeatCounts(updatedSeats) 
    localStorage.setItem('seats', JSON.stringify(updatedSeats)) 
  } 

  // clearing all selections from both component state and local storage
  const clearSelection = () => {
    setMovie('') 
    setSlot('') 
    const emptySeats = makeEmptySeats() 
    setSeatCounts(emptySeats) 
    localStorage.removeItem('movie') 
    localStorage.removeItem('slot') 
    localStorage.removeItem('seats') 
  } 

  // validating the selection, submitting it to the API, then refresh the booking display
  const bookTickets = () => {
    if (!movie || !slot || !seats.some(seat => Number(seatCounts[seat]) > 0)) {
      setMessage('Select a movie, a time slot and at least one ticket.') 
      return 
    }

    setMessage('') 
    const booking = {
      movie,
      slot,
      // Convert the form's ticket counts to numbers for the API request.
      seats: seats.reduce((allSeats, seat) => {
        allSeats[seat] = Number(seatCounts[seat]) 
        return allSeats 
      }, {})
    } 

    fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Booking could not be saved.') 
        }
        // showing the saved booking and reset the form after a successful response
        setLastBooking(booking) 
        clearSelection() 
      })
      .catch(error => setMessage(error.message)) 
  } 

  return (
    <div className='page'>
      <h2>Book that show!!</h2>
      <div className='booking-layout'>
        <div className='booking-options'>
          <div className='movie-row'>
            <h3>Select A Movie</h3>
            {movies.map(item => (
              <div
                className={`movie-column ${movie === item ? 'movie-column-selected' : ''}`}
                key={item}
                onClick={() => selectMovie(item)}
              >
                {item}
              </div>
            ))}
          </div>

          <div className='slot-row'>
            <h3>Select a Time slot</h3>
            {slots.map(item => (
              <div
                className={`slot-column ${slot === item ? 'slot-column-selected' : ''}`}
                key={item}
                onClick={() => selectSlot(item)}
              >
                {item}
              </div>
            ))}
          </div>

          <div className='seat-row'>
            <h3>Select the seats</h3>
            {seats.map(seat => (
              <div
                className={`seat-column ${Number(seatCounts[seat]) > 0 ? 'seat-column-selected' : ''}`}
                key={seat}
              >
                <div>Type {seat}</div>
                <input
                  id={`seat-${seat}`}
                  type='number'
                  min='0'
                  value={seatCounts[seat]}
                  onChange={event => changeSeatCount(seat, event.target.value)}
                />
              </div>
            ))}
          </div>

          <div className='book-button'>
            <button type='button' onClick={bookTickets}>Book Now</button>
          </div>
          {message && <p className='booking-message'>{message}</p>}
        </div>

        <div className='last-order'>
          <h3>Last Booking Details:</h3>
          {lastBooking ? (
            <div>
              <strong>seats:</strong>
              {seats.map(seat => (
                <div key={seat}>{seat}:{lastBooking.seats[seat]}</div>
              ))}
              <div><strong>slot:</strong> {lastBooking.slot}</div>
              <div><strong>movie:</strong> {lastBooking.movie}</div>
            </div>
          ) : (
            <div>no previous booking found</div>
          )}
        </div>
      </div>
    </div>
  ) 
}


export default App 
