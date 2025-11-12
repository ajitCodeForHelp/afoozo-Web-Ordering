import React, { useEffect, useMemo, useState } from "react";
import {
  FiLogOut,
  FiClock,
  FiHeadphones,
  FiX,
} from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";

import { RiNotificationBadgeFill } from "react-icons/ri";
import { FaChevronRight, FaInfoCircle } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { FaMoneyBillTrendUp, FaBuildingCircleCheck } from "react-icons/fa6";
import { BsCartCheck } from "react-icons/bs";
import { MdContentPaste } from "react-icons/md";
import pic from "../../../Assets/profilePic.png";
import ProfileUpdate from "../ScreenComponents/DrawerPages/UpdateProfile";
import DetailedNotificationPopup from "../ScreenComponents/DrawerPages/Notification";
import AboutAppPopup from "../ScreenComponents/DrawerPages/About";
import TermsConditionsPopup from "../ScreenComponents/DrawerPages/Terms&conditions";
import OrderHistory from "../ScreenComponents/DrawerPages/OrderHistory";
import LiveOrders from "../ScreenComponents/DrawerPages/LiveOrder";
import { useNavigate, useSearchParams } from "react-router-dom";
import useIsMobile from "../../../Utilities/IsMobile";
import Wallet from "../ScreenComponents/DrawerPages/Wallet";
import BillToOrders from "../ScreenComponents/DrawerPages/BillToOrders";
import CheckInOut from "../ScreenComponents/DrawerPages/CheckInOut";
import usePopupBackHandler from "../../../Utilities/UsePopupStack";
import OrderDetailSection from "../ScreenComponents/DrawerPages/OrderDetailSection";
import HistoryOrderDetail from "../ScreenComponents/DrawerPages/HistoryOrderDetail";
import { Authorization } from "../../../Utilities/Authorization";
import PopupModal from "./Modals/PopUpModal";
import PopupManager from "./PopupWrapper";
import { useDispatch } from "react-redux";
import { setCustomerData } from "../../../Redux/customerSlice";
import { setSecureItem } from "../../../Utilities/Storage";

