import React from 'react';

const PaymentSection = ({ walletChecked, onWalletChange, walletAmount, onAddPayment }) => {
  return (
    <div className="payment-section p-3 rounded shadow-sm bg-white mb-3">
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="walletCheck"
          checked={walletChecked}
          onChange={onWalletChange}
        />
        <label className="form-check-label fw-medium" htmlFor="walletCheck">
          Pay by wallet :
        </label>
      </div>

      <div className="text-muted mb-3">
        Available wallet amount : ₹{walletAmount.toFixed(2)}
      </div>

      <div className="fw-bold mb-2">Payment Mode</div>

      <button className="btn btn-warning border-dark them-bg-black w-100 text-warning fw-semibold shadow-sm" onClick={onAddPayment}>
        ADD PAYMENT MODE
      </button>
    </div>
  );
};

export default PaymentSection;
