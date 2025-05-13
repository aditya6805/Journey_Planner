# Journey Planner Backend

This is the backend API for the Journey Planner application, powered by Gemini AI.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the root of the backend directory with the following variables:

   ```
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Get a Gemini API key from Google AI Studio (https://ai.google.dev/) and replace `your_gemini_api_key_here` with your actual API key.

## Running the server

Development mode:

```
npm run dev
```

Production mode:

```
npm start
```

## API Endpoints

### GET /

Test endpoint to check if the API is running.

### POST /api/journey

Get journey options between two locations.

Request body:

```json
{
  "origin": "Mumbai",
  "destination": "Delhi",
  "date": "2023-05-15",
  "mode": "all" // or "bus", "train-bus", "flight-bus"
}
```

Response:

```json
{
  "routes": [
    {
      "id": "1",
      "mode": "Bus Only",
      "departure": "09:00 AM",
      "arrival": "02:30 PM",
      "duration": "5h 30m",
      "cost": 1200,
      "amenities": ["WiFi", "Charging Points", "AC"],
      "legs": [
        {
          "type": "bus",
          "from": "Mumbai",
          "to": "Delhi",
          "departure": "09:00 AM",
          "arrival": "02:30 PM",
          "duration": "5h 30m",
          "operator": "Example Bus Service",
          "cost": 1200
        }
      ],
      "lastMile": {
        "options": ["Auto", "Metro", "Bus"],
        "estimatedCost": "150-300 INR"
      }
    }
  ]
}
```
