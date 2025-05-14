import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Combobox } from "../components/combobox";
import { State, City } from "country-state-city";
import { JourneyDetails } from "../components/journey-details";

export function AIPlanner() {
  // State for form inputs
  const [originState, setOriginState] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [destinationState, setDestinationState] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [budget, setBudget] = useState("medium");
  const [travelTime, setTravelTime] = useState("balanced");
  const [comfortLevel, setComfortLevel] = useState("standard");
  const [additionalNeeds, setAdditionalNeeds] = useState({
    wheelchairAccessible: false,
    extraLuggage: false,
    petFriendly: false,
    foodOptions: false
  });
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  
  // States for dropdown options
  const [stateOptions, setStateOptions] = useState([]);
  const [originCityOptions, setOriginCityOptions] = useState([]);
  const [destinationCityOptions, setDestinationCityOptions] = useState([]);

  // Load states on component mount
  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN").map(state => ({
      label: state.name,
      value: state.isoCode
    }));
    setStateOptions(indianStates);
  }, []);

  // Load cities when origin state changes
  useEffect(() => {
    if (originState) {
      const cities = City.getCitiesOfState("IN", originState).map(city => ({
        label: city.name,
        value: city.name.toLowerCase()
      }));
      setOriginCityOptions(cities);
      setOriginCity(""); // Reset city when state changes
    } else {
      setOriginCityOptions([]);
    }
  }, [originState]);

  // Load cities when destination state changes
  useEffect(() => {
    if (destinationState) {
      const cities = City.getCitiesOfState("IN", destinationState).map(city => ({
        label: city.name,
        value: city.name.toLowerCase()
      }));
      setDestinationCityOptions(cities);
      setDestinationCity(""); // Reset city when state changes
    } else {
      setDestinationCityOptions([]);
    }
  }, [destinationState]);

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAdditionalNeeds(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!originCity || !destinationCity) {
      alert("Please select both origin and destination");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to get AI recommendations
      // Simulating a response for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRecommendations({
        routes: [
          {
            id: 1,
            name: "Express Route",
            description: "Fastest route with minimal stops",
            duration: "4h 30m",
            cost: "₹1,200",
            comfort: "High",
            details: "This route includes an express bus with comfortable seating, air conditioning, and minimal stops."
          },
          {
            id: 2,
            name: "Budget Friendly",
            description: "Most economical option",
            duration: "6h 15m",
            cost: "₹800",
            comfort: "Standard",
            details: "This route uses regular service buses with more stops but at a significantly lower price point."
          },
          {
            id: 3,
            name: "Luxury Experience",
            description: "Premium travel experience",
            duration: "5h",
            cost: "₹1,800",
            comfort: "Premium",
            details: "This route offers a premium bus with extended legroom, on-board refreshments, and entertainment options."
          }
        ]
      });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open journey details modal
  const handleViewDetails = (route) => {
    setSelectedRoute(route);
  };

  // Close journey details modal
  const handleCloseDetails = () => {
    setSelectedRoute(null);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-white">
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
        
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Plan Your Perfect Journey</h1>
          <p className="text-gray-600 mb-6">
            Use our AI-powered journey planner to get personalized recommendations based on your preferences and travel needs. Simply enter your origin, destination, and preferences to get started.
          </p>
          
          <Card className="shadow-lg border-blue-100 mb-8">
            <CardHeader className="bg-blue-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 text-2xl">🔍</span>
                <div>
                  <CardTitle className="text-blue-800">AI Journey Planner</CardTitle>
                  <CardDescription>Get personalized journey recommendations powered by AI</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Origin and Destination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="origin" className="text-sm font-medium">Origin *</Label>
                    <Combobox
                      options={stateOptions}
                      placeholder="Select origin state"
                      value={originState}
                      onChange={setOriginState}
                    />
                    <div className="mt-2">
                      <Combobox
                        options={originCityOptions}
                        placeholder={originState ? "Select origin city" : "First select a state"}
                        value={originCity}
                        onChange={setOriginCity}
                        disabled={!originState}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-sm font-medium">Destination *</Label>
                    <Combobox
                      options={stateOptions}
                      placeholder="Select destination state"
                      value={destinationState}
                      onChange={setDestinationState}
                    />
                    <div className="mt-2">
                      <Combobox
                        options={destinationCityOptions}
                        placeholder={destinationState ? "Select destination city" : "First select a state"}
                        value={destinationCity}
                        onChange={setDestinationCity}
                        disabled={!destinationState}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Travel Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Budget */}
                    <div>
                      <Label htmlFor="budget" className="text-sm font-medium">Budget</Label>
                      <select 
                        id="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="low">Economy</option>
                        <option value="medium">Standard</option>
                        <option value="high">Premium</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </div>
                    
                    {/* Travel Time */}
                    <div>
                      <Label htmlFor="travelTime" className="text-sm font-medium">Travel Time</Label>
                      <select 
                        id="travelTime"
                        value={travelTime}
                        onChange={(e) => setTravelTime(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="fastest">Fastest Possible</option>
                        <option value="balanced">Balanced</option>
                        <option value="leisurely">Leisurely</option>
                      </select>
                    </div>
                    
                    {/* Comfort Level */}
                    <div>
                      <Label htmlFor="comfortLevel" className="text-sm font-medium">Comfort Level</Label>
                      <select 
                        id="comfortLevel"
                        value={comfortLevel}
                        onChange={(e) => setComfortLevel(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Additional Needs */}
                <div>
                  <Label className="text-sm font-medium">Additional Needs:</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="wheelchairAccessible"
                        name="wheelchairAccessible"
                        checked={additionalNeeds.wheelchairAccessible}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="wheelchairAccessible" className="cursor-pointer">
                        Wheelchair Accessible
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="extraLuggage"
                        name="extraLuggage"
                        checked={additionalNeeds.extraLuggage}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="extraLuggage" className="cursor-pointer">
                        Extra Luggage
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="petFriendly"
                        name="petFriendly"
                        checked={additionalNeeds.petFriendly}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="petFriendly" className="cursor-pointer">
                        Pet Friendly
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="foodOptions"
                        name="foodOptions"
                        checked={additionalNeeds.foodOptions}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="foodOptions" className="cursor-pointer">
                        Food Options
                      </Label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-medium text-center rounded-md transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Getting Recommendations...
                    </span>
                  ) : (
                    "GET RECOMMENDATIONS"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Recommendations Results */}
          {recommendations && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Your Personalized Journey Recommendations</h2>
              <div className="space-y-4">
                {recommendations.routes.map(route => (
                  <Card key={route.id} className="border-blue-100 shadow-md">
                    <CardHeader className="bg-blue-50 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-blue-800">{route.name}</CardTitle>
                          <CardDescription>{route.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-800">{route.cost}</div>
                          <div className="text-sm text-gray-500">{route.duration}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700 mb-4">{route.details}</p>
                      <div className="flex justify-end">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleViewDetails(route)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Journey Details Modal */}
          {selectedRoute && (
            <JourneyDetails 
              route={selectedRoute} 
              onClose={handleCloseDetails} 
            />
          )}
        </div>
      </div>
    </div>
  );
} 