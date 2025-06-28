// src/components/StickyCategoryTabs.jsx
import React, { useEffect, useRef } from "react";
import {
  FaMotorcycle,
  FaShoppingBag,
  FaUtensils,
} from "react-icons/fa";

const tabs = [
  { icon: <FaMotorcycle />, label: "Delivery" },
  { icon: <FaShoppingBag />, label: "TakeAway" },
  { icon: <FaUtensils />, label: "Dine In" },
  { icon: "", label: "Work Cafe" },
  { icon: "", label: "Check-In" },
];

const ServiceTabs = () => {
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
          className={`tab-item ${index === 1 ? "active" : ""}`} // 1 is active for demo
        >
          {tab.icon && <span className="tab-icon">{tab.icon}</span>}
          <span className="tab-label">{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ServiceTabs;
