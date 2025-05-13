import { HeroSection } from './components/hero-section';
import { SearchForm } from './components/search-form';

function App() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <SearchForm />
        </div>
      </div>
    </main>
  );
}

export default App;
