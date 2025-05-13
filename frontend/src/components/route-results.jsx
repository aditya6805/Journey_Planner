import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Clock, Calendar, DollarSign, Wifi, MapPin, Navigation } from "lucide-react";

export function RouteResults({ routes, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg border-red-100 mb-6">
        <CardHeader className="bg-red-50 rounded-t-lg">
          <CardTitle className="text-red-800">Error</CardTitle>
          <CardDescription>There was an error fetching journey options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-red-600">{error.message || "Please try again later"}</p>
        </CardContent>
      </Card>
    );
  }

  if (!routes || routes.length === 0) {
    return (
      <Card className="shadow-lg border-yellow-100 mb-6">
        <CardHeader className="bg-yellow-50 rounded-t-lg">
          <CardTitle className="text-yellow-800">No Routes Found</CardTitle>
          <CardDescription>We couldn't find any journey options matching your criteria</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p>Try adjusting your search parameters or checking different travel dates.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-800">Journey Options</h2>
      
      {routes.map((route) => (
        <Card key={route.id} className="shadow-lg border-emerald-100 mb-6 overflow-hidden">
          <CardHeader className="bg-emerald-50 rounded-t-lg">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-emerald-800">{route.mode}</CardTitle>
                <CardDescription>Journey ID: {route.id}</CardDescription>
              </div>
              <div className="text-right">
                <div className="flex items-center text-emerald-700 font-bold text-xl">
                  <DollarSign className="h-5 w-5 mr-1" />
                  <span>₹{route.cost}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{route.duration}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="text-emerald-800 font-semibold">
                  <div>{route.departure}</div>
                  <div className="text-xs text-gray-500">Departure</div>
                </div>
                <div className="mx-4 flex-1 border-t border-dashed border-gray-300 min-w-[60px] md:min-w-[100px]"></div>
                <div className="text-emerald-800 font-semibold">
                  <div>{route.arrival}</div>
                  <div className="text-xs text-gray-500">Arrival</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {route.amenities?.map((amenity, index) => (
                  <div key={index} className="inline-flex items-center bg-emerald-50 px-2 py-1 rounded text-xs">
                    {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1 text-emerald-600" />}
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-700 mb-3">Journey Details</h4>
              <div className="space-y-4">
                {route.legs?.map((leg, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium capitalize">{leg.type}</div>
                      <div className="text-sm text-emerald-700">₹{leg.cost}</div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="min-w-[90px] text-sm">
                        <div>{leg.departure}</div>
                        <div className="text-gray-500">{leg.from}</div>
                      </div>
                      <div className="mx-2 flex-1 border-t border-dashed border-gray-300 translate-y-3"></div>
                      <div className="min-w-[90px] text-sm">
                        <div>{leg.arrival}</div>
                        <div className="text-gray-500">{leg.to}</div>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs flex justify-between">
                      <div>Duration: {leg.duration}</div>
                      <div>Operator: {leg.operator}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {route.lastMile && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <Navigation className="h-4 w-4 mr-1 text-emerald-600" />
                  Last Mile Options
                </h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {route.lastMile.options?.map((option, index) => (
                    <div key={index} className="inline-flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                      {option}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  Estimated cost: {route.lastMile.estimatedCost}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 