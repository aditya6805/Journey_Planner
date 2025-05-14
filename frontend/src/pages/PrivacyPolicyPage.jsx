import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">Your privacy is important to us. We collect only the information necessary to provide our services, such as email for feedback purposes. We do not share your personal data with third parties. All data is stored securely and used solely to improve your experience on our platform.</p>
        <p className="mb-4">By using Journey Planner, you consent to the data practices described in this policy.</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
} 