import { Link } from 'react-router-dom';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="mb-2">Email: contact@journeyplanner.com</p>
        <p className="mb-4">Phone: +91 99887 66554</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
} 