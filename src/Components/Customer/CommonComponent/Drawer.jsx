import React, { useEffect } from "react";
import {
  FiHome,
  FiUser,
  FiLogOut,
  FiClock,
  FiHeart,
  FiSettings,
  FiHeadphones,
  FiX,
} from "react-icons/fi";

export default function SidebarDrawer({ isOpen, onClose }) {
  useEffect(() => {
    // Prevent background scroll when drawer is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className={`sidebar-drawer slide-right ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          <h4 className="logo">AFOOZO</h4>
          <button onClick={onClose} className="btn-close-icon">
            <FiX size={22} />
          </button>
        </div>

        <ul className="menu-list">
          <li><FiHome /> <span>Home</span></li>
          <li><FiUser /> <span>Profile</span></li>
          <li><FiClock /> <span>Order History</span></li>
          <li><FiHeart /> <span>Favorites</span></li>
          <li><FiSettings /> <span>Settings</span></li>
          <li><FiHeadphones /> <span>Help & Support</span></li>
        </ul>

        <div className="logout-section">
          <li><FiLogOut /> <span>Logout</span></li>
        </div>
      </div>
    </>
  );
}
