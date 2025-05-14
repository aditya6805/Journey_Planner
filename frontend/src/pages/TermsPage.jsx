import { Link } from 'react-router-dom';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-4">By accessing or using Journey Planner, you agree to abide by these terms. We provide route planning and related services “as is” without warranties of any kind. We are not liable for any third-party services or inaccuracies in data.</p>
        <p className="mb-4">We reserve the right to modify or discontinue the service at any time without notice. Continued use of the platform constitutes acceptance of any changes.</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
} 