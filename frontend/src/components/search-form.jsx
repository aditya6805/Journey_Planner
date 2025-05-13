import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { MapPin, Calendar, Search } from "lucide-react";
import { format } from "date-fns";
import { Combobox } from "./combobox";
import { getJourneyOptions } from "../lib/api";
import { RouteResults } from "./route-results";
import { State, City } from "country-state-city";
import { ActualIndiaMap } from "./actual-india-map";

export function SearchForm() {
  // States for form data
  const [originState, setOriginState] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [destinationState, setDestinationState] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [date, setDate] = useState("");
  const [travelMode, setTravelMode] = useState("all");
  
  // States for UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!originCity || !destinationCity) {
      setError(new Error("Origin and destination cities are required"));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const searchParams = {
        origin: originCity,
        destination: destinationCity,
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

  const handleTravelModeChange = (value) => {
    setTravelMode(value);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Form Section - Left Side */}
        <div className="lg:col-span-5">
          <Card className="shadow-lg border-blue-100 h-full">
            <CardHeader className="bg-blue-50 rounded-t-lg">
              <CardTitle className="text-blue-800">Find Your Perfect Route</CardTitle>
              <CardDescription>Enter your travel details to discover the best journey options across India</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Origin Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originState" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      Origin State
                    </Label>
                    <Combobox
                      options={stateOptions}
                      placeholder="Select origin state"
                      value={originState}
                      onChange={setOriginState}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originCity" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      Origin City
                    </Label>
                    <Combobox
                      options={originCityOptions}
                      placeholder={originState ? "Select origin city" : "First select a state"}
                      value={originCity}
                      onChange={setOriginCity}
                      disabled={!originState}
                    />
                  </div>
                </div>

                {/* Destination Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destinationState" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      Destination State
                    </Label>
                    <Combobox
                      options={stateOptions}
                      placeholder="Select destination state"
                      value={destinationState}
                      onChange={setDestinationState}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destinationCity" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      Destination City
                    </Label>
                    <Combobox
                      options={destinationCityOptions}
                      placeholder={destinationState ? "Select destination city" : "First select a state"}
                      value={destinationCity}
                      onChange={setDestinationCity}
                      disabled={!destinationState}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
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
                    <RadioGroup value={travelMode} onValueChange={handleTravelModeChange}>
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

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
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
        </div>
        
        {/* Map Section - Right Side */}
        <div className="lg:col-span-7">
          <ActualIndiaMap />
        </div>
      </div>

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