import React from "react";
import useIsMobile from "../../../../Utilities/IsMobile";

const OrderProgress = ({ currentStep = 0 }) => {
  const isMobile = useIsMobile();

  const steps = isMobile
    ? ["Order", "On the way", "Deliver"]
    : ["Order", "On the way", "Deliver"];

  return (
    <div className="sticky-top bg-white p-1">
      <ul
        id="progressbar"
        className="d-flex justify-content-center shadow-sm rounded-3 p-1 m-3"
      >
        {steps.map((step, index) => (
          <li
            key={index}
            className={index <= currentStep ? "active mx-2" : "mx-2"}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderProgress;
