import React, { useEffect, useState } from 'react';

export function ActualIndiaMap({ originCity, destinationCity, originState, destinationState }) {
  const [mapSrc, setMapSrc] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15281088.857270285!2d73.72836251769414!3d20.772471224820377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1626419284923!5m2!1sen!2sin"
  );

  useEffect(() => {
    // Update map with origin and destination markers if both are selected
    if (originCity && destinationCity) {
      const origin = `${originCity}, ${originState}, India`;
      const destination = `${destinationCity}, ${destinationState}, India`;
      
      // Create a directions map between the two locations
      const directionsMapSrc = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving`;
      setMapSrc(directionsMapSrc);
    } else if (originCity) {
      // If only origin is selected, show that location
      const origin = `${originCity}, ${originState}, India`;
      const placeMapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(origin)}&zoom=11`;
      setMapSrc(placeMapSrc);
    } else if (destinationCity) {
      // If only destination is selected, show that location
      const destination = `${destinationCity}, ${destinationState}, India`;
      const placeMapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(destination)}&zoom=11`;
      setMapSrc(placeMapSrc);
    }
  }, [originCity, destinationCity, originState, destinationState]);

  // Create a status message based on selected locations
  const getStatusMessage = () => {
    if (originCity && destinationCity) {
      return `Showing route from ${originCity} to ${destinationCity}`;
    } else if (originCity) {
      return `Origin: ${originCity}, ${originState}`;
    } else if (destinationCity) {
      return `Destination: ${destinationCity}, ${destinationState}`;
    }
    return "View detailed map of India with states and major cities";
  };

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-blue-200 shadow-md">
      <div className="bg-white p-3">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Map of India</h3>
        <p className="text-sm text-gray-600 mb-2">{getStatusMessage()}</p>
      </div>
      <div className="relative w-full h-[620px]">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map of India"
          className="absolute inset-0"
        ></iframe>
      </div>
    </div>
  );
} 