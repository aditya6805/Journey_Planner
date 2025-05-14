import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="mb-4">Journey Planner is your one-stop solution to plan bus journeys across India. With features like comprehensive route database, last-mile connectivity options, and AI-powered recommendations, we make your travel planning seamless and efficient.</p>
        <p className="font-semibold mb-2">Our pros include:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Extensive route coverage for all major operators</li>
          <li>Integrated last-mile travel options</li>
          <li>AI-powered personalized journey suggestions</li>
          <li>User-friendly interface with easy navigation</li>
        </ul>
        <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
} 