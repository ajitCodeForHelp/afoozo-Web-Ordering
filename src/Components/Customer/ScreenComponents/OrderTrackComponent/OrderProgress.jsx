import React from "react";
import useIsMobile from "../../../../Utilities/IsMobile";

const OrderProgress = ({ currentStep }) => {
  const isMobile = useIsMobile();

  return (
    <div className="sticky-top bg-white p-1">
      <ul id="progressbar" className="d-flex justify-content-center shadow-sm rounded-4 p-1 m-3 ">
        {!isMobile && <li className="active">
          Order
        </li>}
        <li className="active">
          Confirmed
        </li>
        <li>
          On the way
        </li>
        <li>
          Deliver
        </li>
      </ul>
    </div>
  );
};

export default OrderProgress;