export default function SidebarDrawer({ isOpen, onClose }) {
  useEffect(() => {
    // Prevent background scroll when drawer is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const [profileData, setProfileData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const BasicAuth = Authorization();
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/profileDetail`, {
        headers: {
          'Authorization': `Basic ${BasicAuth}`
        }
      });
      const getRes = await res.json();
      if (getRes.errorCode === 0) {
        setSecureItem("customerData", getRes.responsePacket);
        dispatch(setCustomerData(getRes.responsePacket));
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

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const signOut = () => {
    localStorage.removeItem("secretKey");
    localStorage.removeItem("mobileNo");
    setShowLogoutPopup(false);
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
  const [showHistoryOrderDetail, setShowHistoryOrderDetail] = useState(false);

  // const popupStack = useMemo(() => [
  //   { id: "checkInOut", isOpen: showCheckInOut, onClose: () => setShowCheckInOut(false) },
  //   { id: "billOrders", isOpen: showBiLlOrders, onClose: () => setShowBillOrders(false) },
  //   { id: "wallet", isOpen: showWallet, onClose: () => setShowWallet(false) },
  //   { id: "liveOrder", isOpen: showLiveOrder, onClose: () => setShowLiveOrder(false) },
  //   { id: "historyOrder", isOpen: showHistoryOrder, onClose: () => setShowHistoryOrder(false) },
  //   { id: "orderDetails", isOpen: showOrderDetail, onClose: () => setShowOrderDetail(false) },
  //   { id: "terms", isOpen: showTandC, onClose: () => setShowTandC(false) },
  //   { id: "about", isOpen: showAbout, onClose: () => setShowAbout(false) },
  //   { id: "notification", isOpen: showNotification, onClose: () => setShowNotification(false) },
  //   // { id: "updateProfile", isOpen: showUpdateProfile, onClose: () => setShowUpdateProfile(false) },
  //   { id: "historyOrderDetail", isOpen: showHistoryOrderDetail, onClose: () => setShowHistoryOrderDetail(false) },
  //   { id: "drawer", isOpen: isOpen, onClose }, // ✅ LAST to close
  // ], [
  //   showCheckInOut,
  //   showBiLlOrders,
  //   showWallet,
  //   showLiveOrder,
  //   showHistoryOrder,
  //   showTandC,
  //   showAbout,
  //   showNotification,
  //   // showUpdateProfile,
  //   showOrderDetail,
  //   showHistoryOrderDetail,
  //   isOpen,
  // ]);
  // usePopupBackHandler(popupStack);

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


  const [search] = useSearchParams();
  const url = search.get("updateProfile");

  useEffect(() => {
    if (url) {
      console.log('got it you can do it ');
      setShowUpdateProfile(true)
    }
  }, [url]);

  // const navigation = useNavigate();


  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div style={{ paddingBottom: isMobile && "4.5rem" }} className={`sidebar-drawer slide-right ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center mb-1">
          <h4 className="logo text-dark mb-0">AFOOZO</h4>
          <button onClick={onClose} className="btn-close-icon">
            <FiX size={22} />
          </button>
        </div>

        <div className="d-flex align-items-center justify-content-between border-bottom mt-1 pb-2">
          <div className="d-flex align-items-center gap-3">
            <img
              src={pic} // use your avatar or placeholder image
              alt="Profile"
              className="rounded-circle profile-img"
            />
            <div>
              <h6 className="mb-0 fw-bold">{profileData?.fullName}</h6>
              <small className="text-muted">{profileData?.mobile}</small>
            </div>
          </div>
          {/* setShowUpdateProfile(true) */}
          <div className="d-flex align-items-center gap-2" onClick={() => navigate('?modal=drawer&sub=updateProfile')}>
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
          <li onClick={() => navigate('?modal=drawer&sub=liveOrders')}>
            <BsCartCheck /> <span>Live Order</span>
          </li>
          <li onClick={() => navigate('?modal=drawer&sub=orderHistory')}>
            <FiClock /> <span>Order History</span>
          </li>
          <li onClick={() => navigate('?modal=drawer&sub=wallet')}>
            <GiWallet /> <span>Wallet</span>
          </li>
          <li onClick={() => navigate('?modal=drawer&sub=bills')}>
            <FaMoneyBillTrendUp /> <span>Bill To Company Orders</span>
          </li>
          <li onClick={() => navigate('?modal=drawer&sub=checkin')}>
            <FaBuildingCircleCheck /> <span>Check -In</span>
          </li>
          <li onClick={() => navigate('?modal=drawer&sub=notification')}><RiNotificationBadgeFill />
            <span>Notification</span>
          </li>
          <li onClick={() => navigate('?modal=drawer&sub=about')}>
            <FaInfoCircle /> <span>About</span>
          </li>
          <li onClick={() => navigate('?modal=drawer&sub=termsCondition')}>
            <MdContentPaste /> <span>Terms & Conditions</span>
          </li>
          {/* <li><FiHeadphones /><span>Help & Support</span></li> */}
        </ul>

        <div className="logout-section text-center d-flex justify-content-center">
          <li onClick={() => setShowLogoutPopup(true)} className="bg-dark px-3 py-1 text-white w-auto" style={{ borderRadius: "25px" }} ><IoMdLogOut className="logout-logo text-warning" /> <span>Logout</span></li>
        </div>
      </div>

      <PopupModal
        type="confirm"
        show={showLogoutPopup}
        message={"Do you want to logout ?"}
        onClose={() => { setShowLogoutPopup(false) }}
        onConfirm={signOut}
        title={'Afoozo'}
        confirmText="Yes"
      />

      <PopupManager popupKey={"updateProfile"}>
        <ProfileUpdate show={true} />
      </PopupManager>

      <PopupManager popupKey={"notification"}>
        <DetailedNotificationPopup show={true} onHide={() => navigate(-1)} />
      </PopupManager>

      <PopupManager popupKey={'about'}>
        <AboutAppPopup show={true} onHide={() => navigate(-1)} />
      </PopupManager>

      <PopupManager popupKey={"termsCondition"}>
        <TermsConditionsPopup show={true} onHide={() => navigate(-1)} />
      </PopupManager>

      <PopupManager popupKey={'orderHistory'}>
        <OrderHistory show={true} onHide={() => navigate(-1)} setShowHistoryOrderDetail={setShowHistoryOrderDetail} setOrderId={setOrderId} />
      </PopupManager>

      <PopupManager popupKey={'orderDetail'}>
        <OrderDetailSection show={true} onHide={() => navigate(-1)} orderId={orderId} />
      </PopupManager>

      <PopupManager popupKey={'historyOrderDetail'}>
        <HistoryOrderDetail show={true} onHide={() => navigate(-1)} orderId={orderId} />
      </PopupManager>
      <PopupManager popupKey={'liveOrders'}>
        <LiveOrders show={true} onHide={() => navigate(-1)} setShowOrderDetail={setShowOrderDetail} setOrderId={setOrderId} />
      </PopupManager>
      <PopupManager popupKey={'wallet'}>
        <Wallet show={true} onHide={() => navigate(-1)} />
      </PopupManager>
      <PopupManager popupKey={'bills'}>
        <BillToOrders show={true} onHide={() => navigate(-1)} />
      </PopupManager>
      <PopupManager popupKey={'checkin'}>
        <CheckInOut show={true} onHide={() => navigate(-1)} />
      </PopupManager>

    </>
  );
}
