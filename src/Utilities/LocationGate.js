import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

function LocationGate({ children }) {
  const [locationAllowed, setLocationAllowed] = useState(null); // null = checking
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationAllowed(false);
      return;
    }

    navigator.permissions
      .query({ name: 'geolocation' }) 
      .then((result) => {
        if (result.state === 'granted') {
          setLocationAllowed(true);
        } else if (result.state === 'prompt') {
          // Actively request location – this will trigger browser popup
          navigator.geolocation.getCurrentPosition(
            () => setLocationAllowed(true),
            () => {
              setLocationAllowed(false);
              setShowModal(true);
            }
          );
        } else if (result.state === 'denied') {
          setLocationAllowed(false);
          setShowModal(true);
        }
      });
  }, []);

  if (locationAllowed === null) {
    return <div className="text-center mt-5">Requesting location access...</div>;
  }

  if (locationAllowed === false) {
    return (
      <>
        <div className="text-center mt-5">
          <h4>Location Access Needed</h4>
          <p>This site cannot function without your location.</p>
        </div>

        <Modal show={showModal} onHide={() => { }} backdrop="static" keyboard={false}>
          <Modal.Header className="bg-dark text-warning">
            <Modal.Title>Location Access Denied</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              You denied location access. Please enable it in your browser settings to continue:
            </p>
            <ul>
              <li>Click the 🔒 icon in your browser’s address bar.</li>
              <li>Select “Site settings”.</li>
              <li>Change “Location” to “Allow”.</li>
              <li>Refresh this page manually.</li>
            </ul>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return <>{children}</>;
}

export default LocationGate;
