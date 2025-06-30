import React, { useEffect, useState } from 'react';

function LocationGate({ children }) {
  const [locationAllowed, setLocationAllowed] = useState(null); // null = checking, true = allowed, false = denied

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationAllowed(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Location allowed
        setLocationAllowed(true);
    },
    (error) => {
        // Location denied or error
        setLocationAllowed(false);
    }
);
}, []);

  if (locationAllowed === null) {
    return <div style={{ textAlign: 'center', marginTop: '30px' }}>Checking location permission...</div>;
  }

  if (locationAllowed === false) {
    return (
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h2>Location Access Required</h2>
        <p>You must allow location access to proceed.</p>
      </div>
    );
  }

  return <>{children}</>; // Render the rest of your app
}

export default LocationGate;