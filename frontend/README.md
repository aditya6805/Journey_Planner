# Journey Planner Frontend

This is the frontend for the Journey Planner application, built with React and Vite.

## Features

- Multi-modal travel planning for journeys across India
- Support for different travel modes: Bus only, Train + Bus, Flight + Bus/Auto
- User-friendly interface with intuitive search functionality
- Detailed route information and comparison

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the root of the frontend directory with the following variables (if needed):
   ```
   VITE_API_URL=http://localhost:5000
   ```

## Development

Run the development server:

```
npm run dev
```

## Building for Production

```
npm run build
```

To preview the production build:

```
npm run preview
```

## Project Structure

- `src/components`: React components
  - `ui/`: Reusable UI components
  - `hero-section.jsx`: Hero section component
  - `search-form.jsx`: Main search form
  - `combobox.jsx`: Custom combobox component for city selection
- `src/lib`: Utility functions
- `public`: Static assets
