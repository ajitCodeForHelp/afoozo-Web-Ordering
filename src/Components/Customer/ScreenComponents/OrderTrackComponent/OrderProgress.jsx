import React from "react";
import useIsMobile from "../../../../Utilities/IsMobile";

const OrderProgress = ({ currentStep }) => {
  const isMobile = useIsMobile();

  return (
    <div className="sticky-top bg-white p-1">
      <ul id="progressbar" className="d-flex justify-content-center shadow-sm rounded-4 p-1 m-3 ">
        {!isMobile && <li className="active">
          Orderd
          {/* <p>We have Received your Order</p> */}
        </li>}
        <li className="active">
          Confirmed
          {/* <p>Your Order is Confirmed</p> */}
        </li>
        <li>
          {/* Order Processed */}
          On the way
          {/* <p>We are preparing your Order</p> */}
        </li>
        <li>
          {/* Ready To Deliver */}
          Deliver
          {/* <p>Your order is ready to deliver</p> */}
        </li>
      </ul>
    </div>
  );
};

export default OrderProgress;
