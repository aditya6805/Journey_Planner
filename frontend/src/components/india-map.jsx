import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// Center coordinates for India
const center = {
  lat: 20.5937,
  lng: 78.9629
};

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '8px'
};

// Default map options
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

export function IndiaMap({ originMarker, destinationMarker }) {
  const [map, setMap] = useState(null);

  // Load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC7yUBjimLUD2pAJozsBwFE_YDwdNlxw3A' // Publicly visible key for demo purposes
  });

  // Store a reference to the map instance
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  // Clear the map instance when the component unmounts
  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  // Only render the map when the API is loaded
  return isLoaded ? (
    <div className="mb-6 border rounded-lg overflow-hidden shadow-md">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        {/* If markers are provided, display them */}
        {originMarker && (
          <Marker
            position={originMarker}
            label={{
              text: "O",
              color: "white"
            }}
          />
        )}
        {destinationMarker && (
          <Marker
            position={destinationMarker}
            label={{
              text: "D",
              color: "white"
            }}
          />
        )}
      </GoogleMap>
    </div>
  ) : <div className="h-[300px] bg-gray-100 flex items-center justify-center rounded-lg mb-6">Loading map...</div>;
} 