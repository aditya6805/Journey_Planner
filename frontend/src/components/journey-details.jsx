import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, MapPin, DollarSign, Award, Bus, Compass, Shield } from "lucide-react";

export function JourneyDetails({ route, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data that would normally come from the API
  const journeyDetails = {
    overview: {
      routeInfo: `${route.name} connects your locations with a ${route.comfort.toLowerCase()} comfort level journey lasting ${route.duration}.`,
      departureTime: "08:15 AM",
      arrivalTime: "12:45 PM",
      busType: route.name === "Luxury Experience" ? "Premium Volvo Multi-Axle" : route.name === "Express Route" ? "Volvo AC Semi-Sleeper" : "Standard AC Seater",
      operator: route.name === "Luxury Experience" ? "Royal Travels" : route.name === "Express Route" ? "Express Connect" : "EconoBus Services",
      totalDistance: "245 km",
      stops: route.name === "Budget Friendly" ? 8 : route.name === "Express Route" ? 3 : 5,
    },
    amenities: {
      wifi: route.name !== "Budget Friendly",
      charging: route.name !== "Budget Friendly",
      entertainment: route.name === "Luxury Experience",
      blankets: route.name === "Luxury Experience",
      refreshments: route.name === "Luxury Experience",
      toilet: route.name !== "Budget Friendly",
      legroom: route.name === "Luxury Experience" ? "Extra" : route.name === "Express Route" ? "Standard" : "Basic",
      luggageSpace: route.name === "Budget Friendly" ? "Limited" : "Spacious"
    },
    stops: [
      { name: "Origin Bus Terminal", time: "08:15 AM", type: "Departure" },
      ...(route.name === "Budget Friendly" ? [
        { name: "City Center Stop", time: "09:00 AM", type: "Pickup" },
        { name: "Highway Junction", time: "09:45 AM", type: "Pickup" },
        { name: "Roadside Diner", time: "10:30 AM", type: "Rest Stop (15 min)" },
        { name: "District Transport Hub", time: "11:15 AM", type: "Pickup/Drop" },
        { name: "Town Market", time: "12:00 PM", type: "Pickup/Drop" },
        { name: "Regional Bus Stand", time: "12:30 PM", type: "Pickup/Drop" },
      ] : route.name === "Express Route" ? [
        { name: "Highway Service Plaza", time: "10:00 AM", type: "Rest Stop (10 min)" },
        { name: "Midway Transport Hub", time: "11:30 AM", type: "Pickup/Drop" },
      ] : [
        { name: "Premium Rest Area", time: "09:30 AM", type: "Rest Stop (15 min)" },
        { name: "Central City Terminal", time: "10:30 AM", type: "Pickup/Drop" },
        { name: "Luxury Service Plaza", time: "11:45 AM", type: "Rest Stop (15 min)" },
      ]),
      { name: "Destination Bus Terminal", time: "12:45 PM", type: "Arrival" }
    ],
    policies: {
      cancellation: route.name === "Luxury Experience" ? "Free cancellation up to 12 hours before departure" : route.name === "Express Route" ? "80% refund if cancelled 24 hours before departure" : "70% refund if cancelled 48 hours before departure",
      baggage: route.name === "Luxury Experience" ? "25kg per passenger, extra at nominal charge" : route.name === "Express Route" ? "20kg per passenger" : "15kg per passenger",
      foodPolicy: route.name === "Luxury Experience" ? "Complimentary snacks and beverages" : route.name === "Express Route" ? "Food available for purchase at stops" : "Outside food allowed",
      petPolicy: "Small pets allowed in carriers on select buses. Please check with operator."
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">{route.name} Details</h2>
          <button 
            onClick={onClose}
            className="hover:bg-blue-700 p-1 rounded"
          >
            ✖
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg mb-6">
            <div>
              <div className="text-lg font-semibold text-blue-800">{route.description}</div>
              <div className="text-sm text-gray-600">Trip Duration: {route.duration}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-800">{route.cost}</div>
              <div className="text-sm text-blue-600">Comfort: {route.comfort}</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b mb-4">
            <button 
              className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'amenities' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('amenities')}
            >
              Amenities
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'stops' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('stops')}
            >
              Stops
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'policies' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('policies')}
            >
              Policies
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-gray-700">{journeyDetails.overview.routeInfo}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      Journey Time
                    </h3>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Departure:</span>
                      <span className="font-medium">{journeyDetails.overview.departureTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Arrival:</span>
                      <span className="font-medium">{journeyDetails.overview.arrivalTime}</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Bus className="w-4 h-4 mr-2 text-blue-600" />
                      Bus Information
                    </h3>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{journeyDetails.overview.busType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Operator:</span>
                      <span className="font-medium">{journeyDetails.overview.operator}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex flex-col items-center">
                      <Compass className="w-5 h-5 text-blue-600 mb-1" />
                      <div className="text-sm text-gray-600">Distance</div>
                      <div className="font-medium">{journeyDetails.overview.totalDistance}</div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="flex flex-col items-center">
                      <MapPin className="w-5 h-5 text-blue-600 mb-1" />
                      <div className="text-sm text-gray-600">Total Stops</div>
                      <div className="font-medium">{journeyDetails.overview.stops}</div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="flex flex-col items-center">
                      <DollarSign className="w-5 h-5 text-blue-600 mb-1" />
                      <div className="text-sm text-gray-600">Price</div>
                      <div className="font-medium">{route.cost}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'amenities' && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`border rounded-lg p-3 ${journeyDetails.amenities.wifi ? 'bg-blue-50' : 'bg-gray-50 opacity-60'}`}>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-1">📶</div>
                      <div className="text-sm font-medium">WiFi</div>
                      <div className="text-xs text-gray-600">{journeyDetails.amenities.wifi ? 'Available' : 'Not Available'}</div>
                    </div>
                  </div>
                  
                  <div className={`border rounded-lg p-3 ${journeyDetails.amenities.charging ? 'bg-blue-50' : 'bg-gray-50 opacity-60'}`}>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-1">🔌</div>
                      <div className="text-sm font-medium">Charging Points</div>
                      <div className="text-xs text-gray-600">{journeyDetails.amenities.charging ? 'Available' : 'Not Available'}</div>
                    </div>
                  </div>
                  
                  <div className={`border rounded-lg p-3 ${journeyDetails.amenities.entertainment ? 'bg-blue-50' : 'bg-gray-50 opacity-60'}`}>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-1">🎮</div>
                      <div className="text-sm font-medium">Entertainment</div>
                      <div className="text-xs text-gray-600">{journeyDetails.amenities.entertainment ? 'Available' : 'Not Available'}</div>
                    </div>
                  </div>
                  
                  <div className={`border rounded-lg p-3 ${journeyDetails.amenities.blankets ? 'bg-blue-50' : 'bg-gray-50 opacity-60'}`}>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-1">🛌</div>
                      <div className="text-sm font-medium">Blankets</div>
                      <div className="text-xs text-gray-600">{journeyDetails.amenities.blankets ? 'Available' : 'Not Available'}</div>
                    </div>
                  </div>
                  
                  <div className={`border rounded-lg p-3 ${journeyDetails.amenities.refreshments ? 'bg-blue-50' : 'bg-gray-50 opacity-60'}`}>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-1">🍕</div>
                      <div className="text-sm font-medium">Refreshments</div>
                      <div className="text-xs text-gray-600">{journeyDetails.amenities.refreshments ? 'Available' : 'Not Available'}</div>
                    </div>
                  </div>
                  
                  <div className={`border rounded-lg p-3 ${journeyDetails.amenities.toilet ? 'bg-blue-50' : 'bg-gray-50 opacity-60'}`}>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-1">🚻</div>
                      <div className="text-sm font-medium">Toilet</div>
                      <div className="text-xs text-gray-600">{journeyDetails.amenities.toilet ? 'Available' : 'Not Available'}</div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3 bg-blue-50">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-1">🦵</div>
                      <div className="text-sm font-medium">Legroom</div>
                      <div className="text-xs text-gray-600">{journeyDetails.amenities.legroom}</div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3 bg-blue-50">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-1">🧳</div>
                      <div className="text-sm font-medium">Luggage Space</div>
                      <div className="text-xs text-gray-600">{journeyDetails.amenities.luggageSpace}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'stops' && (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 z-0"></div>
                
                <div className="space-y-6 relative z-10">
                  {journeyDetails.stops.map((stop, index) => (
                    <div key={index} className="flex items-start ml-4 pl-6 relative">
                      <div className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center ${index === 0 ? 'bg-green-500' : index === journeyDetails.stops.length - 1 ? 'bg-red-500' : 'bg-blue-500'} text-white`}>
                        {index === 0 ? '🏁' : index === journeyDetails.stops.length - 1 ? '🏁' : '🚏'}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{stop.name}</div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{stop.type}</span>
                          <span className="font-medium">{stop.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'policies' && (
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-600" />
                    Cancellation Policy
                  </h3>
                  <p className="text-sm text-gray-700">{journeyDetails.policies.cancellation}</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <div className="w-4 h-4 mr-2 text-blue-600">🧳</div>
                    Baggage Policy
                  </h3>
                  <p className="text-sm text-gray-700">{journeyDetails.policies.baggage}</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <div className="w-4 h-4 mr-2 text-blue-600">🍔</div>
                    Food Policy
                  </h3>
                  <p className="text-sm text-gray-700">{journeyDetails.policies.foodPolicy}</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <div className="w-4 h-4 mr-2 text-blue-600">🐾</div>
                    Pet Policy
                  </h3>
                  <p className="text-sm text-gray-700">{journeyDetails.policies.petPolicy}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 