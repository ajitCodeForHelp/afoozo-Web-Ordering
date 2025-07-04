import React from 'react';

const DineInScan = ({ showScanner, setShowScanner }) => {
  return (
    <div className="scan-order-page bg-white min-vh-100 d-flex flex-column ">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between px-3 py-3 border-bottom bg-black text-white">
        <i className="bi bi-arrow-left fs-4"></i>
        <h5 className="mb-0">Scan and Order</h5>
        <div style={{ width: '1.5rem' }}></div>
      </div>

      {/* QR and Info */}
      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-3">
        <div className="qr-circle mb-4">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=sample"
            alt="QR"
            className="img-fluid"
          />
        </div>

        <div className="scan-order-card p-4 rounded-4 shadow-sm">
          <h5 className="fw-bold">Scan and Order</h5>
          <p>Please Scan your QR Code on your table to place an Order</p> 
          {/* <p className="text-muted small mb-1">You are seated at</p>
          <p className="text-muted small mb-1">Tata Guest House</p>
          <p className="text-muted small mb-1">house no 574, urban estate ph2, ludhiana</p>
          <p className="fw-semibold">Room No 01</p>

          <button className="btn btn-dark w-100 rounded-pill py-2 my-2">
            CONTINUE AND ORDER
          </button>

          <div className="divider my-2">OR</div> */}

          <button className="btn btn-dark w-100 rounded-pill py-2" onClick={()=>setShowScanner(true)}>
            SCAN
          </button>
        </div>
      </div>
    </div>
  );
};

export default DineInScan;