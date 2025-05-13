import { Link } from 'react-router-dom';
import { SearchForm } from '../components/search-form';
import { ChevronLeft } from 'lucide-react';

export function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white py-4">
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

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Find Your Journey</h1>
          <SearchForm />
        </div>
      </div>
    </div>
  );
} 