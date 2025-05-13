# Journey Planner - Your Smart Travel Companion

Journey Planner is an intelligent travel planning platform designed to help users find the most efficient and convenient routes across India. Whether you're planning a short trip or a long journey, our platform provides comprehensive travel solutions combining various modes of transportation.

## Features

### Multi-Modal Travel Planning

- **BUS ONLY**: Direct bus routes between cities
- **TRAIN + BUS**: Combined railway and bus connectivity
- **FLIGHT + BUS/AUTO**: Air travel with last-mile connectivity options

### Smart Features

- Real-time route suggestions
- Multiple route options for each travel mode
- Estimated travel duration
- Cost comparison across different routes
- Last-mile connectivity solutions

### User-Friendly Interface

- Simple and intuitive search system
- Interactive route visualization
- Comprehensive route details
- Filter options for customized search

## Project Structure

This project consists of two main parts:

- **Frontend** (`/frontend`): A React application built with Vite, using Tailwind CSS for styling
- **Backend** (`/backend`): An Express.js API that uses Gemini API for intelligent route planning

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Google Gemini API key

### Setting Up the Backend

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following content:

   ```
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Setting Up the Frontend

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Technologies Used

- **Frontend**:

  - React
  - Vite
  - Tailwind CSS
  - React Router
  - date-fns

- **Backend**:
  - Express.js
  - Google Generative AI (Gemini API)
  - dotenv
  - cors

## License

MIT
