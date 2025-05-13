import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { MapPin, Calendar, Search } from "lucide-react";
import { format } from "date-fns";
import { Combobox } from "./combobox";
import { getJourneyOptions } from "../lib/api";
import { RouteResults } from "./route-results";

const popularCities = [
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi", value: "delhi" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Chennai", value: "chennai" },
  { label: "Kolkata", value: "kolkata" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Pune", value: "pune" },
  { label: "Ahmedabad", value: "ahmedabad" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Kochi", value: "kochi" },
];

export function SearchForm() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelMode, setTravelMode] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!origin || !destination) {
      setError(new Error("Origin and destination are required"));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const searchParams = {
        origin,
        destination,
        date,
        mode: travelMode
      };
      
      const result = await getJourneyOptions(searchParams);
      setSearchResults(result);
    } catch (err) {
      setError(err);
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <>
      <Card className="shadow-lg border-emerald-100 mb-8">
        <CardHeader className="bg-emerald-50 rounded-t-lg">
          <CardTitle className="text-emerald-800">Find Your Perfect Route</CardTitle>
          <CardDescription>Enter your travel details to discover the best journey options across India</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="origin" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  Origin
                </Label>
                <Combobox
                  options={popularCities}
                  placeholder="Where are you starting from?"
                  value={origin}
                  onChange={setOrigin}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  Destination
                </Label>
                <Combobox
                  options={popularCities}
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={setDestination}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  Travel Date
                </Label>
                <input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">Travel Mode</Label>
                <RadioGroup value={travelMode} onChange={(e) => setTravelMode(e.target.value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="cursor-pointer">
                      All Options
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bus" id="bus" />
                    <Label htmlFor="bus" className="cursor-pointer">
                      Bus Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="train-bus" id="train-bus" />
                    <Label htmlFor="train-bus" className="cursor-pointer">
                      Train + Bus
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flight-bus" id="flight-bus" />
                    <Label htmlFor="flight-bus" className="cursor-pointer">
                      Flight + Bus/Auto
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Search Routes
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasSearched && (
        <div className="mt-8">
          <RouteResults 
            routes={searchResults?.routes} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
      )}
    </>
  );
} 