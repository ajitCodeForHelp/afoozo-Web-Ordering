import React from 'react';

const BillingInfo = ({ bill, tax, packing, coin, total }) => {
  return (
    <div className="billing-box p-3 mb-4 shadow-sm rounded bg-white">
      <h6 className="fw-bold mb-3">Billing Information</h6>

      <div className="d-flex justify-content-between mb-2">
        <span className="text-primary text-decoration-underline">Restaurant Bill</span>
        <span>₹ {bill?.toFixed(2)}</span>
      </div>

      <div className="d-flex justify-content-between mb-2 align-items-center">
        <span className="text-muted d-flex align-items-center">
          Tax
          <span className="info-circle ms-1" title="This includes GST and service charges">i</span>
        </span>
        <span>₹ {tax?.toFixed(2)}</span>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <span className="text-muted">Packing Charges</span>
        <span>₹ {packing?.toFixed(2)}</span>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <span className="text-muted">Delivery Charges</span>
        <span>₹ {coin?.toFixed(2)}</span>
      </div>

      <hr className="my-2" />

      <div className="d-flex justify-content-between fw-bold">
        <span>Total</span>
        <span>₹ {total?.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default BillingInfo;
