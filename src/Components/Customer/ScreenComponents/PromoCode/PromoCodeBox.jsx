import React, { useEffect, useRef } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";

const ApplyPromoCodeBox = ({ visible, onClose, onApply, code, setCode }) => {
  const promoRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (promoRef.current && !promoRef.current.contains(event.target)) {
        onClose(); // close cart
      }
    };
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onClose]);
  return (
    <div className={`promo-panel ${visible ? 'show' : ''}`} ref={promoRef}>
      <div className="promo-header them-bg-black d-flex align-items-center justify-content-between">
        <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-warning" onClick={onClose} role="button" />
        <h5 className="text-warning m-auto">Apply Coupon</h5>
        <span></span>
      </div>

      <div className="promo-body px-3 pt-4">
        <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
          <input
            type="text"
            className="form-control border-0 shadow-none p-0"
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <span className="fw-semibold text-dark ms-3" role="button" onClick={onApply}>Apply</span>
        </div>
      </div>
    </div>
  );
};

export default ApplyPromoCodeBox;
