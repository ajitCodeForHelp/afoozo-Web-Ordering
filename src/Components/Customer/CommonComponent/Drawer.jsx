import React, { useEffect, useMemo, useState } from "react";
import {
  FiLogOut,
  FiClock,
  FiHeadphones,
  FiX,
} from "react-icons/fi";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { FaChevronRight, FaInfoCircle } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { FaMoneyBillTrendUp, FaBuildingCircleCheck } from "react-icons/fa6";
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
import Wallet from "../ScreenComponents/DrawerPages/Wallet";
import BillToOrders from "../ScreenComponents/DrawerPages/BillToOrders";
import CheckInOut from "../ScreenComponents/DrawerPages/CheckInOut";
import usePopupBackHandler from "../../../Utilities/UsePopupStack";
import OrderDetailSection from "../ScreenComponents/DrawerPages/OrderDetailSection";

export default function SidebarDrawer({ isOpen, onClose }) {
  useEffect(() => {
    // Prevent background scroll when drawer is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const [profileData, setProfileData] = useState([]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("secretKey");
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/profileDetail`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const getRes = await res.json();
      if (getRes.errorCode === 0) {
        setProfileData(getRes.responsePacket);
      }
    } catch (r) {
      console.log(r, "check your internet connection");
    }
  };
  useEffect(() => {
    if (isOpen) {
      getData();
    }
  }, [isOpen])

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
  const [showWallet, setShowWallet] = useState(false);
  const [showBiLlOrders, setShowBillOrders] = useState(false);
  const [showCheckInOut, setShowCheckInOut] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const popupStack = useMemo(() => [
    { id: "checkInOut", isOpen: showCheckInOut, onClose: () => setShowCheckInOut(false) },
    { id: "billOrders", isOpen: showBiLlOrders, onClose: () => setShowBillOrders(false) },
    { id: "wallet", isOpen: showWallet, onClose: () => setShowWallet(false) },
    { id: "liveOrder", isOpen: showLiveOrder, onClose: () => setShowLiveOrder(false) },
    { id: "historyOrder", isOpen: showHistoryOrder, onClose: () => setShowHistoryOrder(false) },
    { id: "orderDetails", isOpen: showOrderDetail, onClose: () => setShowOrderDetail(false) },
    { id: "terms", isOpen: showTandC, onClose: () => setShowTandC(false) },
    { id: "about", isOpen: showAbout, onClose: () => setShowAbout(false) },
    { id: "notification", isOpen: showNotification, onClose: () => setShowNotification(false) },
    { id: "updateProfile", isOpen: showUpdateProfile, onClose: () => setShowUpdateProfile(false) },
    { id: "drawer", isOpen: isOpen, onClose }, // ✅ LAST to close
  ], [
    showCheckInOut,
    showBiLlOrders,
    showWallet,
    showLiveOrder,
    showHistoryOrder,
    showTandC,
    showAbout,
    showNotification,
    showUpdateProfile,
    showOrderDetail,
    isOpen,
  ]);
  usePopupBackHandler(popupStack);

  // useEffect(() => {
  //   const handlePopState = () => {
  //     if (isOpen) {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     // Push new state only once when opening popup
  //     window.history.pushState({ isDrawerOpen: true }, '');
  //     window.addEventListener('popstate', handlePopState);
  //   }

  //   return () => {
  //     // Remove listener only (don't call history.back here)
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, [isOpen]);

  const [orderId, setOrderId] = useState('');

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
          <li onClick={() => setShowWallet(true)}><GiWallet /> <span>Wallet</span></li>
          <li onClick={() => setShowBillOrders(true)}><FaMoneyBillTrendUp /> <span>Bill To Company Orders</span></li>
          <li onClick={() => setShowCheckInOut(true)}><FaBuildingCircleCheck /> <span>Check -In</span></li>
          <li onClick={() => setShowNotification(true)}><RiNotificationBadgeFill /> <span>Notification</span></li>
          <li onClick={() => setShowAbout(true)}><FaInfoCircle /> <span>About</span></li>
          <li onClick={() => setShowTandC(true)}><MdContentPaste /> <span>Terms & Conditions</span></li>
          <li><FiHeadphones /><span>Help & Support</span></li>
        </ul>

        <div className="logout-section">
          <li onClick={signOut}><FiLogOut /> <span>Logout</span></li>
        </div>
      </div>

      <ProfileUpdate show={showUpdateProfile} onHide={() => setShowUpdateProfile(false)} />
      <DetailedNotificationPopup show={showNotification} onHide={() => setShowNotification(false)} />
      <AboutAppPopup show={showAbout} onHide={() => setShowAbout(false)} />
      <TermsConditionsPopup show={showTandC} onHide={() => setShowTandC(false)} />
      <OrderHistory show={showHistoryOrder} onHide={() => setShowHistoryOrder(false)} setShowOrderDetail={setShowOrderDetail} setOrderId={setOrderId} />
      <OrderDetailSection show={showOrderDetail} onHide={()=>setShowOrderDetail(false)} orderId={orderId} />
      <LiveOrders show={showLiveOrder} onHide={() => setShowLiveOrder(false)} setShowOrderDetail={setShowOrderDetail} setOrderId={setOrderId} />
      <Wallet show={showWallet} onHide={() => setShowWallet(false)} />
      <BillToOrders show={showBiLlOrders} onHide={() => setShowBillOrders(false)} />
      <CheckInOut show={showCheckInOut} onHide={() => setShowCheckInOut(false)} />
    </>
  );
}
