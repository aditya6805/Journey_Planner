import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { useState } from 'react';

export function HomePage() {
  // Feedback form state
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    setFeedbackEmail('');
    setFeedbackMessage('');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <header className="fixed top-0 w-full bg-blue-600 text-white py-4 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-semibold flex items-center">
              🚌 Journey Planner
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <Link to="/" className="font-medium flex items-center">
              <span className="mr-2">🏠</span> HOME
            </Link>
            <Link to="/search" className="font-medium flex items-center">
              <span className="mr-2">🔍</span> FIND ROUTE
            </Link>
            <Link to="/ai-planner" className="font-medium flex items-center">
              <span className="mr-2">🤖</span> AI PLANNER
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Hero Banner */}
      <div className="w-full bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">
            <span className="mr-2">🚌</span> Journey Planner <span className="ml-2">🗺️</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find the perfect bus routes for your journey across India
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/search">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-md flex items-center">
                <span className="mr-2">🔍</span> FIND YOUR ROUTE
              </Button>
            </Link>
            <Link to="/ai-planner">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 text-lg rounded-md flex items-center">
                <span className="mr-2">🤖</span> AI PLANNER
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-blue-500 text-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="text-3xl mb-4">🚌</div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Routes</h3>
              <p className="mb-6">
                Find the best bus routes connecting cities across the country. Our extensive database includes routes from all major operators.
              </p>
              <Link to="/search">
                <Button variant="outline" className="border-white text-white hover:bg-blue-600 bg-blue-600/30">
                  EXPLORE ROUTES
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-purple-600 text-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="text-3xl mb-4">🧭</div>
              <h3 className="text-xl font-semibold mb-2">Last Mile Connectivity</h3>
              <p className="mb-4">
                Don't just reach the bus station - complete your journey with our integrated last-mile options including auto-rickshaws and shared rides.
              </p>
              <div className="mb-6 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-purple-500 rounded p-2 flex items-center">
                  <span className="mr-1">🚕</span> Auto-Rickshaws
                </div>
                <div className="bg-purple-500 rounded p-2 flex items-center">
                  <span className="mr-1">🚲</span> Bike Rentals
                </div>
                <div className="bg-purple-500 rounded p-2 flex items-center">
                  <span className="mr-1">👥</span> Shared Rides
                </div>
                <div className="bg-purple-500 rounded p-2 flex items-center">
                  <span className="mr-1">🚶</span> Walking Directions
                </div>
              </div>
              <Link to="/search">
                <Button variant="outline" className="border-white text-white hover:bg-purple-700 bg-purple-700/30">
                  LEARN MORE
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-blue-600 text-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="text-3xl mb-4">🌎</div>
              <h3 className="text-xl font-semibold mb-2">Journey Planning</h3>
              <p className="mb-6">
                Plan your entire journey with our comprehensive tools. Compare routes, check fares, and find the most convenient options.
              </p>
              <Link to="/ai-planner">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700 bg-blue-800/30">
                  START PLANNING
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-8">
        <div className="container mx-auto px-4 text-center">
          {/* Feedback Form */}
          <form className="max-w-md mx-auto mb-6" onSubmit={handleFeedbackSubmit}>
            <h4 className="text-lg font-semibold mb-2">We value your feedback</h4>
            <input
              type="email"
              placeholder="Your email"
              required
              value={feedbackEmail}
              onChange={(e) => setFeedbackEmail(e.target.value)}
              className="w-full mb-2 px-3 py-2 rounded bg-white text-gray-800"
            />
            <textarea
              placeholder="Your feedback"
              required
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              className="w-full mb-2 px-3 py-2 rounded bg-white text-gray-800"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
          <p className="mb-4">Contact us: contact@journeyplanner.com | +91 99887 66554</p>
          <div className="flex justify-center space-x-4">
            <Link to="/about" className="hover:text-white">About Us</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
          <p className="mt-6 text-sm">&copy; {new Date().getFullYear()} Journey Planner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 