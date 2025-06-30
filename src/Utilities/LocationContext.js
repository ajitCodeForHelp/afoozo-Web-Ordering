import React, { createContext, useEffect, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          setLocation({ latitude, longitude, address: data.display_name });
        } catch (err) {
          console.error('Reverse geocoding failed', err);
        }
      },
      (error) => {
        console.error("Location permission denied or error:", error);
        setLocation(null);
      }
    );
  }, []);
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};