import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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
          navigator.geolocation.getCurrentPosition(
            () => setLocationAllowed(true),
            () => setLocationAllowed(false)
          );
        } else if (result.state === 'denied') {
          setLocationAllowed(false);
          setShowModal(true);
        }
      });
  }, []);

  if (locationAllowed === null) {
    return <div className="text-center mt-5">Checking location permission...</div>;
  }

  if (locationAllowed === false) {
    return (
      <>
        {/* Optional fallback UI */}
        <div className="text-center mt-5">
          <h4>Location Access Required</h4>
          <p>This site needs your location to continue.</p>
        </div>

        {/* Modal for denied permission */}
        <Modal show={showModal} onHide={() => {}} backdrop="static" keyboard={false}>
          <Modal.Header className='bg-dark text-warning'>
            <Modal.Title>Location Permission Denied</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              You have previously denied location access. Please follow these steps to re-enable it:
            </p>
            <ul>
              <li>Click the 🔒 icon in the address bar.</li>
              <li>Go to "Site Settings".</li>
              <li>Find "Location" and change it to "Allow".</li>
              <li>Reload this page.</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className='bg-dark text-warning border-0' onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return <>{children}</>;
}

export default LocationGate;