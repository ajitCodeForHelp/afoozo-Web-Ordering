import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100vh',
};

const center = {
    lat: 28.6139,
    lng: 77.2090,
};

function DraggableMap({ onLocationChange }) {

    const getAddressFromCoords = async ({ lat, lng }) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`
            );
            const data = await response.json();
            console.log(data, "data");
            if (data.status === 'OK') {
                return data.results[0]?.formatted_address || 'Address not found';
            } else {
                // alert(data,"datat");
                return 'Failed to get address';
            }
        } catch (error) {
            console.log('error in address google', error);
            // return 'Error fetching address';
            alert(error, "error");
        }
    };

    const [markerPosition, setMarkerPosition] = useState(center);
    const mapRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY, // Replace with your actual API key
    });

    const onMapLoad = useCallback((mapInstance) => {
        mapRef.current = mapInstance;
    }, []);

    const onMapIdle = useCallback(async () => {
        if (mapRef.current) {
            const center = mapRef.current.getCenter();
            const newCoords = {
                lat: parseFloat(center.lat().toFixed(6)),
                lng: parseFloat(center.lng().toFixed(6)),
            };

            // Only update if position has really changed
            if (
                newCoords.lat !== parseFloat(markerPosition.lat.toFixed(6)) ||
                newCoords.lng !== parseFloat(markerPosition.lng.toFixed(6))
            ) {
                setMarkerPosition(newCoords);
                if (onLocationChange) {
                    const address = await getAddressFromCoords(newCoords);
                    onLocationChange({ ...newCoords, address });
                }
            }
        }
    }, [onLocationChange, markerPosition]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={14}
            onLoad={onMapLoad}
            onIdle={onMapIdle}
        >
            <Marker position={markerPosition} />
        </GoogleMap>
    ) : (
        <p>Loading Map...</p>
    );
}

export default DraggableMap;
