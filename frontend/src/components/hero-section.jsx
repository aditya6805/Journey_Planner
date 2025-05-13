import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-emerald-900">Journey Planner</h1>
            <p className="text-xl text-emerald-800">Your Smart Travel Companion for exploring India</p>
            <p className="text-gray-600">
              Find the most efficient and convenient routes across India with our intelligent travel planning platform.
              Combine buses, trains, and flights for a seamless journey experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Plan Your Journey</Button>
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-96">
            <img
              src="/placeholder.jpg"
              alt="India travel map"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 