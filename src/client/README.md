# Book That Show – Frontend

A movie ticket booking application built using React and Vite. Users can select movies, choose show timings, enter ticket quantities for different seat categories, and book tickets. The application also displays the latest booking details retrieved from the backend.

## Live Application

Frontend: https://book-that-show.vercel.app

BackEnd API: https://book-that-show-backend.onrender.com

## Features

- Display available movies.
- Select a movie and show time.
- Enter ticket quantities for different seat categories (A1, A2, A3, A4, D1, D2).
- Book movie tickets.
- Retrieve and display the latest booking details.
- Communicate with the backend using HTTP GET and POST requests.


## Getting Started

### 1. Clone the repository

git clone https://github.com/chandanYadav-G/book-that-show.git

### 2. Navigate to the frontend directory

cd src/client

### 3. Install dependencies

npm install

### 4. Configure environment variables

Create a `.env` file in the client root directory (alongside `package.json`).

Add the following variable:

VITE_API_URL=https://book-that-show-backend.onrender.com

For local backend development, use your local backend URL instead.

### 5. Start the development server

npm run dev

Vite will provide a local development URL in the terminal.


## API Integration

The frontend communicates with the Express backend through the Fetch API.

| GET | `/api/booking` | Retrieves the latest booking details. |
| POST | `/api/booking` | Creates a new movie ticket booking. |

The API base URL is configured through the `VITE_API_URL` environment variable.

## Deployment

The frontend is deployed on Vercel.

- GitHub repository: https://github.com/chandanYadav-G/book-that-show
- Deployment platform: Vercel
- Root directory: `src/client`
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

The production environment variable `VITE_API_URL` points to the deployed backend on Render.

---

Developed as a fullstack movie booking app