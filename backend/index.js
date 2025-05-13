require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Journey Planner API is running");
});

// Route to get journey options
app.post("/api/journey", async (req, res) => {
  try {
    const { origin, destination, date, mode } = req.body;

    if (!origin || !destination) {
      return res
        .status(400)
        .json({ error: "Origin and destination are required" });
    }

    // Initialize the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Construct the prompt for the Gemini API
    const prompt = `
      I need travel options from ${origin} to ${destination} on ${
      date || "any date"
    }.
      ${
        mode !== "all"
          ? `Please focus on ${mode} mode of travel.`
          : "Consider all travel modes."
      }
      
      Please provide at least 3 different route options with the following details:
      1. Travel mode (bus, train+bus, flight+bus, or combinations)
      2. Departure and arrival times
      3. Estimated travel duration
      4. Approximate cost
      5. Available amenities
      6. Last-mile connectivity options
      
      Format the response as JSON according to this structure:
      {
        "routes": [
          {
            "id": "1",
            "mode": "string", // e.g., "Bus Only", "Train + Bus", "Flight + Bus"
            "departure": "string", // e.g., "09:00 AM"
            "arrival": "string", // e.g., "02:30 PM" 
            "duration": "string", // e.g., "5h 30m"
            "cost": "number", // Approximate cost in INR
            "amenities": ["string"], // Array of amenities like "WiFi", "Charging Points", etc.
            "legs": [ // Each leg of the journey
              {
                "type": "string", // "bus", "train", "flight", "auto"
                "from": "string",
                "to": "string",
                "departure": "string",
                "arrival": "string",
                "duration": "string",
                "operator": "string", // e.g., "Indian Railways", "IndiGo"
                "cost": "number"
              }
            ],
            "lastMile": {
              "options": ["string"], // e.g., ["Auto", "Metro", "Bus"]
              "estimatedCost": "string"
            }
          }
        ]
      }
    `;

    // Generate content using Gemini API
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the response to extract the JSON
    let jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    let jsonResponse;

    if (jsonMatch && jsonMatch[1]) {
      // If response is in code block format
      jsonResponse = JSON.parse(jsonMatch[1]);
    } else {
      // Try to parse the whole response as JSON
      try {
        jsonResponse = JSON.parse(responseText);
      } catch (e) {
        // If parsing fails, return the raw text
        return res.json({
          rawResponse: responseText,
          error: "Failed to parse JSON response",
        });
      }
    }

    res.json(jsonResponse);
  } catch (error) {
    console.error("Error with Gemini API:", error);
    res.status(500).json({
      error: "Error generating journey options",
      details: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
