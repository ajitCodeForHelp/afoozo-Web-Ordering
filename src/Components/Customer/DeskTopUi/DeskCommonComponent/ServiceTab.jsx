// src/components/StickyCategoryTabs.jsx
import React, { useEffect, useRef } from "react";
import {
  FaMotorcycle,
  FaShoppingBag,
  FaUtensils,
} from "react-icons/fa";

const tabs = [
  { icon: <FaMotorcycle />, label: "Delivery", type: "HomeDelivery" },
  { icon: <FaShoppingBag />, label: "TakeAway", type: "TakeAway" },
  { icon: <FaUtensils />, label: "Dine In", type: "DineIn" },
  { icon: "", label: "Work Cafe", type: "Cafe" },
  { icon: "", label: "Check-In", type: "CheckIn" },
];

const ServiceTabs = ({ orderType, setOrderType }) => {
  const containerRef = useRef();

  useEffect(() => {
    const el = containerRef.current;
    el.scrollTo({ left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="tabs-wrapper" ref={containerRef}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab-item ${orderType === tab.type ? "active" : ""}`} // 1 is active for demo
          onClick={() => setOrderType(tab.type)}
        >
          {tab.icon && <span className="tab-icon">{tab.icon}</span>}
          <span className="tab-label">{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ServiceTabs;
