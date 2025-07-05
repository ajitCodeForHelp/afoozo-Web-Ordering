import React, { useEffect, useState } from "react";
import {
  FiLogOut,
  FiClock,
  FiHeadphones,
  FiX,
} from "react-icons/fi";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { FaChevronRight, FaInfoCircle } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { MdContentPaste } from "react-icons/md";
import pic from "../../../Assets/profilePic.jpg";
import ProfileUpdate from "../ScreenComponents/DrawerPages/UpdateProfile";
import DetailedNotificationPopup from "../ScreenComponents/DrawerPages/Notification";
import AboutAppPopup from "../ScreenComponents/DrawerPages/About";
import TermsConditionsPopup from "../ScreenComponents/DrawerPages/Terms&conditions";
import OrderHistory from "../ScreenComponents/DrawerPages/OrderHistory";
import LiveOrders from "../ScreenComponents/DrawerPages/LiveOrder";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../../Utilities/IsMobile";

export default function SidebarDrawer({ isOpen, onClose }) {
  useEffect(() => {
    // Prevent background scroll when drawer is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const [profileData, setProfileData] = useState([]);
  // const getData = async () => {
  //   try {
  //     const token = localStorage.getItem("secretKey");
  //     const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/profileDetail`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });
  //     const getRes = await res.json();
  //     if (getRes.errorCode === 0) {
  //       setProfileData(getRes.responsePacket);
  //     }
  //   } catch (r) {
  //     console.log(r, "check your internet connection");
  //   }
  // };
  // useEffect(()=>{

  // },[])

  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("secretKey");
    localStorage.removeItem("mobileNo");
    navigate("/login");
  };
  const isMobile = useIsMobile();
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showTandC, setShowTandC] = useState(false);
  const [showHistoryOrder, setShowHistoryOrder] = useState(false);
  const [showLiveOrder, setShowLiveOrder] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div style={{ paddingBottom: isMobile && "5rem" }} className={`sidebar-drawer slide-right ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center mb-1">
          <h4 className="logo text-warning mb-0">AFOOZO</h4>
          <button onClick={onClose} className="btn-close-icon">
            <FiX size={22} />
          </button>
        </div>

        <div className="d-flex align-items-center justify-content-between border-bottom mt-1">
          <div className="d-flex align-items-center gap-3">
            <img
              src={pic} // use your avatar or placeholder image
              alt="Profile"
              className="rounded-circle profile-img"
            />
            <div>
              <h6 className="mb-0 fw-bold">John</h6>
              <small className="text-muted">+91123456789</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2" onClick={() => setShowUpdateProfile(true)}>
            <img
              src="https://img.icons8.com/ios-filled/24/000000/qr-code.png"
              alt="QR"
              className="qr-icon"
            />
            <FaChevronRight />
          </div>
        </div>

        <ul className="menu-list">
          {/* <li><FiHome /> <span>Home</span></li> */}
          <li onClick={() => setShowLiveOrder(true)}><BsCartCheck /> <span>Live Order</span></li>
          <li onClick={() => setShowHistoryOrder(true)}><FiClock /> <span>Order History</span></li>
          <li onClick={() => setShowNotification(true)}><RiNotificationBadgeFill /> <span>Notification</span></li>
          <li onClick={() => setShowAbout(true)}><FaInfoCircle /> <span>About</span></li>
          <li onClick={() => setShowTandC(true)}><MdContentPaste /> <span>Terms & Conditions</span></li>
          <li><FiHeadphones /> <span>Help & Support</span></li>
        </ul>

        <div className="logout-section">
          <li onClick={signOut}><FiLogOut /> <span>Logout</span></li>
        </div>
      </div>

      <ProfileUpdate show={showUpdateProfile} onHide={() => setShowUpdateProfile(false)} />
      <DetailedNotificationPopup show={showNotification} onHide={() => setShowNotification(false)} />
      <AboutAppPopup show={showAbout} onHide={() => setShowAbout(false)} />
      <TermsConditionsPopup show={showTandC} onHide={() => setShowTandC(false)} />
      <OrderHistory show={showHistoryOrder} onHide={() => setShowHistoryOrder(false)} />
      <LiveOrders show={showLiveOrder} onHide={() => setShowLiveOrder(false)} />
    </>
  );
}
