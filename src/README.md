# Book That Show – Backend

The backend REST API for book-that-show, a movie ticket booking application.

Built using Node.js, Express, and MongoDB. It handles booking requests, stores booking information in MongoDB Atlas, and provides the latest booking details to the frontend.

## Live API

Backend URL: https://book-that-show-backend.onrender.com

Booking Endpoint: https://book-that-show-backend.onrender.com/api/booking

## Tech Stack

- Node.js – JavaScript runtime environment.
- Express.js – Backend web framework.
- MongoDB Atlas – Cloud-hosted NoSQL database.
- Mongoose – MongoDB object modeling.
- REST API – Client-server communication.

## Features

- Establishes a connection with MongoDB Atlas.
- Accepts movie ticket booking requests.
- Stores booking information in MongoDB.
- Retrieves the latest booking details.
- Supports HTTP GET and POST requests.
- Provides API endpoints for frontend integration.


## Getting Started

### 1. Clone the repository

git clone https://github.com/chandanYadav-G/book-that-show.git

### 2. Navigate to the backend directory

cd src

### 3. Install dependencies

npm install

### 4. Configure environment variables

Create a `.env` file in the backend root directory (alongside `index.js`).

Add your MongoDB Atlas connection string:

MONGODB_URI=your_mongodb_atlas_connection_string

Replace the placeholder with your actual MongoDB connection string.

### 5. Start the backend server

npm start

The server starts using the start script configured in `package.json`.

## API Endpoints

### 1. Get Latest Booking

Method: GET

Endpoint:

```http
GET /api/booking
```

Retrieves the latest booking details stored in the MongoDB collection.

### 2. Create a New Booking

Method: POST

Endpoint:

```http
POST /api/booking
```

Request Body:

```json
{
  "movie": "The war with grandpa",
  "slot": "10:00 AM",
  "seats": {
    "A1": 2,
    "A2": 1,
    "A3": 0,
    "A4": 0,
    "D1": 1,
    "D2": 0
  }
}
```

Creates a new booking record containing the selected movie, show timing, and ticket quantities.

## Database

The application uses MongoDB Atlas as its cloud database.

Mongoose is used to define the booking schema and interact with the MongoDB collection.

Booking records contain:

- `movie` – Selected movie name.
- `slot` – Selected show timing.
- `seats` – Ticket quantities for each seat category.

MongoDB also maintains document identifiers and version information.

## Deployment

The backend is deployed on Render.

- GitHub repository: https://github.com/chandanYadav-G/book-that-show
- Deployment platform: Render
- Service name: `book-that-show-backend`
- Root directory: `src`
- Runtime: Node.js
- Build command: `npm install`
- Start command: `npm start`

### Production Environment Variables

Configure the following environment variable in Render:

| `MONGODB_URI` | MongoDB Atlas connection string. |

Render provides the port for the deployed web service.

---

Developed as the backend for the Book That Show full-stack application.